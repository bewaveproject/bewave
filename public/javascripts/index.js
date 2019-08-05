// const getCoordinates = address => {
//     axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM`)
//     .then(response => {printInfo(response.data)
//     console.log(response.data)})
//     .catch(err=> console.log(err))
//   }
  
//   document.getElementById('theButton').onclick = () => {
//     const inputValue = document.getElementById('theInput').value
//     getCoordinates(inputValue)
//   }

const axios = require('axios')

const googleMaps = {

    getCoordinates (address) {
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM`)
    }
}

module.exports = googleMaps