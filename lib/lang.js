/*!
* Tikal Online v0.1
* http://www.tikalonline.com
*
* Copyright 2012, Gilberto Avalos
*/

function loadLang(){
	if(localStorage.getItem("lang") && localStorage.getItem("lang") == "es"){
		$(".lang_options").html("Opciones");
		$(".lang_lang").html("Idioma");
		$(".lang_logout").html("Desconectarse");
		$(".lang_login").html("Entrar");
		$(".lang_nacc").html("Nueva Cuenta");
		$(".lang_char_sel").html("Seleccionar Personaje");
		$(".lang_charinfo").html("Personaje");
		$(".lang_unlineb").html("Usuarios Conectados");
		$(".lang_inventory").html("Inventario");
		$(".lang_help").html("Ayuda");
		$(".lang_close").html("Cerrar");
		$(".lang_send").html("Enviar");
		$(".lang_level").html("Nivel");
		$(".lang_exp").html("Experiencia");
		$(".lang_hp").html("PV");
		$(".lang_mana").html("Mana");
		$(".lang_options").html("Opciones");
		$(".lang_voc").html("Vocaci&oacute;n");
		
	} else {
		localStorage.setItem("lang","");
		location.reload(true);
	}
}