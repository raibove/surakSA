
require("dotenv").config({ path: './env' });
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./model/User')

var express = require('express');
var app     = express();

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});
console.log(process.env.GOOGLE_CLIENT_ID);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
    async (accesToken, refreshToken, profile, cb) => {
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.emails[0].value,
    }

    try {
        let user = await User.findOne({ googleId: profile.id })
        if(user) {
<<<<<<< HEAD
=======
            app.locals.guser = user;
>>>>>>> 994939d7600fbceef923c281b58a59bf5e9c7050
            //localStorage.setItem("googleId",profile.id)
            cb(null, user) //done is the callback funtion
        }else{
            user = await User.create(newUser)
           // localStorage.setItem("googleId",profile.id)
<<<<<<< HEAD
=======
           app.locals.guser = user;
>>>>>>> 994939d7600fbceef923c281b58a59bf5e9c7050
            cb(null, user) 
        }
    } catch (err) {
        console.error(err);
    }
}
    
  
));
