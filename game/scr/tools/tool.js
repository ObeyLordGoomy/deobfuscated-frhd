/* MODULE ID: 49 */
function tool(t, e) {
        var i = (t("../math/cartesian"),
        Math.round,
        function() {}
        );
        i.prototype = {
            name: "",
            toolhandler: null,
            camera: null,
            mouse: null,
            scene: null,
            init: function(t) {
                this.toolhandler = t,
                this.scene = t.scene,
                this.game = t.scene.game,
                this.camera = t.scene.camera,
                this.mouse = t.scene.mouse,
                this.gamepad = t.gamepad
            },
            press: function() {},
            hold: function() {},
            release: function() {},
            update: function() {
                var t = this.mouse
                  , e = t.touch
                  , i = t.secondaryTouch
                  , s = this.toolhandler.gamepad
                  , n = this.toolhandler.options
                  , r = s.isButtonDown("shift");
                n.rightClickMove && (r = i.old.down),
                r ? (e.old.down || n.rightClickMove) && this.moveCamera() : (e.press && this.press(),
                e.old.down && this.hold(),
                e.release && this.release()),
                t.mousewheel !== !1 && s.isButtonDown("shift") === !1 && this.mousewheel(t.mousewheel)
            },
            moveCamera: function() {
                var t = this.mouse.secondaryTouch
                  , e = t.pos
                  , i = this.camera
                  , s = t.old.pos.sub(e).factor(1 / i.zoom);
                i.position.inc(s)
            },
            draw: function() {},
            reset: function() {},
            mousewheel: function(t) {
                var e = this.scene.settings
                  , i = this.scene.game.pixelRatio
                  , s = e.cameraSensitivity
                  , n = e.cameraZoomMin
                  , r = e.cameraZoomMax
                  , o = n * i
                  , a = r * i
                  , h = this.camera
                  , l = this.mouse.touch
                  , c = h.desiredZoom;
                c += t * s,
                h.setZoom(c / i, l.pos),
                h.desiredZoom < o ? h.setZoom(n, l.pos) : h.desiredZoom > a && h.setZoom(r, l.pos)
            },
            checkKeys: function() {
                var t = this.gamepad
                  , e = this.name.toLowerCase()
                  , i = this.toolhandler;
                t.isButtonDown(e) && (i.setTool(e),
                t.setButtonUp(e))
            },
            getOptions: function() {
                return {}
            },
            close: function() {}
        },
        e.exports = i
    }