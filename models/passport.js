const passport = require("passport"),
    OauthGoogleStrategy = require("passport-google-oauth20").Strategy,
    OauthFacebookStrategy = require("passport-facebook").Strategy,
    // OauthTwitterStrategy = require("passport-twitter").Strategy,
    Account = require("./account");

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Account.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(Account.createStrategy());

passport.use(new OauthGoogleStrategy({
        authorizationURL: "https://accounts.google.com/o/oauth2/auth",
        tokenURL: "https://oauth2.googleapis.com/token",
        clientID: process.env.CLIENT_GOOGLE_ID,
        clientSecret: process.env.CLIENT_GOOGLE_SECRET,
        callbackURL: "/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        Account.findOrCreate({googleId: profile.id}, {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
        }, function (err, user) {
            console.log(profile);
            return cb(err, user);
        });
    }
));

passport.use(new OauthFacebookStrategy({
        clientID: process.env.CLIENT_FACEBOOK_ID,
        clientSecret: process.env.CLIENT_FACEBOOK_SECRET,
        callbackURL: "/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        let name = profile.displayName;
        name = name.split(" ");
        console.log(name);
        Account.findOrCreate({facebookId: profile.id}, {
            firstName: name[0],
            lastName: name[1]
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

// passport.use(new OauthTwitterStrategy({
//         consumerKey: TWITTER_CONSUMER_KEY,
//         consumerSecret: TWITTER_CONSUMER_SECRET,
//         callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
//     },
//     function(token, tokenSecret, profile, cb) {
//         Account.findOrCreate({ twitterId: profile.id }, function (err, user) {
//             return cb(err, user);
//         });
//     }
// ));

module.exports = passport;