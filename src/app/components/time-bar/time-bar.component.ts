import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { TimetrackingFormService } from 'src/app/pages/timetracking/timetracking-form.service';
import { Project } from 'src/app/models/project';
import { ProjectApiService } from 'src/app/api/project-api.service';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.scss'],
})
export class TimeBarComponent implements OnInit {
  @Output() id = new EventEmitter<number>();
  @Input() form!: FormGroup;
  @Input() index!: number;

  projects!: Project[];

  constructor(
    private timetrackingFormService: TimetrackingFormService,
    private projectApiService: ProjectApiService
  ) {}

  ngOnInit(): void {
    this.setTotalTime();
    merge(
      this.form.controls['fromTime'].valueChanges,
      this.form.controls['toTime'].valueChanges,
      this.form.controls['project'].valueChanges
    ).subscribe(() => {
      this.setTotalTime();
      this.validateUndercutTime();
      this.validateTimeBetweenTimerange();
    });

    this.getProjects();
  }

  getProjects() {
    this.projectApiService.getAllProjects().subscribe((result) => {
      this.projects = result;
    });
  }

  deleteTimetrack(index: number) {
    this.id.emit(index);
  }

  setTotalTime() {
    if (this.form.controls['toTime'].valid) {
      var timeStart = new Date(
        '2023-01-01 ' + this.form.controls['fromTime'].value
      );
      var timeEnd = new Date(
        '2023-01-01 ' + this.form.controls['toTime'].value
      );
      var total = timeEnd.getTime() - timeStart.getTime();
      this.form.controls['total'].setValue(
        this.timetrackingFormService.calculateTotalTime(total)
      );
    }
  }

  validateUndercutTime() {
    if (this.form.controls['fromTime'].valid) {
      var timeStart = new Date(
        '2023-01-01 ' + this.form.controls['fromTime'].value
      );
      var timeEnd = new Date(
        '2023-01-01 ' + this.form.controls['toTime'].value
      );
      if (timeStart >= timeEnd) {
        this.form.controls['toTime'].setErrors({ undercut: true });
      } else {
        this.form.controls['toTime'].setErrors(null);
      }
    }
  }

  validateTimeBetweenTimerange() {
    if (this.form.controls['toTime'].valid) {
      var timeStart = new Date(
        '2023-01-01 ' + this.form.controls['fromTime'].value
      );
      var timeEnd = new Date(
        '2023-01-01 ' + this.form.controls['toTime'].value
      );

      if (
        this.timetrackingFormService.validateTimeExits(
          this.index,
          timeStart,
          timeEnd
        )
      ) {
        this.form.controls['fromTime'].setErrors({ betweenRange: true });
        this.form.controls['toTime'].setErrors({ betweenRange: true });
      } else {
        this.form.controls['fromTime'].setErrors(null);
        this.form.controls['toTime'].setErrors(null);
      }
    }
  }
}
