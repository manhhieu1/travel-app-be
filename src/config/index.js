import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  // DB config
  DB_HOST: Joi.string().required(),
  DB_USER_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_TIMEZONE: Joi.string().required(),
  ADMIN_PASSWORD: Joi.string().required(),
  WEB_URL: Joi.string().required(),
  MAX_EXAM_SCHEDULE_BOOKED: Joi.number().positive().required(),
  MAX_NOTI: Joi.number().integer().positive().required(),
})
  .unknown()
  .required();

const { error, value: config } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default config;
