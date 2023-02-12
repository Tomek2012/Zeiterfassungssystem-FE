import { Workpackage } from './workpackage';

export interface Timetrackings {
  id: number;
  fromTime: string;
  toTime: string;
  workingspackage: string;
  description: string;
  timestamp: Date;
}
