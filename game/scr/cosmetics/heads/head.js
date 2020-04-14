/* MODULE ID: 11 */
function head(t, e) {
        function i() {}
        t("../inventorymanager");
        var s = (Math.atan2,
        i.prototype);
        s.createVersion = function() {
            var t = this.colors
              , e = this.getVersions()
              , i = "";
            for (var s in t)
                t.hasOwnProperty(s) && (i += t[s]);
            this.versionName = i,
            e[i] || (e[i] = {
                dirty: !0,
                canvas: document.createElement("canvas")
            })
        }
        ,
        s.draw = function(t, e, i, s, n, r) {
            var o = this.getCache(n)
              , a = this.getBaseWidth()
              , h = this.getBaseHeight()
              , l = this.getScale()
              , c = this.getDrawOffsetX()
              , u = this.getDrawOffsetY()
              , p = a * n * l
              , d = h * n * l
              , f = c * n - p / 2
              , v = u * n - d / 2
              , g = -1 === r;
            t.translate(e, i),
            t.rotate(s),
            g && t.scale(1, -1),
            t.drawImage(o, f, v, p, d),
            g && t.scale(1, -1),
            t.rotate(-s),
            t.translate(-e, -i)
        }
        ,
        s.getCache = function(t) {
            var e = this.getVersions();
            return e[this.versionName].dirty && this.cache(t),
            e[this.versionName].canvas
        }
        ,
        s.setDirty = function() {
            var t = this.getVersions();
            t[this.versionName].dirty = !0
        }
        ,
        e.exports = i,
        GameInventoryManager && (GameInventoryManager.HeadClass = i)
    }