let express = require('express');
let router = express.Router();
const passport = require("../models/passport");

router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/facebook', passport.authenticate('facebook'));


router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secret');
    });

router.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secret');
    });

module.exports = router;