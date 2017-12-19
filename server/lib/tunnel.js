'use strict';

const localtunnel = require('localtunnel');
 
//TODO: Make proxy, in prod localhost to localtunnel
// and in dev from localtunnel to localhost.
module.exports.init = function(app) {
    const port = app.get('port');
    const subdomain = app.get('subdomain');

    const tunnel = localtunnel(port, {subdomain}, function(err, tunnel) {
        if (err) {
            throw err;
        }
        app.logger.log('Opened tunnel:');
        app.logger.log(tunnel.url);
    });
};

 