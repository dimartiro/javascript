var poly;
var map;

function initialize() {
  var chicago = new google.maps.LatLng(41.879535, -87.624333);
  var mapOptions = {
    zoom: 7,
    center: chicago,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var polyOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  }
  poly = new google.maps.Polyline(polyOptions);
  poly.setMap(map);

  google.maps.event.addListener(map, 'click', addLatLng);
}


function addLatLng(event) {

  var path = poly.getPath();

  path.push(event.latLng);

  $scope.pathPoints = path.b
  $scope.$apply()


  var marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + path.getLength(),
    map: map
  });

}

google.maps.event.addDomListener(window, 'load', initialize);


function ctrl($scope){
  window.$scope = $scope
  $scope.pathPoints = []

  $scope.generateCode = function(){

    code = "varName = [ \n"
    
    angular.forEach($scope.pathPoints, function(point,i) {
      code += "new google.maps.LatLng("+point.mb+","+point.nb+")"
      if(i<$scope.pathPoints.length -1)
        code += ","
      code+="\n"
    });

    code +="];"

    $scope.code = code
  }
}