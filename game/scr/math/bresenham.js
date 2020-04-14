/* MODULE ID: 13 */
function bresenham(t, e) {
        function i(t, e, i, a, h) {
            var l = []
              , c = t
              , u = e
              , p = (a - e) / (i - t)
              , d = i > t ? 1 : -1
              , f = a > e ? 1 : -1
              , v = 0;
            l.push(t, e);
            do {
                var g = n(c / h) == n(i / h)
                  , m = n(u / h) == n(a / h);
                if (g && m)
                    break;
                var y = 0
                  , w = 0;
                y = s(n(c / h + d) * h),
                0 > d && (y = s(r((c + 1) / h + d) * h) - 1),
                w = s(e + (y - t) * p);
                var x = 0
                  , _ = 0;
                _ = s(n(u / h + f) * h),
                0 > f && (_ = s(r((u + 1) / h + f) * h) - 1),
                x = s(t + (_ - e) / p),
                o(y - t, 2) + o(w - e, 2) < o(x - t, 2) + o(_ - e, 2) ? (c = y,
                u = w,
                l.push(y, w)) : (c = x,
                u = _,
                l.push(x, _))
            } while (v++ < 5e3);return l
        }
        var s = (t("./cartesian"),
        Math.round)
          , n = Math.floor
          , r = Math.ceil
          , o = Math.pow;
        e.exports = i
    }