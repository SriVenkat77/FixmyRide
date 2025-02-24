const sendToken = ({ userObj, statusCode, response }) => {
   
    const token = userObj.getJWTToken();
    
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    response.status(statusCode).cookie('token', token, options).json({
        success: true,
        user: userObj,
        token,
    });
};

module.exports = sendToken;
