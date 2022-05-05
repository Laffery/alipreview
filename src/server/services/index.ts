import { Router } from "express";
import { default as storyRouter } from "./story";
import { default as userRouter } from "./user";
import dayjs from "dayjs";

const router = Router();

router.use((req, _res, next) => {
  const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ssZ[z]");
  console.log(`[${timestamp}] api${req.url}`);
  next();
});

router.use(storyRouter);
router.use(userRouter);

export default router;
