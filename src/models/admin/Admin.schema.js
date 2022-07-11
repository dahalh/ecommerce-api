import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [20, "First name must be less than 20 characters"],
    },
    lName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [30, "First name must be less than 30 characters"],
    },

    dob: {
      type: Date,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
      trim: true,
      maxlength: [50, "email must be less than 50 characters"],
    },
    emailValidationCode: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: true,
      maxLength: [15, "phone number must be less than 15 characters"],
      minLength: [10, "phone number must be less than 10 characters"],
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "n/a",
    },
    refreshJWT: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", AdminSchema);
