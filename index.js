const express = require("express")
const app = express()
require("dotenv").config()
const cors=require("cors")
const port = process.env.PORT
const { connectDb } = require("./dbconnect/dbConnect")
app.use(cors({
  origion:"https://mern-e-commerce-front-end.vercel.app",
  credentials:true,
}))

const corsOptions = {
    origin: 'https://mern-e-commerce-front-end.vercel.app',
    credentials: true,
  };
//routs
const userRoutes = require("./routes/userroutes")
const productroute = require("./routes/productroutes")

//Connect Db
connectDb()

app.use(express.json())
app.use(userRoutes)
app.use(productroute)
app.use("./uploads",express.static("./uploads"))

app.listen(port, () => {
    console.log("Running on Port " + port)
})