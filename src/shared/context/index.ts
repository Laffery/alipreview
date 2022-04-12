import { createContext, useContext } from "react";

export const defaultContextValue: SSRData = {
  props: {},
  location: "/",
  cookie: "",
};

export const Context = createContext<SSRData>(defaultContextValue);

export const getInitialContextValue = (): SSRData => {
  if (window && window.SSR_DATA) return window.SSR_DATA;
  return defaultContextValue;
};

export { useContext };
