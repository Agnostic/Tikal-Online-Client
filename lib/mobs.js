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
 	},

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