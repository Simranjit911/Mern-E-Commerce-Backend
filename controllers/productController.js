
const Productmodel = require("../models/Productmodel")
const braintree=require("braintree")
require("dotenv").config()
const Ordermodel=require("../models/Ordermodel")
const stripe=require("stripe")(process.env.STRIPE_SK)

//Payment Gateway
var gateway=new braintree.BraintreeGateway({
    environment:braintree.Environment.Sandbox,
   merchantId:process.env.BT_MER_ID,
   publicKey:process.env.BT_PUBLIC_KEY,
   privateKey:process.env.BT_PRIVATE_KEY
})


//Add Products
exports.addproduct = async (req, res) => {
    try {
        const { name, des, category, price, qty, shipping, image } = req.body
        // const image=req.file.buffer.toString("base64")
        // if(!req.file){
        //     return res.status(201).json({ message: "No image file provided" });
        // }
        const newprod = new Productmodel({
            name, des, price, category, qty, shipping, image
        })
        const saveP = await newprod.save()
        res.status(200).json({ "msg": "Product Created" })

    } catch (error) {
        res.status(201).json({ "msg": "Product not Created", "error": error })
    }
}

//All Products
exports.allproducts = async (req, res) => {
    try {
        const products = await Productmodel.find({}).sort({ createdAt: -1 })
        res.status(200).json({ "msg": "All Products Fetched", "products": products })
    } catch (error) {
        res.status(201).json({ "msg": "Product not Fetched ", "error": error })
    }
}

//Single pruduct
exports.singleproduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Productmodel.findOne({ _id: id })
        if (product) {
            res.status(200).json({ "msg": "Product Find", "product": product })
        } else {
            res.status(201).json({ "msg": "Product not Find" })
        }
    } catch (error) {
        res.status(201).json({ "msg": "Product not Find", "error": error })
    }
}

//Edit Products
exports.editproduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, des, qty, category, price, image } = req.body
        const updateProd = await Productmodel.findByIdAndUpdate({ _id: id }, { name, des, qty, category, price, image })
        const saved = await updateProd.save()
        if (saved) {
            res.status(200).json({ "msg": "Product Updated!", "product": updateProd })
        } else {
            res.status(201).json({ "msg": "Product not Updated!" })
        }
    } catch (error) {
        res.status(201).json({ "msg": "Product not Updated!", "error": error })
    }
}

//delete prod
exports.deleteproduct=async(req,res)=>{
    try {
        const {id}=req.params
        await Productmodel.findByIdAndDelete({_id:id})
       return res.status(200).json({"msg":"Product Deleted Succesfully"})
    } catch (error) {
       return res.status(201).json({"msg":"Product Deletion Failed","error":error})        
    }
}



//Payment Processing

//Stripe Payment
exports.stripePay=async(req,res)=>{
    try {
        const cart=req.body
        const lineItems=cart.map((prod)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:prod.name
                },
                unit_amount:prod.price*100,
            },
            quantity:prod.qty
        }))

        const session=await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"https://mern-e-commerce-front-end.vercel.app/dashboard/user/success",
            cancel_url:"https://mern-e-commerce-front-end.vercel.app/dashbord/user/cancel",
        })
        res.status(200).json({id:session.id})
        
    } catch (error) {
        res.status(200).json({error:error})        
    }
    
}