import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimetrackingApiService } from 'src/app/api/timetracking-api.service';
import { Timetrackings } from 'src/app/models/timetrackings';
import { TimetrackingFormService } from './timetracking-form.service';

@Component({
  selector: 'app-timetracking',
  templateUrl: './timetracking.component.html',
  styleUrls: ['./timetracking.component.scss'],
})
export class TimetrackingComponent implements OnInit {
  form!: FormGroup;
  total!: string;

  constructor(
    private timetrackingFormService: TimetrackingFormService,
    private timetrackingApiService: TimetrackingApiService,
    private datepipe: DatePipe,
    private snackBar: MatSnackBar
  ) {
    this.form = timetrackingFormService.getTimetrackingFormGroup();
  }

  ngOnInit(): void {
    /** Initialer Start - Hole Zeiterfassungen vom heutigen Tag */
    this.form.controls['date'].setValue(new Date());

    this.getTimetrackings();

    /** Abruf der vorhandenen Zeiterfassungen nach ausgewaehltem Datum */
    this.form.controls['date'].valueChanges.subscribe((value) => {
      this.timetrackingFormService.deleteAllTimetrackings();
      this.getTimetrackings();
    });
  }

  public saveAndUpdate() {
    if (this.form.valid) {
      const timetrackings: Array<Timetrackings> = [];
      for (var i = 0; i < this.getTimetrackingList().length; i++) {
        const timetrack = this.getTimetrackingList()[i].value;
        timetrack.timestamp = this.form.controls['date'].value;
        timetrackings.push(timetrack);
      }
      this.timetrackingApiService
        .saveAndUpdate(timetrackings)
        .subscribe((res) => {
          this.timetrackingFormService.deleteAllTimetrackings();
          this.getTimetrackings();
          this.snackBar.open(
            'Die Zeiterfassungen wurden erfolgreich gespeichert',
            'Schließen',
            {
              duration: 3000,
            }
          );
        });
    } else {
      this.snackBar.open(
        'Speicherung nicht möglich: Bitte alle Pflichtfelder prüfen',
        'Schließen',
        {
          duration: 5000,
        }
      );
    }
  }

  public getTimetrackingList(): FormGroup[] {
    return (this.timetrackingFormService.getTimetrackingList() as FormArray)
      .controls as FormGroup[];
  }

  getTimetrackings() {
    this.timetrackingApiService
      .getAllTimetrackings(this.getDate())
      .subscribe((res) => {
        this.total = res.total;
        this.timetrackingFormService.fillFormValuesForTimetracking(
          res.timetrackings
        );
      });
  }

  lastDay() {
    var date = new Date();
    date = this.form.controls['date'].value;
    date.setDate(date.getDate() - 1);
    this.form.controls['date'].setValue(new Date(date));
  }

  nextDay() {
    var date = new Date();
    date = this.form.controls['date'].value;
    date.setDate(date.getDate() + 1);
    this.form.controls['date'].setValue(new Date(date));
  }

  createTimetracking() {
    this.timetrackingFormService.addNewTimeTracking(
      this.getTimetrackingList().length
    );
  }

  deleteTimetracking(index: number) {
    const id: number = this.getTimetrackingList()[index].controls['id'].value;
    if (id) {
      this.timetrackingApiService.delete(id).subscribe(() => {
        this.timetrackingFormService.deleteAllTimetrackings();
        this.getTimetrackings();
      });
    } else {
      this.timetrackingFormService.deleteTimetracking(index);
    }
  }

  getDate(): string {
    const pickedDate: string = this.datepipe.transform(
      this.form.controls['date'].value,
      'dd-MM-yyyy'
    )!;

    return pickedDate;
  }
}
