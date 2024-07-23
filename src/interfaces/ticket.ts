export default interface Ticket {
  id?: number;
  title: string;
  description: string;
  image: string | undefined;
  files: File[];
  tags: string[];
  date: number;
}