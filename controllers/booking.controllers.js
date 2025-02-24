const Booking = require('../models/booking.model');
const Service = require('../models/service.model');
const User = require('../models/user.model');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const isValidObjectId = require('../utils/isValidObjectId');
const sendEmail = require('../utils/sendMail');
const crypto = require('crypto');
const Razorpay = require('razorpay');

/**
 * @description Get all bookings
 * @path {/api/v1/bookings}
 * @method {GET}
 * @access private
 */

exports.getAllBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find()
        .populate('customer', 'name email mobile')
        .exec();
    if (bookings) {
        return res.status(200).json({
            message: 'All Bookings',
            success: true,
            bookingsCount: bookings.length,
            bookings,
        });
    }
    return next(new ErrorHandler('No Bookings found', 404));
});

/**
 * @description Create a booking
 * @path {/api/v1/bookings}
 * @method {POST}
 * @access private
 */


const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

exports.createBookings = catchAsyncErrors(async (req, res, next) => {
    const serviceId = req.body?.serviceId;
    const customerId = req.user._id;
    const { date } = req.body;

    const validId = isValidObjectId(serviceId);
    if (!validId) {
        return next(new ErrorHandler('Invalid Service Id', 400));
    }

    // Check if the service is present in the database
    let service = await Service.findById(serviceId)
        .populate('ownerId', 'name email')
        .exec();
    if (!service) {
        return next(new ErrorHandler('Service not found', 404));
    }

    // Check if the user is present in the database
    let user = await User.findById(customerId)
        .select('name mobile email')
        .exec();

    // Check if the user has already booked the same service on the same day
    const existingBooking = await Booking.findOne({
        customer: customerId,
        service: serviceId,
        date,
    }).exec();
    if (existingBooking) {
        return next(
            new ErrorHandler('You have already booked this service', 400)
        );
    }

    // Razorpay payment order creation
    const price = service.price;
    const orderOptions = {
        amount: price * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt#${Date.now()}`,
        payment_capture: 1,
    };

    try {
        const order = await razorpayInstance.orders.create(orderOptions);
        const orderId = order.id;
        
        // Now, return the orderId to the frontend for payment processing
        res.status(200).json({
            success: true,
            orderId,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        return next(new ErrorHandler('Failed to create Razorpay order', 500));
    }
});

// Verify payment 


exports.verifyPayment = catchAsyncErrors(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, serviceId, date } = req.body;

  // Prepare the data to verify the signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  // Verify the payment signature
  if (expectedSignature === razorpay_signature) {
    // Payment is verified, now create the booking
    const customerId = req.user._id;

    // Check if the service exists
    let service = await Service.findById(serviceId).exec();
    if (!service) {
      return next(new ErrorHandler('Service not found', 404));
    }

    // Create the booking
    const booking = await Booking.create({
      customer: customerId,
      service: serviceId,
      date,
      orderId: razorpay_order_id, // Store the Razorpay order ID
      paymentId: razorpay_payment_id, // Store the payment ID
    });

    if (booking) {
      return res.status(200).json({
        success: true,
        message: 'Payment successful, booking created.',
        booking,
      });
    }
    return next(new ErrorHandler('Failed to create booking', 400));
  } else {
    return next(new ErrorHandler('Payment verification failed', 400));
  }
});



/**
 * @description Update booking status
 * @path {/api/v1/bookings}
 * @method {PATCH}
 * @access private
 */

