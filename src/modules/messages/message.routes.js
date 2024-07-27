import { Router } from "express";
import * as messageController from './message.controller.js'
import { isAuthenticated } from "../../middlewares/authentication.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { sendMessageSchema } from "./message.schema.js";

const router = Router()

// send message
router.post('/',isAuthenticated,validation(sendMessageSchema),messageController.sendMessage)

// messages of user
router.get('/',isAuthenticated, messageController.userMessages)

export default router