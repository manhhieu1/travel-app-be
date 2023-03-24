import Router from "express";
import controller from "./controller.js";
import validation from "./validation.js";
import validate from "../../express/middleware/validate.js";
// import { validate } from "express-validation";

const router = Router();
/**
 * @swagger
 * /accounts/signup:
 *   post:
 *     description: create user account
 *     tags:
 *     - Accounts
 *     requestBody:
 *       description:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                  type: string
 *                  required: true
 *                password:
 *                  type: string
 *                  required: true
 *                role:
 *                  type: string
 *                  required: true
 *                firstName:
 *                  type: string
 *                phone:
 *                  type: string
 *                dob:
 *                  type: string
 *                sex:
 *                  type: string
 *                img:
 *                  type: string
 *                address:
 *                  type: string
 *     responses:
 *       200:
 *         description: Success
 */
router
  .route("/accounts/signup")
  .post(validate(validation.createAdmin), controller.signUp);

/**
 * @swagger
 * /accounts/login:
 *   post:
 *     description: login
 *     tags:
 *     - Accounts
 *     requestBody:
 *       description:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Success
 */
router
  .route("/accounts/login")
  .post(validate(validation.login), controller.login);

// /**
//  * @swagger
//  * /accounts/user-login:
//  *   post:
//  *     description: user login
//  *     tags:
//  *     - Accounts
//  *     requestBody:
//  *       description:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *                email:
//  *                  type: string
//  *                password:
//  *                  type: string
//  *     responses:
//  *       200:
//  *         description: Success
//  */
// router
//   .route("/accounts/user-login")
//   .post(validate(validation.login), controller.userLogin);

/**
 * @swagger
 * /accounts/change-password:
 *   post:
 *     description: change password
 *     tags:
 *     - Accounts
 *     requestBody:
 *       description:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                oldPassword:
 *                  type: string
 *                newPassword:
 *                  type: string
 *                confirmPassword:
 *                  type: string
 *     responses:
 *       200:
 *         description: Success
 */
router
  .route("/accounts/change-password")
  .post(validate(validation.changePassword), controller.changePassword);

/**
 * @swagger
 * /accounts/admins:
 *   post:
 *     description: create admin account
 *     tags:
 *     - Accounts admin
 *     requestBody:
 *       description:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                phone:
 *                  type: string
 *                firstName:
 *                  type: string
 *                email:
 *                  type: string
 *                dob:
 *                  type: string
 *                sex:
 *                  type: string
 *                img:
 *                  type: string
 *                address:
 *                  type: string
 *     responses:
 *       200:
 *         description: Success
 */
router
  .route("/accounts/admins")
  .post(validate(validation.createAdmin), controller.createAdmin);

/**
 * @swagger
 * /accounts:
 *   put:
 *     description: update account
 *     tags:
 *     - Accounts
 *     requestBody:
 *       description:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                  type: string
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                dob:
 *                  type: string
 *                sex:
 *                  type: string
 *                img:
 *                  type: string
 *                address:
 *                  type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/accounts").put(controller.updateAccount);

/**
 * @swagger
 * /account-info:
 *   get:
 *     description: get account info
 *     tags:
 *     - Accounts
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/account-info").get(controller.getAccountInfo);

/**
 * @swagger
 * /users:
 *   get:
 *     description: get user
 *     tags:
 *     - Users
 *     parameters:
 *      - name: page
 *        in: query
 *        schema:
 *          type: number
 *      - name: size
 *        in: query
 *        schema:
 *          type: number
 *      - name: search
 *        in: query
 *        schema:
 *          type: string
 *      - name: role
 *        in: query
 *        schema:
 *          type: string
 *          enum:
 *            - customer
 *            - admin
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/users").get(validate(validation.getUsers), controller.getUsers);

/**
 * @swagger
 * /users/{uid}:
 *   get:
 *     description: get detail users
 *     tags:
 *     - Users
 *     parameters:
 *      - name: uid
 *        in: path
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/users/:uid").get(controller.getUser);

export default router;
