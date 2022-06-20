import express from "express";
import { newCategoryValidation } from "../middlewares/joi-validation/productCategoryValidation.js";
const router = express.Router();
import {
  deleteCatById,
  getAllCategories,
  getCategories,
  insertCategory,
  updateCategoryById,
} from "../models/category/Category.models.js";
import slugify from "slugify";

// add new category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    const slug = slugify(req.body.catName, { lower: true, trim: true });

    // console.log(slug);
    const result = await insertCategory({ ...req.body, slug });

    result?._id
      ? res.json({ status: "success", message: "New category has been added!" })
      : res.json({
          status: "error",
          message: "Unable to add the category, Please try again later.",
        });
  } catch (error) {
    console.log(error);

    if (error.message.includes("E11000 duplicate key")) {
      error.status = 200;
      error.message =
        "This category already exists, please change the name of new category";
    }
    error.status = 500;
    next(error);
  }
});

// return all active categories
router.get("/", async (req, res, next) => {
  try {
    const filter = { status: "active" };
    const result = await getAllCategories(filter);

    res.json({
      status: "success",
      message: "categories result",
      result,
    });
  } catch (error) {
    next(error);
  }
});

// update status of category
router.patch("/", async (req, res, next) => {
  try {
    const { _id, status } = req.body;

    if (!_id || !status) {
      throw new Error("Invalid data set");
    }

    const result = await updateCategoryById(_id, { status });
    result?._id
      ? res.json({
          satus: "success",
          message: "categories result",
          result,
        })
      : res.json({
          satus: "error",
          message: "unable to update. try again later",
          result,
        });
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { _id } = req.body;
    const filter = { parentCatId: _id };

    const childCats = await getCategories(filter);
    if (childCats.length) {
      return res.json({
        status: "error",
        message:
          "Some child categories depend on this parent category. Re-allocate those child categories to other parent categories. Then, proceed to delete",
      });
    }

    const result = await deleteCatById(_id);
    result?._id
      ? res.json({
          status: "success",
          message: "The category has been deleted",
        })
      : res.json({
          status: "error",
          message: "Unable to delete. Try again later",
        });
  } catch (error) {
    next(error);
  }
});

// update category
router.put("/", newCategoryValidation, async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;

    const result = await updateCategoryById(_id, rest);

    result?._id
      ? res.json({ status: "success", message: "New category has been added!" })
      : res.json({
          status: "error",
          message: "Unable to add the category, Please try again later.",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
