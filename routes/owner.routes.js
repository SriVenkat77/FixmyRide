const {
    createService,
    getAllServiceByOwnerID,
    getSpecificService,
    getAllServices,
    updateSpecificService,
    deleteSpecificService,
} = require('../controllers/owner.controllers');
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require('../middleware/authenticate');

const router = require('express').Router();

router
    .route('/services/customer')
    .get([isAuthenticatedUser, authorizeRoles('customer'), getAllServices]);

router
    .route('/services')
    .post([isAuthenticatedUser, authorizeRoles('owner'), createService]);

router
    .route('/services/owner')
    .get([
        isAuthenticatedUser,
        authorizeRoles('owner'),
        getAllServiceByOwnerID,
    ]);

router
    .route('/services/:id')
    .get([
        isAuthenticatedUser,
        authorizeRoles('owner', 'customer'),
        getSpecificService,
    ])
    .patch([
        isAuthenticatedUser,
        authorizeRoles('owner'),
        updateSpecificService,
    ])
    .delete([
        isAuthenticatedUser,
        authorizeRoles('owner'),
        deleteSpecificService,
    ]);

module.exports = router;
