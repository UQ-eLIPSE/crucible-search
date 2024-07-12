import { shallowRef as Gt, unref as Z, shallowReactive as Kt, nextTick as zt, defineComponent as W, reactive as Wt, inject as B, computed as j, h as ht, provide as Re, ref as L, watch as Ve, getCurrentInstance as pt, watchEffect as Qt, onMounted as je, openBlock as O, createElementBlock as $, createElementVNode as T, toDisplayString as M, Fragment as Y, renderList as ee, normalizeClass as Ce, pushScopeId as gt, popScopeId as mt, createVNode as te, createTextVNode as Ke, withDirectives as vt, vShow as Yt, createCommentVNode as yt, resolveComponent as ze, onUnmounted as Jt, vModelText as Xt } from "vue";
function Zt() {
  return _t().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function _t() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const en = typeof Proxy == "function", tn = "devtools-plugin:setup", nn = "plugin:settings:set";
let X, Ne;
function on() {
  var e;
  return X !== void 0 || (typeof window < "u" && window.performance ? (X = !0, Ne = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (X = !0, Ne = globalThis.perf_hooks.performance) : X = !1), X;
}
function rn() {
  return on() ? Ne.now() : Date.now();
}
class sn {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const l in t.settings) {
        const d = t.settings[l];
        o[l] = d.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let c = Object.assign({}, o);
    try {
      const l = localStorage.getItem(r), d = JSON.parse(l);
      Object.assign(c, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return c;
      },
      setSettings(l) {
        try {
          localStorage.setItem(r, JSON.stringify(l));
        } catch {
        }
        c = l;
      },
      now() {
        return rn();
      }
    }, n && n.on(nn, (l, d) => {
      l === this.plugin.id && this.fallbacks.setSettings(d);
    }), this.proxiedOn = new Proxy({}, {
      get: (l, d) => this.target ? this.target.on[d] : (...u) => {
        this.onQueue.push({
          method: d,
          args: u
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (l, d) => this.target ? this.target[d] : d === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(d) ? (...u) => (this.targetQueue.push({
        method: d,
        args: u,
        resolve: () => {
        }
      }), this.fallbacks[d](...u)) : (...u) => new Promise((h) => {
        this.targetQueue.push({
          method: d,
          args: u,
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
function an(e, t) {
  const n = e, o = _t(), r = Zt(), c = en && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !c))
    r.emit(tn, e, t);
  else {
    const l = c ? new sn(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: l
    }), l && t(l.proxiedTarget);
  }
}
/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const q = typeof document < "u";
function cn(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const N = Object.assign;
function ke(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = V(r) ? r.map(e) : e(r);
  }
  return n;
}
const ce = () => {
}, V = Array.isArray;
function k(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const Et = /#/g, ln = /&/g, un = /\//g, fn = /=/g, dn = /\?/g, bt = /\+/g, hn = /%5B/g, pn = /%5D/g, wt = /%5E/g, gn = /%60/g, Rt = /%7B/g, mn = /%7C/g, kt = /%7D/g, vn = /%20/g;
function Le(e) {
  return encodeURI("" + e).replace(mn, "|").replace(hn, "[").replace(pn, "]");
}
function yn(e) {
  return Le(e).replace(Rt, "{").replace(kt, "}").replace(wt, "^");
}
function Oe(e) {
  return Le(e).replace(bt, "%2B").replace(vn, "+").replace(Et, "%23").replace(ln, "%26").replace(gn, "`").replace(Rt, "{").replace(kt, "}").replace(wt, "^");
}
function _n(e) {
  return Oe(e).replace(fn, "%3D");
}
function En(e) {
  return Le(e).replace(Et, "%23").replace(dn, "%3F");
}
function bn(e) {
  return e == null ? "" : En(e).replace(un, "%2F");
}
function ne(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && k(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const wn = /\/$/, Rn = (e) => e.replace(wn, "");
function Se(e, t, n = "/") {
  let o, r = {}, c = "", l = "";
  const d = t.indexOf("#");
  let u = t.indexOf("?");
  return d < u && d >= 0 && (u = -1), u > -1 && (o = t.slice(0, u), c = t.slice(u + 1, d > -1 ? d : t.length), r = e(c)), d > -1 && (o = o || t.slice(0, d), l = t.slice(d, t.length)), o = Pn(o ?? t, n), {
    fullPath: o + (c && "?") + c + l,
    path: o,
    query: r,
    hash: ne(l)
  };
}
function kn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function We(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Qe(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && z(t.matched[o], n.matched[r]) && St(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function z(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function St(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Sn(e[n], t[n]))
      return !1;
  return !0;
}
function Sn(e, t) {
  return V(e) ? Ye(e, t) : V(t) ? Ye(t, e) : e === t;
}
function Ye(e, t) {
  return V(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Pn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return k(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let c = n.length - 1, l, d;
  for (l = 0; l < o.length; l++)
    if (d = o[l], d !== ".")
      if (d === "..")
        c > 1 && c--;
      else
        break;
  return n.slice(0, c).join("/") + "/" + o.slice(l).join("/");
}
var ue;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ue || (ue = {}));
var le;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(le || (le = {}));
function Cn(e) {
  if (!e)
    if (q) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Rn(e);
}
const Nn = /^[^#]+#/;
function On(e, t) {
  return e.replace(Nn, "#") + t;
}
function $n(e, t) {
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
function An(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const c = document.querySelector(e.el);
        if (o && c) {
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
    t = $n(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Je(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const $e = /* @__PURE__ */ new Map();
function Tn(e, t) {
  $e.set(e, t);
}
function xn(e) {
  const t = $e.get(e);
  return $e.delete(e), t;
}
let Dn = () => location.protocol + "//" + location.host;
function Pt(e, t) {
  const { pathname: n, search: o, hash: r } = t, c = e.indexOf("#");
  if (c > -1) {
    let d = r.includes(e.slice(c)) ? e.slice(c).length : 1, u = r.slice(d);
    return u[0] !== "/" && (u = "/" + u), We(u, "");
  }
  return We(n, e) + o + r;
}
function In(e, t, n, o) {
  let r = [], c = [], l = null;
  const d = ({ state: a }) => {
    const p = Pt(e, location), y = n.value, _ = t.value;
    let w = 0;
    if (a) {
      if (n.value = p, t.value = a, l && l === y) {
        l = null;
        return;
      }
      w = _ ? a.position - _.position : 0;
    } else
      o(p);
    r.forEach((E) => {
      E(n.value, y, {
        delta: w,
        type: ue.pop,
        direction: w ? w > 0 ? le.forward : le.back : le.unknown
      });
    });
  };
  function u() {
    l = n.value;
  }
  function h(a) {
    r.push(a);
    const p = () => {
      const y = r.indexOf(a);
      y > -1 && r.splice(y, 1);
    };
    return c.push(p), p;
  }
  function s() {
    const { history: a } = window;
    a.state && a.replaceState(N({}, a.state, { scroll: me() }), "");
  }
  function f() {
    for (const a of c)
      a();
    c = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: u,
    listen: h,
    destroy: f
  };
}
function Xe(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? me() : null
  };
}
function Vn(e) {
  const { history: t, location: n } = window, o = {
    value: Pt(e, n)
  }, r = { value: t.state };
  r.value || c(o.value, {
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
  function c(u, h, s) {
    const f = e.indexOf("#"), a = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + u : Dn() + e + u;
    try {
      t[s ? "replaceState" : "pushState"](h, "", a), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? k("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](a);
    }
  }
  function l(u, h) {
    const s = N({}, t.state, Xe(
      r.value.back,
      // keep back and forward entries but override current position
      u,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    c(u, s, !0), o.value = u;
  }
  function d(u, h) {
    const s = N(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: u,
        scroll: me()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && k(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), c(s.current, s, !0);
    const f = N({}, Xe(o.value, u, null), { position: s.position + 1 }, h);
    c(u, f, !1), o.value = u;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: l
  };
}
function jn(e) {
  e = Cn(e);
  const t = Vn(e), n = In(e, t.state, t.location, t.replace);
  function o(c, l = !0) {
    l || n.pauseListeners(), history.go(c);
  }
  const r = N({
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
function Ct(e) {
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
var Ze;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Ze || (Ze = {}));
const Ln = {
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
  return process.env.NODE_ENV !== "production" ? N(new Error(Ln[e](t)), {
    type: e,
    [Ae]: !0
  }, t) : N(new Error(), {
    type: e,
    [Ae]: !0
  }, t);
}
function H(e, t) {
  return e instanceof Error && Ae in e && (t == null || !!(e.type & t));
}
const Mn = ["params", "query", "hash"];
function Bn(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of Mn)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const et = "[^/]+?", Un = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Hn = /[.+*?^${}()[\]/\\]/g;
function qn(e, t) {
  const n = N({}, Un, t), o = [];
  let r = n.start ? "^" : "";
  const c = [];
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
        f || (r += "/"), r += a.value.replace(Hn, "\\$&"), p += 40;
      else if (a.type === 1) {
        const { value: y, repeatable: _, optional: w, regexp: E } = a;
        c.push({
          name: y,
          repeatable: _,
          optional: w
        });
        const b = E || et;
        if (b !== et) {
          p += 10;
          try {
            new RegExp(`(${b})`);
          } catch (D) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${b}): ` + D.message);
          }
        }
        let P = _ ? `((?:${b})(?:/(?:${b}))*)` : `(${b})`;
        f || (P = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        w && h.length < 2 ? `(?:/${P})` : "/" + P), w && (P += "?"), r += P, p += 20, w && (p += -8), _ && (p += -20), b === ".*" && (p += -50);
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
  const l = new RegExp(r, n.sensitive ? "" : "i");
  function d(h) {
    const s = h.match(l), f = {};
    if (!s)
      return null;
    for (let a = 1; a < s.length; a++) {
      const p = s[a] || "", y = c[a - 1];
      f[y.name] = p && y.repeatable ? p.split("/") : p;
    }
    return f;
  }
  function u(h) {
    let s = "", f = !1;
    for (const a of e) {
      (!f || !s.endsWith("/")) && (s += "/"), f = !1;
      for (const p of a)
        if (p.type === 0)
          s += p.value;
        else if (p.type === 1) {
          const { value: y, repeatable: _, optional: w } = p, E = y in h ? h[y] : "";
          if (V(E) && !_)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const b = V(E) ? E.join("/") : E;
          if (!b)
            if (w)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : f = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          s += b;
        }
    }
    return s || "/";
  }
  return {
    re: l,
    score: o,
    keys: c,
    parse: d,
    stringify: u
  };
}
function Fn(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function Gn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const c = Fn(o[n], r[n]);
    if (c)
      return c;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (tt(o))
      return 1;
    if (tt(r))
      return -1;
  }
  return r.length - o.length;
}
function tt(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Kn = {
  type: 0,
  value: ""
}, zn = /[a-zA-Z0-9_]/;
function Wn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Kn]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${h}": ${p}`);
  }
  let n = 0, o = n;
  const r = [];
  let c;
  function l() {
    c && r.push(c), c = [];
  }
  let d = 0, u, h = "", s = "";
  function f() {
    h && (n === 0 ? c.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (c.length > 1 && (u === "*" || u === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), c.push({
      type: 1,
      value: h,
      regexp: s,
      repeatable: u === "*" || u === "+",
      optional: u === "*" || u === "?"
    })) : t("Invalid state to consume buffer"), h = "");
  }
  function a() {
    h += u;
  }
  for (; d < e.length; ) {
    if (u = e[d++], u === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        u === "/" ? (h && f(), l()) : u === ":" ? (f(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        u === "(" ? n = 2 : zn.test(u) ? a() : (f(), n = 0, u !== "*" && u !== "?" && u !== "+" && d--);
        break;
      case 2:
        u === ")" ? s[s.length - 1] == "\\" ? s = s.slice(0, -1) + u : n = 3 : s += u;
        break;
      case 3:
        f(), n = 0, u !== "*" && u !== "?" && u !== "+" && d--, s = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), f(), l(), r;
}
function Qn(e, t, n) {
  const o = qn(Wn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const c = /* @__PURE__ */ new Set();
    for (const l of o.keys)
      c.has(l.name) && k(`Found duplicated params with name "${l.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), c.add(l.name);
  }
  const r = N(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Yn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = rt({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function c(s, f, a) {
    const p = !a, y = Jn(s);
    process.env.NODE_ENV !== "production" && to(y, f), y.aliasOf = a && a.record;
    const _ = rt(t, s), w = [
      y
    ];
    if ("alias" in s) {
      const P = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const D of P)
        w.push(N({}, y, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: a ? a.record.components : y.components,
          path: D,
          // we might be the child of an alias
          aliasOf: a ? a.record : y
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let E, b;
    for (const P of w) {
      const { path: D } = P;
      if (f && D[0] !== "/") {
        const F = f.record.path, U = F[F.length - 1] === "/" ? "" : "/";
        P.path = f.record.path + (D && U + D);
      }
      if (process.env.NODE_ENV !== "production" && P.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (E = Qn(P, f, _), process.env.NODE_ENV !== "production" && f && D[0] === "/" && no(E, f), a ? (a.alias.push(E), process.env.NODE_ENV !== "production" && eo(a, E)) : (b = b || E, b !== E && b.alias.push(E), p && s.name && !ot(E) && l(s.name)), y.children) {
        const F = y.children;
        for (let U = 0; U < F.length; U++)
          c(F[U], E, a && a.children[U]);
      }
      a = a || E, (E.record.components && Object.keys(E.record.components).length || E.record.name || E.record.redirect) && u(E);
    }
    return b ? () => {
      l(b);
    } : ce;
  }
  function l(s) {
    if (Ct(s)) {
      const f = o.get(s);
      f && (o.delete(s), n.splice(n.indexOf(f), 1), f.children.forEach(l), f.alias.forEach(l));
    } else {
      const f = n.indexOf(s);
      f > -1 && (n.splice(f, 1), s.record.name && o.delete(s.record.name), s.children.forEach(l), s.alias.forEach(l));
    }
  }
  function d() {
    return n;
  }
  function u(s) {
    let f = 0;
    for (; f < n.length && Gn(s, n[f]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[f].record.path || !Nt(s, n[f])); )
      f++;
    n.splice(f, 0, s), s.record.name && !ot(s) && o.set(s.record.name, s);
  }
  function h(s, f) {
    let a, p = {}, y, _;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw oe(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const b = Object.keys(s.params || {}).filter((P) => !a.keys.find((D) => D.name === P));
        b.length && k(`Discarded invalid param(s) "${b.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      _ = a.record.name, p = N(
        // paramsFromLocation is a new object
        nt(
          f.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          a.keys.filter((b) => !b.optional).concat(a.parent ? a.parent.keys.filter((b) => b.optional) : []).map((b) => b.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && nt(s.params, a.keys.map((b) => b.name))
      ), y = a.stringify(p);
    } else if (s.path != null)
      y = s.path, process.env.NODE_ENV !== "production" && !y.startsWith("/") && k(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((b) => b.re.test(y)), a && (p = a.parse(y), _ = a.record.name);
    else {
      if (a = f.name ? o.get(f.name) : n.find((b) => b.re.test(f.path)), !a)
        throw oe(1, {
          location: s,
          currentLocation: f
        });
      _ = a.record.name, p = N({}, f.params, s.params), y = a.stringify(p);
    }
    const w = [];
    let E = a;
    for (; E; )
      w.unshift(E.record), E = E.parent;
    return {
      name: _,
      path: y,
      params: p,
      matched: w,
      meta: Zn(w)
    };
  }
  return e.forEach((s) => c(s)), { addRoute: c, resolve: h, removeRoute: l, getRoutes: d, getRecordMatcher: r };
}
function nt(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Jn(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Xn(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Xn(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const o in e.components)
      t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function ot(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function Zn(e) {
  return e.reduce((t, n) => N(t, n.meta), {});
}
function rt(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function Te(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function eo(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Te.bind(null, n)))
      return k(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Te.bind(null, n)))
      return k(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function to(e, t) {
  t && t.record.name && !e.name && !e.path && k(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function no(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Te.bind(null, n)))
      return k(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Nt(e, t) {
  return t.children.some((n) => n === e || Nt(e, n));
}
function oo(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const c = o[r].replace(bt, " "), l = c.indexOf("="), d = ne(l < 0 ? c : c.slice(0, l)), u = l < 0 ? null : ne(c.slice(l + 1));
    if (d in t) {
      let h = t[d];
      V(h) || (h = t[d] = [h]), h.push(u);
    } else
      t[d] = u;
  }
  return t;
}
function st(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = _n(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (V(o) ? o.map((c) => c && Oe(c)) : [o && Oe(o)]).forEach((c) => {
      c !== void 0 && (t += (t.length ? "&" : "") + n, c != null && (t += "=" + c));
    });
  }
  return t;
}
function ro(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = V(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const so = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), at = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Me = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Ot = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), xe = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
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
function K(e, t, n, o, r, c = (l) => l()) {
  const l = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((d, u) => {
    const h = (a) => {
      a === !1 ? u(oe(4, {
        from: n,
        to: t
      })) : a instanceof Error ? u(a) : ge(a) ? u(oe(2, {
        from: t,
        to: a
      })) : (l && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === l && typeof a == "function" && l.push(a), d());
    }, s = c(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? ao(h, t, n) : h));
    let f = Promise.resolve(s);
    if (e.length < 3 && (f = f.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        f = f.then((p) => h._called ? p : (k(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        k(a), u(new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((a) => u(a));
  });
}
function ao(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && k(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Pe(e, t, n, o, r = (c) => c()) {
  const c = [];
  for (const l of e) {
    process.env.NODE_ENV !== "production" && !l.components && !l.children.length && k(`Record with path "${l.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in l.components) {
      let u = l.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!u || typeof u != "object" && typeof u != "function")
          throw k(`Component "${d}" in record with path "${l.path}" is not a valid component. Received "${String(u)}".`), new Error("Invalid route component");
        if ("then" in u) {
          k(`Component "${d}" in record with path "${l.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = u;
          u = () => h;
        } else
          u.__asyncLoader && // warn only once per component
          !u.__warnedDefineAsync && (u.__warnedDefineAsync = !0, k(`Component "${d}" in record with path "${l.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !l.instances[d]))
        if (io(u)) {
          const s = (u.__vccOpts || u)[t];
          s && c.push(K(s, n, o, l, d, r));
        } else {
          let h = u();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (k(`Component "${d}" in record with path "${l.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), c.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${l.path}"`));
            const f = cn(s) ? s.default : s;
            l.components[d] = f;
            const p = (f.__vccOpts || f)[t];
            return p && K(p, n, o, l, d, r)();
          }));
        }
    }
  }
  return c;
}
function io(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function it(e) {
  const t = B(Me), n = B(Ot);
  let o = !1, r = null;
  const c = j(() => {
    const s = Z(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (ge(s) || (o ? k(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : k(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), l = j(() => {
    const { matched: s } = c.value, { length: f } = s, a = s[f - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const y = p.findIndex(z.bind(null, a));
    if (y > -1)
      return y;
    const _ = ct(s[f - 2]);
    return (
      // we are dealing with nested routes
      f > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      ct(a) === _ && // avoid comparing the child with its parent
      p[p.length - 1].path !== _ ? p.findIndex(z.bind(null, s[f - 2])) : y
    );
  }), d = j(() => l.value > -1 && fo(n.params, c.value.params)), u = j(() => l.value > -1 && l.value === n.matched.length - 1 && St(n.params, c.value.params));
  function h(s = {}) {
    return uo(s) ? t[Z(e.replace) ? "replace" : "push"](
      Z(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ce) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && q) {
    const s = pt();
    if (s) {
      const f = {
        route: c.value,
        isActive: d.value,
        isExactActive: u.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(f), Qt(() => {
        f.route = c.value, f.isActive = d.value, f.isExactActive = u.value, f.error = ge(Z(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: c,
    href: j(() => c.value.href),
    isActive: d,
    isExactActive: u,
    navigate: h
  };
}
const co = /* @__PURE__ */ W({
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
  useLink: it,
  setup(e, { slots: t }) {
    const n = Wt(it(e)), { options: o } = B(Me), r = j(() => ({
      [lt(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [lt(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const c = t.default && t.default(n);
      return e.custom ? c : ht("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, c);
    };
  }
}), lo = co;
function uo(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function fo(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!V(r) || r.length !== o.length || o.some((c, l) => c !== r[l]))
      return !1;
  }
  return !0;
}
function ct(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const lt = (e, t, n) => e ?? t ?? n, ho = /* @__PURE__ */ W({
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
    const o = B(xe), r = j(() => e.route || o.value), c = B(at, 0), l = j(() => {
      let h = Z(c);
      const { matched: s } = r.value;
      let f;
      for (; (f = s[h]) && !f.components; )
        h++;
      return h;
    }), d = j(() => r.value.matched[l.value]);
    Re(at, j(() => l.value + 1)), Re(so, d), Re(xe, r);
    const u = L();
    return Ve(() => [u.value, d.value, e.name], ([h, s, f], [a, p, y]) => {
      s && (s.instances[f] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !z(s, p) || !a) && (s.enterCallbacks[f] || []).forEach((_) => _(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, f = d.value, a = f && f.components[s];
      if (!a)
        return ut(n.default, { Component: a, route: h });
      const p = f.props[s], y = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, w = ht(a, N({}, y, t, {
        onVnodeUnmounted: (E) => {
          E.component.isUnmounted && (f.instances[s] = null);
        },
        ref: u
      }));
      if (process.env.NODE_ENV !== "production" && q && w.ref) {
        const E = {
          depth: l.value,
          name: f.name,
          path: f.path,
          meta: f.meta
        };
        (V(w.ref) ? w.ref.map((P) => P.i) : [w.ref.i]).forEach((P) => {
          P.__vrv_devtools = E;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        ut(n.default, { Component: w, route: h }) || w
      );
    };
  }
});
function ut(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const po = ho;
function go() {
  const e = pt(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
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
  const n = N({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => Po(o, ["instances", "children", "aliasOf"]))
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
function vo(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = mo++;
  an({
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
          backgroundColor: $t
        });
      }
      V(f.__vrl_devtools) && (f.__devtoolsApi = r, f.__vrl_devtools.forEach((a) => {
        let p = a.route.path, y = xt, _ = "", w = 0;
        a.error ? (p = a.error, y = wo, w = Ro) : a.isExactActive ? (y = Tt, _ = "This is exactly active") : a.isActive && (y = At, _ = "This link is active"), s.tags.push({
          label: p,
          textColor: w,
          tooltip: _,
          backgroundColor: y
        });
      }));
    }), Ve(t.currentRoute, () => {
      u(), r.notifyComponentUpdate(), r.sendInspectorTree(d), r.sendInspectorState(d);
    });
    const c = "router:navigations:" + o;
    r.addTimelineLayer({
      id: c,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((s, f) => {
      r.addTimelineEvent({
        layerId: c,
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
    let l = 0;
    t.beforeEach((s, f) => {
      const a = {
        guard: pe("beforeEach"),
        from: ie(f, "Current Location during this navigation"),
        to: ie(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: l++
      }), r.addTimelineEvent({
        layerId: c,
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
        layerId: c,
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
    function u() {
      if (!h)
        return;
      const s = h;
      let f = n.getRoutes().filter((a) => !a.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !a.parent.record.components);
      f.forEach(Vt), s.filter && (f = f.filter((a) => (
        // save matches state based on the payload
        De(a, s.filter.toLowerCase())
      ))), f.forEach((a) => It(a, t.currentRoute.value)), s.rootNodes = f.map(Dt);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && u();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === d) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        a && (s.state = {
          options: _o(a)
        });
      }
    }), r.sendInspectorTree(d), r.sendInspectorState(d);
  });
}
function yo(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function _o(e) {
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
        display: e.keys.map((o) => `${o.name}${yo(o)}`).join(" "),
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
const $t = 15485081, At = 2450411, Tt = 8702998, Eo = 2282478, xt = 16486972, bo = 6710886, wo = 16704226, Ro = 12131356;
function Dt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: Eo
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: xt
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: $t
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: Tt
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: At
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: bo
  });
  let o = n.__vd_id;
  return o == null && (o = String(ko++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Dt)
  };
}
let ko = 0;
const So = /^\/(.*)\/([a-z]*)$/;
function It(e, t) {
  const n = t.matched.length && z(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => z(o, e.record))), e.children.forEach((o) => It(o, t));
}
function Vt(e) {
  e.__vd_match = !1, e.children.forEach(Vt);
}
function De(e, t) {
  const n = String(e.re).match(So);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((l) => De(l, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), c = ne(r);
  return !t.startsWith("/") && (c.includes(t) || r.includes(t)) || c.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((l) => De(l, t));
}
function Po(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function Co(e) {
  const t = Yn(e.routes, e), n = e.parseQuery || oo, o = e.stringifyQuery || st, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const c = ae(), l = ae(), d = ae(), u = Gt(G);
  let h = G;
  q && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = ke.bind(null, (i) => "" + i), f = ke.bind(null, bn), a = (
    // @ts-expect-error: intentionally avoid the type check
    ke.bind(null, ne)
  );
  function p(i, m) {
    let g, v;
    return Ct(i) ? (g = t.getRecordMatcher(i), process.env.NODE_ENV !== "production" && !g && k(`Parent route "${String(i)}" not found when adding child route`, m), v = m) : v = i, t.addRoute(v, g);
  }
  function y(i) {
    const m = t.getRecordMatcher(i);
    m ? t.removeRoute(m) : process.env.NODE_ENV !== "production" && k(`Cannot remove non-existent route "${String(i)}"`);
  }
  function _() {
    return t.getRoutes().map((i) => i.record);
  }
  function w(i) {
    return !!t.getRecordMatcher(i);
  }
  function E(i, m) {
    if (m = N({}, m || u.value), typeof i == "string") {
      const R = Se(n, i, m.path), A = t.resolve({ path: R.path }, m), Q = r.createHref(R.fullPath);
      return process.env.NODE_ENV !== "production" && (Q.startsWith("//") ? k(`Location "${i}" resolved to "${Q}". A resolved location cannot start with multiple slashes.`) : A.matched.length || k(`No match found for location with path "${i}"`)), N(R, A, {
        params: a(A.params),
        hash: ne(R.hash),
        redirectedFrom: void 0,
        href: Q
      });
    }
    process.env.NODE_ENV !== "production" && !ge(i) && (k(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, i), i = {});
    let g;
    if (i.path != null)
      process.env.NODE_ENV !== "production" && "params" in i && !("name" in i) && // @ts-expect-error: the type is never
      Object.keys(i.params).length && k(`Path "${i.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), g = N({}, i, {
        path: Se(n, i.path, m.path).path
      });
    else {
      const R = N({}, i.params);
      for (const A in R)
        R[A] == null && delete R[A];
      g = N({}, i, {
        params: f(R)
      }), m.params = f(m.params);
    }
    const v = t.resolve(g, m), C = i.hash || "";
    process.env.NODE_ENV !== "production" && C && !C.startsWith("#") && k(`A \`hash\` should always start with the character "#". Replace "${C}" with "#${C}".`), v.params = s(a(v.params));
    const x = kn(o, N({}, i, {
      hash: yn(C),
      path: v.path
    })), S = r.createHref(x);
    return process.env.NODE_ENV !== "production" && (S.startsWith("//") ? k(`Location "${i}" resolved to "${S}". A resolved location cannot start with multiple slashes.`) : v.matched.length || k(`No match found for location with path "${i.path != null ? i.path : i}"`)), N({
      fullPath: x,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: C,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === st ? ro(i.query) : i.query || {}
      )
    }, v, {
      redirectedFrom: void 0,
      href: S
    });
  }
  function b(i) {
    return typeof i == "string" ? Se(n, i, u.value.path) : N({}, i);
  }
  function P(i, m) {
    if (h !== i)
      return oe(8, {
        from: m,
        to: i
      });
  }
  function D(i) {
    return re(i);
  }
  function F(i) {
    return D(N(b(i), { replace: !0 }));
  }
  function U(i) {
    const m = i.matched[i.matched.length - 1];
    if (m && m.redirect) {
      const { redirect: g } = m;
      let v = typeof g == "function" ? g(i) : g;
      if (typeof v == "string" && (v = v.includes("?") || v.includes("#") ? v = b(v) : (
        // force empty params
        { path: v }
      ), v.params = {}), process.env.NODE_ENV !== "production" && v.path == null && !("name" in v))
        throw k(`Invalid redirect found:
${JSON.stringify(v, null, 2)}
 when navigating to "${i.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return N({
        query: i.query,
        hash: i.hash,
        // avoid transferring params if the redirect has a path
        params: v.path != null ? {} : i.params
      }, v);
    }
  }
  function re(i, m) {
    const g = h = E(i), v = u.value, C = i.state, x = i.force, S = i.replace === !0, R = U(g);
    if (R)
      return re(
        N(b(R), {
          state: typeof R == "object" ? N({}, C, R.state) : C,
          force: x,
          replace: S
        }),
        // keep original redirectedFrom if it exists
        m || g
      );
    const A = g;
    A.redirectedFrom = m;
    let Q;
    return !x && Qe(o, v, g) && (Q = oe(16, { to: A, from: v }), Fe(
      v,
      v,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (Q ? Promise.resolve(Q) : Be(A, v)).catch((I) => H(I) ? (
      // navigation redirects still mark the router as ready
      H(
        I,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? I : Ee(I)
    ) : (
      // reject any unknown error
      _e(I, A, v)
    )).then((I) => {
      if (I) {
        if (H(
          I,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          Qe(o, E(I.to), A) && // and we have done it a couple of times
          m && // @ts-expect-error: added only in dev
          (m._count = m._count ? (
            // @ts-expect-error
            m._count + 1
          ) : 1) > 30 ? (k(`Detected a possibly infinite redirection in a navigation guard when going from "${v.fullPath}" to "${A.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : re(
            // keep options
            N({
              // preserve an existing replacement but allow the redirect to override it
              replace: S
            }, b(I.to), {
              state: typeof I.to == "object" ? N({}, C, I.to.state) : C,
              force: x
            }),
            // preserve the original redirectedFrom if any
            m || A
          );
      } else
        I = He(A, v, !0, S, C);
      return Ue(A, v, I), I;
    });
  }
  function Ht(i, m) {
    const g = P(i, m);
    return g ? Promise.reject(g) : Promise.resolve();
  }
  function ve(i) {
    const m = he.values().next().value;
    return m && typeof m.runWithContext == "function" ? m.runWithContext(i) : i();
  }
  function Be(i, m) {
    let g;
    const [v, C, x] = No(i, m);
    g = Pe(v.reverse(), "beforeRouteLeave", i, m);
    for (const R of v)
      R.leaveGuards.forEach((A) => {
        g.push(K(A, i, m));
      });
    const S = Ht.bind(null, i, m);
    return g.push(S), J(g).then(() => {
      g = [];
      for (const R of c.list())
        g.push(K(R, i, m));
      return g.push(S), J(g);
    }).then(() => {
      g = Pe(C, "beforeRouteUpdate", i, m);
      for (const R of C)
        R.updateGuards.forEach((A) => {
          g.push(K(A, i, m));
        });
      return g.push(S), J(g);
    }).then(() => {
      g = [];
      for (const R of x)
        if (R.beforeEnter)
          if (V(R.beforeEnter))
            for (const A of R.beforeEnter)
              g.push(K(A, i, m));
          else
            g.push(K(R.beforeEnter, i, m));
      return g.push(S), J(g);
    }).then(() => (i.matched.forEach((R) => R.enterCallbacks = {}), g = Pe(x, "beforeRouteEnter", i, m, ve), g.push(S), J(g))).then(() => {
      g = [];
      for (const R of l.list())
        g.push(K(R, i, m));
      return g.push(S), J(g);
    }).catch((R) => H(
      R,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? R : Promise.reject(R));
  }
  function Ue(i, m, g) {
    d.list().forEach((v) => ve(() => v(i, m, g)));
  }
  function He(i, m, g, v, C) {
    const x = P(i, m);
    if (x)
      return x;
    const S = m === G, R = q ? history.state : {};
    g && (v || S ? r.replace(i.fullPath, N({
      scroll: S && R && R.scroll
    }, C)) : r.push(i.fullPath, C)), u.value = i, Fe(i, m, g, S), Ee();
  }
  let se;
  function qt() {
    se || (se = r.listen((i, m, g) => {
      if (!Ge.listening)
        return;
      const v = E(i), C = U(v);
      if (C) {
        re(N(C, { replace: !0 }), v).catch(ce);
        return;
      }
      h = v;
      const x = u.value;
      q && Tn(Je(x.fullPath, g.delta), me()), Be(v, x).catch((S) => H(
        S,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? S : H(
        S,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (re(
        S.to,
        v
        // avoid an uncaught rejection, let push call triggerError
      ).then((R) => {
        H(
          R,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !g.delta && g.type === ue.pop && r.go(-1, !1);
      }).catch(ce), Promise.reject()) : (g.delta && r.go(-g.delta, !1), _e(S, v, x))).then((S) => {
        S = S || He(
          // after navigation, all matched components are resolved
          v,
          x,
          !1
        ), S && (g.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !H(
          S,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-g.delta, !1) : g.type === ue.pop && H(
          S,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Ue(v, x, S);
      }).catch(ce);
    }));
  }
  let ye = ae(), qe = ae(), de;
  function _e(i, m, g) {
    Ee(i);
    const v = qe.list();
    return v.length ? v.forEach((C) => C(i, m, g)) : (process.env.NODE_ENV !== "production" && k("uncaught error during route navigation:"), console.error(i)), Promise.reject(i);
  }
  function Ft() {
    return de && u.value !== G ? Promise.resolve() : new Promise((i, m) => {
      ye.add([i, m]);
    });
  }
  function Ee(i) {
    return de || (de = !i, qt(), ye.list().forEach(([m, g]) => i ? g(i) : m()), ye.reset()), i;
  }
  function Fe(i, m, g, v) {
    const { scrollBehavior: C } = e;
    if (!q || !C)
      return Promise.resolve();
    const x = !g && xn(Je(i.fullPath, 0)) || (v || !g) && history.state && history.state.scroll || null;
    return zt().then(() => C(i, m, x)).then((S) => S && An(S)).catch((S) => _e(S, i, m));
  }
  const be = (i) => r.go(i);
  let we;
  const he = /* @__PURE__ */ new Set(), Ge = {
    currentRoute: u,
    listening: !0,
    addRoute: p,
    removeRoute: y,
    hasRoute: w,
    getRoutes: _,
    resolve: E,
    options: e,
    push: D,
    replace: F,
    go: be,
    back: () => be(-1),
    forward: () => be(1),
    beforeEach: c.add,
    beforeResolve: l.add,
    afterEach: d.add,
    onError: qe.add,
    isReady: Ft,
    install(i) {
      const m = this;
      i.component("RouterLink", lo), i.component("RouterView", po), i.config.globalProperties.$router = m, Object.defineProperty(i.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Z(u)
      }), q && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !we && u.value === G && (we = !0, D(r.location).catch((C) => {
        process.env.NODE_ENV !== "production" && k("Unexpected error when starting the router:", C);
      }));
      const g = {};
      for (const C in G)
        Object.defineProperty(g, C, {
          get: () => u.value[C],
          enumerable: !0
        });
      i.provide(Me, m), i.provide(Ot, Kt(g)), i.provide(xe, u);
      const v = i.unmount;
      he.add(i), i.unmount = function() {
        he.delete(i), he.size < 1 && (h = G, se && se(), se = null, u.value = G, we = !1, de = !1), v();
      }, process.env.NODE_ENV !== "production" && q && vo(i, m, t);
    }
  };
  function J(i) {
    return i.reduce((m, g) => m.then(() => ve(g)), Promise.resolve());
  }
  return Ge;
}
function No(e, t) {
  const n = [], o = [], r = [], c = Math.max(t.matched.length, e.matched.length);
  for (let l = 0; l < c; l++) {
    const d = t.matched[l];
    d && (e.matched.find((h) => z(h, d)) ? o.push(d) : n.push(d));
    const u = e.matched[l];
    u && (t.matched.find((h) => z(h, u)) || r.push(u));
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
], $o = ["VET2011"], Ao = [
  { "course:VETS2011": 10 },
  { "course:VETS2012": 10 },
  { "subject:Physiology": 20 },
  { "system:Respiratory_System": 15 },
  { "system:Exercise": 20 },
  { "animal:Horse": 10 }
], To = async (e, t) => {
  try {
    return await (await fetch(
      t + "?" + new URLSearchParams({ tag: e })
    )).json();
  } catch (n) {
    console.error("Error fetching data from the server", n), alert("Error fetching data from the server, only display test data.");
  }
}, xo = async (e, t) => {
  try {
    return await To(e, t) || Oo.filter(
      (o) => o.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, Do = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), r = await (await fetch(`${t}?${n}`)).json() ?? $o, c = new Set(r);
    return Array.from(c);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, Io = async (e) => {
  try {
    return await (await fetch(e)).json();
  } catch (t) {
    return alert(
      "An error occurred while fetching tags" + t + "fallback to static tags"
    ), [];
  }
}, ft = async (e) => {
  const t = await Io(e);
  return jt(t);
}, jt = (e) => e ? e.reduce(
  (t, n) => {
    const [o, r] = Object.keys(n)[0].split(":"), c = Object.values(n)[0];
    return t[o] || (t[o] = []), t[o].push({ [r.replace("_", " ")]: c }), t;
  },
  {}
) : {}, Vo = jt(Ao), jo = { class: "search-results-container" }, Lo = { class: "container-description" }, Mo = { class: "label-badges" }, Bo = {
  key: 0,
  class: "results"
}, Uo = ["href"], Ho = {
  key: 1,
  class: "no-results"
}, qo = /* @__PURE__ */ W({
  __name: "DisplayResult",
  setup(e) {
    const t = B("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("Retrieving data from:", t);
    const n = L([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = Ut(), r = L("");
    je(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, await c(r.value)) : r.value = "undefined";
    });
    const c = async (l) => {
      const d = await xo(l, t);
      d && (n.value = d);
    };
    return Ve(o.currentRoute, async (l, d) => {
      const u = l.query.tag || "", h = d.query.tag || "";
      u !== h && await c(u);
    }), (l, d) => (O(), $("div", jo, [
      T("div", Lo, [
        T("button", {
          onClick: d[0] || (d[0] = () => l.$router.back())
        }, "↵"),
        T("div", Mo, " (" + M(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? (O(), $("div", Bo, [
        T("ul", null, [
          (O(!0), $(Y, null, ee(n.value, (u, h) => (O(), $("li", { key: h }, [
            T("a", {
              href: u.url,
              target: "_blank",
              class: "linkToResource"
            }, M(u.label), 9, Uo)
          ]))), 128))
        ])
      ])) : (O(), $("p", Ho, "No results found"))
    ]));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Ie = /* @__PURE__ */ fe(qo, [["__scopeId", "data-v-ae262433"]]), Lt = (e) => (gt("data-v-b97c2a53"), e = e(), mt(), e), Fo = /* @__PURE__ */ Lt(() => /* @__PURE__ */ T("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }, null, -1)), Go = /* @__PURE__ */ Lt(() => /* @__PURE__ */ T("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}, null, -1)), Ko = [
  Fo,
  Go
], zo = /* @__PURE__ */ W({
  __name: "CollapseBtn",
  props: { showDropdown: Boolean },
  setup(e) {
    return (t, n) => (O(), $("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      class: Ce(
        e.showDropdown ? "collapse-btn collapse-btn-rotation" : "collapse-btn"
      )
    }, Ko, 2));
  }
}), Mt = /* @__PURE__ */ fe(zo, [["__scopeId", "data-v-b97c2a53"]]), dt = /* @__PURE__ */ W({
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
    }, c = j(() => r[o] || "Default");
    return (l, d) => (O(), $("button", {
      class: "filter-btn",
      onClick: d[0] || (d[0] = (u) => n("click", l.actionType))
    }, M(c.value), 1));
  }
}), Wo = (e) => (gt("data-v-a4dc91be"), e = e(), mt(), e), Qo = { class: "crucible-filter-container" }, Yo = {
  key: 0,
  class: "crucible-filter-panel"
}, Jo = { class: "crucible-filter-action" }, Xo = /* @__PURE__ */ Wo(() => /* @__PURE__ */ T("hr", null, null, -1)), Zo = { class: "crucible-filter-collection" }, er = ["onClick"], tr = { class: "capital-first" }, nr = { class: "crucible-filters" }, or = ["onClick"], rr = { class: "row crucible-filter-dropdown-menu" }, sr = ["onClick"], ar = /* @__PURE__ */ W({
  __name: "CrucibleFilter",
  emits: ["updateFilterTagArray"],
  setup(e, { emit: t }) {
    const n = t;
    console.log("Taxonomy Groups", ft);
    const o = B("$filterSetApi") || "http://localhost:8080/api/resource/getFilterSet", r = B("$filterDataApi") || "http://localhost:8080/api/resource/getFilterData", c = L(!1), l = L({}), d = L([]), u = L({}), h = (_) => {
      l.value[_] = !l.value[_];
    }, s = (_, w) => {
      const E = `${_}:${w.replace(" ", "_")}`;
      d.value.includes(E) || d.value.push(E);
    }, f = () => {
    }, a = j(() => d.value.map(
      (_) => _.split(":")[1].replace("_", " ")
    )), p = () => {
      l.value = {}, d.value = [];
    }, y = () => {
      console.log(r), console.log("Applying the filter", d), n("updateFilterTagArray", d);
    };
    return je(async () => {
      const _ = await ft(o);
      u.value = Object.keys(_).length > 0 ? _ : Vo;
    }), (_, w) => (O(), $("div", Qo, [
      c.value ? (O(), $("div", Yo, [
        T("div", Jo, [
          te(dt, {
            "action-type": "apply",
            onClick: y
          }),
          te(dt, {
            "action-type": "clear",
            onClick: p
          })
        ]),
        Xo,
        T("div", Zo, [
          (O(!0), $(Y, null, ee(d.value, (E, b) => (O(), $("span", {
            key: b,
            onClick: (P) => (d.value.splice(b, 1), f)
          }, [
            Ke(" ☒ "),
            T("strong", null, M(E.split(":")[0]), 1),
            T("span", tr, M(E.split(":")[1].replace("_", " ")), 1)
          ], 8, er))), 128))
        ]),
        T("div", nr, [
          (O(!0), $(Y, null, ee(u.value, (E, b) => (O(), $("div", {
            key: b,
            class: "crucible-filter-dropdown"
          }, [
            T("h4", {
              onClick: (P) => h(b)
            }, [
              T("span", null, M(b), 1),
              te(Mt, {
                "show-dropdown": l.value[b]
              }, null, 8, ["show-dropdown"])
            ], 8, or),
            vt(T("div", rr, [
              (O(!0), $(Y, null, ee(E, (P, D) => (O(), $("div", {
                key: D,
                class: Ce(
                  a.value.includes(Object.keys(P)[0]) ? "selected-filter-tag column" : "column"
                ),
                onClick: (F) => s(b, Object.keys(P)[0])
              }, [
                Ke(M(Object.keys(P)[0]) + " ", 1),
                T("span", null, "(" + M(Object.values(P)[0]) + ")", 1)
              ], 10, sr))), 128))
            ], 512), [
              [Yt, l.value[b]]
            ])
          ]))), 128))
        ])
      ])) : yt("", !0),
      T("button", {
        class: Ce(
          c.value ? "crucible-filter-control svg-background-light" : "crucible-filter-control crucible-filter-control-light svg-background-dark"
        ),
        onClick: w[0] || (w[0] = (E) => c.value = !c.value)
      }, null, 2)
    ]));
  }
}), Bt = /* @__PURE__ */ fe(ar, [["__scopeId", "data-v-a4dc91be"]]), ir = { id: "app" }, cr = { class: "main" }, lr = /* @__PURE__ */ W({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = ze("CrucibleSearch"), r = ze("RouterView");
      return O(), $("div", ir, [
        T("div", cr, [
          te(o),
          te(r),
          T("div", null, [
            te(Bt)
          ])
        ])
      ]);
    };
  }
}), ur = /* @__PURE__ */ fe(lr, [["__scopeId", "data-v-aabb2d26"]]), fr = [
  { path: "/", component: ur },
  { path: "/search", component: Ie }
], dr = Co({
  history: jn("/"),
  routes: fr
});
function Ut() {
  const e = B("$router");
  return e || dr;
}
const hr = { class: "search-container" }, pr = { key: 0 }, gr = ["onClick"], mr = 10, vr = /* @__PURE__ */ W({
  __name: "CrucibleSearch",
  setup(e) {
    const t = Ut(), n = L(""), o = L([]), r = L(!1), c = L(null), l = B("$tagsApi") || "http://localhost:8080/api/resource/alltags", d = (_) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(_.toLowerCase())
    ), u = (_) => _.replace(/_/g, " "), h = (_) => _.replace(/ /g, "_"), s = async () => {
      n.value ? (o.value = (await Do(n.value, l)).slice(0, mr), o.value = o.value.map(u), r.value = !0) : (o.value = [], r.value = !1);
    }, f = (_) => {
      n.value = o.value.includes(_) ? _ : o.value[0], r.value = !1, t.push({
        path: "/search",
        query: { tag: h(n.value) }
      });
    }, a = () => {
      o.value.length && n.value && (r.value = !0);
    }, p = (_) => {
      _.key === "Enter" ? (f(n.value), n.value = "") : _.key === "Tab" && (_.preventDefault(), n.value = o.value[0] ?? n.value);
    }, y = (_) => {
      c.value && !c.value.contains(_.target) && (r.value = !1);
    };
    return je(() => {
      document.addEventListener("click", y);
    }), Jt(() => {
      document.removeEventListener("click", y);
    }), (_, w) => (O(), $("div", hr, [
      T("div", {
        ref_key: "searchBoxRef",
        ref: c,
        class: "search-container"
      }, [
        vt(T("input", {
          "onUpdate:modelValue": w[0] || (w[0] = (E) => n.value = E),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: s,
          onFocus: a,
          onKeydown: p
        }, null, 544), [
          [Xt, n.value]
        ]),
        o.value.length && n.value && r.value ? (O(), $("ul", pr, [
          (O(!0), $(Y, null, ee(o.value, (E) => (O(), $("li", {
            key: E,
            onClick: (b) => f(E)
          }, [
            (O(!0), $(Y, null, ee(E.split(""), (b, P) => (O(), $(Y, null, [
              d(b) ? (O(), $("strong", {
                key: `strong-${P}`
              }, M(b), 1)) : (O(), $("span", { key: P }, M(b), 1))
            ], 64))), 256))
          ], 8, gr))), 128))
        ])) : yt("", !0)
      ], 512)
    ]));
  }
}), yr = /* @__PURE__ */ fe(vr, [["__scopeId", "data-v-5cb7fe60"]]);
function Er(e, t) {
  const { router: n, getApi: o, tagsApi: r, filterSetApi: c, filterDataApi: l } = t;
  e.component("CrucibleSearch", yr), e.component("DisplayResult", Ie), e.component("CrucibleFilter", Bt), e.component("CollapseBtn", Mt), e.provide("$router", n), e.provide("$getApi", o), e.provide("$tagsApi", r), e.provide("$tagsApi", c), e.provide("$filterDataApi", l), n.addRoute({ path: "/search", component: Ie });
}
export {
  Mt as CollapseBtn,
  Bt as CrucibleFilter,
  yr as CrucibleSearch,
  Ie as DisplayResult,
  Er as createSearchPlugin
};
