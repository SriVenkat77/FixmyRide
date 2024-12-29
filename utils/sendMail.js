const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
    const transport = {
        service: process.env.SERVICE,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
        },
    };

    const transporter = nodemailer.createTransport(transport);
    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };
    await transporter.sendMail(message);
};

module.exports = sendEmail;

/**
 * try {
    sendEmail({
      email: user.email,
      subject: "This is a quick update regarding your bike service.If you have any questions or need further assistance, please feel free to contact us at FixmyRide@Support.com. Thank you for choosing FixmyRide. We look forward to ensuring your bike is in top condition!",
      message,
    });
    res
      .status(200)
      .json({ success: true, message: `Email sent to: ${user.email}` });
  } catch (error) { 
    return next(new ErrorHandler(error.message, 500));
  }
 */
