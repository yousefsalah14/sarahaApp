import joi from 'joi'
    export const signupSchema = joi.object( {
        email: joi.string().email().required(),
        age: joi.number().min( 16 ).max( 70 ).messages( {
            "number.min":"age must be between 16 and 70 !",
            "number.max":"age must be between 16 and 70 !"
        }),
        name: joi.string().min(5).max(20).required(),
        password: joi.string().pattern( new RegExp( '^[a-zA-Z0-9]{3,30}$' ) ).required(),
        confirmPassword :joi.string().valid(joi.ref("password")).required()
        
    } ).required()
  
    export const loginSchema = joi.object( {
        email: joi.string().email().required(),
        password: joi.string().pattern( new RegExp( '^[a-zA-Z0-9]{3,30}$' ) ).required(),
        
    } ).required()