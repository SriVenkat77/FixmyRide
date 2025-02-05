// fun is a function that returns a promise and we want to catch errors in that function and pass it to the next middleware which is error middleware in this case (backend\middleware\error.js)
//* This middleware is used in backend\controllers\* to catch errors in async functions
module.exports = (fun) => (req, res, next) => {
  return Promise.resolve(fun(req, res, next)).catch(next);
  // here catch(next) pass the request to next middleware (errors middleware)
};
