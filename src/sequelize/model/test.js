import sequelize from "sequelize";
import sequelizeInstance from "../index.js";

const test = sequelizeInstance.define(
  "test",
  {
    id: {
      type: sequelize.INTEGER(),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    name: {
      type: sequelize.STRING(),
      allowNull: false,
      field: "name",
    },
    createdAt: {
      type: sequelize.TIME(),
      allowNull: false,
      field: "created_at",
    },
    time: {
      type: sequelize.TIME(),
      allowNull: false,
      field: "time",
    },
    time2: {
      type: sequelize.TIME(),
      allowNull: false,
      field: "time2",
    },
  },
  {
    tableName: "test",
  }
);

export default test;
