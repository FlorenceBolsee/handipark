function initMap() {
    var center = {
      lat: 50.8469571,
      lng: 4.4582605
    };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: center,
      gestureHandling: 'cooperative',
    });
    var iconBase = '../img/pin.png';
    var marker = new google.maps.Marker({
      position: center,
      map: map,
      icon: iconBase
    });
    marker.setAnimation(google.maps.Animation.DROP);
  }