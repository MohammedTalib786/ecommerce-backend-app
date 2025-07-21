const express = require('express')
const cookieParser = require('cookie-parser');

module.exports = function checkAuthAdmin(req, res, next) {
    if (req.cookies.auth_token !== process.env.SECRET_TOKEN) {
        // return res.status(401).json({ message: "Unauthorized access via Cookies!" });
        return res.redirect('/login');
    }
    next();
};
