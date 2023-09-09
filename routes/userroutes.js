const express = require("express")
const { register,login,forgetpassword,edituser,getorderFunc} = require("../controllers/userController")
const { authLogin, admin } = require("../middlewares/userauth")
const route = express.Router()

route.post("/register",register)
route.post("/login",login)
route.post("/forgetpassword",forgetpassword)
route.get("/loginverify",authLogin,(req,res)=>{
    res.json({"ok":"User Verify Successfully"})
})
route.get("/adminverify",authLogin,admin,(req,res)=>{
    res.json({"ok":"Admin Verify Successfully"})
})
route.put("/edit",authLogin,edituser)

route.get("/userorders",authLogin,getorderFunc)

module.exports = route