import { SHORTSTR, LONGSTR, validator } from "./constantValidation.js";
import Joi from "joi";

export const newCategoryValidation = (req, res, next) => {
  try {
    console.log(req.body);
    const schema = Joi.object({
      _id: SHORTSTR.allow(""),
      parentCatId: SHORTSTR.allow(null, ""),
      catName: SHORTSTR.required(),
      status: SHORTSTR.required(),
    });

    validator(schema, req, res, next);
  } catch (error) {
    next(error);
  }
};
