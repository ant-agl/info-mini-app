export default interface Ticket {
  id?: number;
  title: string;
  description: string;
  images: File[];
  files: File[];
  tags: string[];
  date: number;
}