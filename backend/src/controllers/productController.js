const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const productModel = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");

//createProduct
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await productModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all Products
exports.getAllProduct = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const productCount=await productModel.countDocuments()
  const apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productCount
  });
});

// get product Details
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorHandler(`No product exist with this id : ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//update product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorHandler(`No product exist with this id : ${req.params.id}`)
    );
  }
  const updateProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    updateProduct,
  });
});

//delete product -- Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorHandler(`No product exist with this id : ${req.params.id}`)
    );
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product is Successfully Deleted",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

