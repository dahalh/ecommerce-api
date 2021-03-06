import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import path from "path";

const PORT = process.env.PORT || 8000;

// use middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// server static content

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// mongodb connect
import { dbConnect } from "./src/config/dbConfig.js";
dbConnect();

// routers
import adminRouter from "./src/routers/adminRouter.js";
import categoryRouter from "./src/routers/categoryRouter.js";
import productRouter from "./src/routers/productRouter.js";
import paymentMethodRouter from "./src/routers/paymentMethodRouter.js";
import { adminAuth } from "./src/middlewares/auth-middlewares/authMiddleware.js";
import customerRouter from "./src/routers/customerRouter.js";
import ratingRouter from "./src/routers/ratingRouter.js";
import orderRouter from "./src/routers/orderRouter.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/category", adminAuth, categoryRouter);
app.use("/api/v1/products", adminAuth, productRouter);
app.use("/api/v1/payment-method", adminAuth, paymentMethodRouter);
app.use("/api/v1/customers", adminAuth, customerRouter);
app.use("/api/v1/ratings", adminAuth, ratingRouter);
app.use("/api/v1/orders", adminAuth, orderRouter);

app.get("/", (req, res) => {
  res.json({
    message: "you have reached the admin api",
  });
});

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  // log in file system or time series db like cloudwatch

  res.status(err.status || 500);
  res.json({
    status: "error",
    message: err.message,
  });
});

// bound app with the port to serve on internet
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running on http://localhost:${PORT}`);
});
