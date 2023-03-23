import httpStatus from "http-status";
import { ValidationError } from "express-validation";

const expressErrorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ValidationError) {
    const detail = err.details.body || err.details.params || err.details.query;
    // 400 - Bad request
    res.status(err.statusCode).json({
      meta: {
        message: detail[0].message,
      },
    });
  } else {
    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      meta: {
        message: err.message,
      },
    });
  }
};

export default expressErrorHandler;
