import { Context, useContext } from "shared/context";

export function useLocation() {
  const context = useContext(Context);
  if (typeof window === "undefined") return context.location;
  return window.location.pathname;
}
