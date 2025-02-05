const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email({ tlds: { allow: true } })
        .required()
        .messages({
            'string.email': 'Please enter a valid email address',
            'any.required': 'Please enter your email address',
        }),

    password: Joi.string().trim().min(6).max(256).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must not be more than 256 characters long',
        'any.required': 'Please enter your password',
    }),
});

module.exports = loginSchema;
