"use strict";

const _cors = require("cors");
const _bodyParser = require("body-parser");
const express = require("express");

module.exports.init = function(app) {
    app.logger = console;
    app.use((req, res, next) => {
        res.locals.env = process.env.NODE_ENV || 'development';
        next();
    });
    // http://127.0.0.1:3000
    app.use(express.static("public"));
    app.set("view options", { layout: "layout.ejs" });
    app.set("view engine", "ejs");

    app.use(_bodyParser.json());
    app.use(_bodyParser.urlencoded({ extended: false }));

    app.use(_cors());
};
