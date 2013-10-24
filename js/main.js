function initialize() {

  var mapOptions = {
    zoom: 13,
    disableDefaultUI: true,
  };
  map = new google.maps.Map(document.getElementById('mapCanvas'),
      mapOptions);

  var center;
function calculateCenter() {
  center = map.getCenter();
}
google.maps.event.addDomListener(map, 'idle', function() {
  calculateCenter();
});
google.maps.event.addDomListener(window, 'resize', function() {
  map.setCenter(center);
}); //Keeps the content centered



  

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
      { "invert_lightness": false },
      { "gamma": 0.71 },
      { "hue": "#000" }
    ]
  },{
    "elementType": "geometry",
    "stylers": [
      { "hue": "#FFFFB8" }
    ]
  },{
    "stylers": [
      { "gamma": 0.78 },
      { "visibility": "on" },
      { "invert_lightness": false }
    ]
  }
]


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: Could not define your geolocation';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(59.326640, 18),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
   map.setOptions({styles: newStyle});
   map.setCenter(options.position);
 
}

google.maps.event.addDomListener(window, 'load', initialize);
