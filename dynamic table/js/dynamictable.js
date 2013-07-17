var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._;
});

var app = angular.module('app', ['underscore']);


app.controller('ctrlr', function($scope, _){
	$scope.titulo = "Listado"
	$scope.option = "Listado de fechas"
	$scope.hrinicio = $scope.hrfin = "";
	$scope.paginas = []
	$scope.pagina = 1

	$scope.datos = [
		{fecha:"12/8/2013 - 12/9/2013",horas:[["12:00","13:00"],["12:12","13:00"],["12:21","13:34"]]},
		{fecha:"20/12/2013 - 12/9/2014",horas:[["12:00","13:00"]]},
		{fecha:"14/8/2013 - 14/9/2013",horas:[["12:00","13:00"]]},
		{fecha:"5/7/2013 - 12/7/2013",horas:[["12:00","13:00"]]}
	];

	$scope.gotoOption = function() {
		$scope.pagina = $scope.pagina == 1? 2:1
		$scope.option = $scope.pagina == 1? "Listado de fechas":"Inicio"
		$scope.titulo = "Listado"
	}

	$scope.eliminarFechaHora = function(fecha,hora){
		horas = _.where($scope.datos,{fecha:fecha})[0].horas
		horasNueva = _.reject(horas,function(horav){return horav[0] == hora[0] && horav[1] == hora[1]})
		if(horasNueva.length > 0){
			angular.forEach($scope.datos,function(dato){
				dato.horas = (dato.fecha == fecha)? horasNueva: dato.horas;
			});	
		}else{
			$scope.datos = _.filter($scope.datos,function(dato){return dato.fecha != fecha})
		}	
	}

	$scope.agregarHora = function(){
		if($scope.hrfin != $scope.hrinicio){
			angular.forEach($scope.datos, function(dato) {
		      if(dato.fecha == $scope.titulo){
		      	dato.horas.push([$scope.hrinicio,$scope.hrfin])
		      }
		    });
		    $scope.hrinicio = $scope.hrfin = "";
		    $scope.pagina = 1
		    $scope.titulo = "Listado"
		    $scope.option = "Listado de fechas"
		}
	}

	$scope.movePage = function() {
	   return {'left':  -($scope.pagina-1)*200+"px"}
	}

	$scope.agregarFecha = function(){
		if($scope.fechai != $scope.fechaf){
			fechai = moment($scope.fechai).format("D/M/YYYY")
			fechaf = moment($scope.fechaf).format("D/M/YYYY")
			fecha = fechai+" - "+fechaf
			if(!$scope.existeFecha(fecha)){
				$scope.datos.unshift({fecha:fecha,horas:[]})
			}
		}
		$scope.pagina = 2
	}

	$scope.next = function(title){
		$scope.titulo = title
		$scope.option = "Inicio"
		$scope.pagina ++
	}

	$scope.existeFecha = function(fecha){
		return _.where($scope.datos,{fecha:fecha}).length > 0
	}

}); 