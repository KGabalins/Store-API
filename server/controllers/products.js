const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } }).sort("price");
  res.status(StatusCodes.OK).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) queryObject.featured = featured === "true" ? true : false;
  if (company) queryObject.company = { $regex: company, $options: "i" };
  if (name) queryObject.name = { $regex: name, $options: "i" };
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList + " createdAt");
  }

  const totalProducts = await result.clone();

  let page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  if ((page - 1) * limit > totalProducts.length) {
    page = Math.ceil(totalProducts.length / limit);
  }
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  // const total = await Product.find();
  res.status(StatusCodes.OK).json({
    nbHits: products.length,
    products,
    page,
    totalProducts: totalProducts.length,
  });
};

const createProduct = async (req, res) => {
  console.log(req.body);

  try {
    const result = await Product.create(req.body);
    console.log(result);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: error });
  }

  res.status(StatusCodes.CREATED).json({ msg: "Product created!" });

  // const result = await Product.create(req.body)
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
  createProduct,
};
