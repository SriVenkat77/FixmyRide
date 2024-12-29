const router = require('express').Router();
const rateLimit = require('express-rate-limit');

const {
    registerUser,
    loginUser,
    logoutUser,
    getMyProfile,
} = require('../controllers/auth.controllers');
const { isAuthenticatedUser } = require('../middleware/authenticate');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 3, // 3 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

// AUTH ROUTES
router.route('/register').post([limiter, registerUser]);
router.route('/login').post([limiter, loginUser]);
router.route('/logout').get([isAuthenticatedUser, logoutUser]);
// USER ROUTES
router.route('/myprofile').get([isAuthenticatedUser, getMyProfile]);
module.exports = router;
