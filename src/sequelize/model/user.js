import sequelize from "sequelize";
import sequelizeInstance from "../index.js";

const User = sequelizeInstance.define(
  "user",
  {
    id: {
      type: sequelize.INTEGER(),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    uid: {
      type: sequelize.UUIDV4(36),
      defaultValue: sequelize.UUIDV4(),
      allowNull: false,
      field: "uid",
    },
    phone: {
      type: sequelize.STRING(),
      allowNull: false,
      field: "phone",
    },
    password: {
      type: sequelize.STRING(),
      allowNull: false,
      field: "password",
    },
    email: {
      type: sequelize.STRING(),
      allowNull: false,
      field: "email",
    },
    firstName: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "first_name",
    },
    dob: {
      type: sequelize.TIME(),
      allowNull: true,
      field: "dob",
    },
    sex: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "sex",
    },
    createdAt: {
      type: sequelize.TIME(),
      allowNull: true,
      field: "created_at",
    },
    updatedAt: {
      type: sequelize.TIME(),
      allowNull: true,
      field: "updated_at",
    },
    role: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "role",
    },
    status: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "status",
    },
    img: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "img",
    },
    refreshToken: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "refresh_token",
    },
    address: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "address",
    },
    lastName: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "last_name",
    },
  },
  {
    tableName: "user",
  }
);

export default User;
