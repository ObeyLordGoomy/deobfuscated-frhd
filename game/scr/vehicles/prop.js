/* MODULE ID: 81 */
function prop(t, e) {
        function i(t, e) {
            this.init(t, e),
            this.motor = 0,
            this.angle = new s(0,0),
            this.radius = 10,
            this.speed = 0
        }
        var s = t("../math/cartesian")
          , n = t("./mass")
          , r = i.prototype = new n;
        r.motor = 0,
        r.angle = 0,
        r.speed = 0,
        r.update = function() {
            var t = this.vel
              , e = this.angle
              , i = this.pos
              , s = this.old
              , n = this.motor;
            t.y += 0,
            t.inc(e.factor(2 * n)),
            t = t.factor(.99),
            i.inc(t),
            this.contact = !1,
            this.collide && this.scene.track.collide(this),
            this.vel = i.sub(s),
            s.equ(i)
        }
        ,
        e.exports = i
    }