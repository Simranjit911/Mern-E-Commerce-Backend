const mongoose=require("mongoose")

const Productschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    image:{
        type: String, 
        required: true          
    },
    shipping:{
        type:Boolean,       
    },

},
{
    timestamps:true
})


const Productmodel=mongoose.model("Product",Productschema)
module.exports=Productmodel