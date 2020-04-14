/* MODULE ID: 87 */
function camera(t, e) {
        function i(t) {
            var e = t.settings;
            this.settings = e,
            this.scene = t,
            this.zoom = e.cameraStartZoom * t.game.pixelRatio,
            this.desiredZoom = e.cameraStartZoom * t.game.pixelRatio,
            this.zooming = !1,
            this.position = new s(0,0),
            this.zoomPercentage = this.getZoomAsPercentage(),
            this.zoomPoint = !1
        }
        var s = t("../math/cartesian")
          , n = Math.round
          , r = Math.abs
          , o = Math.sqrt
          , a = Math.pow;
        i.prototype = {
            settings: null,
            scene: null,
            zoom: 1,
            position: null,
            desiredZoom: 1,
            zoomPercentage: 0,
            focusIndex: 0,
            playerFocus: null,
            focusOnNextPlayer: function() {
                var t = this.scene.playerManager.getPlayerCount();
                this.focusIndex = (this.focusIndex + 1) % t,
                this.focusOnPlayer()
            },
            focusOnPlayer: function() {
                var t = this.scene
                  , e = t.playerManager
                  , i = e.getPlayerCount();
                i <= this.focusIndex && (this.focusIndex = 0);
                var s = e.getPlayerByIndex(this.focusIndex);
                if (this.playerFocus !== s) {
                    var n = this.playerFocus;
                    if (this.playerFocus = s,
                    t.vehicleTimer.setPlayer(s),
                    n) {
                        var r = s.getDistanceBetweenPlayers(n);
                        r > 1500 && this.fastforward()
                    } else
                        this.fastforward()
                }
            },
            focusOnMainPlayer: function() {
                0 === this.focusIndex && this.playerFocus || (this.focusIndex = 0,
                this.focusOnPlayer())
            },
            update: function() {
                if (this.playerFocus) {
                    var t = this.playerFocus.getActiveVehicle()
                      , e = t.focalPoint
                      , i = this.position
                      , s = 3
                      , n = e.pos.x - i.x
                      , r = e.pos.y - i.y
                      , h = o(a(n, 2) + a(r, 2));
                    h > 1500 && (s = 1),
                    i.x += (e.pos.x - i.x) / s,
                    i.y += (e.pos.y - i.y) / s
                }
            },
            updateZoom: function() {
                var t = this.zoom
                  , e = this.desiredZoom;
                t !== e && (this.scene.loading = !0,
                this._performZoom(),
                this.zoom === this.desiredZoom && this.zoomComplete())
            },
            zoomToPoint: function(t) {
                var e = (this.zoom,
                this.scene)
                  , i = e.screen
                  , s = this.position
                  , n = this.zoomPoint
                  , r = i.toReal(n.x, "x")
                  , o = i.toReal(n.y, "y")
                  , a = n.x / i.width
                  , h = n.y / i.height
                  , l = i.width / t
                  , c = i.height / t;
                s.x = r - l * a + l / 2,
                s.y = o - c * h + c / 2
            },
            _performZoom: function() {
                var t = this.scene
                  , e = (t.screen,
                this.position,
                this.zoom)
                  , i = this.desiredZoom
                  , s = i - e
                  , n = s / 3;
                e += n,
                r(s) < .05 && (e = i),
                this.zoomPoint && this.zoomToPoint(e),
                this.zoom = e
            },
            zoomComplete: function() {
                this.scene.redraw(),
                this.zooming = !1,
                this.scene.loading = !1
            },
            setZoom: function(t, e) {
                var i = this.scene;
                this.desiredZoom = n(t * i.game.pixelRatio * 10) / 10,
                this.zooming = !0,
                this.desiredZoom === this.zoom && (this.zooming = !1,
                this.scene.state.loading = !1),
                this.zoomPoint = !1,
                null === this.playerFocus && e && (this.zoomPoint = e),
                this.zoomPercentage = this.getZoomAsPercentage(),
                i.stateChanged()
            },
            resetZoom: function() {
                var t = this.settings.cameraStartZoom;
                this.setZoom(t)
            },
            getZoomAsPercentage: function() {
                var t = this.scene.settings
                  , e = this.desiredZoom / this.scene.game.pixelRatio / t.cameraStartZoom * 100;
                return 0 | e
            },
            increaseZoom: function() {
                var t = this.scene.settings
                  , e = t.cameraSensitivity
                  , i = this.desiredZoom + 2 * e
                  , s = this.scene.game.pixelRatio
                  , n = t.cameraZoomMax
                  , r = n * s;
                this.setZoom(i / s),
                this.desiredZoom > r && this.setZoom(n)
            },
            decreaseZoom: function() {
                var t = this.scene.settings
                  , e = t.cameraSensitivity
                  , i = this.desiredZoom - 2 * e
                  , s = this.scene.game.pixelRatio
                  , n = t.cameraZoomMin
                  , r = n * s;
                this.setZoom(i / s),
                this.desiredZoom < r && this.setZoom(n)
            },
            unfocus: function() {
                this.playerFocus = null,
                this.scene.vehicleTimer.removePlayer()
            },
            fastforward: function() {
                if (this.playerFocus) {
                    var t = this.playerFocus.getActiveVehicle()
                      , e = t.focalPoint;
                    this.position.x = e.pos.x,
                    this.position.y = e.pos.y
                }
            },
            close: function() {
                this.zoom = null,
                this.scene = null,
                this.position = null,
                this.playerFocus = null
            }
        },
        e.exports = i
    }