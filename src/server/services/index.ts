import { Account } from "hackernews";
import { Status } from "shared/utils";
import { account as mockAccount } from "config";
import { Router } from "express";
import dayjs from "dayjs";

const router = Router();

router.use((req, _res, next) => {
  console.log(dayjs().format(`[api${req.url}] YYYY-MM-DD HH:mm:ssZ[z]`));
  next();
});

router.post("/login", (req, res) => {
  const account = req.body as Account;

  if (
    account.username !== mockAccount.username ||
    account.password !== mockAccount.password
  ) {
    return res.end("Bad Login.");
  }

  return res.end(Status.Success);
});

router.post("/register", (req, res) => {
  const account = req.body as Account;

  if (account.username !== mockAccount.username) {
    return "That username is taken. Please choose another.";
  } else if (account.password.length < 8 || account.password.length > 72) {
    return "Passwords should be between 8 and 72 characters long. Please choose another.";
  }

  return res.end(Status.Success);
});

export default router;
