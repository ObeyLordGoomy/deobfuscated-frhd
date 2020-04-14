/* MODULE ID: 4 */
function fullscreen(t, e) {
        function i(t) {
            this.initialize(t)
        }
        var s = t("./controls")
          , n = i.prototype = new s;
        n.name = "fullscreen_controls",
        n.fullscreenControl = null,
        n.fullscreen = !1,
        n.controlsSpriteSheetData = {
            frames: [[230, 2, 76, 76], [154, 2, 76, 76], [78, 2, 76, 76], [2, 2, 76, 76]],
            animations: {
                "exit_fullscreen_btn-hover": [0],
                exit_fullscreen_btn: [1],
                "fullscreen_btn-hover": [2],
                fullscreen_btn: [3]
            }
        },
        n.controlData = {
            "fullscreen_btn-hover": {
                top: 60,
                right: 150,
                key: "fullscreen"
            }
        },
        n.update = function() {
            var t = this.scene.settings.fullscreen;
            this.fullscreen !== t && (this.fullscreenControl.gotoAndStop(t ? "exit_fullscreen_btn-hover" : "fullscreen_btn-hover"),
            this.fullscreen = t)
        }
        ,
        n.addControls = function() {
            var t = new createjs.Container;
            t.addChild(this.createControl("fullscreen_btn-hover")),
            this.controlsContainer = t,
            this.fullscreenControl = t.getChildByName("fullscreen_btn-hover"),
            this.stage.addChild(t)
        }
        ,
        e.exports = i
    }