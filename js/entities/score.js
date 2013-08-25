var Score = me.ObjectEntity.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.collidable = false;
        this.gravity = 0;
        this.initVelocity = -5;
    },

    update: function () {

        console.log("update");
        if (!this.visible){
            // remove myself if not on the screen anymore
            me.game.remove(this);
        }

        // speed up
        this.vel.y = this.initVelocity;

        this.updateMovement();
        return true;
    }
});
