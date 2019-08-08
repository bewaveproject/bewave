window.onload = () =>
{   
    let sumWaveHeight
    let lat
    let lng
    const myMap = new google.maps.Map(
        
        document.getElementById('map'),
        {
            center: { lat: 40.3922581, lng: -3.698573845 },
            zoom: 1
        }
    )
  var els = document.getElementsByClassName('spot-names')

  Array.from(els).forEach(elm =>{
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${elm.innerHTML}&key=${process.env.GOOGLE_API}`)
  .then(response => {
      console.log(response.data.results[0].address_components[0].short_name)
      lat = response.data.results[0].geometry.location.lat
      const lng = response.data.results[0].geometry.location.lng
      fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=waveHeight`, {
          headers: 
          {
            'Authorization': process.env.STORMGLASS_API
          }
        })
        .then((response) => response.json())
        .then(jsonData =>{
          sumWaveHeight = 0
          jsonData.hours[0].waveHeight.forEach(elm => console.log(sumWaveHeight += elm.value))
          sumWaveHeight = sumWaveHeight / jsonData.hours[0].waveHeight.length
          //document.getElementById("sumWaveHeight").innerHTML = sumWaveHeight
          console.log(sumWaveHeight)
          const myMarker = new google.maps.Marker({
            map: myMap,
            position: {lat: lat,lng: lng},
            title: response.data.results[0].address_components[0].short_name +':' +sumWaveHeight
            })
          })
          .catch(err => console.log(err))
      })
      })
      
  
  }
    
    

  