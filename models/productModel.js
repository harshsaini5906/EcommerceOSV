import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: "",
  },
  stock: {
    type: Number,
    default: "",
  },
  vendorId: {
    type: String,
    default: "",
    ref: "vendorModel",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model("productModel", productSchema);

export default productModel;
