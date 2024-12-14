import express from "express"
import { vendorRegister, vendorLogin,vendorList} from '../controller/vendorController.js'
import { vendorSchema,joiValidator  } from "../middleware/joiValidator.js"
const route=express.Router();

route.post("/vendorRegister",joiValidator(vendorSchema),vendorRegister);
route.post("/vendorLogin",vendorLogin);
route.get("/vendorList",vendorList);

export default route;