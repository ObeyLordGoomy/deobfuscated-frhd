/* MODULE ID: 3 */
function controls(t, e) {
        function i() {}
        var s = t("../../libs/lodash-3.10.1.js")
          , n = i.prototype;
        n.defaultControlOptions = {
            visible: !0
        },
        n.name = null,
        n.controlsSpriteSheetData = null,
        n.controlData = null,
        n.game = null,
        n.scene = null,
        n.settings = null,
        n.stage = null,
        n.controlsContainer = null,
        n.controlsSprite = null,
        n.gamepad = null,
        n.initialize = function(t) {
            this.scene = t,
            this.game = t.game,
            this.assets = t.assets,
            this.settings = t.settings,
            this.stage = t.game.stage,
            this.mouse = t.mouse,
            this.playerManager = t.playerManager,
            this.createSprite(),
            this.addControls(),
            this.resize()
        }
        ,
        n.addControls = function() {}
        ,
        n.createSprite = function() {
            var t = this.scene.assets.getResult(this.name)
              , e = this.controlsSpriteSheetData;
            e.images = [t];
            var i = new createjs.SpriteSheet(e)
              , s = new createjs.Sprite(i);
            this.controlsSprite = s
        }
        ,
        n.isVisible = function() {
            return this.controlsContainer.visible
        }
        ,
        n.hide = function() {
            this.controlsContainer.visible = !1
        }
        ,
        n.show = function() {
            this.controlsContainer.visible = !0
        }
        ,
        n.setVisibility = function(t) {
            this.controlsContainer.visible = t
        }
        ,
        n.createControl = function(t) {
            var e = this.controlsSprite
              , i = s.extend({}, this.defaultControlOptions, this.controlData[t])
              , n = e.clone();
            n.gotoAndStop(t),
            n.buttonDetails = i,
            n.cursor = "pointer",
            n.on("mousedown", this.controlDown.bind(this)),
            n.on("pressup", this.controlUp.bind(this)),
            n.on("mouseover", this.mouseOver.bind(this)),
            n.on("mouseout", this.mouseOut.bind(this));
            var r = n.getBounds();
            if (n.regX = r.width / 2,
            n.regY = r.height / 2,
            n.alpha = .5,
            n.name = t,
            n.visible = i.visible,
            i.hitArea) {
                var o = i.hitArea
                  , a = new createjs.Shape;
                o.radius ? a.graphics.beginFill("#000").drawCircle(o.x, o.y, o.radius) : a.graphics.beginFill("#000").drawRect(o.x, o.y, o.width, o.height),
                n.hitArea = a
            }
            return n
        }
        ,
        n.mouseOver = function(t) {
            var e = t.target;
            e.alpha = .8,
            this.mouse.enabled = !1
        }
        ,
        n.mouseOut = function(t) {
            var e = t.target;
            e.alpha = .5,
            this.mouse.enabled = !0
        }
        ,
        n.controlDown = function(t) {
            var e = t.target
              , i = e.buttonDetails
              , s = this.playerManager.firstPlayer.getGamepad();
            if (i.key) {
                var n = i.key;
                s.setButtonDown(n)
            }
            if (i.keys)
                for (var r = i.keys, o = r.length, a = 0; o > a; a++) {
                    var n = r[a];
                    s.setButtonDown(n)
                }
            i.downCallback && i.downCallback(t),
            this.settings.mobile && (this.mouse.enabled = !1),
            e.alpha = 1
        }
        ,
        n.controlUp = function(t) {
            var e = t.target
              , i = e.buttonDetails
              , s = this.playerManager.firstPlayer.getGamepad();
            if (i.key) {
                var n = i.key;
                s.setButtonUp(n)
            }
            if (i.keys)
                for (var r = i.keys, o = r.length, a = 0; o > a; a++) {
                    var n = r[a];
                    s.setButtonUp(n)
                }
            i.upCallback && i.upCallback(t),
            this.settings.mobile ? (this.mouse.enabled = !0,
            e.alpha = .5) : e.alpha = .8
        }
        ,
        n.close = function() {}
        ,
        n.update = function() {}
        ,
        n.resize = function() {
            var t = this.scene.game
              , e = (this.scene.screen,
            t.width)
              , i = t.height
              , s = t.pixelRatio
              , n = this.controlsContainer.children;
            for (var r in n) {
                var o = n[r]
                  , a = o.buttonDetails;
                a.bottom && (o.y = i - a.bottom * (s / 2)),
                a.left && (o.x = a.left * (s / 2)),
                a.right && (o.x = e - a.right * (s / 2)),
                a.top && (o.y = a.top * (s / 2)),
                o.scaleX = o.scaleY = s / 2
            }
        }
        ,
        e.exports = i
    }