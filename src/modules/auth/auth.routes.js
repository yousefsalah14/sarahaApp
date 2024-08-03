import { Router } from "express";
import * as authContoller from './auth.controller.js'
import { validation } from "../../middlewares/validation.middleware.js";
import * as authSchema from "./auth.schema.js";
const router = Router()

//signup
router.post('/signup',validation(authSchema.signupSchema),authContoller.signup)
//login
router.post( '/login', validation(authSchema.loginSchema),authContoller.login )
// activate Accout
router.get( '/activate_accout/:token', validation( authSchema.activateSchema ), authContoller.Activate )
// send forget code
router.patch("/forget",validation(authSchema.forgetCodeSchema),authContoller.sendForgetCode)
// reset password
router.patch('/reset_password',validation(authSchema.resetPasswordSchema),authContoller.resetPassword)

export default router