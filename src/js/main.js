var roundMarker = {
  path: 'M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0',
  fillColor: 'tomato',
  fillOpacity: 1.0, 
  scale: 1.5,
  strokeWeight: 0
}

var markerPos = {
  lat: 50.8488051,
  lng: 4.4045959
}

var marker;

var markers = [];

var map;

var z;

function initMap() {
    var center = {
      lat: 50.8488051,
      lng: 4.4045959
    };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: center,
      gestureHandling: 'cooperative',
      clickableIcons: false
    });
    google.maps.event.addListener(map, 'zoom_changed', function() {
      z = map.getZoom();
    });
}

function createMarker(latlng, name){
  marker = new google.maps.Marker({
    position: latlng,
    map: map,
    icon: name
  });
  markers.push(marker);
  marker.addListener('click', function() {
    if(this.getMap() != null){
      if(z > 12){
        map.setZoom(12);
        map.setCenter({lat: 50.8488051, lng: 4.4045959});
      } else {
        map.setZoom(15);
        map.setCenter(this.getPosition());
      }
    }
  });
}

var markersList = [];

var i;

var clusterStyles = [
  {
    textColor: 'white',
    url: '../img/cluster-small.svg',
    height: 50,
    width: 50,
    backgroundPosition: 'center center'
  },
  {
    textColor: 'white',
    url: '../img/cluster-medium.svg',
    height: 70,
    width: 70,
    backgroundPosition: 'center center'
  },
  {
    textColor: 'white',
    url: '../img/cluster-large.svg',
    height: 90,
    width: 90,
    backgroundPosition: 'center center'
  }
]

var mcOptions = {
  gridSize: 50,
  styles: clusterStyles,
  maxZoom: 15
};

var markersAjaxCall = new Vue({
  el: 'header',
  mounted(){
  	axios.get("https://handikapapp.azurewebsites.net/api/RData")
    .then(response => {
      markersList = response.data;
      console.log(markersList);
      initMap();
      for (i = 0; i < markersList.length; i++){
        if(markersList[i].Available === 0){
          console.log('not available');
          roundMarker.fillColor = 'limegreen';
        } else {
          console.log('available');
          roundMarker.fillColor = 'tomato';
        }
        markerPos.lat = parseFloat(markersList[i].Latitude);
        markerPos.lng = parseFloat(markersList[i].Longitude);
          
        createMarker(markerPos, roundMarker);
      }

      var markerCluster = new MarkerClusterer(map, markers, mcOptions);

    })
    .catch(() => {
    	alert("error");
    })
  }
});

var form = new Vue({
  el: '#form',
  data: {
    search: 'Complexe Sportif Poseidon',
    latitude: '',
    longitude: '',
    active: true,
    message: ''
  },
  watch: {
    search: function() {
      this.latitude = '';
      this.longitude = '';
      this.active = true;
      if (this.search.length >= 3) {
        this.active = false;
        this.lookupCoordinates();
      }
    }
  },
  methods: {
    lookupCoordinates: _.debounce(function() {
      var app = this;
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + app.search)
            .then(function (response) {
              app.latitude = response.data.results[0].geometry.location.lat;
              app.longitude = response.data.results[0].geometry.location.lng;
              map.setZoom(15);
              map.setCenter({lat: app.latitude, lng: app.longitude});
            })
            .catch(function (error) {
              app.message = "Invalid place";
            })
    }, 500)
  }
});

