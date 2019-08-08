window.onload = () =>
{
  let lat
  let lng
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
                // var autocomplete = document.getElementById("address-input")

                // const search = new google.maps.places.Autocomplete(autocomplete);

                // search.bindTo

            })

    document.getElementById("submit-address").onclick = (e) => {
      
      e.preventDefault()
        
      let address = document.getElementById('address-input').value
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM`)
      .then(response => {
        lat = response.data.results[0].geometry.location.lat
        lng = response.data.results[0].geometry.location.lng
        fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=waveHeight,swellHeight,swellDirection,waterTemperature,airTemperature`, {
          headers: 
          {
            'Authorization': '18c0a7e6-b502-11e9-91a6-0242ac130004-18c0a944-b502-11e9-91a6-0242ac130004'
          }
        })
        .then((response) => response.json())
        .then(jsonData =>{
          
          let  sumWaveHeight = 0
          jsonData.hours[0].waveHeight.forEach(elm => (sumWaveHeight += elm.value))
          sumWaveHeight = parseFloat(sumWaveHeight / jsonData.hours[0].waveHeight.length).toFixed(2)
          
          let  sumSwellHeight = 0
          jsonData.hours[0].swellHeight.forEach(elm => (sumSwellHeight += elm.value))
          sumSwellHeight =parseFloat(sumSwellHeight / jsonData.hours[0].swellHeight.length).toFixed(2)
          
          
          let  sumSwellDirection = 0
          jsonData.hours[0].swellDirection.forEach(elm => (sumSwellDirection += elm.value))
          sumSwellDirection = Math.round(sumSwellDirection / jsonData.hours[0].swellDirection.length)
          
          
          let  sumWaterTemperature = 0
          jsonData.hours[0].waterTemperature.forEach(elm => (sumWaterTemperature += elm.value))
          sumWaterTemperature = Math.round(sumWaterTemperature / jsonData.hours[0].waterTemperature.length)
          
          
          let  sumAirTemperature = 0
          jsonData.hours[0].airTemperature.forEach(elm => (sumAirTemperature += elm.value))
          sumAirTemperature = Math.round(sumAirTemperature / jsonData.hours[0].airTemperature.length)
          
          
          
          document.getElementById("sumWaveHeight").innerHTML = sumWaveHeight
          document.getElementById("sumSwellHeight").innerHTML = sumSwellHeight
          document.getElementById("sumSwellDirection").innerHTML = sumSwellDirection
          document.getElementById("sumWaterTemperature").innerHTML = sumWaterTemperature
          document.getElementById("sumAirTemperature").innerHTML = sumAirTemperature
          
          
          var gauge1 = loadLiquidFillGauge("fillgauge1", sumWaveHeight, config1);
          var config1 = liquidFillGaugeDefaultSettings();
          
          
          config1.circleColor = "#D4AB6A";
          config1.circleColor = "#D9D9D9";
          config1.textColor = "##0D0D0D";
          config1.waveTextColor = "#04D9D9";
          config1.waveColor = "#04D9D9";
          config1.circleThickness = 0.1;
          config1.circleFillGap = 0.2;
          config1.textVertPosition = 0.8;
          config1.waveAnimateTime = 2000;
          config1.waveHeight = 0.3;
          config1.waveCount = 1;
          config1.displayPercent = false;
          config1.minValue = 50  // IMPORTANTE PARA QUE NO SE QUEDE VACIO
          
          var gauge2= loadLiquidFillGauge("fillgauge2", sumSwellHeight, config1);
          var config2 = liquidFillGaugeDefaultSettings();
          
          config2.textColor = "##FFFFF0";
          config2.circleColor = "#D4AB6A";
          config2.circleColor = "#D9D9D9";
          config2.displayPercent = false;
          config2.waveTextColor = "#04D9D9";
          config2.waveColor = "#04D9D9";
          config2.circleThickness = 0.2;
          config2.textVertPosition = 0.5;
          config2.waveAnimateTime = 1000;
          config2.maxValue = 0;
          
          
          var gauge3 = loadLiquidFillGauge("fillgauge3", sumSwellDirection, config2); // ALTURA DEL SWELL ESTO PARA ARRIBA
          var config3 = liquidFillGaugeDefaultSettings();
          config3.circleThickness = 0.15;
          config3.circleColor = "#D9D9D9";
          config3.textColor = "#0D0D0D";
          config3.waveTextColor = "#04D9D9";
          config3.waveColor = "#04D9D9";
          config3.textVertPosition = 0.8;
          config3.waveAnimateTime = 5000;
          config3.waveHeight = 0.15;
          config3.waveAnimate = true;
          config3.waveOffset = 0.25;
          config3.valueCountUp = false;
          config3.displayPercent = false;
          config3.minValue = 50            
          var gauge4 = loadLiquidFillGauge("fillgauge4", sumWaterTemperature, config3); //TEMPERATURA DEL AGUA
          var config4 = liquidFillGaugeDefaultSettings();
          
          
          config4.circleThickness = 0.4;
          config4.circleColor = "#D9D9D9";
          config4.textColor = "#0D0D0D";
          config4.waveTextColor = "#6DA398";
          config4.waveColor = "#246D5F";
          config4.textVertPosition = 0.52;
          config4.waveAnimateTime = 5000;
          config4.waveHeight = 0;
          config4.waveAnimate = false;
          config4.waveCount = 2;
          config4.waveOffset = 0.25;
          config4.textSize = 1.2;
          // config5.minValue = 30;
          config4.maxValue = 0
          config4.displayPercent = false;
          
          var gauge5 = loadLiquidFillGauge("fillgauge5", sumAirTemperature, config4);   // ALTURA DE LLA OLA ESTO PARA ARRIBA
          
        })
        .catch(err => console.log(err))
        let start
        let end
        let results = [0,1,2,3,4,5,6,7,8,9,10,11]
        let join = ''
        for (let i = 0; i < 12; i++ ){
        start = [ '2', '0', '1', '8', '-', '0', '1', '-', '1', '5' ]
        end = [ '2', '0', '1', '8', '-', '0', '1', '-', '1', '5' ]
        if ( i < 10){
        start[6] = (i).toString()
        end[6] = (i + 1).toString()
        }
        else if(i > 9){
          start[5] = '1'
          start[6] = (i - 10).toString()
          end[5] = '1'
          end[6] = (i + 1 - 10).toString()
        }
        start = start.join('').toString()
        end = end.join('').toString()
      
        fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&start=${start}&end=${end}&params=waveHeight`,{
          headers: 
          {
            'Authorization': '18c0a7e6-b502-11e9-91a6-0242ac130004-18c0a944-b502-11e9-91a6-0242ac130004'
          }
        })
        .then(response => response.json())
        .then(jsonData => results[i] = (jsonData.hours[0].waveHeight[0].value))
        .then(x=> console.log(results))
      }
        var markers = [];
        
        const addMarker = data => {
                    for (let i = 0; i < data.data.length; i++) {
                      var position = new google.maps.LatLng(
                        
                        );
                         }
                          }

                const myMarker = new google.maps.Marker({
                map: myMap,
                center: {lat: lat,lng: lng},
                zoom: 15,
                position: {lat: lat,lng: lng},
                title: 'yuh',
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'

                })
                myMap.setCenter({lat: lat,lng: lng})
            })     
        }
        
    
     }    

            



        
        



 

