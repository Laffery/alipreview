import { useEffect, useState } from "react";
import { User } from "hackernews";
import { apiUrl } from "config";
import { fromFetch } from "rxjs/fetch";
import { firstValueFrom } from "rxjs";
import useCookie from "./use-cookie";

function useAuth(): User | undefined {
  const [user, setUser] = useState<User>();
  const { cookie } = useCookie();

  useEffect(() => {
    firstValueFrom(
      fromFetch(`${apiUrl}/user/info`, {
        headers: { cookie },
      })
    ).then(async (res) => {
      setUser((await res.json()) as User);
    });
  }, []);

  return user;
}

export default useAuth;
