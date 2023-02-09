import { Workpackage } from './workpackage';

export interface Timetrackings {
  id: Number;
  fromTime: Date;
  toTime: Date;
  workingspackage: Workpackage;
  description: string;
  userId: string;
}
