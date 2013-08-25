
/* --------------------------
Flower Entity
------------------------ */
game.FlowerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "flower";
        settings.spritewidth = 55;
 
        // call the parent constructor
        this.parent(x, y, settings);
 
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY1_OBJECT;
 
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        //if (this.alive && (res.y > 0) && obj.falling) {
        //    this.renderable.flicker(45);
        //}
    },
});

/* --------------------------
Butterfly Entity
------------------------ */
game.ButterflyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "butterfly";
        settings.spritewidth = 55;
        settings.spriteheight = 48;
 
        // call the parent constructor
        this.parent(x, y, settings);
 
        this.startX = x;
        this.startY = y;
        this.endX = x + settings.width - settings.spritewidth;
        this.endY = y + settings.height - settings.spriteheight;
        // size of sprite
 
        // make him start from the left top
        this.pos.x = x;
        this.pos.y = y;
        this.floatLeft = false;
        this.floatTop = false;
 
        // walking & jumping speed
        this.setVelocity(2, 3);
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY2_OBJECT;
 
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        //if (this.alive && (res.y > 0) && obj.falling) {
        //    this.renderable.flicker(45);
        //}
    },
 
    // manage the enemy movement
    update: function() {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;
 
        if (this.alive) {
            if (this.floatLeft && this.pos.x <= this.startX) {
                this.floatLeft = false;
            } else if (!this.floatLeft && this.pos.x >= this.endX) {
                if (Math.random() >= 0.5) {
                  this.floatLeft = true;
                } else {
                  this.floatLeft = false;
                }
            }
            if (this.floatTop && this.pos.y <= this.startY) {
                this.floatTop = false;
            } else if (!this.floatTop && this.pos.y >= this.endY) {
                if (Math.random() >= 0.5) {
                  this.floatTop = true;
                } else {
                  this.floatTop = false;
                }
            }
            this.flipX(this.floatLeft);

            this.vel.x += (this.floatLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
            this.vel.y += (this.floatTop) ? -this.accel.y * me.timer.tick : this.accel.y * me.timer.tick;

        } else {
            this.vel.x = 0;
            this.vel.y = 0;
        }
         
        // check and update movement
        this.updateMovement();
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }
});