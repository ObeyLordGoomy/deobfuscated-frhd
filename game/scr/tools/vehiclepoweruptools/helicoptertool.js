/* MODULE ID: 54 */
function helicoptertool(t, e) {
        var i = t("../../math/cartesian")
          , s = t("../tool")
          , n = t("../../sector/vehiclepowerups/helicopter")
          , r = function(t, e) {
            this.toolInit(e),
            this.powerup = new n(0,0,0,e.scene.track),
            this.p1 = new i(0,0),
            this.p2 = new i(0,0),
            this.options = t.options,
            this.active = !1
        }
          , o = r.prototype = new s;
        o.toolInit = o.init,
        o.toolUpdate = o.update,
        o.powerup = null,
        o.name = "helicopter",
        o.p1 = null,
        o.p2 = null,
        o.active = !1,
        o.draw = function(t) {
            var e = this.mouse.touch
              , i = e.pos
              , s = this.camera.zoom
              , n = this.scene.settings.device;
            if (("desktop" === n || this.active) && (t.globalAlpha = .8,
            this.powerup.draw(i.x, i.y, s, t),
            t.globalAlpha = 1),
            this.active === !0) {
                var r = this.scene.screen
                  , o = r.realToScreen(this.p1.x, "x")
                  , a = r.realToScreen(this.p1.y, "y");
                t.globalAlpha = .4,
                this.powerup.draw(o, a, s, t),
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
              , e = new n(this.p1.x,this.p1.y,this.options.time,t);
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