export default interface Ticket {
  id?: number;
  title: string;
  description: string;
  media: string[];
  tags: string[];
  date: number;
}