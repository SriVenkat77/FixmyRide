const {
    getAllBookings,
    createBookings,
    updateBookingStatus,
    getAllBookingByOwnerID,
    getAllBookingByCustomerID,
} = require('../controllers/booking.controllers');
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require('../middleware/authenticate');

const router = require('express').Router();

router
    .route('/bookings')
    .get([isAuthenticatedUser, authorizeRoles('customer'), getAllBookings]);

router
    .route('/bookings/owner')
    .get([
        isAuthenticatedUser,
        authorizeRoles('owner'),
        getAllBookingByOwnerID,
    ]);

router
    .route('/bookings/customer')
    .get([
        isAuthenticatedUser,
        authorizeRoles('customer'),
        getAllBookingByCustomerID,
    ]);

router
    .route('/bookings')
    .post([isAuthenticatedUser, authorizeRoles('customer'), createBookings])
    .patch([isAuthenticatedUser, authorizeRoles('owner'), updateBookingStatus]);

module.exports = router;
