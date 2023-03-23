import Service from "./service.js";
import { APIError, APISuccess } from "../../common/api-res.js";
import httpStatus from "http-status";

const signUp = async (req, res, next) => {
  const { email, password, phone, role, name, dob, sex } = req.body;
  Service.signUp(email, password, phone, role, name, dob, sex)
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

const login = async (req, res, next) => {
  const { email, password } = req.body;
  Service.login(email, password)
    .then((data) => {
      return new APISuccess(res, {
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  Service.userLogin(email, password)
    .then((data) => {
      return new APISuccess(res, {
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  Service.changePassword(req.user, oldPassword, newPassword, confirmPassword)
    .then((data) => {
      return new APISuccess(res, {
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getNotification = async (req, res, next) => {
  const { id } = req.user;
  const { page, size } = req.query;
  Service.getNotification(id, page, size)
    .then((data) => {
      return new APISuccess(res, {
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const createAdmin = async (req, res, next) => {
  const { phone, firstName, lastName, email, dob, sex, img, address } =
    req.body;
  Service.createAdmin(phone, firstName, lastName, phone, dob, sex, img, address)
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

const updateAccount = async (req, res, next) => {
  const { email, firstName, lastName, dob, sex, img, address } = req.body;
  const { userId } = req.user;
  Service.updateAccount(
    userId,
    email,
    firstName,
    lastName,
    dob,
    sex,
    img,
    address
  )
    .then((data) => {
      return new APISuccess(res, {
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getAccountInfo = async (req, res, next) => {
  const { id } = req.user;
  Service.getAccountInfo(id)
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
  signUp,
  login,
  userLogin,
  changePassword,
  getNotification,
  createAdmin,
  updateAccount,
  getAccountInfo,
};
