/* MODULE ID: 44 */
function gravitytool(t, e) {
        var i = t("../../math/cartesian")
          , s = t("../tool")
          , n = t("../../sector/powerups/gravity")
          , r = Math.PI
          , o = Math.atan2
          , a = Math.pow
          , h = Math.sqrt
          , l = Math.max
          , c = Math.min
          , u = function(t) {
            this.toolInit(t),
            this.powerup = new n(0,0,0,t.scene.track),
            this.p1 = new i(0,0),
            this.p2 = new i(0,0),
            this.active = !1
        }
          , p = u.prototype = new s;
        p.toolInit = p.init,
        p.toolUpdate = p.update,
        p.powerup = null,
        p.name = "gravity",
        p.p1 = null,
        p.p2 = null,
        p.active = !1,
        p.press = function() {
            var t = this.mouse.touch
              , e = t.real;
            this.p1.x = e.x,
            this.p1.y = e.y,
            this.p2.x = e.x,
            this.p2.y = e.y,
            this.active = !0
        }
        ,
        p.hold = function() {
            var t = this.mouse.touch
              , e = t.real;
            this.p2.x = e.x,
            this.p2.y = e.y
        }
        ,
        p.release = function() {
            var t = this.scene.track
              , e = new n(this.p1.x,this.p1.y,this.powerup.angle - 180,t);
            t.addPowerup(e),
            this.active = !1,
            this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e]
            })
        }
        ,
        p.draw = function(t) {
            var e = this.mouse.touch
              , i = (e.pos,
            this.camera.zoom)
              , s = this.scene.screen
              , n = this.scene.settings.device;
            if (this.active === !0) {
                var a = s.realToScreen(this.p1.x, "x")
                  , h = s.realToScreen(this.p1.y, "y")
                  , l = this.p1
                  , c = this.p2
                  , u = l.y - c.y
                  , p = l.x - c.x
                  , d = o(l.y - c.y, l.x - c.x);
                0 === p && 0 === u && (d = r - r / 2),
                0 > d && (d += 2 * r),
                this.drawPathToMouse(t, d),
                this.powerup.angle = d * (180 / r) + 90 | 0,
                this.powerup.draw(a, h, i, t)
            } else if ("desktop" === n) {
                t.globalAlpha = .8,
                this.powerup.angle = 180;
                var a = s.realToScreen(e.real.x, "x")
                  , h = s.realToScreen(e.real.y, "y");
                this.powerup.draw(a, h, i, t),
                t.globalAlpha = 1
            }
        }
        ,
        p.drawPathToMouse = function(t, e) {
            var i = this.p1
              , s = this.p2
              , n = this.scene.screen
              , o = this.scene.camera.zoom
              , u = n.realToScreen(i.x, "x")
              , p = n.realToScreen(i.y, "y")
              , d = n.realToScreen(s.x, "x")
              , f = n.realToScreen(s.y, "y")
              , v = h(a(d - u, 2) + a(f - p, 2));
            30 * o > v && (v = 30 * o),
            t.strokeStyle = "#A2B7D2",
            t.lineWidth = l(1, 2 * o),
            t.beginPath(),
            t.moveTo(u, p),
            t.lineTo(u + v, p),
            t.stroke(),
            t.beginPath(),
            t.moveTo(u, p),
            t.lineTo(d, f),
            t.stroke(),
            t.closePath();
            var g = e + 180 * (r / 180)
              , m = c(v, 50 * o);
            t.beginPath(),
            t.moveTo(u, p),
            t.arc(u, p, m, g, 0, !1),
            t.moveTo(u, p),
            t.stroke(),
            t.fillStyle = "rgba(162, 183, 210,0.2)",
            t.fill(),
            t.closePath()
        }
        ,
        e.exports = u
    }