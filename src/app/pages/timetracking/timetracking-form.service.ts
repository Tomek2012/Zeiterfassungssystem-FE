import { DatePipe } from '@angular/common';
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

  public getTimetrackingListAsFormGroup(): FormGroup[] {
    return (this.getTimetrackingList() as FormArray).controls as FormGroup[];
  }

  public fillFormValuesForTimetracking(timetrackings: Array<Timetrackings>) {
    if (timetrackings.length > 0) {
      timetrackings.forEach((timetrackings, index) => {
        if (!this.getTimetrackingList().controls[index]) {
          this.addNewTimeTracking(index - 1, timetrackings.id);
        }
        this.getTimetrackingList().controls[index].patchValue({
          id: timetrackings.id,
          fromTime: timetrackings.fromTime,
          toTime: timetrackings.toTime,
          workpackage: timetrackings.workingspackage,
          description: timetrackings.description,
          timestamp: timetrackings.timestamp,
        });
      });
    }
  }

  public addNewTimeTracking(index: number, id?: number) {
    this.getTimetrackingList().insert(
      index + 1,
      new FormGroup({
        id: new FormControl(id),
        fromTime: new FormControl('', Validators.required),
        toTime: new FormControl('', Validators.required),
        workpackage: new FormControl(''),
        description: new FormControl(''),
        timestamp: new FormControl(Date),
        total: new FormControl({ value: '', disabled: true }),
      })
    );
  }

  public deleteTimetracking(index: number) {
    this.getTimetrackingList().removeAt(index);
  }

  public deleteAllTimetrackings() {
    while (this.getTimetrackingList().length !== 0) {
      this.getTimetrackingList().removeAt(0);
    }
  }

  formatDate(date = new Date()) {
    return this.datePipe.transform(date, 'HH:mm');
  }

  calculateTotalTime(milliseconds: number): string {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}`;
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  validateTimeExits(index: number, time: Date): boolean {
    var betweenTimetrackings: boolean = false;
    for (var i = 0; i < this.getTimetrackingListAsFormGroup().length; i++) {
      if (index != i) {
        var starttime = new Date(
          '2023-01-01 ' +
            this.getTimetrackingListAsFormGroup()[i].controls['fromTime'].value
        );
        var endtime = new Date(
          '2023-01-01 ' +
            this.getTimetrackingListAsFormGroup()[i].controls['toTime'].value
        );

        if (time >= starttime && time <= endtime) {
          betweenTimetrackings = true;
        }
      }
    }
    return betweenTimetrackings;
  }
}
