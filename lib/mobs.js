/*!
 * 
 *   Tikal Online
 *   http://www.tikalonline.com/
 *		
 *   By Gilberto Avalos
 *
 **/

 var Mob = me.ObjectEntity.extend({
 	init: function(x, y, settings) {
 		settings.image = settings.image;
 		this.x = x;
 		this.y = y;
 		this.id = settings.id;
 		this.id_ = settings.id_;
 		this.name = settings.name;
 		this.hp = settings.hp;
 		this.level = settings.level;
 		settings.spritewidth = 32;
 		settings.spriteheight = 32;
 		this.parent(x, y, settings);
 		this.setVelocity(settings.vel, settings.vel);
 		this.destinationX = x;
		this.destinationY = y;
		this.setFriction(0.2, 0.2);
		this.gravity = 0;
		this.direction = 'down';
		this.addAnimation("down", [0,1,2]);
		this.addAnimation("left", [3,4,5]);
		this.addAnimation("up", [9,10,11]);
		this.addAnimation("right", [6,7,8]);
		this.addAnimation("stand-down", [0]);
		this.addAnimation("stand-left", [3]);
		this.addAnimation("stand-up", [9]);
		this.addAnimation("stand-right", [6]);
		this.collidable = true;
		this.type = me.game.ENEMY_OBJECT;
		
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
		} else {
			res = me.game.collide(this);
			if(res){ 
				if (res.y > 0) {
		            this.pos.y = preY-1;
		            this.destinationY = this.pos.y;
		        }
		        if (res.y < 0) {
		            this.pos.y = preY+1;
		            this.destinationY = this.pos.y;
		        }
		        if (res.x > 0) {
		            this.pos.x = preX-1;
		            this.destinationX = this.pos.x;
		        }
		        if (res.x < 0) {
		            this.pos.x = preX+1;
		            this.destinationX = this.pos.x;
		        }
		    }
		}		

		// Actualizar animación
		if(updated){
			this.parent(this);
		}

		return updated;
	},
	onCollision: function(res, obj) {
		//this.flicker(25);
    },
	handleInput: function() {

		if (this.destinationX < this.pos.x - 10)
		{
			this.vel.x -= this.accel.x * me.timer.tick;
			this.setCurrentAnimation('left');
			this.direction = 'left';
			now.updateMob(this.id_, this.pos);
		}
		else if (this.destinationX > this.pos.x + 10)
		{
			this.vel.x += this.accel.x * me.timer.tick;
			this.setCurrentAnimation('right');
			this.direction = 'right';
			now.updateMob(this.id_, this.pos);
		}
		
		if (this.destinationY < this.pos.y - 10)
		{
			this.vel.y = -this.accel.y * me.timer.tick;
			this.setCurrentAnimation('up');
			this.direction = 'up';
			now.updateMob(this.id_, this.pos);
		}
		else if (this.destinationY > this.pos.y + 10)
		{
			this.vel.y = this.accel.y * me.timer.tick;
			this.setCurrentAnimation('down');
			this.direction = 'down';
			now.updateMob(this.id_, this.pos);
		}
	}

 });

$(document).ready(function(){

	var mobManager = setInterval(function(){
		if(!init || (typeof(now.mobs) == 'undefined') || !npcOn)
			return;

		$.each(now.mobs, function(i, mob) {
			if(!mobs["'"+mob.settings.id+"'"]) {
				//console.log("Agregado: "+mob.settings.name);
				mobs["'"+mob.settings.id+"'"] = new Mob(mob.x, mob.y, mob.settings);
				mobs["'"+mob.settings.id+"'"].z = 7;
				me.game.add(mobs["'"+mob.settings.id+"'"]);
				me.game.sort();

			} else {
				var m = mobs["'"+mob.settings.id+"'"];
				m.destinationX = mob.x;
				m.destinationY = mob.y;
			}
				
		});
	}, 500);

	now.updateMob_ = function(mob){
		if(!init || typeof(mob.settings) == 'undefined')
			return;
		var m = mobs["'"+mob.settings.id+"'"];
		m.hp = mob.settings.hp;
		m.destinationX = mob.x;
		m.destinationY = mob.y;
	}

	now.delMob = function(mobId){
		if(!init)
			return;
		if(mobs["'"+mobId+"'"]) {
			me.game.remove(mobs["'"+mobId+"'"]);
		}
	}
});