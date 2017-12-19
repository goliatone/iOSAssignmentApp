'use strict';
const extend = require('gextend');
const _data = require('./users.json');
const AppError = require('../errors/apperror');

const Persistence = {};

Persistence.findUserBy = function (prop, val) {
    return new Promise((resolve, reject) => {
        let item = findBy(_data, prop, val);
        if (!item) { 
            const code = prop === 'token' ? 401 : 404;
            const msg = prop === 'token' ? 'Unauthorized' : 'Resource Not Found';
            reject(new AppError(msg, code));
        }
        else resolve(item);
    });
};

Persistence.findUserById = function (id) {
    return Persistence.findUserBy('id', id);
};

Persistence.findUserByToken = function (token) {
    return Persistence.findUserBy('token', token);
};

Persistence.findUserByInviteCode = function (inviteCode) {
    return Persistence.findUserBy('inviteCode', inviteCode);
};

Persistence.generateInviteCodeForUser = function (id) {
    return Persistence.findUserById(id).then((user) => {
        user.inviteCode = getUid();
        return user;
    });
};

Persistence.updateUser = function (id, values) {
    return Persistence.findUserById(id).then((user) => {
        user = extend(user, values);
        return user;
    });
};

module.exports = Persistence;

function findBy(data, prop, val) {
    return data.find((item) => item[prop] === val);
}

function getUid() {
    const timestamp = (new Date()).getTime().toString(36);
    const randomString = (Math.random() * 10000000000000000).toString(36).replace('.', '');
    return `${timestamp}-${randomString}`;
}