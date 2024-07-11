import { shallowRef as qt, unref as Y, shallowReactive as Gt, nextTick as Kt, defineComponent as F, reactive as zt, inject as K, computed as j, h as ft, provide as Re, ref as M, watch as je, getCurrentInstance as dt, watchEffect as Ft, onMounted as ht, openBlock as O, createElementBlock as $, createElementVNode as T, toDisplayString as L, Fragment as J, renderList as ee, normalizeClass as Ce, pushScopeId as pt, popScopeId as mt, createVNode as te, createTextVNode as ke, withDirectives as vt, vShow as Wt, createCommentVNode as gt, resolveComponent as ze, onUnmounted as Qt, vModelText as Yt } from "vue";
function Jt() {
  return yt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function yt() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Xt = typeof Proxy == "function", Zt = "devtools-plugin:setup", en = "plugin:settings:set";
let Z, Oe;
function tn() {
  var e;
  return Z !== void 0 || (typeof window < "u" && window.performance ? (Z = !0, Oe = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Z = !0, Oe = globalThis.perf_hooks.performance) : Z = !1), Z;
}
function nn() {
  return tn() ? Oe.now() : Date.now();
}
class on {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const u in t.settings) {
        const d = t.settings[u];
        o[u] = d.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let f = Object.assign({}, o);
    try {
      const u = localStorage.getItem(r), d = JSON.parse(u);
      Object.assign(f, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return f;
      },
      setSettings(u) {
        try {
          localStorage.setItem(r, JSON.stringify(u));
        } catch {
        }
        f = u;
      },
      now() {
        return nn();
      }
    }, n && n.on(en, (u, d) => {
      u === this.plugin.id && this.fallbacks.setSettings(d);
    }), this.proxiedOn = new Proxy({}, {
      get: (u, d) => this.target ? this.target.on[d] : (...l) => {
        this.onQueue.push({
          method: d,
          args: l
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (u, d) => this.target ? this.target[d] : d === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(d) ? (...l) => (this.targetQueue.push({
        method: d,
        args: l,
        resolve: () => {
        }
      }), this.fallbacks[d](...l)) : (...l) => new Promise((h) => {
        this.targetQueue.push({
          method: d,
          args: l,
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
function rn(e, t) {
  const n = e, o = yt(), r = Jt(), f = Xt && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !f))
    r.emit(Zt, e, t);
  else {
    const u = f ? new on(n, r) : null;
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
const H = typeof document < "u";
function sn(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const N = Object.assign;
function Se(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = V(r) ? r.map(e) : e(r);
  }
  return n;
}
const ce = () => {
}, V = Array.isArray;
function R(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const _t = /#/g, an = /&/g, cn = /\//g, ln = /=/g, un = /\?/g, Et = /\+/g, fn = /%5B/g, dn = /%5D/g, bt = /%5E/g, hn = /%60/g, wt = /%7B/g, pn = /%7C/g, Rt = /%7D/g, mn = /%20/g;
function Le(e) {
  return encodeURI("" + e).replace(pn, "|").replace(fn, "[").replace(dn, "]");
}
function vn(e) {
  return Le(e).replace(wt, "{").replace(Rt, "}").replace(bt, "^");
}
function $e(e) {
  return Le(e).replace(Et, "%2B").replace(mn, "+").replace(_t, "%23").replace(an, "%26").replace(hn, "`").replace(wt, "{").replace(Rt, "}").replace(bt, "^");
}
function gn(e) {
  return $e(e).replace(ln, "%3D");
}
function yn(e) {
  return Le(e).replace(_t, "%23").replace(un, "%3F");
}
function _n(e) {
  return e == null ? "" : yn(e).replace(cn, "%2F");
}
function ne(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && R(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const En = /\/$/, bn = (e) => e.replace(En, "");
function Pe(e, t, n = "/") {
  let o, r = {}, f = "", u = "";
  const d = t.indexOf("#");
  let l = t.indexOf("?");
  return d < l && d >= 0 && (l = -1), l > -1 && (o = t.slice(0, l), f = t.slice(l + 1, d > -1 ? d : t.length), r = e(f)), d > -1 && (o = o || t.slice(0, d), u = t.slice(d, t.length)), o = kn(o ?? t, n), {
    fullPath: o + (f && "?") + f + u,
    path: o,
    query: r,
    hash: ne(u)
  };
}
function wn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Fe(e, t) {
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
    if (!Rn(e[n], t[n]))
      return !1;
  return !0;
}
function Rn(e, t) {
  return V(e) ? Qe(e, t) : V(t) ? Qe(t, e) : e === t;
}
function Qe(e, t) {
  return V(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function kn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return R(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let f = n.length - 1, u, d;
  for (u = 0; u < o.length; u++)
    if (d = o[u], d !== ".")
      if (d === "..")
        f > 1 && f--;
      else
        break;
  return n.slice(0, f).join("/") + "/" + o.slice(u).join("/");
}
var ue;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ue || (ue = {}));
var le;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(le || (le = {}));
function Sn(e) {
  if (!e)
    if (H) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), bn(e);
}
const Pn = /^[^#]+#/;
function Nn(e, t) {
  return e.replace(Pn, "#") + t;
}
function Cn(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const ve = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function On(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const f = document.querySelector(e.el);
        if (o && f) {
          R(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        R(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const r = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) {
      process.env.NODE_ENV !== "production" && R(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = Cn(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Ye(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ae = /* @__PURE__ */ new Map();
function $n(e, t) {
  Ae.set(e, t);
}
function An(e) {
  const t = Ae.get(e);
  return Ae.delete(e), t;
}
let Tn = () => location.protocol + "//" + location.host;
function St(e, t) {
  const { pathname: n, search: o, hash: r } = t, f = e.indexOf("#");
  if (f > -1) {
    let d = r.includes(e.slice(f)) ? e.slice(f).length : 1, l = r.slice(d);
    return l[0] !== "/" && (l = "/" + l), Fe(l, "");
  }
  return Fe(n, e) + o + r;
}
function xn(e, t, n, o) {
  let r = [], f = [], u = null;
  const d = ({ state: a }) => {
    const p = St(e, location), g = n.value, _ = t.value;
    let S = 0;
    if (a) {
      if (n.value = p, t.value = a, u && u === g) {
        u = null;
        return;
      }
      S = _ ? a.position - _.position : 0;
    } else
      o(p);
    r.forEach((E) => {
      E(n.value, g, {
        delta: S,
        type: ue.pop,
        direction: S ? S > 0 ? le.forward : le.back : le.unknown
      });
    });
  };
  function l() {
    u = n.value;
  }
  function h(a) {
    r.push(a);
    const p = () => {
      const g = r.indexOf(a);
      g > -1 && r.splice(g, 1);
    };
    return f.push(p), p;
  }
  function s() {
    const { history: a } = window;
    a.state && a.replaceState(N({}, a.state, { scroll: ve() }), "");
  }
  function c() {
    for (const a of f)
      a();
    f = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: l,
    listen: h,
    destroy: c
  };
}
function Je(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? ve() : null
  };
}
function Dn(e) {
  const { history: t, location: n } = window, o = {
    value: St(e, n)
  }, r = { value: t.state };
  r.value || f(o.value, {
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
  function f(l, h, s) {
    const c = e.indexOf("#"), a = c > -1 ? (n.host && document.querySelector("base") ? e : e.slice(c)) + l : Tn() + e + l;
    try {
      t[s ? "replaceState" : "pushState"](h, "", a), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? R("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](a);
    }
  }
  function u(l, h) {
    const s = N({}, t.state, Je(
      r.value.back,
      // keep back and forward entries but override current position
      l,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    f(l, s, !0), o.value = l;
  }
  function d(l, h) {
    const s = N(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: l,
        scroll: ve()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && R(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), f(s.current, s, !0);
    const c = N({}, Je(o.value, l, null), { position: s.position + 1 }, h);
    f(l, c, !1), o.value = l;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: u
  };
}
function In(e) {
  e = Sn(e);
  const t = Dn(e), n = xn(e, t.state, t.location, t.replace);
  function o(f, u = !0) {
    u || n.pauseListeners(), history.go(f);
  }
  const r = N({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: Nn.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function me(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Pt(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const q = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, Te = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var Xe;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Xe || (Xe = {}));
const Vn = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Ln(t)}" via a navigation guard.`;
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
  return process.env.NODE_ENV !== "production" ? N(new Error(Vn[e](t)), {
    type: e,
    [Te]: !0
  }, t) : N(new Error(), {
    type: e,
    [Te]: !0
  }, t);
}
function U(e, t) {
  return e instanceof Error && Te in e && (t == null || !!(e.type & t));
}
const jn = ["params", "query", "hash"];
function Ln(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of jn)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Ze = "[^/]+?", Mn = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Bn = /[.+*?^${}()[\]/\\]/g;
function Un(e, t) {
  const n = N({}, Mn, t), o = [];
  let r = n.start ? "^" : "";
  const f = [];
  for (const h of e) {
    const s = h.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !h.length && (r += "/");
    for (let c = 0; c < h.length; c++) {
      const a = h[c];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (a.type === 0)
        c || (r += "/"), r += a.value.replace(Bn, "\\$&"), p += 40;
      else if (a.type === 1) {
        const { value: g, repeatable: _, optional: S, regexp: E } = a;
        f.push({
          name: g,
          repeatable: _,
          optional: S
        });
        const b = E || Ze;
        if (b !== Ze) {
          p += 10;
          try {
            new RegExp(`(${b})`);
          } catch (I) {
            throw new Error(`Invalid custom RegExp for param "${g}" (${b}): ` + I.message);
          }
        }
        let C = _ ? `((?:${b})(?:/(?:${b}))*)` : `(${b})`;
        c || (C = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        S && h.length < 2 ? `(?:/${C})` : "/" + C), S && (C += "?"), r += C, p += 20, S && (p += -8), _ && (p += -20), b === ".*" && (p += -50);
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
    const s = h.match(u), c = {};
    if (!s)
      return null;
    for (let a = 1; a < s.length; a++) {
      const p = s[a] || "", g = f[a - 1];
      c[g.name] = p && g.repeatable ? p.split("/") : p;
    }
    return c;
  }
  function l(h) {
    let s = "", c = !1;
    for (const a of e) {
      (!c || !s.endsWith("/")) && (s += "/"), c = !1;
      for (const p of a)
        if (p.type === 0)
          s += p.value;
        else if (p.type === 1) {
          const { value: g, repeatable: _, optional: S } = p, E = g in h ? h[g] : "";
          if (V(E) && !_)
            throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);
          const b = V(E) ? E.join("/") : E;
          if (!b)
            if (S)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : c = !0);
            else
              throw new Error(`Missing required param "${g}"`);
          s += b;
        }
    }
    return s || "/";
  }
  return {
    re: u,
    score: o,
    keys: f,
    parse: d,
    stringify: l
  };
}
function Hn(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function qn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const f = Hn(o[n], r[n]);
    if (f)
      return f;
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
const Gn = {
  type: 0,
  value: ""
}, Kn = /[a-zA-Z0-9_]/;
function zn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Gn]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${h}": ${p}`);
  }
  let n = 0, o = n;
  const r = [];
  let f;
  function u() {
    f && r.push(f), f = [];
  }
  let d = 0, l, h = "", s = "";
  function c() {
    h && (n === 0 ? f.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (f.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), f.push({
      type: 1,
      value: h,
      regexp: s,
      repeatable: l === "*" || l === "+",
      optional: l === "*" || l === "?"
    })) : t("Invalid state to consume buffer"), h = "");
  }
  function a() {
    h += l;
  }
  for (; d < e.length; ) {
    if (l = e[d++], l === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (h && c(), u()) : l === ":" ? (c(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        l === "(" ? n = 2 : Kn.test(l) ? a() : (c(), n = 0, l !== "*" && l !== "?" && l !== "+" && d--);
        break;
      case 2:
        l === ")" ? s[s.length - 1] == "\\" ? s = s.slice(0, -1) + l : n = 3 : s += l;
        break;
      case 3:
        c(), n = 0, l !== "*" && l !== "?" && l !== "+" && d--, s = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), c(), u(), r;
}
function Fn(e, t, n) {
  const o = Un(zn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const f = /* @__PURE__ */ new Set();
    for (const u of o.keys)
      f.has(u.name) && R(`Found duplicated params with name "${u.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), f.add(u.name);
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
function Wn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = ot({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function f(s, c, a) {
    const p = !a, g = Qn(s);
    process.env.NODE_ENV !== "production" && Zn(g, c), g.aliasOf = a && a.record;
    const _ = ot(t, s), S = [
      g
    ];
    if ("alias" in s) {
      const C = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const I of C)
        S.push(N({}, g, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: a ? a.record.components : g.components,
          path: I,
          // we might be the child of an alias
          aliasOf: a ? a.record : g
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let E, b;
    for (const C of S) {
      const { path: I } = C;
      if (c && I[0] !== "/") {
        const W = c.record.path, B = W[W.length - 1] === "/" ? "" : "/";
        C.path = c.record.path + (I && B + I);
      }
      if (process.env.NODE_ENV !== "production" && C.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (E = Fn(C, c, _), process.env.NODE_ENV !== "production" && c && I[0] === "/" && eo(E, c), a ? (a.alias.push(E), process.env.NODE_ENV !== "production" && Xn(a, E)) : (b = b || E, b !== E && b.alias.push(E), p && s.name && !nt(E) && u(s.name)), g.children) {
        const W = g.children;
        for (let B = 0; B < W.length; B++)
          f(W[B], E, a && a.children[B]);
      }
      a = a || E, (E.record.components && Object.keys(E.record.components).length || E.record.name || E.record.redirect) && l(E);
    }
    return b ? () => {
      u(b);
    } : ce;
  }
  function u(s) {
    if (Pt(s)) {
      const c = o.get(s);
      c && (o.delete(s), n.splice(n.indexOf(c), 1), c.children.forEach(u), c.alias.forEach(u));
    } else {
      const c = n.indexOf(s);
      c > -1 && (n.splice(c, 1), s.record.name && o.delete(s.record.name), s.children.forEach(u), s.alias.forEach(u));
    }
  }
  function d() {
    return n;
  }
  function l(s) {
    let c = 0;
    for (; c < n.length && qn(s, n[c]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[c].record.path || !Nt(s, n[c])); )
      c++;
    n.splice(c, 0, s), s.record.name && !nt(s) && o.set(s.record.name, s);
  }
  function h(s, c) {
    let a, p = {}, g, _;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw oe(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const b = Object.keys(s.params || {}).filter((C) => !a.keys.find((I) => I.name === C));
        b.length && R(`Discarded invalid param(s) "${b.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      _ = a.record.name, p = N(
        // paramsFromLocation is a new object
        tt(
          c.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          a.keys.filter((b) => !b.optional).concat(a.parent ? a.parent.keys.filter((b) => b.optional) : []).map((b) => b.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && tt(s.params, a.keys.map((b) => b.name))
      ), g = a.stringify(p);
    } else if (s.path != null)
      g = s.path, process.env.NODE_ENV !== "production" && !g.startsWith("/") && R(`The Matcher cannot resolve relative paths but received "${g}". Unless you directly called \`matcher.resolve("${g}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((b) => b.re.test(g)), a && (p = a.parse(g), _ = a.record.name);
    else {
      if (a = c.name ? o.get(c.name) : n.find((b) => b.re.test(c.path)), !a)
        throw oe(1, {
          location: s,
          currentLocation: c
        });
      _ = a.record.name, p = N({}, c.params, s.params), g = a.stringify(p);
    }
    const S = [];
    let E = a;
    for (; E; )
      S.unshift(E.record), E = E.parent;
    return {
      name: _,
      path: g,
      params: p,
      matched: S,
      meta: Jn(S)
    };
  }
  return e.forEach((s) => f(s)), { addRoute: f, resolve: h, removeRoute: u, getRoutes: d, getRecordMatcher: r };
}
function tt(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Qn(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Yn(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Yn(e) {
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
function Jn(e) {
  return e.reduce((t, n) => N(t, n.meta), {});
}
function ot(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function xe(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function Xn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(xe.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(xe.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Zn(e, t) {
  t && t.record.name && !e.name && !e.path && R(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function eo(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(xe.bind(null, n)))
      return R(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Nt(e, t) {
  return t.children.some((n) => n === e || Nt(e, n));
}
function to(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const f = o[r].replace(Et, " "), u = f.indexOf("="), d = ne(u < 0 ? f : f.slice(0, u)), l = u < 0 ? null : ne(f.slice(u + 1));
    if (d in t) {
      let h = t[d];
      V(h) || (h = t[d] = [h]), h.push(l);
    } else
      t[d] = l;
  }
  return t;
}
function rt(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = gn(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (V(o) ? o.map((f) => f && $e(f)) : [o && $e(o)]).forEach((f) => {
      f !== void 0 && (t += (t.length ? "&" : "") + n, f != null && (t += "=" + f));
    });
  }
  return t;
}
function no(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = V(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const oo = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), st = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Me = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Ct = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), De = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
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
function G(e, t, n, o, r, f = (u) => u()) {
  const u = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((d, l) => {
    const h = (a) => {
      a === !1 ? l(oe(4, {
        from: n,
        to: t
      })) : a instanceof Error ? l(a) : me(a) ? l(oe(2, {
        from: t,
        to: a
      })) : (u && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === u && typeof a == "function" && u.push(a), d());
    }, s = f(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? ro(h, t, n) : h));
    let c = Promise.resolve(s);
    if (e.length < 3 && (c = c.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        c = c.then((p) => h._called ? p : (R(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        R(a), l(new Error("Invalid navigation guard"));
        return;
      }
    }
    c.catch((a) => l(a));
  });
}
function ro(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && R(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Ne(e, t, n, o, r = (f) => f()) {
  const f = [];
  for (const u of e) {
    process.env.NODE_ENV !== "production" && !u.components && !u.children.length && R(`Record with path "${u.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in u.components) {
      let l = u.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!l || typeof l != "object" && typeof l != "function")
          throw R(`Component "${d}" in record with path "${u.path}" is not a valid component. Received "${String(l)}".`), new Error("Invalid route component");
        if ("then" in l) {
          R(`Component "${d}" in record with path "${u.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = l;
          l = () => h;
        } else
          l.__asyncLoader && // warn only once per component
          !l.__warnedDefineAsync && (l.__warnedDefineAsync = !0, R(`Component "${d}" in record with path "${u.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !u.instances[d]))
        if (so(l)) {
          const s = (l.__vccOpts || l)[t];
          s && f.push(G(s, n, o, u, d, r));
        } else {
          let h = l();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (R(`Component "${d}" in record with path "${u.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), f.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${u.path}"`));
            const c = sn(s) ? s.default : s;
            u.components[d] = c;
            const p = (c.__vccOpts || c)[t];
            return p && G(p, n, o, u, d, r)();
          }));
        }
    }
  }
  return f;
}
function so(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function at(e) {
  const t = K(Me), n = K(Ct);
  let o = !1, r = null;
  const f = j(() => {
    const s = Y(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (me(s) || (o ? R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), u = j(() => {
    const { matched: s } = f.value, { length: c } = s, a = s[c - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const g = p.findIndex(z.bind(null, a));
    if (g > -1)
      return g;
    const _ = it(s[c - 2]);
    return (
      // we are dealing with nested routes
      c > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      it(a) === _ && // avoid comparing the child with its parent
      p[p.length - 1].path !== _ ? p.findIndex(z.bind(null, s[c - 2])) : g
    );
  }), d = j(() => u.value > -1 && lo(n.params, f.value.params)), l = j(() => u.value > -1 && u.value === n.matched.length - 1 && kt(n.params, f.value.params));
  function h(s = {}) {
    return co(s) ? t[Y(e.replace) ? "replace" : "push"](
      Y(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ce) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && H) {
    const s = dt();
    if (s) {
      const c = {
        route: f.value,
        isActive: d.value,
        isExactActive: l.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(c), Ft(() => {
        c.route = f.value, c.isActive = d.value, c.isExactActive = l.value, c.error = me(Y(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: f,
    href: j(() => f.value.href),
    isActive: d,
    isExactActive: l,
    navigate: h
  };
}
const ao = /* @__PURE__ */ F({
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
    const n = zt(at(e)), { options: o } = K(Me), r = j(() => ({
      [ct(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [ct(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const f = t.default && t.default(n);
      return e.custom ? f : ft("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, f);
    };
  }
}), io = ao;
function co(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function lo(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!V(r) || r.length !== o.length || o.some((f, u) => f !== r[u]))
      return !1;
  }
  return !0;
}
function it(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const ct = (e, t, n) => e ?? t ?? n, uo = /* @__PURE__ */ F({
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
    process.env.NODE_ENV !== "production" && ho();
    const o = K(De), r = j(() => e.route || o.value), f = K(st, 0), u = j(() => {
      let h = Y(f);
      const { matched: s } = r.value;
      let c;
      for (; (c = s[h]) && !c.components; )
        h++;
      return h;
    }), d = j(() => r.value.matched[u.value]);
    Re(st, j(() => u.value + 1)), Re(oo, d), Re(De, r);
    const l = M();
    return je(() => [l.value, d.value, e.name], ([h, s, c], [a, p, g]) => {
      s && (s.instances[c] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !z(s, p) || !a) && (s.enterCallbacks[c] || []).forEach((_) => _(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, c = d.value, a = c && c.components[s];
      if (!a)
        return lt(n.default, { Component: a, route: h });
      const p = c.props[s], g = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, S = ft(a, N({}, g, t, {
        onVnodeUnmounted: (E) => {
          E.component.isUnmounted && (c.instances[s] = null);
        },
        ref: l
      }));
      if (process.env.NODE_ENV !== "production" && H && S.ref) {
        const E = {
          depth: u.value,
          name: c.name,
          path: c.path,
          meta: c.meta
        };
        (V(S.ref) ? S.ref.map((C) => C.i) : [S.ref.i]).forEach((C) => {
          C.__vrv_devtools = E;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        lt(n.default, { Component: S, route: h }) || S
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
const fo = uo;
function ho() {
  const e = dt(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    R(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
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
    matched: e.matched.map((o) => ko(o, ["instances", "children", "aliasOf"]))
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
let po = 0;
function mo(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = po++;
  rn({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (r) => {
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((s, c) => {
      s.instanceData && s.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: ie(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: c }) => {
      if (c.__vrv_devtools) {
        const a = c.__vrv_devtools;
        s.tags.push({
          label: (a.name ? `${a.name.toString()}: ` : "") + a.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: Ot
        });
      }
      V(c.__vrl_devtools) && (c.__devtoolsApi = r, c.__vrl_devtools.forEach((a) => {
        let p = a.route.path, g = Tt, _ = "", S = 0;
        a.error ? (p = a.error, g = Eo, S = bo) : a.isExactActive ? (g = At, _ = "This is exactly active") : a.isActive && (g = $t, _ = "This link is active"), s.tags.push({
          label: p,
          textColor: S,
          tooltip: _,
          backgroundColor: g
        });
      }));
    }), je(t.currentRoute, () => {
      l(), r.notifyComponentUpdate(), r.sendInspectorTree(d), r.sendInspectorState(d);
    });
    const f = "router:navigations:" + o;
    r.addTimelineLayer({
      id: f,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((s, c) => {
      r.addTimelineEvent({
        layerId: f,
        event: {
          title: "Error during Navigation",
          subtitle: c.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: s },
          groupId: c.meta.__navigationId
        }
      });
    });
    let u = 0;
    t.beforeEach((s, c) => {
      const a = {
        guard: pe("beforeEach"),
        from: ie(c, "Current Location during this navigation"),
        to: ie(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: u++
      }), r.addTimelineEvent({
        layerId: f,
        event: {
          time: r.now(),
          title: "Start of navigation",
          subtitle: s.fullPath,
          data: a,
          groupId: s.meta.__navigationId
        }
      });
    }), t.afterEach((s, c, a) => {
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
      }, p.status = pe("❌")) : p.status = pe("✅"), p.from = ie(c, "Current Location during this navigation"), p.to = ie(s, "Target location"), r.addTimelineEvent({
        layerId: f,
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
    function l() {
      if (!h)
        return;
      const s = h;
      let c = n.getRoutes().filter((a) => !a.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !a.parent.record.components);
      c.forEach(It), s.filter && (c = c.filter((a) => (
        // save matches state based on the payload
        Ie(a, s.filter.toLowerCase())
      ))), c.forEach((a) => Dt(a, t.currentRoute.value)), s.rootNodes = c.map(xt);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && l();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === d) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        a && (s.state = {
          options: go(a)
        });
      }
    }), r.sendInspectorTree(d), r.sendInspectorState(d);
  });
}
function vo(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function go(e) {
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
        display: e.keys.map((o) => `${o.name}${vo(o)}`).join(" "),
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
const Ot = 15485081, $t = 2450411, At = 8702998, yo = 2282478, Tt = 16486972, _o = 6710886, Eo = 16704226, bo = 12131356;
function xt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: yo
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Tt
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Ot
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: At
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: $t
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: _o
  });
  let o = n.__vd_id;
  return o == null && (o = String(wo++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(xt)
  };
}
let wo = 0;
const Ro = /^\/(.*)\/([a-z]*)$/;
function Dt(e, t) {
  const n = t.matched.length && z(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => z(o, e.record))), e.children.forEach((o) => Dt(o, t));
}
function It(e) {
  e.__vd_match = !1, e.children.forEach(It);
}
function Ie(e, t) {
  const n = String(e.re).match(Ro);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((u) => Ie(u, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), f = ne(r);
  return !t.startsWith("/") && (f.includes(t) || r.includes(t)) || f.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((u) => Ie(u, t));
}
function ko(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function So(e) {
  const t = Wn(e.routes, e), n = e.parseQuery || to, o = e.stringifyQuery || rt, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const f = ae(), u = ae(), d = ae(), l = qt(q);
  let h = q;
  H && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = Se.bind(null, (i) => "" + i), c = Se.bind(null, _n), a = (
    // @ts-expect-error: intentionally avoid the type check
    Se.bind(null, ne)
  );
  function p(i, v) {
    let m, y;
    return Pt(i) ? (m = t.getRecordMatcher(i), process.env.NODE_ENV !== "production" && !m && R(`Parent route "${String(i)}" not found when adding child route`, v), y = v) : y = i, t.addRoute(y, m);
  }
  function g(i) {
    const v = t.getRecordMatcher(i);
    v ? t.removeRoute(v) : process.env.NODE_ENV !== "production" && R(`Cannot remove non-existent route "${String(i)}"`);
  }
  function _() {
    return t.getRoutes().map((i) => i.record);
  }
  function S(i) {
    return !!t.getRecordMatcher(i);
  }
  function E(i, v) {
    if (v = N({}, v || l.value), typeof i == "string") {
      const w = Pe(n, i, v.path), A = t.resolve({ path: w.path }, v), Q = r.createHref(w.fullPath);
      return process.env.NODE_ENV !== "production" && (Q.startsWith("//") ? R(`Location "${i}" resolved to "${Q}". A resolved location cannot start with multiple slashes.`) : A.matched.length || R(`No match found for location with path "${i}"`)), N(w, A, {
        params: a(A.params),
        hash: ne(w.hash),
        redirectedFrom: void 0,
        href: Q
      });
    }
    process.env.NODE_ENV !== "production" && !me(i) && (R(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, i), i = {});
    let m;
    if (i.path != null)
      process.env.NODE_ENV !== "production" && "params" in i && !("name" in i) && // @ts-expect-error: the type is never
      Object.keys(i.params).length && R(`Path "${i.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), m = N({}, i, {
        path: Pe(n, i.path, v.path).path
      });
    else {
      const w = N({}, i.params);
      for (const A in w)
        w[A] == null && delete w[A];
      m = N({}, i, {
        params: c(w)
      }), v.params = c(v.params);
    }
    const y = t.resolve(m, v), P = i.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && R(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), y.params = s(a(y.params));
    const x = wn(o, N({}, i, {
      hash: vn(P),
      path: y.path
    })), k = r.createHref(x);
    return process.env.NODE_ENV !== "production" && (k.startsWith("//") ? R(`Location "${i}" resolved to "${k}". A resolved location cannot start with multiple slashes.`) : y.matched.length || R(`No match found for location with path "${i.path != null ? i.path : i}"`)), N({
      fullPath: x,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: P,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === rt ? no(i.query) : i.query || {}
      )
    }, y, {
      redirectedFrom: void 0,
      href: k
    });
  }
  function b(i) {
    return typeof i == "string" ? Pe(n, i, l.value.path) : N({}, i);
  }
  function C(i, v) {
    if (h !== i)
      return oe(8, {
        from: v,
        to: i
      });
  }
  function I(i) {
    return re(i);
  }
  function W(i) {
    return I(N(b(i), { replace: !0 }));
  }
  function B(i) {
    const v = i.matched[i.matched.length - 1];
    if (v && v.redirect) {
      const { redirect: m } = v;
      let y = typeof m == "function" ? m(i) : m;
      if (typeof y == "string" && (y = y.includes("?") || y.includes("#") ? y = b(y) : (
        // force empty params
        { path: y }
      ), y.params = {}), process.env.NODE_ENV !== "production" && y.path == null && !("name" in y))
        throw R(`Invalid redirect found:
${JSON.stringify(y, null, 2)}
 when navigating to "${i.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return N({
        query: i.query,
        hash: i.hash,
        // avoid transferring params if the redirect has a path
        params: y.path != null ? {} : i.params
      }, y);
    }
  }
  function re(i, v) {
    const m = h = E(i), y = l.value, P = i.state, x = i.force, k = i.replace === !0, w = B(m);
    if (w)
      return re(
        N(b(w), {
          state: typeof w == "object" ? N({}, P, w.state) : P,
          force: x,
          replace: k
        }),
        // keep original redirectedFrom if it exists
        v || m
      );
    const A = m;
    A.redirectedFrom = v;
    let Q;
    return !x && We(o, y, m) && (Q = oe(16, { to: A, from: y }), Ge(
      y,
      y,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (Q ? Promise.resolve(Q) : Be(A, y)).catch((D) => U(D) ? (
      // navigation redirects still mark the router as ready
      U(
        D,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? D : Ee(D)
    ) : (
      // reject any unknown error
      _e(D, A, y)
    )).then((D) => {
      if (D) {
        if (U(
          D,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          We(o, E(D.to), A) && // and we have done it a couple of times
          v && // @ts-expect-error: added only in dev
          (v._count = v._count ? (
            // @ts-expect-error
            v._count + 1
          ) : 1) > 30 ? (R(`Detected a possibly infinite redirection in a navigation guard when going from "${y.fullPath}" to "${A.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : re(
            // keep options
            N({
              // preserve an existing replacement but allow the redirect to override it
              replace: k
            }, b(D.to), {
              state: typeof D.to == "object" ? N({}, P, D.to.state) : P,
              force: x
            }),
            // preserve the original redirectedFrom if any
            v || A
          );
      } else
        D = He(A, y, !0, k, P);
      return Ue(A, y, D), D;
    });
  }
  function Bt(i, v) {
    const m = C(i, v);
    return m ? Promise.reject(m) : Promise.resolve();
  }
  function ge(i) {
    const v = he.values().next().value;
    return v && typeof v.runWithContext == "function" ? v.runWithContext(i) : i();
  }
  function Be(i, v) {
    let m;
    const [y, P, x] = Po(i, v);
    m = Ne(y.reverse(), "beforeRouteLeave", i, v);
    for (const w of y)
      w.leaveGuards.forEach((A) => {
        m.push(G(A, i, v));
      });
    const k = Bt.bind(null, i, v);
    return m.push(k), X(m).then(() => {
      m = [];
      for (const w of f.list())
        m.push(G(w, i, v));
      return m.push(k), X(m);
    }).then(() => {
      m = Ne(P, "beforeRouteUpdate", i, v);
      for (const w of P)
        w.updateGuards.forEach((A) => {
          m.push(G(A, i, v));
        });
      return m.push(k), X(m);
    }).then(() => {
      m = [];
      for (const w of x)
        if (w.beforeEnter)
          if (V(w.beforeEnter))
            for (const A of w.beforeEnter)
              m.push(G(A, i, v));
          else
            m.push(G(w.beforeEnter, i, v));
      return m.push(k), X(m);
    }).then(() => (i.matched.forEach((w) => w.enterCallbacks = {}), m = Ne(x, "beforeRouteEnter", i, v, ge), m.push(k), X(m))).then(() => {
      m = [];
      for (const w of u.list())
        m.push(G(w, i, v));
      return m.push(k), X(m);
    }).catch((w) => U(
      w,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? w : Promise.reject(w));
  }
  function Ue(i, v, m) {
    d.list().forEach((y) => ge(() => y(i, v, m)));
  }
  function He(i, v, m, y, P) {
    const x = C(i, v);
    if (x)
      return x;
    const k = v === q, w = H ? history.state : {};
    m && (y || k ? r.replace(i.fullPath, N({
      scroll: k && w && w.scroll
    }, P)) : r.push(i.fullPath, P)), l.value = i, Ge(i, v, m, k), Ee();
  }
  let se;
  function Ut() {
    se || (se = r.listen((i, v, m) => {
      if (!Ke.listening)
        return;
      const y = E(i), P = B(y);
      if (P) {
        re(N(P, { replace: !0 }), y).catch(ce);
        return;
      }
      h = y;
      const x = l.value;
      H && $n(Ye(x.fullPath, m.delta), ve()), Be(y, x).catch((k) => U(
        k,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? k : U(
        k,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (re(
        k.to,
        y
        // avoid an uncaught rejection, let push call triggerError
      ).then((w) => {
        U(
          w,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !m.delta && m.type === ue.pop && r.go(-1, !1);
      }).catch(ce), Promise.reject()) : (m.delta && r.go(-m.delta, !1), _e(k, y, x))).then((k) => {
        k = k || He(
          // after navigation, all matched components are resolved
          y,
          x,
          !1
        ), k && (m.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !U(
          k,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-m.delta, !1) : m.type === ue.pop && U(
          k,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Ue(y, x, k);
      }).catch(ce);
    }));
  }
  let ye = ae(), qe = ae(), de;
  function _e(i, v, m) {
    Ee(i);
    const y = qe.list();
    return y.length ? y.forEach((P) => P(i, v, m)) : (process.env.NODE_ENV !== "production" && R("uncaught error during route navigation:"), console.error(i)), Promise.reject(i);
  }
  function Ht() {
    return de && l.value !== q ? Promise.resolve() : new Promise((i, v) => {
      ye.add([i, v]);
    });
  }
  function Ee(i) {
    return de || (de = !i, Ut(), ye.list().forEach(([v, m]) => i ? m(i) : v()), ye.reset()), i;
  }
  function Ge(i, v, m, y) {
    const { scrollBehavior: P } = e;
    if (!H || !P)
      return Promise.resolve();
    const x = !m && An(Ye(i.fullPath, 0)) || (y || !m) && history.state && history.state.scroll || null;
    return Kt().then(() => P(i, v, x)).then((k) => k && On(k)).catch((k) => _e(k, i, v));
  }
  const be = (i) => r.go(i);
  let we;
  const he = /* @__PURE__ */ new Set(), Ke = {
    currentRoute: l,
    listening: !0,
    addRoute: p,
    removeRoute: g,
    hasRoute: S,
    getRoutes: _,
    resolve: E,
    options: e,
    push: I,
    replace: W,
    go: be,
    back: () => be(-1),
    forward: () => be(1),
    beforeEach: f.add,
    beforeResolve: u.add,
    afterEach: d.add,
    onError: qe.add,
    isReady: Ht,
    install(i) {
      const v = this;
      i.component("RouterLink", io), i.component("RouterView", fo), i.config.globalProperties.$router = v, Object.defineProperty(i.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Y(l)
      }), H && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !we && l.value === q && (we = !0, I(r.location).catch((P) => {
        process.env.NODE_ENV !== "production" && R("Unexpected error when starting the router:", P);
      }));
      const m = {};
      for (const P in q)
        Object.defineProperty(m, P, {
          get: () => l.value[P],
          enumerable: !0
        });
      i.provide(Me, v), i.provide(Ct, Gt(m)), i.provide(De, l);
      const y = i.unmount;
      he.add(i), i.unmount = function() {
        he.delete(i), he.size < 1 && (h = q, se && se(), se = null, l.value = q, we = !1, de = !1), y();
      }, process.env.NODE_ENV !== "production" && H && mo(i, v, t);
    }
  };
  function X(i) {
    return i.reduce((v, m) => v.then(() => ge(m)), Promise.resolve());
  }
  return Ke;
}
function Po(e, t) {
  const n = [], o = [], r = [], f = Math.max(t.matched.length, e.matched.length);
  for (let u = 0; u < f; u++) {
    const d = t.matched[u];
    d && (e.matched.find((h) => z(h, d)) ? o.push(d) : n.push(d));
    const l = e.matched[u];
    l && (t.matched.find((h) => z(h, l)) || r.push(l));
  }
  return [n, o, r];
}
const No = [
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
], Co = ["VET2011"], Oo = [
  { "course:VETS2011": 10 },
  { "course:VETS2012": 10 },
  { "subject:Physiology": 20 },
  { "system:Respiratory_System": 15 },
  { "system:Exercise": 20 },
  { "animal:Horse": 10 }
], $o = async (e, t) => {
  try {
    return await (await fetch(
      t + "?" + new URLSearchParams({ tag: e })
    )).json();
  } catch (n) {
    console.error("Error fetching data from the server", n), alert("Error fetching data from the server, only display test data.");
  }
}, Ao = async (e, t) => {
  try {
    return await $o(e, t) || No.filter(
      (o) => o.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, To = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), r = await (await fetch(`${t}?${n}`)).json() ?? Co, f = new Set(r);
    return Array.from(f);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, xo = Oo.reduce(
  (e, t) => {
    const [n, o] = Object.keys(t)[0].split(":"), r = Object.values(t)[0];
    return e[n] || (e[n] = []), e[n].push({ [o.replace("_", " ")]: r }), e;
  },
  {}
), Do = { class: "search-results-container" }, Io = { class: "container-description" }, Vo = { class: "label-badges" }, jo = {
  key: 0,
  class: "results"
}, Lo = ["href"], Mo = {
  key: 1,
  class: "no-results"
}, Bo = /* @__PURE__ */ F({
  __name: "DisplayResult",
  setup(e) {
    const t = K("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("%cRetrieving data from:", "color: skyblue;", t);
    const n = M([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = Mt(), r = M("");
    ht(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, await f(r.value)) : r.value = "undefined";
    });
    const f = async (u) => {
      const d = await Ao(u, t);
      d && (n.value = d);
    };
    return je(o.currentRoute, async (u, d) => {
      const l = u.query.tag || "", h = d.query.tag || "";
      l !== h && await f(l);
    }), (u, d) => (O(), $("div", Do, [
      T("div", Io, [
        T("button", {
          onClick: d[0] || (d[0] = () => u.$router.back())
        }, "↵"),
        T("div", Vo, " (" + L(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? (O(), $("div", jo, [
        T("ul", null, [
          (O(!0), $(J, null, ee(n.value, (l, h) => (O(), $("li", { key: h }, [
            T("a", {
              href: l.url,
              target: "_blank",
              class: "linkToResource"
            }, L(l.label), 9, Lo)
          ]))), 128))
        ])
      ])) : (O(), $("p", Mo, "No results found"))
    ]));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Ve = /* @__PURE__ */ fe(Bo, [["__scopeId", "data-v-8413d12c"]]), Vt = (e) => (pt("data-v-b97c2a53"), e = e(), mt(), e), Uo = /* @__PURE__ */ Vt(() => /* @__PURE__ */ T("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }, null, -1)), Ho = /* @__PURE__ */ Vt(() => /* @__PURE__ */ T("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}, null, -1)), qo = [
  Uo,
  Ho
], Go = /* @__PURE__ */ F({
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
    }, qo, 2));
  }
}), jt = /* @__PURE__ */ fe(Go, [["__scopeId", "data-v-b97c2a53"]]), ut = /* @__PURE__ */ F({
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
    }, f = j(() => r[o] || "Default");
    return (u, d) => (O(), $("button", {
      class: "filter-btn",
      onClick: d[0] || (d[0] = (l) => n("click", u.actionType))
    }, L(f.value), 1));
  }
}), Ko = (e) => (pt("data-v-437e9148"), e = e(), mt(), e), zo = { class: "crucible-filter-container" }, Fo = {
  key: 0,
  class: "crucible-filter-panel"
}, Wo = { class: "crucible-filter-action" }, Qo = /* @__PURE__ */ Ko(() => /* @__PURE__ */ T("hr", null, null, -1)), Yo = { class: "crucible-filter-collection" }, Jo = ["onClick"], Xo = { class: "crucible-filters" }, Zo = ["onClick"], er = { class: "row crucible-filter-dropdown-menu" }, tr = ["onClick"], nr = /* @__PURE__ */ F({
  __name: "CrucibleFilter",
  setup(e) {
    const t = M(!1), n = M({}), o = M([]), r = (s) => {
      n.value[s] = !n.value[s];
    }, f = (s, c) => {
      const a = `${s}:${c.replace(" ", "_")}`;
      o.value.includes(a) || o.value.push(a);
    }, u = () => {
    }, d = j(() => o.value.map(
      (s) => s.split(":")[1].replace("_", " ")
    )), l = () => {
      n.value = {}, o.value = [];
    }, h = () => {
      console.log("Applying the filter", o);
    };
    return (s, c) => (O(), $("div", zo, [
      t.value ? (O(), $("div", Fo, [
        T("div", Wo, [
          te(ut, {
            "action-type": "apply",
            onClick: h
          }),
          te(ut, {
            "action-type": "clear",
            onClick: l
          })
        ]),
        Qo,
        T("div", Yo, [
          (O(!0), $(J, null, ee(o.value, (a, p) => (O(), $("span", {
            key: p,
            onClick: (g) => (o.value.splice(p, 1), u)
          }, [
            ke(" ☒ "),
            T("strong", null, L(a.split(":")[0]), 1),
            ke(" " + L(a.split(":")[1].replace("_", " ")), 1)
          ], 8, Jo))), 128))
        ]),
        T("div", Xo, [
          (O(!0), $(J, null, ee(Y(xo), (a, p) => (O(), $("div", {
            key: p,
            class: "crucible-filter-dropdown"
          }, [
            T("h4", {
              onClick: (g) => r(p)
            }, [
              T("span", null, L(p), 1),
              te(jt, {
                "show-dropdown": n.value[p]
              }, null, 8, ["show-dropdown"])
            ], 8, Zo),
            vt(T("div", er, [
              (O(!0), $(J, null, ee(a, (g, _) => (O(), $("div", {
                key: _,
                class: Ce(
                  d.value.includes(Object.keys(g)[0]) ? "selected-filter-tag column" : "column"
                ),
                onClick: (S) => f(p, Object.keys(g)[0])
              }, [
                ke(L(Object.keys(g)[0]) + " ", 1),
                T("span", null, "(" + L(Object.values(g)[0]) + ")", 1)
              ], 10, tr))), 128))
            ], 512), [
              [Wt, n.value[p]]
            ])
          ]))), 128))
        ])
      ])) : gt("", !0),
      T("button", {
        class: Ce(
          t.value ? "crucible-filter-control svg-background-light" : "crucible-filter-control crucible-filter-control-light svg-background-dark"
        ),
        onClick: c[0] || (c[0] = (a) => t.value = !t.value)
      }, null, 2)
    ]));
  }
}), Lt = /* @__PURE__ */ fe(nr, [["__scopeId", "data-v-437e9148"]]), or = { id: "app" }, rr = { class: "main" }, sr = /* @__PURE__ */ F({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = ze("CrucibleSearch"), r = ze("RouterView");
      return O(), $("div", or, [
        T("div", rr, [
          te(o),
          te(r),
          T("div", null, [
            te(Lt)
          ])
        ])
      ]);
    };
  }
}), ar = /* @__PURE__ */ fe(sr, [["__scopeId", "data-v-aabb2d26"]]), ir = [
  { path: "/", component: ar },
  { path: "/search", component: Ve }
], cr = So({
  history: In("/"),
  routes: ir
});
function Mt() {
  const e = K("$router");
  return e || cr;
}
const lr = { class: "search-container" }, ur = { key: 0 }, fr = ["onClick"], dr = 10, hr = /* @__PURE__ */ F({
  __name: "CrucibleSearch",
  setup(e) {
    const t = Mt(), n = M(""), o = M([]), r = M(!1), f = M(null), u = K("$tagsApi") || "http://localhost:8080/api/resource/alltags", d = (_) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(_.toLowerCase())
    ), l = (_) => _.replace(/_/g, " "), h = (_) => _.replace(/ /g, "_"), s = async () => {
      n.value ? (o.value = (await To(n.value, u)).slice(0, dr), o.value = o.value.map(l), r.value = !0) : (o.value = [], r.value = !1);
    }, c = (_) => {
      n.value = o.value.includes(_) ? _ : o.value[0], r.value = !1, t.push({
        path: "/search",
        query: { tag: h(n.value) }
      });
    }, a = () => {
      o.value.length && n.value && (r.value = !0);
    }, p = (_) => {
      _.key === "Enter" ? (c(n.value), n.value = "") : _.key === "Tab" && (_.preventDefault(), n.value = o.value[0] ?? n.value);
    }, g = (_) => {
      f.value && !f.value.contains(_.target) && (r.value = !1);
    };
    return ht(() => {
      document.addEventListener("click", g);
    }), Qt(() => {
      document.removeEventListener("click", g);
    }), (_, S) => (O(), $("div", lr, [
      T("div", {
        ref_key: "searchBoxRef",
        ref: f,
        class: "search-container"
      }, [
        vt(T("input", {
          "onUpdate:modelValue": S[0] || (S[0] = (E) => n.value = E),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: s,
          onFocus: a,
          onKeydown: p
        }, null, 544), [
          [Yt, n.value]
        ]),
        o.value.length && n.value && r.value ? (O(), $("ul", ur, [
          (O(!0), $(J, null, ee(o.value, (E) => (O(), $("li", {
            key: E,
            onClick: (b) => c(E)
          }, [
            (O(!0), $(J, null, ee(E.split(""), (b, C) => (O(), $(J, null, [
              d(b) ? (O(), $("strong", {
                key: `strong-${C}`
              }, L(b), 1)) : (O(), $("span", { key: C }, L(b), 1))
            ], 64))), 256))
          ], 8, fr))), 128))
        ])) : gt("", !0)
      ], 512)
    ]));
  }
}), pr = /* @__PURE__ */ fe(hr, [["__scopeId", "data-v-5cb7fe60"]]);
function vr(e, t) {
  const { router: n, getApi: o, tagsApi: r } = t;
  e.component("CrucibleSearch", pr), e.component("DisplayResult", Ve), e.component("CrucibleFilter", Lt), e.component("CollapseBtn", jt), e.provide("$router", n), e.provide("$getApi", o), e.provide("$tagsApi", r), n.addRoute({ path: "/search", component: Ve });
}
export {
  jt as CollapseBtn,
  Lt as CrucibleFilter,
  pr as CrucibleSearch,
  Ve as DisplayResult,
  vr as createSearchPlugin
};
