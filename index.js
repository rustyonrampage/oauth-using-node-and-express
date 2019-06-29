const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session');
const app = express()

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: 'asad'
}));
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
var GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: "1038574997890-4f3p8unb279cthgjbhmc3s99afeld7u8.apps.googleusercontent.com",
    clientSecret: "1MHqQs7KLSOhgp1Ktz2EgbTU",
    callbackURL: "http://localhost:5000/redirect"
  },
  function(accessToken, refreshToken, profile, cb) {
      //console.log(accessToken, refreshToken, profile)
      return cb(null, profile)
  }
));
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  console.log("JWT", jwt_payload)
  return cb(null, profile)
}));
passport.serializeUser(function(user, cb) {
    console.log('I should have jack ')
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    console.log('I wont have jack shit')
    cb(null, obj);
  });
  

app.use(express.static('./public'))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    console.log('home request')
    res.sendFile('home.html', { root: __dirname +"/public"})
})

app.get('/login', passport.authenticate('google', { scope: ['profile'] }), (req, res)=>{
    res.sendFile('login.html', { root: __dirname +"/public"})
})
app.get('/test', passport.authenticate(['jwt','google'], { scope: ['profile'] }), (req, res)=>{
  // res.sendFile('login.html', { root: __dirname +"/public"})
  res.send('fuk')
})
app.get('/redirect', passport.authenticate('google'),(req, res)=>{
    console.log('redirected', req.user)
    res.redirect('/')
})

const port = process.env.PORT || 5000
app.listen(port, ()=>
console.log(`Server running on port ${port}`))