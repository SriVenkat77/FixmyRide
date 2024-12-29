const Service = require('../models/service.model');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const isValidObjectId = require('../utils/isValidObjectId');
const serviceSchema = require('../joi_schema/serviceSchema');
const updateServiceSchema = require('../joi_schema/updateRoomSchema');

/**
 * @description Create a service
 * @path {/api/v1/services}
 * @method {POST}
 * @access private
 */
exports.createService = catchAsyncErrors(async (req, res, next) => {
    const { error, value } = serviceSchema.validate(req.body);

    if (error) {
        const validationErrors = error.details.map((err) =>
            err.message.replace(/"/g, '')
        );
        return res
            .status(400)
            .json({ success: false, message: `${validationErrors} [Joi]` });
    }

    let service = await Service.findOne({ name: value.name }).exec();
    if (service) {
        return next(new ErrorHandler('Service already Exists', 400));
    }

    service = await Service.create({
        ...value,
        ownerId: req.user._id,
    });
    if (service) {
        return res.status(201).json({
            message: 'Service Created Successfully',
            success: true,
            service,
        });
    }
    return next(new ErrorHandler('Service Creation Failed', 400));
});

/**
 * @description Get all services
 * @path {/api/v1/services/customer}
 * @method {GET}
 * @access private
 */

exports.getAllServices = catchAsyncErrors(async (req, res, next) => {
    const services = await Service.find().populate('ownerId', 'name').exec();
    if (services) {
        return res.status(200).json({
            message: 'All services',
            success: true,
            servicesCount: services.length,
            services,
        });
    }
    return next(new ErrorHandler('No services found', 404));
});

/**
 * @description Get all service by ownerId
 * @path {/api/v1/service/owner}
 * @method {GET}
 * @access private
 */

exports.getAllServiceByOwnerID = catchAsyncErrors(async (req, res, next) => {
    const ownerId = req.user._id;
    const services = await Service.find({ ownerId })
        .populate('ownerId', 'name')
        .exec();
    if (services) {
        return res.status(200).json({
            message: 'All services By Owner Id',
            success: true,
            servicesCount: services.length,
            services,
        });
    }
    return next(new ErrorHandler('No services found', 404));
});

/**
 * @description Get a service
 * @path {/api/v1/service/:id}
 * @method {GET}
 * @access private
 */

exports.getSpecificService = catchAsyncErrors(async (req, res, next) => {
    const validId = isValidObjectId(req.params.id);
    if (!validId) {
        return next(new ErrorHandler('Invalid Service Id', 400));
    }

    const service = await Service.findById(req.params.id)
        .populate('ownerId', 'name')
        .exec();

    if (service) {
        return res.status(200).json({
            message: 'service',
            success: true,
            service,
        });
    }
    return next(new ErrorHandler('Service not found', 404));
});

/**
 * @description Update a services
 * @path {/api/v1/service/:id}
 * @method {PATCH}
 * @access private
 */

exports.updateSpecificService = catchAsyncErrors(async (req, res, next) => {
    const validId = isValidObjectId(req.params?.id);
    if (!validId) {
        return next(new ErrorHandler('Invalid Service Id', 400));
    }

    const { error, value } = updateServiceSchema.validate(req.body);
    console.log({ value });

    if (error) {
        const validationErrors = error.details.map((err) =>
            err.message.replace(/"/g, '')
        );
        return res
            .status(400)
            .json({ success: false, message: `${validationErrors} [Joi]` });
    }

    const service = await Service.findByIdAndUpdate(req.params.id, value, {
        new: true,
        runValidators: true,
    }).exec();
    console.log({ service });
    if (service) {
        return res.status(200).json({
            message: 'Service Updated Successfully',
            success: true,
            service,
        });
    }
    return next(new ErrorHandler('Service Update Failed or Not Found', 400));
});

/**
 * @description Delete a service
 * @path {/api/v1/service/:id}
 * @method {DELETE}
 * @access private
 */

exports.deleteSpecificService = catchAsyncErrors(async (req, res, next) => {
    const validId = isValidObjectId(req.params?.id);
    if (!validId) {
        return next(new ErrorHandler('Invalid Service Id', 400));
    }

    const service = await Service.findByIdAndDelete(req.params.id).exec();
    if (service) {
        return res.status(200).json({
            message: 'Service Deleted Successfully',
            success: true,
        });
    }
    return next(new ErrorHandler('Service Deletion Failed or Not Found', 404));
});
