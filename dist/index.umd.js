(function (D, a) {
  typeof exports == "object" && typeof module < "u"
    ? a(exports, require("vue"))
    : typeof define == "function" && define.amd
      ? define(["exports", "vue"], a)
      : ((D = typeof globalThis < "u" ? globalThis : D || self),
        a((D.CrucibleSearchPlugin = {}), D.Vue));
})(this, function (D, a) {
  "use strict";
  function gt() {
    return Ne().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function Ne() {
    return typeof navigator < "u" && typeof window < "u"
      ? window
      : typeof globalThis < "u"
        ? globalThis
        : {};
  }
  const vt = typeof Proxy == "function",
    yt = "devtools-plugin:setup",
    _t = "plugin:settings:set";
  let G, ce;
  function Et() {
    var e;
    return (
      G !== void 0 ||
        (typeof window < "u" && window.performance
          ? ((G = !0), (ce = window.performance))
          : typeof globalThis < "u" &&
              !((e = globalThis.perf_hooks) === null || e === void 0) &&
              e.performance
            ? ((G = !0), (ce = globalThis.perf_hooks.performance))
            : (G = !1)),
      G
    );
  }
  function bt() {
    return Et() ? ce.now() : Date.now();
  }
  class wt {
    constructor(t, n) {
      (this.target = null),
        (this.targetQueue = []),
        (this.onQueue = []),
        (this.plugin = t),
        (this.hook = n);
      const o = {};
      if (t.settings)
        for (const c in t.settings) {
          const h = t.settings[c];
          o[c] = h.defaultValue;
        }
      const r = `__vue-devtools-plugin-settings__${t.id}`;
      let d = Object.assign({}, o);
      try {
        const c = localStorage.getItem(r),
          h = JSON.parse(c);
        Object.assign(d, h);
      } catch {}
      (this.fallbacks = {
        getSettings() {
          return d;
        },
        setSettings(c) {
          try {
            localStorage.setItem(r, JSON.stringify(c));
          } catch {}
          d = c;
        },
        now() {
          return bt();
        },
      }),
        n &&
          n.on(_t, (c, h) => {
            c === this.plugin.id && this.fallbacks.setSettings(h);
          }),
        (this.proxiedOn = new Proxy(
          {},
          {
            get: (c, h) =>
              this.target
                ? this.target.on[h]
                : (...l) => {
                    this.onQueue.push({ method: h, args: l });
                  },
          },
        )),
        (this.proxiedTarget = new Proxy(
          {},
          {
            get: (c, h) =>
              this.target
                ? this.target[h]
                : h === "on"
                  ? this.proxiedOn
                  : Object.keys(this.fallbacks).includes(h)
                    ? (...l) => (
                        this.targetQueue.push({
                          method: h,
                          args: l,
                          resolve: () => {},
                        }),
                        this.fallbacks[h](...l)
                      )
                    : (...l) =>
                        new Promise((p) => {
                          this.targetQueue.push({
                            method: h,
                            args: l,
                            resolve: p,
                          });
                        }),
          },
        ));
    }
    async setRealTarget(t) {
      this.target = t;
      for (const n of this.onQueue) this.target.on[n.method](...n.args);
      for (const n of this.targetQueue)
        n.resolve(await this.target[n.method](...n.args));
    }
  }
  function kt(e, t) {
    const n = e,
      o = Ne(),
      r = gt(),
      d = vt && n.enableEarlyProxy;
    if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !d)) r.emit(yt, e, t);
    else {
      const c = d ? new wt(n, r) : null;
      (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
        pluginDescriptor: n,
        setupFn: t,
        proxy: c,
      }),
        c && t(c.proxiedTarget);
    }
  }
  /*!
   * vue-router v4.3.2
   * (c) 2024 Eduardo San Martin Morote
   * @license MIT
   */ const I = typeof document < "u";
  function Rt(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module";
  }
  const P = Object.assign;
  function le(e, t) {
    const n = {};
    for (const o in t) {
      const r = t[o];
      n[o] = V(r) ? r.map(e) : e(r);
    }
    return n;
  }
  const z = () => {},
    V = Array.isArray;
  function b(e) {
    const t = Array.from(arguments).slice(1);
    console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
  }
  const Pe = /#/g,
    St = /&/g,
    Nt = /\//g,
    Pt = /=/g,
    Ct = /\?/g,
    Ce = /\+/g,
    Ot = /%5B/g,
    $t = /%5D/g,
    Oe = /%5E/g,
    At = /%60/g,
    $e = /%7B/g,
    Tt = /%7C/g,
    Ae = /%7D/g,
    xt = /%20/g;
  function ue(e) {
    return encodeURI("" + e)
      .replace(Tt, "|")
      .replace(Ot, "[")
      .replace($t, "]");
  }
  function Vt(e) {
    return ue(e).replace($e, "{").replace(Ae, "}").replace(Oe, "^");
  }
  function fe(e) {
    return ue(e)
      .replace(Ce, "%2B")
      .replace(xt, "+")
      .replace(Pe, "%23")
      .replace(St, "%26")
      .replace(At, "`")
      .replace($e, "{")
      .replace(Ae, "}")
      .replace(Oe, "^");
  }
  function Dt(e) {
    return fe(e).replace(Pt, "%3D");
  }
  function It(e) {
    return ue(e).replace(Pe, "%23").replace(Ct, "%3F");
  }
  function Bt(e) {
    return e == null ? "" : It(e).replace(Nt, "%2F");
  }
  function K(e) {
    try {
      return decodeURIComponent("" + e);
    } catch {
      process.env.NODE_ENV !== "production" &&
        b(`Error decoding "${e}". Using original value`);
    }
    return "" + e;
  }
  const jt = /\/$/,
    Lt = (e) => e.replace(jt, "");
  function de(e, t, n = "/") {
    let o,
      r = {},
      d = "",
      c = "";
    const h = t.indexOf("#");
    let l = t.indexOf("?");
    return (
      h < l && h >= 0 && (l = -1),
      l > -1 &&
        ((o = t.slice(0, l)),
        (d = t.slice(l + 1, h > -1 ? h : t.length)),
        (r = e(d))),
      h > -1 && ((o = o || t.slice(0, h)), (c = t.slice(h, t.length))),
      (o = qt(o ?? t, n)),
      { fullPath: o + (d && "?") + d + c, path: o, query: r, hash: K(c) }
    );
  }
  function Mt(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "");
  }
  function Te(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase())
      ? e
      : e.slice(t.length) || "/";
  }
  function xe(e, t, n) {
    const o = t.matched.length - 1,
      r = n.matched.length - 1;
    return (
      o > -1 &&
      o === r &&
      L(t.matched[o], n.matched[r]) &&
      Ve(t.params, n.params) &&
      e(t.query) === e(n.query) &&
      t.hash === n.hash
    );
  }
  function L(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
  }
  function Ve(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!Ut(e[n], t[n])) return !1;
    return !0;
  }
  function Ut(e, t) {
    return V(e) ? De(e, t) : V(t) ? De(t, e) : e === t;
  }
  function De(e, t) {
    return V(t)
      ? e.length === t.length && e.every((n, o) => n === t[o])
      : e.length === 1 && e[0] === t;
  }
  function qt(e, t) {
    if (e.startsWith("/")) return e;
    if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
      return (
        b(
          `Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`,
        ),
        e
      );
    if (!e) return t;
    const n = t.split("/"),
      o = e.split("/"),
      r = o[o.length - 1];
    (r === ".." || r === ".") && o.push("");
    let d = n.length - 1,
      c,
      h;
    for (c = 0; c < o.length; c++)
      if (((h = o[c]), h !== "."))
        if (h === "..") d > 1 && d--;
        else break;
    return n.slice(0, d).join("/") + "/" + o.slice(c).join("/");
  }
  var Q;
  (function (e) {
    (e.pop = "pop"), (e.push = "push");
  })(Q || (Q = {}));
  var Y;
  (function (e) {
    (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
  })(Y || (Y = {}));
  function Ht(e) {
    if (!e)
      if (I) {
        const t = document.querySelector("base");
        (e = (t && t.getAttribute("href")) || "/"),
          (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
      } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Lt(e);
  }
  const Gt = /^[^#]+#/;
  function Kt(e, t) {
    return e.replace(Gt, "#") + t;
  }
  function Ft(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
      o = e.getBoundingClientRect();
    return {
      behavior: t.behavior,
      left: o.left - n.left - (t.left || 0),
      top: o.top - n.top - (t.top || 0),
    };
  }
  const te = () => ({ left: window.scrollX, top: window.scrollY });
  function Wt(e) {
    let t;
    if ("el" in e) {
      const n = e.el,
        o = typeof n == "string" && n.startsWith("#");
      if (
        process.env.NODE_ENV !== "production" &&
        typeof e.el == "string" &&
        (!o || !document.getElementById(e.el.slice(1)))
      )
        try {
          const d = document.querySelector(e.el);
          if (o && d) {
            b(
              `The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`,
            );
            return;
          }
        } catch {
          b(
            `The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`,
          );
          return;
        }
      const r =
        typeof n == "string"
          ? o
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
      if (!r) {
        process.env.NODE_ENV !== "production" &&
          b(
            `Couldn't find element using selector "${e.el}" returned by scrollBehavior.`,
          );
        return;
      }
      t = Ft(r, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style
      ? window.scrollTo(t)
      : window.scrollTo(
          t.left != null ? t.left : window.scrollX,
          t.top != null ? t.top : window.scrollY,
        );
  }
  function Ie(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
  }
  const he = new Map();
  function zt(e, t) {
    he.set(e, t);
  }
  function Qt(e) {
    const t = he.get(e);
    return he.delete(e), t;
  }
  let Yt = () => location.protocol + "//" + location.host;
  function Be(e, t) {
    const { pathname: n, search: o, hash: r } = t,
      d = e.indexOf("#");
    if (d > -1) {
      let h = r.includes(e.slice(d)) ? e.slice(d).length : 1,
        l = r.slice(h);
      return l[0] !== "/" && (l = "/" + l), Te(l, "");
    }
    return Te(n, e) + o + r;
  }
  function Jt(e, t, n, o) {
    let r = [],
      d = [],
      c = null;
    const h = ({ state: i }) => {
      const m = Be(e, location),
        _ = n.value,
        N = t.value;
      let S = 0;
      if (i) {
        if (((n.value = m), (t.value = i), c && c === _)) {
          c = null;
          return;
        }
        S = N ? i.position - N.position : 0;
      } else o(m);
      r.forEach((E) => {
        E(n.value, _, {
          delta: S,
          type: Q.pop,
          direction: S ? (S > 0 ? Y.forward : Y.back) : Y.unknown,
        });
      });
    };
    function l() {
      c = n.value;
    }
    function p(i) {
      r.push(i);
      const m = () => {
        const _ = r.indexOf(i);
        _ > -1 && r.splice(_, 1);
      };
      return d.push(m), m;
    }
    function s() {
      const { history: i } = window;
      i.state && i.replaceState(P({}, i.state, { scroll: te() }), "");
    }
    function f() {
      for (const i of d) i();
      (d = []),
        window.removeEventListener("popstate", h),
        window.removeEventListener("beforeunload", s);
    }
    return (
      window.addEventListener("popstate", h),
      window.addEventListener("beforeunload", s, { passive: !0 }),
      { pauseListeners: l, listen: p, destroy: f }
    );
  }
  function je(e, t, n, o = !1, r = !1) {
    return {
      back: e,
      current: t,
      forward: n,
      replaced: o,
      position: window.history.length,
      scroll: r ? te() : null,
    };
  }
  function Xt(e) {
    const { history: t, location: n } = window,
      o = { value: Be(e, n) },
      r = { value: t.state };
    r.value ||
      d(
        o.value,
        {
          back: null,
          current: o.value,
          forward: null,
          position: t.length - 1,
          replaced: !0,
          scroll: null,
        },
        !0,
      );
    function d(l, p, s) {
      const f = e.indexOf("#"),
        i =
          f > -1
            ? (n.host && document.querySelector("base") ? e : e.slice(f)) + l
            : Yt() + e + l;
      try {
        t[s ? "replaceState" : "pushState"](p, "", i), (r.value = p);
      } catch (m) {
        process.env.NODE_ENV !== "production"
          ? b("Error with push/replace State", m)
          : console.error(m),
          n[s ? "replace" : "assign"](i);
      }
    }
    function c(l, p) {
      const s = P({}, t.state, je(r.value.back, l, r.value.forward, !0), p, {
        position: r.value.position,
      });
      d(l, s, !0), (o.value = l);
    }
    function h(l, p) {
      const s = P({}, r.value, t.state, { forward: l, scroll: te() });
      process.env.NODE_ENV !== "production" &&
        !t.state &&
        b(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`),
        d(s.current, s, !0);
      const f = P({}, je(o.value, l, null), { position: s.position + 1 }, p);
      d(l, f, !1), (o.value = l);
    }
    return { location: o, state: r, push: h, replace: c };
  }
  function Zt(e) {
    e = Ht(e);
    const t = Xt(e),
      n = Jt(e, t.state, t.location, t.replace);
    function o(d, c = !0) {
      c || n.pauseListeners(), history.go(d);
    }
    const r = P(
      { location: "", base: e, go: o, createHref: Kt.bind(null, e) },
      t,
      n,
    );
    return (
      Object.defineProperty(r, "location", {
        enumerable: !0,
        get: () => t.location.value,
      }),
      Object.defineProperty(r, "state", {
        enumerable: !0,
        get: () => t.state.value,
      }),
      r
    );
  }
  function ne(e) {
    return typeof e == "string" || (e && typeof e == "object");
  }
  function Le(e) {
    return typeof e == "string" || typeof e == "symbol";
  }
  const M = {
      path: "/",
      name: void 0,
      params: {},
      query: {},
      hash: "",
      fullPath: "/",
      matched: [],
      meta: {},
      redirectedFrom: void 0,
    },
    pe = Symbol(
      process.env.NODE_ENV !== "production" ? "navigation failure" : "",
    );
  var Me;
  (function (e) {
    (e[(e.aborted = 4)] = "aborted"),
      (e[(e.cancelled = 8)] = "cancelled"),
      (e[(e.duplicated = 16)] = "duplicated");
  })(Me || (Me = {}));
  const en = {
    1({ location: e, currentLocation: t }) {
      return `No match for
 ${JSON.stringify(e)}${
   t
     ? `
while being at
` + JSON.stringify(t)
     : ""
 }`;
    },
    2({ from: e, to: t }) {
      return `Redirected from "${e.fullPath}" to "${nn(t)}" via a navigation guard.`;
    },
    4({ from: e, to: t }) {
      return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
    },
    8({ from: e, to: t }) {
      return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
    },
    16({ from: e, to: t }) {
      return `Avoided redundant navigation to current location: "${e.fullPath}".`;
    },
  };
  function F(e, t) {
    return process.env.NODE_ENV !== "production"
      ? P(new Error(en[e](t)), { type: e, [pe]: !0 }, t)
      : P(new Error(), { type: e, [pe]: !0 }, t);
  }
  function B(e, t) {
    return e instanceof Error && pe in e && (t == null || !!(e.type & t));
  }
  const tn = ["params", "query", "hash"];
  function nn(e) {
    if (typeof e == "string") return e;
    if (e.path != null) return e.path;
    const t = {};
    for (const n of tn) n in e && (t[n] = e[n]);
    return JSON.stringify(t, null, 2);
  }
  const Ue = "[^/]+?",
    on = { sensitive: !1, strict: !1, start: !0, end: !0 },
    rn = /[.+*?^${}()[\]/\\]/g;
  function sn(e, t) {
    const n = P({}, on, t),
      o = [];
    let r = n.start ? "^" : "";
    const d = [];
    for (const p of e) {
      const s = p.length ? [] : [90];
      n.strict && !p.length && (r += "/");
      for (let f = 0; f < p.length; f++) {
        const i = p[f];
        let m = 40 + (n.sensitive ? 0.25 : 0);
        if (i.type === 0)
          f || (r += "/"), (r += i.value.replace(rn, "\\$&")), (m += 40);
        else if (i.type === 1) {
          const { value: _, repeatable: N, optional: S, regexp: E } = i;
          d.push({ name: _, repeatable: N, optional: S });
          const w = E || Ue;
          if (w !== Ue) {
            m += 10;
            try {
              new RegExp(`(${w})`);
            } catch (x) {
              throw new Error(
                `Invalid custom RegExp for param "${_}" (${w}): ` + x.message,
              );
            }
          }
          let $ = N ? `((?:${w})(?:/(?:${w}))*)` : `(${w})`;
          f || ($ = S && p.length < 2 ? `(?:/${$})` : "/" + $),
            S && ($ += "?"),
            (r += $),
            (m += 20),
            S && (m += -8),
            N && (m += -20),
            w === ".*" && (m += -50);
        }
        s.push(m);
      }
      o.push(s);
    }
    if (n.strict && n.end) {
      const p = o.length - 1;
      o[p][o[p].length - 1] += 0.7000000000000001;
    }
    n.strict || (r += "/?"), n.end ? (r += "$") : n.strict && (r += "(?:/|$)");
    const c = new RegExp(r, n.sensitive ? "" : "i");
    function h(p) {
      const s = p.match(c),
        f = {};
      if (!s) return null;
      for (let i = 1; i < s.length; i++) {
        const m = s[i] || "",
          _ = d[i - 1];
        f[_.name] = m && _.repeatable ? m.split("/") : m;
      }
      return f;
    }
    function l(p) {
      let s = "",
        f = !1;
      for (const i of e) {
        (!f || !s.endsWith("/")) && (s += "/"), (f = !1);
        for (const m of i)
          if (m.type === 0) s += m.value;
          else if (m.type === 1) {
            const { value: _, repeatable: N, optional: S } = m,
              E = _ in p ? p[_] : "";
            if (V(E) && !N)
              throw new Error(
                `Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`,
              );
            const w = V(E) ? E.join("/") : E;
            if (!w)
              if (S)
                i.length < 2 &&
                  (s.endsWith("/") ? (s = s.slice(0, -1)) : (f = !0));
              else throw new Error(`Missing required param "${_}"`);
            s += w;
          }
      }
      return s || "/";
    }
    return { re: c, score: o, keys: d, parse: h, stringify: l };
  }
  function an(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
      const o = t[n] - e[n];
      if (o) return o;
      n++;
    }
    return e.length < t.length
      ? e.length === 1 && e[0] === 80
        ? -1
        : 1
      : e.length > t.length
        ? t.length === 1 && t[0] === 80
          ? 1
          : -1
        : 0;
  }
  function cn(e, t) {
    let n = 0;
    const o = e.score,
      r = t.score;
    for (; n < o.length && n < r.length; ) {
      const d = an(o[n], r[n]);
      if (d) return d;
      n++;
    }
    if (Math.abs(r.length - o.length) === 1) {
      if (qe(o)) return 1;
      if (qe(r)) return -1;
    }
    return r.length - o.length;
  }
  function qe(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
  }
  const ln = { type: 0, value: "" },
    un = /[a-zA-Z0-9_]/;
  function fn(e) {
    if (!e) return [[]];
    if (e === "/") return [[ln]];
    if (!e.startsWith("/"))
      throw new Error(
        process.env.NODE_ENV !== "production"
          ? `Route paths should start with a "/": "${e}" should be "/${e}".`
          : `Invalid path "${e}"`,
      );
    function t(m) {
      throw new Error(`ERR (${n})/"${p}": ${m}`);
    }
    let n = 0,
      o = n;
    const r = [];
    let d;
    function c() {
      d && r.push(d), (d = []);
    }
    let h = 0,
      l,
      p = "",
      s = "";
    function f() {
      p &&
        (n === 0
          ? d.push({ type: 0, value: p })
          : n === 1 || n === 2 || n === 3
            ? (d.length > 1 &&
                (l === "*" || l === "+") &&
                t(
                  `A repeatable param (${p}) must be alone in its segment. eg: '/:ids+.`,
                ),
              d.push({
                type: 1,
                value: p,
                regexp: s,
                repeatable: l === "*" || l === "+",
                optional: l === "*" || l === "?",
              }))
            : t("Invalid state to consume buffer"),
        (p = ""));
    }
    function i() {
      p += l;
    }
    for (; h < e.length; ) {
      if (((l = e[h++]), l === "\\" && n !== 2)) {
        (o = n), (n = 4);
        continue;
      }
      switch (n) {
        case 0:
          l === "/" ? (p && f(), c()) : l === ":" ? (f(), (n = 1)) : i();
          break;
        case 4:
          i(), (n = o);
          break;
        case 1:
          l === "("
            ? (n = 2)
            : un.test(l)
              ? i()
              : (f(), (n = 0), l !== "*" && l !== "?" && l !== "+" && h--);
          break;
        case 2:
          l === ")"
            ? s[s.length - 1] == "\\"
              ? (s = s.slice(0, -1) + l)
              : (n = 3)
            : (s += l);
          break;
        case 3:
          f(), (n = 0), l !== "*" && l !== "?" && l !== "+" && h--, (s = "");
          break;
        default:
          t("Unknown state");
          break;
      }
    }
    return (
      n === 2 && t(`Unfinished custom RegExp for param "${p}"`), f(), c(), r
    );
  }
  function dn(e, t, n) {
    const o = sn(fn(e.path), n);
    if (process.env.NODE_ENV !== "production") {
      const d = new Set();
      for (const c of o.keys)
        d.has(c.name) &&
          b(
            `Found duplicated params with name "${c.name}" for path "${e.path}". Only the last one will be available on "$route.params".`,
          ),
          d.add(c.name);
    }
    const r = P(o, { record: e, parent: t, children: [], alias: [] });
    return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
  }
  function hn(e, t) {
    const n = [],
      o = new Map();
    t = Ke({ strict: !1, end: !0, sensitive: !1 }, t);
    function r(s) {
      return o.get(s);
    }
    function d(s, f, i) {
      const m = !i,
        _ = pn(s);
      process.env.NODE_ENV !== "production" && yn(_, f),
        (_.aliasOf = i && i.record);
      const N = Ke(t, s),
        S = [_];
      if ("alias" in s) {
        const $ = typeof s.alias == "string" ? [s.alias] : s.alias;
        for (const x of $)
          S.push(
            P({}, _, {
              components: i ? i.record.components : _.components,
              path: x,
              aliasOf: i ? i.record : _,
            }),
          );
      }
      let E, w;
      for (const $ of S) {
        const { path: x } = $;
        if (f && x[0] !== "/") {
          const q = f.record.path,
            j = q[q.length - 1] === "/" ? "" : "/";
          $.path = f.record.path + (x && j + x);
        }
        if (process.env.NODE_ENV !== "production" && $.path === "*")
          throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
        if (
          ((E = dn($, f, N)),
          process.env.NODE_ENV !== "production" &&
            f &&
            x[0] === "/" &&
            _n(E, f),
          i
            ? (i.alias.push(E),
              process.env.NODE_ENV !== "production" && vn(i, E))
            : ((w = w || E),
              w !== E && w.alias.push(E),
              m && s.name && !Ge(E) && c(s.name)),
          _.children)
        ) {
          const q = _.children;
          for (let j = 0; j < q.length; j++) d(q[j], E, i && i.children[j]);
        }
        (i = i || E),
          ((E.record.components && Object.keys(E.record.components).length) ||
            E.record.name ||
            E.record.redirect) &&
            l(E);
      }
      return w
        ? () => {
            c(w);
          }
        : z;
    }
    function c(s) {
      if (Le(s)) {
        const f = o.get(s);
        f &&
          (o.delete(s),
          n.splice(n.indexOf(f), 1),
          f.children.forEach(c),
          f.alias.forEach(c));
      } else {
        const f = n.indexOf(s);
        f > -1 &&
          (n.splice(f, 1),
          s.record.name && o.delete(s.record.name),
          s.children.forEach(c),
          s.alias.forEach(c));
      }
    }
    function h() {
      return n;
    }
    function l(s) {
      let f = 0;
      for (
        ;
        f < n.length &&
        cn(s, n[f]) >= 0 &&
        (s.record.path !== n[f].record.path || !Fe(s, n[f]));

      )
        f++;
      n.splice(f, 0, s), s.record.name && !Ge(s) && o.set(s.record.name, s);
    }
    function p(s, f) {
      let i,
        m = {},
        _,
        N;
      if ("name" in s && s.name) {
        if (((i = o.get(s.name)), !i)) throw F(1, { location: s });
        if (process.env.NODE_ENV !== "production") {
          const w = Object.keys(s.params || {}).filter(
            ($) => !i.keys.find((x) => x.name === $),
          );
          w.length &&
            b(
              `Discarded invalid param(s) "${w.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`,
            );
        }
        (N = i.record.name),
          (m = P(
            He(
              f.params,
              i.keys
                .filter((w) => !w.optional)
                .concat(i.parent ? i.parent.keys.filter((w) => w.optional) : [])
                .map((w) => w.name),
            ),
            s.params &&
              He(
                s.params,
                i.keys.map((w) => w.name),
              ),
          )),
          (_ = i.stringify(m));
      } else if (s.path != null)
        (_ = s.path),
          process.env.NODE_ENV !== "production" &&
            !_.startsWith("/") &&
            b(
              `The Matcher cannot resolve relative paths but received "${_}". Unless you directly called \`matcher.resolve("${_}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`,
            ),
          (i = n.find((w) => w.re.test(_))),
          i && ((m = i.parse(_)), (N = i.record.name));
      else {
        if (
          ((i = f.name ? o.get(f.name) : n.find((w) => w.re.test(f.path))), !i)
        )
          throw F(1, { location: s, currentLocation: f });
        (N = i.record.name),
          (m = P({}, f.params, s.params)),
          (_ = i.stringify(m));
      }
      const S = [];
      let E = i;
      for (; E; ) S.unshift(E.record), (E = E.parent);
      return { name: N, path: _, params: m, matched: S, meta: gn(S) };
    }
    return (
      e.forEach((s) => d(s)),
      {
        addRoute: d,
        resolve: p,
        removeRoute: c,
        getRoutes: h,
        getRecordMatcher: r,
      }
    );
  }
  function He(e, t) {
    const n = {};
    for (const o of t) o in e && (n[o] = e[o]);
    return n;
  }
  function pn(e) {
    return {
      path: e.path,
      redirect: e.redirect,
      name: e.name,
      meta: e.meta || {},
      aliasOf: void 0,
      beforeEnter: e.beforeEnter,
      props: mn(e),
      children: e.children || [],
      instances: {},
      leaveGuards: new Set(),
      updateGuards: new Set(),
      enterCallbacks: {},
      components:
        "components" in e
          ? e.components || null
          : e.component && { default: e.component },
    };
  }
  function mn(e) {
    const t = {},
      n = e.props || !1;
    if ("component" in e) t.default = n;
    else for (const o in e.components) t[o] = typeof n == "object" ? n[o] : n;
    return t;
  }
  function Ge(e) {
    for (; e; ) {
      if (e.record.aliasOf) return !0;
      e = e.parent;
    }
    return !1;
  }
  function gn(e) {
    return e.reduce((t, n) => P(t, n.meta), {});
  }
  function Ke(e, t) {
    const n = {};
    for (const o in e) n[o] = o in t ? t[o] : e[o];
    return n;
  }
  function me(e, t) {
    return (
      e.name === t.name &&
      e.optional === t.optional &&
      e.repeatable === t.repeatable
    );
  }
  function vn(e, t) {
    for (const n of e.keys)
      if (!n.optional && !t.keys.find(me.bind(null, n)))
        return b(
          `Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`,
        );
    for (const n of t.keys)
      if (!n.optional && !e.keys.find(me.bind(null, n)))
        return b(
          `Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`,
        );
  }
  function yn(e, t) {
    t &&
      t.record.name &&
      !e.name &&
      !e.path &&
      b(
        `The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`,
      );
  }
  function _n(e, t) {
    for (const n of t.keys)
      if (!e.keys.find(me.bind(null, n)))
        return b(
          `Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`,
        );
  }
  function Fe(e, t) {
    return t.children.some((n) => n === e || Fe(e, n));
  }
  function En(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const o = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let r = 0; r < o.length; ++r) {
      const d = o[r].replace(Ce, " "),
        c = d.indexOf("="),
        h = K(c < 0 ? d : d.slice(0, c)),
        l = c < 0 ? null : K(d.slice(c + 1));
      if (h in t) {
        let p = t[h];
        V(p) || (p = t[h] = [p]), p.push(l);
      } else t[h] = l;
    }
    return t;
  }
  function We(e) {
    let t = "";
    for (let n in e) {
      const o = e[n];
      if (((n = Dt(n)), o == null)) {
        o !== void 0 && (t += (t.length ? "&" : "") + n);
        continue;
      }
      (V(o) ? o.map((d) => d && fe(d)) : [o && fe(o)]).forEach((d) => {
        d !== void 0 &&
          ((t += (t.length ? "&" : "") + n), d != null && (t += "=" + d));
      });
    }
    return t;
  }
  function bn(e) {
    const t = {};
    for (const n in e) {
      const o = e[n];
      o !== void 0 &&
        (t[n] = V(o)
          ? o.map((r) => (r == null ? null : "" + r))
          : o == null
            ? o
            : "" + o);
    }
    return t;
  }
  const wn = Symbol(
      process.env.NODE_ENV !== "production"
        ? "router view location matched"
        : "",
    ),
    ze = Symbol(
      process.env.NODE_ENV !== "production" ? "router view depth" : "",
    ),
    ge = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""),
    Qe = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""),
    ve = Symbol(
      process.env.NODE_ENV !== "production" ? "router view location" : "",
    );
  function J() {
    let e = [];
    function t(o) {
      return (
        e.push(o),
        () => {
          const r = e.indexOf(o);
          r > -1 && e.splice(r, 1);
        }
      );
    }
    function n() {
      e = [];
    }
    return { add: t, list: () => e.slice(), reset: n };
  }
  function U(e, t, n, o, r, d = (c) => c()) {
    const c = o && (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
    return () =>
      new Promise((h, l) => {
        const p = (i) => {
            i === !1
              ? l(F(4, { from: n, to: t }))
              : i instanceof Error
                ? l(i)
                : ne(i)
                  ? l(F(2, { from: t, to: i }))
                  : (c &&
                      o.enterCallbacks[r] === c &&
                      typeof i == "function" &&
                      c.push(i),
                    h());
          },
          s = d(() =>
            e.call(
              o && o.instances[r],
              t,
              n,
              process.env.NODE_ENV !== "production" ? kn(p, t, n) : p,
            ),
          );
        let f = Promise.resolve(s);
        if (
          (e.length < 3 && (f = f.then(p)),
          process.env.NODE_ENV !== "production" && e.length > 2)
        ) {
          const i = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
          if (typeof s == "object" && "then" in s)
            f = f.then((m) =>
              p._called
                ? m
                : (b(i), Promise.reject(new Error("Invalid navigation guard"))),
            );
          else if (s !== void 0 && !p._called) {
            b(i), l(new Error("Invalid navigation guard"));
            return;
          }
        }
        f.catch((i) => l(i));
      });
  }
  function kn(e, t, n) {
    let o = 0;
    return function () {
      o++ === 1 &&
        b(
          `The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`,
        ),
        (e._called = !0),
        o === 1 && e.apply(null, arguments);
    };
  }
  function ye(e, t, n, o, r = (d) => d()) {
    const d = [];
    for (const c of e) {
      process.env.NODE_ENV !== "production" &&
        !c.components &&
        !c.children.length &&
        b(
          `Record with path "${c.path}" is either missing a "component(s)" or "children" property.`,
        );
      for (const h in c.components) {
        let l = c.components[h];
        if (process.env.NODE_ENV !== "production") {
          if (!l || (typeof l != "object" && typeof l != "function"))
            throw (
              (b(
                `Component "${h}" in record with path "${c.path}" is not a valid component. Received "${String(l)}".`,
              ),
              new Error("Invalid route component"))
            );
          if ("then" in l) {
            b(
              `Component "${h}" in record with path "${c.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`,
            );
            const p = l;
            l = () => p;
          } else
            l.__asyncLoader &&
              !l.__warnedDefineAsync &&
              ((l.__warnedDefineAsync = !0),
              b(
                `Component "${h}" in record with path "${c.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`,
              ));
        }
        if (!(t !== "beforeRouteEnter" && !c.instances[h]))
          if (Rn(l)) {
            const s = (l.__vccOpts || l)[t];
            s && d.push(U(s, n, o, c, h, r));
          } else {
            let p = l();
            process.env.NODE_ENV !== "production" &&
              !("catch" in p) &&
              (b(
                `Component "${h}" in record with path "${c.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`,
              ),
              (p = Promise.resolve(p))),
              d.push(() =>
                p.then((s) => {
                  if (!s)
                    return Promise.reject(
                      new Error(
                        `Couldn't resolve component "${h}" at "${c.path}"`,
                      ),
                    );
                  const f = Rt(s) ? s.default : s;
                  c.components[h] = f;
                  const m = (f.__vccOpts || f)[t];
                  return m && U(m, n, o, c, h, r)();
                }),
              );
          }
      }
    }
    return d;
  }
  function Rn(e) {
    return (
      typeof e == "object" ||
      "displayName" in e ||
      "props" in e ||
      "__vccOpts" in e
    );
  }
  function Ye(e) {
    const t = a.inject(ge),
      n = a.inject(Qe);
    let o = !1,
      r = null;
    const d = a.computed(() => {
        const s = a.unref(e.to);
        return (
          process.env.NODE_ENV !== "production" &&
            (!o || s !== r) &&
            (ne(s) ||
              (o
                ? b(
                    `Invalid value for prop "to" in useLink()
- to:`,
                    s,
                    `
- previous to:`,
                    r,
                    `
- props:`,
                    e,
                  )
                : k(
                    `Invalid value for prop "to" in useLink()
- to:`,
                    s,
                    `
- props:`,
                    e,
                  )),
            (r = s),
            (o = !0)),
          t.resolve(s)
        );
      }),
      c = a.computed(() => {
        const { matched: s } = d.value,
          { length: f } = s,
          i = s[f - 1],
          m = n.matched;
        if (!i || !m.length) return -1;
        const _ = m.findIndex(L.bind(null, i));
        if (_ > -1) return _;
        const N = Je(s[f - 2]);
        return f > 1 && Je(i) === N && m[m.length - 1].path !== N
          ? m.findIndex(L.bind(null, s[f - 2]))
          : _;
      }),
      h = a.computed(() => c.value > -1 && Pn(n.params, d.value.params)),
      l = a.computed(
        () =>
          c.value > -1 &&
          c.value === n.matched.length - 1 &&
          Ve(n.params, d.value.params),
      );
    function p(s = {}) {
      return Nn(s)
        ? t[a.unref(e.replace) ? "replace" : "push"](a.unref(e.to)).catch(z)
        : Promise.resolve();
    }
    if (process.env.NODE_ENV !== "production" && I) {
      const s = a.getCurrentInstance();
      if (s) {
        const f = {
          route: d.value,
          isActive: h.value,
          isExactActive: l.value,
          error: null,
        };
        (s.__vrl_devtools = s.__vrl_devtools || []),
          s.__vrl_devtools.push(f),
          a.watchEffect(
            () => {
              (f.route = d.value),
                (f.isActive = h.value),
                (f.isExactActive = l.value),
                (f.error = ne(a.unref(e.to)) ? null : 'Invalid "to" value');
            },
            { flush: "post" },
          );
      }
    }
    return {
      route: d,
      href: a.computed(() => d.value.href),
      isActive: h,
      isExactActive: l,
      navigate: p,
    };
  }
  const Sn = a.defineComponent({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Ye,
    setup(e, { slots: t }) {
      const n = a.reactive(Ye(e)),
        { options: o } = a.inject(ge),
        r = a.computed(() => ({
          [Xe(e.activeClass, o.linkActiveClass, "router-link-active")]:
            n.isActive,
          [Xe(
            e.exactActiveClass,
            o.linkExactActiveClass,
            "router-link-exact-active",
          )]: n.isExactActive,
        }));
      return () => {
        const d = t.default && t.default(n);
        return e.custom
          ? d
          : a.h(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              d,
            );
      };
    },
  });
  function Nn(e) {
    if (
      !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
      !e.defaultPrevented &&
      !(e.button !== void 0 && e.button !== 0)
    ) {
      if (e.currentTarget && e.currentTarget.getAttribute) {
        const t = e.currentTarget.getAttribute("target");
        if (/\b_blank\b/i.test(t)) return;
      }
      return e.preventDefault && e.preventDefault(), !0;
    }
  }
  function Pn(e, t) {
    for (const n in t) {
      const o = t[n],
        r = e[n];
      if (typeof o == "string") {
        if (o !== r) return !1;
      } else if (!V(r) || r.length !== o.length || o.some((d, c) => d !== r[c]))
        return !1;
    }
    return !0;
  }
  function Je(e) {
    return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
  }
  const Xe = (e, t, n) => e ?? t ?? n,
    Cn = a.defineComponent({
      name: "RouterView",
      inheritAttrs: !1,
      props: { name: { type: String, default: "default" }, route: Object },
      compatConfig: { MODE: 3 },
      setup(e, { attrs: t, slots: n }) {
        process.env.NODE_ENV !== "production" && $n();
        const o = a.inject(ve),
          r = a.computed(() => e.route || o.value),
          d = a.inject(ze, 0),
          c = a.computed(() => {
            let p = a.unref(d);
            const { matched: s } = r.value;
            let f;
            for (; (f = s[p]) && !f.components; ) p++;
            return p;
          }),
          h = a.computed(() => r.value.matched[c.value]);
        a.provide(
          ze,
          a.computed(() => c.value + 1),
        ),
          a.provide(wn, h),
          a.provide(ve, r);
        const l = a.ref();
        return (
          a.watch(
            () => [l.value, h.value, e.name],
            ([p, s, f], [i, m, _]) => {
              s &&
                ((s.instances[f] = p),
                m &&
                  m !== s &&
                  p &&
                  p === i &&
                  (s.leaveGuards.size || (s.leaveGuards = m.leaveGuards),
                  s.updateGuards.size || (s.updateGuards = m.updateGuards))),
                p &&
                  s &&
                  (!m || !L(s, m) || !i) &&
                  (s.enterCallbacks[f] || []).forEach((N) => N(p));
            },
            { flush: "post" },
          ),
          () => {
            const p = r.value,
              s = e.name,
              f = h.value,
              i = f && f.components[s];
            if (!i) return Ze(n.default, { Component: i, route: p });
            const m = f.props[s],
              _ = m
                ? m === !0
                  ? p.params
                  : typeof m == "function"
                    ? m(p)
                    : m
                : null,
              N = (E) => {
                E.component.isUnmounted && (f.instances[s] = null);
              },
              S = a.h(i, P({}, _, t, { onVnodeUnmounted: N, ref: l }));
            if (process.env.NODE_ENV !== "production" && I && S.ref) {
              const E = {
                depth: c.value,
                name: f.name,
                path: f.path,
                meta: f.meta,
              };
              (V(S.ref) ? S.ref.map(($) => $.i) : [S.ref.i]).forEach(($) => {
                $.__vrv_devtools = E;
              });
            }
            return Ze(n.default, { Component: S, route: p }) || S;
          }
        );
      },
    });
  function Ze(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
  }
  const On = Cn;
  function $n() {
    const e = a.getCurrentInstance(),
      t = e.parent && e.parent.type.name,
      n = e.parent && e.parent.subTree && e.parent.subTree.type;
    if (
      t &&
      (t === "KeepAlive" || t.includes("Transition")) &&
      typeof n == "object" &&
      n.name === "RouterView"
    ) {
      const o = t === "KeepAlive" ? "keep-alive" : "transition";
      b(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
    }
  }
  function X(e, t) {
    const n = P({}, e, {
      matched: e.matched.map((o) =>
        Un(o, ["instances", "children", "aliasOf"]),
      ),
    });
    return {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.fullPath,
        tooltip: t,
        value: n,
      },
    };
  }
  function oe(e) {
    return { _custom: { display: e } };
  }
  let An = 0;
  function Tn(e, t, n) {
    if (t.__hasDevtools) return;
    t.__hasDevtools = !0;
    const o = An++;
    kt(
      {
        id: "org.vuejs.router" + (o ? "." + o : ""),
        label: "Vue Router",
        packageName: "vue-router",
        homepage: "https://router.vuejs.org",
        logo: "https://router.vuejs.org/logo.png",
        componentStateTypes: ["Routing"],
        app: e,
      },
      (r) => {
        typeof r.now != "function" &&
          console.warn(
            "[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.",
          ),
          r.on.inspectComponent((s, f) => {
            s.instanceData &&
              s.instanceData.state.push({
                type: "Routing",
                key: "$route",
                editable: !1,
                value: X(t.currentRoute.value, "Current Route"),
              });
          }),
          r.on.visitComponentTree(({ treeNode: s, componentInstance: f }) => {
            if (f.__vrv_devtools) {
              const i = f.__vrv_devtools;
              s.tags.push({
                label: (i.name ? `${i.name.toString()}: ` : "") + i.path,
                textColor: 0,
                tooltip: "This component is rendered by &lt;router-view&gt;",
                backgroundColor: et,
              });
            }
            V(f.__vrl_devtools) &&
              ((f.__devtoolsApi = r),
              f.__vrl_devtools.forEach((i) => {
                let m = i.route.path,
                  _ = ot,
                  N = "",
                  S = 0;
                i.error
                  ? ((m = i.error), (_ = Bn), (S = jn))
                  : i.isExactActive
                    ? ((_ = nt), (N = "This is exactly active"))
                    : i.isActive && ((_ = tt), (N = "This link is active")),
                  s.tags.push({
                    label: m,
                    textColor: S,
                    tooltip: N,
                    backgroundColor: _,
                  });
              }));
          }),
          a.watch(t.currentRoute, () => {
            l(),
              r.notifyComponentUpdate(),
              r.sendInspectorTree(h),
              r.sendInspectorState(h);
          });
        const d = "router:navigations:" + o;
        r.addTimelineLayer({
          id: d,
          label: `Router${o ? " " + o : ""} Navigations`,
          color: 4237508,
        }),
          t.onError((s, f) => {
            r.addTimelineEvent({
              layerId: d,
              event: {
                title: "Error during Navigation",
                subtitle: f.fullPath,
                logType: "error",
                time: r.now(),
                data: { error: s },
                groupId: f.meta.__navigationId,
              },
            });
          });
        let c = 0;
        t.beforeEach((s, f) => {
          const i = {
            guard: oe("beforeEach"),
            from: X(f, "Current Location during this navigation"),
            to: X(s, "Target location"),
          };
          Object.defineProperty(s.meta, "__navigationId", { value: c++ }),
            r.addTimelineEvent({
              layerId: d,
              event: {
                time: r.now(),
                title: "Start of navigation",
                subtitle: s.fullPath,
                data: i,
                groupId: s.meta.__navigationId,
              },
            });
        }),
          t.afterEach((s, f, i) => {
            const m = { guard: oe("afterEach") };
            i
              ? ((m.failure = {
                  _custom: {
                    type: Error,
                    readOnly: !0,
                    display: i ? i.message : "",
                    tooltip: "Navigation Failure",
                    value: i,
                  },
                }),
                (m.status = oe("❌")))
              : (m.status = oe("✅")),
              (m.from = X(f, "Current Location during this navigation")),
              (m.to = X(s, "Target location")),
              r.addTimelineEvent({
                layerId: d,
                event: {
                  title: "End of navigation",
                  subtitle: s.fullPath,
                  time: r.now(),
                  data: m,
                  logType: i ? "warning" : "default",
                  groupId: s.meta.__navigationId,
                },
              });
          });
        const h = "router-inspector:" + o;
        r.addInspector({
          id: h,
          label: "Routes" + (o ? " " + o : ""),
          icon: "book",
          treeFilterPlaceholder: "Search routes",
        });
        function l() {
          if (!p) return;
          const s = p;
          let f = n
            .getRoutes()
            .filter((i) => !i.parent || !i.parent.record.components);
          f.forEach(at),
            s.filter && (f = f.filter((i) => _e(i, s.filter.toLowerCase()))),
            f.forEach((i) => st(i, t.currentRoute.value)),
            (s.rootNodes = f.map(rt));
        }
        let p;
        r.on.getInspectorTree((s) => {
          (p = s), s.app === e && s.inspectorId === h && l();
        }),
          r.on.getInspectorState((s) => {
            if (s.app === e && s.inspectorId === h) {
              const i = n
                .getRoutes()
                .find((m) => m.record.__vd_id === s.nodeId);
              i && (s.state = { options: Vn(i) });
            }
          }),
          r.sendInspectorTree(h),
          r.sendInspectorState(h);
      },
    );
  }
  function xn(e) {
    return e.optional ? (e.repeatable ? "*" : "?") : e.repeatable ? "+" : "";
  }
  function Vn(e) {
    const { record: t } = e,
      n = [{ editable: !1, key: "path", value: t.path }];
    return (
      t.name != null && n.push({ editable: !1, key: "name", value: t.name }),
      n.push({ editable: !1, key: "regexp", value: e.re }),
      e.keys.length &&
        n.push({
          editable: !1,
          key: "keys",
          value: {
            _custom: {
              type: null,
              readOnly: !0,
              display: e.keys.map((o) => `${o.name}${xn(o)}`).join(" "),
              tooltip: "Param keys",
              value: e.keys,
            },
          },
        }),
      t.redirect != null &&
        n.push({ editable: !1, key: "redirect", value: t.redirect }),
      e.alias.length &&
        n.push({
          editable: !1,
          key: "aliases",
          value: e.alias.map((o) => o.record.path),
        }),
      Object.keys(e.record.meta).length &&
        n.push({ editable: !1, key: "meta", value: e.record.meta }),
      n.push({
        key: "score",
        editable: !1,
        value: {
          _custom: {
            type: null,
            readOnly: !0,
            display: e.score.map((o) => o.join(", ")).join(" | "),
            tooltip: "Score used to sort routes",
            value: e.score,
          },
        },
      }),
      n
    );
  }
  const et = 15485081,
    tt = 2450411,
    nt = 8702998,
    Dn = 2282478,
    ot = 16486972,
    In = 6710886,
    Bn = 16704226,
    jn = 12131356;
  function rt(e) {
    const t = [],
      { record: n } = e;
    n.name != null &&
      t.push({ label: String(n.name), textColor: 0, backgroundColor: Dn }),
      n.aliasOf &&
        t.push({ label: "alias", textColor: 0, backgroundColor: ot }),
      e.__vd_match &&
        t.push({ label: "matches", textColor: 0, backgroundColor: et }),
      e.__vd_exactActive &&
        t.push({ label: "exact", textColor: 0, backgroundColor: nt }),
      e.__vd_active &&
        t.push({ label: "active", textColor: 0, backgroundColor: tt }),
      n.redirect &&
        t.push({
          label:
            typeof n.redirect == "string"
              ? `redirect: ${n.redirect}`
              : "redirects",
          textColor: 16777215,
          backgroundColor: In,
        });
    let o = n.__vd_id;
    return (
      o == null && ((o = String(Ln++)), (n.__vd_id = o)),
      { id: o, label: n.path, tags: t, children: e.children.map(rt) }
    );
  }
  let Ln = 0;
  const Mn = /^\/(.*)\/([a-z]*)$/;
  function st(e, t) {
    const n = t.matched.length && L(t.matched[t.matched.length - 1], e.record);
    (e.__vd_exactActive = e.__vd_active = n),
      n || (e.__vd_active = t.matched.some((o) => L(o, e.record))),
      e.children.forEach((o) => st(o, t));
  }
  function at(e) {
    (e.__vd_match = !1), e.children.forEach(at);
  }
  function _e(e, t) {
    const n = String(e.re).match(Mn);
    if (((e.__vd_match = !1), !n || n.length < 3)) return !1;
    if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
      return (
        e.children.forEach((c) => _e(c, t)),
        e.record.path !== "/" || t === "/"
          ? ((e.__vd_match = e.re.test(t)), !0)
          : !1
      );
    const r = e.record.path.toLowerCase(),
      d = K(r);
    return (!t.startsWith("/") && (d.includes(t) || r.includes(t))) ||
      d.startsWith(t) ||
      r.startsWith(t) ||
      (e.record.name && String(e.record.name).includes(t))
      ? !0
      : e.children.some((c) => _e(c, t));
  }
  function Un(e, t) {
    const n = {};
    for (const o in e) t.includes(o) || (n[o] = e[o]);
    return n;
  }
  function qn(e) {
    const t = hn(e.routes, e),
      n = e.parseQuery || En,
      o = e.stringifyQuery || We,
      r = e.history;
    if (process.env.NODE_ENV !== "production" && !r)
      throw new Error(
        'Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.',
      );
    const d = J(),
      c = J(),
      h = J(),
      l = a.shallowRef(M);
    let p = M;
    I &&
      e.scrollBehavior &&
      "scrollRestoration" in history &&
      (history.scrollRestoration = "manual");
    const s = le.bind(null, (u) => "" + u),
      f = le.bind(null, Bt),
      i = le.bind(null, K);
    function m(u, v) {
      let g, y;
      return (
        Le(u)
          ? ((g = t.getRecordMatcher(u)),
            process.env.NODE_ENV !== "production" &&
              !g &&
              b(
                `Parent route "${String(u)}" not found when adding child route`,
                v,
              ),
            (y = v))
          : (y = u),
        t.addRoute(y, g)
      );
    }
    function _(u) {
      const v = t.getRecordMatcher(u);
      v
        ? t.removeRoute(v)
        : process.env.NODE_ENV !== "production" &&
          b(`Cannot remove non-existent route "${String(u)}"`);
    }
    function N() {
      return t.getRoutes().map((u) => u.record);
    }
    function S(u) {
      return !!t.getRecordMatcher(u);
    }
    function E(u, v) {
      if (((v = P({}, v || l.value)), typeof u == "string")) {
        const k = de(n, u, v.path),
          O = t.resolve({ path: k.path }, v),
          H = r.createHref(k.fullPath);
        return (
          process.env.NODE_ENV !== "production" &&
            (H.startsWith("//")
              ? b(
                  `Location "${u}" resolved to "${H}". A resolved location cannot start with multiple slashes.`,
                )
              : O.matched.length ||
                b(`No match found for location with path "${u}"`)),
          P(k, O, {
            params: i(O.params),
            hash: K(k.hash),
            redirectedFrom: void 0,
            href: H,
          })
        );
      }
      process.env.NODE_ENV !== "production" &&
        !ne(u) &&
        (b(
          `router.resolve() was passed an invalid location. This will fail in production.
- Location:`,
          u,
        ),
        (u = {}));
      let g;
      if (u.path != null)
        process.env.NODE_ENV !== "production" &&
          "params" in u &&
          !("name" in u) &&
          Object.keys(u.params).length &&
          b(
            `Path "${u.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`,
          ),
          (g = P({}, u, { path: de(n, u.path, v.path).path }));
      else {
        const k = P({}, u.params);
        for (const O in k) k[O] == null && delete k[O];
        (g = P({}, u, { params: f(k) })), (v.params = f(v.params));
      }
      const y = t.resolve(g, v),
        C = u.hash || "";
      process.env.NODE_ENV !== "production" &&
        C &&
        !C.startsWith("#") &&
        b(
          `A \`hash\` should always start with the character "#". Replace "${C}" with "#${C}".`,
        ),
        (y.params = s(i(y.params)));
      const A = Mt(o, P({}, u, { hash: Vt(C), path: y.path })),
        R = r.createHref(A);
      return (
        process.env.NODE_ENV !== "production" &&
          (R.startsWith("//")
            ? b(
                `Location "${u}" resolved to "${R}". A resolved location cannot start with multiple slashes.`,
              )
            : y.matched.length ||
              b(
                `No match found for location with path "${u.path != null ? u.path : u}"`,
              )),
        P(
          {
            fullPath: A,
            hash: C,
            query: o === We ? bn(u.query) : u.query || {},
          },
          y,
          { redirectedFrom: void 0, href: R },
        )
      );
    }
    function w(u) {
      return typeof u == "string" ? de(n, u, l.value.path) : P({}, u);
    }
    function $(u, v) {
      if (p !== u) return F(8, { from: v, to: u });
    }
    function x(u) {
      return Z(u);
    }
    function q(u) {
      return x(P(w(u), { replace: !0 }));
    }
    function j(u) {
      const v = u.matched[u.matched.length - 1];
      if (v && v.redirect) {
        const { redirect: g } = v;
        let y = typeof g == "function" ? g(u) : g;
        if (
          (typeof y == "string" &&
            ((y =
              y.includes("?") || y.includes("#") ? (y = w(y)) : { path: y }),
            (y.params = {})),
          process.env.NODE_ENV !== "production" &&
            y.path == null &&
            !("name" in y))
        )
          throw (
            (b(`Invalid redirect found:
${JSON.stringify(y, null, 2)}
 when navigating to "${u.fullPath}". A redirect must contain a name or path. This will break in production.`),
            new Error("Invalid redirect"))
          );
        return P(
          {
            query: u.query,
            hash: u.hash,
            params: y.path != null ? {} : u.params,
          },
          y,
        );
      }
    }
    function Z(u, v) {
      const g = (p = E(u)),
        y = l.value,
        C = u.state,
        A = u.force,
        R = u.replace === !0,
        k = j(g);
      if (k)
        return Z(
          P(w(k), {
            state: typeof k == "object" ? P({}, C, k.state) : C,
            force: A,
            replace: R,
          }),
          v || g,
        );
      const O = g;
      O.redirectedFrom = v;
      let H;
      return (
        !A &&
          xe(o, y, g) &&
          ((H = F(16, { to: O, from: y })), pt(y, y, !0, !1)),
        (H ? Promise.resolve(H) : ut(O, y))
          .catch((T) => (B(T) ? (B(T, 2) ? T : ke(T)) : we(T, O, y)))
          .then((T) => {
            if (T) {
              if (B(T, 2))
                return process.env.NODE_ENV !== "production" &&
                  xe(o, E(T.to), O) &&
                  v &&
                  (v._count = v._count ? v._count + 1 : 1) > 30
                  ? (b(`Detected a possibly infinite redirection in a navigation guard when going from "${y.fullPath}" to "${O.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`),
                    Promise.reject(
                      new Error("Infinite redirect in navigation guard"),
                    ))
                  : Z(
                      P({ replace: R }, w(T.to), {
                        state:
                          typeof T.to == "object" ? P({}, C, T.to.state) : C,
                        force: A,
                      }),
                      v || O,
                    );
            } else T = dt(O, y, !0, R, C);
            return ft(O, y, T), T;
          })
      );
    }
    function yo(u, v) {
      const g = $(u, v);
      return g ? Promise.reject(g) : Promise.resolve();
    }
    function Ee(u) {
      const v = ie.values().next().value;
      return v && typeof v.runWithContext == "function"
        ? v.runWithContext(u)
        : u();
    }
    function ut(u, v) {
      let g;
      const [y, C, A] = Hn(u, v);
      g = ye(y.reverse(), "beforeRouteLeave", u, v);
      for (const k of y)
        k.leaveGuards.forEach((O) => {
          g.push(U(O, u, v));
        });
      const R = yo.bind(null, u, v);
      return (
        g.push(R),
        W(g)
          .then(() => {
            g = [];
            for (const k of d.list()) g.push(U(k, u, v));
            return g.push(R), W(g);
          })
          .then(() => {
            g = ye(C, "beforeRouteUpdate", u, v);
            for (const k of C)
              k.updateGuards.forEach((O) => {
                g.push(U(O, u, v));
              });
            return g.push(R), W(g);
          })
          .then(() => {
            g = [];
            for (const k of A)
              if (k.beforeEnter)
                if (V(k.beforeEnter))
                  for (const O of k.beforeEnter) g.push(U(O, u, v));
                else g.push(U(k.beforeEnter, u, v));
            return g.push(R), W(g);
          })
          .then(
            () => (
              u.matched.forEach((k) => (k.enterCallbacks = {})),
              (g = ye(A, "beforeRouteEnter", u, v, Ee)),
              g.push(R),
              W(g)
            ),
          )
          .then(() => {
            g = [];
            for (const k of c.list()) g.push(U(k, u, v));
            return g.push(R), W(g);
          })
          .catch((k) => (B(k, 8) ? k : Promise.reject(k)))
      );
    }
    function ft(u, v, g) {
      h.list().forEach((y) => Ee(() => y(u, v, g)));
    }
    function dt(u, v, g, y, C) {
      const A = $(u, v);
      if (A) return A;
      const R = v === M,
        k = I ? history.state : {};
      g &&
        (y || R
          ? r.replace(u.fullPath, P({ scroll: R && k && k.scroll }, C))
          : r.push(u.fullPath, C)),
        (l.value = u),
        pt(u, v, g, R),
        ke();
    }
    let ee;
    function _o() {
      ee ||
        (ee = r.listen((u, v, g) => {
          if (!mt.listening) return;
          const y = E(u),
            C = j(y);
          if (C) {
            Z(P(C, { replace: !0 }), y).catch(z);
            return;
          }
          p = y;
          const A = l.value;
          I && zt(Ie(A.fullPath, g.delta), te()),
            ut(y, A)
              .catch((R) =>
                B(R, 12)
                  ? R
                  : B(R, 2)
                    ? (Z(R.to, y)
                        .then((k) => {
                          B(k, 20) &&
                            !g.delta &&
                            g.type === Q.pop &&
                            r.go(-1, !1);
                        })
                        .catch(z),
                      Promise.reject())
                    : (g.delta && r.go(-g.delta, !1), we(R, y, A)),
              )
              .then((R) => {
                (R = R || dt(y, A, !1)),
                  R &&
                    (g.delta && !B(R, 8)
                      ? r.go(-g.delta, !1)
                      : g.type === Q.pop && B(R, 20) && r.go(-1, !1)),
                  ft(y, A, R);
              })
              .catch(z);
        }));
    }
    let be = J(),
      ht = J(),
      ae;
    function we(u, v, g) {
      ke(u);
      const y = ht.list();
      return (
        y.length
          ? y.forEach((C) => C(u, v, g))
          : (process.env.NODE_ENV !== "production" &&
              b("uncaught error during route navigation:"),
            console.error(u)),
        Promise.reject(u)
      );
    }
    function Eo() {
      return ae && l.value !== M
        ? Promise.resolve()
        : new Promise((u, v) => {
            be.add([u, v]);
          });
    }
    function ke(u) {
      return (
        ae ||
          ((ae = !u),
          _o(),
          be.list().forEach(([v, g]) => (u ? g(u) : v())),
          be.reset()),
        u
      );
    }
    function pt(u, v, g, y) {
      const { scrollBehavior: C } = e;
      if (!I || !C) return Promise.resolve();
      const A =
        (!g && Qt(Ie(u.fullPath, 0))) ||
        ((y || !g) && history.state && history.state.scroll) ||
        null;
      return a
        .nextTick()
        .then(() => C(u, v, A))
        .then((R) => R && Wt(R))
        .catch((R) => we(R, u, v));
    }
    const Re = (u) => r.go(u);
    let Se;
    const ie = new Set(),
      mt = {
        currentRoute: l,
        listening: !0,
        addRoute: m,
        removeRoute: _,
        hasRoute: S,
        getRoutes: N,
        resolve: E,
        options: e,
        push: x,
        replace: q,
        go: Re,
        back: () => Re(-1),
        forward: () => Re(1),
        beforeEach: d.add,
        beforeResolve: c.add,
        afterEach: h.add,
        onError: ht.add,
        isReady: Eo,
        install(u) {
          const v = this;
          u.component("RouterLink", Sn),
            u.component("RouterView", On),
            (u.config.globalProperties.$router = v),
            Object.defineProperty(u.config.globalProperties, "$route", {
              enumerable: !0,
              get: () => a.unref(l),
            }),
            I &&
              !Se &&
              l.value === M &&
              ((Se = !0),
              x(r.location).catch((C) => {
                process.env.NODE_ENV !== "production" &&
                  b("Unexpected error when starting the router:", C);
              }));
          const g = {};
          for (const C in M)
            Object.defineProperty(g, C, {
              get: () => l.value[C],
              enumerable: !0,
            });
          u.provide(ge, v),
            u.provide(Qe, a.shallowReactive(g)),
            u.provide(ve, l);
          const y = u.unmount;
          ie.add(u),
            (u.unmount = function () {
              ie.delete(u),
                ie.size < 1 &&
                  ((p = M),
                  ee && ee(),
                  (ee = null),
                  (l.value = M),
                  (Se = !1),
                  (ae = !1)),
                y();
            }),
            process.env.NODE_ENV !== "production" && I && Tn(u, v, t);
        },
      };
    function W(u) {
      return u.reduce((v, g) => v.then(() => Ee(g)), Promise.resolve());
    }
    return mt;
  }
  function Hn(e, t) {
    const n = [],
      o = [],
      r = [],
      d = Math.max(t.matched.length, e.matched.length);
    for (let c = 0; c < d; c++) {
      const h = t.matched[c];
      h && (e.matched.find((p) => L(p, h)) ? o.push(h) : n.push(h));
      const l = e.matched[c];
      l && (t.matched.find((p) => L(p, l)) || r.push(l));
    }
    return [n, o, r];
  }
  const Gn = [
      {
        _id: "61a9ae14e04e3d5bffb26ef7",
        label: "VETS2011 Physiology",
        tags: ["course:VETS2011"],
        url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7",
      },
      {
        _id: "624380e164c71f1df2110dfd",
        label: "Respiratory Physiology",
        tags: [
          "course:VETS2012",
          "subject:Physiology",
          "system:Respiratory_System",
        ],
        url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd",
      },
      {
        _id: "6290636464c71f1df2110ec9",
        label: "Equine Exercise Physiology",
        tags: [
          "course:VETS2011",
          "subject:Physiology",
          "system:Exercise",
          "animal:Horse",
        ],
        url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9",
      },
    ],
    Kn = ["VET2011"],
    Fn = [
      "course:VETS2011",
      "course:VETS2012",
      "subject:Physiology",
      "system:Respiratory_System",
      "system:Exercise",
      "animal:Horse",
    ],
    Wn = async (e, t) => {
      try {
        return await (
          await fetch(t + "?" + new URLSearchParams({ tag: e }))
        ).json();
      } catch (n) {
        console.error("Error fetching data from the server", n),
          alert("Error fetching data from the server, only display test data.");
      }
    },
    zn = async (e, t) => {
      try {
        return (
          (await Wn(e, t)) || Gn.filter((o) => o.tags.join(",").includes(e))
        );
      } catch {
        return [];
      }
    },
    Qn = async (e, t) => {
      try {
        const n = new URLSearchParams({ tag: e }),
          r = (await (await fetch(`${t}?${n}`)).json()) ?? Kn,
          d = new Set(r);
        return Array.from(d);
      } catch (n) {
        return console.error("An error occurred while fetching tags", n), [];
      }
    },
    Yn = { class: "search-results-container" },
    Jn = { class: "container-description" },
    Xn = { class: "label-badges" },
    Zn = { key: 0, class: "results" },
    eo = ["href"],
    to = { key: 1, class: "no-results" },
    no = a.defineComponent({
      __name: "DisplayResult",
      setup(e) {
        const t =
          a.inject("$getApi") ??
          "http://localhost:8080/api/resource/getResultByQueryTag";
        console.info("%cRetrieving data from:", "color: skyblue;", t);
        const n = a.ref([{ _id: "", label: "", tags: [""], url: "" }]),
          o = it(),
          r = a.ref("");
        a.onMounted(async () => {
          o
            ? ((r.value = o.currentRoute.value.query.tag), await d(r.value))
            : (r.value = "undefined");
        });
        const d = async (c) => {
          const h = await zn(c, t);
          h && (n.value = h);
        };
        return (
          a.watch(o.currentRoute, async (c, h) => {
            const l = c.query.tag || "",
              p = h.query.tag || "";
            l !== p && (await d(l));
          }),
          (c, h) => (
            a.openBlock(),
            a.createElementBlock("div", Yn, [
              a.createElementVNode("div", Jn, [
                a.createElementVNode(
                  "button",
                  { onClick: h[0] || (h[0] = () => c.$router.back()) },
                  "↵",
                ),
                a.createElementVNode(
                  "div",
                  Xn,
                  " (" +
                    a.toDisplayString(n.value.length) +
                    " records in total) ",
                  1,
                ),
              ]),
              n.value.length
                ? (a.openBlock(),
                  a.createElementBlock("div", Zn, [
                    a.createElementVNode("ul", null, [
                      (a.openBlock(!0),
                      a.createElementBlock(
                        a.Fragment,
                        null,
                        a.renderList(
                          n.value,
                          (l, p) => (
                            a.openBlock(),
                            a.createElementBlock("li", { key: p }, [
                              a.createElementVNode(
                                "a",
                                {
                                  href: l.url,
                                  target: "_blank",
                                  class: "linkToResource",
                                },
                                a.toDisplayString(l.label),
                                9,
                                eo,
                              ),
                            ])
                          ),
                        ),
                        128,
                      )),
                    ]),
                  ]))
                : (a.openBlock(),
                  a.createElementBlock("p", to, "No results found")),
            ])
          )
        );
      },
    }),
    re = (e, t) => {
      const n = e.__vccOpts || e;
      for (const [o, r] of t) n[o] = r;
      return n;
    },
    se = re(no, [["__scopeId", "data-v-8413d12c"]]),
    oo = {},
    ro = { id: "app" };
  function so(e, t) {
    const n = a.resolveComponent("CrucibleFilter"),
      o = a.resolveComponent("CrucibleSearch"),
      r = a.resolveComponent("RouterView");
    return (
      a.openBlock(),
      a.createElementBlock("div", ro, [
        a.createVNode(n),
        a.createVNode(o),
        a.createVNode(r),
      ])
    );
  }
  const ao = [
      { path: "/", component: re(oo, [["render", so]]) },
      { path: "/search", component: se },
    ],
    io = qn({ history: Zt("/"), routes: ao });
  function it() {
    const e = a.inject("$router");
    return e || io;
  }
  const co = { class: "search-container" },
    lo = { key: 0 },
    uo = ["onClick"],
    fo = 10,
    ct = re(
      a.defineComponent({
        __name: "CrucibleSearch",
        setup(e) {
          const t = it(),
            n = a.ref(""),
            o = a.ref([]),
            r = a.ref(!1),
            d = a.ref(null),
            c =
              a.inject("$tagsApi") ||
              "http://localhost:8080/api/resource/alltags",
            h = (m) => n.value.toLowerCase().includes(m.toLowerCase()),
            l = async () => {
              n.value
                ? ((o.value = (await Qn(n.value, c)).slice(0, fo)),
                  (r.value = !0))
                : ((o.value = []), (r.value = !1));
            },
            p = (m) => {
              (n.value = o.value.includes(m) ? m : o.value[0]),
                (r.value = !1),
                t.push({ path: "/search", query: { tag: n.value } });
            },
            s = () => {
              o.value.length && n.value && (r.value = !0);
            },
            f = (m) => {
              m.key === "Enter"
                ? (p(n.value), (n.value = ""))
                : m.key === "Tab" &&
                  (m.preventDefault(), (n.value = o.value[0] ?? n.value));
            },
            i = (m) => {
              d.value && !d.value.contains(m.target) && (r.value = !1);
            };
          return (
            a.onMounted(() => {
              document.addEventListener("click", i);
            }),
            a.onUnmounted(() => {
              document.removeEventListener("click", i);
            }),
            (m, _) => (
              a.openBlock(),
              a.createElementBlock("div", co, [
                a.createElementVNode(
                  "div",
                  {
                    ref_key: "searchBoxRef",
                    ref: d,
                    class: "search-container",
                  },
                  [
                    a.withDirectives(
                      a.createElementVNode(
                        "input",
                        {
                          "onUpdate:modelValue":
                            _[0] || (_[0] = (N) => (n.value = N)),
                          type: "text",
                          placeholder: "search for topic and courses",
                          onInput: l,
                          onFocus: s,
                          onKeydown: f,
                        },
                        null,
                        544,
                      ),
                      [[a.vModelText, n.value]],
                    ),
                    o.value.length && n.value && r.value
                      ? (a.openBlock(),
                        a.createElementBlock("ul", lo, [
                          (a.openBlock(!0),
                          a.createElementBlock(
                            a.Fragment,
                            null,
                            a.renderList(
                              o.value,
                              (N) => (
                                a.openBlock(),
                                a.createElementBlock(
                                  "li",
                                  { key: N, onClick: (S) => p(N) },
                                  [
                                    (a.openBlock(!0),
                                    a.createElementBlock(
                                      a.Fragment,
                                      null,
                                      a.renderList(
                                        N.split(""),
                                        (S, E) => (
                                          a.openBlock(),
                                          a.createElementBlock(
                                            a.Fragment,
                                            null,
                                            [
                                              h(S)
                                                ? (a.openBlock(),
                                                  a.createElementBlock(
                                                    "strong",
                                                    { key: `strong-${E}` },
                                                    a.toDisplayString(S),
                                                    1,
                                                  ))
                                                : (a.openBlock(),
                                                  a.createElementBlock(
                                                    "span",
                                                    { key: E },
                                                    a.toDisplayString(S),
                                                    1,
                                                  )),
                                            ],
                                            64,
                                          )
                                        ),
                                      ),
                                      256,
                                    )),
                                  ],
                                  8,
                                  uo,
                                )
                              ),
                            ),
                            128,
                          )),
                        ]))
                      : a.createCommentVNode("", !0),
                  ],
                  512,
                ),
              ])
            )
          );
        },
      }),
      [["__scopeId", "data-v-3a7ef61b"]],
    ),
    ho = { class: "crucible-filters" },
    po = ["onClick"],
    mo = { class: "crucible-filter-dropdown-menu" },
    go = ["onClick"],
    lt = re(
      a.defineComponent({
        __name: "CrucibleFilter",
        setup(e) {
          const t = a.ref({}),
            n = Fn.reduce((c, h) => {
              const [l, p] = h.split(":");
              return c[l] || (c[l] = []), c[l].push(p.replace("_", " ")), c;
            }, {}),
            o = (c) => {
              (t.value[c] = !t.value[c]),
                Object.keys(t.value).forEach((h) => {
                  h !== c && (t.value[h] = !1);
                });
            },
            r = (c) => {
              console.log(c);
            },
            d = () => {
              (t.value = {}), console.log("Resetting the filter");
            };
          return (c, h) => (
            a.openBlock(),
            a.createElementBlock("div", ho, [
              a.createElementVNode(
                "div",
                { class: "crucible-filter-dropdown" },
                [
                  a.createElementVNode(
                    "label",
                    { for: "All", onClick: d },
                    "All",
                  ),
                ],
              ),
              (a.openBlock(!0),
              a.createElementBlock(
                a.Fragment,
                null,
                a.renderList(
                  a.unref(n),
                  (l, p) => (
                    a.openBlock(),
                    a.createElementBlock(
                      "div",
                      { key: p, class: "crucible-filter-dropdown" },
                      [
                        a.createElementVNode(
                          "label",
                          { onClick: (s) => o(p) },
                          a.toDisplayString(p),
                          9,
                          po,
                        ),
                        a.withDirectives(
                          a.createElementVNode(
                            "ol",
                            mo,
                            [
                              (a.openBlock(!0),
                              a.createElementBlock(
                                a.Fragment,
                                null,
                                a.renderList(
                                  l,
                                  (s, f) => (
                                    a.openBlock(),
                                    a.createElementBlock(
                                      "li",
                                      { key: f, onClick: (i) => r(s) },
                                      a.toDisplayString(s),
                                      9,
                                      go,
                                    )
                                  ),
                                ),
                                128,
                              )),
                            ],
                            512,
                          ),
                          [[a.vShow, t.value[p]]],
                        ),
                      ],
                    )
                  ),
                ),
                128,
              )),
            ])
          );
        },
      }),
      [["__scopeId", "data-v-faf4f1c7"]],
    );
  function vo(e, t) {
    const { router: n, getApi: o, tagsApi: r } = t;
    e.component("CrucibleSearch", ct),
      e.component("DisplayResult", se),
      e.component("CrucibleFilter", lt),
      e.provide("$router", n),
      e.provide("$getApi", o),
      e.provide("$tagsApi", r),
      n.addRoute({ path: "/search", component: se });
  }
  (D.CrucibleFilter = lt),
    (D.CrucibleSearch = ct),
    (D.DisplayResult = se),
    (D.createSearchPlugin = vo),
    Object.defineProperty(D, Symbol.toStringTag, { value: "Module" });
});
