var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');

router.post('/register', function (req, res, next) {
    console.log(req.body)
    addUser(req, res);
});

async function addUser(req, res) {
    var user = new User({
        username: req.body.username,
        password: User.hashPassword(req.body.password),
        creation_dt: Date.now()
    })

    try {
        user = await user.save();
        return res.status(201).json(user);
    }
    catch (err) {
        return req.status(501).json(err);
    }
}

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function (err) {
            if (err) { return res.statu(501).json(err) }
            return res.status(200).json(user);
        });
    })(req, res, next);
});

router.get('/home', isValidUser, function (req, res, next) {
    return res.status(200).json(req.user);
});

router.get('/logout', isValidUser, function (req, res, next) {
    req.logout();
    return res.status(200).json({ message: 'logout success' });
});

function isValidUser(req, res, next) {
    if (req.isAuthenticated()) next();
    else return res.status(401).json({ message: "Unauthorized request" })
}

module.exports = router;
