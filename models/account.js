const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    findOrCreate = require("mongoose-findorcreate");

const Account = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    googleId: String,
    facebookId: String,
    secret: String
});

Account.plugin(findOrCreate);

Account.plugin(passportLocalMongoose, {
    usernameField: 'username',
    usernameQueryFields: ['username', 'email'],
    usernameUnique: true
});

module.exports = mongoose.model('Account', Account);