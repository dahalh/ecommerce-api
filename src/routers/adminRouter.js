import express from "express";
import { encryptPassword } from "../../helpers/bcrypthelper.js";
import { newAdminValidation } from "../middlewares/joi-validation/adminValidation.js";
import { insertAdmin } from "../models/admin/Admin.models.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "GET got hit to admin router",
  });
});

router.post("/", newAdminValidation, async (req, res, next) => {
  try {
    const hashPassword = encryptPassword(req.body.password);
    req.body.password = hashPassword;

    // create unique email validation code
    req.body.emailValidationCode = uuidv4();

    const result = await insertAdmin(req.body);

    console.log(result);

    if (result?._id) {
      // create unique url and send it to the user email

      const url = `${ROOT_URL}/admin/verify-email/?c=${result.emailValidationCode}&e=${result.email}`;

      // send email to the user

      res.json({
        status: "success",
        message: "New admin created successfully",
      });
    } else {
      res.json({
        status: "error",
        message:
          "Unable to create new admin. Please try again later or contact the admin",
      });
    }
  } catch (error) {
    error.status = 500;
    if (error.message.includes("E11000 duplicate key")) {
      error.message = "Email already exists";
      error.status = 200;
    }

    next(error);
  }
});

router.patch("/", (req, res) => {
  res.json({
    status: "success",
    message: "PATCH got hit to admin router",
  });
});

export default router;
