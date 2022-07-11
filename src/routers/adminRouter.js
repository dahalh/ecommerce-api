import express from "express";
import { encryptPassword, verifyPassword } from "../helpers/bcrypthelper.js";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminValidation,
  updateAdminValidation,
  updatePasswordValidation,
} from "../middlewares/joi-validation/adminValidation.js";
import {
  getAdmin,
  insertAdmin,
  updateAdmin,
} from "../models/admin/Admin.models.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import {
  otpNotification,
  profileUpdateNotification,
  sendMail,
} from "../helpers/emailHelper.js";
import { createOtp } from "../helpers/randomGeneratorHelper.js";
import {
  deleteSession,
  insertSession,
} from "../models/session/SessionModel.js";
import { createJWTs, signAccessJwt } from "../helpers/jwtHelper.js";

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "GET got hit to admin router",
  });
});

// new admin registration
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

      const url = `${process.env.ROOT_URL}/admin/verify-email/?c=${result.emailValidationCode}&e=${result.email}`;

      // send email to the user

      sendMail({ fName: result.fName, url });

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

// email verification router
router.post(
  "/email-verification",
  emailVerificationValidation,
  async (req, res) => {
    console.log(req.body);
    const filter = req.body;
    const update = { status: "active", emailValidationCode: "" };

    const result = await updateAdmin(filter, update);
    console.log(result);

    if (result?._id) {
      return res.json({
        status: "success",
        message: "Your email has been verified. You may login now",
      });
      // await updateAdmin(filter, { emailValidationCode: "" });
    }

    res.json({
      status: "error",
      message: "Invalid or expired verification link",
    });
  }
);

// login user with email and password
// this feature is not completed yet
router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // query get user by email
    const user = await getAdmin({ email });

    if (user?._id) {
      user.status === "inactive" &&
        res.json({
          status: "error",
          message:
            "Your account is not active yet, and follow the instructions to activate your account.",
        });
      // if user exist compare password,
      const isMatched = verifyPassword(password, user.password);
      console.log(isMatched);

      if (isMatched) {
        user.password = undefined;
        // for now

        const jwts = await createJWTs({ email: user.email });
        res.json({
          status: "success",
          message: "User logged in successfully",
          user,
          jwts,
        });

        return;
      }

      // if match, process for creating JWT and etc... for future
      // for now, send login success message with user
    }
    res.status(401).json({
      status: "error",
      message: "Invalid login credentials",
      // check for the authentication
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// update admin profile
router.put("/", updateAdminValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // query get user by email
    const user = await getAdmin({ email });

    if (user?._id) {
      const isMatched = verifyPassword(password, user.password);

      if (isMatched) {
        // update user
        const { _id, password, ...rest } = req.body;
        const updatedAdmin = await updateAdmin({ _id }, rest);

        if (updatedAdmin?._id) {
          // send email notification saying profile is updated
          profileUpdateNotification({
            fName: updatedAdmin.fName,
            email: updatedAdmin.email,
          });
          return res.json({
            status: "success",
            message: "Your profile has been updated successfully",
            user: updatedAdmin,
          });
        }
      }
    }

    res.json({
      status: "error",
      message: "Invalid request. Your profile did not get updated",
    });
  } catch (error) {
    error.status = 500;
    if (error.message.includes("E11000 duplicate key")) {
      error.message = "Email already exists";
      error.status = 200;
    }

    next(error);
  }
});

// password reset otp request
router.post("/otp-request", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email) {
      // check if user exists
      const user = await getAdmin({ email });

      if (user?._id) {
        // create otp and send email

        const obj = {
          token: createOtp(),
          associate: email,
          type: "updatePassword",
        };

        const result = await insertSession(obj);
        if (result?._id) {
          console.log(result);
          // to do more...
          res.json({
            status: "success",
            message:
              "If your email exists in our system, we will email you an OTP. Please check your email.",
          });

          // send the otp of admin email
          return otpNotification({
            token: result.token,
            email,
          });
        }
      }
    }
    res.json({
      status: "error",
      message: "Invalid request",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// reset password
router.patch("/password", async (req, res, next) => {
  try {
    const { otp, email, password } = req.body;
    console.log(req.bdoy);

    // 1. get session info based on the otp, so that we get the user email
    const session = await deleteSession({
      token: otp,
      associate: email,
    });
    console.log(session);
    if (session?._id) {
      // 2. based on the email update password in the database after encrypting
      const update = {
        password: encryptPassword(password),
      };
      const updatedUser = await updateAdmin({ email }, update);
      if (updatedUser?._id) {
        // send the email notification
        profileUpdateNotification({
          fName: updatedUser.fName,
          email: updatedUser.email,
        });
        res.json({
          status: "success",
          message: "Your password has been updated",
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid request. Unable to update the password",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// update password
router.patch(
  "/update-password",
  updatePasswordValidation,
  async (req, res, next) => {
    try {
      const { currentPassword, email, password } = req.body;
      console.log(req.body);

      const user = await getAdmin({ email });

      if (user?._id) {
        const isMatched = verifyPassword(currentPassword, user.password);
        if (isMatched) {
          const hashPassword = encryptPassword(password);

          const updatedUser = await updateAdmin(
            {
              _id: user._id,
            },
            {
              password: hashPassword,
            }
          );

          if (updatedUser?._id) {
            // profile update Notification
            profileUpdateNotification({
              fName: updatedUser.fName,
              email: updatedUser.email,
            });
            return res.json({
              status: "success",
              message: "Your password has been updated successfully",
            });
          }
        }
      }

      res.json({
        status: "error",
        message:
          "Error! Unable to update the password, please try again later.",
      });
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
);

export default router;
