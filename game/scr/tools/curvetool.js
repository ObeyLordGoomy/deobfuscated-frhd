/* MODULE ID: 36 */
function curvetool(t, e) {
        var i = t("../math/cartesian")
          , s = t("../math/curvedivision")
          , n = t("./tool")
          , r = Math.sqrt
          , o = Math.pow
          , a = function(t) {
            this.toolInit(t),
            this.p1 = new i(0,0),
            this.p2 = new i(0,0),
            this.midpoint = new i(0,0),
            this.active = !1,
            this.options = {}
        }
          , h = a.prototype = new n;
        h.toolInit = h.init,
        h.name = "Curve",
        h.active = !1,
        h.p1 = null,
        h.p2 = null,
        h.midpoint = null,
        h.anchoring = !1,
        h.options = null,
        h.getOptions = function() {
            var t = this.toolhandler
              , e = this.options;
            return e.lineType = t.options.lineType,
            e.snap = t.options.snap,
            e
        }
        ,
        h.reset = function() {
            this.active = !1,
            this.anchoring = !1
        }
        ,
        h.press = function() {
            if (!this.active) {
                this.active = !0;
                var t = this.mouse.touch.real;
                this.p1.x = t.x,
                this.p1.y = t.y
            }
        }
        ,
        h.hold = function() {
            var t = this.mouse.touch.real;
            this.p2.x = t.x,
            this.p2.y = t.y;
            var e = this.p1
              , i = this.p2;
            this.midpoint.x = (e.x + i.x) / 2,
            this.midpoint.y = (e.y + i.y) / 2,
            this.toolhandler.moveCameraTowardsMouse()
        }
        ,
        h.release = function() {
            var t = this.p1
              , e = this.p2
              , i = this.midpoint
              , s = this.toolhandler;
            if (this.anchoring) {
                if (i.x === e.x && i.y === e.y) {
                    var n = this.scene.track
                      , a = !1;
                    a = "physics" === s.options.lineType ? n.addPhysicsLine(t.x, t.y, e.x, e.y) : n.addSceneryLine(t.x, t.y, e.x, e.y),
                    a && s.addActionToTimeline({
                        type: "add",
                        objects: [a]
                    }),
                    s.snapPoint.x = e.x,
                    s.snapPoint.y = e.y
                } else
                    this.splitAndAddCurve();
                this.anchoring = !1,
                this.active = !1
            } else {
                var h = e.x - t.x
                  , l = e.y - t.y
                  , c = r(o(h, 2) + o(l, 2));
                c > 0 ? this.anchoring = !0 : this.active = !1
            }
        }
        ,
        h.updateAnchor = function() {
            var t = this.mouse.touch.real;
            this.midpoint.x = t.x,
            this.midpoint.y = t.y
        }
        ,
        h.splitAndAddCurve = function() {
            for (var t = (performance.now(),
            s(this.p1, this.midpoint, this.p2)), e = this.scene.track, i = t.length, n = this.toolhandler, r = [], o = 0; i - 2 > o; o += 2) {
                var a = t[o]
                  , h = t[o + 1]
                  , l = t[o + 2]
                  , c = t[o + 3]
                  , u = !1;
                u = "physics" === n.options.lineType ? e.addPhysicsLine(a, h, l, c) : e.addSceneryLine(a, h, l, c),
                u && r.push(u),
                n.snapPoint.x = l,
                n.snapPoint.y = c
            }
            r.length > 0 && n.addActionToTimeline({
                type: "add",
                objects: r
            })
        }
        ,
        h.update = function() {
            var t = this.mouse
              , e = t.touch
              , i = t.secondaryTouch
              , s = this.toolhandler.gamepad
              , n = this.toolhandler;
            n.options.snap && (this.active = !0,
            this.p1 = n.snapPoint,
            this.anchoring || this.hold());
            var r = this.toolhandler.options
              , o = s.isButtonDown("shift");
            r.rightClickMove && (o = i.old.down),
            o ? (e.old.down || r.rightClickMove) && this.moveCamera() : (e.press && !this.anchoring && this.press(),
            e.old.down && !this.anchoring && this.hold(),
            e.release && this.release(),
            this.anchoring && this.updateAnchor()),
            t.mousewheel !== !1 && s.isButtonDown("shift") === !1 && this.mousewheel(t.mousewheel)
        }
        ,
        h.draw = function() {
            var t = this.scene
              , e = (t.game.canvas,
            t.game.canvas.getContext("2d"))
              , i = t.camera
              , s = i.zoom;
            this.drawCursor(e, s),
            this.active && (this.drawLine(e, s),
            this.drawPoint(e, this.p1, s),
            this.drawPoint(e, this.p2, s))
        }
        ,
        h.toScreen = function(t, e) {
            var i = this.scene.camera
              , s = this.scene.screen;
            return (t - i.position[e]) * i.zoom + s.center[e]
        }
        ,
        h.drawCursor = function(t, e) {
            var i = this.mouse.touch
              , s = i.real.toScreen(this.scene)
              , n = this.toolhandler
              , r = (n.options.lineType,
            n.options.grid)
              , o = "#1884cf";
            if (r) {
                var a = 5 * e;
                t.beginPath(),
                t.moveTo(s.x, s.y - a),
                t.lineTo(s.x, s.y + a),
                t.moveTo(s.x - a, s.y),
                t.lineTo(s.x + a, s.y),
                t.lineWidth = 1 * e,
                t.stroke()
            } else
                t.beginPath(),
                t.arc(s.x, s.y, 1 * e, 0, 2 * Math.PI, !1),
                t.lineWidth = 1,
                t.fillStyle = o,
                t.fill()
        }
        ,
        h.drawPoint = function(t, e, i) {
            var s = e.toScreen(this.scene);
            t.beginPath(),
            t.arc(s.x, s.y, 1 * i, 0, 2 * Math.PI, !1),
            t.lineWidth = 1,
            t.fillStyle = "#1884cf",
            t.fill()
        }
        ,
        h.drawText = function(t) {
            {
                var e = this.name
                  , i = this.game.pixelRatio
                  , s = this.scene;
                s.game.canvas
            }
            t.fillStyle = "#000000",
            t.font = 12 * i + "pt arial",
            t.fillText(e, 10 * i, 20 * i),
            t.font = 8 * i + "pt arial"
        }
        ,
        h.drawLine = function(t, e) {
            var i = this.scene
              , s = (i.game.canvas,
            2 * e > .5 ? 2 * e : .5)
              , n = this.toolhandler
              , r = n.options.lineType
              , o = "physics" === r ? "#000" : "#AAA";
            t.beginPath(),
            t.lineWidth = s,
            t.lineCap = "round",
            t.strokeStyle = o;
            var a = this.p1.toScreen(this.scene)
              , h = this.p2.toScreen(this.scene)
              , l = this.midpoint.toScreen(this.scene);
            t.moveTo(a.x, a.y),
            t.quadraticCurveTo(l.x, l.y, h.x, h.y),
            t.stroke()
        }
        ,
        e.exports = a
    }