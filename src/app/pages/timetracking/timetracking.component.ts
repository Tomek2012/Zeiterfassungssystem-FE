import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { TimetrackingApiService } from 'src/app/api/timetracking-api.service';
import { TimetrackingFormService } from './timetracking-form.service';

@Component({
  selector: 'app-timetracking',
  templateUrl: './timetracking.component.html',
  styleUrls: ['./timetracking.component.css'],
})
export class TimetrackingComponent implements OnInit {
  form!: FormGroup;
  total!: string;

  constructor(
    private timetrackingFormService: TimetrackingFormService,
    private timetrackingApiService: TimetrackingApiService
  ) {
    this.form = timetrackingFormService.getTimetrackingFormGroup();
  }

  ngOnInit(): void {
    /**Einstieg in den heutigen Tag */
    this.form.controls['date'].setValue(new Date());
    this.form.controls['date'].valueChanges.subscribe((value) => {
      /**Hier soll der Datumsabruf rein */
    });

    // Abruf der vorhandenen Zeiterfassungen
    this.timetrackingApiService.getAllTimetrackings().subscribe((res) => {
      this.timetrackingFormService.fillFormValuesForTimetracking(res);
    });

    // TODO: Insgesamt-Zeit muss ausimplementiert werden
    // this.form.controls['timetracking'].valueChanges.subscribe(() => {
    //   var collectTime: number = 0;
    //   for (var i = 0; i < this.getTimetrackingList().length; i++) {
    //     collectTime += this.getTimetrackingList()[i].controls['total'].value;
    //     this.total =
    //       this.timetrackingFormService.calculateTotalTime(collectTime);
    //   }
    // });
  }

  public getTimetrackingList(): FormGroup[] {
    return (this.timetrackingFormService.getTimetrackingList() as FormArray)
      .controls as FormGroup[];
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
