export default interface Ticket {
  id?: number;
  title: string;
  content: string;
  groups: string[];
  time: number;
  media: File[] | null;
}