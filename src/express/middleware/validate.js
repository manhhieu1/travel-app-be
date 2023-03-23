import { validate } from "express-validation";

const checkValidate = (schema) => {
  return validate(schema, {}, { abortEarly: false });
};

export default checkValidate;
