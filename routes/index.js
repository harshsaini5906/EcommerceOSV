import  orderRoute from "../routes/orderRoute.js";
import  productRoute from "../routes/productRoutes.js";
import  vendorRoute from "../routes/vendorRoutes.js";
import express from "express"
const app=express.Router();

app.use("/order",orderRoute);
app.use("/product",productRoute);
app.use("/vendor",vendorRoute);


export default app;
