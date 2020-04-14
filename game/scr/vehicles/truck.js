/* MODULE ID: 84 */
function truck(t, e) {
        var i = function(t, e, i) {
            this.vehicleInit(t),
            this.createMasses(e),
            this.createSprings(),
            this.stopSounds(),
            this.updateCameraFocalPoint(),
            -1 === i && this.swap()
        };
        e.exports = i;
        var s = t("../math/cartesian")
          , n = t("./mass")
          , r = t("./spring")
          , o = t("./vehicle")
          , h = t("./wheel")
          , l = Math.atan2
          , c = Math.min
          , u = (Math.floor,
        Math.random,
        Math.sqrt)
          , p = Math.pow
          , d = (Math.abs,
        {
            TRUCK_GROUND: "truck_idle"
        })
          , f = i.prototype = new o;
        f.vehicleName = "TRUCK",
        f.vehicleInit = f.init,
        f.vehicleUpdate = f.update,
        f.vehicleControl = f.control,
        f.vehicleDraw = f.draw,
        f.masses = null,
        f.springs = null,
        f.cosmetics = null,
        f.slow = !1,
        f.pedala = 0,
        f.swapped = !1,
        f.crashed = !1;
        f.createMasses = function(t) {
            this.masses = [],
            this.masses.push(new n),
            this.masses.push(new n),
            this.masses[0].init(new s(t.x - 15,t.y + 7), this),
            this.masses[1].init(new s(t.x + 15,t.y + 7), this),
            this.masses[0].friction = .1,
            this.masses[1].friction = .1,
            this.masses.push(new h(new s(t.x - 20,t.y + 35),this)),
            this.masses.push(new h(new s(t.x + 20,t.y + 35),this)),
            this.masses[2].radius = this.masses[3].radius = 14,
            this.masses[0].radius = this.masses[1].radius = 7,
            this.head = this.masses[0],
            this.backMass = this.masses[1],
            this.rearWheel = this.masses[2],
            this.frontWheel = this.masses[3]
        }
        ,
        f.createSprings = function() {
            this.springs = [];
            var t = this.masses;
            this.springs.push(new r(t[0],t[1],this)),
            this.springs.push(new r(t[0],t[2],this)),
            this.springs.push(new r(t[1],t[3],this)),
            this.springs.push(new r(t[0],t[3],this)),
            this.springs.push(new r(t[1],t[2],this)),
            this.springs.push(new r(t[2],t[3],this)),
            this.springs[0].leff = this.springs[0].lrest = 30,
            this.springs[1].leff = this.springs[1].lrest = 30,
            this.springs[2].leff = this.springs[2].lrest = 30,
            this.springs[3].leff = this.springs[3].lrest = 45,
            this.springs[4].leff = this.springs[4].lrest = 45;
            for (var e in this.springs)
                this.springs[e].springConstant = .3
        }
        ,
        f.updateCameraFocalPoint = function() {}
        ,
        f.update = function() {
            if (this.crashed === !1 && (this.updateSound(),
            this.control()),
            this.explosion)
                this.explosion.update();
            else {
                for (var t = this.springs, e = t.length, i = e - 1; i >= 0; i--)
                    t[i].update();
                for (var s = this.masses, n = s.length, r = n - 1; r >= 0; r--)
                    s[r].update();
                if (this.rearWheel.contact && this.frontWheel.contact && (this.slow = !1),
                this.slow === !1) {
                    this.crashed === !1 && this.control();
                    for (var i = e - 1; i >= 0; i--)
                        t[i].update();
                    for (var r = n - 1; r >= 0; r--)
                        s[r].update()
                }
                this.updateDrawHeadAngle(),
                this.updateCameraFocalPoint()
            }
        }
        ,
        f.updateSound = function() {
            if (this.player.isInFocus()) {
                var t = this.scene.sound;
                if (this.rearWheel.contact) {
                    var e = c(this.rearWheel.motor, 1);
                    t.play(d.TRUCK_GROUND, e)
                } else if (this.frontWheel.contact) {
                    var e = c(this.frontWheel.motor, 1);
                    t.play(d.TRUCK_GROUND, e)
                } else
                    t.stop(d.TRUCK_GROUND)
            }
        }
        ,
        f.updateCameraFocalPoint = function() {
            this.focalPoint = 1 === this.dir ? this.head : this.backMass
        }
        ,
        f.stopSounds = function() {
            var t = this.scene.sound;
            t.stop(d.TRUCK_GROUND)
        }
        ,
        f.updateDrawHeadAngle = function() {
            var t = this.frontWheel.pos
              , e = this.rearWheel.pos
              , i = t.x
              , s = t.y
              , n = e.x
              , r = e.y
              , o = i - n
              , a = s - r;
            this.drawHeadAngle = -(l(o, a) - Math.PI / 2)
        }
        ,
        f.swap = function() {
            this.dir = -1 * this.dir,
            this.springs[0].swap(),
            this.springs[5].swap()
        }
        ,
        f.control = function() {
            var t = this.gamepad
              , e = t.isButtonDown("up")
              , i = t.isButtonDown("down")
              , s = t.isButtonDown("left")
              , n = t.isButtonDown("right")
              , r = t.isButtonDown("z");
            r && !this.swapped && (this.swap(),
            this.swapped = !0),
            r || (this.swapped = !1);
            var o = e ? 1 : 0
              , a = this.rearWheel
              , h = this.frontWheel;
            a.motor += (.8 * o - a.motor) / 10,
            h.motor += (.8 * o - h.motor) / 10,
            a.brake = i,
            h.brake = i;
            var l = s ? 1 : 0;
            l += n ? -1 : 0;
            var c = this.springs;
            c[0].rotate(l / 8),
            c[5].rotate(l / 8)
        }
        ,
        f.draw = function() {
            if (this.explosion)
                this.explosion.draw(1);
            else {
                var t = this.scene.game.canvas.getContext("2d");
                if (t.imageSmoothingEnabled = !0,
                t.mozImageSmoothingEnabled = !0,
                t.oImageSmoothingEnabled = !0,
                t.webkitImageSmoothingEnabled = !0,
                this.settings.developerMode)
                    for (var e = this.masses, i = e.length, s = i - 1; s >= 0; s--)
                        e[s].draw();
                t.globalAlpha = this.player._opacity,
                this.drawTruck(t),
                t.globalAlpha = 1
            }
        }
        ,
        f.drawTruck = function(t) {
            var e = this.scene
              , i = e.camera.zoom
              , s = this.cosmetics
              , n = GameInventoryManager.getItem(s.head)
              , r = this.drawHeadAngle
              , o = this.dir
              , a = this.frontWheel.pos.toScreen(e)
              , h = this.rearWheel.pos.toScreen(e)
              , l = this.head.pos.toScreen(e)
              , c = this.backMass.pos.toScreen(e)
              , d = (this.masses[1].pos.x - this.masses[0].pos.x) * i
              , f = (this.masses[1].pos.y - this.masses[0].pos.y) * i
              , v = (.5 * (this.masses[0].pos.x + this.masses[1].pos.x) - .5 * (this.masses[2].pos.x + this.masses[3].pos.x)) * i
              , g = (.5 * (this.masses[0].pos.y + this.masses[1].pos.y) - .5 * (this.masses[2].pos.y + this.masses[3].pos.y)) * i;
            t.strokeStyle = "#000000",
            t.lineWidth = 3 * i,
            t.lineCap = "round",
            t.lineJoin = "round";
            var m = c.x - l.x
              , y = c.y - l.y
              , w = u(p(m, 2) + p(y, 2))
              , x = m / w
              , _ = y / w;
            n.draw(t, c.x - .5 * x * i * 20, c.y - _ * i * 20 * .5, r, .45 * i, o),
            t.strokeStyle = "#444444",
            t.beginPath(),
            t.moveTo(l.x - .4 * d - .9 * v, l.y - .4 * f - .9 * g),
            t.lineTo(l.x + .8 * d - .9 * v, l.y + .8 * f - .9 * g),
            t.stroke(),
            t.closePath(),
            t.save(),
            t.fillStyle = "#777777",
            t.beginPath(),
            t.moveTo(l.x - .4 * d - .7 * v, l.y - .4 * f - .7 * g),
            t.lineTo(l.x - .4 * d - .7 * v, l.y - .4 * f - .7 * g),
            t.lineTo(l.x + 1.4 * d - .7 * v, l.y + 1.4 * f - .7 * g),
            t.lineTo(l.x + 1.35 * d - .2 * v, l.y + 1.35 * f - .2 * g),
            t.lineTo(l.x + .9 * d - .1 * v, l.y + .9 * f - .1 * g),
            t.lineTo(l.x + .5 * d - .1 * v, l.y + .5 * f - .1 * g),
            t.lineTo(l.x + .5 * d + .2 * v, l.y + .5 * f + .2 * g),
            t.lineTo(l.x - .35 * d + .2 * v, l.y - .35 * f + .2 * g),
            t.closePath(),
            t.fill(),
            t.save(),
            t.lineWidth = 2 * i,
            t.strokeStyle = "#444444",
            t.beginPath(),
            t.moveTo(l.x - .4 * d - .7 * v, l.y - .4 * f - .7 * g),
            t.lineTo(l.x - .35 * d + .2 * v, l.y - .35 * f + .2 * g),
            t.lineTo(l.x + .8 * d + .2 * v, l.y + .8 * f + .2 * g),
            t.lineTo(l.x + .9 * d - .1 * v, l.y + .9 * f - .1 * g),
            t.lineTo(l.x + 1.35 * d - .2 * v, l.y + 1.35 * f - .2 * g),
            t.lineTo(l.x + 1.4 * d - .7 * v, l.y + 1.4 * f - .7 * g),
            t.lineTo(l.x - .4 * d - .7 * v, l.y - .4 * f - .7 * g),
            t.closePath(),
            t.stroke(),
            t.strokeStyle = "#444444",
            t.lineWidth = i,
            t.beginPath(),
            t.moveTo(l.x + .5 * d - .1 * v, l.y + .5 * f - .1 * g),
            t.lineTo(l.x + .9 * d - .1 * v, l.y + .9 * f - .1 * g),
            t.lineTo(l.x + .8 * d + .2 * v, l.y + .8 * f + .2 * g),
            t.lineTo(l.x + .5 * d + .2 * v, l.y + .5 * f + .2 * g),
            t.lineTo(l.x + .5 * d - .1 * v, l.y + .5 * f - .1 * g),
            t.closePath(),
            t.stroke(),
            t.beginPath(),
            this.tire(t, h.x, h.y, 10 * i, i, this.rearWheel.angle),
            t.closePath(),
            t.beginPath(),
            this.tire(t, a.x, a.y, 10 * i, i, this.frontWheel.angle),
            t.closePath(),
            t.restore()
        }
        ,
        f.tire = function(t, e, i, s, n, r) {
            for (t.beginPath(),
            t.arc(e, i, 10 * n, 0, 2 * Math.PI, !1),
            t.fillStyle = "#888888",
            t.fill(),
            t.lineWidth = 5.9 * n,
            t.strokeStyle = "#000000",
            t.closePath(),
            t.stroke(),
            t.beginPath(),
            t.lineWidth = 2 * n,
            t.strokeStyle = "0x000000",
            a = 0,
            s += 3 * n; a++ < 8; )
                t.moveTo(e + s * Math.cos(r + 6.283 * a / 8), i + s * Math.sin(r + 6.283 * a / 8)),
                t.lineTo(e + s * Math.cos(r + 6.283 * (a + .5) / 8), i + s * Math.sin(r + 6.283 * (a + .5) / 8));
            for (t.stroke(),
            t.closePath(),
            t.beginPath(),
            t.lineWidth = 2 * n,
            t.strokeStyle = "0x000000",
            a = 0,
            s += -9 * n; a++ < 5; )
                t.moveTo(e + s * Math.cos(r + 6.283 * a / 5), i + s * Math.sin(r + 6.283 * a / 5)),
                t.lineTo(e + s * Math.cos(r + 6.283 * (a + .2) / 5), i + s * Math.sin(r + 6.283 * (a + .2) / 5));
            t.closePath(),
            t.stroke()
        }
    }