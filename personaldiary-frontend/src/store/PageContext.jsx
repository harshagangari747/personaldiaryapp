import { createContext } from "react";
export const PageContext = createContext({
  title: {
    date: "",
    text: "",
  },
  notes: "",
  images: [],
  quote: "",
});
