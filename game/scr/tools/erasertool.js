/* MODULE ID: 37 */
function erasertool(t, e) {
        var i = t("../math/cartesian")
          , s = t("./tool")
          , n = t("../../libs/lodash-3.10.1")
          , r = Math.round
          , o = function(t) {
            this.toolInit(t);
            var e = t.scene.settings.eraser;
            this.options = e,
            this.eraserPoint = new i,
            this.erasedObjects = []
        }
          , a = o.prototype = new s;
        a.toolInit = a.init,
        a.toolUpdate = a.update,
        a.name = "Eraser",
        a.options = null,
        a.reset = function() {
            this.recordActionsToToolhandler()
        }
        ,
        a.press = function() {
            this.recordActionsToToolhandler()
        }
        ,
        a.recordActionsToToolhandler = function() {
            this.erasedObjects.length > 0 && this.toolhandler.addActionToTimeline({
                type: "remove",
                objects: n.flatten(this.erasedObjects)
            }),
            this.erasedObjects = []
        }
        ,
        a.release = function() {
            this.recordActionsToToolhandler()
        }
        ,
        a.hold = function() {
            var t = this.mouse.touch
              , e = t.pos
              , i = this.scene.track
              , s = this.scene.screen
              , n = this.scene.camera
              , o = s.center
              , a = n.position
              , h = (e.x - o.x) / n.zoom + a.x
              , l = (e.y - o.y) / n.zoom + a.y;
            this.eraserPoint.x = r(h),
            this.eraserPoint.y = r(l);
            var c = i.erase(this.eraserPoint, this.options.radius / this.scene.camera.zoom, this.options.types);
            c.length > 0 && this.erasedObjects.push(c)
        }
        ,
        a.draw = function() {
            var t = this.scene
              , e = (t.game.canvas,
            t.game.canvas.getContext("2d"));
            this.drawEraser(e)
        }
        ,
        a.drawEraser = function(t) {
            {
                var e = this.mouse.touch
                  , i = e.pos;
                this.camera.zoom
            }
            t.beginPath(),
            t.arc(i.x, i.y, this.options.radius, 0, 2 * Math.PI, !1),
            t.lineWidth = 1,
            t.fillStyle = "rgba(255,255,255,0.8)",
            t.fill(),
            t.strokeStyle = "#000000",
            t.stroke()
        }
        ,
        a.setOption = function(t, e) {
            this.options[t] = e
        }
        ,
        a.getOptions = function() {
            return this.options
        }
        ,
        a.update = function() {
            var t = this.toolhandler.gamepad
              , e = this.mouse;
            t.isButtonDown("shift") && e.mousewheel !== !1 && this.adjustRadius(e.mousewheel),
            this.toolUpdate()
        }
        ,
        a.adjustRadius = function(t) {
            var e = this.options.radius
              , i = this.options.radiusSizeSensitivity
              , s = this.options.maxRadius
              , n = this.options.minRadius
              , r = t > 0 ? i : -i;
            e += r,
            n > e ? e = n : e > s && (e = s),
            this.setOption("radius", e)
        }
        ,
        e.exports = o
    }