exports.updateBookingStatus = catchAsyncErrors(async (req, res, next) => {
    const bookingId = req.body?.bookingId;
    const { status } = req.body;

    const isValidBookingId = isValidObjectId(bookingId);
    if (!isValidBookingId) {
        return next(new ErrorHandler('Invalid Booking Id', 400));
    }

    // Check if the booking is present in the database
    let booking = await Booking.findById(bookingId)
        .populate('customer', 'name email mobile')
        .populate('service', 'name')
        .exec();
    console.log({ booking });
    if (!booking) {
        return next(new ErrorHandler('Booking not found', 404));
    }

    if (booking.status === 'Completed') {
        return next(
            new ErrorHandler(`You have already Completed this booking`, 400)
        );
    }

    if (booking.status === status) {
        return next(
            new ErrorHandler(
                `You have already booking marked as ${status}`,
                400
            )
        );
    }

    if (booking.status === 'Pending' && status === 'Completed') {
        return next(
            new ErrorHandler(
                `You can not mark as Completed before ReadyForDelivery`,
                400
            )
        );
    }

    if (booking.status === 'ReadyForDelivery' && status === 'Pending') {
        return next(
            new ErrorHandler(
                `You can not mark as Pending after ReadyForDelivery `,
                400
            )
        );
    }

    booking.status = status;
    booking = await booking.save();

    if (booking) {
        // TODO:
        // Send Email to Customer  ✅
        if (booking.status === 'ReadyForDelivery') {
            const message = `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; font-family: Arial, sans-serif; line-height: 1.6;">
    
      <!-- Header Section -->
      <header style="text-align: center; background-color:rgb(61, 30, 185); color: white; padding: 10px;">
        <h1 style="margin: 0;">FixmyRide</h1>
        <p style="margin: 0; font-size: 16px;">Your trusted partner for bike services!</p>
      </header>

      <!-- Main Content Section -->
      <section style="margin: 20px 0; padding: 10px; background-color:rgb(148, 128, 212); border: 1px solid #ddd;">
        <h2 style="margin-bottom: 10px; font-size: 24px;">Service Name: ${booking?.service?.name}</h2>
        <h3 style="margin-bottom: 10px; font-size: 20px;">Booked Date: ${new Date(booking?.date).toDateString()}</h3>        
        <h3 style="margin-bottom: 10px; font-size: 18px;">Status: <span style="color:green">Ready for Delivery</span></h3>
      </section>

      <!-- Contact Information Section -->
      <section style="margin: 20px 0; font-size: 16px; color: #555;">
        <h3>Contact Us:</h3>
        <p>Email: <a href="mailto:support@fixmyride.com" style="color:rgb(143, 128, 220);">support@fixmyride.com</a></p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Bike St, Bike City, BC 12345</p>
      </section>

      <!-- Footer Section -->
      <footer style="text-align: center; padding: 10px;  color: white;">
        <p>&copy; 2025 FixmyRide. All rights reserved.</p>
        <p><a href="http://www.fixmyride.com/privacy" style="color: white;">Privacy Policy</a> | <a href="http://www.fixmyride.com/terms" style="color: white;">Terms of Service</a></p>
      </footer>

    </div>
        `;

            try {
                sendEmail({
                    email: booking?.customer?.email,
                    subject: 'Bike Service Status',
                    message,
                });
                return res.status(200).json({
                    success: true,
                    message: `Email sent to customer ${booking?.customer?.email} `,
                    booking,
                });
            } catch (error) {
                return next(new ErrorHandler(error.message, 500));
            }
        }

        return res.status(201).json({
            message: `Services Status set to Completed`,
            success: true,
            booking,
        });
    }
    return next(new ErrorHandler('Service booking Failed', 400));
});

/**
 * @description Get all bookings by ownerId
 * @path {/api/v1/bookings/owner}
 * @method {GET}
 * @access private
 */

exports.getAllBookingByOwnerID = catchAsyncErrors(async (req, res, next) => {
    const ownerId = req.user._id;
    try {
        // Fetch all bookings associated with the ownerId
        const bookings = await Booking.find()
            .populate({
                path: 'service',
                match: { ownerId: ownerId },
                select: 'name ownerId',
            })
            .populate('customer', 'name email mobile')
            .exec();

        const filteredBookings = bookings.filter(
            (booking) => booking.service !== null
        );
        if (filteredBookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No bookings found for the specified ownerId.',
            });
        }
        return res.status(200).json({
            success: true,
            ownerId,
            bookingsCount: filteredBookings.length,
            bookings: filteredBookings,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching bookings for the specified ownerId.',
        });
    }
});

/**
 * @description Get all bookings by customerID
 * @path {/api/v1/bookings/customer}
 * @method {GET}
 * @access private
 */

exports.getAllBookingByCustomerID = catchAsyncErrors(async (req, res, next) => {
    const customerId = req.user._id;

    // Fetch all bookings associated with the ownerId
    const bookings = await Booking.find({ customer: customerId })
        .populate('customer', 'name email mobile')
        .populate({
            path: 'service',
            populate: {
                path: 'ownerId',
                select: 'name'
            }
        })
        
        .exec();

    if (!bookings) {
        return next(new ErrorHandler('No Bookings found', 404));
    }

    return res.status(200).json({
        success: true,
        customerId,
        bookingsCount: bookings.length,
        bookings,
    });
});
