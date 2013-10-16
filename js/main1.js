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

var MY_MAPTYPE_ID = 'custom_style';

function initialize(userPosition) {
  mapOnSite=false;
  var featureOpts = [
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
  ];

  var mapOptions = {
    zoom: 20,
    center: userPosition,
    disableDefaultUI: true,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  // userMarker = new google.maps.Marker({
  //   position: userPosition,
  //   map: map,
  //   icon: userMarkerImage 
  // });

for (var i = 0; i < coordinateArray.length; i++) {
      var data = coordinateArray[i]
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng (data.latitude, data.longitude),
          map: map
      });

  var styledMapOptions = {
    name: 'Custom Style'
  };

  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}
}



google.maps.event.addDomListener(window, 'load', initialize);