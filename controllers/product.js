const jwt = require("jsonwebtoken");
const ProductModel = require("../models/product");

const createProduct = async (req, res) => {
  const newProduct = await ProductModel.create(req.body);
  res.json({
    success: true,
    message: "Dummy product create API",
  });
};

const getProduct = async (req, res) => {
  res.json({
    success: true,
    message: "Dummy get product API",
  });
};

const editProduct = async (req, res) => {
  res.json({
    success: true,
    message: "DUmmy edit product API",
  });
};

const likeDislikeController = async (req, res) => {
  console.log(req.user);
  // ProductModel.updateMany({_id },{ $set: {}});

  let updateObject = {
    $push: { likes: req.user._id },
    $pull: { dislikes: req.user._id },
    $inc: { likesCount: 1 },
  };

  if (req.params.action === "dislike") {
    updateObject = {
      $push: { dislikes: req.user._id },
      $pull: { likes: req.user._id },
      $inc: { likesCount: -1 },
    };
  }
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    req.params.productId,
    updateObject
  );
  // console.log(updatedProduct);
  res.json({
    success: true,
    message: "Product liked",
  });
};

const productDetailsController = async (req, res) => {
  console.log(req.query.productId);
  const productDetails = await ProductModel.findById(req.query.productId)
    .populate({
      path: "likes",
      select: "firstname",
    })
    .populate({
      path: "dislikes",
      select: "firstname",
    });
  res.json({
    success: true,
    message: "Dummy product details API",
    result: productDetails,
  });
};

const reviewProductController = async (req, res) => {
  try {
    /**
     * 1.productId: URL param
     * 2. rating, comment : Request body
     * 3. userId:auth middleware
     */
    const product = await ProductModel.findById(req.params.productId);
    const review = product.reviews.find(
      (review) => review.userId.toString() === req.user._id.toString()
    );
    console.log(review);

    if (review) {
      //update review
      console.log("REVIEW EXISTS");
      /**
       * 1. Find the sub document
       * 2. Update the sub document
       */
      const findObject = {
        reviews: {
          $elemMatch: {
            userId: req.user._id,
            rating: review.rating,
          },
        },
      };
      const updateObject = {
        $set: {
          "reviews.$.rating": req.body.rating,
          "reviews.$.comment": req.body.comment,
        },
      };

      const updateResult = await ProductModel.updateOne(
        findObject,
        updateObject
      );
      console.log(updateResult);
    } else {
      console.log("REVIEW DOESNT EXISTS");
      //Add review
      const updateObject = {
        $push: {
          reviews: {
            rating: req.body.rating,
            comment: req.body.comment,
            userId: req.user._id,
          },
        },
      };

      const updatedRecord = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        updateObject,
        {
          new: true,
        }
      );
    }

    // console.log(product);

    // console.log(updatedRecord);

    res.json({
      success: true,
      message: "Product review saved successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

const controllers = {
  createProduct,
  getProduct,
  editProduct,
  likeDislikeController,
  productDetailsController,
  reviewProductController,
};

module.exports = controllers;
