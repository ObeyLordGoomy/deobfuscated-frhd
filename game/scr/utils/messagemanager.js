/* MODULE ID: 62 */
function messagemanager(t, e) {
        function i(t) {
            this.scene = t,
            this.message = !1,
            this.timeout = !1,
            this.color = "#000"
        }
        var s = i.prototype;
        s.message = null,
        s.timeout = null,
        s.draw = function() {
            var t = this.message
              , e = this.timeout
              , i = this.color
              , s = this.outline;
            if (e !== !1 && 0 >= e && (t = !1),
            this.scene.state.paused && (i = !1,
            s = !1,
            t = this.scene.settings.mobile ? "Paused" : "Paused - Press Spacebar to Continue"),
            i === !1 && (i = "#333333"),
            t) {
                var n = this.scene.game
                  , r = this.scene
                  , o = n.pixelRatio
                  , a = n.canvas.getContext("2d")
                  , h = r.screen.center.x
                  , l = 100
                  , c = r.settings;
                "phone" === c.controls && (l = 80),
                a.save(),
                a.fillStyle = i,
                a.lineWidth = 4 * (o / 2),
                a.font = 12 * o + "pt helsinki",
                a.textAlign = "center",
                s && (a.strokeStyle = s,
                a.strokeText(t, h, l * o),
                a.strokeStyle = "#000"),
                a.fillText(t, h, l * o),
                a.restore()
            }
        }
        ,
        s.show = function(t, e, i, s) {
            this.message = t,
            this.timeout = e,
            this.color = i,
            this.outline = s
        }
        ,
        s.hide = function() {
            this.message = !1,
            this.color = !1,
            this.outline = !1
        }
        ,
        s.update = function() {
            this.timeout !== !1 && this.timeout--
        }
        ,
        e.exports = i
    }