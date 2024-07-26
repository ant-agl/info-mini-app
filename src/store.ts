import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ticket } from './interfaces';

interface TicketState {
  tickets: Ticket[];
}

const initialState: TicketState = {
  tickets: [],
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
  },
});

export const { addTicket, updateTicket, setTickets } = ticketsSlice.actions;

const store = configureStore({
  reducer: {
    tickets: ticketsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;