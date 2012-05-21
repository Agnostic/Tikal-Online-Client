/*!
 * 
 *   Tikal Online
 *   http://www.tikalonline.com/
 *		
 *   By Gilberto Avalos
 *
 **/

// game resources
var g_resources= [{
	name: "bosque",
	type: "image",
	src: "data/sprite/bosque.png",
},{
	name: "piramides",
	type: "image",
	src: "data/sprite/piramides.png",
},{
	name: "metatiles32x32",
	type: "image",
	src: "data/area01_tileset/metatiles32x32.png",
},{
	name: "chest2",
	type: "image",
	src: "data/sprite/items/chest2.png",
},{
	name: "tikal",
	type: "tmx",
	src: "data/tikal.tmx"
},{
	name: "c1",
	type: "image",
	src: "data/sprite/char/c1.png"
},{
	name: "c2",
	type: "image",
	src: "data/sprite/char/c2.png"
},{
	name: "c3",
	type: "image",
	src: "data/sprite/char/c3.png"
},{
	name: "c4",
	type: "image",
	src: "data/sprite/char/c4.png"
},{
	name: "c5",
	type: "image",
	src: "data/sprite/char/c5.png"
},{
	name: "c6",
	type: "image",
	src: "data/sprite/char/c6.png"
},{
	name: "c7",
	type: "image",
	src: "data/sprite/char/c7.png"
},{
	name: "c8",
	type: "image",
	src: "data/sprite/char/c8.png"
},{
	name: "c9",
	type: "image",
	src: "data/sprite/char/c9.png"
},{
	name: "c10",
	type: "image",
	src: "data/sprite/char/c10.png"
},{
	name: "c11",
	type: "image",
	src: "data/sprite/char/c11.png"
},{
	name: "c12",
	type: "image",
	src: "data/sprite/char/c12.png"
},{
	name: "c13",
	type: "image",
	src: "data/sprite/char/c13.png"
},{
	name: "c14",
	type: "image",
	src: "data/sprite/char/c14.png"
},{
	name: "c15",
	type: "image",
	src: "data/sprite/char/c15.png"
},{
	name: "c16",
	type: "image",
	src: "data/sprite/char/c16.png"
},{
	name: "i1",
	type: "image",
	src: "data/sprite/items/i1.png"
},{
	name: "dwarf",
	type: "image",
	src: "data/sprite/mobs/dwarf.png"
}];

var mobs = {};
var npcOn = false;

var jsApp	= 
{	
	
	onload: function(){
		
		// init the video
		if (!me.video.init('jsapp', 800, 600, false, 1.0)){
			alert("Sorry but your browser does not support html 5 canvas.");
         return;
		}

		me.state.pause = function () {};
        me.state.resume = function () {};

		// initialize the "audio"
		me.audio.init("mp3,ogg");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(g_resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},
	
	loaded: function (){
		me.state.set(me.state.PLAY, new TikalClient());
		
		// Agregar LocalPlayer
		me.entityPool.add("mainPlayer", LocalPlayer);
		me.entityPool.add("quest", quest);
		$('#chat').animate({ opacity: 0.50 }, 200);
		$('#panel').fadeIn("slow");
		$("#chat").fadeIn('slow');
		$(".st_contenedor").fadeIn('slow');
		
		// Input
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.X, "action");
		npcOn = true;
		now.player.ready = true;
		now.getPlayers();

		//me.debug.renderHitBox = true;
      	me.state.change(me.state.PLAY);
	}
	

};

/* the in game stuff */
var TikalClient = me.ScreenObject.extend(
{

   onResetEvent: function(){
	   
      me.levelDirector.loadLevel("tikal");
      
      // Ordenar elementos
      me.game.sort();
	},
	onDestroyEvent: function(){
		me.game.disableHUD();
   }

});