export default interface Ticket {
  id: number;
  title: string;
  description: string;
  image: string;
  files: File[];
  tags: string[];
  date: number;
}