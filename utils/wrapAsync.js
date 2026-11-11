/**
 * Wraps an async Express route handler so rejected promises are forwarded to next(err).
 */
module.exports = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};
