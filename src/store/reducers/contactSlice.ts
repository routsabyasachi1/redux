import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface Card {
  id: string;
  firstName: string;
  lastName: string;
  status: boolean;
}

export interface ContactState {
  cards: Card[];
}

// Define the initial state using that type
const initialState: ContactState = {
  cards: [],
};

export const contactSlice = createSlice({
  name: "contact",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter((row) => row.id !== action.payload);
    },
    updateCard: (state, action: PayloadAction<Card>) => {
      state.cards = state.cards.map((contact) => {
        if (contact.id === action.payload.id) {
          return {
            ...contact,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            status: action.payload.status,
          };
        }
        return contact;
      });
    },
  },
});

export const { addCard, deleteCard, updateCard } = contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCards = (state: RootState) => state.contact.cards;

export default contactSlice.reducer;
