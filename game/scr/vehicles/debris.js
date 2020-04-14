/* MODULE ID: 74 */
function debris(t, e) {
        function i(t, e, i) {
            this.massInit(t, e),
            this.color = i,
            this.pos.x = t.x + 5 * (n() - n()),
            this.pos.y = t.y + 5 * (n() - n()),
            this.old.x = this.pos.x,
            this.old.y = this.pos.y,
            this.vel.y = 11 * (n() - n()),
            this.vel.x = 11 * (n() - n()),
            this.radius = 2 * n() * 5,
            this.angle = 6.2 * n(),
            this.speed = 1 * n() - 1 * n(),
            this.friction = .05
        }
        var s = (t("../math/cartesian"),
        t("./mass"))
          , n = (t("./spring"),
        Math.random)
          , r = Math.pow
          , o = Math.sqrt
          , a = Math.cos
          , h = Math.sin
          , l = [1, .7, .8, .9, .5, 1, .7, 1]
          , c = i.prototype = new s;
        c.massInit = c.init,
        c.massUpdate = c.update,
        c.color = "black",
        c.drive = function(t, e) {
            var i = this.vel
              , s = this.pos;
            this.speed = (t * i.x + e * i.y) / this.radius,
            this.angle += this.speed;
            var n = -(t * i.x + e * i.y) * this.friction;
            s.x += t * n,
            s.y += e * n;
            var a = o(r(t, 2) + r(e, 2));
            if (a > 0) {
                var h = -e / a
                  , l = t / a
                  , c = .8 * (h * i.x + l * i.y);
                this.old.x += h * c,
                this.old.y += l * c
            }
        }
        ,
        c.update = function() {
            {
                var t = this.scene;
                t.settings
            }
            this.angle += this.speed,
            this.massUpdate()
        }
        ,
        c.draw = function() {
            var t = this.scene.screen
              , e = this.scene.camera
              , i = t.realToScreen(this.pos.x, "x")
              , s = t.realToScreen(this.pos.y, "y")
              , n = 0
              , r = e.zoom
              , o = this.angle
              , c = l[0] * r * this.radius
              , u = i + c * a(o)
              , p = s + c * h(o)
              , d = this.scene.game.canvas.getContext("2d");
            for (d.lineWidth = 1 * r,
            d.strokeStyle = "#000000",
            d.beginPath(),
            d.moveTo(u, p),
            d.fillStyle = this.color; n++ < 8; )
                c = l[n - 1] * r * this.radius,
                u = i + c * a(o + 6.283 * n / 8),
                p = s + c * h(o + 6.283 * n / 8),
                d.lineTo(u, p);
            d.fill(),
            d.stroke()
        }
        ,
        e.exports = i
    }