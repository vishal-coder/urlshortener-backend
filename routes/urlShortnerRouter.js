import express from "express";
import {
  createShortCode,
  getLongURLByShortCode,
  getAllURLS,
  URLCreatedByDay,
  URLCreatedByMonth,
  deleteURL,
} from "../controller/URLShortnerController.js";

import { createShortCodeValidation } from "../validation/URLShortnerValidation.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("default request made");
  res.send("default request made");
});

router.post("/createShortCode", createShortCode);
router.get("/shortCode", getLongURLByShortCode);
router.get("/getAllURLS", getAllURLS);
router.get("/getURLCreatedByDay", URLCreatedByDay);
router.get("/getURLCreatedByMonth", URLCreatedByMonth);
router.delete("/deleteURL", deleteURL);

export const urlShortnerRouter = router;
