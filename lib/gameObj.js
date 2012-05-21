/*!
 * 
 *   Tikal Online
 *   http://www.tikalonline.com/
 *		
 *   By Gilberto Avalos
 *
 **/

var quest = me.ObjectEntity.extend({
	init: function(x, y, settings) {
		this.id = settings.id;
		this.parent(x, y, settings);
		this.name = "quest";
		this.selected = false;
		this.gravity = 0;
		this.addAnimation("closed", [0]);
		this.addAnimation("open", [9]);
		this.setCurrentAnimation("closed");
		this.collidable = true;
	}, 
	update: function() {
		return true;
	}
});

var Players = me.ObjectEntity.extend({

	init: function(x, y, settings){
		
		// Llamar al constructor
		settings.spritewidth = 32;
		settings.spriteheight = 32;
			
		this.parent(x, y, settings);
		
		// Velocidad al caminar
		this.setVelocity(2, 2);
		this.setFriction(0.2, 0.2);
		
		this.gravity = 0;
		this.direction = 'down';
		this.destinationX = x;
		this.destinationY = y;
		
		this.updateColRect(2,26,-1,0);
		
		this.addAnimation("down", [0,1,2]);
		this.addAnimation("left", [3,4,5]);
		this.addAnimation("up", [9,10,11]);
		this.addAnimation("right", [6,7,8]);
		this.addAnimation("stand-down", [0]);
		this.addAnimation("stand-left", [3]);
		this.addAnimation("stand-up", [9]);
		this.addAnimation("stand-right", [6]);
		
	},
		
	// Actualizar la posición del personaje
	update: function(){
		hadSpeed = this.vel.y !== 0 || this.vel.x !== 0;
		this.handleInput();
		updated = this.updateMovement();
		
		if(this.vel.x === 0 && this.vel.y === 0){
			this.setCurrentAnimation('stand-'+this.direction);
			if(hadSpeed){
				updated = true;
			}
		}
		// Actualizar animación
		if(updated){
			this.parent(this);
		}
		return updated;
	},
	
	handleInput: function() {
		if (this.destinationX < this.pos.x - 10)
		{
			this.vel.x -= this.accel.x * me.timer.tick;
			this.setCurrentAnimation('left');
			this.direction = 'left';
		}
		else if (this.destinationX > this.pos.x + 10)
		{
			this.vel.x += this.accel.x * me.timer.tick;
			this.setCurrentAnimation('right');
			this.direction = 'right';
		}
		
		if (this.destinationY < this.pos.y - 10)
		{
			this.vel.y = -this.accel.y * me.timer.tick;
			this.setCurrentAnimation('up');
			this.direction = 'up';
		}
		else if (this.destinationY > this.pos.y + 10)
		{
			this.vel.y = this.accel.y * me.timer.tick;
			this.setCurrentAnimation('down');
			this.direction = 'down';
		}
	}
	
});

var LocalPlayer = Players.extend({

	init: function(x, y, settings) {
		settings.image = now.player.spr;
		x = now.player.x;
		y = now.player.y;

		this.parent(x, y, settings);
		this.setVelocity(1, 1);
		this.setFriction(0.2, 0.2);
		this.gravity = 0;
		this.collidable = true;

		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		

	},
	update: function(){
		var preX = this.pos.x;
		var preY = this.pos.y;

		hadSpeed = this.vel.y !== 0 || this.vel.x !== 0;
		this.handleInput();
		updated = this.updateMovement();
		
		if(this.vel.x === 0 && this.vel.y === 0){
			this.setCurrentAnimation('stand-'+this.direction);
			if(hadSpeed){
				updated = true;
			}
		}

		res = me.game.collide(this);
		if (res){
			if(res.name = "quest" && me.input.isKeyPressed('action') && res.obj.selected == false){
				var i = 1;
				while(i <= 16) {
					if(local_inventario[i].item == 0)
						break;
					i++;
				}
				if(i < 16){
					res.obj.setCurrentAnimation("open");
					res.obj.selected = true;
					now.sendQuest({ id: res.obj.id });
				} else {
					$("#c_msgs").append("You need a free slot in your inventory.<br/>");
				}
			}
			console.log(res);
			if(res.type = me.game.ENEMY_OBJECT && me.input.isKeyPressed('action')){
				res.obj.flicker(25);
			}
			
			if (res.y > 0) {
	            this.pos.y = preY-1;
	        }
	        if (res.y < 0) {
	            this.pos.y = preY+1;
	        }
	        if (res.x > 0) {
	            this.pos.x = preX-1;
	        }
	        if (res.x < 0) {
	            this.pos.x = preX+1;
	        }
			
		}

		// Actualizar animación
		if(updated){
			this.parent(this);
		}
		return updated;
	},
	handleInput: function() {
		
		if (me.input.isKeyPressed('left'))
		{
			this.vel.x -= this.accel.x * me.timer.tick;
			this.setCurrentAnimation('left');
			this.direction = 'left';
		}
		else if (me.input.isKeyPressed('right'))
		{
			this.vel.x += this.accel.x * me.timer.tick;
			this.setCurrentAnimation('right');
			this.direction = 'right';
		}
		
		if (me.input.isKeyPressed('up'))
		{
			this.vel.y = -this.accel.y * me.timer.tick;
			this.setCurrentAnimation('up');
			this.direction = 'up';
		}
		else if (me.input.isKeyPressed('down'))
		{
			this.vel.y = this.accel.y * me.timer.tick;
			this.setCurrentAnimation('down');
			this.direction = 'down';
		}
		
		if(this.vel.x != 0 || this.vel.y != 0){
			now.moverPlayer({ pos: {x: this.pos.x, y: this.pos.y} });
			chatOn = false;
		}
	}

});

// Instanciar personajes remotos
now.actualizarPlayers = function(data) {
	if(init){
		// Crear personaje si no existe
		if(data.id != now.player.id){
			
			me.ObjectSettings.name = data.nick;
			me.ObjectSettings.image = data.spr;
			
			if(!players["'"+data.id+"'"]) {
				players["'"+data.id+"'"] = new Players(data.x, data.y, me.ObjectSettings);
				players["'"+data.id+"'"].z = 7;
				me.game.add(players["'"+data.id+"'"]);
				me.game.sort();
				//console.log("Agregado el Player ID: "+data.id);
			}
			
			var p = players["'"+data.id+"'"];
			p.destinationX = data.x;
			p.destinationY = data.y;

		}
	}
}

now.recibeQuest = function(data){
	var total = 0;
	$.each(now.player.inventario, function(index, value) {
			if(value.item != 0)
				total++;
	});
	if(total < 16){
		addItemInventory(data.item, data.cantidad);
	} else {
		console.log("Sin capacidad");
	}
}


now.del_player = function(data){
	if(init){
		me.game.remove(players["'"+data+"'"]);
	}
}
