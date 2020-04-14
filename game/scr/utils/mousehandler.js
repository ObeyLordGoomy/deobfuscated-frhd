/* MODULE ID: 63 */
function mousehandler(t, e) {
        var i = t("../math/cartesian")
          , s = t("../../libs/lodash-3.10.1")
          , n = t("events").EventEmitter
          , r = Math.round
          , o = function(t) {
            this.scene = t,
            this.enabled = !0,
            this.touch = this.getTouchObject(),
            this.touch.old = this.getTouchObject(),
            this.secondaryTouch = this.getTouchObject(),
            this.secondaryTouch.old = this.getTouchObject(),
            this.initAnalytics(),
            this.bindToMouseEvents(),
            this.updateCallback = !1
        }
          , a = o.prototype = new n;
        a.scene = null,
        a.touch = null,
        a.touches = [],
        a.wheel = !1,
        a.mousewheel = !1,
        a.mouseMoveListener = null,
        a.mouseUpListener = null,
        a.mouseDownListener = null,
        a.throttledMouseWheel = null,
        a.analytics = null,
        a.contextMenuHandler = function(t) {
            return t.stopPropagation(),
            t.preventDefault(),
            !1
        }
        ,
        a.initAnalytics = function() {
            this.analytics = {
                clicks: 0
            }
        }
        ,
        a.getTouchObject = function() {
            var t = {
                id: null,
                down: !1,
                press: !1,
                release: !1,
                pos: new i(0,0),
                real: new i(0,0),
                type: 1
            };
            return t
        }
        ,
        a.bindToMouseEvents = function() {
            var t = this.scene.game.stage
              , e = this.scene.game.canvas
              , i = this.onMouseMove.bind(this)
              , n = this.onMouseDown.bind(this)
              , r = this.onMouseUp.bind(this);
            t.addEventListener("stagemousemove", i),
            t.addEventListener("stagemousedown", n),
            t.addEventListener("stagemouseup", r),
            this.mouseMoveListener = i,
            this.mouseDownListener = n,
            this.mouseUpListener = r;
            var o = s.throttle(this.onMouseWheel, 0);
            e.addEventListener("mousewheel", o.bind(this)),
            e.addEventListener("wheel", o.bind(this)),
            e.addEventListener("DOMMouseScroll", o.bind(this)),
            this.mouseWheelListener = o
        }
        ,
        a.onMouseDown = function(t) {
            this.analytics.clicks++,
            2 === t.nativeEvent.button ? this.secondaryTouch.down === !1 && (this.updatePosition(t, this.secondaryTouch),
            this.secondaryTouch.down = !0) : this.touch.down === !1 && (this.updatePosition(t, this.touch),
            this.touch.down = !0)
        }
        ,
        a.disableContextMenu = function() {
            this.scene.game.canvas.oncontextmenu = function() {
                return !1
            }
        }
        ,
        a.onMouseUp = function(t) {
            2 === t.nativeEvent.button ? this.secondaryTouch.down === !0 && (this.updatePosition(t, this.secondaryTouch),
            this.secondaryTouch.down = !1) : this.touch.down === !0 && (this.updatePosition(t, this.touch),
            this.touch.down = !1)
        }
        ,
        a.updatePosition = function(t, e) {
            e.id = t.pointerID,
            e.type = t.nativeEvent.button;
            var i = e.pos;
            i.x = t.stageX,
            i.y = t.stageY,
            this.updateRealPosition(e)
        }
        ,
        a.updateRealPosition = function(t) {
            var e = (t.old,
            t.pos)
              , i = t.real
              , s = (t.down,
            this.scene)
              , n = s.screen
              , o = s.camera
              , a = n.center
              , h = o.position
              , l = (e.x - a.x) / o.zoom + h.x
              , c = (e.y - a.y) / o.zoom + h.y;
            i.x = r(l),
            i.y = r(c);
            var u = this.scene.settings;
            if (this.scene.toolHandler.options.grid) {
                var p = u.toolHandler.gridSize;
                i.x = r(i.x / p) * p,
                i.y = r(i.y / p) * p
            }
            this.updateCallback
        }
        ,
        a.onMouseWheel = function(t) {
            var t = window.event || t;
            t.preventDefault(),
            t.stopPropagation();
            var e = Math.max(-1, Math.min(1, t.deltaY || -t.detail));
            return 0 == e && (e = Math.max(-1, Math.min(1, t.deltaX || -t.detail))),
            this.wheel = -e,
            !1
        }
        ,
        a.onMouseMove = function(t) {
            this.updatePosition(t, this.touch),
            this.updatePosition(t, this.secondaryTouch)
        }
        ,
        a.update = function() {
            this.enabled && (this.updateTouch(this.touch),
            this.updateTouch(this.secondaryTouch),
            this.updateWheel())
        }
        ,
        a.updateTouch = function(t) {
            var e = t.old
              , i = t.pos
              , s = t.real
              , n = t.down;
            e.pos.x = i.x,
            e.pos.y = i.y,
            e.real.x = s.x,
            e.real.y = s.y,
            !e.down && n && (t.press = !0),
            e.down && !n && (t.release = !0),
            e.press && (t.press = !1),
            e.release && (t.release = !1),
            this.updateRealPosition(t),
            e.down = t.down,
            e.press = t.press,
            e.release = t.release
        }
        ,
        a.updateWheel = function() {
            this.mousewheel = this.wheel,
            this.wheel = !1
        }
        ,
        a.close = function() {
            var t = this.scene.game.stage
              , e = this.scene.game.canvas;
            t.removeAllEventListeners(),
            e.removeEventListener("mousewheel", this.mouseWheelListener),
            e.removeEventListener("DOMMouseScroll", this.mouseWheelListener),
            this.touches = null,
            this.touch = null,
            this.scene = null,
            this.wheel = null,
            this.mouseMoveListener = null,
            this.mouseDownListener = null,
            this.mouseUpListener = null
        }
        ,
        e.exports = o
    }