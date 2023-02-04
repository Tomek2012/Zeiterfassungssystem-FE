import { Workpackage } from './workpackage';

export interface Timetrackings {
  fromTime: Date;
  toTime: Date;
  workingspackage: Workpackage;
  description: string;
}
