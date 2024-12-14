import vendorModel from "../models/vendorModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config();   // Load the .env file
import { hashPassword } from "../commanFunction/commanMethod.js";

//***************API to register vendor*********************/

export const vendorRegister = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists based on the email
    const existingVendor = await vendorModel.findOne({ email: email });
    if (existingVendor) {
      return res.send({ error: "vendor with this mail already exist!" });
    }
    const hashPass = await hashPassword(password);
    // console.log("hashPassword===>>", hashPassword);

    const newVendor = new vendorModel({
      email: email,
      password: hashPass,
      name: name,
    });
    const savedVendor = await newVendor.save();
    if (savedVendor) {
      return res.status(200).json({
        status: 200,
        resmessage: "vendor register successfully",
        savedVendor,
      });
    } else {
      return res.status(400).json({ error: "vendor not register" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//**********************API to login the vendor*************************/
export const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await vendorModel.findOne({ email: email });
    if (!vendor) {
      return res.status(400).json({ resmessage: "vendor not found!" });
    }

    const matchPassword = bcrypt.compare(password, vendor.password);
    if (matchPassword) {
      const token =jwt.sign({vendorId:vendor._id},process.env.JWT_SECRET,{expiresIn:"1h"});
      // console.log("token",token);
      const updateToken=await vendorModel.updateOne({_id:vendor._id},{$set:{token:token}});
      // console.log("updateToken==>>",updateToken);
      return res
        .status(200)
        .json({ Status: 200, resmessage: "Vendor login successfully",vendor });
    } else {
      return res.status(401).json({ resmessage: "Invalid credentials" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};


//************************vendor list ***********************/
export const vendorList = async (req, res) => {
  try {

    const vendor = await vendorModel.find({});
    if (vendor.length == 0) {
      return res.status(400).json({ resmessage: "vendor not found!" });
    }

      return res
        .status(200)
        .json({ Status: 200, resmessage: "Vendor list fetch successfully",vendor });
  
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};


export {}