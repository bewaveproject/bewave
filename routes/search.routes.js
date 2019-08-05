const express = require('express')
const router  = express.Router()
const fetch = require('node-fetch')
let lat = 58.5
let lng = 17.8
const googleMaps = require('../public/javascripts/index')

router.get('/search', (req, res, next) => {
    //console.log(req.body)
    res.render('search')
})

router.get('/search/address', (req, res, next) => {

  googleMaps.getCoordinates('Biarritz')
  .then(test =>{lat = test.data.results[0].geometry.location.lat, lng = test.data.results[0].geometry.location.lng
    console.log(lat,lng)
  })
  .then(x => fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=waveHeight`, {
        headers: 
        {
          'Authorization': '18c0a7e6-b502-11e9-91a6-0242ac130004-18c0a944-b502-11e9-91a6-0242ac130004'
        }
      })
          .then((response) => response.json())
          .then((jsonData) => {
              let  sum = 0
              jsonData.hours[0].waveHeight.forEach(elm => console.log(sum += elm.value))
              sum = sum / jsonData.hours[0].waveHeight.length
              console.log(sum)

              res.render('search', {sum: sum})
          })
          .catch(err => console.log(err)))
        })

router.get('/search/coordinates', (req, res, next) => {
fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=waveHeight`, {
    headers: 
    {
      'Authorization': '18c0a7e6-b502-11e9-91a6-0242ac130004-18c0a944-b502-11e9-91a6-0242ac130004'
    }
  })
  .then((response) => response.json())
  .then((jsonData) => {
      let  sum = 0
      jsonData.hours[0].waveHeight.forEach(elm => console.log(sum += elm.value))
      sum = sum / jsonData.hours[0].waveHeight.length
      console.log(sum)

      res.render('search', {sum: sum})
  })
  .catch(err => console.log(err))
})


    
module.exports = router