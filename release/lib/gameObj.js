var quest=me.ObjectEntity.extend({init:function(a,b,c){this.id=c.id;this.parent(a,b,c);this.name="quest";this.selected=!1;this.gravity=0;this.addAnimation("closed",[0]);this.addAnimation("open",[9]);this.setCurrentAnimation("closed");this.collidable=!0},update:function(){return!0}}),Players=me.ObjectEntity.extend({init:function(a,b,c){c.spritewidth=32;c.spriteheight=32;this.parent(a,b,c);this.setVelocity(2,2);this.setFriction(0.2,0.2);this.gravity=0;this.direction="down";this.destinationX=a;this.destinationY=
b;this.updateColRect(2,26,-1,0);this.addAnimation("down",[0,1,2]);this.addAnimation("left",[3,4,5]);this.addAnimation("up",[9,10,11]);this.addAnimation("right",[6,7,8]);this.addAnimation("stand-down",[0]);this.addAnimation("stand-left",[3]);this.addAnimation("stand-up",[9]);this.addAnimation("stand-right",[6])},update:function(){hadSpeed=0!==this.vel.y||0!==this.vel.x;this.handleInput();updated=this.updateMovement();0===this.vel.x&&0===this.vel.y&&(this.setCurrentAnimation("stand-"+this.direction),
hadSpeed&&(updated=!0));updated&&this.parent(this);return updated},handleInput:function(){this.destinationX<this.pos.x-10?(this.vel.x-=this.accel.x*me.timer.tick,this.setCurrentAnimation("left"),this.direction="left"):this.destinationX>this.pos.x+10&&(this.vel.x+=this.accel.x*me.timer.tick,this.setCurrentAnimation("right"),this.direction="right");this.destinationY<this.pos.y-10?(this.vel.y=-this.accel.y*me.timer.tick,this.setCurrentAnimation("up"),this.direction="up"):this.destinationY>this.pos.y+
10&&(this.vel.y=this.accel.y*me.timer.tick,this.setCurrentAnimation("down"),this.direction="down")}}),LocalPlayer=Players.extend({init:function(a,b,c){c.image=now.player.spr;a=now.player.x;b=now.player.y;this.parent(a,b,c);this.setVelocity(1,1);this.setFriction(0.2,0.2);this.gravity=0;this.collidable=!0;me.game.viewport.follow(this.pos,me.game.viewport.AXIS.BOTH)},update:function(){var a=this.pos.x,b=this.pos.y;hadSpeed=0!==this.vel.y||0!==this.vel.x;this.handleInput();updated=this.updateMovement();
0===this.vel.x&&0===this.vel.y&&(this.setCurrentAnimation("stand-"+this.direction),hadSpeed&&(updated=!0));if(res=me.game.collide(this)){if(res.name=me.input.isKeyPressed("action")&&!1==res.obj.selected){for(var c=1;16>=c&&0!=local_inventario[c].item;)c++;16>c?(res.obj.setCurrentAnimation("open"),res.obj.selected=!0,now.sendQuest({id:res.obj.id})):$("#c_msgs").append("You need a free slot in your inventory.<br/>")}console.log(res);(res.type=me.game.ENEMY_OBJECT&&me.input.isKeyPressed("action"))&&
res.obj.flicker(25);0<res.y&&(this.pos.y=b-1);0>res.y&&(this.pos.y=b+1);0<res.x&&(this.pos.x=a-1);0>res.x&&(this.pos.x=a+1)}updated&&this.parent(this);return updated},handleInput:function(){me.input.isKeyPressed("left")?(this.vel.x-=this.accel.x*me.timer.tick,this.setCurrentAnimation("left"),this.direction="left"):me.input.isKeyPressed("right")&&(this.vel.x+=this.accel.x*me.timer.tick,this.setCurrentAnimation("right"),this.direction="right");me.input.isKeyPressed("up")?(this.vel.y=-this.accel.y*me.timer.tick,
this.setCurrentAnimation("up"),this.direction="up"):me.input.isKeyPressed("down")&&(this.vel.y=this.accel.y*me.timer.tick,this.setCurrentAnimation("down"),this.direction="down");if(0!=this.vel.x||0!=this.vel.y)now.moverPlayer({pos:{x:this.pos.x,y:this.pos.y}}),chatOn=!1}});
now.actualizarPlayers=function(a){if(init&&a.id!=now.player.id){me.ObjectSettings.name=a.nick;me.ObjectSettings.image=a.spr;players["'"+a.id+"'"]||(players["'"+a.id+"'"]=new Players(a.x,a.y,me.ObjectSettings),players["'"+a.id+"'"].z=7,me.game.add(players["'"+a.id+"'"]),me.game.sort());var b=players["'"+a.id+"'"];b.destinationX=a.x;b.destinationY=a.y}};now.recibeQuest=function(a){var b=0;$.each(now.player.inventario,function(a,d){0!=d.item&&b++});16>b?addItemInventory(a.item,a.cantidad):console.log("Sin capacidad")};
now.del_player=function(a){init&&me.game.remove(players["'"+a+"'"])};