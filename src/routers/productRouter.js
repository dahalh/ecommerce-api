import express from "express";
import slugify from "slugify";
import {
  newProductValidation,
  updateProductValidation,
} from "../middlewares/joi-validation/productCategoryValidation.js";
import {
  deleteMultipleProducts,
  getMultipleProducts,
  getProduct,
  insertProduct,
  updateProductById,
} from "../models/product/Product.model.js";

import multer from "multer";
// multer setup for validation and upload destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    let error = null;
    // validation test
    cb(error, "public/img/products");
  },
  filename: (req, file, cb) => {
    const fullFileName = Date.now() + "-" + file.originalname;
    cb(null, fullFileName);
  },
});

const upload = multer({ storage });

const router = express.Router();
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const products = _id
      ? await getProduct({ _id })
      : await getMultipleProducts();

    res.json({
      status: "success",
      message: "Product lists",
      products,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post(
  "/",
  upload.array("images", 5),
  newProductValidation,
  async (req, res, next) => {
    try {
      const files = req.files;
      console.log(files);

      const images = files.map((img) => img.path);

      const { name } = req.body;
      const slug = slugify(name, { lower: true, trim: true });
      req.body.slug = slug;

      const result = await insertProduct({
        ...req.body,
        images,
        thumbnail: images[0],
      });
      result?._id
        ? res.json({
            status: "success",
            message: "New product has been created!",
          })
        : res.json({
            status: "error",
            message: "Error! Unable to create new product",
          });
    } catch (error) {
      // duplicate slug and the sku
      if (error.message.includes("E11000 duplicate key error collection")) {
        error.message =
          "Another product with similar either Name or SKU already exists";
        error.status = 200;
      }
      next(error);
    }
  }
);

router.delete("/", async (req, res, next) => {
  try {
    const ids = req.body;
    if (ids.length) {
      const result = await deleteMultipleProducts(ids);
      console.log(result);
      if (result?.deletedCount) {
        return res.json({
          status: "success",
          message: "Successfully deleted the product.",
        });
      }
    }
    res.json({
      status: "error",
      message: "Unable to delete the product. Please try again later",
    });
    console.log(req.body, "dsdsds");
  } catch (error) {
    next(error);
  }
});

router.put(
  "/",
  upload.array("newImages", 5),
  updateProductValidation,
  async (req, res, next) => {
    try {
      console.log(req.body);

      const { _id, imgToDelete, ...rest } = req.body;
      // 1. make new array for the images and replace in the database
      const files = req.files;
      // console.log(req.body, "passed through validaition");
      const images = files.map((img) => img.path); // new incoming images
      const oldImgList = rest.images.split(","); // old images from database before editing product
      // imgToDelete holds the images that is in the oldImagList that need to be removed

      // remove the deleted image from oldImagList

      const filteredImages = oldImgList.filter(
        (img) => !imgToDelete.includes(img)
      );

      // override from rest
      rest.images = [...filteredImages, ...images];
      // 2. delete image from the file system

      const result = await updateProductById(_id, rest);

      result?._id
        ? res.json({
            status: "success",
            message: "Product has been updated",
          })
        : res.json({
            status: "error",
            message: "Unable to update the product, please try again later",
          });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
