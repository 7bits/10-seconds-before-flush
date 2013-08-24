var timer;

game.PlayScreen = me.ScreenObject.extend({

    // timer for flush
    setTimer: function() {
        clearInterval(timer);

        // reload HUD timer
        me.game.HUD.removeItem("timer");
        me.game.HUD.addItem("timer", new game.TimerObject(100, 10));

        var timerStep = 1;
        timer = setInterval(function() {
            var oldTimerValue = me.game.HUD.getItemValue("timer");

            if (oldTimerValue - timerStep >= 0) {
                me.game.HUD.updateItemValue("timer", -timerStep);
            } else {
                clearInterval(timer);
                var player = me.game.getEntityByName("mainPlayer")[0]
                player.die();
            }
        }, 100);
    },

    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {	
        me.levelDirector.loadLevel("level1");

        // add a default HUD to the game mngr
        me.game.addHUD(50, 50, 200, 50);

        this.setTimer();
        me.game.onLevelLoaded = this.setTimer.bind(this);

        // make sure everything is in the right order
        me.game.sort();
    },
    
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD
        me.game.disableHUD();
        // clear timer
        clearInterval(timer);
    }
});
