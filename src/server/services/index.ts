import { Account } from "hackernews";
import { Status, cvtAccount2FormData } from "@/utils";
import { hackUrl, account as mockAccount } from "config";
import { Router } from "express";
import dayjs from "dayjs";

const router = Router();

router.use((req, _res, next) => {
  console.log(dayjs().format(`[api${req.url}] YYYY-MM-DD HH:mm:ssZ[z]`));
  next();
});

router.post("/login", async (req, res) => {
  const result = await fetch(`${hackUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: cvtAccount2FormData(req.body),
    // prevent redirect automatically
    redirect: "manual",
  });

  const html = await result.text();
  if (/Bad login\./.test(html)) {
    return res.end("Bad login.");
  }

  const setCookie = result.headers.get("set-cookie");
  if (setCookie) {
    res.header("set-cookie", setCookie);
  }

  return res.end(Status.Success);
});

router.post("/register", (req, res) => {
  const { username, password } = req.body as Account;

  if (username !== mockAccount.username) {
    return "That username is taken. Please choose another.";
  } else if (password.length < 8 || password.length > 72) {
    return "Passwords should be between 8 and 72 characters long. Please choose another.";
  }

  return res.end(Status.Success);
});

export default router;
