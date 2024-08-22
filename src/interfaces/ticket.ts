interface Media {
  name: string;
  url?: string;
  index: string;
  mimetype: string;
}

interface Correction {
  author: string;
  text: string;
  sat: boolean;
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
  corrections: Correction[];
}