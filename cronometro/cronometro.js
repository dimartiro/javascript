$(document).on("ready",estableceracciones)


function construir(){
	$mili = $("#mili")
	$secondl = $("#secondl")
	$secondh = $("#secondh")
	$minl = $("#minl")
	$minh = $("#minh")
}

function setearvalores(){
	$mili = ""
	$secondl = ""
	$secondh = ""
	$minl = ""
	$minh = ""
	intervalid = 0
	iniciado = false
}

function estableceracciones(){
	construir()
	$("#iniciar-detener").on("click",iniciardetener)
	$("#resetear").on("click",resetearcronometro)
}

function iniciardetener(){
	if(iniciado)
		detenercronometro();
	else
		iniciarcronometro();
	iniciado = !iniciado
}


function iniciarcronometro(){
	intervalid = setInterval(avanzarmili,100)
	$("#iniciar-detener").html("Detener")
}

function detenercronometro(){
	clearInterval(intervalid)
	iniciado = false
	$("#iniciar-detener").html("Iniciar")
}

function resetearcronometro(){
	detenercronometro();
	$("#mili,#secondl,#secondh,#minl,#minh").html(0)
}

function avanzarmili(){
	mili = parseInt($mili.html()) + 1
	if(mili <= 10)
		$mili.html(mili);
	else{
		avanzarsegl();
		$mili.html(0);
	}
	
}

function avanzarsegl(){
	efectonum($secondl)
	segundos = parseInt($secondl.html()) + 1
	if(segundos < 10)
		$secondl.html(segundos);
	else{
		avanzarsegh();
		$secondl.html(0);
	}
}

function avanzarsegh(){
	efectonum($secondh)
	segundos = parseInt($secondh.html()) + 1
	if(segundos < 6)
		$secondh.html(segundos);
	else{
		avanzarminl();
		$secondh.html(0);
		$secondl.html(0);
	}
}

function avanzarminl(){
	efectonum($minl)
	min = parseInt($minl.html()) + 1
	if(min < 10)
		$minl.html(min);
	else{
		avanzarminh();
		$minl.html(0);
	}
}

function avanzarminh(){
	efectonum($minh)
	min = parseInt($minh.html()) + 1
	if(min < 6)
		$minh.html(min);
}

function efectonum(elem){

	id = Math.round(Math.random()*1000)

	$("#cronometro").append('<span class="aux" id='+id+'></span>')
	$aux = $("#"+id)
	$aux.html(elem.html())
	left = elem.position().left

	$aux.css({"left":left,"top":80})
	 
	$aux.animate({"font-size":"+=300",top:"-=150",left:"-=80",opacity:"0"},500,function(){
		$(this).remove();
	})
}
