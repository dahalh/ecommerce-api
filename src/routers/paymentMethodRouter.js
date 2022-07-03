import express from "express";
import { newPaymentMethodValidation } from "../middlewares/joi-validation/paymentValidation.js";
import {
  deletePaymentMethodById,
  getAllPaymentMethods,
  getAPaymentMethod,
  insertPaymentMethod,
  updatePaymentMethodById,
} from "../models/payment-methods/PaymentMethod.models.js";

const router = express.Router();

// return all active categories
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const result = _id
      ? await getAPaymentMethod({ _id })
      : await getAllPaymentMethods();

    res.json({
      status: "success",
      message: "payment methods result",
      result,
    });
  } catch (error) {
    next(error);
  }
});

// add new category
router.post("/", newPaymentMethodValidation, async (req, res, next) => {
  try {
    console.log(req.body);

    const result = await insertPaymentMethod(req.body);
    console.log(result);

    result?._id
      ? res.json({
          status: "success",
          message: "New Payment method has been added!",
        })
      : res.json({
          status: "error",
          message: "Unable to add payment method. Please try again later.",
        });
  } catch (error) {
    console.log(error);

    error.status = 500;
    if (error.message.includes("E11000 duplicate key")) {
      error.status = 200;
      error.message =
        "This payment method already exists. Please change the name of the new payment method";
    }
    next(error);
  }
});

// update category
router.put("/", async (req, res, next) => {
  try {
    console.log(req.body);

    const { _id, ...rest } = req.body;
    if (typeof _id === "string") {
      // call the query
      const result = await updatePaymentMethodById(_id, rest);
      if (result?._id) {
        return res.json({
          status: "success",
          message: "This payment method has been updated.",
        });
      }
    }

    res.json({
      status: "error",
      message: "Unable to update the payment method. Please try again later.",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (_id) {
      // call the query
      const result = await deletePaymentMethodById(_id);
      if (result?._id) {
        return res.json({
          status: "success",
          message: "The payment method has been deleted.",
        });
      }
    }

    res.json({
      status: "error",
      message:
        "The payment method could not be deleted. Please try again later.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
