export interface IEvent {
  _id: string;
  __v: number;
  firstName: string;
  lastName: string;
  email: string;
  eventTitle: string;
  startDate: string;
  endDate: string;
}

export interface IProcessedEvent {
  title: string;
  start: Date;
  end: Date;
}
