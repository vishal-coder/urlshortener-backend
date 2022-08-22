import express from "express";
import {
  createShortCode,
  getLongURLByShortCode,
  getAllURLS,
  URLCreatedByDay,
  URLCreatedByMonth,
  deleteURL,
  getTotalLinks,
  getTotalClicks,
  getMostPopularLink,
} from "../controller/URLShortnerController.js";

import { createShortCodeValidation } from "../validation/URLShortnerValidation.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("default request made");
  res.send("default request made");
});

router.post("/createShortCode", createShortCode);
router.get("/:shortCode", getLongURLByShortCode);
router.post("/getAllURLS", getAllURLS);
router.post("/widget/getURLCreatedByDay", URLCreatedByDay);
router.post("/widget/getURLCreatedByMonth", URLCreatedByMonth);
router.delete("/deleteURL", deleteURL);
router.post("/widget/totalLinks", getTotalLinks);
router.post("/widget/totaClicks", getTotalClicks);
router.post("/widget/mostPopular", getMostPopularLink);

export const urlShortnerRouter = router;
