let express = require('express');
const Account = require("../models/account");
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('register', {errors: [], info: ""});
});

router.post('/', function (req, res, next) {
        console.log('registering user');
        const {firstName, lastName, username, email, password, password2} = req.body;
        let errors = [];

        if (!firstName || !lastName || !username || !email || !password || !password2) {
            errors.push({msg: 'Please fill required fields'});
        }
        //check if passwords equal
        if (password !== password2) {
            errors.push({msg: 'Passwords do not match'});
        }

        //check password length
        if (password.length < 6) {
            errors.push({msg: 'Password should be atleast 6 characters'});
        }

        if (errors.length > 0) {
            res.render('register', {
                info: "",
                errors: errors
            });
        } else {
            Account.findOne({email: email})
                .then(user => {
                    if (user) {
                        errors.push({msg: 'Email already registered'});
                        res.render('register', {
                            info: "",
                            errors: errors
                        });
                    } else {
                        Account.register(new Account({
                            username: req.body.username,
                            email: req.body.email,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName
                        }), req.body.password, function (err, account) {
                            if (err) {
                                return res.render('register', {info: err, errors: errors});
                            }
                            // console.log(account);
                            //send email verification
                            let authenticationURL = 'http://localhost:3000/verify?authToken=' + account.authToken;
                            // sendgrid.send({
                            //     to: account.email,
                            //     from: 'emailauth@yourdomain.com',
                            //     subject: 'Confirm your email',
                            //     html: '<a target=_blank href=\"' + authenticationURL + '\">Confirm your email</a>'
                            // }, function (err, json) {
                            //     if (err) {
                            //         return console.error(err);
                            //     }
                            //
                            //     res.redirect('/email-verification');
                            // });
                            console.log(authenticationURL);
                            console.log('user registered!');
                            res.redirect('/secret');
                        });
                    }
                });
        }
    }
);

module.exports = router;
