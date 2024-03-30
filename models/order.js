const mongoose = require("mongoose");

const cartProduct = new mongoose.Schema({
  prodictId: {
    type: mongoose.Schema.Types.ObjectId,
    requires: true,
  },
  qunatity: {
    type: Number,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const cartSchema = new mongoose.Schema({
  productS: {
    type: [cartProduct],
  },
});

const deliveryAddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: false,
    default: "",
  },
  city: {
    type: String,
    required: true,
    default: "",
  },
  state: {
    type: String,
    required: false,
    default: "",
  },
  pincode: {
    type: String,
    required: false,
    default: "",
  },
});

const orderSchema = new mongoose.Schema({
  cart: {
    type: cartSchema,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  coupon: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    default: null,
  },
  deliveryAddress: {
    type: deliveryAddressSchema,
    required: true,
  },
  orderPlacedAt: {
    type: Date,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  modeOfPayment: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: false,
    default: "",
  },
});

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;
