export type Subscription = {
  _id?: number;
  icon:string;
  price: number;
  title: string;
  start: string;
  prettyStart:string;
  cycle: string;
  reminderDate: string;
}

export type Notification = {
  userId: string;
  title: string;
  price: number;
  delay: number;
}