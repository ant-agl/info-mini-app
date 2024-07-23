import axios from "axios";
import type { Ticket, TicketForm } from "../interfaces";
import { tickets } from "./mockData";

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