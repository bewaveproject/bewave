const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

const nodemailer = require('nodemailer')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {

  const {username, email, password} = req.body
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);


    User.create({username, email, password: hashPass} )
    .then(res.render('auth/login'))
    .catch(err => console.log(err))
    
})
})


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

const ensureLogin = require("connect-ensure-login");

router.get('/profile', ensureLogin.ensureLoggedIn(), (req,res)=> {
  console.log(req.user)
  res.render("auth/profile", { user: req.user });
})
router.get('/mySpots', ensureLogin.ensureLoggedIn(), (req,res)=> {
  console.log(req.user)
  res.render("auth/mySpots", { user: req.user });
})
router.get('/myFriends', ensureLogin.ensureLoggedIn(), (req,res)=> {
  console.log(req.user)
  res.render("auth/myFriends", { user: req.user });
})
router.get('/myPlanet', ensureLogin.ensureLoggedIn(), (req,res)=> {
  console.log(req.user)
  res.render("auth/myPlanet", { user: req.user });
})
router.get('/newSpot', ensureLogin.ensureLoggedIn(), (req,res)=> {
  console.log(req.user)
  res.render("auth/add-spot", { user: req.user });
})
router.post('/newSpot', ensureLogin.ensureLoggedIn(), (req,res)=> {
  console.log(req.body.spot)
  User.findById(req.user._id)
   .then(x => {
     console.log(x)
     x.spots.push(req.body.spot)
    res.render('auth/mySpots', {spots: x.spots})
    console.log(x)

   })
})
module.exports = router
