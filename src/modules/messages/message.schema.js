import joi from "joi";
import { objectIdValidation } from "../../middlewares/validation.middleware.js";

export const sendMessageSchema = joi.object( {
    content: joi.string().min( 10 ).max( 100 ).required(),
    reciever: joi.custom(objectIdValidation).required()
}).required()