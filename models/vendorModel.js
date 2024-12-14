import mongoose from "mongoose";
const vendorSchema=new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    email:{
        type:String,
        default:"",
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    token:{
        type:String,
        default:""
    }
})

const vendorModel=mongoose.model("vendorModel",vendorSchema);

export default vendorModel