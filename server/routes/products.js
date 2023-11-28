const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAllProductsStatic,
  createProduct,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
