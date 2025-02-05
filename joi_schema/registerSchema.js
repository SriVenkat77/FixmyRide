const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required().messages({
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must not be more than 50 characters long',
        'any.required': 'Please enter your name',
    }),
    email: Joi.string()
        .trim()
        .lowercase()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Please enter a valid email address',
            'any.required': 'Please enter your email address',
        }),
    mobile: Joi.string().required().messages({
        'any.required': 'Please enter your mobile number',
    }),
    password: Joi.string().trim().min(6).max(256).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must not be more than 256 characters long',
        'any.required': 'Please enter your password',
    }),
    role: Joi.string().valid('owner', 'customer').default('customer').messages({
        'any.only': 'Please select correct role either owner or customer',
    }),
});

module.exports = registerSchema;
