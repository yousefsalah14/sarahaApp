import { Router } from "express";
import * as userController from './user.controller.js'
import { fileValidation, uploadFile } from "../../utils/multer.js";
import { isAuthenticated } from "../../middlewares/authentication.middleware.js";
const router = Router()
//  upload profile pic
router.post( '/profile', isAuthenticated,
    uploadFile( { folder: 'user/profile', filter: fileValidation.images } )
        .single( "pp" ), userController.profile )
//upload cover pics
router.post( '/cover', isAuthenticated, uploadFile( {
    folder: 'user/cover', filter: fileValidation.images
    
}).array("cover",3),userController.cover)
export default router