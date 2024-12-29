const User = require('../models/user.model');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const registerSchema = require('../joi_schema/registerSchema');
const loginSchema = require('../joi_schema/loginSchema');

/**
 * @description Register a new user
 * @path {/api/v1/register}
 */

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    console.log('Register User', req.body);

    const { error, value } = registerSchema.validate(req.body);

    if (error) {
        const validationErrors = error.details.map((err) =>
            err.message.replace(/"/g, '')
        );
        return res
            .status(400)
            .json({ success: false, message: `${validationErrors} [Joi]` });
    }

    let user = await User.findOne({ email: value.email }).exec();
    if (user) {
        return next(new ErrorHandler('Email already Exists', 400));
    }

    let userMobile = await User.findOne({ mobile: value.mobile }).exec();
    if (userMobile) {
        return next(new ErrorHandler('Phone Number is already Exists', 400));
    }
    user = await User.create(value);
    return res.status(201).json({
        message: 'User Registration Successful',
        success: true,
        user,
    });
});

/**
 * @description Login a user
 * @path {/api/v1/login}
 
 */
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    console.log('LoginUser', req.body);
    const { error, value } = loginSchema.validate(req.body);
    console.log({ value });

    if (error) {
        const validationErrors = error.details.map((err) =>
            err.message.replace(/"/g, '')
        );
        return res
            .status(400)
            .json({ success: false, message: `${validationErrors} [Joi]` });
    }
    const { email, password } = value;
    const user = await User.findOne({ email }).select('+password').exec();

    if (user && (await user.isValidatePassword(password))) {
        sendToken({ userObj: user, statusCode: 200, response: res });
        return;
    }

    return next(new ErrorHandler('Invalid email or password', 401));
});
/**
 * @description Logout a user
 * @path {/api/v1/logout}
 */
exports.logoutUser = (req, res, next) => {
    return res
        .status(200)
        .cookie('token', null, {
            expires: new Date(Date.now()), // set cookie to expire in 1 second
            httpOnly: true,
        })
        .json({
            success: true,
            message: 'Logged out',
        });
};

/**
 * @description Get currently logged in user details
 * @param {/api/v1/myprofile}
 *  @method {GET}
 * @access private
 */

exports.getMyProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).exec();
    if (user) {
        return res.status(200).json({
            success: true,
            user,
        });
    }
    return next(new ErrorHandler('User not found', 404));
});
