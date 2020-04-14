/* MODULE ID: 56 */
function track(t, e) {
        function i(t) {
            this.scene = t,
            this.game = t.game,
            this.settings = t.game.settings,
            this.camera = t.camera,
            this.sectors = {},
            this.sectors.drawSectors = [],
            this.sectors.physicsSectors = [],
            this.totalSectors = [],
            this.powerups = [],
            this.powerupsLookupTable = {},
            this.physicsLines = [],
            this.sceneryLines = [],
            this.targets = [],
            this.allowedVehicles = ["MTB", "BMX"],
            this.canvasPool = new P(t),
            this.createPowerupCache()
        }
        var s = t("../math/cartesian")
          , n = t("../sector/physicsline")
          , r = t("../sector/sceneryline")
          , o = t("../math/bresenham")
          , a = t("../sector/sector")
          , h = t("../../libs/lodash-3.10.1")
          , l = Math.floor
          , c = Math.max
          , u = Math.min
          , p = Math.sqrt
          , d = Math.pow
          , f = Math.round
          , v = t("../sector/powerups/bomb")
          , g = t("../sector/powerups/gravity")
          , m = t("../sector/powerups/boost")
          , y = t("../sector/powerups/checkpoint")
          , w = t("../sector/powerups/target")
          , x = t("../sector/powerups/slowmo")
          , _ = t("../sector/powerups/antigravity")
          , b = t("../sector/powerups/teleport")
          , T = t("../sector/vehiclepowerups/helicopter")
          , C = t("../sector/vehiclepowerups/truck")
          , k = t("../sector/vehiclepowerups/balloon")
          , S = t("../sector/vehiclepowerups/blob")
          , P = t("../utils/canvaspool")
          , M = {
            LINE: 1,
            POWERUPS: 2
        }
          , A = [];
        i.prototype = {
            defaultLine: {
                p1: new s(-40,50),
                p2: new s(40,50)
            },
            game: null,
            scene: null,
            camera: null,
            canvas: null,
            canvasPool: null,
            settings: null,
            physicsLines: null,
            sceneryLines: null,
            powerups: null,
            targets: null,
            targetCount: 0,
            sectors: null,
            totalSectors: null,
            allowedVehicles: null,
            dirty: !1,
            createPowerupCache: function() {
                A.push(new m(0,0,0,this)),
                A.push(new x(0,0,this)),
                A.push(new v(0,0,this)),
                A.push(new g(0,0,0,this)),
                A.push(new y(0,0,this)),
                A.push(new w(0,0,this)),
                A.push(new _(0,0,this)),
                A.push(new b(0,0,this)),
                A.push(new T(0,0,0,this)),
                A.push(new C(0,0,0,this)),
                A.push(new k(0,0,0,this)),
                A.push(new S(0,0,0,this))
            },
            recachePowerups: function(t) {
                for (var e in A)
                    A[e].recache(t)
            },
            read: function(t) {
                var e = t.split("#")
                  , i = e[0].split(",")
                  , s = []
                  , n = [];
                if (e.length > 2)
                    var s = e[1].split(",")
                      , n = e[2].split(",");
                else if (e.length > 1)
                    var n = e[1].split(",");
                this.addLines(i, this.addPhysicsLine),
                this.addLines(s, this.addSceneryLine),
                this.addPowerups(n)
            },
            addPowerups: function(t) {
                for (var e = t.length, i = [], s = ((new Date).getTime(),
                0); e > s; s++)
                    if (i = t[s].split(" "),
                    i.length >= 2) {
                        for (var n = [], r = i.length, o = 1; r > o; o++) {
                            var a = parseInt(i[o], 32);
                            n.push(a)
                        }
                        var h = f(n[0])
                          , l = f(n[1])
                          , p = null;
                        switch (i[0]) {
                        case "B":
                            p = new m(h,l,n[2],this),
                            this.addPowerup(p);
                            break;
                        case "S":
                            p = new x(h,l,this),
                            this.addPowerup(p);
                            break;
                        case "O":
                            p = new v(h,l,this),
                            this.addPowerup(p);
                            break;
                        case "G":
                            p = new g(h,l,n[2],this),
                            this.addPowerup(p);
                            break;
                        case "C":
                            p = new y(h,l,this),
                            this.addPowerup(p);
                            break;
                        case "T":
                            p = new w(h,l,this),
                            this.addTarget(p),
                            this.addPowerup(p);
                            break;
                        case "A":
                            p = new _(h,l,this),
                            this.addPowerup(p);
                            break;
                        case "V":
                            var d = n[2]
                              , P = n[3]
                              , M = this.settings.vehiclePowerup.minTime
                              , A = this.settings.vehiclePowerup.maxTime;
                            P = P || M,
                            P = u(P, A),
                            P = c(P, M);
                            var p;
                            switch (d) {
                            case 1:
                                p = new T(h,l,P,this);
                                break;
                            case 2:
                                p = new C(h,l,P,this);
                                break;
                            case 3:
                                p = new k(h,l,P,this);
                                break;
                            case 4:
                                p = new S(h,l,P,this);
                                break;
                            default:
                                continue
                            }
                            this.addPowerup(p);
                            break;
                        case "W":
                            var D = n[0]
                              , I = n[1]
                              , E = n[2]
                              , O = n[3]
                              , z = new b(D,I,this)
                              , j = new b(E,O,this);
                            z.addOtherPortalRef(j),
                            j.addOtherPortalRef(z),
                            this.addPowerup(z),
                            this.addPowerup(j)
                        }
                    }
            },
            addTarget: function(t) {
                this.dirty = !0,
                this.targetCount++,
                this.targets.push(t)
            },
            addPowerup: function(t) {
                var e = this.sectors.drawSectors
                  , i = this.sectors.physicsSectors
                  , s = t.x
                  , n = t.y
                  , r = this.settings.drawSectorSize
                  , o = this.settings.physicsSectorSize;
                this.addRef(s, n, t, M.POWERUPS, i, o);
                var a = this.addRef(s, n, t, M.POWERUPS, e, r);
                return a !== !1 && this.totalSectors.push(a),
                null !== t && (this.powerups.push(t),
                t.id && (this.powerupsLookupTable[t.id] = t)),
                t
            },
            addLines: function(t, e) {
                for (var i = t.length, s = 0; i > s; s++) {
                    var n = t[s].split(" ")
                      , r = n.length;
                    if (r > 3)
                        for (var o = 0; r - 2 > o; o += 2) {
                            var a = parseInt(n[o], 32)
                              , h = parseInt(n[o + 1], 32)
                              , l = parseInt(n[o + 2], 32)
                              , c = parseInt(n[o + 3], 32)
                              , u = a + h + l + c;
                            isNaN(u) || e.call(this, a, h, l, c)
                        }
                }
            },
            addPhysicsLine: function(t, e, i, s) {
                var t = f(t)
                  , e = f(e)
                  , i = f(i)
                  , s = f(s)
                  , r = i - t
                  , o = s - e
                  , a = p(d(r, 2) + d(o, 2));
                if (a >= 2) {
                    var h = new n(t,e,i,s);
                    this.addPhysicsLineToTrack(h)
                }
                return h
            },
            addPhysicsLineToTrack: function(t) {
                for (var e = this.settings.drawSectorSize, i = t.p1, s = t.p2, n = i.x, r = i.y, a = s.x, h = s.y, l = o(n, r, a, h, e), c = this.sectors.drawSectors, u = l.length, p = 0; u > p; p += 2) {
                    var d = l[p]
                      , f = l[p + 1]
                      , v = this.addRef(d, f, t, M.LINE, c, e);
                    v !== !1 && this.totalSectors.push(v)
                }
                for (var g = this.settings.physicsSectorSize, m = o(n, r, a, h, g), y = this.sectors.physicsSectors, w = m.length, p = 0; w > p; p += 2) {
                    var d = m[p]
                      , f = m[p + 1];
                    this.addRef(d, f, t, M.LINE, y, g)
                }
                return this.physicsLines.push(t),
                t
            },
            addSceneryLine: function(t, e, i, s) {
                var t = f(t)
                  , e = f(e)
                  , i = f(i)
                  , s = f(s)
                  , n = i - t
                  , o = s - e
                  , a = p(d(n, 2) + d(o, 2));
                if (a >= 2) {
                    var h = new r(t,e,i,s);
                    this.addSceneryLineToTrack(h)
                }
                return h
            },
            addSceneryLineToTrack: function(t) {
                for (var e = this.settings.drawSectorSize, i = t.p1, s = t.p2, n = i.x, r = i.y, a = s.x, h = s.y, l = o(n, r, a, h, e), c = this.sectors.drawSectors, u = l.length, p = 0; u > p; p += 2) {
                    var d = l[p]
                      , f = l[p + 1]
                      , v = this.addRef(d, f, t, M.LINE, c, e);
                    v !== !1 && this.totalSectors.push(v)
                }
                return this.sceneryLines.push(t),
                t
            },
            addRef: function(t, e, i, s, n, r) {
                var o = l(t / r)
                  , h = l(e / r)
                  , c = !1;
                if (void 0 === n[o] && (n[o] = []),
                void 0 === n[o][h]) {
                    var u = new a(o,h,this);
                    n[o][h] = u,
                    c = u
                }
                switch (s) {
                case M.LINE:
                    n[o][h].addLine(i),
                    i.addSectorReference(n[o][h]);
                    break;
                case M.POWERUPS:
                    n[o][h].addPowerup(i),
                    i.addSectorReference(n[o][h])
                }
                return this.dirty = !0,
                c
            },
            cleanTrack: function() {
                this.cleanLines(),
                this.cleanPowerups()
            },
            cleanLines: function() {
                for (var t = this.physicsLines, e = this.sceneryLines, i = t.length, s = e.length, n = i - 1; n >= 0; n--)
                    t[n].remove && t.splice(n, 1);
                for (var r = s - 1; r >= 0; r--)
                    e[r].remove && e.splice(r, 1)
            },
            cleanPowerups: function() {
                for (var t = this.powerups, e = this.targets, i = this.targets.length, s = t.length, n = (this.powerupsLookupTable,
                s - 1); n >= 0; n--)
                    t[n].remove && t.splice(n, 1);
                for (var r = i - 1; r >= 0; r--)
                    e[r].remove && e.splice(r, 1);
                this.targetCount = e.length
            },
            updatePowerupState: function(t) {
                var e = t._powerupsConsumed;
                this.resetPowerups();
                var i = e.targets
                  , s = e.checkpoints
                  , n = e.misc;
                this.setPowerupStates(i),
                this.setPowerupStates(s),
                this.setPowerupStates(n)
            },
            setPowerupStates: function(t) {
                var e = this.powerupsLookupTable;
                for (var i in t) {
                    var s = t[i]
                      , n = e[s];
                    n.remove && n.id && (delete e[s],
                    delete t[s]),
                    n.hit = !0,
                    n.sector.powerupCanvasDrawn = !1
                }
            },
            getCode: function() {
                this.cleanTrack();
                var t = this.powerups
                  , e = this.physicsLines
                  , i = this.sceneryLines
                  , s = ""
                  , n = e.length
                  , r = i.length
                  , o = t.length;
                if (n > 0) {
                    for (var a in e) {
                        var h = e[a];
                        h.recorded || (s += h.p1.x.toString(32) + " " + h.p1.y.toString(32) + h.getCode(this) + ",")
                    }
                    s = s.slice(0, -1);
                    for (var a in e)
                        e[a].recorded = !1
                }
                if (s += "#",
                r > 0) {
                    for (var l in i) {
                        var h = i[l];
                        h.recorded || (s += h.p1.x.toString(32) + " " + h.p1.y.toString(32) + h.getCode(this) + ",")
                    }
                    s = s.slice(0, -1);
                    for (var l in i)
                        i[l].recorded = !1
                }
                if (s += "#",
                o > 0) {
                    for (var c in t) {
                        var u = t[c]
                          , p = u.getCode();
                        p && (s += p + ",")
                    }
                    s = s.slice(0, -1)
                }
                return s
            },
            resetPowerups: function() {
                var t = this.powerups;
                for (var e in t) {
                    var i = t[e];
                    i.hit && !i.remove && (i.hit = !1,
                    i.sector.powerupCanvasDrawn = !1)
                }
            },
            addDefaultLine: function() {
                var t = this.defaultLine
                  , e = t.p1
                  , i = t.p2;
                this.addPhysicsLine(e.x, e.y, i.x, i.y)
            },
            erase: function(t, e, i) {
                this.dirty = !0;
                for (var s = t.x - e, n = t.y - e, r = t.x + e, o = t.y + e, a = c(s, r), p = u(s, r), d = c(n, o), f = u(n, o), v = this.settings.drawSectorSize, g = l(a / v), m = l(p / v), y = l(d / v), w = l(f / v), x = this.sectors.drawSectors, _ = [], b = m; g >= b; b++)
                    for (var T = w; y >= T; T++)
                        x[b] && x[b][T] && _.push(x[b][T].erase(t, e, i));
                return h.flatten(_)
            },
            drawAndCache: function() {
                for (var t = performance.now(), e = this.totalSectors, i = e.length, s = 0; i > s; s++) {
                    var n = e[s];
                    !function(t) {
                        setTimeout(function() {
                            t.draw(),
                            t.cacheAsImage()
                        }, 250 * s)
                    }(n)
                }
                var r = performance.now();
                console.log("Track :: Time to draw entire track : " + (r - t) + "ms")
            },
            undraw: function() {
                var t = (performance.now(),
                this.totalSectors);
                for (var e in t) {
                    var i = t[e];
                    i.drawn && i.clear(!0)
                }
                var s = this.camera.zoom;
                this.recachePowerups(Math.max(s, 1)),
                this.canvasPool.update()
            },
            collide: function(t) {
                var e = this.settings.physicsSectorSize
                  , i = Math.floor(t.pos.x / e - .5)
                  , s = Math.floor(t.pos.y / e - .5)
                  , n = this.sectors.physicsSectors;
                n[i] && n[i][s] && n[i][s].resetCollided(),
                n[i + 1] && n[i + 1][s] && n[i + 1][s].resetCollided(),
                n[i + 1] && n[i + 1][s + 1] && n[i + 1][s + 1].resetCollided(),
                n[i] && n[i][s + 1] && n[i][s + 1].resetCollided(),
                n[i] && n[i][s] && n[i][s].collide(t),
                n[i + 1] && n[i + 1][s] && n[i + 1][s].collide(t),
                n[i + 1] && n[i + 1][s + 1] && n[i + 1][s + 1].collide(t),
                n[i] && n[i][s + 1] && n[i][s + 1].collide(t)
            },
            getDrawSector: function(t, e) {
                var i = this.settings.drawSectorSize
                  , s = l(t / i)
                  , n = l(e / i)
                  , r = this.sectors.drawSectors
                  , o = !1;
                return "undefined" != typeof r[s] && "undefined" != typeof r[s][n] && (o = r[s][n]),
                o
            },
            draw: function() {
                var t = this.scene
                  , e = t.camera
                  , i = t.screen
                  , s = t.game.canvas.getContext("2d")
                  , n = e.zoom
                  , r = e.position
                  , o = t.screen.center
                  , a = this.settings.drawSectorSize * n
                  , h = r.x * n / a
                  , l = r.y * n / a
                  , c = i.width / a
                  , u = i.height / a
                  , p = u / 2
                  , d = c / 2
                  , f = h - d - 1
                  , v = l - p - 1
                  , g = h + d
                  , m = l + p;
                s.imageSmoothingEnabled = !1,
                s.mozImageSmoothingEnabled = !1,
                s.oImageSmoothingEnabled = !1,
                s.webkitImageSmoothingEnabled = !1;
                for (var y = h * a - o.x, w = l * a - o.y, x = this.totalSectors, _ = x.length, b = 0; _ > b; b++) {
                    var T = x[b]
                      , C = T.row
                      , k = T.column;
                    if (T.dirty && T.cleanSector(),
                    k >= f && g >= k && C >= v && m >= C) {
                        T.drawn === !1 && T.draw(),
                        T.hasPowerups && (T.powerupCanvasDrawn || T.cachePowerupSector());
                        var S = k * a - y
                          , P = C * a - w;
                        if (S = 0 | S,
                        P = 0 | P,
                        s.drawImage(T.canvas, S, P, a, a),
                        T.hasPowerups && T.powerupCanvasDrawn) {
                            var M = T.powerupCanvasOffset * n;
                            s.drawImage(T.powerupCanvas, S - M / 2, P - M / 2, a + M, a + M)
                        }
                    } else
                        T.drawn && T.clear()
                }
            },
            closeSectors: function() {
                for (var t = this.totalSectors, e = t.length, i = 0; e > i; i++)
                    t[i].close()
            },
            close: function() {
                this.scene = null,
                this.closeSectors(),
                this.totalSectors = null,
                this.canvasPool = null,
                this.sectors = null,
                this.physicsLines = null,
                this.sceneryLines = null,
                this.powerups = null,
                this.camera = null
            }
        },
        e.exports = i
    }