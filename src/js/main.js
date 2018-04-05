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

var markers = [];

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
  markers.push(marker);
}

var markersList = [];

var i;

var clusterStyles = [
  {
    textColor: 'white',
    url: 'http://www.icon100.com/up/4025/128/Group-Cluster-128.png',
    height: 128,
    width: 128,
    backgroundPosition: 'center center'
  },
  {
    textColor: 'white',
    url: 'http://www.icon100.com/up/4025/128/Group-Cluster-128.png',
    height: 128,
    width: 128,
    backgroundPosition: 'center center'
  },
  {
    textColor: 'white',
    url: 'http://www.icon100.com/up/4025/128/Group-Cluster-128.png',
    height: 128,
    width: 128,
    backgroundPosition: 'center center'
  }
]

var mcOptions = {
  gridSize: 50,
  styles: clusterStyles,
  maxZoom: 15
};

var markersAjaxCall = new Vue({
  el: 'main',
  mounted(){
  	axios.get("https://handikapapp.azurewebsites.net/api/RData")
    .then(response => {
      markersList = response.data;
      initMap();
      for (i = 0; i < markersList.length; i++){
        if(markersList[i].Available){
          roundMarker.fillColor = 'limegreen';
        }
        markerPos.lat = parseFloat(markersList[i].Latitude);
        markerPos.lng = parseFloat(markersList[i].Longitude);
          
        createMarker(markerPos, roundMarker);
      }
      console.log(markers);
      var markerCluster = new MarkerClusterer(map, markers, mcOptions);

    })
    .catch(() => {
    	alert("error");
    })
  }
});


