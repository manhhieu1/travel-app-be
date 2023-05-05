import sequelize, { Op } from "sequelize";
import httpStatus from "http-status";
import { APIError } from "../../common/api-res.js";
import MasterDB from "../../sequelize/index.js";
import CategoryModel from "../../sequelize/model/category.js";
import { THROW_ERR_MES } from "../../common/constant.js";
const createCategory = async (code, name, description, image) => {
  const codeConflict = await CategoryModel.findOne({ where: { code } });
  if (codeConflict)
    throw new APIError(THROW_ERR_MES.EMAIL_CONFLICT, httpStatus.CONFLICT);
  const product = await CategoryModel.create({
    code,
    name,
    description,
    image,
  });
  let res = {};
  if (product) res.status = true;
  else
    throw new APIError(
      "Không thể tạo danh mục, vui lòng thử lại sau",
      httpStatus.INTERNAL_SERVER_ERROR
    );

  return res;
};
const getCategories = async (search, page, size, status) => {
  let res = {};
  let query = `select u.uid categoryId, u.code, u.name, u.description, u.status, u.image,
  u.created_at createdAt from categories u  where true `;
  if (search) query += ` and (u.name like '%${search}%'`;
  if (status) query += ` and u.status = '${status}' `;

  query += ` order by u.created_at desc `;

  const offset = (page - 1) * size;

  const categories = await MasterDB.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });

  res.total = categories.length;
  res.categories = categories.slice(offset, offset + size);

  return res;
};
const getCategory = async (uid) => {
  let res = {};
  let query = `select u.uid categoryId, u.code, u.name, u.description, u.status, u.image,
  u.created_at createdAt from categories u  where u.uid='${uid}'`;
  const category = await MasterDB.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (!category || !category[0])
    throw new APIError(THROW_ERR_MES.ACCOUNT_NOTFOUND, httpStatus.NOT_FOUND);

  res.category = category[0];

  return res;
};
const updateCategory = async (uid, code, name, description, status, image) => {
  const res = await CategoryModel.update(
    { uid, code, name, description, status, image },
    { where: { uid: uid } }
  );

  return res;
};
const deleteCategory = async (uid) => {
  console.log(12313123, uid);
  const res = await CategoryModel.destroy({ where: { uid: uid } });
  return res;
};

export default {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
