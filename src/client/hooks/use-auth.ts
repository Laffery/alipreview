import { useEffect, useState } from "react";
import { apiUrl } from "config";
import { fromFetch } from "rxjs/fetch";
import { firstValueFrom, switchMap } from "rxjs";
import { useCookie } from "./use-cookie";
import { Status } from "@/utils";

export function useAuth(): [User | undefined, () => Promise<string>] {
  const [user, setUser] = useState<User>();
  const { cookie } = useCookie();
  const logout = async () => {
    if (!user) return Status.Success;
    setUser(undefined);
    return firstValueFrom(
      fromFetch(`${apiUrl}/user/logout`, {
        method: "delete",
      }).pipe(switchMap((res) => res.text()))
    );
  };

  useEffect(() => {
    firstValueFrom(
      fromFetch(`${apiUrl}/user/info`, {
        headers: cookie ? { cookie } : {},
      })
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res["error"]) setUser(res as User);
      });
  }, []);

  return [user, logout];
}
