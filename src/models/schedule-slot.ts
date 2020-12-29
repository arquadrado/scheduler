export enum Duration {
  HALF = 'HALF',
  FULL = 'FULL'
}

export class ScheduleSlot {
  public index: number;
  public duration: Duration;
  public owner: string;

  constructor(data = {}) {
    this.index = 0;
    this.duration = Duration.FULL;
    this.owner = '';

    Object.assign(this, data);
  }
}
