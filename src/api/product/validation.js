import { Joi } from "express-validation";

const createProduct = {
  body: Joi.object({
    code: Joi.string().trim().required(),
  }).unknown(),
};
const getProducts = {
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
  createProduct,
  getProducts,
};
