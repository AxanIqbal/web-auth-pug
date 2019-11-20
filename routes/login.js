let express = require('express');
const Account = require("../models/account");
let router = express.Router();
const passport = require("../models/passport");

router.get('/', function (req, res, next) {
    res.render('login', {info: 'Express'});
});

router.post("/", function (req, res) {
    const user = new Account({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local", {failureRedirect: '/login'})(req, res, function () {
                res.redirect("/secret");
            });
        }
    });

});

module.exports = router;