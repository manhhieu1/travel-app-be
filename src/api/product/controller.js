import Service from "./service.js";
import { APIError, APISuccess } from "../../common/api-res.js";
import httpStatus from "http-status";

const createProduct = async (req, res, next) => {
  const { code, categoryId, name, description, subDescription, images, price } =
    req.body;
  Service.createProduct(
    code,
    categoryId,
    name,
    description,
    subDescription,
    JSON.stringify(images),
    price
  )
    .then((data) => {
      return new APISuccess(
        res,
        {
          data,
        },
        httpStatus.CREATED
      );
    })
    .catch((err) => {
      next(err);
    });
};
const getProducts = async (req, res, next) => {
  const { search, page, size, categoryId, status } = req.query;
  Service.getProducts(search, page, size, categoryId, status)
    .then((data) => {
      return new APISuccess(res, {
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};
export default {
  createProduct,
  getProducts,
};
