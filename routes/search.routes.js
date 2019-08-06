const express = require('express')
const router  = express.Router()
const fetch = require('node-fetch')
const axios = require('axios')
let lat = 58.5
let lng = 17.8
router.get('/search', (req, res, next) => {
    //console.log(req.body)
    res.render('search')
})
router.get('/search/address', (req, res, next) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM`)
  .then(response => {
    console.log(response.data.results[0].geometry.location.lat)
    fetch(`https://api.stormglass.io/v1/weather/point?lat=${response.data.results[0].geometry.location.lat}&lng=${response.data.results[0].geometry.location.lng}&params=waveHeight`, {
         headers: 
         {
           'Authorization': '18c0a7e6-b502-11e9-91a6-0242ac130004-18c0a944-b502-11e9-91a6-0242ac130004'
         }
       })
           .then((response) => {
              response.json()
              .then(jsonData =>{
                let  sumWaveHeight = 0
               jsonData.hours[0].waveHeight.forEach(elm => console.log(sumWaveHeight += elm.value))
               sumWaveHeight = sumWaveHeight / jsonData.hours[0].waveHeight.length
               console.log(sumWaveHeight)
			
			   
                let  sumSwellHeight = 0
               jsonData.hours[0].swellHeight.forEach(elm => console.log(sumSwellHeight += elm.value))
               sumSwellHeight = sumSwellHeight / jsonData.hours[0].swellHeight.length
               console.log(sumSwellHeight)
             
            
              
                let  sumSwellDirection = 0
               jsonData.hours[0].swellDirection.forEach(elm => console.log(sumSwellDirection += elm.value))
               sumSwellDirection = sumSwellDirection / jsonData.hours[0].swellDirection.length
               console.log(sumSwellDirection)
               
             
                let  sumWaterTemperature = 0
               jsonData.hours[0].waterTemperature.forEach(elm => console.log(sumWaterTemperature += elm.value))
               sumWaterTemperature = sumWaterTemperature / jsonData.hours[0].wat.length
               console.log(sumWaterTemperature)
               
             
                let  sumAirTemperature = 0
               jsonData.hours[0].airTemperature.forEach(elm => console.log(sumAirTemperature += elm.value))
               sumAirTemperature = sumAirTemperature / jsonData.hours[0].airTemperature.length
			   console.log(sumAirTemperature)

			   res.render('search', {sumWaveHeight, sumSwellHeight, sumSwellDirection, sumWaterTemperature, sumWaterTemperature, sumAirTemperature  })
			})
		  
             
           })
           .catch(err => console.log(err))
  })
  // googleMaps.getCoordinates('Biarritz')
  // .then(test =>{lat = test.data.results[0].geometry.location.lat, lng = test.data.results[0].geometry.location.lng
  //   console.log(lat,lng)
  // })
  // .then(x => fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=waveHeight`, {
  //       headers: 
  //       {
  //         'Authorization': '18c0a7e6-b502-11e9-91a6-0242ac130004-18c0a944-b502-11e9-91a6-0242ac130004'
  //       }
  //     })
  //         .then((response) => response.json())
  //         .then((jsonData) => {
  //             let  sum = 0
  //             jsonData.hours[0].waveHeight.forEach(elm => console.log(sum += elm.value))
  //             sum = sum / jsonData.hours[0].waveHeight.length
  //             console.log(sum)
  //             res.render('search', {sum: sum})
  //         })
  //         .catch(err => console.log(err)))
})
// router.get('/search/coordinates', (req, res, next) => {
// fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=waveHeight`, {
//     headers: 
//     {
//       'Authorization': '18c0a7e6-b502-11e9-91a6-0242ac130004-18c0a944-b502-11e9-91a6-0242ac130004'
//     }
//   })
//   .then((response) => response.json())
//   .then((jsonData) => {
//       let  sum = 0
//       jsonData.hours[0].waveHeight.forEach(elm => console.log(sum += elm.value))
//       sum = sum / jsonData.hours[0].waveHeight.length
//       console.log(sum)
//       res.render('search', {sum: sum})
//   })
//   .catch(err => console.log(err))
// })

module.export = router