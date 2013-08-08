var labels = []
var rectangles = []
var map

function boundsFromPosition(LatLng,width,height){
  southWest = new google.maps.LatLng(LatLng.lat()-height, LatLng.lng()-width)
  northEast = new google.maps.LatLng(LatLng.lat()+height, LatLng.lng()+width)

  return new google.maps.LatLngBounds(southWest,northEast)
}

function attachEvent(elem){
  	google.maps.event.addListener(elem, 'click', function(){
  		rectangle = rectangles[elem.id - 1]
		if(rectangle.get('fillOpacity') === 0.5){
			rectangle.set('fillOpacity',0.25)
			rectangle.set('strokeWeight',2)
		}else{
			rectangle.set('fillOpacity',0.5)
			rectangle.set('strokeWeight',4)	
		}
	});  
}

function quitarLayers(){
	rectangles.forEach(function(rectangle){
		rectangle.set('fillOpacity',0)
		rectangle.set('strokeOpacity',0)
	})
	labels.forEach(function(label){
		label.set('fontSize',0)
	})
}

function mostrarLayers(){
	rectangles.forEach(function(rectangle){
		rectangle.set('fillOpacity',0.35)
		rectangle.set('strokeOpacity',0.25)
	})
	labels.forEach(function(label){
		label.set('fontSize',Math.pow(2,map.getZoom()-10))
	})
}

function initialize() {

  	map = new google.maps.Map(document.getElementById('map-canvas'), {
	    zoom: 13,
	    center: new google.maps.LatLng(-34.9129, -56.1714),
	    mapTypeId: google.maps.MapTypeId.TERRAIN
  	});

  	var z = 0
  	

	for(t=0;t<=8;t++){
		for(i=0;i<=24;i++){

        	var pos = new google.maps.LatLng(-34.84787930569766-t*0.01,-56.28046754455566+i*0.01)

      		mapLabel = new MapLabel({
	            text: 'Zona'+(++z),
	            position: new google.maps.LatLng(pos.lat()+0.001,pos.lng()),
	            map: map,
	            fontSize: Math.pow(2,map.getZoom()-10),
	            align: 'center'
          	});  

          	labels.push(mapLabel)

      		rectangle = new google.maps.Rectangle({
		        strokeColor: '#72092c',
		        strokeOpacity: 0.25,
		        strokeWeight: 2,
		        fillColor: '#09dba4',
		        fillOpacity: 0.25,
		        map: map,
		        id:z,
		        bounds: boundsFromPosition(pos,0.005,0.005)
        	});

        	rectangles.push(rectangle)

        	attachEvent(rectangle)
    	}
  	}

  	google.maps.event.addListener(map,'zoom_changed',function(){
  		labels.forEach(function(label){
  			label.set('fontSize', Math.pow(2,map.getZoom()-10));
  		})
  	})
}

google.maps.event.addDomListener(window, 'load', initialize);