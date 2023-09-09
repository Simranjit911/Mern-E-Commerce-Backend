const bcrypt = require("bcryptjs")

exports.hashpassword = async (password) => {
    try {
        const round=10
        const hashedpassword=await bcrypt.hash(password,round)
        return hashedpassword
    } catch (err) {
        console.log(err)
    }
}
exports.compare=async(password,hasingpass)=>{
try {
    return bcrypt.compare(password,hasingpass)
} catch (error) {
    console.log(error)
}
}