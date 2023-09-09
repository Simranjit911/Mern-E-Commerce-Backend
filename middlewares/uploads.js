const multer = require("multer")
const mstorage = multer.memoryStorage({
    destination: (req, res, cb) => {
        cb(null, "../uploads")
    },
    filename: (req, res, cb) => {
        cb(null, `image-${Date.now()}.${file.original}`)
    },

})
const filefilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/webp") {
        cb(null, true)
    } else {
        cb(null, false)
        cb(new Error("Only Allowed png,jpg,jpeg,webp format"))
    }
}
const upload = multer({
    storage: mstorage,
    fileFilter: filefilter
})
module.exports={upload}


