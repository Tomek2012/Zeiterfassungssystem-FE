import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { Workpackage } from 'src/app/models/workpackage';
import { TimetrackingFormService } from 'src/app/pages/timetracking/timetracking-form.service';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.css'],
})
export class TimeBarComponent implements OnInit {
  @Output() id = new EventEmitter<number>();
  @Input() form!: FormGroup;
  @Input() index!: number;

  workpackage: Workpackage[] = [
    { value: 'Paket-0', viewValue: 'Paket1' },
    { value: 'Paket-1', viewValue: 'Paket2' },
    { value: 'Paket-2', viewValue: 'Paket3' },
  ];

  constructor(private timetrackingFormService: TimetrackingFormService) {}

  ngOnInit(): void {
    this.setTotalTime();
    merge(
      this.form.controls['fromTime'].valueChanges,
      this.form.controls['toTime'].valueChanges
    ).subscribe(() => {
      this.setTotalTime();
      this.validateUndercutTime();
      this.validateTimeBetweenTimerange();
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
