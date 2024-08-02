import type { Ticket } from "../interfaces";

export const tickets: Ticket[] = [
  {
    id: 0,
    title: "Тикет 0",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    media: [],
    tags: [ "Тег 1", "Тег 2" ],
    date: 1721650000
  },
  {
    id: 1,
    title: "Тикет 1",
    description: "Описаниие тикета 1",
    media: [],
    tags: [ "Тег 1" ],
    date: 1721260226
  },
  {
    id: 2,
    title: "Тикет 2",
    description: "Описаниие тикета 2",
    media: [],
    tags: [],
    date: 1721260226
  },
];