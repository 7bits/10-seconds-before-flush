// Intercept level changes and handle it manually with gotolevel function

game.LevelChangeEntity = me.LevelEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
    },

    onCollision: function(res, obj) {
        // looking for collisions with only special type enity
        if (obj.name === 'mainplayer') {
            nextLevel = this.gotolevel;
            console.log(nextLevel);

            if (nextLevel != "null") {
                this.goTo(nextLevel);
            } else {
                me.state.set(me.state.WIN, new game.WinScreen());
                me.state.change(me.state.WIN);
            }
        }
    }
});
