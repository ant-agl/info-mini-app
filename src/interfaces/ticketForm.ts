export interface Media {
  data?: ArrayBuffer | File,
  index?: string,
  name: string,
}

export default interface Ticket {
  title: string;
  content: string;
  groups: string[];
  time: number;
  media: Media[] | null,
}