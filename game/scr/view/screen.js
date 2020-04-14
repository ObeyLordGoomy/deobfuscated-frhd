/* MODULE ID: 88 */
function screen(t, e) {
        function i(t) {
            this.scene = t,
            this.game = t.game,
            this.size = new s(0,0),
            this.center = new s(0,0),
            this.setScreen()
        }
        var s = t("../math/cartesian");
        i.prototype = {
            game: null,
            scene: null,
            size: null,
            center: null,
            width: 0,
            height: 0,
            setScreen: function() {
                var t = this.game.width
                  , e = this.game.height;
                this.width = t,
                this.height = e,
                this.size.x = t,
                this.size.y = e,
                this.center.x = t / 2,
                this.center.y = e / 2
            },
            update: function() {
                var t = this.game;
                (t.width !== this.width || t.height !== this.height) && this.setScreen()
            },
            realToScreen: function(t, e) {
                var i = this.scene
                  , s = i.camera
                  , n = i.screen;
                return (t - s.position[e]) * s.zoom + n.center[e]
            },
            toReal: function(t, e) {
                var i = this.scene
                  , s = i.camera
                  , n = i.screen;
                return (t - n.center[e]) / s.zoom + s.position[e]
            },
            close: function() {
                this.width = null,
                this.height = null,
                this.center = null,
                this.size = null,
                this.game = null,
                this.scene = null
            }
        },
        e.exports = i
    }