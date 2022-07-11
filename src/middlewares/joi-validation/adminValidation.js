import Joi from "joi";

import {
  FNAME,
  LNAME,
  EMAIL,
  PHONE,
  DOB,
  ADDRESS,
  PASSWORD,
  REQUIREDSTR,
  SHORTSTR,
  validator,
} from "./constantValidation.js";

export const newAdminValidation = (req, res, next) => {
  const schema = Joi.object({
    fName: FNAME,
    lName: LNAME,
    email: EMAIL,
    phone: PHONE,
    dob: DOB,
    address: ADDRESS,
    password: PASSWORD,
  });

  validator(schema, req, res, next);
};

export const updateAdminValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORTSTR,
    fName: FNAME,
    lName: LNAME,
    email: EMAIL,
    phone: PHONE,
    dob: DOB,
    address: ADDRESS,
    password: PASSWORD,
  });

  validator(schema, req, res, next);
};

export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    emailValidationCode: REQUIREDSTR,
  });

  validator(schema, req, res, next);
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    password: PASSWORD,
  });

  validator(schema, req, res, next);
};

export const updatePasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    password: PASSWORD,
    currentPassword: PASSWORD,
  });

  validator(schema, req, res, next);
};
