window.onload = () =>
{
<<<<<<< HEAD
    
    
=======


    const geoCoder = new google.maps.Geocoder()
>>>>>>> 9d3199d23d9c09a0f14f5af9ef0d3abee2537d0a
    const myMap = new google.maps.Map(
        
        document.getElementById('map'),
        {
            center: { lat: 40.3922581, lng: -3.698573845 },
            zoom: 10
        }
    )
<<<<<<< HEAD
    document.getElementById("submit-address").onclick = (e) => {
        e.preventDefault()
        console.log(document.getElementById('address-input').value)
        let address = document.getElementById('address-input').value
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM`)
        .then(response => {
            const lat = response.data.results[0].geometry.location.lat
            const lng = response.data.results[0].geometry.location.lng
            console.log(lat,lng)
            fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=waveHeight`, {
                 headers: 
                 {
                   'Authorization': '6c168da6-b44f-11e9-8330-0242ac130004-6c168e96-b44f-11e9-8330-0242ac130004'
                 }
               })
               .then((response) => response.json())
               .then(jsonData =>{
                let  sumWaveHeight = 0
                jsonData.hours[0].waveHeight.forEach(elm => console.log(sumWaveHeight += elm.value))
                sumWaveHeight = sumWaveHeight / jsonData.hours[0].waveHeight.length
                document.getElementById("sumWaveHeight").innerHTML = sumWaveHeight
                })
                .catch(err => console.log(err))
            const myMarker = new google.maps.Marker({
                map: myMap,
                position: {lat: lat,lng: lng},
                title: 'yuhu'
                })
            })
        // .then((x)=> {
        //         console.log(x)
        //         fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=waveHeight`, {
        //          headers: 
        //          {
        //            'Authorization': '6c168da6-b44f-11e9-8330-0242ac130004-6c168e96-b44f-11e9-8330-0242ac130004'
        //          }
        //        })
        //     })
            // .then((response) => response.json())
            // .then(jsonData =>{
            //     let  sumWaveHeight = 0
            //     jsonData.hours[0].waveHeight.forEach(elm => console.log(sumWaveHeight += elm.value))
            //     sumWaveHeight = sumWaveHeight / jsonData.hours[0].waveHeight.length
            //     res.render('search', {sumWaveHeight})
            //     })
            // .catch(err => console.log(err))
          

    }
}


    //const geoCoder = new google.maps.Geocoder()

    
    
    //const geoCodeAdress = (geoCoder, resultsMap) => {
        
        //let address = document.getElementById('address').value
        
        // geoCoder.geocode(
        //     { 'address': address },
        //     (results, status) => {
                
        //         console.log(results)
                
                
        //         new google.maps.Marker({
        //             map: resultsMap,
        //             position: {lat: '10',lng: '10'}
        //         })
                
        //         resultsMap.setCenter(position)
                
        //     }
        //     )

        // geoCodeAdress(geoCoder, myMap)
        
        



 
=======

    // geoCodeAdress(geoCoder, myMap)


const geoCodeAdress = (geoCoder, resultsMap) => {

    let address = document.getElementById('address-input').value

    axios.get('/search/address', (req, res, next) => {


    geoCoder.geocode(
        { 'address': address },      // Para que coja la direccion que metas en la casilla
        (results, status) => {

            console.log(results)


            new google.maps.Marker({                  //marcador de ese sitio
                map: resultsMap,
                position: results[0].geometry.location
            })

            resultsMap.setCenter(results[0].geometry.location)

        }
    )
})
  }

    





 }
>>>>>>> 9d3199d23d9c09a0f14f5af9ef0d3abee2537d0a


