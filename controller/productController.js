import productModel from "../models/productModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Load the .env file

export const addProduct = async (req, res) => {
  try {
    if (!req.headers.token) {
      return res.status(400).json({ error: "Please enter the token first" });
    }
    const { name, price, stock } = req.body;
    const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const newProduct = new productModel({
      name: name,
      price: price,
      stock: stock,
      vendorId: tokenData.vendorId,
    });
    const savedProduct = await newProduct.save();
    if (savedProduct) {
      return res.status(200).json({
        status: 200,
        resmessage: "Product add successfully",
        savedProduct,
      });
    } else {
      return res.status(401).json({ resmessage: "Product not saved " });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//********************************product list******************************
export const productList = async (req, res) => {
  try {
    if (!req.headers.token) {
      return res.status(400).json({ error: "Please enter the token first" });
    }
     
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit;  

    const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const productList = await productModel.find({
      vendorId: tokenData.vendorId,
    })
    .populate({path:"vendorId"})
    .skip(skip)
    .limit(limit)
    .sort({createdAt:-1});

    if (productList.length > 0) {
      return res.status(200).json({
        status: 200,
        resmessage: "Product list of particular vendor",
        productList,
      });
    } else {
      return res.status(401).json({ resmessage: "Product list not found" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//*************************API to update the product detail**************************************/

export const productUpdate = async (req, res) => {
  try {
    // console.log("=====>>>")
    if (!req.headers.token) {
      return res.status(400).json({ error: "Please enter the token first" });
    }
    const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const { product_id } = req.params;
    const { price, stock, name } = req.body;

    // if (!price || !stock || !name) {
    //   return res.status(400).json({ error: "Please provide price, stock, and name" });
    // }


    const product = await productModel.findOne({
      vendorId: tokenData.vendorId,
      _id: product_id,
    });
    if (product) {
      const updateProduct = await productModel.updateOne(
        { vendorId: tokenData.vendorId, _id: product_id },
        { $set: { price: price, stock: stock, name: name } }
      );

      if (updateProduct) {
        return res.status(200).json({
          status: 200,
          resmessage: "Product update successfull",
          updateProduct,
        });
      }
    } else {
      return res.status(401).json({ resmessage: "Product not found" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};


//*********************API to delete the product**********************/
export const deleteProduct = async (req, res) => {
    try {
      if (!req.headers.token) {
        return res.status(400).json({ error: "Please enter the token first" });
      }
      const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
      const { product_id } = req.params;
      
      const product = await productModel.findOne({
        vendorId: tokenData.vendorId,
        _id: product_id,
      });
      if (product) {
        const deleteProduct = await productModel.deleteOne({ vendorId: tokenData.vendorId, _id: product_id });
  
        if (deleteProduct) {
          return res.status(200).json({
            status: 200,
            resmessage: "Product delete successfull",
            deleteProduct
          });
        }
      } else {
        return res.status(401).json({ resmessage: "Product not found" });
      }
    } catch (err) {
      console.log("something went wrong catch block executed", err);
      res.status(500).json({ status: 500, resmessage: "Internal server error" });
    }
  };
  
  export {}