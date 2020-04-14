/* MODULE ID: 60 */
function gamepad(t, e) {
        function i(t) {
            this.scene = t,
            this.tickDownButtons = {},
            this.previousTickDownButtons = {},
            this.downButtons = {},
            this.keymap = {},
            this.records = {},
            this.numberOfKeysDown = 0,
            this.tickNumberOfKeysDown = 0
        }
        var s = t("../../libs/lodash-3.10.1");
        i.prototype = {
            tickDownButtons: null,
            previousTickDownButtons: null,
            downButtons: null,
            paused: !1,
            keymap: null,
            records: null,
            keysToRecord: null,
            keysToPlay: null,
            recording: !1,
            playback: null,
            numberOfKeysDown: 0,
            tickNumberOfKeysDown: 0,
            replaying: !1,
            listen: function() {
                document.onkeydown = this.handleButtonDown.bind(this),
                document.onkeyup = this.handleButtonUp.bind(this)
            },
            unlisten: function() {
                this.downButtons = {},
                document.onkeydown = function() {}
                ,
                document.onkeyup = function() {}
            },
            pause: function() {
                this.paused = !0
            },
            unpause: function() {
                this.paused = !1
            },
            recordKeys: function(t) {
                this.keysToRecord = t,
                this.recording = !0
            },
            loadPlayback: function(t, e) {
                this.keysToPlay = e,
                this.playback = t,
                this.replaying = !0
            },
            setKeyMap: function(t) {
                var e = {};
                for (var i in t)
                    if (t[i]instanceof Array)
                        for (var s in t[i])
                            e[t[i][s]] = i;
                    else
                        e[t[i]] = i;
                this.keymap = e
            },
            handleButtonDown: function(t) {
                var e = this.getInternalCode(t.keyCode);
                "string" == typeof e && t.preventDefault(),
                this.setButtonDown(e)
            },
            handleButtonUp: function(t) {
                var e = this.getInternalCode(t.keyCode);
                "string" == typeof e && t.preventDefault(),
                this.setButtonUp(e)
            },
            getInternalCode: function(t) {
                var e = this.keymap;
                return e[t] || t
            },
            setButtonsDown: function(t) {
                for (var e = 0, i = t.length; i > e; e++)
                    this.setButtonDown(t[e])
            },
            setButtonUp: function(t) {
                this.downButtons[t] && (this.onButtonUp && this.onButtonUp(t),
                this.downButtons[t] = !1,
                this.numberOfKeysDown--)
            },
            setButtonDown: function(t, e) {
                this.downButtons[t] || (this.onButtonDown && this.onButtonDown(t),
                this.downButtons[t] = e ? e : !0,
                this.numberOfKeysDown++)
            },
            isButtonDown: function(t) {
                var e = !1
                  , i = this.tickDownButtons[t];
                return (i > 0 || 1 == i) && (e = !0),
                e
            },
            getButtonDownOccurances: function(t) {
                var e = 0;
                if (this.isButtonDown(t)) {
                    e = 1;
                    var i = this.tickDownButtons[t];
                    i !== !0 && (e = i)
                }
                return e
            },
            getDownButtons: function() {
                var t = [];
                for (var e in this.tickDownButtons)
                    this.tickDownButtons[e] && t.push(e);
                return t
            },
            reset: function(t) {
                (this.replaying || t) && (this.downButtons = {}),
                this.tickDownButtons = {},
                this.previousTickDownButtons = {},
                this.records = {}
            },
            update: function() {
                this.scene;
                this.replaying && this.updatePlayback(),
                this.previousTickDownButtons = s.merge({}, this.tickDownButtons),
                this.tickDownButtons = s.merge({}, this.downButtons),
                this.tickNumberOfKeysDown = this.numberOfKeysDown,
                this.recording && this.updateRecording()
            },
            areKeysDown: function() {
                for (var t in this.downButtons)
                    if (this.downButtons[t] === !0)
                        return !0;
                return !1
            },
            updatePlayback: function() {
                var t = this.keysToPlay
                  , e = this.playback
                  , i = this.scene.ticks;
                for (var s in t) {
                    var n = t[s]
                      , r = n + "_up"
                      , o = n + "_down";
                    if ("undefined" != typeof e[o] && "undefined" != typeof e[o][i]) {
                        var a = e[o][i];
                        this.setButtonDown(n, a)
                    }
                    "undefined" != typeof e[r] && "undefined" != typeof e[r][i] && this.setButtonUp(n)
                }
            },
            updateRecording: function() {
                var t = this.scene.ticks
                  , e = this.records
                  , i = (this.keymap,
                this.keysToRecord)
                  , s = this.tickDownButtons
                  , n = this.previousTickDownButtons;
                for (var r in i) {
                    var o = i[r];
                    if ("undefined" != typeof s[o]) {
                        var a = s[o]
                          , h = !1;
                        if ("undefined" != typeof n[o] && (h = n[o]),
                        a !== h) {
                            var l = o + "_up"
                              , c = o + "_down"
                              , u = l;
                            a && (u = c),
                            e[u] || (e[u] = []),
                            a || e[c] && -1 !== e[c].indexOf(t) && (t += 1),
                            e[u].push(t)
                        }
                    }
                }
            },
            buttonWasRecentlyDown: function(t) {
                var e = this.records;
                this.replaying && (e = this.playback);
                var i = t + "_down"
                  , s = !1;
                if (e[i]) {
                    var n = this.scene.ticks
                      , r = n
                      , o = e[i]
                      , a = -1;
                    a = this.replaying ? "undefined" != typeof o[r] : o.indexOf(r),
                    -1 !== a && (s = !0)
                }
                return s
            },
            getReplayString: function() {
                return JSON.stringify(this.records)
            },
            encodeReplayString: function(t) {
                var e = this.scene.settings
                  , i = {
                    version: e.replayVersion
                };
                for (var s in t) {
                    var n = t[s];
                    i[s] = "";
                    for (var r in n) {
                        var o = n[r];
                        i[s] += o.toString(32) + " "
                    }
                }
                return i
            },
            close: function() {
                this.unlisten(),
                this.handleButtonUp = null,
                this.handleButtonDown = null,
                this.onButtonDown = null,
                this.onButtonUp = null,
                this.scene = null,
                this.tickDownButtons = null,
                this.downButtons = null,
                this.keymap = null,
                this.records = null,
                this.keysToRecord = null
            }
        },
        e.exports = i
    }