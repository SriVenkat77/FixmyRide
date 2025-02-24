const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        },
        date: {
            type: Date,
            required: [true, 'Booking Date is required.'],
            validate: {
                validator: function (value) {
                   
                    return value >= new Date().setHours(0, 0, 0, 0); 
                },
                message: 'Start date cannot be in the past.',
            },
        },
        status: {
            type: String,
            enum: {
                values: ['Pending', 'ReadyForDelivery', 'Completed'],
                message:
                    'Please select correct status either ReadyForDelivery or Completed',
            },
            default: 'Pending',
        },
    },
    { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
