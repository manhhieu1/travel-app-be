import Router from "express";
import controller from "./controller.js";
import validation from "./validation.js";
import validate from "../../express/middleware/validate.js";
// import { validate } from "express-validation";

const router = Router();
/**
 * @swagger
 * /categories:
 *   post:
 *     description: create category
 *     tags:
 *     - Categories
 *     requestBody:
 *       description:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                code:
 *                  type: string
 *                  required: true
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                image:
 *                  type: string
 *     responses:
 *       200:
 *         description: Success
 */
router
  .route("/categories")
  .post(validate(validation.createCategory), controller.createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     description: get Products
 *     tags:
 *     - Categories
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
 *      - name: status
 *        in: query
 *        schema:
 *          type: string
 *          enum:
 *            - active
 *            - deleted
 *     responses:
 *       200:
 *         description: Success
 */
router
  .route("/categories")
  .get(validate(validation.getCategories), controller.getCategories);

/**
 * @swagger
 * /categories/{uid}:
 *   get:
 *     description: get detail category
 *     tags:
 *     - Categories
 *     parameters:
 *      - name: uid
 *        in: path
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/categories/:uid").get(controller.getCategory);

/**
 * @swagger
 * /categories/{uid}:
 *   put:
 *     description: update category
 *     tags:
 *     - Categories
 *     parameters:
 *      - name: uid
 *        in: path
 *        schema:
 *          type: string
 *     requestBody:
 *       description:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                uid:
 *                  type: string
 *                code:
 *                  type: string
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                status:
 *                  type: string
 *                image:
 *                  type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/categories/:uid").put(controller.updateCategory);
/**
 * @swagger
 * /categories/{uid}:
 *   delete:
 *     description: delete category
 *     tags:
 *     - Categories
 *     parameters:
 *      - name: uid
 *        in: path
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/categories/:uid").delete(controller.deleteCategory);

export default router;
