import axios from "axios";
import type { Ticket, TicketForm } from "../interfaces";
import { tickets } from "./mockData";
import bencode from "bencode";
import blake from "blakejs";

const dev = false;
const login = "admin";
const password = "qwerty";
const token = btoa(`${login}:${blake.blake2bHex(password, undefined, 64)}`);

const api = axios.create({
  // baseURL: "http://37.46.135.206:1234/" + token,
  baseURL: "https://donstu.ant-agl.ru/" + token,
  headers: {
    "Content-Type": "application/x-bittorrent",
    Accept: "text/plain, */*",
  },
});

export function getTickets(): Promise<Ticket[]> {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve(tickets);
      return;
    }

    api.get("/wmc")
      .then(res => {
        const decodeRes = bencode.decode( res.data, 'utf8' );
        const data: Ticket[] = [];
        decodeRes.forEach((item: TicketForm) => {
          data.push({
            title: item.title,
            description: item.content,
            tags: item.groups,
            date: item.time,
            media: null,
          });
        });
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

    // const bencoded = new TextDecoder('latin1').decode(bencode.encode(data));
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

export function sendForRevision(id: number, reason: string) {
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

export function sendForPublication(id: number) {
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