import multer,{diskStorage} from "multer";
import Employee from "../models/employee.model.js";
import {extname} from 'path'

const upload = multer({
    storage: diskStorage({
        destination: (req,file,cb)=>{
            cb(null, './src/assets/profile')
        },
        filename: async (req,file,cb)=>{
            cb(null, await generateImageName(file))
        }
    })
})

export const generateImageName = async (file)=>{
    return `${await Employee.getLastID()}_Employee${extname(file.originalname)}`
}

export default upload