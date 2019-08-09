window.onload = () =>
{   
  let lat
  let lng
  let myMarker
  const myMap = new google.maps.Map(
    
    document.getElementById('map'),
    {
      center: { lat: 40.3922581, lng: -3.698573845 },
      zoom: 2,
      styles:[
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "saturation": -10
            },
            {
              "lightness": 10
            }
          ]
        },
        {
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#04c8de"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    }
    )
    var els = document.getElementsByClassName('spot-names')
  Array.from(els).forEach((elm,idx) =>{
  let sumWaveHeight
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${elm.innerHTML}&key=AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM`)
  .then(response => {
    console.log(response.data.results[0].address_components[0].short_name)
    lat = response.data.results[0].geometry.location.lat
    lng = response.data.results[0].geometry.location.lng
    fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=waveHeight`, {
      headers: 
      {
        'Authorization': '18c0a7e6-b502-11e9-91a6-0242ac130004-18c0a944-b502-11e9-91a6-0242ac130004'
      }
    })
    .then(response => response.json())
    .then(jsonData =>{
          sumWaveHeight = 0
          jsonData.hours[0].waveHeight.forEach(elm => (sumWaveHeight += elm.value))
          sumWaveHeight = sumWaveHeight / jsonData.hours[0].waveHeight.length
          document.getElementsByClassName("sumWaveHeight")[idx].innerHTML += `   ${sumWaveHeight} meters`
        })
        myMarker = new google.maps.Marker({
        map: myMap,
        position: {lat: lat,lng: lng},
        title: response.data.results[0].address_components[0].short_name
      })
      })
      .catch(err => console.log(err))
    })
      
  
  }
    
    

  