import sequelize from "sequelize";
import sequelizeInstance from "../index.js";

const Category = sequelizeInstance.define(
  "Category",
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
    code: {
      type: sequelize.STRING(),
      allowNull: false,
      field: "code",
    },
    name: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "name",
    },
    description: {
      type: sequelize.TEXT(),
      allowNull: true,
      field: "description",
    },
    status: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "status",
    },
    image: {
      type: sequelize.TEXT(),
      allowNull: true,
      field: "image",
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
  },
  {
    tableName: "categories",
  }
);

export default Category;
