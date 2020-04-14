/* MODULE ID: 40 */
function bombtool(t, e) {
        var i = t("../../math/cartesian")
          , s = t("../tool")
          , n = t("../../sector/powerups/bomb")
          , r = function(t) {
            this.toolInit(t),
            this.powerup = new n(0,0,t.scene.track),
            this.p1 = new i(0,0),
            this.p2 = new i(0,0),
            this.active = !1
        }
          , o = r.prototype = new s;
        o.toolInit = o.init,
        o.toolUpdate = o.update,
        o.powerup = null,
        o.name = "bomb",
        o.p1 = null,
        o.p2 = null,
        o.active = !1,
        o.draw = function(t) {
            var e = this.mouse.touch
              , i = (e.pos,
            this.camera.zoom)
              , s = this.scene.settings.device
              , n = this.scene.screen;
            if (this.active === !0) {
                var r = n.realToScreen(this.p1.x, "x")
                  , o = n.realToScreen(this.p1.y, "y");
                t.globalAlpha = .4,
                this.powerup.draw(r, o, i, t),
                t.globalAlpha = 1
            } else if ("desktop" === s) {
                var r = n.realToScreen(e.real.x, "x")
                  , o = n.realToScreen(e.real.y, "y");
                t.globalAlpha = .8,
                this.powerup.draw(r, o, i, t),
                t.globalAlpha = 1
            }
        }
        ,
        o.press = function() {
            var t = this.mouse.touch
              , e = t.real;
            this.p1.x = e.x,
            this.p1.y = e.y,
            this.p2.x = e.x,
            this.p2.y = e.y,
            this.active = !0
        }
        ,
        o.hold = function() {
            var t = this.mouse.touch
              , e = t.real;
            this.p2.x = e.x,
            this.p2.y = e.y
        }
        ,
        o.release = function() {
            var t = (this.scene.screen,
            this.scene.track)
              , e = new n(this.p1.x,this.p1.y,t);
            t.addPowerup(e),
            this.active = !1,
            this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e]
            })
        }
        ,
        e.exports = r
    }