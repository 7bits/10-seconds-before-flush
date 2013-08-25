var bullet = me.ObjectEntity.extend({

    init: function (x, y, playerVelocity, settings) {
        this.parent(x, y, settings);
        this.collidable = true;
        this.gravity = 0;
        this.initVelocity = playerVelocity;
    },

    update: function () {

        if (!this.visible){
            // remove myself if not on the screen anymore
            me.game.remove(this);
        }

        // speed up

        this.vel.x = this.initVelocity.x + 15;

        this.olderX = this.oldX
        this.oldX = this.prevX
        this.prevX = this.pos.x

        // check for collision
        var res = me.game.collide(this);
        if (res) {
            if (res.obj.type == me.game.ENEMY_OBJECT) {
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
