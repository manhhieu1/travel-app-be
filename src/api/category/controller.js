import Service from "./service.js";
import { APIError, APISuccess } from "../../common/api-res.js";
import httpStatus from "http-status";

const createCategory = async (req, res, next) => {
  const { code, name, description, image } = req.body;
  Service.createCategory(code, name, description, image)
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
const getCategories = async (req, res, next) => {
  const { search, page, size, status } = req.query;
  Service.getCategories(search, page, size, status)
    .then((data) => {
      return new APISuccess(res, {
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};
const getCategory = async (req, res, next) => {
  const { uid } = req.params;
  Service.getCategory(uid)
    .then((data) => {
      return new APISuccess(res, {
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};
const updateCategory = async (req, res, next) => {
  const { uid } = req.params;
  const { code, name, description, status, image } = req.body;
  Service.updateCategory(uid, code, name, description, status, image)
    .then((data) => {
      return new APISuccess(res, {
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};
const deleteCategory = async (req, res, next) => {
  const { uid } = req.params;
  Service.deleteCategory(uid)
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
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
