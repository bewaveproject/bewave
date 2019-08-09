const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.get('/:id', (req,res)=> {
   
    User.findById(req.params.id)
    .populate('posts')
    .populate('spots')
    .populate('plans')
    .then(userFeatures => {
      console.log(userFeatures)
      res.render("auth/otherProfile", { user: userFeatures })
    })
  })


module.exports = router