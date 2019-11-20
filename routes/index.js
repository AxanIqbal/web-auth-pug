let express = require('express');
let router = express.Router();
let Account = require("../models/account");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/secret', function (req, res) {
    console.log("is auth = " + req.isAuthenticated());
    console.log(req.user);
    // Account.find({"secret": {$ne: null}}, function (err, foundUsers) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         if (foundUsers) {
    //             console.log(foundUsers);
    //             res.render("secret", {usersWithSecrets: foundUsers});
    //         }
    //     }
    // });
    if (req.isAuthenticated()) {
        res.render("secret", {fname: req.user.firstName, lname: req.user.lastName})
    } else {
        res.redirect("/login")
    }
});


module.exports = router;
