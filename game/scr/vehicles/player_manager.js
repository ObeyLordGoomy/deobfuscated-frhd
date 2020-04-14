/* MODULE ID: 80 */
function player_manager(t, e) {
        var i = function(t) {
            this.scene = t,
            this.game = t.game,
            this.settings = t.settings,
            this.firstPlayer = null,
            this._players = [],
            this._playerLookup = {}
        };
        e.exports = i;
        var s = t("./player");
        i.prototype.update = function() {
            for (var t = this._players, e = t.length, i = 0; e > i; i++)
                t[i].update()
        }
        ,
        i.prototype.mutePlayers = function() {
            for (var t = this._players, e = t.length, i = 0; e > i; i++) {
                var s = t[i].getActiveVehicle();
                s.stopSounds()
            }
        }
        ,
        i.prototype.updateGamepads = function() {
            for (var t = this._players, e = t.length, i = 0; e > i; i++)
                t[i]._gamepad.update()
        }
        ,
        i.prototype.createPlayer = function(t, e) {
            return new s(this.scene,e)
        }
        ,
        i.prototype.addPlayer = function(t) {
            this._players.push(t),
            this._playerLookup[t.id] = t
        }
        ,
        i.prototype.checkKeys = function() {
            for (var t = this._players, e = t.length, i = 0; e > i; i++)
                t[i].checkKeys()
        }
        ,
        i.prototype.draw = function() {
            for (var t = this._players, e = t.length, i = 0; e > i; i++)
                t[i].draw()
        }
        ,
        i.prototype.getPlayerByIndex = function(t) {
            return this._players[t]
        }
        ,
        i.prototype.getPlayerById = function(t) {
            return this._playerLookup[t]
        }
        ,
        i.prototype.getPlayerCount = function() {
            return this._players.length
        }
        ,
        i.prototype.reset = function() {
            for (var t = this._players, e = t.length, i = 0; e > i; i++)
                t[i].reset()
        }
        ,
        i.prototype.clear = function() {
            this._players = [],
            this._playerLookup = {},
            this._players.push(this.firstPlayer),
            this._playerLookup[this.firstPlayer.id] = this.firstPlayer
        }
        ,
        i.prototype._closePlayers = function() {
            for (var t = this._players, e = t.length, i = 0; e > i; i++)
                t[i].close()
        }
        ,
        i.prototype.close = function() {
            this._closePlayers(),
            this._players = null,
            this.firstPlayer = null,
            this._playerLookup = null,
            this.scene = null,
            this.game = null,
            this.settings = null
        }
    }