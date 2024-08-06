import { shallowRef as Ht, unref as Z, shallowReactive as Gt, nextTick as Kt, defineComponent as W, reactive as zt, inject as H, computed as L, h as ft, provide as Re, ref as V, watch as Ve, getCurrentInstance as dt, watchEffect as Wt, onMounted as je, openBlock as O, createElementBlock as A, createElementVNode as $, toDisplayString as U, Fragment as Y, renderList as ee, normalizeClass as ve, pushScopeId as ht, popScopeId as pt, createVNode as te, createTextVNode as Qt, withDirectives as vt, vShow as Yt, createCommentVNode as gt, resolveComponent as Ke, toRefs as Jt, onUnmounted as Xt, vModelText as Zt } from "vue";
function en() {
  return mt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function mt() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const tn = typeof Proxy == "function", nn = "devtools-plugin:setup", on = "plugin:settings:set";
let X, Pe;
function rn() {
  var e;
  return X !== void 0 || (typeof window < "u" && window.performance ? (X = !0, Pe = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (X = !0, Pe = globalThis.perf_hooks.performance) : X = !1), X;
}
function sn() {
  return rn() ? Pe.now() : Date.now();
}
class an {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const u in t.settings) {
        const d = t.settings[u];
        o[u] = d.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let i = Object.assign({}, o);
    try {
      const u = localStorage.getItem(r), d = JSON.parse(u);
      Object.assign(i, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return i;
      },
      setSettings(u) {
        try {
          localStorage.setItem(r, JSON.stringify(u));
        } catch {
        }
        i = u;
      },
      now() {
        return sn();
      }
    }, n && n.on(on, (u, d) => {
      u === this.plugin.id && this.fallbacks.setSettings(d);
    }), this.proxiedOn = new Proxy({}, {
      get: (u, d) => this.target ? this.target.on[d] : (...c) => {
        this.onQueue.push({
          method: d,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (u, d) => this.target ? this.target[d] : d === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(d) ? (...c) => (this.targetQueue.push({
        method: d,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[d](...c)) : (...c) => new Promise((h) => {
        this.targetQueue.push({
          method: d,
          args: c,
          resolve: h
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function cn(e, t) {
  const n = e, o = mt(), r = en(), i = tn && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    r.emit(nn, e, t);
  else {
    const u = i ? new an(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: u
    }), u && t(u.proxiedTarget);
  }
}
/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const F = typeof document < "u";
function ln(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const P = Object.assign;
function Se(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = j(r) ? r.map(e) : e(r);
  }
  return n;
}
const ce = () => {
}, j = Array.isArray;
function k(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const yt = /#/g, un = /&/g, fn = /\//g, dn = /=/g, hn = /\?/g, _t = /\+/g, pn = /%5B/g, vn = /%5D/g, Et = /%5E/g, gn = /%60/g, bt = /%7B/g, mn = /%7C/g, wt = /%7D/g, yn = /%20/g;
function Le(e) {
  return encodeURI("" + e).replace(mn, "|").replace(pn, "[").replace(vn, "]");
}
function _n(e) {
  return Le(e).replace(bt, "{").replace(wt, "}").replace(Et, "^");
}
function $e(e) {
  return Le(e).replace(_t, "%2B").replace(yn, "+").replace(yt, "%23").replace(un, "%26").replace(gn, "`").replace(bt, "{").replace(wt, "}").replace(Et, "^");
}
function En(e) {
  return $e(e).replace(dn, "%3D");
}
function bn(e) {
  return Le(e).replace(yt, "%23").replace(hn, "%3F");
}
function wn(e) {
  return e == null ? "" : bn(e).replace(fn, "%2F");
}
function ne(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && k(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const kn = /\/$/, Rn = (e) => e.replace(kn, "");
function Ne(e, t, n = "/") {
  let o, r = {}, i = "", u = "";
  const d = t.indexOf("#");
  let c = t.indexOf("?");
  return d < c && d >= 0 && (c = -1), c > -1 && (o = t.slice(0, c), i = t.slice(c + 1, d > -1 ? d : t.length), r = e(i)), d > -1 && (o = o || t.slice(0, d), u = t.slice(d, t.length)), o = Cn(o ?? t, n), {
    fullPath: o + (i && "?") + i + u,
    path: o,
    query: r,
    hash: ne(u)
  };
}
function Sn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ze(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function We(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && z(t.matched[o], n.matched[r]) && kt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function z(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function kt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Nn(e[n], t[n]))
      return !1;
  return !0;
}
function Nn(e, t) {
  return j(e) ? Qe(e, t) : j(t) ? Qe(t, e) : e === t;
}
function Qe(e, t) {
  return j(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Cn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return k(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let i = n.length - 1, u, d;
  for (u = 0; u < o.length; u++)
    if (d = o[u], d !== ".")
      if (d === "..")
        i > 1 && i--;
      else
        break;
  return n.slice(0, i).join("/") + "/" + o.slice(u).join("/");
}
var ue;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ue || (ue = {}));
var le;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(le || (le = {}));
function Pn(e) {
  if (!e)
    if (F) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Rn(e);
}
const $n = /^[^#]+#/;
function On(e, t) {
  return e.replace($n, "#") + t;
}
function An(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const me = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function Tn(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const i = document.querySelector(e.el);
        if (o && i) {
          k(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        k(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const r = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) {
      process.env.NODE_ENV !== "production" && k(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = An(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Ye(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Oe = /* @__PURE__ */ new Map();
function xn(e, t) {
  Oe.set(e, t);
}
function Dn(e) {
  const t = Oe.get(e);
  return Oe.delete(e), t;
}
let In = () => location.protocol + "//" + location.host;
function Rt(e, t) {
  const { pathname: n, search: o, hash: r } = t, i = e.indexOf("#");
  if (i > -1) {
    let d = r.includes(e.slice(i)) ? e.slice(i).length : 1, c = r.slice(d);
    return c[0] !== "/" && (c = "/" + c), ze(c, "");
  }
  return ze(n, e) + o + r;
}
function Vn(e, t, n, o) {
  let r = [], i = [], u = null;
  const d = ({ state: a }) => {
    const p = Rt(e, location), y = n.value, R = t.value;
    let b = 0;
    if (a) {
      if (n.value = p, t.value = a, u && u === y) {
        u = null;
        return;
      }
      b = R ? a.position - R.position : 0;
    } else
      o(p);
    r.forEach((v) => {
      v(n.value, y, {
        delta: b,
        type: ue.pop,
        direction: b ? b > 0 ? le.forward : le.back : le.unknown
      });
    });
  };
  function c() {
    u = n.value;
  }
  function h(a) {
    r.push(a);
    const p = () => {
      const y = r.indexOf(a);
      y > -1 && r.splice(y, 1);
    };
    return i.push(p), p;
  }
  function s() {
    const { history: a } = window;
    a.state && a.replaceState(P({}, a.state, { scroll: me() }), "");
  }
  function f() {
    for (const a of i)
      a();
    i = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: c,
    listen: h,
    destroy: f
  };
}
function Je(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? me() : null
  };
}
function jn(e) {
  const { history: t, location: n } = window, o = {
    value: Rt(e, n)
  }, r = { value: t.state };
  r.value || i(o.value, {
    back: null,
    current: o.value,
    forward: null,
    // the length is off by one, we need to decrease it
    position: t.length - 1,
    replaced: !0,
    // don't add a scroll as the user may have an anchor, and we want
    // scrollBehavior to be triggered without a saved position
    scroll: null
  }, !0);
  function i(c, h, s) {
    const f = e.indexOf("#"), a = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + c : In() + e + c;
    try {
      t[s ? "replaceState" : "pushState"](h, "", a), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? k("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](a);
    }
  }
  function u(c, h) {
    const s = P({}, t.state, Je(
      r.value.back,
      // keep back and forward entries but override current position
      c,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    i(c, s, !0), o.value = c;
  }
  function d(c, h) {
    const s = P(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: c,
        scroll: me()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && k(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), i(s.current, s, !0);
    const f = P({}, Je(o.value, c, null), { position: s.position + 1 }, h);
    i(c, f, !1), o.value = c;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: u
  };
}
function Ln(e) {
  e = Pn(e);
  const t = jn(e), n = Vn(e, t.state, t.location, t.replace);
  function o(i, u = !0) {
    u || n.pauseListeners(), history.go(i);
  }
  const r = P({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: On.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function ge(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function St(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const G = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, Ae = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var Xe;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Xe || (Xe = {}));
const Mn = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Bn(t)}" via a navigation guard.`;
  },
  4({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  8({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  16({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function oe(e, t) {
  return process.env.NODE_ENV !== "production" ? P(new Error(Mn[e](t)), {
    type: e,
    [Ae]: !0
  }, t) : P(new Error(), {
    type: e,
    [Ae]: !0
  }, t);
}
function q(e, t) {
  return e instanceof Error && Ae in e && (t == null || !!(e.type & t));
}
const Un = ["params", "query", "hash"];
function Bn(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of Un)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Ze = "[^/]+?", qn = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Fn = /[.+*?^${}()[\]/\\]/g;
function Hn(e, t) {
  const n = P({}, qn, t), o = [];
  let r = n.start ? "^" : "";
  const i = [];
  for (const h of e) {
    const s = h.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !h.length && (r += "/");
    for (let f = 0; f < h.length; f++) {
      const a = h[f];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (a.type === 0)
        f || (r += "/"), r += a.value.replace(Fn, "\\$&"), p += 40;
      else if (a.type === 1) {
        const { value: y, repeatable: R, optional: b, regexp: v } = a;
        i.push({
          name: y,
          repeatable: R,
          optional: b
        });
        const E = v || Ze;
        if (E !== Ze) {
          p += 10;
          try {
            new RegExp(`(${E})`);
          } catch (x) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${E}): ` + x.message);
          }
        }
        let N = R ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        f || (N = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        b && h.length < 2 ? `(?:/${N})` : "/" + N), b && (N += "?"), r += N, p += 20, b && (p += -8), R && (p += -20), E === ".*" && (p += -50);
      }
      s.push(p);
    }
    o.push(s);
  }
  if (n.strict && n.end) {
    const h = o.length - 1;
    o[h][o[h].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
  const u = new RegExp(r, n.sensitive ? "" : "i");
  function d(h) {
    const s = h.match(u), f = {};
    if (!s)
      return null;
    for (let a = 1; a < s.length; a++) {
      const p = s[a] || "", y = i[a - 1];
      f[y.name] = p && y.repeatable ? p.split("/") : p;
    }
    return f;
  }
  function c(h) {
    let s = "", f = !1;
    for (const a of e) {
      (!f || !s.endsWith("/")) && (s += "/"), f = !1;
      for (const p of a)
        if (p.type === 0)
          s += p.value;
        else if (p.type === 1) {
          const { value: y, repeatable: R, optional: b } = p, v = y in h ? h[y] : "";
          if (j(v) && !R)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const E = j(v) ? v.join("/") : v;
          if (!E)
            if (b)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : f = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          s += E;
        }
    }
    return s || "/";
  }
  return {
    re: u,
    score: o,
    keys: i,
    parse: d,
    stringify: c
  };
}
function Gn(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function Kn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const i = Gn(o[n], r[n]);
    if (i)
      return i;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (et(o))
      return 1;
    if (et(r))
      return -1;
  }
  return r.length - o.length;
}
function et(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const zn = {
  type: 0,
  value: ""
}, Wn = /[a-zA-Z0-9_]/;
function Qn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[zn]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${h}": ${p}`);
  }
  let n = 0, o = n;
  const r = [];
  let i;
  function u() {
    i && r.push(i), i = [];
  }
  let d = 0, c, h = "", s = "";
  function f() {
    h && (n === 0 ? i.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (i.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), i.push({
      type: 1,
      value: h,
      regexp: s,
      repeatable: c === "*" || c === "+",
      optional: c === "*" || c === "?"
    })) : t("Invalid state to consume buffer"), h = "");
  }
  function a() {
    h += c;
  }
  for (; d < e.length; ) {
    if (c = e[d++], c === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (h && f(), u()) : c === ":" ? (f(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        c === "(" ? n = 2 : Wn.test(c) ? a() : (f(), n = 0, c !== "*" && c !== "?" && c !== "+" && d--);
        break;
      case 2:
        c === ")" ? s[s.length - 1] == "\\" ? s = s.slice(0, -1) + c : n = 3 : s += c;
        break;
      case 3:
        f(), n = 0, c !== "*" && c !== "?" && c !== "+" && d--, s = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), f(), u(), r;
}
function Yn(e, t, n) {
  const o = Hn(Qn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const i = /* @__PURE__ */ new Set();
    for (const u of o.keys)
      i.has(u.name) && k(`Found duplicated params with name "${u.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), i.add(u.name);
  }
  const r = P(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Jn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = ot({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function i(s, f, a) {
    const p = !a, y = Xn(s);
    process.env.NODE_ENV !== "production" && no(y, f), y.aliasOf = a && a.record;
    const R = ot(t, s), b = [
      y
    ];
    if ("alias" in s) {
      const N = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const x of N)
        b.push(P({}, y, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: a ? a.record.components : y.components,
          path: x,
          // we might be the child of an alias
          aliasOf: a ? a.record : y
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let v, E;
    for (const N of b) {
      const { path: x } = N;
      if (f && x[0] !== "/") {
        const M = f.record.path, B = M[M.length - 1] === "/" ? "" : "/";
        N.path = f.record.path + (x && B + x);
      }
      if (process.env.NODE_ENV !== "production" && N.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (v = Yn(N, f, R), process.env.NODE_ENV !== "production" && f && x[0] === "/" && oo(v, f), a ? (a.alias.push(v), process.env.NODE_ENV !== "production" && to(a, v)) : (E = E || v, E !== v && E.alias.push(v), p && s.name && !nt(v) && u(s.name)), y.children) {
        const M = y.children;
        for (let B = 0; B < M.length; B++)
          i(M[B], v, a && a.children[B]);
      }
      a = a || v, (v.record.components && Object.keys(v.record.components).length || v.record.name || v.record.redirect) && c(v);
    }
    return E ? () => {
      u(E);
    } : ce;
  }
  function u(s) {
    if (St(s)) {
      const f = o.get(s);
      f && (o.delete(s), n.splice(n.indexOf(f), 1), f.children.forEach(u), f.alias.forEach(u));
    } else {
      const f = n.indexOf(s);
      f > -1 && (n.splice(f, 1), s.record.name && o.delete(s.record.name), s.children.forEach(u), s.alias.forEach(u));
    }
  }
  function d() {
    return n;
  }
  function c(s) {
    let f = 0;
    for (; f < n.length && Kn(s, n[f]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[f].record.path || !Nt(s, n[f])); )
      f++;
    n.splice(f, 0, s), s.record.name && !nt(s) && o.set(s.record.name, s);
  }
  function h(s, f) {
    let a, p = {}, y, R;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw oe(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const E = Object.keys(s.params || {}).filter((N) => !a.keys.find((x) => x.name === N));
        E.length && k(`Discarded invalid param(s) "${E.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      R = a.record.name, p = P(
        // paramsFromLocation is a new object
        tt(
          f.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          a.keys.filter((E) => !E.optional).concat(a.parent ? a.parent.keys.filter((E) => E.optional) : []).map((E) => E.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && tt(s.params, a.keys.map((E) => E.name))
      ), y = a.stringify(p);
    } else if (s.path != null)
      y = s.path, process.env.NODE_ENV !== "production" && !y.startsWith("/") && k(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((E) => E.re.test(y)), a && (p = a.parse(y), R = a.record.name);
    else {
      if (a = f.name ? o.get(f.name) : n.find((E) => E.re.test(f.path)), !a)
        throw oe(1, {
          location: s,
          currentLocation: f
        });
      R = a.record.name, p = P({}, f.params, s.params), y = a.stringify(p);
    }
    const b = [];
    let v = a;
    for (; v; )
      b.unshift(v.record), v = v.parent;
    return {
      name: R,
      path: y,
      params: p,
      matched: b,
      meta: eo(b)
    };
  }
  return e.forEach((s) => i(s)), { addRoute: i, resolve: h, removeRoute: u, getRoutes: d, getRecordMatcher: r };
}
function tt(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Xn(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Zn(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Zn(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const o in e.components)
      t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function nt(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function eo(e) {
  return e.reduce((t, n) => P(t, n.meta), {});
}
function ot(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function Te(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function to(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Te.bind(null, n)))
      return k(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Te.bind(null, n)))
      return k(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function no(e, t) {
  t && t.record.name && !e.name && !e.path && k(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function oo(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Te.bind(null, n)))
      return k(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Nt(e, t) {
  return t.children.some((n) => n === e || Nt(e, n));
}
function ro(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const i = o[r].replace(_t, " "), u = i.indexOf("="), d = ne(u < 0 ? i : i.slice(0, u)), c = u < 0 ? null : ne(i.slice(u + 1));
    if (d in t) {
      let h = t[d];
      j(h) || (h = t[d] = [h]), h.push(c);
    } else
      t[d] = c;
  }
  return t;
}
function rt(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = En(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (j(o) ? o.map((i) => i && $e(i)) : [o && $e(o)]).forEach((i) => {
      i !== void 0 && (t += (t.length ? "&" : "") + n, i != null && (t += "=" + i));
    });
  }
  return t;
}
function so(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = j(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const ao = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), st = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Me = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Ct = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), xe = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function ae() {
  let e = [];
  function t(o) {
    return e.push(o), () => {
      const r = e.indexOf(o);
      r > -1 && e.splice(r, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function K(e, t, n, o, r, i = (u) => u()) {
  const u = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((d, c) => {
    const h = (a) => {
      a === !1 ? c(oe(4, {
        from: n,
        to: t
      })) : a instanceof Error ? c(a) : ge(a) ? c(oe(2, {
        from: t,
        to: a
      })) : (u && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === u && typeof a == "function" && u.push(a), d());
    }, s = i(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? io(h, t, n) : h));
    let f = Promise.resolve(s);
    if (e.length < 3 && (f = f.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        f = f.then((p) => h._called ? p : (k(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        k(a), c(new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((a) => c(a));
  });
}
function io(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && k(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Ce(e, t, n, o, r = (i) => i()) {
  const i = [];
  for (const u of e) {
    process.env.NODE_ENV !== "production" && !u.components && !u.children.length && k(`Record with path "${u.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in u.components) {
      let c = u.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!c || typeof c != "object" && typeof c != "function")
          throw k(`Component "${d}" in record with path "${u.path}" is not a valid component. Received "${String(c)}".`), new Error("Invalid route component");
        if ("then" in c) {
          k(`Component "${d}" in record with path "${u.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = c;
          c = () => h;
        } else
          c.__asyncLoader && // warn only once per component
          !c.__warnedDefineAsync && (c.__warnedDefineAsync = !0, k(`Component "${d}" in record with path "${u.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !u.instances[d]))
        if (co(c)) {
          const s = (c.__vccOpts || c)[t];
          s && i.push(K(s, n, o, u, d, r));
        } else {
          let h = c();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (k(`Component "${d}" in record with path "${u.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), i.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${u.path}"`));
            const f = ln(s) ? s.default : s;
            u.components[d] = f;
            const p = (f.__vccOpts || f)[t];
            return p && K(p, n, o, u, d, r)();
          }));
        }
    }
  }
  return i;
}
function co(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function at(e) {
  const t = H(Me), n = H(Ct);
  let o = !1, r = null;
  const i = L(() => {
    const s = Z(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (ge(s) || (o ? k(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : k(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), u = L(() => {
    const { matched: s } = i.value, { length: f } = s, a = s[f - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const y = p.findIndex(z.bind(null, a));
    if (y > -1)
      return y;
    const R = it(s[f - 2]);
    return (
      // we are dealing with nested routes
      f > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      it(a) === R && // avoid comparing the child with its parent
      p[p.length - 1].path !== R ? p.findIndex(z.bind(null, s[f - 2])) : y
    );
  }), d = L(() => u.value > -1 && ho(n.params, i.value.params)), c = L(() => u.value > -1 && u.value === n.matched.length - 1 && kt(n.params, i.value.params));
  function h(s = {}) {
    return fo(s) ? t[Z(e.replace) ? "replace" : "push"](
      Z(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ce) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && F) {
    const s = dt();
    if (s) {
      const f = {
        route: i.value,
        isActive: d.value,
        isExactActive: c.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(f), Wt(() => {
        f.route = i.value, f.isActive = d.value, f.isExactActive = c.value, f.error = ge(Z(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: i,
    href: L(() => i.value.href),
    isActive: d,
    isExactActive: c,
    navigate: h
  };
}
const lo = /* @__PURE__ */ W({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: at,
  setup(e, { slots: t }) {
    const n = zt(at(e)), { options: o } = H(Me), r = L(() => ({
      [ct(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [ct(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const i = t.default && t.default(n);
      return e.custom ? i : ft("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, i);
    };
  }
}), uo = lo;
function fo(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function ho(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!j(r) || r.length !== o.length || o.some((i, u) => i !== r[u]))
      return !1;
  }
  return !0;
}
function it(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const ct = (e, t, n) => e ?? t ?? n, po = /* @__PURE__ */ W({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    process.env.NODE_ENV !== "production" && go();
    const o = H(xe), r = L(() => e.route || o.value), i = H(st, 0), u = L(() => {
      let h = Z(i);
      const { matched: s } = r.value;
      let f;
      for (; (f = s[h]) && !f.components; )
        h++;
      return h;
    }), d = L(() => r.value.matched[u.value]);
    Re(st, L(() => u.value + 1)), Re(ao, d), Re(xe, r);
    const c = V();
    return Ve(() => [c.value, d.value, e.name], ([h, s, f], [a, p, y]) => {
      s && (s.instances[f] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !z(s, p) || !a) && (s.enterCallbacks[f] || []).forEach((R) => R(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, f = d.value, a = f && f.components[s];
      if (!a)
        return lt(n.default, { Component: a, route: h });
      const p = f.props[s], y = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, b = ft(a, P({}, y, t, {
        onVnodeUnmounted: (v) => {
          v.component.isUnmounted && (f.instances[s] = null);
        },
        ref: c
      }));
      if (process.env.NODE_ENV !== "production" && F && b.ref) {
        const v = {
          depth: u.value,
          name: f.name,
          path: f.path,
          meta: f.meta
        };
        (j(b.ref) ? b.ref.map((N) => N.i) : [b.ref.i]).forEach((N) => {
          N.__vrv_devtools = v;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        lt(n.default, { Component: b, route: h }) || b
      );
    };
  }
});
function lt(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const vo = po;
function go() {
  const e = dt(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    k(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
  }
}
function ie(e, t) {
  const n = P({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => Co(o, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: !0,
      display: e.fullPath,
      tooltip: t,
      value: n
    }
  };
}
function pe(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let mo = 0;
function yo(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = mo++;
  cn({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (r) => {
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((s, f) => {
      s.instanceData && s.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: ie(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: f }) => {
      if (f.__vrv_devtools) {
        const a = f.__vrv_devtools;
        s.tags.push({
          label: (a.name ? `${a.name.toString()}: ` : "") + a.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: Pt
        });
      }
      j(f.__vrl_devtools) && (f.__devtoolsApi = r, f.__vrl_devtools.forEach((a) => {
        let p = a.route.path, y = At, R = "", b = 0;
        a.error ? (p = a.error, y = ko, b = Ro) : a.isExactActive ? (y = Ot, R = "This is exactly active") : a.isActive && (y = $t, R = "This link is active"), s.tags.push({
          label: p,
          textColor: b,
          tooltip: R,
          backgroundColor: y
        });
      }));
    }), Ve(t.currentRoute, () => {
      c(), r.notifyComponentUpdate(), r.sendInspectorTree(d), r.sendInspectorState(d);
    });
    const i = "router:navigations:" + o;
    r.addTimelineLayer({
      id: i,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((s, f) => {
      r.addTimelineEvent({
        layerId: i,
        event: {
          title: "Error during Navigation",
          subtitle: f.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: s },
          groupId: f.meta.__navigationId
        }
      });
    });
    let u = 0;
    t.beforeEach((s, f) => {
      const a = {
        guard: pe("beforeEach"),
        from: ie(f, "Current Location during this navigation"),
        to: ie(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: u++
      }), r.addTimelineEvent({
        layerId: i,
        event: {
          time: r.now(),
          title: "Start of navigation",
          subtitle: s.fullPath,
          data: a,
          groupId: s.meta.__navigationId
        }
      });
    }), t.afterEach((s, f, a) => {
      const p = {
        guard: pe("afterEach")
      };
      a ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: a ? a.message : "",
          tooltip: "Navigation Failure",
          value: a
        }
      }, p.status = pe("❌")) : p.status = pe("✅"), p.from = ie(f, "Current Location during this navigation"), p.to = ie(s, "Target location"), r.addTimelineEvent({
        layerId: i,
        event: {
          title: "End of navigation",
          subtitle: s.fullPath,
          time: r.now(),
          data: p,
          logType: a ? "warning" : "default",
          groupId: s.meta.__navigationId
        }
      });
    });
    const d = "router-inspector:" + o;
    r.addInspector({
      id: d,
      label: "Routes" + (o ? " " + o : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function c() {
      if (!h)
        return;
      const s = h;
      let f = n.getRoutes().filter((a) => !a.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !a.parent.record.components);
      f.forEach(Dt), s.filter && (f = f.filter((a) => (
        // save matches state based on the payload
        De(a, s.filter.toLowerCase())
      ))), f.forEach((a) => xt(a, t.currentRoute.value)), s.rootNodes = f.map(Tt);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && c();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === d) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        a && (s.state = {
          options: Eo(a)
        });
      }
    }), r.sendInspectorTree(d), r.sendInspectorState(d);
  });
}
function _o(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function Eo(e) {
  const { record: t } = e, n = [
    { editable: !1, key: "path", value: t.path }
  ];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({ editable: !1, key: "regexp", value: e.re }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.keys.map((o) => `${o.name}${_o(o)}`).join(" "),
        tooltip: "Param keys",
        value: e.keys
      }
    }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((o) => o.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.score.map((o) => o.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: e.score
      }
    }
  }), n;
}
const Pt = 15485081, $t = 2450411, Ot = 8702998, bo = 2282478, At = 16486972, wo = 6710886, ko = 16704226, Ro = 12131356;
function Tt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: bo
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: At
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Pt
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: Ot
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: $t
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: wo
  });
  let o = n.__vd_id;
  return o == null && (o = String(So++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Tt)
  };
}
let So = 0;
const No = /^\/(.*)\/([a-z]*)$/;
function xt(e, t) {
  const n = t.matched.length && z(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => z(o, e.record))), e.children.forEach((o) => xt(o, t));
}
function Dt(e) {
  e.__vd_match = !1, e.children.forEach(Dt);
}
function De(e, t) {
  const n = String(e.re).match(No);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((u) => De(u, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), i = ne(r);
  return !t.startsWith("/") && (i.includes(t) || r.includes(t)) || i.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((u) => De(u, t));
}
function Co(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function Po(e) {
  const t = Jn(e.routes, e), n = e.parseQuery || ro, o = e.stringifyQuery || rt, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const i = ae(), u = ae(), d = ae(), c = Ht(G);
  let h = G;
  F && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = Se.bind(null, (l) => "" + l), f = Se.bind(null, wn), a = (
    // @ts-expect-error: intentionally avoid the type check
    Se.bind(null, ne)
  );
  function p(l, m) {
    let g, _;
    return St(l) ? (g = t.getRecordMatcher(l), process.env.NODE_ENV !== "production" && !g && k(`Parent route "${String(l)}" not found when adding child route`, m), _ = m) : _ = l, t.addRoute(_, g);
  }
  function y(l) {
    const m = t.getRecordMatcher(l);
    m ? t.removeRoute(m) : process.env.NODE_ENV !== "production" && k(`Cannot remove non-existent route "${String(l)}"`);
  }
  function R() {
    return t.getRoutes().map((l) => l.record);
  }
  function b(l) {
    return !!t.getRecordMatcher(l);
  }
  function v(l, m) {
    if (m = P({}, m || c.value), typeof l == "string") {
      const w = Ne(n, l, m.path), T = t.resolve({ path: w.path }, m), Q = r.createHref(w.fullPath);
      return process.env.NODE_ENV !== "production" && (Q.startsWith("//") ? k(`Location "${l}" resolved to "${Q}". A resolved location cannot start with multiple slashes.`) : T.matched.length || k(`No match found for location with path "${l}"`)), P(w, T, {
        params: a(T.params),
        hash: ne(w.hash),
        redirectedFrom: void 0,
        href: Q
      });
    }
    process.env.NODE_ENV !== "production" && !ge(l) && (k(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, l), l = {});
    let g;
    if (l.path != null)
      process.env.NODE_ENV !== "production" && "params" in l && !("name" in l) && // @ts-expect-error: the type is never
      Object.keys(l.params).length && k(`Path "${l.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), g = P({}, l, {
        path: Ne(n, l.path, m.path).path
      });
    else {
      const w = P({}, l.params);
      for (const T in w)
        w[T] == null && delete w[T];
      g = P({}, l, {
        params: f(w)
      }), m.params = f(m.params);
    }
    const _ = t.resolve(g, m), C = l.hash || "";
    process.env.NODE_ENV !== "production" && C && !C.startsWith("#") && k(`A \`hash\` should always start with the character "#". Replace "${C}" with "#${C}".`), _.params = s(a(_.params));
    const D = Sn(o, P({}, l, {
      hash: _n(C),
      path: _.path
    })), S = r.createHref(D);
    return process.env.NODE_ENV !== "production" && (S.startsWith("//") ? k(`Location "${l}" resolved to "${S}". A resolved location cannot start with multiple slashes.`) : _.matched.length || k(`No match found for location with path "${l.path != null ? l.path : l}"`)), P({
      fullPath: D,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: C,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === rt ? so(l.query) : l.query || {}
      )
    }, _, {
      redirectedFrom: void 0,
      href: S
    });
  }
  function E(l) {
    return typeof l == "string" ? Ne(n, l, c.value.path) : P({}, l);
  }
  function N(l, m) {
    if (h !== l)
      return oe(8, {
        from: m,
        to: l
      });
  }
  function x(l) {
    return re(l);
  }
  function M(l) {
    return x(P(E(l), { replace: !0 }));
  }
  function B(l) {
    const m = l.matched[l.matched.length - 1];
    if (m && m.redirect) {
      const { redirect: g } = m;
      let _ = typeof g == "function" ? g(l) : g;
      if (typeof _ == "string" && (_ = _.includes("?") || _.includes("#") ? _ = E(_) : (
        // force empty params
        { path: _ }
      ), _.params = {}), process.env.NODE_ENV !== "production" && _.path == null && !("name" in _))
        throw k(`Invalid redirect found:
${JSON.stringify(_, null, 2)}
 when navigating to "${l.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return P({
        query: l.query,
        hash: l.hash,
        // avoid transferring params if the redirect has a path
        params: _.path != null ? {} : l.params
      }, _);
    }
  }
  function re(l, m) {
    const g = h = v(l), _ = c.value, C = l.state, D = l.force, S = l.replace === !0, w = B(g);
    if (w)
      return re(
        P(E(w), {
          state: typeof w == "object" ? P({}, C, w.state) : C,
          force: D,
          replace: S
        }),
        // keep original redirectedFrom if it exists
        m || g
      );
    const T = g;
    T.redirectedFrom = m;
    let Q;
    return !D && We(o, _, g) && (Q = oe(16, { to: T, from: _ }), He(
      _,
      _,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (Q ? Promise.resolve(Q) : Ue(T, _)).catch((I) => q(I) ? (
      // navigation redirects still mark the router as ready
      q(
        I,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? I : be(I)
    ) : (
      // reject any unknown error
      Ee(I, T, _)
    )).then((I) => {
      if (I) {
        if (q(
          I,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          We(o, v(I.to), T) && // and we have done it a couple of times
          m && // @ts-expect-error: added only in dev
          (m._count = m._count ? (
            // @ts-expect-error
            m._count + 1
          ) : 1) > 30 ? (k(`Detected a possibly infinite redirection in a navigation guard when going from "${_.fullPath}" to "${T.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : re(
            // keep options
            P({
              // preserve an existing replacement but allow the redirect to override it
              replace: S
            }, E(I.to), {
              state: typeof I.to == "object" ? P({}, C, I.to.state) : C,
              force: D
            }),
            // preserve the original redirectedFrom if any
            m || T
          );
      } else
        I = qe(T, _, !0, S, C);
      return Be(T, _, I), I;
    });
  }
  function Bt(l, m) {
    const g = N(l, m);
    return g ? Promise.reject(g) : Promise.resolve();
  }
  function ye(l) {
    const m = he.values().next().value;
    return m && typeof m.runWithContext == "function" ? m.runWithContext(l) : l();
  }
  function Ue(l, m) {
    let g;
    const [_, C, D] = $o(l, m);
    g = Ce(_.reverse(), "beforeRouteLeave", l, m);
    for (const w of _)
      w.leaveGuards.forEach((T) => {
        g.push(K(T, l, m));
      });
    const S = Bt.bind(null, l, m);
    return g.push(S), J(g).then(() => {
      g = [];
      for (const w of i.list())
        g.push(K(w, l, m));
      return g.push(S), J(g);
    }).then(() => {
      g = Ce(C, "beforeRouteUpdate", l, m);
      for (const w of C)
        w.updateGuards.forEach((T) => {
          g.push(K(T, l, m));
        });
      return g.push(S), J(g);
    }).then(() => {
      g = [];
      for (const w of D)
        if (w.beforeEnter)
          if (j(w.beforeEnter))
            for (const T of w.beforeEnter)
              g.push(K(T, l, m));
          else
            g.push(K(w.beforeEnter, l, m));
      return g.push(S), J(g);
    }).then(() => (l.matched.forEach((w) => w.enterCallbacks = {}), g = Ce(D, "beforeRouteEnter", l, m, ye), g.push(S), J(g))).then(() => {
      g = [];
      for (const w of u.list())
        g.push(K(w, l, m));
      return g.push(S), J(g);
    }).catch((w) => q(
      w,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? w : Promise.reject(w));
  }
  function Be(l, m, g) {
    d.list().forEach((_) => ye(() => _(l, m, g)));
  }
  function qe(l, m, g, _, C) {
    const D = N(l, m);
    if (D)
      return D;
    const S = m === G, w = F ? history.state : {};
    g && (_ || S ? r.replace(l.fullPath, P({
      scroll: S && w && w.scroll
    }, C)) : r.push(l.fullPath, C)), c.value = l, He(l, m, g, S), be();
  }
  let se;
  function qt() {
    se || (se = r.listen((l, m, g) => {
      if (!Ge.listening)
        return;
      const _ = v(l), C = B(_);
      if (C) {
        re(P(C, { replace: !0 }), _).catch(ce);
        return;
      }
      h = _;
      const D = c.value;
      F && xn(Ye(D.fullPath, g.delta), me()), Ue(_, D).catch((S) => q(
        S,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? S : q(
        S,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (re(
        S.to,
        _
        // avoid an uncaught rejection, let push call triggerError
      ).then((w) => {
        q(
          w,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !g.delta && g.type === ue.pop && r.go(-1, !1);
      }).catch(ce), Promise.reject()) : (g.delta && r.go(-g.delta, !1), Ee(S, _, D))).then((S) => {
        S = S || qe(
          // after navigation, all matched components are resolved
          _,
          D,
          !1
        ), S && (g.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !q(
          S,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-g.delta, !1) : g.type === ue.pop && q(
          S,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Be(_, D, S);
      }).catch(ce);
    }));
  }
  let _e = ae(), Fe = ae(), de;
  function Ee(l, m, g) {
    be(l);
    const _ = Fe.list();
    return _.length ? _.forEach((C) => C(l, m, g)) : (process.env.NODE_ENV !== "production" && k("uncaught error during route navigation:"), console.error(l)), Promise.reject(l);
  }
  function Ft() {
    return de && c.value !== G ? Promise.resolve() : new Promise((l, m) => {
      _e.add([l, m]);
    });
  }
  function be(l) {
    return de || (de = !l, qt(), _e.list().forEach(([m, g]) => l ? g(l) : m()), _e.reset()), l;
  }
  function He(l, m, g, _) {
    const { scrollBehavior: C } = e;
    if (!F || !C)
      return Promise.resolve();
    const D = !g && Dn(Ye(l.fullPath, 0)) || (_ || !g) && history.state && history.state.scroll || null;
    return Kt().then(() => C(l, m, D)).then((S) => S && Tn(S)).catch((S) => Ee(S, l, m));
  }
  const we = (l) => r.go(l);
  let ke;
  const he = /* @__PURE__ */ new Set(), Ge = {
    currentRoute: c,
    listening: !0,
    addRoute: p,
    removeRoute: y,
    hasRoute: b,
    getRoutes: R,
    resolve: v,
    options: e,
    push: x,
    replace: M,
    go: we,
    back: () => we(-1),
    forward: () => we(1),
    beforeEach: i.add,
    beforeResolve: u.add,
    afterEach: d.add,
    onError: Fe.add,
    isReady: Ft,
    install(l) {
      const m = this;
      l.component("RouterLink", uo), l.component("RouterView", vo), l.config.globalProperties.$router = m, Object.defineProperty(l.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Z(c)
      }), F && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !ke && c.value === G && (ke = !0, x(r.location).catch((C) => {
        process.env.NODE_ENV !== "production" && k("Unexpected error when starting the router:", C);
      }));
      const g = {};
      for (const C in G)
        Object.defineProperty(g, C, {
          get: () => c.value[C],
          enumerable: !0
        });
      l.provide(Me, m), l.provide(Ct, Gt(g)), l.provide(xe, c);
      const _ = l.unmount;
      he.add(l), l.unmount = function() {
        he.delete(l), he.size < 1 && (h = G, se && se(), se = null, c.value = G, ke = !1, de = !1), _();
      }, process.env.NODE_ENV !== "production" && F && yo(l, m, t);
    }
  };
  function J(l) {
    return l.reduce((m, g) => m.then(() => ye(g)), Promise.resolve());
  }
  return Ge;
}
function $o(e, t) {
  const n = [], o = [], r = [], i = Math.max(t.matched.length, e.matched.length);
  for (let u = 0; u < i; u++) {
    const d = t.matched[u];
    d && (e.matched.find((h) => z(h, d)) ? o.push(d) : n.push(d));
    const c = e.matched[u];
    c && (t.matched.find((h) => z(h, c)) || r.push(c));
  }
  return [n, o, r];
}
const Oo = [
  {
    _id: "61a9ae14e04e3d5bffb26ef7",
    label: "VETS2011 Physiology",
    tags: ["course:VETS2011"],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7"
  },
  {
    _id: "624380e164c71f1df2110dfd",
    label: "Respiratory Physiology",
    tags: [
      "course:VETS2012",
      "subject:Physiology",
      "system:Respiratory_System"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd"
  },
  {
    _id: "6290636464c71f1df2110ec9",
    label: "Equine Exercise Physiology",
    tags: [
      "course:VETS2011",
      "subject:Physiology",
      "system:Exercise",
      "animal:Horse"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9"
  }
], Ao = ["VET2011"], To = [
  { "course:Unknown": 10 },
  { "course:Unknown": 10 },
  { "course:Unknown": 10 },
  { "course:Unknown": 10 },
  { "subject:Unknown": 20 },
  { "system:Unknown": 15 },
  { "system:Unknow": 20 },
  { "topic:Unknow": 10 }
], xo = async (e, t, n) => {
  try {
    return await (await fetch(
      `${n}?${new URLSearchParams({
        level: t.toString(),
        tag: e
      })}`
    )).json();
  } catch (o) {
    console.error("Error fetching data from the server", o), alert("Error fetching data from the server, only display test data.");
  }
}, Do = async (e, t, n) => {
  try {
    return await xo(e, t, n) || Oo.filter(
      (r) => r.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, Io = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), r = await (await fetch(`${t}?${n}`)).json() ?? Ao, i = new Set(r);
    return Array.from(i);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, Vo = async (e) => {
  try {
    return await (await fetch(e)).json();
  } catch (t) {
    return alert(
      "An error occurred while fetching tags" + t + "fallback to static tags"
    ), {};
  }
}, jo = async (e) => {
  const t = await Vo(e), n = Object.keys(t).map((o) => ({
    [o]: t[o]
  }));
  return It(n);
}, It = (e) => e ? e.reduce(
  (t, n) => {
    const [o, r] = Object.keys(n)[0].split(":"), i = Object.values(n)[0];
    return t[o] || (t[o] = []), t[o].push({ [r.replace("_", " ")]: i }), t;
  },
  {}
) : {}, Lo = It(To), Mo = { class: "search-results-container" }, Uo = { class: "container-description" }, Bo = { class: "label-badges" }, qo = {
  key: 0,
  class: "results"
}, Fo = ["href"], Ho = {
  key: 1,
  class: "no-results"
}, Go = /* @__PURE__ */ W({
  __name: "DisplayResult",
  setup(e) {
    const t = H("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag", n = V([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = Ut(), r = V(""), i = V(5);
    je(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, i.value = Number(o.currentRoute.value.query.level), await u(r.value, i.value)) : r.value = "undefined";
    });
    const u = async (d, c) => {
      const h = await Do(
        d,
        c,
        t
      );
      h && (n.value = h);
    };
    return Ve(o.currentRoute, async (d, c) => {
      const h = d.query.tag || "", s = c.query.tag || "";
      h !== s && await u(h, i.value);
    }), (d, c) => (O(), A("div", Mo, [
      $("div", Uo, [
        $("button", {
          onClick: c[0] || (c[0] = () => d.$router.back())
        }, "↵"),
        $("div", Bo, " (" + U(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? (O(), A("div", qo, [
        $("ul", null, [
          (O(!0), A(Y, null, ee(n.value, (h, s) => (O(), A("li", { key: s }, [
            $("a", {
              href: h.url,
              target: "_blank",
              class: "linkToResource"
            }, U(h.label), 9, Fo)
          ]))), 128))
        ])
      ])) : (O(), A("p", Ho, "No results found"))
    ]));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Ie = /* @__PURE__ */ fe(Go, [["__scopeId", "data-v-071ed10d"]]), Vt = (e) => (ht("data-v-b97c2a53"), e = e(), pt(), e), Ko = /* @__PURE__ */ Vt(() => /* @__PURE__ */ $("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }, null, -1)), zo = /* @__PURE__ */ Vt(() => /* @__PURE__ */ $("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}, null, -1)), Wo = [
  Ko,
  zo
], Qo = /* @__PURE__ */ W({
  __name: "CollapseBtn",
  props: { showDropdown: Boolean },
  setup(e) {
    return (t, n) => (O(), A("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      class: ve(
        e.showDropdown ? "collapse-btn collapse-btn-rotation" : "collapse-btn"
      )
    }, Wo, 2));
  }
}), jt = /* @__PURE__ */ fe(Qo, [["__scopeId", "data-v-b97c2a53"]]), ut = /* @__PURE__ */ W({
  __name: "FilterButton",
  props: {
    actionType: {}
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = t, { actionType: o } = e, r = {
      apply: "Apply",
      clear: "Clear",
      default: "Default"
      // ... Add more
    }, i = L(() => r[o] || "Default");
    return (u, d) => (O(), A("button", {
      class: "filter-btn",
      onClick: d[0] || (d[0] = (c) => n("click", u.actionType))
    }, U(i.value), 1));
  }
}), Lt = (e) => (ht("data-v-99d5bb92"), e = e(), pt(), e), Yo = { class: "crucible-filter-container" }, Jo = {
  key: 0,
  class: "crucible-filter-panel"
}, Xo = { class: "crucible-filter-action" }, Zo = /* @__PURE__ */ Lt(() => /* @__PURE__ */ $("hr", null, null, -1)), er = /* @__PURE__ */ Lt(() => /* @__PURE__ */ $("h5", null, "Selected:", -1)), tr = { class: "crucible-filter-collection" }, nr = ["onClick"], or = { class: "capital-first" }, rr = { class: "crucible-filters" }, sr = ["onClick"], ar = { class: "crucible-filter-dropdown-menu" }, ir = ["id", "value", "checked", "onClick"], cr = ["for"], lr = /* @__PURE__ */ W({
  __name: "CrucibleFilter",
  emits: ["updateFilterTagArray", "checkTaxonomyExists"],
  setup(e, { emit: t }) {
    const n = t, o = H("$filterSetApi") || "http://localhost:8080/api/resource/getFilterSet", r = V(!1), i = V({}), u = V([]), d = V({}), c = V(!1), h = (y) => {
      i.value[y] = !i.value[y], console.log(c.value);
    }, s = (y, R) => {
      const b = `${y}:${R.replace(" ", "_")}`;
      u.value.includes(b) ? u.value = u.value.filter(
        (v) => v !== b
      ) : u.value.push(b);
    }, f = L(() => u.value.map(
      (y) => y.split(":")[1].replace("_", " ")
    )), a = () => {
      i.value = {}, u.value = [];
    }, p = () => {
      n("updateFilterTagArray", u);
    };
    return je(async () => {
      const y = await jo(o), R = Object.keys(y).length > 0;
      d.value = R ? y : Lo, c.value = R, n("checkTaxonomyExists", c);
    }), (y, R) => (O(), A("div", Yo, [
      r.value ? (O(), A("div", Jo, [
        $("div", Xo, [
          te(ut, {
            "action-type": "apply",
            onClick: p
          }),
          te(ut, {
            "action-type": "clear",
            onClick: a
          })
        ]),
        Zo,
        er,
        $("div", tr, [
          (O(!0), A(Y, null, ee(u.value, (b, v) => (O(), A("span", {
            key: v,
            onClick: (E) => u.value.splice(v, 1)
          }, [
            Qt(" ☒ "),
            $("strong", null, U(b.split(":")[0]), 1),
            $("span", or, U(b.split(":")[1].replace("_", " ")), 1)
          ], 8, nr))), 128))
        ]),
        $("div", rr, [
          (O(!0), A(Y, null, ee(d.value, (b, v) => (O(), A("div", {
            key: v,
            class: "crucible-filter-dropdown"
          }, [
            $("h4", {
              class: ve(i.value[v] ? "selected-background" : ""),
              onClick: (E) => h(v)
            }, [
              $("span", null, U(v), 1),
              te(jt, {
                "show-dropdown": i.value[v]
              }, null, 8, ["show-dropdown"])
            ], 10, sr),
            vt($("div", ar, [
              (O(!0), A(Y, null, ee(b, (E, N) => (O(), A("div", {
                key: N,
                class: ve(
                  f.value.includes(Object.keys(E)[0]) ? "selected-filter-tag column" : "column"
                )
              }, [
                $("input", {
                  id: `tag-${v}-${N.toString()}`,
                  type: "checkbox",
                  value: Object.keys(E)[0],
                  checked: f.value.includes(Object.keys(E)[0]),
                  onClick: (x) => s(v, Object.keys(E)[0])
                }, null, 8, ir),
                $("label", {
                  for: `tag-${v}-${N.toString()}`
                }, [
                  $("span", null, U(Object.keys(E)[0]), 1),
                  $("span", null, " (" + U(Object.values(E)[0]) + ") ", 1)
                ], 8, cr)
              ], 2))), 128))
            ], 512), [
              [Yt, i.value[v]]
            ])
          ]))), 128))
        ])
      ])) : gt("", !0),
      $("button", {
        class: ve(
          r.value ? "crucible-filter-control svg-background-light" : "crucible-filter-control crucible-filter-control-light svg-background-dark"
        ),
        onClick: R[0] || (R[0] = (b) => r.value = !r.value)
      }, null, 2)
    ]));
  }
}), Mt = /* @__PURE__ */ fe(lr, [["__scopeId", "data-v-99d5bb92"]]), ur = { id: "app" }, fr = { class: "main" }, dr = /* @__PURE__ */ W({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = Ke("CrucibleSearch"), r = Ke("RouterView");
      return O(), A("div", ur, [
        $("div", fr, [
          te(o),
          te(r),
          $("div", null, [
            te(Mt)
          ])
        ])
      ]);
    };
  }
}), hr = /* @__PURE__ */ fe(dr, [["__scopeId", "data-v-aabb2d26"]]), pr = [
  { path: "/", component: hr },
  { path: "/search", component: Ie }
], vr = Po({
  history: Ln("/"),
  routes: pr
});
function Ut() {
  const e = H("$router");
  return e || vr;
}
const gr = { class: "search-container" }, mr = { key: 0 }, yr = ["onClick"], _r = 10, Er = /* @__PURE__ */ W({
  __name: "CrucibleSearch",
  props: {
    level: {
      type: Number,
      default: 5
    }
  },
  setup(e) {
    const t = Ut(), n = V(""), o = V([]), r = V(!1), i = V(null), u = H("$tagsApi") || "http://localhost:8080/api/resource/alltags", d = e, { level: c } = Jt(d), h = (v) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(v.toLowerCase())
    ), s = (v) => v.replace(/_/g, " "), f = (v) => v.replace(/ /g, "_"), a = async () => {
      n.value ? (o.value = (await Io(n.value, u)).slice(0, _r), o.value = o.value.map(s), r.value = !0) : (o.value = [], r.value = !1);
    }, p = (v) => {
      n.value = o.value.includes(v) ? v : o.value[0], r.value = !1, t.push({
        path: "/search",
        query: { tag: f(n.value), level: Number(c.value) }
      });
    }, y = () => {
      o.value.length && n.value && (r.value = !0);
    }, R = (v) => {
      v.key === "Enter" ? (p(n.value), n.value = "") : v.key === "Tab" && (v.preventDefault(), n.value = o.value[0] ?? n.value);
    }, b = (v) => {
      i.value && !i.value.contains(v.target) && (r.value = !1);
    };
    return je(() => {
      document.addEventListener("click", b);
    }), Xt(() => {
      document.removeEventListener("click", b);
    }), (v, E) => (O(), A("div", gr, [
      $("div", {
        ref_key: "searchBoxRef",
        ref: i,
        class: "search-container"
      }, [
        vt($("input", {
          "onUpdate:modelValue": E[0] || (E[0] = (N) => n.value = N),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: a,
          onFocus: y,
          onKeydown: R
        }, null, 544), [
          [Zt, n.value]
        ]),
        o.value.length && n.value && r.value ? (O(), A("ul", mr, [
          (O(!0), A(Y, null, ee(o.value, (N) => (O(), A("li", {
            key: N,
            onClick: (x) => p(N)
          }, [
            (O(!0), A(Y, null, ee(N.split(""), (x, M) => (O(), A(Y, null, [
              h(x) ? (O(), A("strong", {
                key: `strong-${M}`
              }, U(x), 1)) : (O(), A("span", { key: M }, U(x), 1))
            ], 64))), 256))
          ], 8, yr))), 128))
        ])) : gt("", !0)
      ], 512)
    ]));
  }
}), br = /* @__PURE__ */ fe(Er, [["__scopeId", "data-v-be9b233e"]]);
function kr(e, t) {
  const { router: n, getApi: o, tagsApi: r, filterSetApi: i } = t;
  e.component("CrucibleSearch", br), e.component("DisplayResult", Ie), e.component("CrucibleFilter", Mt), e.component("CollapseBtn", jt), e.provide("$router", n || null), e.provide("$getApi", o || null), e.provide("$tagsApi", r || null), e.provide("$filterSetApi", i || null), n.addRoute({ path: "/search", component: Ie });
}
export {
  jt as CollapseBtn,
  Mt as CrucibleFilter,
  br as CrucibleSearch,
  Ie as DisplayResult,
  kr as createSearchFilterPlugin
};
