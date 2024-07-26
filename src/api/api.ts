import axios from "axios";
import type { Ticket, TicketForm } from "../interfaces";
import { tickets } from "./mockData";
import bencode from 'bencode';

const dev = true;

const api = axios.create({
  baseURL: "http://localhost:4200",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function getTickets(): Promise<Ticket[]> {
  return new Promise((resolve, reject) => {
    if (dev) {
      // const res = "ld7:authorsl5:admine7:content757:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis suscipit lacus ut orci tempus, a suscipit dui ultrices. Donec at enim lectus. Nunc sit amet mi elit. Sed condimentum massa non bibendum luctus. Quisque id turpis interdum, scelerisque lectus nec, maximus neque. In hendrerit lorem leo, pulvinar cursus tellus tincidunt eget. Duis rutrum egestas consequat. Pellentesque accumsan sapien velit, in vestibulum massa accumsan commodo. Sed sodales aliquam sollicitudin. Aenean gravida, lacus at elementum rhoncus, metus velit porttitor ante, in congue eros arcu ac mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam vel ornare erat. Nullam congue tellus lorem, ut rutrum lectus egestas sit amet. Quisque vulputate sagittis velit.6:groupsl3:alle5:index52:2024_07_18-02_56_41_0027f95a7a5998a5269eee3bbdb78bfe5:mediale4:timei1721030792e5:title68:Тестирование системы информированияee";
      // const data = bencode.decode( res, 'utf8' );
      // console.log(data);
      resolve(tickets);
      return;
    }

    api.get("/tickets")
      .then(res => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function getTicket(id: number): Promise<Ticket> {
  return new Promise((resolve, reject) => {
    if (dev) {
      const ticket = tickets.find(t => t.id == id);
      if (!ticket) {
        reject();
        return;
      }
      resolve(ticket);
      return;
    }

    api.get("/ticket/" + id)
      .then(res => {
        resolve(res.data);
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

    api.post("/add-ticket", data)
      .then(res => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function sendForRevision(id: number) {
  return new Promise((resolve, reject) => {
    if (dev) {
      resolve(true);
      return;
    }

    api.post("/send-revision", { id })
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

    api.post("/send-publication", { id })
      .then(res => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}