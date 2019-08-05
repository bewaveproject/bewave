const express = require('express')
const router  = express.Router()
const fetch = require('node-fetch')
const lat = 58.5
const lng = 17.8

// fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}`, {
//   headers: 
//   {
//     'Authorization': '18c0a7e6-b502-11e9-91a6-0242ac130004-18c0a944-b502-11e9-91a6-0242ac130004'
//   }
// })
//     .then((response) => response.json())
//     .then((jsonData) => console.log(jsonData))

router.get('/', (req, res, next) => res.render('index'))

module.exports = router