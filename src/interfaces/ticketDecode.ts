interface Media {
  name: ArrayBuffer;
  index: ArrayBuffer;
  mimetype: ArrayBuffer;
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
}