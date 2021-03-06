window.onload = () =>
{
  var markers = [];
  var chartMarkers = [];

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
            })

            const addMarker = data => {
      
              for (let i = 0; i < data.data.results.length; i++) {
                var position = new google.maps.LatLng(
                 
                  data.data.results[i].geometry.location.lat,
                  data.data.results[i].geometry.location.lng
                );
              
              var myMarker = new google.maps.Marker({
              map: myMap,
              // center: {lat: lat,lng: lng},
              zoom: 15,
              position: position,
              title: 'yuh',
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'

              })
              markers.push(myMarker);
            }
          };
  const setMapOnAll = map => {
    for (var i = 0; i < markers.length; i++) {
    console.log(markers[i]);
      markers[i].setMap(map);
    }
  };
// Removes the markers from the map, but keeps them in the array.
            const clearMarkers = () => {
            setMapOnAll(null);
            };
// Shows any markers currently in the array.
            const showMarkers = () => {
            setMapOnAll(map);
              };
// Deletes all markers in the array by removing references to them.
                const deleteMarkers = () => {
                clearMarkers();
                 markers = [];
                   };



                  // const infoExtract = (array,) => {
                  // let sum = 0
                  // array.forEach(elm => (sum += elm.value))
                  // sum = parseFloat(sum / array.length).toFixed(2)
                  // }



    document.getElementById("submit-address").onclick = (e) => {    
      e.preventDefault()
      deleteMarkers()
      // function clearOverlays() {
      //   for (var i = 0; i < markersArray.length; i++ ) {
      //     markersArray[i].setMap(null);
      //   }
      //   markersArray.length = 0;
      // }
      // clearOverlays();
     
  
       let quitar = document.getElementsByClassName("quitar")
       for (let i = 0; i < quitar.length; i++){
           quitar[i].classList.remove("quitar")
       }

        let address = document.getElementById('address-input').value
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM`)
        .then(response => {
          addMarker(response)
          setMapOnAll(myMap)
            
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
                  



                  //--------------------------------PARAMS CHARTS BEGINS------------------------------------------------
                  
                  var gauge1 = loadLiquidFillGauge("fillgauge1", sumWaveHeight, config1);
                  var config1 = liquidFillGaugeDefaultSettings();
                  
                  
                  config1.circleColor = "#D4AB6A";
                  config1.circleColor = "#D9D9D9";
                  config1.textColor = "##0D0D0D";
                  config1.waveTextColor = "#04D9D9";
                  config1.waveColor = "#04D9D9";
                  config1.circleThickness = 0.1;
                  config1.circleFillGap = 0.2;
                  config1.textVertPosition = .5;
                  config1.waveAnimateTime = 2000;
                  config1.waveHeight = 0.5;
                  config1.waveCount = 1;
                  config1.displayPercent = false;
                  config1.minValue = 50  // IMPORTANTE PARA QUE NO SE QUEDE VACIO
                  config1.waveTextColor = "#FFFFF"
                  
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
                  config3.textVertPosition = .5;
                  config3.waveAnimateTime = 5000;
                  config3.waveHeight = 0.15;
                  config3.waveAnimate = true;
                  config3.waveOffset = 0.25;
                  config3.valueCountUp = false;
                  config3.displayPercent = false;
                  config3.minValue = 50   ;
                  config3.waveTextColor = "#FFFFF"         
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
                  
                  //----------------------------------------------------- WAVE HEIGHT CHART BEGINS----------------------
                  // Themes begin
                  
                  //----------------------------------------------WAVE HEIGHT CHART-------------------------------
                })
                
                let start
                let end
                let results = [0,1,2,3,4,5,6,7,8,9,10,11]
                let join = ''
                for (let i = 1; i < 12; i++ ){
                  start = [ '2', '0', '1', '8', '-', '0', '1', '-', '1', '5' ]
                  end = [ '2', '0', '1', '8', '-', '0', '2', '-', '1', '5' ]
                  if ( i < 9){
                    start[6] = (i).toString()
                    end[6] = (i + 1).toString()
                  }
                  else if (i == 9){
                    start[6] = (i).toString()
                    end[5] = '1'
                    end[6] = (i - 9).toString()
                  }
                  else if(i > 9 && i < 11 ){
                    start[5] = '1'
                    start[6] = (i - 10).toString()
                    end[5] = '1'
                    end[6] = (i-9).toString()
                  }
                  else if (i == 11){
                    start[5] = '1'
                    start[6] = '2'
                    end[5] = '0'
                    end[6] = '1'
                    end[3] = '9'
                  }
                  start = start.join('').toString()
                  end = end.join('').toString()
                  let param = document.getElementById('chart-info').value
                  fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&start=${start}&end=${end}&params=${param}`,{
                    headers: 
                    {
                   'Authorization': '18c0a7e6-b502-11e9-91a6-0242ac130004-18c0a944-b502-11e9-91a6-0242ac130004'
                    }
                  })
                  .then(response => response.json())
                  .then(jsonData => {
                    if(param == 'waveHeight') {
                      console.log((jsonData.hours[0].waveHeight[0].value))
                      results[i] = (jsonData.hours[0].waveHeight[0].value)
                    }
                    else if(param =='swellHeight') results[i] = (jsonData.hours[0].swellHeight[0].value)
                    else if(param =='airTemperature') results[i] = (jsonData.hours[0].airTemperature[0].value)
                    else if(param =='waterTemperature') results[i] = (jsonData.hours[0].waterTemperature[0].value)
                  
                  })
                  .then(x=> 
                    {
                      am4core.useTheme(am4themes_animated);
                      var chart = am4core.create("chartdiv", am4charts.XYChart);
                      chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
                      chart.data = [{"month": "Jan","value": (results[1]+results[11])/2}, {"month": "Feb", "value": results[1]}, { "month": "Mar","value": results[2]}, {"month": "Apr",  "value": results[3]}, {  "month": "May",  "value": results[4]}, {  "month": "Jun",  "value": results[5]}, {  "month": "Jul",  "value": results[6]}, {  "month": "Aug",  "value": results[7]}, {  "month": "Sep",  "value": results[8]}, {  "month": "Oct",  "value": results[9]}, {  "month": "Nov",  "value": results[10]}, {  "month": "Dic",  "value": results[11]}];
                      
                      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                      categoryAxis.renderer.grid.template.location = 0;
                      categoryAxis.dataFields.category = "month";
                      categoryAxis.renderer.minGridDistance = 40;
                      
                      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                      
                      var series = chart.series.push(new am4charts.CurvedColumnSeries());
                      series.dataFields.categoryX = "month";
                      series.dataFields.valueY = "value";
                      series.tooltipText = "{valueY.value}"
                      series.columns.template.strokeOpacity = 0;
                      
                      series.columns.template.fillOpacity = 0.75;
                      
                      var hoverState = series.columns.template.states.create("hover");
                      hoverState.properties.fillOpacity = 1;
                      hoverState.properties.tension = 0.4;
                      
                      chart.cursor = new am4charts.XYCursor();
                      
                      series.columns.template.adapter.add("fill", function(fill, target) {return chart.colors.getIndex(target.dataItem.index)})
                      
                      chart.scrollbarX = new am4core.Scrollbar();
                    }) 
                    var markers = [];
                    const myLocation = {
                      lat,
                      lng
                  }
                  // map.setCenter(myMarker),
                  // map.setZoom(8);
                  // myMap.setCenter(myMarker)
                
             
      // Removes the markers from the map, but keeps them in the array.
             
                        }
                      
                    console.log(results)
                  })
                    .catch(err => console.log(err))
        
    
     }
      

            
}


        
        



 

