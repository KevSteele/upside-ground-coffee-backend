//VALIDATION
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .required(),
        fullname: Joi.string(),
        // username: Joi.string()
        //     .min(6)
        //     .required(),
    });
    return schema.validate(data, Joi.object);
}

//Login Validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(8)
            .required()
    });
    return schema.validate(data, Joi.object);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;