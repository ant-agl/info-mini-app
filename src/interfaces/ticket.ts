export default interface Ticket {
  id?: number;
  title: string;
  description: string;
  media: File[] | null;
  tags: string[];
  date: number;
}