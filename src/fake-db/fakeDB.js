import axios from "axios";

// think of this file as your model file
export const getCustomers = (id) => {
  const customerUrl = id
    ? "https://jsonplaceholder.typicode.com/users/" + id
    : "https://jsonplaceholder.typicode.com/users/";
  return axios.get(customerUrl);
};

export const getRatings = (_id) => {
  const ratings = [
    {
      _id: "ssss1",
      productId: "111111",
      productName: "dsdsd",
      rating: 5,
      review: "This is a review for this product",
      reviewedBy: "John",
      reviewedBy_id: "aaaaa",
    },
    {
      _id: "ssss2",
      productId: "111112",
      productName: "dsdse",
      rating: 4,
      review: "This is a review for this product",
      reviewedBy: "Jane",
      reviewedBy_id: "aaaab",
    },
    {
      _id: "ssss3",
      productId: "111113",
      productName: "dsdsf",
      rating: 3,
      review: "This is a review for this product",
      reviewedBy: "Sam",
      reviewedBy_id: "aaaac",
    },
    {
      _id: "ssss4",
      productId: "111114",
      productName: "dsdsg",
      rating: 5,
      review: "This is a review for this product",
      reviewedBy: "Himanshu",
      reviewedBy_id: "aaaad",
    },
  ];
  return ratings;
};

export const getOrders = (_id) => {
  const orders = [
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
  ];
  return orders;
};
