import jwt from "jsonwebtoken";
import { TOKEN_EXPIRES } from "./constant.js";
// import service from '../../api/account/services'

/**
 * Decode JWT
 * @param {string} token
 */
const jwtDecode = (token) =>
  jwt.decode(token, {
    complete: true,
  });

/**
 * Encode JWT
 * @param {string} payload
 * @param {string} secret
 */
const jwtEncode = (payload, secret, opt = {}) => jwt.sign(payload, secret, opt);

/**
 * Verify token
 * @param {string} token
 */
const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey, { algorithms: ["HS256"] });
};

// const verifyRefreshToken = async authorization => {
//   const userId = authorization.user.userId
//   const refreshToken = await service.getRefreshToken(userId)
//   if (refreshToken && refreshToken === authorization.user.refreshToken) {
//     return true
//   }
//   return false
// }

const generateToken = (payload, secretSignature, tokenLife = TOKEN_EXPIRES) => {
  return jwt.sign(payload, secretSignature, {
    algorithm: "HS256",
    // expiresIn: tokenLife,
  });
};

export default {
  jwtDecode,
  jwtEncode,
  verifyToken,
  generateToken,
  // verifyRefreshToken,
};
