const Usermodel = require("../models/usermodels")
const jwt = require("jsonwebtoken")
require("dotenv").config()

//Login Auth
exports.authLogin = (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.KEY)
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
        return res.status(201).json({"msg":"Login First"})
    }
}

//Admin auth
exports.admin = async (req, res, next) => {
    try {
        const user=await Usermodel.findById(req.user._id)
        if(user.role!=1){
            return res.status(201).json({"msg":"Unauthorized Access"})
        }else{
            next()
        }
    } catch (error) {
        console.log(error)
    }
}