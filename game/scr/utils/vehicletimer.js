/* MODULE ID: 69 */
function vehicletimer(t, e) {
        function i(t) {
            this.scene = t,
            this.settings = t.settings,
            this.player = !1,
            this.build_interface(),
            this.createPulseTween()
        }
        var s = t("../../libs/tween")
          , n = i.prototype;
        n.scene = null,
        n.container = null,
        n.cached = !1,
        n.build_interface = function() {
            var t = this.scene.game.pixelRatio
              , e = new createjs.Container
              , i = "helsinki"
              , s = new createjs.Shape;
            s.graphics.setStrokeStyle(5, "round").beginStroke("rgba(242,144,66,1)").beginFill("rgba(242,144,66,0.5)").drawRoundRect(0, 0, 200, 60, 25);
            var n = new createjs.Text("00:00","35px " + i,"#000000");
            n.textAlign = "center",
            n.textBaseline = "middle",
            n.x = 100,
            n.y = 30,
            e.addChild(s),
            e.addChild(n),
            e.visible = !1,
            e.scaleX = e.scaleY = t / 2,
            this.timeText = n,
            this.container = e,
            this.scene.game.stage.addChild(e),
            this.center_container()
        }
        ,
        n.setPlayer = function(t) {
            this.player = t
        }
        ,
        n.removePlayer = function() {
            this.player = !1
        }
        ,
        n.playerAddedTime = function(t) {
            this.player === t && this.createPulseTween()
        }
        ,
        n.createPulseTween = function() {
            var t = this.container
              , e = this.scene.game.pixelRatio
              , i = e / 2
              , n = {
                scale: i
            }
              , r = {
                scale: 1.2 * i
            };
            this.pulse = new s.Tween(n).to(r, 200).repeat(1).yoyo(!0).easing(s.Easing.Cubic.InOut).onUpdate(function() {
                t.scaleX = t.scaleY = this.scale
            }).start()
        }
        ,
        n.center_container = function() {
            var t = this.scene.screen
              , e = this.container;
            e.x = t.width / 2 - 100 * e.scaleX,
            e.y = t.height - 100 * e.scaleY
        }
        ,
        n.update = function() {
            s.update(),
            this.player && this.player._tempVehicleTicks > 0 ? (this.center_container(),
            this.updateTime()) : this.container.visible = !1
        }
        ,
        n.updateTime = function() {
            var t = (this.container,
            this.timeText)
              , e = (this.player,
            this.player._tempVehicleTicks)
              , i = this.scene.settings.drawFPS
              , s = e / i;
            s = s.toFixed(2);
            var n = "";
            10 > s && (n = "0"),
            n += s,
            t.text = n,
            this.container.visible = !0
        }
        ,
        n.close = function() {
            this.container = null,
            this.player = null,
            this.scene = null,
            this.settings = null,
            this.timeText = null
        }
        ,
        e.exports = i
    }