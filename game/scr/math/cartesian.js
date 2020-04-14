/* MODULE ID: 14 */
function cartesian(t, e) {
        function i(t, e) {
            this.x = t,
            this.y = e
        }
        var s = Math.sqrt
          , n = Math.pow
          , r = (Math.round,
        Math.atan2)
          , o = Math.PI;
        i.prototype = {
            x: 0,
            y: 0,
            toReal: function(t) {
                var e = t.camera
                  , s = t.screen
                  , n = (this.x - s.center.x) / e.zoom + e.position.x
                  , r = (this.y - s.center.y) / e.zoom + e.position.y;
                return new i(n,r)
            },
            toScreen: function(t) {
                var e = t.camera
                  , s = t.screen
                  , n = (this.x - e.position.x) * e.zoom + s.center.x
                  , r = (this.y - e.position.y) * e.zoom + s.center.y;
                return new i(n,r)
            },
            lenSqr: function() {
                return n(this.x, 2) + n(this.y, 2)
            },
            len: function() {
                return s(n(this.x, 2) + n(this.y, 2))
            },
            dot: function(t) {
                return this.x * t.x + this.y * t.y
            },
            factor: function(t) {
                return new i(this.x * t,this.y * t)
            },
            factorSelf: function(t) {
                this.x = this.x * t,
                this.y = this.y * t
            },
            factorOut: function(t, e) {
                e.x = this.x * t,
                e.y = this.y * t
            },
            add: function(t) {
                return new i(this.x + t.x,this.y + t.y)
            },
            inc: function(t) {
                this.x += t.x,
                this.y += t.y
            },
            addOut: function(t, e) {
                e.x = this.x + t.x,
                e.y = this.y + t.y
            },
            sub: function(t) {
                return new i(this.x - t.x,this.y - t.y)
            },
            subOut: function(t, e) {
                e.x = this.x - t.x,
                e.y = this.y - t.y
            },
            subSelf: function(t) {
                this.x = this.x - t.x,
                this.y = this.y - t.y
            },
            equ: function(t) {
                this.x = t.x,
                this.y = t.y
            },
            normalize: function() {
                var t = s(n(this.x, 2) + n(this.y, 2));
                return new i(this.x / t,this.y / t)
            },
            getAngleInDegrees: function(t) {
                var e = t.sub(this)
                  , i = r(e.x, -e.y)
                  , s = i * (180 / o);
                return 0 > s && (s += 360),
                s
            },
            getAngleInRadians: function(t) {
                var e = t.sub(this);
                return r(e.x, -e.y)
            }
        },
        e.exports = i
    }