import { Joi } from "express-validation";

const signUp = {
  body: Joi.object({
    phone: Joi.string().trim().required().min(10),
    password: Joi.string().required().min(6),
    sex: Joi.number().integer().valid(0, 1, null),
  }).unknown(),
};

const login = {
  body: Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().required(),
  }),
};

const changePassword = {
  body: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().min(6),
    confirmPassword: Joi.string().required(),
  }),
};

const getNotification = {
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
  }),
};

const createAdmin = {
  body: Joi.object({
    phone: Joi.string().trim().required().min(10),
    email: Joi.string().trim().required(),
  }).unknown(),
};

const userSubcribeTopic = {
  body: Joi.object({
    token: Joi.string().trim().required(),
    userId: Joi.string().trim().required(),
  }),
};

const userUnsubcribeTopic = {
  body: Joi.object({
    token: Joi.string().trim().required(),
    userId: Joi.string().trim().required(),
  }),
};

export default {
  signUp,
  login,
  changePassword,
  getNotification,
  createAdmin,
  userSubcribeTopic,
  userUnsubcribeTopic,
};
