import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Workpackage } from 'src/app/models/workpackage';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.css'],
})
export class TimeBarComponent implements OnInit {
  @Input() form!: FormGroup;

  workpackage: Workpackage[] = [
    { value: 'Paket-0', viewValue: 'Paket1' },
    { value: 'Paket-1', viewValue: 'Paket2' },
    { value: 'Paket-2', viewValue: 'Paket3' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
