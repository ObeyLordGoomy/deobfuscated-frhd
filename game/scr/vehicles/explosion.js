/* MODULE ID: 75 */
function explosion(t, e) {
        function i(t, e) {
            this.time = 20,
            this.gravity = new s(0,.3),
            this.scene = e,
            this.createMasses(t),
            this.positionX = t.x,
            this.positionY = t.y
        }
        var s = t("../math/cartesian")
          , n = (t("./mass"),
        t("./debris"))
          , r = (t("./spring"),
        Math.random)
          , o = Math.cos
          , a = Math.sin
          , h = i.prototype;
        h.vehicleInit = h.init,
        h.complete = !1,
        h.time = 0,
        h.powerupsEnabled = !1,
        h.draw = function(t) {
            var e = this.time
              , i = this.positionX
              , s = this.positionY
              , n = this.scene.camera.zoom
              , h = this.scene.screen
              , l = this.scene.game.canvas.getContext("2d");
            if (l.globalAlpha = t,
            e > 0) {
                e -= 10;
                var c = h.realToScreen(i, "x")
                  , u = h.realToScreen(s, "y")
                  , p = 0
                  , d = 6.2 * r()
                  , f = e * n
                  , v = c + f * o(d)
                  , g = u + f * a(d);
                for (l.lineWidth = 0,
                l.strokeStyle = "black",
                l.beginPath(),
                l.moveTo(v, g),
                l.fillStyle = "black"; p++ < 16; )
                    f = (e + 30 * r()) * n,
                    v = c + f * o(d + 6.283 * p / 16),
                    g = u + f * a(d + 6.283 * p / 16),
                    l.lineTo(v, g);
                l.fill(),
                l.stroke()
            }
            var m = this.masses;
            for (var y in m)
                m[y].draw();
            l.globalAlpha = 1,
            this.time = e
        }
        ,
        h.createMasses = function(t) {
            this.masses = [],
            this.masses.push(new n(t,this,"#000000")),
            this.masses.push(new n(t,this,"#000000")),
            this.masses.push(new n(t,this,"#000000")),
            this.masses.push(new n(t,this,"#000000")),
            this.masses.push(new n(t,this,"#000000")),
            this.masses.push(new n(t,this,"#000000")),
            this.masses.push(new n(t,this,"#000000"))
        }
        ,
        h.update = function() {
            var t = this.masses;
            for (var e in t)
                t[e].update()
        }
        ,
        e.exports = i
    }