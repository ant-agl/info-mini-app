interface Media {
  data: ArrayBuffer,
  name: string,
}

export default interface Ticket {
  title: string;
  content: string;
  groups: string[];
  time: number;
  media: Media[] | null,
}