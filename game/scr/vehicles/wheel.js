/* MODULE ID: 86 */
function wheel(t, e) {
        function i(t, e) {
            this.init(t, e),
            this.motor = 0,
            this.brake = !1,
            this.angle = 0,
            this.speed = 0,
            this.rotationSpeed = 0
        }
        var s = (t("../math/cartesian"),
        t("./mass"))
          , n = i.prototype = new s;
        n.motor = 0,
        n.brake = !1,
        n.angle = 0,
        n.speed = 0,
        n.drive = function(t, e) {
            var i = this.pos
              , s = this.motor * this.parent.dir
              , n = s * t
              , r = s * e;
            if (i.x += n,
            i.y += r,
            this.brake) {
                var o = .3 * -(t * this.vel.x + e * this.vel.y)
                  , a = t * o
                  , h = e * o;
                i.x += a,
                i.y += h
            }
            this.speed = (t * this.vel.x + e * this.vel.y) / this.radius,
            this.rotationSpeed = this.speed,
            this.angle += this.speed,
            this.contact = !0
        }
        ,
        n.massUpdate = n.update,
        n.update = function() {
            var t = this.parent.gravity
              , e = this.pos
              , i = this.old
              , s = this.vel;
            s.x += t.x,
            s.y += t.y,
            (0 != t.x || 0 != t.y) && (s.x = .99 * s.x,
            s.y = .99 * s.y),
            e.x += s.x,
            e.y += s.y,
            this.contact = !1,
            this.collide && this.scene.track.collide(this),
            s.x = e.x - i.x,
            s.y = e.y - i.y,
            this.old.equ(this.pos),
            this.rotationSpeed = .999 * this.rotationSpeed
        }
        ,
        e.exports = i
    }