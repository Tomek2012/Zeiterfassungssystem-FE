import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ProjectApiService } from 'src/app/api/project-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  constructor(
    private projectApiService: ProjectApiService,
    private snackBar: MatSnackBar
  ) {}

  displayedColumns: string[] = ['value', 'name', 'description', 'delete'];

  projects!: Project[];

  public projectForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.fillProjects();
  }

  public fillProjects() {
    this.projectApiService.getAllProjects().subscribe((result) => {
      this.projects = result;
    });
  }

  public addProject() {
    if (this.projectForm.valid) {
      const newProject: Project = {
        name: this.projectForm.controls['name'].value as string,
        description: this.projectForm.controls['description'].value as string,
      };
      this.projectApiService.save(newProject).subscribe((result) => {
        this.fillProjects();
        this.projectForm.reset();
        this.projectForm.clearValidators();

        this.snackBar.open(
          'Arbeitspaket wurde erfolgreich angelegt',
          'Schließen',
          {
            duration: 3000,
          }
        );
      });
    }
  }

  public deleteProject(id: number) {
    this.projectApiService.delete(id).subscribe(() => {
      this.fillProjects();

      this.snackBar.open(
        'Arbeitspaket wurde erfolgreich gelöscht',
        'Schließen',
        {
          duration: 3000,
        }
      );
    });
  }
}
