const Usermodel = require("../models/usermodels")
const { hashpassword, compare } = require("../middlewares/helper");
const Ordermodel=require("../models/Ordermodel")


//Register Route
exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, secretanswer, address } = req.body

        if (!name || !email || !phone || !password || !secretanswer || !address) {
            return res.status(201).json({ "msg": " All Feilds are Required" });
        }

        const userexist = await Usermodel.findOne({ email })
        if (userexist) {
            return res.status(201).json({ "msg": " User already registered" });
        }

        const hash = await hashpassword(password)
        const newUser = new Usermodel({ name, email, phone, password: hash, secretanswer, address })
        const usersave = await newUser.save()
        return res.status(200).json({ "msg": " User Registeration Succesfully", data: usersave });

    } catch (err) {
        console.log(err)
        return res.status(201).json({ "msg": " User Registeration Failed!", data: err });
    }
}

//Login Route
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Usermodel.findOne({ email })
        if (!user) {
            return res.status(201).json({ "msg": " User Doesnot Exist!" });
        }
        const match = await compare(password, user.password)
        if (!match) {
            return res.status(201).json({ "msg": " Invalid Password" });
        } else {
            const token = await user.generatetoken()
            return res.status(200).json({ "msg": " User Logined !", "token": token, "user": user });
        }
    } catch (error) {
        return res.status(201).json({ "msg": " User Login Failed!", data: err });
    }
}

//Forget password
exports.forgetpassword = async (req, res) => {
    try {
        const { email, password, secretanswer } = req.body
        const user = await Usermodel.findOne({ email })
        if (!user) {
            return res.status(201).json({ "msg": "User not exist" });
        } else {
            const existingUser = await Usermodel.findOne({ email, secretanswer })
            if (!existingUser) {
                return res.status(201).json({ "msg": "Wrong Secret Answer" });
            } else {
                const hash = await hashpassword(password)
                const update = await Usermodel.findByIdAndUpdate(user._id, { password: hash }, { new: true })
                return res.status(200).json({ "msg": " Password Changed!", data: user });

            }
        }
    } catch (error) {
        return res.status(404).json({ "msg": " Password change Failed!", data: error });
    }
}

//Edit user
exports.edituser=async(req,res)=>{
    try {
        const {name,email,address,phone,secretanswer}=req.body
        const userupdate=await Usermodel.findByIdAndUpdate(req.user._id,{name,email,address,phone,secretanswer},{new:true})
        return res.status(200).json({ "msg": "User Updated Successfully!","user":userupdate });

    } catch (error) {
        return res.status(201).json({ "msg": "User Updation Failed " });
    }
}

exports.getorderFunc=async(req,res)=>{

}