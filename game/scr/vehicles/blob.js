/* MODULE ID: 71 */
function blob(t, e) {
        function i(t, e) {
            this.vehicleInit(t),
            this.createMasses(e),
            this.createSprings(),
            this.stopSounds()
        }
        var n = t("../math/cartesian")
          , r = t("./mass")
          , o = t("./wheel")
          , a = t("./spring")
          , h = t("./vehicle")
          , l = (Math.PI,
        Math.atan2,
        Math.min,
        {
            BLOB: "blob_sound"
        })
          , c = i.prototype = new h;
        c.vehicleName = "Blob",
        c.vehicleInit = c.init,
        c.vehicleUpdate = c.update,
        c.vehicleDraw = c.draw,
        c.masses = null,
        c.springs = null,
        c.slow = !1,
        c.createMasses = function(t) {
            var e = [];
            e.push(new o(new n(t.x + 15,t.y + 40),this)),
            e.push(new o(new n(t.x + -15,t.y + 40),this)),
            e.push(new o(new n(t.x + -15,t.y + 10),this)),
            e.push(new o(new n(t.x + 15,t.y + 10),this));
            var i = new r;
            i.init(new n(0,0), this),
            i.vel = new n(0,0),
            this.m0 = e[0],
            this.m1 = e[1],
            this.m2 = e[2],
            this.m3 = e[3],
            this.head = i,
            this.masses = e,
            this.focalPoint = this.head
        }
        ,
        c.createSprings = function() {
            var t = this.masses
              , e = []
              , t = this.masses
              , e = []
              , i = this.spring0 = new a(t[0],t[1],this)
              , s = this.spring1 = new a(t[1],t[2],this)
              , n = this.spring2 = new a(t[2],t[3],this)
              , r = this.spring3 = new a(t[3],t[0],this)
              , o = this.spring4 = new a(t[0],t[2],this)
              , h = this.spring5 = new a(t[1],t[3],this);
            e.push(i),
            e.push(s),
            e.push(n),
            e.push(r),
            e.push(o),
            e.push(h);
            for (var l in e)
                e[l].springConstant = .2,
                e[l].dampConstant = .2;
            this.springs = e
        }
        ,
        c.update = function() {
            if (this.crashed === !1 && (this.updateSound(),
            this.control()),
            this.explosion)
                this.explosion.update();
            else {
                var t = this.masses
                  , e = t.length
                  , i = this.springs
                  , n = i.length;
                for (s = n - 1; s >= 0; s--)
                    i[s].update();
                for (m = e - 1; m >= 0; m--)
                    t[m].update();
                if ((t[0].contact || t[1].contact || t[2].contact || t[3].contact) && (this.slow = !1),
                !this.slow) {
                    for (this.control(),
                    s = n - 1; s >= 0; s--)
                        i[s].update();
                    for (m = e - 1; m >= 0; m--)
                        t[m].update()
                }
                var r = 0
                  , o = 0;
                for (m = 0; m < e; m++)
                    r += t[m].pos.x,
                    o += t[m].pos.y;
                var a = this.head;
                a.pos.x = .25 * r,
                a.pos.y = .25 * o,
                a.vel = t[0].vel
            }
        }
        ,
        c.updateSound = function() {
            if (this.player.isInFocus()) {
                var t = this.scene.sound;
                t.play(l.BLOB, .4)
            }
        }
        ,
        c.stopSounds = function() {
            var t = this.scene.sound;
            t.stop(l.BLOB)
        }
        ,
        c.updateCameraFocalPoint = function() {}
        ,
        c.control = function() {
            var t, e, i = this.player.getGamepad(), s = i.isButtonDown("up"), n = i.isButtonDown("down"), r = i.isButtonDown("left"), o = i.isButtonDown("right"), a = i.isButtonDown("z"), h = this.masses, l = this.springs, c = h.length, u = l.length, p = this.dir;
            p = o ? 1 : -1;
            var d = o || r ? 1 : 0;
            for (n && (d = 0),
            t = c - 1; t >= 0; t--)
                h[t].motor += (d * p * 1 - h[t].motor) / 10,
                0 == d && (h[t].motor = 0),
                h[t].brake = n;
            var f = r ? 1 : 0;
            if (f += o ? -1 : 0,
            l[4].rotate(f / 9),
            l[5].rotate(f / 9),
            a || s)
                for (e = u - 1; e >= 0; e--)
                    l[e].contract(30, 10);
            else
                for (e = u - 1; e >= 0; e--)
                    l[e].contract(0, 1.5)
        }
        ,
        c.draw = function() {
            if (this.explosion)
                this.explosion.draw(1);
            else {
                var t = this.scene.game.canvas.getContext("2d")
                  , e = this.masses
                  , i = this.scene
                  , s = i.camera.zoom
                  , n = e[0].pos.toScreen(i)
                  , r = e[1].pos.toScreen(i)
                  , o = e[2].pos.toScreen(i)
                  , a = e[3].pos.toScreen(i);
                t.globalAlpha = this.player._opacity,
                t.beginPath(),
                t.strokeStyle = "#000000",
                t.fillStyle = "#000000",
                t.lineWidth = 20 * s,
                t.lineCap = "round",
                t.moveTo(n.x, n.y),
                t.lineTo(r.x, r.y),
                t.lineTo(o.x, o.y),
                t.lineTo(a.x, a.y),
                t.lineTo(n.x, n.y),
                t.fill(),
                t.stroke(),
                t.globalAlpha = 1
            }
        }
        ,
        e.exports = i
    }