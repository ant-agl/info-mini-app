export default interface Ticket {
  id?: string;
  title: string;
  description: string;
  media: string[];
  tags: string[];
  date: number;
}