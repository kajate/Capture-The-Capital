var invalidUser=['bajs','kiss','fitta','kuk','slida','anus','slidor','slidan','fittan','kuken','anusen','kukar','666',''];

    var myUserRef = null;
    var randName;
         
    var myDataRef = new Firebase('https://leastflyingwasps.firebaseio.com/users');
    var userName = localStorage.getItem('userName');
    var userID = localStorage.getItem('userID');
    if (userName) {
       // do something
       myUserRef = new Firebase('https://leastflyingwasps.firebaseio.com/users/' + userID);
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
    var flagLatLng;



    var flagAreas = [

      [59.299101, 17.992298],
      [59.299113, 17.996203],
      [59.299782, 17.994318],
      [59.297996, 17.991486],
      [59.299018, 17.992284],
      [59.299245, 17.994092],
      [59.298957, 17.991045],
      [59.298856, 17.992306],
      [59.298412, 17.992349]
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
        alert("You captured the flag! GREAT STUFF")
        window.location.replace("http://karlp.se/stuff/capture/location.html");

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
          flagFlag();
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



      
        }
  function flagFlag() {
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
      localStorage.setItem("userName", userName);
      myUserRef = myDataRef.push({ name: userName });
      localStorage.setItem("userID", myUserRef.name());
      return randName;
}

var userMarkers = {};

myDataRef.on("value", function(snapshot) {
  var users = snapshot.val();
  for (id in users) {
    var user = users[id];
    var userMarker = userMarkers[id];
    var position = new google.maps.LatLng(user.latitude, user.longitude);
    if (!userMarker) {
      userMarker = new google.maps.Marker({
        position: position,
        map: map,
        icon: "images/jogging.png"
      });
      userMarkers[id] = userMarker;
    } else {
      userMarker.setPosition(position);
    }
  }
});
