export default interface Ticket {
  title: string;
  content: string;
  groups: string[];
  time: number;
  media: (string | ArrayBuffer)[] | null;
}