import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Timetrackings } from 'src/app/models/timetrackings';

@Injectable({
  providedIn: 'root',
})
export class TimetrackingFormService {
  constructor(private datePipe: DatePipe) {}

  private timetrackingFormGroup = new FormGroup({
    timetracking: new FormArray([
      new FormGroup({
        timeFrom: new FormControl('', Validators.required),
        timeTo: new FormControl('', Validators.required),
        workpackage: new FormControl('', Validators.required),
        description: new FormControl(''),
        total: new FormControl({ value: '', disabled: true }),
      }),
    ]),
  });

  public getTimetrackingFormGroup(): FormGroup {
    return <FormGroup>this.timetrackingFormGroup;
  }

  public getTimetrackingList(): FormArray {
    return <FormArray>this.timetrackingFormGroup.controls.timetracking;
  }

  public fillFormValuesForTimetracking(timetrackings: Array<Timetrackings>) {
    timetrackings.forEach((timetrackings, index) => {
      if (!this.getTimetrackingList().controls[index]) {
        this.addNewTimeTracking(index - 1);
      }
      this.getTimetrackingList().controls[index].patchValue({
        timeFrom: this.formatDate(timetrackings.fromTime),
        timeTo: this.formatDate(timetrackings.toTime),
        workpackage: timetrackings.workingspackage.value,
        description: timetrackings.description,
        total: this.calculateTotalTime(
          timetrackings.fromTime,
          timetrackings.toTime
        ),
      });
    });
  }

  public addNewTimeTracking(index: number) {
    this.getTimetrackingList().insert(
      index + 1,
      new FormGroup({
        timeFrom: new FormControl('', Validators.required),
        timeTo: new FormControl('', Validators.required),
        workpackage: new FormControl('', Validators.required),
        description: new FormControl(''),
        total: new FormControl({ value: '', disabled: true }),
      })
    );
  }

  formatDate(date = new Date()) {
    return this.datePipe.transform(date, 'HH:mm');
  }

  public calculateTotalTime(startTime: Date, endTime: Date): string {
    var diff = endTime.getTime() - startTime.getTime();
    var seconds = diff / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;

    var total = hours.toString() + ':' + minutes.toString()
    return total;
  }
}
