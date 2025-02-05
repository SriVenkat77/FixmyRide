const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: [3, 'Name must be at least 3 characters long'],
            maxlength: [50, 'Name must not be more than 50 characters long'],
            trim: true,
            required: [true, 'Please enter your name'],
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: [true, 'This email is already registered'],
            required: [true, 'Please enter your email address'],
            validate: {
                validator: (value) => validator.isEmail(value),
                message: 'Please enter a valid email address',
            },
        },
        mobile: {
            type: String,
            trim: true,
            unique: [true, 'This mobile is already registered'],
            required: [true, 'Please enter your mobile number'],
            validate: {
                validator: (value) =>
                    validator.isMobilePhone(value, 'en-IN', {
                        strictMode: false,
                    }),
                message: 'Please enter a valid mobile number [IN]',
            },
        },
        password: {
            type: String,
            select: false,
            trim: true,
            minlength: [4, 'Password must be at least 4 characters long'],
            maxlength: [
                256,
                'Password must not be more than 256 characters long',
            ],
            required: [true, 'Please enter your password'],
        },
        role: {
            type: String,
            enum: {
                values: ['owner', 'customer'],
                message: 'Please select correct role either owner or customer',
            },
            default: 'customer',
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    // if the password is not modified, then move on to the next middleware
    if (!this.isModified('password')) {
        next();
    }
    // if the password is modified, then hash the password and move on to the next middleware
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.getJWTToken = function () {
    // return a signed token with the user id and the secret key
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};

userSchema.methods.isValidatePassword = async function (enteredPassword) {
    // compare the entered password with the password in the database
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
