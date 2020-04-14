/* MODULE ID: 68 */
function soundmanager(t, e) {
        "use strict";
        var i = (Math.min,
        function(t) {
            this.scene = t,
            this.sounds = {}
        }
        );
        i.prototype = {
            sounds: null,
            update: function() {
                var t = createjs.Sound
                  , e = this.scene
                  , i = e.settings;
                t.setMute(e.state.paused || i.soundsEnabled === !1 ? !0 : !1)
            },
            setVolume: function(t, e) {
                this.sounds[t] && (this.sounds[t].volume = e)
            },
            muted: !1,
            mute_all: function() {
                var t = this.sounds;
                for (var e in t)
                    t.hasOwnProperty(e) && (t[e].volume = 0);
                this.muted = !0
            },
            stop_all: function() {
                var t = this.sounds;
                for (var e in t)
                    t.hasOwnProperty(e) && (t[e].volume = 0,
                    t[e].stop())
            },
            play: function(t, e) {
                if ((null === e || "undefined" == typeof e) && (e = 1),
                this.sounds[t])
                    this.sounds[t].volume = e;
                else if (this.scene.settings.soundsEnabled) {
                    var i = createjs.Sound.play(t, {
                        volume: e
                    })
                      , s = this;
                    i.addEventListener("complete", function() {
                        s.sounds[t] = null
                    }),
                    this.sounds[t] = i
                }
            },
            stop: function(t) {
                this.sounds[t] && (this.sounds[t].stop(),
                this.sounds[t] = null)
            },
            close: function() {
                this.sounds = null
            }
        },
        e.exports = i
    }