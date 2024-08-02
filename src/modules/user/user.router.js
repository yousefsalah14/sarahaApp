import { Router } from "express";
import * as userController from './user.controller.js'
import { fileValidation, uploadFile } from "../../utils/multer.js";
import { isAuthenticated } from "../../middlewares/authentication.middleware.js";
import { uploadFileCloud } from "../../utils/multerCloud.js";
const router = Router()
////////////////file system//////////////////////
//  upload profile pic
router.post( '/profile', isAuthenticated,
    uploadFile( { folder: 'user/profile', filter: fileValidation.images } ).single( "pp" ),
    userController.profile )
//upload cover pics
router.post( '/cover', isAuthenticated, uploadFile( {
    folder: 'user/cover', filter: fileValidation.images
    
} ).array( "cover", 3 ), userController.cover )

////////////////////cloudinary/////////////////
router.post( '/profileCloud', isAuthenticated,
    uploadFileCloud().single( "pp" ),
    userController.profileCloud )
router.post( '/coverCloud', isAuthenticated, uploadFileCloud().array( "cover", 3 ), userController.coverCloud )
// update profile pic
router.patch( '/profileCloud', isAuthenticated,
    uploadFileCloud().single( "pp" ),
    userController.updateProfileCloud )
export default router