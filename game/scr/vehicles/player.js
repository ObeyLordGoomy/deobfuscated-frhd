/* MODULE ID: 79 */
function player(t, e) {
        var i = function(t, e) {
            this.id = g++,
            this._scene = t,
            this._game = t.game,
            this._user = e,
            this._settings = t.settings;
            var i = t.settings.startVehicle;
            t.settings.track && (i = t.settings.track.vehicle),
            this._baseVehicleType = i,
            this._gamepad = new n(t),
            this._ghost = !1,
            this._color = e.color ? e.color : "#000000",
            this.setDefaults(),
            this.createBaseVehicle(new s(0,35), 1, new s(0,0))
        };
        e.exports = i;
        var s = t("../math/cartesian")
          , n = t("../utils/gamepad")
          , r = t("./explosion")
          , o = t("./bmx")
          , a = t("./helicopter")
          , h = t("./truck")
          , l = t("./mtb")
          , c = t("./balloon")
          , u = t("./blob")
          , p = Math.sqrt
          , d = Math.pow
          , f = (Math.min,
        Math.max)
          , v = {};
        v.BMX = o,
        v.MTB = l,
        v.HELI = a,
        v.TRUCK = h,
        v.HELI = a,
        v.BALLOON = c,
        v.BLOB = u;
        var g = 0
          , m = function y(t, e) {
            for (var i in e)
                try {
                    t[i] = e[i].constructor == Object ? y(t[i], e[i]) : e[i]
                } catch (s) {
                    t[i] = e[i]
                }
            return t
        };
        i.prototype.getCheckpointCount = function() {
            return this._checkpoints.length
        }
        ,
        i.prototype.setDefaults = function() {
            this._baseVehicle = !1,
            this._tempVehicleType = null,
            this._tempVehicle = !1,
            this._tempVehicleTicks = 0,
            this._temp_vehicle_options = null,
            this._addCheckpoint = !1,
            this._checkpoints = [],
            this._crashed = !1,
            this._effect = !1,
            this._effectTicks = 0,
            this._opacity = 1,
            this.complete = !1,
            this._powerupsConsumed = {
                checkpoints: [],
                targets: [],
                misc: []
            }
        }
        ,
        i.prototype.hasCheckpoints = function() {
            return this._checkpoints.length > 0
        }
        ,
        i.prototype.setColor = function(t) {
            this._color = t
        }
        ,
        i.prototype.dead = function() {
            if (this._crashed = !0,
            this._ghost === !1) {
                var t = this._scene
                  , e = t.settings
                  , i = t.message;
                t.state.playerAlive = this.isAlive(),
                this._checkpoints.length > 0 ? e.mobile ? i.show("Tap to go to checkpoint!", !1, "#000000", "#FFFFFF") : i.show("Press Enter For Checkpoint", !1, "#000000", "#FFFFFF") : e.mobile ? i.show("Tap to Restart!", !1, "#000000", "#FFFFFF") : i.show("Press Enter To Restart", !1, "#000000", "#FFFFFF")
            }
        }
        ,
        i.prototype.setAsGhost = function() {
            this._ghost = !0
        }
        ,
        i.prototype.isGhost = function() {
            return this._ghost
        }
        ,
        i.prototype.isAlive = function() {
            return !this._crashed
        }
        ,
        i.prototype.getTargetsHit = function() {
            return this._powerupsConsumed.targets.length
        }
        ,
        i.prototype.getGamepad = function() {
            return this._gamepad
        }
        ,
        i.prototype.setBaseVehicle = function(t) {
            this._baseVehicleType = t,
            this.reset()
        }
        ,
        i.prototype.createBaseVehicle = function(t, e, i) {
            this._tempVehicle && this._tempVehicle.stopSounds(),
            this._baseVehicle = new v[this._baseVehicleType](this,t,e,i),
            this._tempVehicle = !1,
            this._tempVehicleType = !1,
            this._tempVehicleTicks = 0
        }
        ,
        i.prototype.setTempVehicle = function(t, e, i, s) {
            this._temp_vehicle_options && this._temp_vehicle_options.type === t && (e = this._temp_vehicle_options.ticks + e),
            this._temp_vehicle_options = {
                type: t,
                ticks: e,
                position: i,
                direction: s
            }
        }
        ,
        i.prototype.createTempVehicle = function(t, e, i, s) {
            if (this._temp_vehicle_options) {
                var n = this._temp_vehicle_options;
                t = n.type,
                e = n.ticks,
                i = n.position,
                s = n.direction,
                this._temp_vehicle_options = null
            }
            this._tempVehicleType === t ? this._tempVehicleTicks += e : (this.getActiveVehicle().stopSounds(),
            this._effect = new r(i,this._scene),
            this._effectTicks = 45,
            this._tempVehicleType = t,
            this._tempVehicle = new v[t](this,i,s),
            this._tempVehicleTicks = e)
        }
        ,
        i.prototype.update = function() {
            if (this.complete === !1) {
                var t = this._baseVehicle;
                this._temp_vehicle_options && this.createTempVehicle(),
                this._tempVehicleTicks > 0 && (t = this._tempVehicle,
                this._crashed === !1 && this._tempVehicleTicks--,
                this._tempVehicleTicks <= 0 && this._crashed === !1 && (this._effectTicks = 45,
                this._effect = new r(this._tempVehicle.focalPoint.pos,this._scene),
                this.createBaseVehicle(this._tempVehicle.focalPoint.pos, this._tempVehicle.dir, this._tempVehicle.masses[0].vel),
                t = this._baseVehicle)),
                this._effectTicks > 0 && (this._effectTicks--,
                this._effect.update()),
                t.update(),
                this._addCheckpoint && (this._createCheckpoint(),
                this._addCheckpoint = !1)
            }
        }
        ,
        i.prototype.isInFocus = function() {
            var t = this._scene.camera
              , e = !1;
            return t.playerFocus && t.playerFocus === this && (e = !0),
            e
        }
        ,
        i.prototype.updateOpacity = function() {
            var t = 1
              , e = this._scene.camera;
            if (e.playerFocus && e.playerFocus !== this) {
                var i = this.getDistanceBetweenPlayers(e.playerFocus);
                1200 > i && (t = Math.min(i / 500, 1))
            }
            this._opacity = t
        }
        ,
        i.prototype.drawName = function() {
            var t = this._scene
              , e = (t.settings,
            this._color)
              , i = this._user.d_name
              , s = t.game
              , n = t.camera.zoom
              , r = s.pixelRatio
              , o = s.canvas
              , a = o.getContext("2d")
              , h = this._opacity
              , l = this.getActiveVehicle()
              , c = l.focalPoint.pos.toScreen(t);
            a.globalAlpha = h,
            a.beginPath(),
            a.fillStyle = e,
            a.moveTo(c.x, c.y - 40 * n),
            a.lineTo(c.x - 5 * n, c.y - 50 * n),
            a.lineTo(c.x + 5 * n, c.y - 50 * n),
            a.lineTo(c.x, c.y - 40 * n),
            a.fill();
            var u = 9 * r * f(n, 1);
            a.font = u + "pt helsinki",
            a.textAlign = "center",
            a.fillStyle = e,
            a.fillText(i, c.x, c.y - 60 * n),
            a.globalAlpha = 1
        }
        ,
        i.prototype.draw = function() {
            this.updateOpacity();
            var t = this._baseVehicle;
            this._tempVehicleTicks > 0 && (t = this._tempVehicle),
            this._effectTicks > 0 && this._effect.draw(this._effectTicks / 100),
            t.draw(),
            this.isGhost() && this.drawName()
        }
        ,
        i.prototype.checkKeys = function() {
            var t = this._gamepad
              , e = this._ghost
              , i = this._scene;
            if (e === !1 && (t.areKeysDown() && !this._crashed && i.play(),
            t.isButtonDown("restart") && (i.restartTrack = !0,
            t.setButtonUp("restart")),
            (t.isButtonDown("up") || t.isButtonDown("down") || t.isButtonDown("left") || t.isButtonDown("right")) && i.camera.focusOnMainPlayer()),
            t.isButtonDown("enter") && (this.gotoCheckpoint(),
            t.setButtonUp("enter")),
            t.isButtonDown("backspace")) {
                var s = t.getButtonDownOccurances("backspace");
                this.removeCheckpoint(s),
                t.setButtonUp("backspace")
            }
        }
        ,
        i.prototype.getDistanceBetweenPlayers = function(t) {
            var e = t.getActiveVehicle()
              , i = this.getActiveVehicle()
              , s = e.focalPoint.pos.x - i.focalPoint.pos.x
              , n = e.focalPoint.pos.y - i.focalPoint.pos.y;
            return p(d(s, 2) + d(n, 2))
        }
        ,
        i.prototype.getActiveVehicle = function() {
            var t = this._baseVehicle;
            return this._tempVehicleTicks > 0 && (t = this._tempVehicle),
            t
        }
        ,
        i.prototype._createCheckpoint = function() {
            var t = {};
            this._tempVehicleTicks > 0 ? (t._tempVehicleType = this._tempVehicleType,
            t._tempVehicle = JSON.stringify(this._tempVehicle, this._snapshotFilter),
            t._tempVehicleTicks = this._tempVehicleTicks) : (t._baseVehicleType = this._baseVehicleType,
            t._baseVehicle = JSON.stringify(this._baseVehicle, this._snapshotFilter)),
            t._powerupsConsumed = JSON.stringify(this._powerupsConsumed),
            t._crashed = this._crashed,
            this._checkpoints.push(t)
        }
        ,
        i.prototype._snapshotFilter = function(t, e) {
            switch (t) {
            case "parent":
            case "player":
            case "scene":
            case "settings":
            case "masses":
            case "springs":
            case "focalPoint":
            case "gamepad":
                return void 0;
            case "explosion":
                return !1;
            default:
                return e
            }
        }
        ,
        i.prototype.setCheckpointOnUpdate = function() {
            this._addCheckpoint = !0
        }
        ,
        i.prototype.crashed = function() {
            this._crashed = !0
        }
        ,
        i.prototype.gotoCheckpoint = function() {
            var t = this._gamepad
              , e = t.replaying
              , i = this._scene;
            if (this._checkpoints.length > 0) {
                var s = this._checkpoints[this._checkpoints.length - 1];
                if (s._tempVehicle) {
                    this._baseVehicle.stopSounds();
                    var n = this._tempVehicle;
                    this._tempVehicleType !== s._tempVehicleType && (n = new v[s._tempVehicleType](this,{
                        x: 0,
                        y: 0
                    }));
                    var r = JSON.parse(s._tempVehicle);
                    m(n, r),
                    this._tempVehicle = n,
                    this._tempVehicleType = s._tempVehicleType,
                    this._tempVehicleTicks = s._tempVehicleTicks,
                    n.updateCameraFocalPoint()
                } else {
                    var n = this._baseVehicle
                      , r = JSON.parse(s._baseVehicle);
                    m(n, r),
                    this._tempVehicle && this._tempVehicle.stopSounds(),
                    this._baseVehicle = n,
                    this._tempVehicleTicks = 0,
                    this._tempVehicleType = !1,
                    n.updateCameraFocalPoint()
                }
                if (this._powerupsConsumed = JSON.parse(s._powerupsConsumed),
                this._crashed = s._crashed,
                e === !1) {
                    var o = i.settings;
                    i.state.playerAlive = this.isAlive(),
                    i.settings.mobile ? i.message.show("Tap to resume", 5, "#826cdc", "#FFFFFF") : i.message.show("Press Backspace To Go Back Further", 5, "#826cdc", "#FFFFFF"),
                    i.track.updatePowerupState(this),
                    o.waitAtCheckpoints && (i.state.playing = !1),
                    i.camera.focusOnMainPlayer()
                }
                i.camera.playerFocus === this && i.camera.fastforward()
            } else
                e === !1 && this.restartScene()
        }
        ,
        i.prototype.restartScene = function() {
            var t = this._gamepad
              , e = t.replaying;
            e === !1 && (this._scene.restartTrack = !0)
        }
        ,
        i.prototype.removeCheckpoint = function(t) {
            if (this._checkpoints.length > 1) {
                for (var e = 0; t > e; e++)
                    this._checkpoints.pop();
                this.gotoCheckpoint()
            } else
                this.restartScene()
        }
        ,
        i.prototype.close = function() {
            this.id = null,
            this._scene = null,
            this._game = null,
            this._user = null,
            this._settings = null,
            this._baseVehicleType = null,
            this._gamepad.close(),
            this._gamepad = null,
            this._baseVehicle = null,
            this._tempVehicleType = null,
            this._tempVehicle = null,
            this._tempVehicleTicks = null,
            this._addCheckpoint = null,
            this._checkpoints = null,
            this._crashed = null,
            this._effect = null,
            this._effectTicks = null,
            this._powerupsConsumed = null
        }
        ,
        i.prototype.reset = function() {
            this._tempVehicle && this._tempVehicle.stopSounds(),
            this._baseVehicle.stopSounds(),
            this.setDefaults(),
            this.createBaseVehicle(new s(0,35), 1, new s(0,0)),
            this._gamepad.reset(),
            this._scene.state.playerAlive = this.isAlive()
        }
    }