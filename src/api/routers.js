import { Router } from "express";
import httpStatus from "http-status";
import account from "./account/router.js";
import product from "./product/router.js";
import category from "./category/router.js";

const router = Router();

router.use(account);
router.use(product);
router.use(category);

router.use("*", (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    error: {
      message: "COMMON_ERR_018",
      errors: [
        {
          message: ["Server not found."],
        },
      ],
    },
  });
});

export default router;
