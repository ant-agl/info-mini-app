interface Media {
  name: ArrayBuffer;
  index: ArrayBuffer;
  mimetype: ArrayBuffer;
}

interface Corrections {
  author: ArrayBuffer;
  text: ArrayBuffer;
  sat: number
}

export default interface TicketDecode {
  index: ArrayBuffer;
  title: ArrayBuffer;
  content: ArrayBuffer;
  groups: ArrayBuffer[];
  time: number;
  media: Media[];
  offer: ArrayBuffer;
  authors: ArrayBuffer[];
  corrections: Corrections[];
}