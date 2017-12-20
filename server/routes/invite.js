'use strict';
const router = require('express').Router();
const fs = require('fs');
const marked = require('marked');
const filepath = '../README.md';
const useragent = require('useragent');

const Persistence = require('../lib/persistence');

module.exports.init = function (app) {

    app.get('/', function (req, res) {
        fs.readFile(filepath, 'utf8', function (err, data) {
            if (err) {
                app.logger.error(err);
            }
            const content = marked(data.toString());
            res.render('index', { content });
        });
    });
    
    /**
     * Generate invite code for a given 
     * user.
     */
    router.get('/email/:user', (req, res, next) => {
        const id = req.params.user;
        const debug = req.query.debug;
        console.log('debug', debug)
        const ua = useragent.is(req.headers['user-agent']);

        Persistence.generateInviteCodeForUser(id).then((user) => {
            let iosLink = false;

            if (debug || ua['mobile_safari']) {
                iosLink = 'myom://signup?token=' + user.inviteCode;
            } 

            res.render('invite', {
                user,
                iosLink
            });
            
        }).catch(next);
    });

    router.post('/ios/:invite', (req, res, next) => {
        const invite = req.params.invite;
        Persistence.findUserByInviteCode(invite).then((user) => {
            delete user.inviteCode;
            user.registered = true;

            res.send({
                success: true,
                values: user
            });
        }).catch(next);
    });

    app.use('/invite', router);
};