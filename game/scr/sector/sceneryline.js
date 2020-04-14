/* MODULE ID: 28 */
function sceneryline(t, e) {
        function i(t, e, i, n) {
            this.p1 = new s(t,e),
            this.p2 = new s(i,n),
            this.pp = this.p2.sub(this.p1),
            this.len = this.pp.len(),
            this.sectors = []
        }
        var s = t("../math/cartesian")
          , n = Math.sqrt
          , r = (Math.pow,
        Math.round,
        Math.floor);
        i.prototype = {
            sectors: null,
            p1: null,
            p2: null,
            pp: null,
            len: 0,
            collided: !1,
            remove: !1,
            recorded: !1,
            getCode: function(t) {
                this.recorded = !0;
                var e = this.p2
                  , i = " " + e.x.toString(32) + " " + e.y.toString(32)
                  , s = this.checkForConnectedLine(t, e);
                return s && (i += s.getCode(t)),
                i
            },
            checkForConnectedLine: function(t, e) {
                var i = t.settings.drawSectorSize
                  , s = t.sectors.drawSectors
                  , n = r(e.x / i)
                  , o = r(e.y / i);
                return s[n][o].searchForLine("sceneryLines", e)
            },
            erase: function(t, e) {
                var i = !1;
                if (!this.remove) {
                    var s = this.p1
                      , r = this.p2
                      , o = t
                      , a = e
                      , h = r.sub(s)
                      , l = s.sub(o)
                      , c = h.dot(h)
                      , u = 2 * l.dot(h)
                      , p = l.dot(l) - a * a
                      , d = u * u - 4 * c * p;
                    if (d > 0) {
                        d = n(d);
                        var f = (-u - d) / (2 * c)
                          , v = (-u + d) / (2 * c);
                        f >= 0 && 1 >= f && (i = !0,
                        this.removeAllReferences()),
                        v >= 0 && 1 >= v && (i = !0,
                        this.removeAllReferences())
                    }
                    this.intersects(this.p1.x, this.p1.y, t.x, t.y, e) ? (i = !0,
                    this.removeAllReferences()) : this.intersects(this.p2.x, this.p2.y, t.x, t.y, e) && (i = !0,
                    this.removeAllReferences())
                }
                return i
            },
            intersects: function(t, e, i, s, n) {
                var r = t - i
                  , o = e - s;
                return n * n >= r * r + o * o
            },
            addSectorReference: function(t) {
                this.sectors.push(t)
            },
            removeAllReferences: function() {
                this.remove = !0;
                for (var t = this.sectors, e = t.length, i = 0; e > i; i++)
                    t[i].drawn = !1,
                    t[i].dirty = !0;
                this.sectors = []
            }
        },
        e.exports = i
    }