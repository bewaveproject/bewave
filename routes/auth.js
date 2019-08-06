const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../configs/cloudinary.config')
const nodemailer = require('nodemailer')
const Post = require('../models/post.model')
const Spot = require('../models/spot.model')
const axios = require('axios')

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

router.post("/signup", uploadCloud.single('photo'), (req, res, next) => {

  const {username, email, password} = req.body
  
  //console.log(req.file)
  
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


    User.create({username, email, password: hashPass, photo: req.file.secure_url} )
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
  User.findById(req.user._id)
  .populate('posts')
  .then(userFeatures => {
    res.render("auth/profile", { user: userFeatures })
  })
})
router.get('/mySpots', ensureLogin.ensureLoggedIn(), (req,res)=> {
  //console.log(req.user)
  User.findById(req.user._id)
  .populate('spots')
  .then((userFeatures)=> {
    //console.log(userFeatures)
    res.render("auth/mySpots", { user: userFeatures})
    //console.log(req.user.spots[0])
    //console.log('hola')
  })

})
router.get('/myFriends', ensureLogin.ensureLoggedIn(), (req,res)=> {
  //console.log(req.user)
  res.render("auth/myFriends", { user: req.user });
})
router.get('/myPlanet', ensureLogin.ensureLoggedIn(), (req,res)=> {
  //console.log(req.user)
  User.findById(req.user._id)
  .populate('spots')
  .then(userFeatures => res.render("auth/myPlanet", { user: userFeatures}))
})
router.get('/newSpot', ensureLogin.ensureLoggedIn(), (req,res)=> {
  //console.log(req.user)
  res.render("auth/add-spot", { user: req.user });
})
router.post('/newSpot', ensureLogin.ensureLoggedIn(), (req,res)=> {
  //console.log(req.body.spot)
  const {name} = req.body
  const creatorId = req.user._id
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM`)
  // .then(response => {
  //   const lat = response.data.results[0].geometry.location.lat
  //   const lng = response.data.results[0].geometry.location.lng
  //   return {lat,lng}
  // })
  .then((response) => Spot.create({name, lat: response.data.results[0].geometry.location.lat, lng: response.data.results[0].geometry.location.lng, creatorId}))
  .then((x)=>
  User.findByIdAndUpdate(req.user._id, {$push: {spots: x._id}}, {new: true}
    // function(err, result){
    //   if(err){
    //       console.log(err);
    //   }}
    )
    // .populate('spots')
    )
  .then(x => {
    //console.log(x)
    res.render('auth/mySpots', {user: req.user})
  })

})


router.get('/new-post', ensureLogin.ensureLoggedIn(),(req,res,next)=> res.render('auth/new-post'))
router.post('/new-post',uploadCloud.single('photo'), (req,res,next)=>{
    const {content, picName} = req.body
    const photo = req.file.secure_url
    const creatorId = req.user._id
    Post.create({content,picName, photo, creatorId})
    .then((x)=>
    {
      User.findByIdAndUpdate(req.user._id, {$push: {posts: x._id}}, 
      function(err, result){
        if(err){
            console.log(err);
        }})
    }
      )
    .then(()=> res.redirect('/auth/profile'))
})



module.exports = router
