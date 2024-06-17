import multer from "multer";
import { __dirname } from "../../../index.js";

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {

            let path = `${__dirname}/public/img`

            if(file.fieldname === "profile"){
                path = `${__dirname}/public/img/profiles`
            }

            if(file.fieldname === "id"){
                path = `${__dirname}/public/img/documents`
            }

            if(file.fieldname === "home"){
                path = `${__dirname}/public/img/documents`
            }

            if(file.fieldname === "accountt"){
                path = `${__dirname}/public/img/documents`
            }

            if(file.fieldname === "product"){
                path = `${__dirname}/public/img/products`
            }

            cb(null, path)
        },

        filename: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`)
        }
    }
)


export const uploader = multer({
    storage,
    // si se genera algun error, lo pcapturamos
    onError: function (err, next) {
        console.log(err);
        next()
    }
})
