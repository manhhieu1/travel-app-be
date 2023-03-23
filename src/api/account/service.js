import sequelize, { Op } from "sequelize";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config/index.js";
import { APIError } from "../../common/api-res.js";
import MasterDB from "../../sequelize/index.js";
import UserModel from "../../sequelize/model/user.js";
import Jwt from "../../common/jwt.js";
import { cache } from "../../express/middleware/authorization.js";
import {
  TOKEN_EXPIRES,
  THROW_ERR_MES,
  USER_TYPE,
} from "../../common/constant.js";
import mailer from "../../common/mailer.js";
import Firebase from "../../common/firebase.js";
import md5 from "md5";
const signUp = async (phone, password, email, name, dob, sex) => {
  const emailConflict = await UserModel.findOne({ where: { email } });
  if (emailConflict)
    throw new APIError(THROW_ERR_MES.EMAIL_CONFLICT, httpStatus.CONFLICT);

  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);

  const refreshToken = Jwt.jwtEncode({}, config.JWT_SECRET);

  const user = await UserModel.create({
    password,
    phone,
    email,
    name,
    role,
    dob,
    sex,
    refreshToken,
  });
  let res = {};
  if (user) res.status = true;
  else
    throw new APIError(
      "Không thể đăng ký tài khoản, vui lòng thử lại sau",
      httpStatus.INTERNAL_SERVER_ERROR
    );

  return res;
};

const login = async (email, password) => {
  let res = {};
  const user = await UserModel.findOne({ where: { email } });
  if (!user)
    throw new APIError(THROW_ERR_MES.ACCOUNT_NOTFOUND, httpStatus.NOT_FOUND);

  if (!(await bcrypt.compare(password, user.password)))
    throw new APIError(THROW_ERR_MES.WRONG_PASSWORD, httpStatus.UNAUTHORIZED);

  const dataUser = {
    userId: user.uid,
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    sex: user.sex,
    role: user.role,
    img: user.img,
  };
  const dataToken = {
    userId: user.uid,
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    refreshToken: user.refreshToken,
  };

  const token = Jwt.generateToken({ data: dataToken }, config.JWT_SECRET);

  res.userData = dataUser;
  res.token = token;

  return res;
};

const userLogin = async (email, password) => {
  let res = {};
  const user = await UserModel.findOne({ where: { email } });
  if (!user)
    throw new APIError(THROW_ERR_MES.ACCOUNT_NOTFOUND, httpStatus.NOT_FOUND);

  if (!(await bcrypt.compare(password, user.password)))
    throw new APIError(THROW_ERR_MES.WRONG_PASSWORD, httpStatus.UNAUTHORIZED);

  const dataUser = {
    userId: user.uid,
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    sex: user.sex,
    role: user.role,
  };
  const dataToken = {
    userId: user.uid,
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };

  const token = Jwt.generateToken({ data: dataToken }, config.JWT_SECRET);

  res.userData = dataUser;
  res.token = token;

  return res;
};

const changePassword = async (
  user,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  let res = {};
  const userExist = await UserModel.findByPk(user.id);
  if (!userExist)
    throw new APIError(THROW_ERR_MES.ACCOUNT_NOTFOUND, httpStatus.NOT_FOUND);

  if (!(await bcrypt.compare(oldPassword, userExist.password)))
    throw new APIError(THROW_ERR_MES.WRONG_PASSWORD, httpStatus.UNAUTHORIZED);

  if (newPassword != confirmPassword)
    throw new APIError(
      THROW_ERR_MES.WRONG_CONFIRM_PASSWORD,
      httpStatus.BAD_REQUEST
    );

  const salt = bcrypt.genSaltSync(10);
  newPassword = bcrypt.hashSync(newPassword, salt);

  const refreshToken = Jwt.jwtEncode({}, config.JWT_SECRET);
  await UserModel.update(
    { password: newPassword, refreshToken },
    { where: { id: user.id } }
  );
  res.status = true;

  return res;
};

const createAdmin = async (
  phone,
  firstName,
  lastName,
  email,
  dob,
  sex,
  img,
  address
) => {
  const _phoneConflict = UserModel.findOne({ where: { phone } });
  const _emailConflict = UserModel.findOne({ where: { email } });

  const [phoneConflict, emailConflict] = await Promise.all([
    _phoneConflict,
    _emailConflict,
  ]);
  if (phoneConflict)
    throw new APIError(THROW_ERR_MES.ACCOUNT_EXIST, httpStatus.CONFLICT);
  if (emailConflict)
    throw new APIError(THROW_ERR_MES.EMAIL_CONFLICT, httpStatus.CONFLICT);

  const salt = bcrypt.genSaltSync(10);
  console.log(config.ADMIN_PASSWORD);
  const password = bcrypt.hashSync(config.ADMIN_PASSWORD, salt);

  const refreshToken = Jwt.jwtEncode({}, config.JWT_SECRET);

  let res = {};
  const user = await UserModel.create({
    phone,
    email,
    password,
    firstName,
    lastName,
    dob,
    sex,
    refreshToken,
    role: USER_TYPE.ADMIN,
    img,
    address,
  });
  if (user) res.status = "ok";

  return res;
};

const updateAccount = async (
  userId,
  phone,
  firstName,
  lastName,
  dob,
  sex,
  img,
  address
) => {
  if (phone) {
    const phoneConflict = await UserModel.findOne({
      where: { phone, uid: { [Op.ne]: userId } },
    });
    if (phoneConflict)
      throw new APIError(THROW_ERR_MES.ACCOUNT_EXIST, httpStatus.CONFLICT);
  }

  const res = await UserModel.update(
    { phone, firstName, lastName, dob, sex, img, address },
    { where: { uid: userId } }
  );

  return res;
};

const getAccountInfo = async (id) => {
  let res = {};
  const user = await UserModel.findByPk(id);
  if (!user)
    throw new APIError(THROW_ERR_MES.ACCOUNT_NOTFOUND, httpStatus.NOT_FOUND);

  res = {
    userId: user.uid,
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    sex: user.sex,
    role: user.role,
    img: user.img,
  };
  return res;
};

export default {
  signUp,
  login,
  userLogin,
  changePassword,
  createAdmin,
  updateAccount,
  getAccountInfo,
};
