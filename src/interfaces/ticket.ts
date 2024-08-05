interface Media {
  name: string;
  url: string;
  index: string;
  mimetype: string;
}

export default interface Ticket {
  id?: string;
  title: string;
  description: string;
  media: Media[];
  groups: string[];
  time: number;
  offer: boolean;
  authors: string[];
}