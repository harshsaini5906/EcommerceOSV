import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  productId: {
    type: String,
    default: "",
  },
  vendorId:{
   type:String,
   default:"",
   ref:"vendorModel"
  },
  quantity: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ['Pending', 'shipped'],
    default: "pending",
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

const orderModel = mongoose.model("orderModel", orderSchema);

export default orderModel;
