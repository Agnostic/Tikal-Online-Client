/*!
* Tikal Online v0.1
* http://www.tikalonline.com
*
* Copyright 2012, Gilberto Avalos
*/

// Actualizar estado de HP
var chatOn = false;
var io;
var players = {};
var playersAcc = {};
var init = false;
var local_inventario;
var selected_target = 0;

now.ready(function() {
	console.log("NowJS Inicializado.");
});

var getStats = setInterval(function(){
	if(!init)
		return false;
	now.getStats();
}, 900);

now.updateStats = function(attr){
	$("#hp").css({"width": attr.hp_por+"%"});
	$("#hp_txt").html(attr.hp_txt);
	$("#mana").css({"width": attr.mana_por+"%"});
	$("#mana_txt").html(attr.mana_txt);
	$("#st_level").html(attr.level);
	$("#st_exp").html(attr.exp);
	$("#st_hp").html(attr.st_hp);
	$("#st_mana").html(attr.st_mana);
}

function msgBox(titulo, msg){
	$("#msgBox").html("<div class='tit_box'><b>"+titulo+"</b></div><div class='x'>x</div>"+msg);
	$("#msgBox").fadeIn('fast');
}

function login(){
	$("#login").fadeOut(1000, function(){
		msgBox("Connecting to Server", "Please wait...");
		now.loginUsuario({ u: $("#l_usuario").val(),  p: $("#l_password").val() });
	});
}

function loadPlayer(id){
	$(".msgBox").fadeOut('fast');
	now.loadPlayer(id);
}


$(document).ready(function(){
	
	/*** Chat ***/
	function enviarMsg(){
		if($("#chat_input").val() != ""){
			now.enviarMensaje($("#chat_input").val());
			$("#chat_input").val("");
		}
		$("#chat_input").blur();
	}
	
	// Login
	$("#entrar").livequery("click", function(){
		login();
	});
	
	$( ".msgBox" ).draggable({"handle": ".tit_box"});
	$('#panel button').animate({ opacity: 0.50 }, 200);
	
	$(".x").livequery("click", function(){
		if(!init)
			$("#login").fadeIn('fast');
		$(this).parent().fadeOut('fast');
	});
	
	// Panel
	$("#btn_stats").click(function(){
		$("#stats").fadeToggle('fast');
	});
	$("#btn_inv").click(function(){
		$("#inventory").fadeToggle('fast');
	});
	$("#btn_options").click(function(){
		$("#options").fadeToggle('fast');
	});
	$("#btn_online").click(function(){
		$("#u_online").fadeToggle('fast');
	});
	$("#btn_help").click(function(){
		$("#help").fadeToggle('fast');
	});
	
	$("#chat_input").livequery("click", function(){
		chatOn = true;
	});			
	
	$("#enviar").livequery("click", function(){
		enviarMsg();
	});
	
	// Recibir respuesta de login
	now.loggedOn = function (data) {
		if(data.l == 1){
			msgBox("Login", data.m);
			$(".msgBox").fadeOut('fast');
			$("#register").fadeOut(500);
			jsApp.onload();
			init = true;
		} else if (data.l == 0) {
			msgBox("Login", data.m);
		} else {
			msgBox("Sorry...", "Couldn't connect to server.");
			$("#l_usuario").focus();
		}
		
	};

	$("#lang").change(function(){
		localStorage.setItem("lang",$("#lang").val());
		loadLang();
	});
	
	$("#chat").mouseenter(function(){
		$('#chat').animate({ opacity: 1 }, 200);
	});
	
	$("#chat").mouseout(function(){
		if(!chatOn)
			$('#chat').animate({ opacity: 0.50 }, 200);
	});
	
	$("#panel button").mouseenter(function(){
		$(this).animate({ opacity: 1 }, 200);
	});
	
	$("#panel button").mouseout(function(){
		$(this).animate({ opacity: 0.50 }, 200);
	});

	// Inputs
	$(document).keypress(function(e) {
		if (init){
			if (e.keyCode == 13){
					if(chatOn){
						enviarMsg();
						chatOn = false;
						$('#chat').animate({ opacity: 0.50 }, 200);
						me.input.bindKey(me.input.KEY.X, "action");
					} else {
						chatOn = true;
						me.input.unbindKey(me.input.KEY.X);
						$('#chat').animate({ opacity: 1 }, 200);
						$("#chat_input").focus();
					}
			} else if (e.charCode == 111) {
				if(!chatOn)
					$("#u_online").fadeToggle('fast');
			} else if (e.charCode == 99) {
				if(!chatOn)
					$("#attackPanel").fadeToggle('fast');
			} else if (e.charCode == 112) {
				if(!chatOn)
					$("#stats").fadeToggle('fast');
			} else if (e.charCode == 105) {
				if(!chatOn)
					$("#inventory").fadeToggle('fast');
			} else {
				if(!chatOn)
					$("#fix").focus();
			}
		} else {
			if (e.keyCode == 13){
				login();
			}
		}
	});

	// Un usuario se conecta
	now.u_online = function(data) {
		$('#u_online').html("<div class='tit_box'>Players Online</div><div class='x'>x</div>");
		$.each(data, function(key, value) {
			$('#u_online').append("<div>" + value.nick + "</div>");
		});
	};
	
	now.selectPlayers = function(data){
		$("#selectPlayers_").html("");
		var i = 0;
		$.each(data, function(key, value) {
			$('#select_players').append("<div>" + key + "</div>");
			if(typeof(value.nick) != 'undefined'){
				playersAcc[i] = value;
				$("#selectPlayers_").append("<div class='sel_player' onclick='loadPlayer("+value.id+")'>"+value.nick+"</div>");
				i++;
			}
		});
		$(".msgBox").fadeOut('fast', function(){
			$("#selectPlayers").fadeIn('fast');
		});
		
	};
	
	// Logout
	$(window).unload(logOut());
	
	function logOut(){
		if(init)
			location.reload(true);
	}
	
	now.core.on('disconnect', function() { 
		if(init){
    		alert("You have been disconnected from the server!");
			location.reload(true);
		}
    }); 

	// Recibir mensaje
	now.nuevoMensaje = function(data){
		$("#c_msgs").append(data);
		$("#c_msgs").animate({ scrollTop: document.getElementById("c_msgs").scrollHeight }, 1000);
	};

	now.cargarInventario = function(inventario){
		var i = 1;
		
		while(i <= 16) {
			if(typeof(inventario[i].item) != 'undefined' && inventario[i].item != "")
				$("#slot_"+i).html("<div class='item i"+inventario[i].item+"' rel='"+inventario[i].item+"'><div class='item_cant'>"+inventario[i].cantidad+"</div>");
			i++;
		}
		local_inventario = inventario;
		$(".item").draggable({ revert: "invalid" });
	};

	$(window).resize(function() {
		$('canvas').attr("width", $("body").width());
		$('canvas').attr("height", $("body").height());
	});

	$(".target_name").live("click", function(){
		$(this).toggleClass("selected");
		if(selected_target > 0)
			$("#target_"+selected_target).removeClass("selected");

		if(selected_target == $(this).attr("rel")){
			selected_target = 0;
			console.log(selected_target);
		} else {
			selected_target = $(this).attr("rel");
			console.log("Seleccionado: "+selected_target);
		}
	});	

	$(".target_name").live("hover", function(){
		mobs[$(this).attr("rel")].flicker(50);
	});

});


