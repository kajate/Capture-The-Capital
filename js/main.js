function initialize() {

  var mapOptions = {
    zoom: 3,
  };
  map = new google.maps.Map(document.getElementById('mapCanvas'),
      mapOptions);

  

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'This is you'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    handleNoGeolocation(false);
  }
}

var newStyle = [
  {
    "elementType": "labels.text.fill",
    "stylers": [
      { "invert_lightness": true },
      { "gamma": 0.01 },
      { "hue": "#e50000" }
    ]
  },{
    "elementType": "geometry",
    "stylers": [
      { "hue": "#00fff7" }
    ]
  },{
    "stylers": [
      { "gamma": 0.78 },
      { "visibility": "on" },
      { "invert_lightness": true }
    ]
  }
]


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'This is not where you are, right?';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
   map.setOptions({styles: newStyle});
   map.setCenter(options.position);
 
}

google.maps.event.addDomListener(window, 'load', initialize);
