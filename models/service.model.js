const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            min: [5, 'Service name must be at least 5 characters.'],
            max: [64, 'Service name must be at most 64 characters.'],
            required: [true, 'Service name is required'],
        },
        description: {
            type: String,
            min: [10, 'Service Description must be at least 10 characters.'],
            max: [512, 'Service Description must be at most 256 characters.'],
            required: [true, 'Service Description is required'],
        },
        price: {
            type: Number,
            min: [1, 'Service price cannot be zero or negative.'],
            required: [true, 'Service Price is required'],
        },
    },
    { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
