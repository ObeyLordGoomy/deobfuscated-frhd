/* MODULE ID: 5 */
function pause(t, e) {
        function i(t) {
            this.initialize(t)
        }
        var s = t("./controls")
          , n = i.prototype = new s;
        n.name = "pause_controls",
        n.pauseControl = null,
        n.paused = !1,
        n.controlsSpriteSheetData = {
            frames: [[230, 2, 76, 76], [154, 2, 76, 76], [78, 2, 76, 76], [2, 2, 76, 76]],
            animations: {
                "pause_btn-hover": [0],
                pause_btn: [1],
                "play_btn-hover": [2],
                play_btn: [3]
            }
        },
        n.controlData = {
            "pause_btn-hover": {
                key: "pause",
                top: 60,
                right: 70
            }
        },
        n.update = function() {
            var t = this.scene.state.paused;
            this.paused !== t && (t ? (this.pauseControl.gotoAndStop("play_btn-hover"),
            this.paused = !0) : (this.pauseControl.gotoAndStop("pause_btn-hover"),
            this.paused = !1))
        }
        ,
        n.addControls = function() {
            var t = new createjs.Container;
            t.addChild(this.createControl("pause_btn-hover")),
            this.controlsContainer = t,
            this.pauseControl = t.getChildByName("pause_btn-hover"),
            this.stage.addChild(t)
        }
        ,
        e.exports = i
    }