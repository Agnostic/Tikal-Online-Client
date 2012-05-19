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
 		this.parent(x, y, settings);
 		this.setVelocity(settings.vel, settings.vel);
		this.setFriction(0.2, 0.2);
		this.gravity = 0;
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
 	onCollision: function(res, obj) {
        if (this.alive && (res.y > 0) && obj.falling) {
            this.flicker(45);
        }
    },
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

 )};

now.updateMob = function(mob){
	if(!init)
		return;

	if(!mobs["'"+mob.id+"'"]) {
		mobs["'"+mob.id+"'"] = new Mob(mob.x, mob.y, mob.settings);
		me.game.add(mobs["'"+mob.id+"'"]);
		me.game.sort();
	} else {
		var m = mobs["'"+mob.id+"'"];
		m.destinationX = mob.x;
		m.destinationY = mob.y;
	}
}

now.delMob = function(mobId){
	if(!init)
		return;

	if(mobs["'"+mobId+"'"]) {
		me.game.remove(mobs["'"+mobId+"'"]);
	}
}