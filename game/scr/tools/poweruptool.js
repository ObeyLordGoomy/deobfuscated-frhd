/* MODULE ID: 38 */
function poweruptool(t, e) {
        var i = (t("../math/cartesian"),
        t("./tool"))
          , s = (Math.round,
        t("./poweruptools/gravitytool"))
          , n = t("./poweruptools/goaltool")
          , r = t("./poweruptools/boosttool")
          , o = t("./poweruptools/slowmotool")
          , a = t("./poweruptools/checkpointtool")
          , h = t("./poweruptools/bombtool")
          , l = t("./poweruptools/antigravitytool")
          , c = t("./poweruptools/teleporttool")
          , u = function(t) {
            this.toolInit(t),
            this.powerupTools = {},
            this.registerPowerupTools(),
            this.options = {
                selected: "goal"
            }
        }
          , p = u.prototype = new i;
        p.toolInit = p.init,
        p.toolUpdate = p.update,
        p.name = "Powerup",
        p.powerupTools = null,
        p.registerPowerupTools = function() {
            this.registerTool(new n(this.toolhandler)),
            this.registerTool(new r(this.toolhandler)),
            this.registerTool(new s(this.toolhandler)),
            this.registerTool(new o(this.toolhandler)),
            this.registerTool(new h(this.toolhandler)),
            this.registerTool(new a(this.toolhandler)),
            this.registerTool(new l(this.toolhandler)),
            this.registerTool(new c(this.toolhandler))
        }
        ,
        p.registerTool = function(t) {
            this.powerupTools[t.name] = t
        }
        ,
        p.setOption = function(t, e) {
            this.options[t] = e
        }
        ,
        p.getOptions = function() {
            return this.options
        }
        ,
        p.update = function() {
            var t = this.toolhandler.gamepad
              , e = (this.mouse,
            this.options);
            t.isButtonDown("opt1") && (e.selected = "goal",
            t.setButtonUp("opt1"),
            this.scene.stateChanged()),
            t.isButtonDown("opt2") && (e.selected = "boost",
            t.setButtonUp("opt2"),
            this.scene.stateChanged()),
            t.isButtonDown("opt3") && (e.selected = "gravity",
            t.setButtonUp("opt3"),
            this.scene.stateChanged()),
            t.isButtonDown("opt4") && (e.selected = "slowmo",
            t.setButtonUp("opt4"),
            this.scene.stateChanged()),
            t.isButtonDown("opt5") && (e.selected = "bomb",
            t.setButtonUp("opt5"),
            this.scene.stateChanged()),
            t.isButtonDown("opt6") && (e.selected = "checkpoint",
            t.setButtonUp("opt6"),
            this.scene.stateChanged()),
            t.isButtonDown("opt7") && (e.selected = "antigravity",
            t.setButtonUp("opt7"),
            this.scene.stateChanged()),
            t.isButtonDown("opt8") && Application.User.get("classic") && (e.selected = "teleport",
            t.setButtonUp("opt8"),
            this.scene.stateChanged()),
            this.toolUpdate()
        }
        ,
        p.press = function() {
            var t = this.options.selected;
            this.powerupTools[t].press()
        }
        ,
        p.hold = function() {
            var t = this.options.selected;
            this.powerupTools[t].hold()
        }
        ,
        p.release = function() {
            var t = this.options.selected;
            this.powerupTools[t].release()
        }
        ,
        p.draw = function() {
            var t = this.scene
              , e = (t.game.canvas,
            t.game.canvas.getContext("2d"))
              , i = this.options;
            this.powerupTools[i.selected].draw(e)
        }
        ,
        e.exports = u
    }