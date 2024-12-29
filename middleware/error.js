module.exports = (err, req, res, next) => {
    // console.log(err.stack.red); // red color for error message in console log of terminal (npm i colors)
    // statusCode is 500 by default if not set in the error object in the controller function (backend\controllers\*)
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV == 'development') {
        console.log('Dev mode Error');
        res.status(err.statusCode).json({
            success: false,
            message: err.message, // message is the error message set in the error object in the controller function (backend\controllers\*)
            stack: err.stack,
            error: err,
        });
    }

    if (process.env.NODE_ENV == 'production') {
        console.log('Prod mode Error');
        let message = err.message;
        let error = new Error(message);

        if (err.name == 'ValidationError') {
            /*
      console.log(Object.values(err.errors));
      OUTPUT:
      [        
        properties: {          
          message: 'Please provide a product name',
          type: 'required',
          path: 'name',          
        },            
      ]
      console.log(Object.values(err.errors).map((value) => value.message));
      OUTPUT:
        [ 'Please provide a product name' ]
      */
            message = Object.values(err.errors).map((value) => value.message);
            // message is array of error messages, but the Error class automatically converts array to string when we pass it as a parameter to the constructor of the Error class
            // eg: new Error(['Please provide a product name', 'Please provide a product price']) => Error: Please provide a product name,Please provide a product price with help of String() method
            error = new Error(message[0]);
            err.statusCode = 400;
        }

        if (err.name == 'CastError') {
            message = `Resource not found: ${err.path}`; // err.path is the path(column) of the field which is not found in the database (eg: id, name, etc)
            error = new Error(message);
            err.statusCode = 400;
        }

        if (err.code == 11000) {
            let message = `Duplicate ${Object.keys(err.keyValue)} error`;
            error = new Error(message);
            err.statusCode = 400;
        }

        if (err.name == 'JSONWebTokenError') {
            let message = `JSON Web Token is invalid. Try again`;
            error = new Error(message);
            err.statusCode = 400;
        }

        if (err.name == 'TokenExpiredError') {
            let message = `JSON Web Token is expired. Try again`;
            error = new Error(message);
            err.statusCode = 400;
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
