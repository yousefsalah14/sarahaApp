import { Router } from "express";
import * as authContoller from './auth.controller.js'
import { validation } from "../../middlewares/validation.middleware.js";
import * as authSchema from "./auth.schema.js";
const router = Router()

//signup
router.post('/signup',validation(authSchema.signupSchema),authContoller.signup)
//login
router.post( '/login', validation(authSchema.loginSchema),authContoller.login )

export default router