import express from "express"
import { addProduct,productList,productUpdate,deleteProduct} from "../controller/productController.js";
import { authenticateToken } from "../middleware/middlewareFunction.js";
import { productSchema,joiValidator  } from "../middleware/joiValidator.js"
const route=express.Router();

route.post("/addProduct",authenticateToken,joiValidator(productSchema),addProduct);
route.get("/productList",authenticateToken,productList);
route.put("/productUpdate/:product_id",authenticateToken,productUpdate);
route.delete("/productDelete/:product_id",authenticateToken,deleteProduct)

export default route;