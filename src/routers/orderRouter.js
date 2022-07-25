import express from "express";

import { getRatings, getOrders } from "../fake-db/fakeDB.js";

const router = express.Router();

const ordersArg = [
  {
    _id: "ssss1",
    status: "processing", // new, pending, processing, complete, cancelled
    buyer: {
      buyerId: "121221", //_id of the user
      fName: "dsdsd",
      lName: "Dsdsd",
      email: "",
      phone: "dsds",
    },
    cart: {
      productId: "dsdsdsd",
      productName: "HD TV",
      salePrice: "4444",
      qty: 20,
      thumbnail: "http://",
      subTotal: 333,
    },
    cartTotal: "444",
    discount: "50",
    discountCode: "dsdsd",
    totalAmount: "34",
    paymentInfo: {
      status: "paid", // pending or paid
      method: "cash on pickup", // credit card...
      paidAmount: "12122",
      transactionID: "dsdds",
      paidDate: "10/10/2021",
    },
  },
  {
    _id: "ssss2",
    status: "processing", // new, pending, processing, complete, cancelled
    buyer: {
      buyerId: "121221", //_id of the user
      fName: "dsdsd",
      lName: "Dsdsd",
      email: "",
      phone: "dsds",
    },
    cart: {
      productId: "dsdsdsd",
      productName: "HD TV",
      salePrice: "4444",
      qty: 20,
      thumbnail: "http://",
      subTotal: 333,
    },
    cartTotal: "444",
    discount: "50",
    discountCode: "dsdsd",
    totalAmount: "34",
    paymentInfo: {
      status: "paid", // pending or paid
      method: "cash on pickup", // credit card...
      paidAmount: "12122",
      transactionID: "dsdds",
      paidDate: "10/10/2021",
    },
  },
  {
    _id: "ssss3",
    status: "processing", // new, pending, processing, complete, cancelled
    buyer: {
      buyerId: "121221", //_id of the user
      fName: "dsdsd",
      lName: "Dsdsd",
      email: "",
      phone: "dsds",
    },
    cart: {
      productId: "dsdsdsd",
      productName: "HD TV",
      salePrice: "4444",
      qty: 20,
      thumbnail: "http://",
      subTotal: 333,
    },
    cartTotal: "444",
    discount: "50",
    discountCode: "dsdsd",
    totalAmount: "34",
    paymentInfo: {
      status: "paid", // pending or paid
      method: "cash on pickup", // credit card...
      paidAmount: "12122",
      transactionID: "dsdds",
      paidDate: "10/10/2021",
    },
  },
  {
    _id: "ssss4",
    status: "processing", // new, pending, processing, complete, cancelled
    buyer: {
      buyerId: "121221", //_id of the user
      fName: "dsdsd",
      lName: "Dsdsd",
      email: "",
      phone: "dsds",
    },
    cart: {
      productId: "dsdsdsd",
      productName: "HD TV",
      salePrice: "4444",
      qty: 20,
      thumbnail: "http://",
      subTotal: 333,
    },
    cartTotal: "444",
    discount: "50",
    discountCode: "dsdsd",
    totalAmount: "34",
    paymentInfo: {
      status: "paid", // pending or paid
      method: "cash on pickup", // credit card...
      paidAmount: "12122",
      transactionID: "dsdds",
      paidDate: "10/10/2021",
    },
  },
  {
    _id: "ssss5",
    status: "processing", // new, pending, processing, complete, cancelled
    buyer: {
      buyerId: "121221", //_id of the user
      fName: "dsdsd",
      lName: "Dsdsd",
      email: "",
      phone: "dsds",
    },
    cart: {
      productId: "dsdsdsd",
      productName: "HD TV",
      salePrice: "4444",
      qty: 20,
      thumbnail: "http://",
      subTotal: 333,
    },
    cartTotal: "444",
    discount: "50",
    discountCode: "dsdsd",
    totalAmount: "34",
    paymentInfo: {
      status: "paid", // pending or paid
      method: "cash on pickup", // credit card...
      paidAmount: "12122",
      transactionID: "dsdds",
      paidDate: "10/10/2021",
    },
  },
  {
    _id: "ssss6",
    status: "processing", // new, pending, processing, complete, cancelled
    buyer: {
      buyerId: "121221", //_id of the user
      fName: "dsdsd",
      lName: "Dsdsd",
      email: "",
      phone: "dsds",
    },
    cart: {
      productId: "dsdsdsd",
      productName: "HD TV",
      salePrice: "4444",
      qty: 20,
      thumbnail: "http://",
      subTotal: 333,
    },
    cartTotal: "444",
    discount: "50",
    discountCode: "dsdsd",
    totalAmount: "34",
    paymentInfo: {
      status: "paid", // pending or paid
      method: "cash on pickup", // credit card...
      paidAmount: "12122",
      transactionID: "dsdds",
      paidDate: "10/10/2021",
    },
  },
  {
    _id: "ssss7",
    status: "processing", // new, pending, processing, complete, cancelled
    buyer: {
      buyerId: "121221", //_id of the user
      fName: "dsdsd",
      lName: "Dsdsd",
      email: "",
      phone: "dsds",
    },
    cart: {
      productId: "dsdsdsd",
      productName: "HD TV",
      salePrice: "4444",
      qty: 20,
      thumbnail: "http://",
      subTotal: 333,
    },
    cartTotal: "444",
    discount: "50",
    discountCode: "dsdsd",
    totalAmount: "34",
    paymentInfo: {
      status: "paid", // pending or paid
      method: "cash on pickup", // credit card...
      paidAmount: "12122",
      transactionID: "dsdds",
      paidDate: "10/10/2021",
    },
  },
  {
    _id: "ssss8",
    status: "processing", // new, pending, processing, complete, cancelled
    buyer: {
      buyerId: "121221", //_id of the user
      fName: "dsdsd",
      lName: "Dsdsd",
      email: "",
      phone: "dsds",
    },
    cart: {
      productId: "dsdsdsd",
      productName: "HD TV",
      salePrice: "4444",
      qty: 20,
      thumbnail: "http://",
      subTotal: 333,
    },
    cartTotal: "444",
    discount: "50",
    discountCode: "dsdsd",
    totalAmount: "34",
    paymentInfo: {
      status: "paid", // pending or paid
      method: "cash on pickup", // credit card...
      paidAmount: "12122",
      transactionID: "dsdds",
      paidDate: "10/10/2021",
    },
  },
  {
    _id: "ssss9",
    status: "processing", // new, pending, processing, complete, cancelled
    buyer: {
      buyerId: "121221", //_id of the user
      fName: "dsdsd",
      lName: "Dsdsd",
      email: "",
      phone: "dsds",
    },
    cart: {
      productId: "dsdsdsd",
      productName: "HD TV",
      salePrice: "4444",
      qty: 20,
      thumbnail: "http://",
      subTotal: 333,
    },
    cartTotal: "444",
    discount: "50",
    discountCode: "dsdsd",
    totalAmount: "34",
    paymentInfo: {
      status: "paid", // pending or paid
      method: "cash on pickup", // credit card...
      paidAmount: "12122",
      transactionID: "dsdds",
      paidDate: "10/10/2021",
    },
  },
  {
    _id: "ssss10",
    status: "processing", // new, pending, processing, complete, cancelled
    buyer: {
      buyerId: "121221", //_id of the user
      fName: "dsdsd",
      lName: "Dsdsd",
      email: "",
      phone: "dsds",
    },
    cart: {
      productId: "dsdsdsd",
      productName: "HD TV",
      salePrice: "4444",
      qty: 20,
      thumbnail: "http://",
      subTotal: 333,
    },
    cartTotal: "444",
    discount: "50",
    discountCode: "dsdsd",
    totalAmount: "34",
    paymentInfo: {
      status: "paid", // pending or paid
      method: "cash on pickup", // credit card...
      paidAmount: "12122",
      transactionID: "dsdds",
      paidDate: "10/10/2021",
    },
  },
];

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const orders = await getOrders(_id);

    res.json({
      status: "success",
      message: "Rating lists",
      orders,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

export default router;
