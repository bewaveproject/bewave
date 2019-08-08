const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../configs/cloudinary.config')
const nodemailer = require('nodemailer')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')
const Plan = require('../models/plan.model')
const Spot = require('../models/spot.model')
const axios = require('axios')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error"), user: req.user });
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

//----------PROFILE-------------

router.get('/profile', ensureLogin.ensureLoggedIn(), (req,res)=> {
  User.findById(req.user._id)
  .populate('posts')
  .then(userFeatures => {
    res.render("auth/profile", { user: userFeatures })
  })

  router.get('/profile/:id', ensureLogin.ensureLoggedIn(), (req,res)=> {
  User.findById(req.params.id)
  .populate('posts')
  .populate('spots')
  .populate('plans')
  .then(userFeatures => {
    console.log(userFeatures)
    res.render("auth/otherProfile", { user: userFeatures })
  })
})

router.get('/profile/:id/planet', ensureLogin.ensureLoggedIn(), (req,res)=> {
  User.findById(req.params.id)
  .populate('spots')
  .then(userFeatures => res.render("auth/myPlanet", { user: userFeatures}))
})
})

//----------FRIENDS-------------

router.get('/myFriends', ensureLogin.ensureLoggedIn(), (req,res)=> {
  User.findById(req.user._id)
  .populate('friends')
  .then(userFeatures => res.render("auth/myFriends", { user: userFeatures }))
  .catch(err => console.log(err))
})
router.post('/myFriends', (req,res)=> {

  User.findOne({username: req.body.name})
  .then(x=> 
    User.findByIdAndUpdate(req.user._id, {$push: {friends: x._id}}, function(err, result){if(err)console.log(err)}))
  .then(() => res.render("auth/myFriends", {user: req.user}))
  .catch(err => console.log(err))
})

//----------PLANET-------------

router.get('/myPlanet', ensureLogin.ensureLoggedIn(), (req,res)=> {
  User.findById(req.user._id)
  .populate('spots')
  .then(userFeatures => res.render("auth/myPlanet", { user: userFeatures}))
})

///-------SPOTS----------

router.get('/newSpot', ensureLogin.ensureLoggedIn(), (req,res)=> {
  res.render("auth/add-spot", { user: req.user });
})

router.post('/add-spot', ensureLogin.ensureLoggedIn(), (req,res)=> {
  const {name} = req.body
  const creatorId = req.user._id
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM`)
  .then(response => Spot.create({name, lat: response.data.results[0].geometry.location.lat, lng: response.data.results[0].geometry.location.lng, creatorId}))
  .then(x => User.findByIdAndUpdate(req.user._id, {$push: {spots: x._id}}, {new: true}))
  .then(x => res.redirect('/auth/myPlanet'))
  .catch(err => console.log(err))
})

router.get('/spot/delete/:id',(req,res) => 
  User.findByIdAndUpdate(req.user._id, { $pull: {spots: req.params.id } }, {new: true})
  .then(() => res.redirect('/auth/myPlanet'))
  .catch(err => console.log(err)))

///-------POSTS----------

router.get('/new-post', ensureLogin.ensureLoggedIn(),(req,res,next)=> res.render('auth/new-post'))
router.post('/new-post',uploadCloud.single('photo'), (req,res,next)=>{
    const {content, picName} = req.body
    const photo = req.file.secure_url
    const creatorId = req.user._id
    Post.create({content,picName, photo, creatorId})
    .then(x => User.findByIdAndUpdate(req.user._id, {$addToSet: {posts: x._id}}, function(err, result){if(err)console.log(err)}))
    .then(()=> res.redirect('/auth/profile'))
})

//----------PLANS-------------

router.get('/new-plan', ensureLogin.ensureLoggedIn(),(req,res,next)=> res.render('auth/new-plan'))
router.post('/new-plan', (req,res) => {
  const {place, date, description} = req.body
  const people = []
  const creatorId = req.user._id
  Plan.create({place, date, description, people, creatorId})
  .then(newPlan => res.render('auth/new-plan', {plan: newPlan}))
})

router.get('/plans', ensureLogin.ensureLoggedIn(),(req,res,next)=> {
  Plan.find({})
  .populate('creatorId')
  .populate('comments')
  .populate('people')
  .then(plans => res.render('auth/plans', {plans, user: req.user}))
  .catch(err => console.log(err))
})

router.get('/myPlans', ensureLogin.ensureLoggedIn(),(req,res,next)=> {
  let myplans = []
  Plan.find({people: req.user._id})
  .populate('people')
  .populate('creatorId')
  .populate('comments')
  .then(plans => res.render('auth/plans', {plans, user: req.user}))
  .catch(err => console.log(err))
})

router.get('/view-details/:id', (req,res) => {
  Plan.findByIdAndUpdate(req.params.id, {$addToSet: {people: req.user._id}}, function(err, result){if(err)console.log(err)})
  .populate('people')
  .populate('creatorId')
  .populate('comments')
  .then(plans => res.render('auth/plan', {plans, user: req.user}))
})
router.get('/join/:id',(req,res,next)=> {
  User.findByIdAndUpdate(req.user._id, {$addToSet: {plans: req.params.id}}, function(err, result){if(err)console.log(err)})
  Plan.findByIdAndUpdate(req.params.id, {$addToSet: {people: req.user._id}}, function(err, result){if(err)console.log(err)})
  .populate('people')
  .populate('creatorId')
  .populate('comments')
  .then(plans => res.render('auth/plan', {plans, user: req.user}))
})

router.post('/new-comment/:id', (req,res) => {
  creatorId = req.user._id
  creatorName = req.user.username
  comment = req.body.comment
  Comment.create({creatorId, creatorName, comment})
  .then(newComment =>
  Plan.findByIdAndUpdate(req.params.id, {$addToSet: {comments: newComment._id}}, function(err, result){if(err)console.log(err)}))
  .then(x => res.redirect('/auth/plans'))
  .catch(err => console.log(err))
})




module.exports = router
