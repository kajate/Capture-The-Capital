var map;

function initialize() {

  var mapOptions = {
    zoom: 13,
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'This is You'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

var styles = [
  {
    "elementType": "labels.text.fill",
    "stylers": [
      { "invert_lightness": true },
      { "gamma": 0.01 },
      { "hue": "#e500ff" }
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
  map.setCenter(options.position);
  map.setOptions({styles: styles});
}

google.maps.event.addDomListener(window, 'load', initialize);
