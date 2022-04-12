import { Context, useContext } from "shared/context";

function useCookie() {
  const context = useContext(Context);
  const cookie =
    typeof document === "undefined" ? context.cookie : document.cookie;

  function getCookie(name: string): string {
    if (cookie.length === 0) return "";
    let start = cookie.indexOf(`${name}=`);
    if (start !== -1) {
      start = start + name.length + 1;
      let end = cookie.indexOf(";", start);
      if (end === -1) end = cookie.length;
      return decodeURI(cookie.substring(start, end));
    }
    return "";
  }

  return { cookie, get: getCookie };
}

export default useCookie;
