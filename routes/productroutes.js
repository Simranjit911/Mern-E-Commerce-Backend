const express=require("express")

const {upload}=require("../middlewares/uploads")    
const route=express.Router()
const {authLogin,admin} =require("../middlewares/userauth")
const { addproduct,allproducts,singleproduct,editproduct,deleteproduct,stripePay } = require("../controllers/productController")

route.post("/addproduct",upload.single("image"),authLogin,admin,addproduct)
route.get("/allproduct",allproducts)
route.get("/singleproduct/:id",singleproduct)
// route.put("/editproduct/:id",upload.single("image"),authLogin,admin,editproduct)
route.put("/editproduct/:id",authLogin,admin,editproduct)
route.delete("/deleteproduct/:id",authLogin,admin,deleteproduct)

//payment
route.post("/create-checkout-session",authLogin,stripePay)

module.exports=route