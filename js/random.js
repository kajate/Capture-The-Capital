var invalidUser=['bajs','kiss','fitta','kuk','slida','anus','slidor','slidan','fittan','kuken','anusen','kukar','666',''];

    var myUserRef = null;
    var randName;
         
    var myDataRef = new Firebase('https://leastflyingwasps.firebaseio.com/users');
    var userName = localStorage.getItem('userName');
    if (userName) {
       // do something
    } 
    else {
      // generate a user name.
      generateUser();
    }

    $('#userName').keypress(function (e) {
     if (e.keyCode == 13) {
        var name = $('#userName').val();

        if ($.inArray(name, invalidUser) != -1) {
            alert('Not a valid username')
        }
        else {
            var myDataRef = new Firebase('https://leastflyingwasps.firebaseio.com/');
            myDataRef.push({ name: name });
           
           localStorage.setItem('userName', name);
        }
        var userName = localStorage.getItem('userName');
        document.write('your username is: ' + userName);
      }
    });

    var map;
    var random;
    var distance;
    var myPosition;
    var position;
    var distance;
    var pos1;
    var pos2;
    var myMarker; 
    var flagMarker;
    var flagPosition;



    var flagAreas = [

      [59.2967322, 18.0009393],
      [59.2980245, 17.9971503],
      [59.2981078, 17.9980875],
      [59.2982762, 17.9970823],
      [59.2987638, 17.9917639],
      [59.2987649, 17.9917824],
      [59.2987847, 17.9917731],
      [59.2988498, 17.991684],
      [59.2988503, 17.9981593],
      [59.3008233, 18.0041763],
      [59.3014033, 18.0068793],
      [59.3016619, 18.0137766]
    ];

    var random = flagAreas.sort(function() {
    return Math.random() - 0.5 })[0];


    function updatePosition(position) {
      myPosition = new google.maps.LatLng(position.coords.latitude,
                                                position.coords.longitude);
      var distance = getDistance(position.coords.latitude, position.coords.longitude, flagAreas[0][0], flagAreas[0][1]);
      console.log(distance);
      myMarker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      // update the position in firebase
      if (myUserRef) {
        myUserRef.child("latitude").set(position.coords.latitude);
        myUserRef.child("longitude").set(position.coords.longitude);
      }
      if (distance < 50) {
        function clearMarkers() {
  setAllMap(null);
}
        alert("YOU CAPTURED THE MAP");
        var flagPosition = new google.maps.LatLng(random[0], random[1]);
        console.log("Rövsmör");
        console.log(flagPosition)

        
    }
  }

    function initialize() {
        
        //here is the starting for the map, where it will begin to show
        var latlng = new google.maps.LatLng(59.2982762, 17.9970823);

        var myOptions = {
          zoom: 15,
          center: latlng,
          panControl: false,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: true,
          scrollwheel: true,
          navigationControl: false,
          streetViewControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

          map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

        //geolocation

        if (navigator.geolocation) {
         //   navigator.geolocation.getCurrentPosition(function(position) {
         //   myPosition = new google.maps.LatLng(position.coords.latitude,
           //                                     position.coords.longitude);

                  //var pos1 = position.coords.latitude;
                  //var pos2 = position.coords.longitude;
                  //console.log(pos1 + ' and ' + pos2);
          
          myMarker = new google.maps.Marker({
            position: new google.maps.LatLng(0,0),
            map: map,
            icon: "images/jogging.png"

          });

          navigator.geolocation.watchPosition(updatePosition);

         //  var infowindow = new google.maps.InfoWindow({
         //    map: map,
         //    position: myPosition,
         //    content: "You are here"
         //  });
            
         //   map.setCenter(myPosition);
         // },  function() {
         //   handleNoGeolocation(true);
         //  });
        }

          else {
          handleNoGeolocation(false);
        }

          function handleNoGeolocation(errorflag) {
          if (errorflag) {
            alert('Geolocation not supported');
            myPosition = latlng;
          }

          else {
            alert('Could not find your location');
            myPosition = latlng;
          };

          var infowindow = new google.maps.InfoWindow(options);
          map.setCenter(options, position);
        }

        //stop geolocation

        //start random markers/flags



        var flagLatLng = new google.maps.LatLng(random[0], random[1]);
        var flagMarker = new google.maps.Marker({
              position: flagLatLng,
              map: map,
              icon: "images/flagsmall.png",
              draggable: false,
              animation: google.maps.Animation.DROP

            });
        }

        window.onload = initialize;

        //code to calcute
 if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }

}
 
 function getDistance(lat1,lon1,lat2,lon2) {
 
    var lat1 = parseFloat(lat1);
    var lat2 = parseFloat(lat2);
    var lon1 = parseFloat(lon1);
    var lon2 = parseFloat(lon2);
    var R = 6371000; // meters
    var dLat = (lat2-lat1).toRad();
    var dLon = (lon2-lon1).toRad(); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
}

function generateUser() {
      var r = Math.floor(Math.random() * 20) + 1
      var randName = ['berra', 'maddo', 'morsan', 'thompa', 'erick', 'ralle', 'bernte', 
      'bull', 'bulan', 'sulan', 'koppen', 'pickan', 'karlsson', 'sjuan', 'muffe', 'georg', 'maggan', 'basse', 'goran', 'stanley']
      userName = randName[r];
      console.log(userName)
      localStorage.setItem("userName", userName);
      myUserRef = myDataRef.push({ name: userName });
      localStorage.setItem("userID", myUserRef.name());
      return randName;
}
