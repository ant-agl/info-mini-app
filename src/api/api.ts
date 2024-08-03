import axios from "axios";
import type { Ticket, TicketForm, TicketDecode } from "../interfaces";
import { tickets } from "./mockData";
import bencode from "bencode";
import blake from "blakejs";

const dev = false;
const login = "admin";
// const login = "admin2";
const password = "qwerty";
const token = btoa(`${login}:${blake.blake2bHex(password, undefined, 64)}`);

const api = axios.create({
  baseURL: "https://donstu.ant-agl.ru/" + token,
  headers: {
    "Content-Type": "application/x-bittorrent",
    Accept: "text/plain, */*",
  },
});

function getUrl(img: ArrayBuffer) {
  return "https://so.ant-agl.ru/assets/" + new TextDecoder().decode(img);
}

export function getTickets(): Promise<Ticket[]> {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve(tickets);
      return;
    }

    api.get("/wmc")
      .then(res => {
        const decodeRes = bencode.decode( res.data );
        console.log(decodeRes);

        const data: Ticket[] = decodeRes.map((item: TicketDecode) => ({
          id: new TextDecoder().decode(item.index),
          title: new TextDecoder().decode(item.title),
          description: new TextDecoder().decode(item.content),
          tags: item.groups.map(g => new TextDecoder().decode(g)),
          date: item.time,
          media: item.media.map(i => getUrl(i)),
        }));
        console.log(data);

        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function addTicket(data: TicketForm): Promise<void> {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve();
      return;
    }

    api.post("/new", bencode.encode(data))
      .then(res => {
        console.log('res.data', res.data);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function sendForRevision(id: string, reason: string) {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve(true);
      return;
    }

    api.post("/reject/" + id, bencode.encode(reason))
      .then(res => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function sendForPublication(id: string) {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve(true);
      return;
    }

    api.post("/approve/" + id)
      .then(res => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}