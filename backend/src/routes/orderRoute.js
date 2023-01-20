const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticate, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticate, newOrder);

router.route("/order/:id").get(isAuthenticate, getSingleOrder);

router.route("/orders/me").get(isAuthenticate, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticate, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticate, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticate, authorizeRoles("admin"), deleteOrder);

module.exports = router;
