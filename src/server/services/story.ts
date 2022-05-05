import { baseUrl } from "config";
import { Router } from "express";

const router = Router();

router.get("/item/*", async (req, res) => {
  const result = await fetch(`${baseUrl}/v0/${req.url}.json`);
  return res.json(await result.json());
});

export default router;
