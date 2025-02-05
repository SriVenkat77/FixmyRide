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
      subject: "Bike Service Status",
      message,
    });
    res
      .status(200)
      .json({ success: true, message: `Email sent to: ${user.email}` });
  } catch (error) { 
    return next(new ErrorHandler(error.message, 500));
  }
 */
