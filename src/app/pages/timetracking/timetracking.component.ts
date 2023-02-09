import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Timetrackings } from 'src/app/models/timetrackings';
import { TimetrackingFormService } from './timetracking-form.service';
import { TimetrackingApiService } from 'src/app/api/timetracking-api.service';

@Component({
  selector: 'app-timetracking',
  templateUrl: './timetracking.component.html',
  styleUrls: ['./timetracking.component.css'],
})
export class TimetrackingComponent implements OnInit {
  // Demodaten
  vonDatum = new Date('February 04, 2023 15:15:30');
  zeiten: Array<Timetrackings> = [
    {
      id: 1,
      fromTime: new Date('February 04, 2023 15:15:30'),
      toTime: new Date('February 04, 2023 18:15:30'),
      workingspackage: { value: 'Paket-0', viewValue: 'Paket1' },
      description: 'Test',
      userId: 'test'
    },
    {
      id: 1,
      fromTime: new Date('February 04, 2023 18:15:31'),
      toTime: new Date('February 04, 2023 19:15:31'),
      workingspackage: { value: 'Paket-1', viewValue: 'Paket2' },
      description: 'Test2',
      userId: 'test'
    },
  ];

  times!: Array<Timetrackings>;

  form!: FormGroup;
  total!: string;

  constructor(
    private timetrackingFormService: TimetrackingFormService,
    private timetrackingApiService: TimetrackingApiService
  ) {
    this.form = timetrackingFormService.getTimetrackingFormGroup();
  }

  ngOnInit(): void {
    this.form.controls['date'].valueChanges.subscribe((value) => {
      this.total = this.timetrackingFormService.calculateTotalTime(
        this.timetrackingFormService.total
      );
    });
    this.form.controls['date'].setValue(new Date());
    this.timetrackingApiService.getAllTimetrackings().subscribe((res) => {
      this.times = res;
      console.log(this.times);
      this.fillFormWithTimeData();
    });
  }

  public getTimetrackingList(): FormGroup[] {
    return (this.timetrackingFormService.getTimetrackingList() as FormArray)
      .controls as FormGroup[];
  }

  fillFormWithTimeData() {
    this.timetrackingFormService.fillFormValuesForTimetracking(this.times);
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

  createTimetrack() {
    this.timetrackingFormService.addNewTimeTracking(
      this.getTimetrackingList().length
    );
  }
}
