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
                    // Custom validation function to ensure the selected date is today or in the future
                    return value >= new Date().setHours(0, 0, 0, 0); // Set time to midnight for date comparison only
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
