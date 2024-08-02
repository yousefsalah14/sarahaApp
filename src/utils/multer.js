import multer, { diskStorage } from 'multer'
import { nanoid } from 'nanoid'
export const fileValidation = {
        images: [ "image/png", "image/jpeg" ],
        files : "application/pdf"
    }
export function uploadFile ({folder,filter})
{
const storage = diskStorage( {
    destination: `uploads/${folder}`
    , filename: (req,file,cb) =>
    {
        cb(null,nanoid()+"__"+file.originalname)
    
    }
} )
    
    const fileFilter = (req,file,cb) =>
    {
        // cb(error | null , false | true)
        // type --> mimetype
        // filter is array of mimetype
        if (!filter.includes(file.mimetype) ) {
            //throw error
            // cb (error ,false ) --> call next(error)
            return cb(new Error("file must be png"),false)
        }
        // call next 
        return cb(null,true)
    }
const multerUpload = multer({storage ,fileFilter})
return multerUpload // obj has methods --> middleware
}