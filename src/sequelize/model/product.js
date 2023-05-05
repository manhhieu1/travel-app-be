import sequelize from "sequelize";
import sequelizeInstance from "../index.js";

const Product = sequelizeInstance.define(
  "Product",
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
    categoryId: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "category_id",
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
    subDescription: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "sub_description",
    },
    status: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "status",
    },
    images: {
      type: sequelize.TEXT(),
      allowNull: true,
      field: "images",
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
    tableName: "products",
  }
);

export default Product;
