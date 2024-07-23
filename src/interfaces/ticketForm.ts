export default interface Ticket {
  id?: number;
  title: string;
  description: string;
  image: File | undefined;
  files: File[];
  tags: string[];
  date: number;
}