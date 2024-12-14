import orderModel from "../models/orderModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Load the .env file

//***********************order list by vendor**************************** */
export const orderListByVendor = async (req, res) => {
  try {
    if (!req.headers.token) {
      return res.status(400).json({ error: "Please enter the token first" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const orderList = await orderModel
      .find({
        vendorId: tokenData.vendorId,
      })
      .populate({ path: "productId" })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (orderList.length > 0) {
      return res.status(200).json({
        status: 200,
        resmessage: "order list of particular vendor",
        orderList,
      });
    } else {
      return res.status(401).json({ resmessage: "order list not found" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//********************Mark an order to shipped*************** */

export const orderUpdate = async (req, res) => {
  try {
    if (!req.headers.token) {
      return res.status(400).json({ error: "Please enter the token first" });
    }
    const { order_id, status } = req.body;
//
    const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const existOrder = await orderModel.findOne({
      _id: order_id,
    });

    if (existOrder) {
      const updateOrder = await orderModel.updateOne(
        {
          _id: order_id,
        },
        { $set: { status: status } }
      );
 
      return res.status(200).json({
        status: 200,
        resmessage: "order status change successfully",
        updateOrder,
      });
    } else {
      return res.status(401).json({ resmessage: "order not found" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

export {}