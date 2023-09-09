const mongoose = require("mongoose")
require("dotenv").config()
const dbUrl = process.env.MONGOURI
exports.connectDb = async () => {
    try {
        let res = await mongoose.connect(dbUrl)
        if (res) {
            console.log("Database Connected!")
        }
    } catch (err) {
        console.log(err)

    }
}

