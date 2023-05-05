import Router from "express";
import controller from "./controller.js";
import validation from "./validation.js";
import validate from "../../express/middleware/validate.js";
// import { validate } from "express-validation";

const router = Router();
/**
 * @swagger
 * /products:
 *   post:
 *     description: create product
 *     tags:
 *     - Products
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
 *                categoryId:
 *                  type: string
 *                  required: true
 *                description:
 *                  type: string
 *                subDescription:
 *                  type: string
 *                price:
 *                  type: number
 *                images:
 *                  type: array
 *                  items:
 *                    type: string
 *     responses:
 *       200:
 *         description: Success
 */
router
  .route("/products")
  .post(validate(validation.createProduct), controller.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     description: get Products
 *     tags:
 *     - Products
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
 *      - name: categoryId
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
  .route("/products")
  .get(validate(validation.getProducts), controller.getProducts);

export default router;
