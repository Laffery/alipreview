import { Context, useContext } from "shared/context";

function useLocation() {
  const context = useContext(Context);
  if (typeof window === "undefined") return context.location;
  return window.location.pathname;
}

export default useLocation;
