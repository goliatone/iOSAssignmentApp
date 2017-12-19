'use strict';
const express = require('express');

const api = require('./routes/api');
const invite = require('./routes/invite');
const middleware = require('./middleware');
const errorHandler = require('./errors');

const AppError = require('./errors/apperror');

const app = express();
const port = process.env.NODE_PORT || 3000;
const host = process.env.NODE_HOST || 'localhost';

app.set('port', port);
app.set('subdomain', 'myom');

app.AppError = AppError;

/**
 * Add middleware to handle things
 * like body parsing, CORS, etc.
 */
middleware.init(app);

/**
 * Add routes to handle API calls:
 * GET /api/user/:id
 * 
 */
api.init(app);

/**
 * Add routes to Invites:
 * GET /invite/email/:user
 * POST /invite/ios/:token
 * 
 */
invite.init(app);

/**
 * Add standard error handlers
 */
errorHandler.init(app);


app.listen(port, host);
app.logger.log('Server listening on ' + host + ':' + port);

if(process.env.NODE_ENV === 'production') {
    require('./lib/tunnel').init(app);
}