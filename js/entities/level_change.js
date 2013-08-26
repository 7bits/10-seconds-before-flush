// Intercept level changes and handle it manually with gotolevel function

game.LevelChangeEntity = me.LevelEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
    },

    onCollision: function(res, obj) {
        // looking for collisions with only special type enity
        if (obj.name === 'mainplayer') {
            nextLevel = this.gotolevel;

            if (nextLevel != "null") {
                this.goTo(nextLevel);
            } else {
                var titleScreenTimeout;
                document.getElementById('title-screen-img').src = "data/img/gui/win.gif";
                document.getElementById('title-screen').style["visibility"] = "visible";
                document.getElementById('screen').style["visibility"] = "hidden";
                clearTimeout(titleScreenTimeout);
                titleScreenTimeout = setTimeout(function() {
                  document.getElementById('screen').style["visibility"] = "visible";
                  document.getElementById('title-screen').style["visibility"] = "hidden";
                }, 3000);
                me.state.set(me.state.WIN, new game.WinScreen());
                me.state.change(me.state.WIN);
                lives = initialLives;
                me.levelDirector.loadLevel("level1");
            }
        }
    }
});
