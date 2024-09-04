import axios from "axios";
import type { Ticket, TicketForm, TicketDecode, Bindings } from "../interfaces";
import { tickets } from "./mockData";
import bencode from "bencode";

const dev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
const token = localStorage.token ?? null;

const authError = () => {
  document.body.innerHTML = '<h1 style="text-align: center; margin: 0;">Ошибка авторизации</h1>';
}

export const api = axios.create({
  baseURL: "https://metodnikiforova.site/",
  headers: {
    "Content-Type": "application/x-bittorrent",
    Accept: "text/plain, */*",
    Authorization: token ?? "",
  },
});

function getUrl(img: ArrayBuffer): string {
  return "https://metodnikiforova.site/assets/" + new TextDecoder().decode(img);
}

export function getTickets(): Promise<Ticket[]> {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve(tickets);
      return;
    }

    api.get("/correspondence")
      .then(res => {
        const decodeRes = bencode.decode( res.data );
        console.log(decodeRes);

        const data: Ticket[] = decodeRes.map((item: TicketDecode) => ({
          id: new TextDecoder().decode(item.index),
          title: new TextDecoder().decode(item.title),
          description: new TextDecoder().decode(item.content),
          groups: item.groups.map(g => new TextDecoder().decode(g)),
          time: item.time,
          media: item.media.map(m => ({
            name: new TextDecoder().decode(m.name),
            url: getUrl(m.index),
            index: new TextDecoder().decode(m.index),
            mimetype: new TextDecoder().decode(m.mimetype)
          })),
          offer: item.offer,
          authors: item.authors.map(g => new TextDecoder().decode(g)),
          corrections: item.corrections.map(m => ({
            author: new TextDecoder().decode(m.author),
            text: new TextDecoder().decode(m.text),
            sat: m.sat == 1,
          })),
        }));
        console.log(data);

        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status == 401 || err?.response?.status == 424) {
          authError();
        }
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
        if (err.response.data)
          localStorage.setItem('errorMessage', err.response.data);

        reject(err);
      });
  });
}

export function editTicket(index: string, data: TicketForm): Promise<void> {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve();
      return;
    }

    api.patch("/edit/" + index, bencode.encode(data))
      .then(res => {
        console.log('res.data', res.data);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data)
          localStorage.setItem('errorMessage', err.response.data);

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

    api.get("/appr/" + id)
      .then(res => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function getBindings(): Promise<Bindings> {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve({ tg: 12321123 });
      return;
    }

    api.get("/bindings")
      .then(res => {
        const decodeRes = bencode.decode( res.data );
        resolve(decodeRes);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function saveBinding(proto: string, contact: number) {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve(true);
      return;
    }

    api.get(`/bind/${proto}/${contact}`)
      .then(res => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function getGroups(): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve([
        [
          'group1', 'group2', 'all'
        ],
        [
          'group3'
        ]
      ]);
      return;
    }

    api.get(`/groups`)
      .then(res => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
