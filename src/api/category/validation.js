import { Joi } from "express-validation";

const createCategory = {
  body: Joi.object({
    code: Joi.string().trim().required(),
  }).unknown(),
};
const getCategories = {
  query: Joi.object({
    page: Joi.number()
      .integer()
      .allow("", null)
      .empty(["", null])
      .positive()
      .min(1)
      .default(1)
      .required(),
    size: Joi.number()
      .integer()
      .allow("", null)
      .empty(["", null])
      .positive()
      .min(1)
      .default(10)
      .required(),
  }).unknown(),
};
export default {
  createCategory,
  getCategories,
};
