/* MODULE ID: 30 */
function balloon(t, e) {
        function i(t, e, i, s) {
            this.x = t,
            this.y = e,
            this.time = i,
            this.id = r().toString(36).substr(2),
            this.hit = !1,
            this.init(s)
        }
        var s = t("../powerup")
          , n = {
            canvas: document.createElement("canvas"),
            dirty: !0,
            width: 22,
            height: 32
        }
          , r = Math.random
          , o = Math.pow
          , a = Math.sqrt
          , h = (Math.cos,
        Math.sin,
        i.prototype = new s);
        h.x = 0,
        h.y = 0,
        h.name = "balloon",
        h.getCode = function() {
            return "V " + this.x.toString(32) + " " + this.y.toString(32) + " 3 " + this.time.toString(32)
        }
        ,
        h.recache = function(t) {
            n.dirty = !1;
            var e = n.canvas;
            e.width = n.width * t,
            e.height = n.height * t;
            var i = e.getContext("2d")
              , s = e.width / 2
              , r = e.height / 2;
            this.drawIcon(s, r, t, i)
        }
        ,
        h.setDirty = function(t) {
            n.dirty = t
        }
        ,
        h.draw = function(t, e, i, s) {
            if (!this.hit) {
                n.dirty && this.recache(i);
                var r = n.width * i
                  , o = n.height * i
                  , a = r / 2
                  , h = o / 2;
                s.drawImage(n.canvas, t - a, e - h, r, o)
            }
        }
        ,
        h.drawIcon = function(t, e, i, s) {
            s.save(),
            s.scale(i, i),
            s.beginPath(),
            s.moveTo(0, 0),
            s.lineTo(21, 0),
            s.lineTo(21, 31),
            s.lineTo(0, 31),
            s.closePath(),
            s.clip(),
            s.translate(0, 0),
            s.translate(0, 0),
            s.scale(1, 1),
            s.translate(0, 0),
            s.strokeStyle = "rgba(0,0,0,0)",
            s.lineCap = "butt",
            s.lineJoin = "miter",
            s.miterLimit = 4,
            s.save(),
            s.restore(),
            s.save(),
            s.restore(),
            s.save(),
            s.fillStyle = "rgba(0, 0, 0, 0)",
            s.strokeStyle = "rgba(0, 0, 0, 0)",
            s.lineWidth = 1,
            s.translate(-1322, -440),
            s.save(),
            s.translate(251, 28),
            s.save(),
            s.translate(1056, 265),
            s.save(),
            s.translate(3, 141),
            s.save(),
            s.translate(12, 6),
            s.save(),
            s.fillStyle = "#000000",
            s.beginPath(),
            s.moveTo(7, 23),
            s.lineTo(14, 23),
            s.quadraticCurveTo(15, 23, 15, 24),
            s.lineTo(15, 30),
            s.quadraticCurveTo(15, 31, 14, 31),
            s.lineTo(7, 31),
            s.quadraticCurveTo(6, 31, 6, 30),
            s.lineTo(6, 24),
            s.quadraticCurveTo(6, 23, 7, 23),
            s.closePath(),
            s.fill(),
            s.stroke(),
            s.restore(),
            s.save(),
            s.strokeStyle = "#000000",
            s.lineWidth = 2,
            s.lineCap = "round",
            s.beginPath(),
            s.moveTo(15, 19),
            s.lineTo(12.9375, 24.6875),
            s.fill(),
            s.stroke(),
            s.restore(),
            s.save(),
            s.strokeStyle = "#000000",
            s.lineWidth = 2,
            s.lineCap = "round",
            s.translate(7.03125, 21.84375),
            s.scale(-1, 1),
            s.translate(-7.03125, -21.84375),
            s.beginPath(),
            s.moveTo(8.0625, 19),
            s.lineTo(6, 24.6875),
            s.fill(),
            s.stroke(),
            s.restore(),
            s.save(),
            s.save(),
            s.fillStyle = "#f02728",
            s.save(),
            s.beginPath(),
            s.arc(10.5, 11.125, 10.5, 0, 6.283185307179586, !0),
            s.closePath(),
            s.fill(),
            s.stroke(),
            s.restore(),
            s.restore(),
            s.save(),
            s.strokeStyle = "#000000",
            s.lineWidth = 2,
            s.beginPath(),
            s.arc(10.5, 11.125, 9.5, 0, 6.283185307179586, !0),
            s.closePath(),
            s.fill(),
            s.stroke(),
            s.restore(),
            s.restore(),
            s.restore(),
            s.restore(),
            s.restore(),
            s.restore(),
            s.restore(),
            s.restore()
        }
        ,
        h.collide = function(t) {
            var e = t.parent
              , i = e.player
              , s = t.pos.x - this.x
              , n = t.pos.y - this.y
              , r = a(o(s, 2) + o(n, 2))
              , h = i._powerupsConsumed.misc
              , l = this.scene;
            if (30 > r && i.isAlive() && -1 === h.indexOf(this.id)) {
                h.push(this.id);
                var c = this.time * l.settings.drawFPS;
                i.setTempVehicle("BALLOON", c, {
                    x: this.x,
                    y: this.y
                }, e.dir),
                l.camera.playerFocus === i && (l.camera.focusOnPlayer(),
                l.vehicleTimer.playerAddedTime(i)),
                i.isGhost() === !1 && (this.hit = !0,
                this.sector.powerupCanvasDrawn = !1,
                this.scene.message.show("Balloon Powerup!", 50, "#f02728", !1))
            }
        }
        ,
        e.exports = i
    }