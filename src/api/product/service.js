import sequelize, { Op } from "sequelize";
import httpStatus from "http-status";
import { APIError } from "../../common/api-res.js";
import MasterDB from "../../sequelize/index.js";
import ProductModel from "../../sequelize/model/product.js";
import { THROW_ERR_MES } from "../../common/constant.js";
const createProduct = async (
  code,
  categoryId,
  name,
  description,
  subDescription,
  images,
  price
) => {
  const codeConflict = await ProductModel.findOne({ where: { code } });
  if (codeConflict)
    throw new APIError(THROW_ERR_MES.EMAIL_CONFLICT, httpStatus.CONFLICT);
  const product = await ProductModel.create({
    code,
    categoryId,
    name,
    description,
    subDescription,
    images,
    price,
  });
  let res = {};
  if (product) res.status = true;
  else
    throw new APIError(
      "Không thể tạo sản phẩm, vui lòng thử lại sau",
      httpStatus.INTERNAL_SERVER_ERROR
    );

  return res;
};
const getProducts = async (search, page, size, categoryId, status) => {
  let res = {};
  let query = `select u.uid productId, u.code, u.name, u.price, u.description, u.sub_description subDescription, u.status, u.images,
  u.created_at createdAt from products u  where true `;
  if (search)
    query += ` and (u.name like '%${search}%' or u.description like '%${search}%'
    or u.sub_description like '%${search}%') `;
  if (categoryId) query += ` and u.category_id = '${categoryId}' `;
  if (status) query += ` and u.status = '${status}' `;

  query += ` order by u.created_at desc `;

  const offset = (page - 1) * size;

  const products = await MasterDB.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });

  res.total = products.length;
  res.products = products
    .map((product) => ({
      ...product,
      images: JSON.parse(product.images),
    }))
    .slice(offset, offset + size);

  return res;
};
export default {
  createProduct,
  getProducts,
};
