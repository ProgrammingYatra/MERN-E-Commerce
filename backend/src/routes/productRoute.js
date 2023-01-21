const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticate, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/products")
  .get(getAllProduct);
router
  .route("/product/new")
  .post(isAuthenticate, authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProduct);
router.route("/review").put(isAuthenticate, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticate, deleteReview);
  
module.exports = router;
