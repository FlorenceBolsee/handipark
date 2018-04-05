var roundMarker = {
  path: 'M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0',
  fillColor: 'tomato',
  fillOpacity: 1.0, 
  scale: 2,
  strokeWeight: 0
}

var markerPos = {
  lat: 50.8469571,
  lng: 4.4582605
}

var marker;

var map;

function initMap() {
    var center = {
      lat: 50.8469571,
      lng: 4.4582605
    };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: center,
      gestureHandling: 'cooperative',
    });
    var infowindow = new google.maps.InfoWindow();
}

function createMarker(latlng, name){
  marker = new google.maps.Marker({
    position: latlng,
    map: map,
    icon: name
  });
}

var markersList = [];

var markersAjaxCall = $.getJSON("https://handikapapp.azurewebsites.net/api/RData", function() {
  console.log( "success" );
})
  .done(function(data) {
    markersList = data;
    initMap();
    $.each(markersList, function(){
      if(this.Available){
        roundMarker.fillColor = 'limegreen';
      }
      markerPos.lat = parseFloat(this.Latitude);
      markerPos.lng = parseFloat(this.Longitude);

      createMarker(markerPos, roundMarker);
    });
  })
  .fail(function() {
    console.log( "fail" );
  })
  .always(function() {
    console.log( "complete" );
  });


