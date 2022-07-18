import axios from "axios";

// think of this file as your model file
export const getCustomers = (id) => {
  const customerUrl = id
    ? "https://jsonplaceholder.typicode.com/users/" + id
    : "https://jsonplaceholder.typicode.com/users/";
  return axios.get(customerUrl);
};
