var Bullet = me.ObjectEntity.extend({

    init: function (x, y, playerVelocity, direction, settings) {
        this.parent(x, y, settings);
        this.collidable = true;
        this.gravity = 0;
        this.initVelocity = playerVelocity;
        this.shootDirection = direction;
        console.log(this.shootDirection);
    },

    update: function () {

        if (!this.visible){
            // remove myself if not on the screen anymore
            me.game.remove(this);
        }

        // speed up

        var velocity = this.initVelocity.x + 15;

        if(this.shootDirection === 'left') {
          velocity = - 10;
        }
        this.vel.x = velocity;

        this.olderX = this.oldX;
        this.oldX = this.prevX;
        this.prevX = this.pos.x;

        // check for collision
        var res = me.game.collide(this);
        if (res) {
            if (res.obj.type == me.game.ENEMY1_OBJECT) {
                poo = new game.PooEntity(res.obj.pos.x, res.obj.pos.y + 56, this.vel, {image: 'poo', spritewidth: 44});
                me.game.add(poo, res.obj.z);
                me.game.sort();
                me.game.remove(res.obj);
                me.game.remove(this);
            }  else if (res.obj.type == me.game.ENEMY2_OBJECT) {
                me.game.remove(res.obj);
                me.game.remove(this);
            } else if (res.obj.type !== 0) {
                me.game.remove(this);
            }
        } else {
            if (this.olderX === this.oldX && this.oldX !== undefined) {
                me.game.remove(this);
            }
        }

        this.updateMovement();
        return true;
    }
});
