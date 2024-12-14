import express from "express"
import { orderListByVendor, orderUpdate} from '../controller/orderController.js'
import { authenticateToken } from "../middleware/middlewareFunction.js"



const route=express.Router();
route.get("/orderListByVendor",authenticateToken,orderListByVendor);
route.put("/orderUpdate/:id",authenticateToken,orderUpdate);

export default route;