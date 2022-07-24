import express from "express";

import { getRatings } from "../fake-db/fakeDB.js";

const router = express.Router();

const reviews = [
  {
    _id: "ssss1",
    productId: "111111",
    productName: "dsdsd",
    rating: 5,
    reviewedBy: "John",
    reviewedBy_id: "aaaaa",
  },
  {
    _id: "ssss2",
    productId: "111112",
    productName: "dsdse",
    rating: 4,
    reviewedBy: "Jane",
    reviewedBy_id: "aaaab",
  },
  {
    _id: "ssss3",
    productId: "111113",
    productName: "dsdsf",
    rating: 3,
    reviewedBy: "Sam",
    reviewedBy_id: "aaaac",
  },
  {
    _id: "ssss4",
    productId: "111114",
    productName: "dsdsg",
    rating: 5,
    reviewedBy: "Himanshu",
    reviewedBy_id: "aaaad",
  },
];

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    // const review = _id ? reviews.filter

    const ratings = await getRatings(_id);

    res.json({
      status: "success",
      message: "Rating lists",
      ratings,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

export default router;
