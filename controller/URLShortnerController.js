import validUrl from "valid-url";
import {
  isExistingURL,
  getURLByShortCode,
  insertShortCode,
  incrementURLCount,
  getDataByUser,
  getURLByDuration,
  deleteURLdata,
  getPopularURL,
  getTotalClicksCount,
  getTotalLinksCount,
} from "../models/URLShorterModel.js";

import { generateShortCode } from "../utility/shortCode.js";

export const createShortCode = async (req, res) => {
  console.log("inside createshortcode", req.body.longURL);
  const { longURL, username } = req.body;
  if (!longURL || !username) {
    return res.send({ message: "Invalid Data", success: false });
  }

  let duplicateFlag = true;
  let shortCode;

  if (!validUrl.isUri(longURL)) {
    console.log("Not an URI");
    return res.send({ message: "Invalid URL", success: false });
  }

  const isExistingLongURL = await isExistingURL({
    longURL: longURL,
    username: username,
  });
  if (isExistingLongURL) {
    return res.status(200).send({
      message: "ShortURL created successfully",
      success: true,
      shortURL: `${process.env.BASE_DOMAIN_URL}/${isExistingLongURL.shortCode}`,
    });
  }

  while (duplicateFlag) {
    shortCode = await generateShortCode();
    const isDuplicate = await getURLByShortCode({ shortCode: shortCode });
    if (!isDuplicate) {
      duplicateFlag = false;
    }
  }
  const saveShortCode = await insertShortCode(longURL, shortCode, username);
  res.status(200).send({
    message: "successfully created short url",
    success: true,
    shortURL: `${process.env.BASE_DOMAIN_URL}/${shortCode}`,
  });
};
export const getLongURLByShortCode = async (req, res) => {
  console.log("request made", req.params);
  const { shortCode } = req.params;

  const longURL = await getURLByShortCode({ shortCode: shortCode });
  if (!longURL) {
    return res.status(401).send({ message: "Invalid URL", success: false });
  }
  const incremented = await incrementURLCount({ shortCode: shortCode });
  return res.status(200).send({
    message: "URL successfully retrieved",
    success: true,
    longURL: longURL.longURL,
  });
};
export const getAllURLS = async (req, res) => {
  const { username } = req.body;
  const UserData = await getDataByUser({ username: username });
  if (!UserData) {
    return res
      .status(401)
      .send({ message: "User data not available", success: false });
  }

  res
    .status(200)
    .send({ message: "retrieved User data", success: true, data: UserData });
};
export const URLCreatedByDay = async (req, res) => {
  const { username } = req.body;
  const duration = 24 * 60 * 60 * 1000; //24 hrs
  const Data = await getURLByDuration({ username: username }, duration);
  if (!Data) {
    return res
      .status(401)
      .send({ message: "User data not available", success: false });
  }

  res
    .status(200)
    .send({ message: "retrieved User data", success: true, data: Data });
};
export const URLCreatedByMonth = async (req, res) => {
  const { username } = req.body;
  const duration = 30 * 24 * 60 * 60 * 1000; // 30 days
  const Data = await getURLByDuration({ username: username }, duration);
  if (!Data) {
    return res
      .status(401)
      .send({ message: "User data not available", success: false });
  }

  res
    .status(200)
    .send({ message: "retrieved User data", success: true, data: Data });
};

export const deleteURL = async (req, res) => {
  const { username, longURL } = req.body;
  if (!longURL) {
    return res.send({ message: "Invalid URL", success: false });
  }

  const isDeleted = await deleteURLdata(username, longURL);
  console.log("isDeleted.deletedCount", isDeleted.deletedCount);
  if (isDeleted.deletedCount == 0) {
    return res.send({ message: "Please check your URL", success: false });
  }
  return res.send({ message: "Deleted successfully", success: true });
};

export const getTotalLinks = async (req, res) => {
  const { username } = req.body;

  const count = await getTotalLinksCount({ username: username });
  if (!count) {
    return res
      .status(401)
      .send({ message: "User data not available", success: false });
  }

  res.status(200).send({
    message: "retrieved User data",
    success: true,
    title: "Total links",
    data: count,
  });
};

export const getTotalClicks = async (req, res) => {
  const { username } = req.body;

  const count = await getTotalClicksCount({ username: username });
  console.log("count is", count);
  console.log("count is", count[0]);
  console.log("count is", count[0].TotalSum);
  if (!count) {
    return res
      .status(401)
      .send({ message: "User data not available", success: false });
  }

  res.status(200).send({
    message: "retrieved User data",
    success: true,
    title: "Total clicks",
    data: count[0].TotalSum,
  });
};

export const getMostPopularLink = async (req, res) => {
  const { username } = req.body;

  const popular = await getPopularURL({ username: username });
  console.log("popular is", popular);
  console.log("popular is", popular[0]);
  console.log("popular is", popular[0].longURL);
  console.log("popular is", popular[0].clicks);
  if (!popular) {
    return res
      .status(401)
      .send({ message: "User data not available", success: false });
  }

  res.status(200).send({
    message: "retrieved User data",
    success: true,
    data: popular[0].longURL,
    title: "Most Popular",
  });
};
