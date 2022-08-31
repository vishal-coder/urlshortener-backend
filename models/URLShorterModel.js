import { client } from "../index.js";
import ISODate from "mongodb";

export async function isExistingURL(data) {
  return client.db("zen").collection("urlShortner").findOne(data);
}

export async function getURLByShortCode(data) {
  console.log("getURLByShortCode", data);
  return client.db("zen").collection("urlShortner").findOne(data);
}

export async function insertShortCode(longURL, shortCode, username) {
  return client.db("zen").collection("urlShortner").insertOne({
    username: username,
    longURL: longURL,
    shortCode: shortCode,
    clicks: 0,
    createdAt: new Date(),
    lastAccess: new Date(),
  });
}

export async function incrementURLCount(data) {
  return client
    .db("zen")
    .collection("urlShortner")
    .updateOne(data, { $inc: { clicks: 1 }, $set: { lastAccess: new Date() } });
}
export async function getDataByUser(data) {
  const query = [
    { $match: data },
    {
      $project: {
        id: "$_id",
        longURL: "$longURL",
        shortCode: "$shortCode",
        clicks: "$clicks",
        lastAccess: "$lastAccess",
        createdAt: {
          $dateToString: { format: "%m/%d/%Y %H:%m:%S", date: "$createdAt" },
        },
        lastAccess: {
          $dateToString: { format: "%m/%d/%Y %H:%m:%S", date: "$lastAccess" },
        },
      },
    },
  ];
  return client.db("zen").collection("urlShortner").aggregate(query).toArray();
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

export async function getTotalLinksCount(data) {
  return await client.db("zen").collection("urlShortner").countDocuments(data);
}
export async function getTotalClicksCount(data) {
  const query = [
    { $match: data },
    { $group: { _id: "$username", TotalSum: { $sum: "$clicks" } } },
    {
      $project: {
        TotalSum: 1,
        _id: 0,
      },
    },
  ];
  return await client
    .db("zen")
    .collection("urlShortner")
    .aggregate(query)
    .toArray();
}

export async function getPopularURL(data) {
  return await client
    .db("zen")
    .collection("urlShortner")
    .find(data, { longURL: 1, clicks: 1, _id: 0 })
    .sort({ clicks: -1 })
    .limit(1)
    .toArray();
}

export async function getDayWiseData(data) {
  const query = [
    { $match: data },
    {
      $project: {
        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      },
    },
    {
      $group: {
        _id: "$date",
        count: { $sum: 1 },
      },
    },
  ];

  return await client
    .db("zen")
    .collection("urlShortner")
    .aggregate(query)
    .toArray();
}
