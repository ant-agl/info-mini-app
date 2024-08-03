export default interface TicketDecode {
  index: ArrayBuffer;
  title: ArrayBuffer;
  content: ArrayBuffer;
  groups: ArrayBuffer[];
  time: number;
  media: ArrayBuffer[];
}