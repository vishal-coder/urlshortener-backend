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
  getUserDataByDay,
} from "../controller/URLShortnerController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";

import { createShortCodeValidation } from "../validation/URLShortnerValidation.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("default request made");
  res.send("default request made");
});

router.post("/createShortCode", verifyAuth, createShortCode);
router.get("/:shortCode", verifyAuth, getLongURLByShortCode);
router.post("/getAllURLS", verifyAuth, getAllURLS);
router.post("/widget/getURLCreatedByDay", verifyAuth, URLCreatedByDay);
router.post("/widget/getURLCreatedByMonth", verifyAuth, URLCreatedByMonth);
router.delete("/deleteURL", verifyAuth, deleteURL);
router.post("/widget/totalLinks", verifyAuth, getTotalLinks);
router.post("/widget/totaClicks", verifyAuth, getTotalClicks);
router.post("/widget/mostPopular", verifyAuth, getMostPopularLink);
router.post("/widget/getDataByDay", verifyAuth, getUserDataByDay);

export const urlShortnerRouter = router;
