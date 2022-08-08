import { client } from "../index.js";
import ISODate from "mongodb";

export async function isExistingURL(data) {
  return client.db("zen").collection("urlShortner").findOne(data);
}

export async function getURLByShortCode(data) {
  return client.db("zen").collection("urlShortner").findOne(data);
}

export async function insertShortCode(longURL, shortCode, username) {
  return client.db("zen").collection("urlShortner").insertOne({
    username: username,
    longURL: longURL,
    shortCode: shortCode,
    count: 0,
    createdAt: new Date(),
    lastAccess: new Date(),
  });
}

export async function incrementURLCount(data) {
  return client
    .db("zen")
    .collection("urlShortner")
    .updateOne(data, { $inc: { count: 1 }, $set: { lastAccess: new Date() } });
}
export async function getDataByUser(data) {
  return client.db("zen").collection("urlShortner").find(data).toArray();
}

export async function getURLByDuration(data, duration) {
  return client
    .db("zen")
    .collection("urlShortner")
    .find({
      $and: [
        {
          createdAt: { $gte: new Date(new Date().getTime() - duration) },
        },
        data,
      ],
    })
    .toArray();
}

export async function deleteURLdata(username, longURL) {
  return await client
    .db("zen")
    .collection("urlShortner")
    .deleteOne({ $and: [{ username: username }, { longURL: longURL }] });
}
