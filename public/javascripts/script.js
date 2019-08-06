
window.onload = () =>
{


    const geoCoder = new google.maps.Geocoder()
    const myMap = new google.maps.Map(

        document.getElementById('map'),
        {
            center: { lat: 40.3922581, lng: -3.698573845 },
            zoom: 10
        }
    )

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


