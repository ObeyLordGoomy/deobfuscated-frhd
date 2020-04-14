/* MODULE ID: 7 */
function redoundo(t, e) {
        function i(t) {
            this.initialize(t)
        }
        var s = t("./controls")
          , n = i.prototype = new s;
        n.name = "redo_undo_controls",
        n.controlsSpriteSheetData = {
            frames: [[78, 2, 76, 76], [2, 2, 76, 76]],
            animations: {
                redo: [0],
                undo: [1]
            }
        },
        n.controlData = {
            redo: {
                keys: ["ctrl", "y"],
                top: 60,
                right: 160
            },
            undo: {
                keys: ["ctrl", "z"],
                top: 60,
                right: 240
            }
        },
        n.addControls = function() {
            var t = new createjs.Container;
            t.addChild(this.createControl("redo")),
            t.addChild(this.createControl("undo")),
            this.controlsContainer = t,
            this.stage.addChild(t)
        }
        ,
        n.update = function() {
            var t = this.scene
              , e = this.scene.state.paused;
            t.controls && this.controlsContainer.visible !== e && (this.controlsContainer.visible = e)
        }
        ,
        e.exports = i
    }