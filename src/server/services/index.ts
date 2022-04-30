import { getCookie, Status } from "@/utils";
import { account as mockAccount, cookie, baseUrl } from "config";
import { Router } from "express";
import dayjs from "dayjs";

const router = Router();

router.use((req, _res, next) => {
  console.log(dayjs().format(`[api${req.url}] YYYY-MM-DD HH:mm:ssZ[z]`));
  next();
});

/** 登录 */
router.post("/user/login", async (req, res) => {
  const { username, password } = req.body as Account;

  if (username !== mockAccount.username || password !== mockAccount.password) {
    return res.end("Bad login.");
  }

  res.header("set-cookie", cookie);

  return res.end(Status.Success);
});

/** 登出 */
router.delete("/user/logout", async (req, res) => {
  res.header(
    "set-cookie",
    "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;"
  );
  return res.end(Status.Success);
});

/** 注册用户 */
router.post("/user/register", (req, res) => {
  const { username, password } = req.body as Account;

  if (username !== mockAccount.username) {
    return "That username is taken. Please choose another.";
  } else if (password.length < 8 || password.length > 72) {
    return "Passwords should be between 8 and 72 characters long. Please choose another.";
  }

  return res.end(Status.Success);
});

/** 根据cookie获取当前登录用户的信息 */
router.get("/user/info", async (req, res) => {
  const userId = getCookie(req.header("cookie"), "user").replace(/&.*$/, "");

  const result = await fetch(`${baseUrl}/v0/user/${userId}.json`);
  return res.json(await result.json());
});

export default router;
