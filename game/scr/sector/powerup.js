/* MODULE ID: 19 */
function powerup(t, e) {
        function i() {}
        var s = (t("../math/cartesian"),
        Math.PI,
        Math.sqrt)
          , n = Math.pow
          , r = i.prototype;
        r.init = function(t) {
            this.game = t.scene.game,
            this.scene = t.scene,
            this.settings = this.game.settings,
            this.remove = !1
        }
        ,
        r.scene = null,
        r.angle = 0,
        r.x = 0,
        r.y = 0,
        r.name = null,
        r.sector = null,
        r.settings = null,
        r.remove = !1,
        r.getCode = function() {}
        ,
        r.draw = function() {}
        ,
        r.erase = function(t, e) {
            var i = !1;
            if (!this.remove) {
                var r = s(n(t.x - this.x, 2) + n(t.y - this.y, 2));
                e >= r && (i = [this],
                this.removeAllReferences())
            }
            return i
        }
        ,
        r.removeAllReferences = function() {
            this.remove = !0,
            this.sector && (this.sector.powerupCanvasDrawn = !1,
            this.sector.dirty = !0,
            this.sector = null),
            this.scene.track.cleanPowerups()
        }
        ,
        r.collide = function(t) {
            var e = t.pos.x - this.x
              , i = t.pos.y - this.y
              , r = s(n(e, 2) + n(i, 2));
            !this.hit && 26 > r && (this.hit = !0,
            this.sector.powerupCanvasDrawn = !1)
        }
        ,
        r.addSectorReference = function(t) {
            this.sector = t
        }
        ,
        e.exports = i
    }