const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).exec();
        next();
        return;
    }

    return next(new ErrorHandler('Login first to access this resource', 401));
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            // if role is allowed, then go to next middleware
            next();
            return;
        }

        return next(
            new ErrorHandler(
                `Role (${req.user.role}) is not allowed to access this resource`,
                403
            )
        );
    };
};
