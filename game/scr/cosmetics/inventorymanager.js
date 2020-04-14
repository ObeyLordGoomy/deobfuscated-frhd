/* MODULE ID: 12 */
function inventorymanager(t, e) {
        function i() {}
        var s = {}
          , n = {}
          , r = {}
          , o = i.prototype;
        o.getItem = function(t) {
            var e = t.classname
              , i = t.script
              , o = t.options
              , a = t.type;
            s[e] || ("1" === a && (e = "forward_cap",
            o = {
                back: "white"
            }),
            r[i] || (r[i] = !0,
            GameManager.loadFile(i)));
            var h = this.generateID(a, e, o);
            return n[h] || (n[h] = new s[e](o)),
            n[h]
        }
        ,
        o.redraw = function() {
            for (var t in n)
                n.hasOwnProperty(t) && n[t].setDirty()
        }
        ,
        o.generateID = function(t, e, i) {
            var e = t + e;
            if (i)
                for (var s in i)
                    i.hasOwnProperty(s) && (e += i[s]);
            return e
        }
        ,
        o.register = function(t, e) {
            s[t] = e
        }
        ,
        o.clear = function() {}
        ,
        window.GameInventoryManager = new i,
        e.exports = i
    }