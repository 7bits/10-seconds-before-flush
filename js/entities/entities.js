/*------------------- 
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
 
    /* -----
    constructor
    ------ */
    init: function(x, y, settings) {
        this.spriteSizes = {
          stand : { width : 96, height : 96 },
          slide : { width : 96, height : 48 }  
        }
        // call the constructor
        this.parent(x, y, settings);
        settings.image = "monstr";

        // set the default horizontal & vertical speed (accel vector)
        this.initialVelocity = { x : 7, y : 20 };
        this.setVelocity(this.initialVelocity.x, this.initialVelocity.y);
        this.minVel = { x : 3, y : 15 }; 
        this.velocityStep = this.maxVel.x * 0.1;
        this.timerPenaltyRate = -10;
        this.timerBonus = 10;

        this.renderable.addAnimation("stand", [0,0]);
        this.renderable.addAnimation("slide", [0,0]);

        this.isEnemyCollision = false;
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },

    /* -----
    update the player pos
    ------ */
    update: function() {
     
        if (me.input.isKeyPressed('left'))
        {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        }
        else if (me.input.isKeyPressed('right'))
        {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        }
        else
        {
            this.vel.x = 0;
        }
        if (me.input.isKeyPressed('jump'))
        {   
            if (!this.jumping && !this.falling) 
            {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.vel.y = -this.maxVel.y * me.timer.tick;
                // disable the sliding flag
                this.sliding = false;
                // set the jumping flag
                this.jumping = true;
            }
        }
        if (me.input.isKeyPressed('down'))
        {   
            if (!this.sliding && !this.jumping && !this.falling) {
                this.slide();
            }
        } else {
            this.sliding = false;
        }
     
        // check & update player movement
        this.updateMovement();

        // Set stand animation if needed
        if (!this.renderable.isCurrentAnimation("stand") && !this.sliding && !this.falling) {
            this.renderable.setCurrentAnimation("stand");
        }

        // Update player rectangle sizes if needed
        if (!this.sliding) {
            this.updateColRect(10, this.spriteSizes.stand.width - 20, 0, this.spriteSizes.stand.height);
        }
        if (this.sliding) {
            this.updateColRect(0, this.spriteSizes.slide.width, this.spriteSizes.stand.height - this.spriteSizes.slide.height, this.spriteSizes.slide.height);
        }
             

        // check for collision
        var res = me.game.collide(this);
     
        if (res) {
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                if (!this.isEnemyCollision) {
                    this.isEnemyCollision = true;
                    me.game.HUD.updateItemValue("timer", this.timerPenaltyRate);
                }
            }

            if (res.obj.type == me.game.COLLECTABLE_OBJECT) {
                me.game.HUD.updateItemValue("timer", this.timerBonus);
            }
        } else {
            this.isEnemyCollision = false;
        }

        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;       
     
    },

    die: function() {
        this.alive = false;
        invisibility = false;
        speed = false;
        me.gamestat.reset();
        //me.levelDirector.reloadLevel();
    },

    slide: function() {
        this.sliding = true;
        this.renderable.setCurrentAnimation("slide");
    },
});

/*----------------
 Poo Entity
------------------------ */
game.PooEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        settings.image = "poo";
        settings.spritewidth = 44;

        // call the parent constructor
        this.parent(x, y, settings);
        this.type = me.game.COLLECTABLE_OBJECT;
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
 
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }
 
});

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
        this.type = me.game.ENEMY_OBJECT;
 
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
        settings.spritewidth = 32;
        settings.spriteheight = 32;
 
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
        this.setVelocity(4, 6);
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
 
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
            // make it walk
            this.flipX(this.floatLeft);
            this.flipY(this.floatTop);

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

/*-------------- 
Timer HUD
--------------------- */
 
game.TimerObject = me.HUD_Item.extend({
    init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");

        this.value = 100;
    },
 
    draw: function(context, x, y) {
        // draw human readable seconds instead of milliseconds
        var humanReadable = this.value / 10;
        humanReadable = humanReadable.toFixed(1);
        this.font.draw(context, humanReadable, this.pos.x + x, this.pos.y + y);
    }
});
