import multer, { diskStorage } from 'multer'
import { nanoid } from 'nanoid'
// export const fileValidation = {
//         images: [ "image/png", "image/jpeg" ],
//         files : "application/pdf"
//     }
export function uploadFileCloud ()
{
    const storage = diskStorage( {} )
    
    // const fileFilter = (req,file,cb) =>
    // {
    //     // cb(error | null , false | true)
    //     // type --> mimetype
    //     // filter is array of mimetype
    //     if (!filter.includes(file.mimetype) ) {
    //         //throw error
    //         // cb (error ,false ) --> call next(error)
    //         return cb(new Error("file must be png"),false)
    //     }
    //     // call next 
    //     return cb(null,true)
    // }
const multerUpload = multer({storage})
return multerUpload // obj has methods --> middleware
}