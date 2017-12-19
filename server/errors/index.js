'use strict';

module.exports.init = function(app) {
    app.use(function handle404(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function handleErrorFinal(err, req, res, next) {

        let error = err;

        let status = err.status || 500;

        switch (status) {
            /*
             * Unauthorized
             * API: expired or malformed tokens
             */
            case 401:
                app.logger.warn('Unauthorized 401 error url: %s', err.message);
                break;
            /*
             * Forbidden
             * Server reciveds valid credentials that
             * are not adecuate to gain access.
             */
            case 403:
                app.logger.warn('Forbidden 403 error url: %s', err.message);
                break;
            case 404:
                app.logger.warn('404 URL: %s', req.protocol + '://' + req.get('Host') + req.url);
                break;
            case 500:
                app.logger.error('Error %s: %s', status, err.message);
                app.logger.error('%s', err.stack);
                break;
            default:
                app.logger.error('Error %s: %s', status, err.message);
        }

        res.status(status);

        /**
         * res.format performs content negotiation
         * on the `Accept` HTTP header on the req
         * object when present.
         *
         * If the header is not specified the first
         * callback is invoked.
         *
         * When no match is found, it responds with
         * a 406 Not Acceptable, or invokes the
         * `default` callback.
         *
         * @type {[type]}
         */
        res.format({
            html: function formatDef() {
                res.render('error', {
                    isErrorView: true,
                    status: status,
                    message: err.message,
                    error: error,
                    stack: error.stack
                });
            },
            json: function formatJSON() {
                res.send({
                    success: false,
                    message: error.message
                });
            },
            default: function formatDef() {
                res.render('error', {
                    isErrorView: true,
                    status: status,
                    message: err.message,
                    error: error,
                    stack: error.stack
                });
            }
        });
});
};