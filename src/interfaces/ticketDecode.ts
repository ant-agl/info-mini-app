export default interface TicketDecode {
  title: ArrayBuffer;
  content: ArrayBuffer;
  groups: ArrayBuffer[];
  time: number;
  media: ArrayBuffer[];
}