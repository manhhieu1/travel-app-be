import { Sequelize } from "sequelize";
import config from "../config/index.js";
import { APIError } from "../common/api-res.js";

const sequelizeInstance = new Sequelize(
  config.DB_NAME,
  config.DB_USER_NAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: "mysql",
    replication: {
      read: [
        {
          host: config.DB_HOST,
          port: config.DB_PORT,
          username: config.DB_USER_NAME,
          password: config.DB_PASSWORD,
          database: config.DB_NAME,
          pool: {
            max: 100,
            idle: 3000,
            acquire: 6000,
          },
        },
      ],
      write: {
        host: config.DB_HOST,
        port: config.DB_PORT,
        username: config.DB_USER_NAME,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        pool: {
          max: 100,
          idle: 3000,
          acquire: 6000,
        },
      },
    },
    define: {
      underscored: false,
      freezeTableName: true,
      charset: "utf8mb4",
      dialectOptions: {
        collate: "utf8mb4_general_ci",
      },
      timestamps: false,
    },
    logging: true,
    timezone: config.DB_TIMEZONE,
  }
);

try {
  await sequelizeInstance.authenticate();
  console.log("Database connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelizeInstance;
