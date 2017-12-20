'use strict';
const router = require('express').Router();
const quotes = require('seinfeld-quotes');
const Persistence = require('../lib/persistence');

module.exports.init = function(app, config) {
    ////////////////////////////////////////////////
    // User management endpoints
    ////////////////////////////////////////////////

    router.get('/user/:id', (req, res, next) => {
        const id = req.params.id;

        Persistence.findUserById(id)
            .then(user => {
                res.send({
                    success: true,
                    values: user
                });
            })
            .catch(next);
    });

    router.put('/user/:id', (req, res, next) => {
        const id = req.params.id;
        const token = req.query.access_token;

        Persistence.findUserByToken(token)
            .then((user = {}) => {
                if (user.id !== id){
                    return next(new app.AppError('Unauthorized', 401));
                }

                Persistence.updateUser(id, req.body)
                    .then(user => {
                        res.send({
                            success: true,
                            values: user
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    });

    router.get('/user/:id/om', (req, res, next) => {
        const id = req.params.id;
        const token = req.query.access_token;

        //TODO: have various quotes types, have user pick
        //https://github.com/amandeepmittal/stoic-api
        //https://www.npmjs.com/package/chewbacca-quotes
        Persistence.findUserByToken(token)
            .then((user = {}) => {
                if (user.id !== id){
                    return next(new app.AppError('Unauthorized', 401));
                }

                res.send(quotes());
            })
            .catch(next);
    });

    app.use('/api', router);
};
