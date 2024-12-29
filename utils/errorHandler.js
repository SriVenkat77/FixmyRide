class ErrorHandler extends Error {
  constructor(message, statusCode) {
    // Calling parent constructor for set new error message
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // captureStackTrace is a method of Error class which is used to capture the stack trace of the error and set it to the stack property of the error object which is used to print the stack trace of the error.
  }
}

module.exports = ErrorHandler;
