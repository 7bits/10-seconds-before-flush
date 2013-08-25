game.TitleScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
 
        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;
 
        this.scroller = "WALK: < >  JUMP: X  SQUAT: C  SHOOT: SPACE  LET'S TRY TO MAKE A WORLD SHIT!";
        this.scrollerpos = 600;
    },
 
    // reset function
    onResetEvent: function() {
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("title_screen");
        }
        if (this.font == null) {
            // font to display the menu items
            this.font = new me.BitmapFont("32x32_font", 32);
 
            // set the scroller
            this.scrollerfont = new me.BitmapFont("32x32_font", 32);
        }
 
        // reset to default value
        this.scrollerpos = 640;
 
        // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
 
        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
 
        // play something
        //me.audio.play("cling");
 
        /*var titleScreenTimeout;
        document.getElementById('title-screen').style["visibility"] = "visible";
        document.getElementById('title-screen-img').src = "data/img/gui/win_screen.png";
        clearTimeout(titleScreenTimeout);
        titleScreenTimeout = setTimeout(function() {
          document.getElementById('title-screen').style["visibility"] = "hidden";
        }, 3000);
        */
    },
 
    // some callback for the tween objects
    scrollover: function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
    },
 
    // update function
    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
        }
        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
 
        this.font.draw(context, "PRESS ENTER TO PLAY", 336, 575);
        this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 650);
    },
 
    // destroy function
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
 
        //just in case
        this.scrollertween.stop();
    }
 
});
