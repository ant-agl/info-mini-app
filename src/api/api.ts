import axios from "axios";
import type { Ticket, TicketForm } from "../interfaces";
import { tickets } from "./mockData";
import bencode from "bencode";
import blake from "blakejs";

const dev = true;
const login = "admin";
const password = "qwerty";
const token = btoa(`${login}:${blake.blake2bHex(password, undefined, 64)}`);

const api = axios.create({
  baseURL: "http://37.46.135.206:1234/" + token,
  headers: {
    Accept: "application/x-bittorrent",
    "Content-Type": "application/x-bittorrent",
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

export function addTicket(data: TicketForm): Promise<number> {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve(0);
      return;
    }


    const bencoded = new TextDecoder('latin1').decode(bencode.encode(data))
    console.log(bencoded);
    // debugger;
    api.post("/new", bencoded)
      .then(res => {
        console.log('res.data', res.data);
        resolve(res.data);
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

    const bencoded = new TextDecoder('latin1').decode(bencode.encode(reason));
    console.log(bencoded);
    api.post("/reject/" + id) // bencode строка с правками
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