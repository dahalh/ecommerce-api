import { SHORTSTR, LONGSTR, validator } from "./constantValidation.js";
import Joi from "joi";

export const newCategoryValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      parentCatId: SHORTSTR.allow(""),
      catName: SHORTSTR.required(),
    });

    validator(schema, req, res, next);
  } catch (error) {
    next(error);
  }
};
