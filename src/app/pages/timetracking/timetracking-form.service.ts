import { DatePipe, formatDate, Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Timetrackings } from 'src/app/models/timetrackings';

@Injectable({
  providedIn: 'root',
})
export class TimetrackingFormService {
  total: number = 0;

  constructor(private datePipe: DatePipe) {}

  private timetrackingFormGroup = new FormGroup({
    date: new FormControl({
      value: new Date(),
      disabled: true,
    }),
    timetracking: new FormArray([]),
  });

  public getTimetrackingFormGroup(): FormGroup {
    return <FormGroup>this.timetrackingFormGroup;
  }

  public getTimetrackingList(): any {
    return this.timetrackingFormGroup.controls.timetracking;
  }
  public fillFormValuesForTimetracking(timetrackings: Array<Timetrackings>) {
    if (timetrackings.length > 0) {
      timetrackings.forEach((timetrackings, index) => {
        // const fromTimeDate = new Date(timetrackings.fromTime);
        // const toTimeDate = new Date(timetrackings.toTime);

        if (!this.getTimetrackingList().controls[index]) {
          this.addNewTimeTracking(index - 1);
        }

        this.getTimetrackingList().controls[index].patchValue({
          timeFrom: timetrackings.fromTime,
          timeTo: timetrackings.toTime,
          workpackage: timetrackings.workingspackage,
          description: timetrackings.description,
          // total: timetrackings. - fromTimeDate.getTime(),
        });
      });
    }
  }

  public addNewTimeTracking(index: number) {
    this.getTimetrackingList().insert(
      index + 1,
      new FormGroup({
        timeFrom: new FormControl('', Validators.required),
        timeTo: new FormControl('', Validators.required),
        workpackage: new FormControl('', Validators.required),
        description: new FormControl(''),
        total: new FormControl(''),
      })
    );
  }

  public deleteTimetracking(index: number) {
    this.getTimetrackingList().removeAt(index);
  }

  formatDate(date = new Date()) {
    return this.datePipe.transform(date, 'HH:mm');
  }

  calculateTotalTime(milliseconds: number): string {
    var minutes = Math.floor(milliseconds / 1000 / 60);
    var hours = Math.floor(minutes / 60);
    var total;

    if (minutes % 60 === 0) {
      if (hours < 10) {
        total = '0' + hours.toString() + ':' + '00';
      } else {
        total = hours.toString() + ':' + '00';
      }
    } else {
      if (hours < 10) {
        total = '0' + hours.toString() + ':' + minutes.toString();
      } else {
        total = hours.toString() + ':' + minutes.toString();
      }
    }
    return total;
  }
}
