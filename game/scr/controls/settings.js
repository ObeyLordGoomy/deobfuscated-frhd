/* MODULE ID: 8 */
function settings(t, e) {
        function i(t) {
            var e = t.settings;
            if (e.fullscreenAvailable === !1) {
                var i = this.controlData["settings_btn-hover"];
                i.top = 60,
                i.right = 150
            }
            this.initialize(t)
        }
        var s = t("./controls")
          , n = i.prototype = new s;
        n.name = "settings_controls",
        n.controlsSpriteSheetData = {
            frames: [[78, 2, 76, 76], [2, 2, 76, 76]],
            animations: {
                "settings_btn-hover": [0],
                settings_btn: [1]
            }
        },
        n.controlData = {
            "settings_btn-hover": {
                top: 60,
                right: 230,
                key: "settings"
            }
        },
        n.update = function() {}
        ,
        n.addControls = function() {
            var t = new createjs.Container;
            t.addChild(this.createControl("settings_btn-hover")),
            this.controlsContainer = t,
            this.stage.addChild(t)
        }
        ,
        e.exports = i
    }