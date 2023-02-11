import { Workpackage } from './workpackage';

export interface Timetrackings {
  id: Number;
  userId: string;
  fromTime: Date;
  toTime: Date;
  workingspackage: string;
  description: string;
}
