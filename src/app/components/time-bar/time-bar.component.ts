import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Workpackage } from 'src/app/models/workpackage';
import { TimetrackingFormService } from 'src/app/pages/timetracking/timetracking-form.service';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.css'],
})
export class TimeBarComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() index!: number;

  workpackage: Workpackage[] = [
    { value: 'Paket-0', viewValue: 'Paket1' },
    { value: 'Paket-1', viewValue: 'Paket2' },
    { value: 'Paket-2', viewValue: 'Paket3' },
  ];

  timeTo!: Date;
  timeFrom!: Date;

  constructor(
    private timetrackingFormService: TimetrackingFormService,
  ) {}

  ngOnInit(): void {
    console.log(this.form.controls['timeFrom'].value);

    this.form.controls['timeTo'].valueChanges.subscribe(() => {
      console.log(this.form.controls['timeTo'].value);
    });
  }

  deleteTimetrack(index: number) {
    this.timetrackingFormService.deleteTimetracking(index);
  }
}
