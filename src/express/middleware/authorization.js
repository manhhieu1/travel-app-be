import config from "../../config/index.js";
import {
  USER_ACTIVE,
  CACHE_TIME,
  THROW_ERR_MES,
  USER_TYPE,
} from "../../common/constant.js";
import Jwt from "../../common/jwt.js";
import UserModel from "../../sequelize/model/user.js";
import pkg from "sequelize";
import httpStatus from "http-status";
import NodeCache from "node-cache";

const { Op } = pkg;
export const cache = new NodeCache({ stdTTL: 5 * 60, checkperiod: 15 });

const authCheck = async (req, res, next) => {
  // Remove last slash
  const path = req.path.endsWith("/") ? req.path.slice(0, -1) : req.path;
  const method =
    req.method === "GET" ||
    req.method === "DELETE" ||
    req.method === "PUT" ||
    req.method === "POST";

  const adminPath = ["/accounts/admins"]; //["/doctors", "/rooms"];

  if (!method) {
    res.status(httpStatus.METHOD_NOT_ALLOWED).json({
      meta: {
        message: "Phương thức không hợp lệ",
      },
    });
    return;
  }

  if (path === "/accounts/signup") {
    next();
    return;
  }

  if (path === "/accounts/login") {
    next();
    return;
  }

  if (path === "/accounts/user-login") {
    next();
    return;
  }

  if (path === "/notification/subcribe-topic") {
    next();
    return;
  }

  if (path === "/notification/unsubcribe-topic") {
    next();
    return;
  }

  if (path === "/notification/exam-schedule") {
    next();
    return;
  }

  // if (path.includes("/doctors")) {
  //   next();
  //   return;
  // }

  // if (path === "/cache") {
  //   next();
  //   return;
  // }

  // Get x-auth-token in header
  let token = req.header("Authorization");
  if (token && token.startsWith("Bearer "))
    token = token.substring(7, token.length);
  if (!token) {
    res.status(httpStatus.UNAUTHORIZED).json({
      meta: {
        message: THROW_ERR_MES.UNAUTHORIZED,
      },
    });
    return;
  }

  try {
    let { data } = Jwt.verifyToken(token, config.JWT_SECRET);
    //cache key chứa userId và token
    // const cacheKey = `${data.userId}:${token}`;
    // //kiểm tra token đã đc lưu cache, nếu đã lưu thì đặt lại thời gian cache
    // if (cache.has(cacheKey)) {
    //   //reset cache ttl
    //   cache.ttl(cacheKey, CACHE_TIME);
    //   next();
    //   return;
    // }

    //check permision and update password
    checkAuthorization(data)
      .then((dt) => {
        //cache token to reduce query database
        // cache.set(cacheKey, data.refreshToken, CACHE_TIME);
        for (const adPath of adminPath) {
          //check admin path
          if (
            path.includes(adPath) &&
            ["POST", "PUT", "DELETE"].includes(req.method) &&
            data.role != USER_TYPE.ADMIN
          ) {
            res.status(httpStatus.UNAUTHORIZED).json({
              meta: {
                message: THROW_ERR_MES.UNAUTHORIZED,
              },
            });
            return;
          }
        }
        req.user = data;
        next();
      })
      .catch((err) => {
        res.status(err.status).json({
          error: {
            message: err.message,
          },
        });
        return;
      });
  } catch (err) {
    res.status(httpStatus.UNAUTHORIZED).json({
      meta: {
        message: THROW_ERR_MES.UNAUTHORIZED,
      },
    });
    return;
  }
};

const checkAuthorization = async (data) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await UserModel.findOne({
        where: {
          uid: data.userId,
          [Op.or]: [
            { refreshToken: data.refreshToken },
            { refreshToken: null },
          ],
        },
      });

      if (!user || user.role == USER_TYPE.CUSTOMER)
        rej({
          status: httpStatus.UNAUTHORIZED,
          message: THROW_ERR_MES.UNAUTHORIZED,
        });
      // else if (user.active != USER_ACTIVE.ACTIVE)
      //   rej({
      //     status: httpStatus.FORBIDDEN,
      //     message: "The account is currently inaccessible",
      //   });
      data.id = user.id;
      res(data);
    } catch (err) {
      rej({
        status: httpStatus.UNAUTHORIZED,
        message: THROW_ERR_MES.UNAUTHORIZED,
      });
    }
  });
};

export default authCheck;
