/* MODULE ID: 58 */
function canvaspool(t, e) {
        function i(t) {
            this.options = t,
            this.canvasPool = [],
            t.screen && (this.setToScreen = !0,
            this.update()),
            t.cap && (this.setToScreen = !1,
            this.poolCap = t.cap)
        }
        var s = Math.floor
          , n = Math.ceil;
        i.prototype = {
            canvasPool: null,
            poolCap: 5e3,
            setToScreen: !0,
            options: null,
            update: function() {
                this.setToScreen && (this.getPoolCapFromScreen(),
                this.cleanPool())
            },
            getPoolCapFromScreen: function() {
                var t = this.options
                  , e = t.settings
                  , i = t.screen
                  , r = (this.options.width,
                this.options.height,
                i.width)
                  , o = i.height
                  , a = t.camera
                  , h = a.zoom
                  , l = s(e.drawSectorSize * h)
                  , c = n(r / l)
                  , u = n(o / l);
                this.poolCap = c * u + c + u
            },
            getCanvas: function() {
                var t = this.canvasPool.pop();
                return null == t && (t = document.createElement("canvas")),
                t
            },
            releaseCanvas: function(t) {
                this.canvasPool.length < this.poolCap && this.canvasPool.push(t)
            },
            cleanPool: function() {
                this.canvasPool.length > this.poolCap && (this.canvasPool = this.canvasPool.slice(0, this.poolCap + 1))
            }
        },
        e.exports = i
    }