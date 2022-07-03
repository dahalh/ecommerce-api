import Joi from "joi";

import { SHORTSTR, LONGSTR, validator } from "./constantValidation.js";

export const newPaymentMethodValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORTSTR.allow(null, ""),
    status: SHORTSTR.required(),
    name: SHORTSTR.required(),
    description: LONGSTR.required(),
  });

  validator(schema, req, res, next);
};
