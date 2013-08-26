var timer;
var titleScreenTimeout;
var initialLives = 3;
var lives = initialLives;

game.PlayScreen = me.ScreenObject.extend({

    // timer for flush
    setTimer: function() {
      clearInterval(timer);

      // reload HUD timer
      if (me.game.HUD != null) {
        me.game.HUD.removeItem("timer");
        me.game.HUD.addItem("timer", new game.TimerObject(150, 10));
        me.game.HUD.addItem("score", new game.LevelInfoObject(150, 10));
        //me.game.HUD.addItem("controls_hint", new game.GameControlHintObject(150, 10));

        var timerStep = 1;
        timer = setInterval(function() {
            var oldTimerValue = me.game.HUD.getItemValue("timer");

            if (oldTimerValue - timerStep >= 0) {
                me.game.HUD.updateItemValue("timer", -timerStep);
            } else {
                clearInterval(timer);
                var player = me.game.getEntityByName("mainPlayer")[0]
                if (lives <= 1) {
                  me.state.set(me.state.GAME_OVER, new game.GameOverScreen());
                  me.state.change(me.state.GAME_OVER);
                  lives = initialLives;
                  me.levelDirector.loadLevel("level1");
                } else {
                  lives -= 1;
                  me.state.set(me.state.FLUSH, new game.FlushScreen());
                  me.state.change(me.state.FLUSH);

                  var titleScreenTimeout;
                  document.getElementById('title-screen-img').src = "";
                  document.getElementById('screen').style["visibility"] = "hidden";
                  setTimeout(function() {
                    document.getElementById('title-screen-img').src = "data/img/gui/flush.gif";
                    document.getElementById('title-screen').style["visibility"] = "visible";
                  }, 50);
                  clearTimeout(titleScreenTimeout);
                  titleScreenTimeout = setTimeout(function() {
                    document.getElementById('screen').style["visibility"] = "visible";
                    document.getElementById('title-screen').style["visibility"] = "hidden";
                    me.audio.playTrack("background");
                  }, 2300);
                }
            }
        }, 100);
      }
    },

    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {	
        if (me.levelDirector.getCurrentLevelId() == "level0") {
          me.levelDirector.loadLevel("level1");
        } else {
          me.levelDirector.loadLevel(me.levelDirector.getCurrentLevelId());
        }

        // me.audio.playTrack("background");
        // add a default HUD to the game mngr
        me.game.addHUD(50, 50, 1280, 720);

        this.setTimer();
        me.game.onLevelLoaded = this.setTimer.bind(this);

        //clearTimeout(titleScreenTimeout);
        //titleScreenTimeout = setTimeout(function() {
        //document.getElementById('title-screen').style["display"] = "none";
        //}, 3000);
        // make sure everything is in the right order
        me.game.sort();
    },
    
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD
        me.game.disableHUD();
        // me.audio.stopTrack();
        // clear timer
        clearInterval(timer);
    }
});
