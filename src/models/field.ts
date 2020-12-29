import { ScheduleSlot } from './schedule-slot';

export class Field {
  public name: string;
  public startTime?: Date;
  public slotSize?: number;
  public slotNumber?: number;
  public slots?: ScheduleSlot[];

  constructor(data = {}) {
    this.name = 'Field X';
    // set default start time
    this.startTime = new Date();
    this.startTime.setHours(8);

    // slots default config
    this.slotSize = 60;
    this.slotNumber = 12;

    // initialize default slots
    this.slots = [];

    Object.assign(this, data);

    if (!this.slots.length) {
      for (let i = this.slotNumber; i > 0; i--) {
        this.slots.push(
          new ScheduleSlot({
            index: this.slotNumber - i
          })
        );
      }
    }
  }
}
