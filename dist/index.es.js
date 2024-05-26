import { shallowRef as $t, inject as F, unref as Q, shallowReactive as At, nextTick as xt, defineComponent as le, reactive as Tt, computed as I, h as rt, provide as ve, ref as st, watch as Ce, getCurrentInstance as it, watchEffect as It, onMounted as at, openBlock as W, createElementBlock as z, createElementVNode as H, Fragment as ct, renderList as Dt, toDisplayString as Vt, pushScopeId as jt, popScopeId as Mt, resolveComponent as Me, withKeys as Lt, createVNode as Le, withCtx as Ut, createTextVNode as Bt } from "vue";
function Gt() {
  return lt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function lt() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Ht = typeof Proxy == "function", Kt = "devtools-plugin:setup", qt = "plugin:settings:set";
let q, we;
function Wt() {
  var e;
  return q !== void 0 || (typeof window < "u" && window.performance ? (q = !0, we = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (q = !0, we = globalThis.perf_hooks.performance) : q = !1), q;
}
function zt() {
  return Wt() ? we.now() : Date.now();
}
class Qt {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const l in t.settings) {
        const d = t.settings[l];
        o[l] = d.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${t.id}`;
    let u = Object.assign({}, o);
    try {
      const l = localStorage.getItem(s), d = JSON.parse(l);
      Object.assign(u, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return u;
      },
      setSettings(l) {
        try {
          localStorage.setItem(s, JSON.stringify(l));
        } catch {
        }
        u = l;
      },
      now() {
        return zt();
      }
    }, n && n.on(qt, (l, d) => {
      l === this.plugin.id && this.fallbacks.setSettings(d);
    }), this.proxiedOn = new Proxy({}, {
      get: (l, d) => this.target ? this.target.on[d] : (...f) => {
        this.onQueue.push({
          method: d,
          args: f
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (l, d) => this.target ? this.target[d] : d === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(d) ? (...f) => (this.targetQueue.push({
        method: d,
        args: f,
        resolve: () => {
        }
      }), this.fallbacks[d](...f)) : (...f) => new Promise((h) => {
        this.targetQueue.push({
          method: d,
          args: f,
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
function Ft(e, t) {
  const n = e, o = lt(), s = Gt(), u = Ht && n.enableEarlyProxy;
  if (s && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !u))
    s.emit(Kt, e, t);
  else {
    const l = u ? new Qt(n, s) : null;
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
const j = typeof document < "u";
function Yt(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const k = Object.assign;
function ye(e, t) {
  const n = {};
  for (const o in t) {
    const s = t[o];
    n[o] = T(s) ? s.map(e) : e(s);
  }
  return n;
}
const ne = () => {
}, T = Array.isArray;
function b(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const ut = /#/g, Jt = /&/g, Xt = /\//g, Zt = /=/g, en = /\?/g, ft = /\+/g, tn = /%5B/g, nn = /%5D/g, dt = /%5E/g, on = /%60/g, ht = /%7B/g, rn = /%7C/g, pt = /%7D/g, sn = /%20/g;
function $e(e) {
  return encodeURI("" + e).replace(rn, "|").replace(tn, "[").replace(nn, "]");
}
function an(e) {
  return $e(e).replace(ht, "{").replace(pt, "}").replace(dt, "^");
}
function be(e) {
  return $e(e).replace(ft, "%2B").replace(sn, "+").replace(ut, "%23").replace(Jt, "%26").replace(on, "`").replace(ht, "{").replace(pt, "}").replace(dt, "^");
}
function cn(e) {
  return be(e).replace(Zt, "%3D");
}
function ln(e) {
  return $e(e).replace(ut, "%23").replace(en, "%3F");
}
function un(e) {
  return e == null ? "" : ln(e).replace(Xt, "%2F");
}
function Y(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && b(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const fn = /\/$/, dn = (e) => e.replace(fn, "");
function _e(e, t, n = "/") {
  let o, s = {}, u = "", l = "";
  const d = t.indexOf("#");
  let f = t.indexOf("?");
  return d < f && d >= 0 && (f = -1), f > -1 && (o = t.slice(0, f), u = t.slice(f + 1, d > -1 ? d : t.length), s = e(u)), d > -1 && (o = o || t.slice(0, d), l = t.slice(d, t.length)), o = mn(o ?? t, n), {
    fullPath: o + (u && "?") + u + l,
    path: o,
    query: s,
    hash: Y(l)
  };
}
function hn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Ue(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Be(e, t, n) {
  const o = t.matched.length - 1, s = n.matched.length - 1;
  return o > -1 && o === s && U(t.matched[o], n.matched[s]) && mt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function U(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function mt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!pn(e[n], t[n]))
      return !1;
  return !0;
}
function pn(e, t) {
  return T(e) ? Ge(e, t) : T(t) ? Ge(t, e) : e === t;
}
function Ge(e, t) {
  return T(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function mn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return b(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), s = o[o.length - 1];
  (s === ".." || s === ".") && o.push("");
  let u = n.length - 1, l, d;
  for (l = 0; l < o.length; l++)
    if (d = o[l], d !== ".")
      if (d === "..")
        u > 1 && u--;
      else
        break;
  return n.slice(0, u).join("/") + "/" + o.slice(l).join("/");
}
var re;
(function(e) {
  e.pop = "pop", e.push = "push";
})(re || (re = {}));
var oe;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(oe || (oe = {}));
function gn(e) {
  if (!e)
    if (j) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), dn(e);
}
const vn = /^[^#]+#/;
function yn(e, t) {
  return e.replace(vn, "#") + t;
}
function _n(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const ue = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function En(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const u = document.querySelector(e.el);
        if (o && u) {
          b(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        b(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const s = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!s) {
      process.env.NODE_ENV !== "production" && b(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = _n(s, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function He(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Re = /* @__PURE__ */ new Map();
function wn(e, t) {
  Re.set(e, t);
}
function bn(e) {
  const t = Re.get(e);
  return Re.delete(e), t;
}
let Rn = () => location.protocol + "//" + location.host;
function gt(e, t) {
  const { pathname: n, search: o, hash: s } = t, u = e.indexOf("#");
  if (u > -1) {
    let d = s.includes(e.slice(u)) ? e.slice(u).length : 1, f = s.slice(d);
    return f[0] !== "/" && (f = "/" + f), Ue(f, "");
  }
  return Ue(n, e) + o + s;
}
function Sn(e, t, n, o) {
  let s = [], u = [], l = null;
  const d = ({ state: a }) => {
    const p = gt(e, location), y = n.value, P = t.value;
    let N = 0;
    if (a) {
      if (n.value = p, t.value = a, l && l === y) {
        l = null;
        return;
      }
      N = P ? a.position - P.position : 0;
    } else
      o(p);
    s.forEach((_) => {
      _(n.value, y, {
        delta: N,
        type: re.pop,
        direction: N ? N > 0 ? oe.forward : oe.back : oe.unknown
      });
    });
  };
  function f() {
    l = n.value;
  }
  function h(a) {
    s.push(a);
    const p = () => {
      const y = s.indexOf(a);
      y > -1 && s.splice(y, 1);
    };
    return u.push(p), p;
  }
  function r() {
    const { history: a } = window;
    a.state && a.replaceState(k({}, a.state, { scroll: ue() }), "");
  }
  function c() {
    for (const a of u)
      a();
    u = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", r);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", r, {
    passive: !0
  }), {
    pauseListeners: f,
    listen: h,
    destroy: c
  };
}
function Ke(e, t, n, o = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: s ? ue() : null
  };
}
function kn(e) {
  const { history: t, location: n } = window, o = {
    value: gt(e, n)
  }, s = { value: t.state };
  s.value || u(o.value, {
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
  function u(f, h, r) {
    const c = e.indexOf("#"), a = c > -1 ? (n.host && document.querySelector("base") ? e : e.slice(c)) + f : Rn() + e + f;
    try {
      t[r ? "replaceState" : "pushState"](h, "", a), s.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? b("Error with push/replace State", p) : console.error(p), n[r ? "replace" : "assign"](a);
    }
  }
  function l(f, h) {
    const r = k({}, t.state, Ke(
      s.value.back,
      // keep back and forward entries but override current position
      f,
      s.value.forward,
      !0
    ), h, { position: s.value.position });
    u(f, r, !0), o.value = f;
  }
  function d(f, h) {
    const r = k(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      s.value,
      t.state,
      {
        forward: f,
        scroll: ue()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && b(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), u(r.current, r, !0);
    const c = k({}, Ke(o.value, f, null), { position: r.position + 1 }, h);
    u(f, c, !1), o.value = f;
  }
  return {
    location: o,
    state: s,
    push: d,
    replace: l
  };
}
function Nn(e) {
  e = gn(e);
  const t = kn(e), n = Sn(e, t.state, t.location, t.replace);
  function o(u, l = !0) {
    l || n.pauseListeners(), history.go(u);
  }
  const s = k({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: yn.bind(null, e)
  }, t, n);
  return Object.defineProperty(s, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(s, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), s;
}
function ce(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function vt(e) {
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
  redirectedFrom: void 0
}, Se = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var qe;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(qe || (qe = {}));
const Pn = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Cn(t)}" via a navigation guard.`;
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
function J(e, t) {
  return process.env.NODE_ENV !== "production" ? k(new Error(Pn[e](t)), {
    type: e,
    [Se]: !0
  }, t) : k(new Error(), {
    type: e,
    [Se]: !0
  }, t);
}
function V(e, t) {
  return e instanceof Error && Se in e && (t == null || !!(e.type & t));
}
const On = ["params", "query", "hash"];
function Cn(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of On)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const We = "[^/]+?", $n = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, An = /[.+*?^${}()[\]/\\]/g;
function xn(e, t) {
  const n = k({}, $n, t), o = [];
  let s = n.start ? "^" : "";
  const u = [];
  for (const h of e) {
    const r = h.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !h.length && (s += "/");
    for (let c = 0; c < h.length; c++) {
      const a = h[c];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (a.type === 0)
        c || (s += "/"), s += a.value.replace(An, "\\$&"), p += 40;
      else if (a.type === 1) {
        const { value: y, repeatable: P, optional: N, regexp: _ } = a;
        u.push({
          name: y,
          repeatable: P,
          optional: N
        });
        const E = _ || We;
        if (E !== We) {
          p += 10;
          try {
            new RegExp(`(${E})`);
          } catch (x) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${E}): ` + x.message);
          }
        }
        let C = P ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        c || (C = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        N && h.length < 2 ? `(?:/${C})` : "/" + C), N && (C += "?"), s += C, p += 20, N && (p += -8), P && (p += -20), E === ".*" && (p += -50);
      }
      r.push(p);
    }
    o.push(r);
  }
  if (n.strict && n.end) {
    const h = o.length - 1;
    o[h][o[h].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? s += "$" : n.strict && (s += "(?:/|$)");
  const l = new RegExp(s, n.sensitive ? "" : "i");
  function d(h) {
    const r = h.match(l), c = {};
    if (!r)
      return null;
    for (let a = 1; a < r.length; a++) {
      const p = r[a] || "", y = u[a - 1];
      c[y.name] = p && y.repeatable ? p.split("/") : p;
    }
    return c;
  }
  function f(h) {
    let r = "", c = !1;
    for (const a of e) {
      (!c || !r.endsWith("/")) && (r += "/"), c = !1;
      for (const p of a)
        if (p.type === 0)
          r += p.value;
        else if (p.type === 1) {
          const { value: y, repeatable: P, optional: N } = p, _ = y in h ? h[y] : "";
          if (T(_) && !P)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const E = T(_) ? _.join("/") : _;
          if (!E)
            if (N)
              a.length < 2 && (r.endsWith("/") ? r = r.slice(0, -1) : c = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          r += E;
        }
    }
    return r || "/";
  }
  return {
    re: l,
    score: o,
    keys: u,
    parse: d,
    stringify: f
  };
}
function Tn(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function In(e, t) {
  let n = 0;
  const o = e.score, s = t.score;
  for (; n < o.length && n < s.length; ) {
    const u = Tn(o[n], s[n]);
    if (u)
      return u;
    n++;
  }
  if (Math.abs(s.length - o.length) === 1) {
    if (ze(o))
      return 1;
    if (ze(s))
      return -1;
  }
  return s.length - o.length;
}
function ze(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Dn = {
  type: 0,
  value: ""
}, Vn = /[a-zA-Z0-9_]/;
function jn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Dn]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${h}": ${p}`);
  }
  let n = 0, o = n;
  const s = [];
  let u;
  function l() {
    u && s.push(u), u = [];
  }
  let d = 0, f, h = "", r = "";
  function c() {
    h && (n === 0 ? u.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (u.length > 1 && (f === "*" || f === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), u.push({
      type: 1,
      value: h,
      regexp: r,
      repeatable: f === "*" || f === "+",
      optional: f === "*" || f === "?"
    })) : t("Invalid state to consume buffer"), h = "");
  }
  function a() {
    h += f;
  }
  for (; d < e.length; ) {
    if (f = e[d++], f === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        f === "/" ? (h && c(), l()) : f === ":" ? (c(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        f === "(" ? n = 2 : Vn.test(f) ? a() : (c(), n = 0, f !== "*" && f !== "?" && f !== "+" && d--);
        break;
      case 2:
        f === ")" ? r[r.length - 1] == "\\" ? r = r.slice(0, -1) + f : n = 3 : r += f;
        break;
      case 3:
        c(), n = 0, f !== "*" && f !== "?" && f !== "+" && d--, r = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), c(), l(), s;
}
function Mn(e, t, n) {
  const o = xn(jn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const u = /* @__PURE__ */ new Set();
    for (const l of o.keys)
      u.has(l.name) && b(`Found duplicated params with name "${l.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), u.add(l.name);
  }
  const s = k(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function Ln(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = Ye({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(r) {
    return o.get(r);
  }
  function u(r, c, a) {
    const p = !a, y = Un(r);
    process.env.NODE_ENV !== "production" && Kn(y, c), y.aliasOf = a && a.record;
    const P = Ye(t, r), N = [
      y
    ];
    if ("alias" in r) {
      const C = typeof r.alias == "string" ? [r.alias] : r.alias;
      for (const x of C)
        N.push(k({}, y, {
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
    let _, E;
    for (const C of N) {
      const { path: x } = C;
      if (c && x[0] !== "/") {
        const B = c.record.path, D = B[B.length - 1] === "/" ? "" : "/";
        C.path = c.record.path + (x && D + x);
      }
      if (process.env.NODE_ENV !== "production" && C.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (_ = Mn(C, c, P), process.env.NODE_ENV !== "production" && c && x[0] === "/" && qn(_, c), a ? (a.alias.push(_), process.env.NODE_ENV !== "production" && Hn(a, _)) : (E = E || _, E !== _ && E.alias.push(_), p && r.name && !Fe(_) && l(r.name)), y.children) {
        const B = y.children;
        for (let D = 0; D < B.length; D++)
          u(B[D], _, a && a.children[D]);
      }
      a = a || _, (_.record.components && Object.keys(_.record.components).length || _.record.name || _.record.redirect) && f(_);
    }
    return E ? () => {
      l(E);
    } : ne;
  }
  function l(r) {
    if (vt(r)) {
      const c = o.get(r);
      c && (o.delete(r), n.splice(n.indexOf(c), 1), c.children.forEach(l), c.alias.forEach(l));
    } else {
      const c = n.indexOf(r);
      c > -1 && (n.splice(c, 1), r.record.name && o.delete(r.record.name), r.children.forEach(l), r.alias.forEach(l));
    }
  }
  function d() {
    return n;
  }
  function f(r) {
    let c = 0;
    for (; c < n.length && In(r, n[c]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (r.record.path !== n[c].record.path || !yt(r, n[c])); )
      c++;
    n.splice(c, 0, r), r.record.name && !Fe(r) && o.set(r.record.name, r);
  }
  function h(r, c) {
    let a, p = {}, y, P;
    if ("name" in r && r.name) {
      if (a = o.get(r.name), !a)
        throw J(1, {
          location: r
        });
      if (process.env.NODE_ENV !== "production") {
        const E = Object.keys(r.params || {}).filter((C) => !a.keys.find((x) => x.name === C));
        E.length && b(`Discarded invalid param(s) "${E.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      P = a.record.name, p = k(
        // paramsFromLocation is a new object
        Qe(
          c.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          a.keys.filter((E) => !E.optional).concat(a.parent ? a.parent.keys.filter((E) => E.optional) : []).map((E) => E.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        r.params && Qe(r.params, a.keys.map((E) => E.name))
      ), y = a.stringify(p);
    } else if (r.path != null)
      y = r.path, process.env.NODE_ENV !== "production" && !y.startsWith("/") && b(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((E) => E.re.test(y)), a && (p = a.parse(y), P = a.record.name);
    else {
      if (a = c.name ? o.get(c.name) : n.find((E) => E.re.test(c.path)), !a)
        throw J(1, {
          location: r,
          currentLocation: c
        });
      P = a.record.name, p = k({}, c.params, r.params), y = a.stringify(p);
    }
    const N = [];
    let _ = a;
    for (; _; )
      N.unshift(_.record), _ = _.parent;
    return {
      name: P,
      path: y,
      params: p,
      matched: N,
      meta: Gn(N)
    };
  }
  return e.forEach((r) => u(r)), { addRoute: u, resolve: h, removeRoute: l, getRoutes: d, getRecordMatcher: s };
}
function Qe(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Un(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Bn(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Bn(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const o in e.components)
      t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function Fe(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function Gn(e) {
  return e.reduce((t, n) => k(t, n.meta), {});
}
function Ye(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function ke(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function Hn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(ke.bind(null, n)))
      return b(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(ke.bind(null, n)))
      return b(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Kn(e, t) {
  t && t.record.name && !e.name && !e.path && b(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function qn(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(ke.bind(null, n)))
      return b(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function yt(e, t) {
  return t.children.some((n) => n === e || yt(e, n));
}
function Wn(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < o.length; ++s) {
    const u = o[s].replace(ft, " "), l = u.indexOf("="), d = Y(l < 0 ? u : u.slice(0, l)), f = l < 0 ? null : Y(u.slice(l + 1));
    if (d in t) {
      let h = t[d];
      T(h) || (h = t[d] = [h]), h.push(f);
    } else
      t[d] = f;
  }
  return t;
}
function Je(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = cn(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (T(o) ? o.map((u) => u && be(u)) : [o && be(o)]).forEach((u) => {
      u !== void 0 && (t += (t.length ? "&" : "") + n, u != null && (t += "=" + u));
    });
  }
  return t;
}
function zn(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = T(o) ? o.map((s) => s == null ? null : "" + s) : o == null ? o : "" + o);
  }
  return t;
}
const Qn = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), Xe = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Ae = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), xe = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), Ne = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function ee() {
  let e = [];
  function t(o) {
    return e.push(o), () => {
      const s = e.indexOf(o);
      s > -1 && e.splice(s, 1);
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
function L(e, t, n, o, s, u = (l) => l()) {
  const l = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[s] = o.enterCallbacks[s] || []);
  return () => new Promise((d, f) => {
    const h = (a) => {
      a === !1 ? f(J(4, {
        from: n,
        to: t
      })) : a instanceof Error ? f(a) : ce(a) ? f(J(2, {
        from: t,
        to: a
      })) : (l && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[s] === l && typeof a == "function" && l.push(a), d());
    }, r = u(() => e.call(o && o.instances[s], t, n, process.env.NODE_ENV !== "production" ? Fn(h, t, n) : h));
    let c = Promise.resolve(r);
    if (e.length < 3 && (c = c.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof r == "object" && "then" in r)
        c = c.then((p) => h._called ? p : (b(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (r !== void 0 && !h._called) {
        b(a), f(new Error("Invalid navigation guard"));
        return;
      }
    }
    c.catch((a) => f(a));
  });
}
function Fn(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && b(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Ee(e, t, n, o, s = (u) => u()) {
  const u = [];
  for (const l of e) {
    process.env.NODE_ENV !== "production" && !l.components && !l.children.length && b(`Record with path "${l.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in l.components) {
      let f = l.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!f || typeof f != "object" && typeof f != "function")
          throw b(`Component "${d}" in record with path "${l.path}" is not a valid component. Received "${String(f)}".`), new Error("Invalid route component");
        if ("then" in f) {
          b(`Component "${d}" in record with path "${l.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = f;
          f = () => h;
        } else
          f.__asyncLoader && // warn only once per component
          !f.__warnedDefineAsync && (f.__warnedDefineAsync = !0, b(`Component "${d}" in record with path "${l.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !l.instances[d]))
        if (Yn(f)) {
          const r = (f.__vccOpts || f)[t];
          r && u.push(L(r, n, o, l, d, s));
        } else {
          let h = f();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (b(`Component "${d}" in record with path "${l.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), u.push(() => h.then((r) => {
            if (!r)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${l.path}"`));
            const c = Yt(r) ? r.default : r;
            l.components[d] = c;
            const p = (c.__vccOpts || c)[t];
            return p && L(p, n, o, l, d, s)();
          }));
        }
    }
  }
  return u;
}
function Yn(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function Ze(e) {
  const t = F(Ae), n = F(xe);
  let o = !1, s = null;
  const u = I(() => {
    const r = Q(e.to);
    return process.env.NODE_ENV !== "production" && (!o || r !== s) && (ce(r) || (o ? b(`Invalid value for prop "to" in useLink()
- to:`, r, `
- previous to:`, s, `
- props:`, e) : b(`Invalid value for prop "to" in useLink()
- to:`, r, `
- props:`, e)), s = r, o = !0), t.resolve(r);
  }), l = I(() => {
    const { matched: r } = u.value, { length: c } = r, a = r[c - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const y = p.findIndex(U.bind(null, a));
    if (y > -1)
      return y;
    const P = et(r[c - 2]);
    return (
      // we are dealing with nested routes
      c > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      et(a) === P && // avoid comparing the child with its parent
      p[p.length - 1].path !== P ? p.findIndex(U.bind(null, r[c - 2])) : y
    );
  }), d = I(() => l.value > -1 && eo(n.params, u.value.params)), f = I(() => l.value > -1 && l.value === n.matched.length - 1 && mt(n.params, u.value.params));
  function h(r = {}) {
    return Zn(r) ? t[Q(e.replace) ? "replace" : "push"](
      Q(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ne) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && j) {
    const r = it();
    if (r) {
      const c = {
        route: u.value,
        isActive: d.value,
        isExactActive: f.value,
        error: null
      };
      r.__vrl_devtools = r.__vrl_devtools || [], r.__vrl_devtools.push(c), It(() => {
        c.route = u.value, c.isActive = d.value, c.isExactActive = f.value, c.error = ce(Q(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: u,
    href: I(() => u.value.href),
    isActive: d,
    isExactActive: f,
    navigate: h
  };
}
const Jn = /* @__PURE__ */ le({
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
  useLink: Ze,
  setup(e, { slots: t }) {
    const n = Tt(Ze(e)), { options: o } = F(Ae), s = I(() => ({
      [tt(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [tt(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const u = t.default && t.default(n);
      return e.custom ? u : rt("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: s.value
      }, u);
    };
  }
}), Xn = Jn;
function Zn(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function eo(e, t) {
  for (const n in t) {
    const o = t[n], s = e[n];
    if (typeof o == "string") {
      if (o !== s)
        return !1;
    } else if (!T(s) || s.length !== o.length || o.some((u, l) => u !== s[l]))
      return !1;
  }
  return !0;
}
function et(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const tt = (e, t, n) => e ?? t ?? n, to = /* @__PURE__ */ le({
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
    process.env.NODE_ENV !== "production" && oo();
    const o = F(Ne), s = I(() => e.route || o.value), u = F(Xe, 0), l = I(() => {
      let h = Q(u);
      const { matched: r } = s.value;
      let c;
      for (; (c = r[h]) && !c.components; )
        h++;
      return h;
    }), d = I(() => s.value.matched[l.value]);
    ve(Xe, I(() => l.value + 1)), ve(Qn, d), ve(Ne, s);
    const f = st();
    return Ce(() => [f.value, d.value, e.name], ([h, r, c], [a, p, y]) => {
      r && (r.instances[c] = h, p && p !== r && h && h === a && (r.leaveGuards.size || (r.leaveGuards = p.leaveGuards), r.updateGuards.size || (r.updateGuards = p.updateGuards))), h && r && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !U(r, p) || !a) && (r.enterCallbacks[c] || []).forEach((P) => P(h));
    }, { flush: "post" }), () => {
      const h = s.value, r = e.name, c = d.value, a = c && c.components[r];
      if (!a)
        return nt(n.default, { Component: a, route: h });
      const p = c.props[r], y = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, N = rt(a, k({}, y, t, {
        onVnodeUnmounted: (_) => {
          _.component.isUnmounted && (c.instances[r] = null);
        },
        ref: f
      }));
      if (process.env.NODE_ENV !== "production" && j && N.ref) {
        const _ = {
          depth: l.value,
          name: c.name,
          path: c.path,
          meta: c.meta
        };
        (T(N.ref) ? N.ref.map((C) => C.i) : [N.ref.i]).forEach((C) => {
          C.__vrv_devtools = _;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        nt(n.default, { Component: N, route: h }) || N
      );
    };
  }
});
function nt(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const no = to;
function oo() {
  const e = it(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
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
function te(e, t) {
  const n = k({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => mo(o, ["instances", "children", "aliasOf"]))
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
function ae(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let ro = 0;
function so(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = ro++;
  Ft({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (s) => {
    typeof s.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), s.on.inspectComponent((r, c) => {
      r.instanceData && r.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: te(t.currentRoute.value, "Current Route")
      });
    }), s.on.visitComponentTree(({ treeNode: r, componentInstance: c }) => {
      if (c.__vrv_devtools) {
        const a = c.__vrv_devtools;
        r.tags.push({
          label: (a.name ? `${a.name.toString()}: ` : "") + a.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: _t
        });
      }
      T(c.__vrl_devtools) && (c.__devtoolsApi = s, c.__vrl_devtools.forEach((a) => {
        let p = a.route.path, y = bt, P = "", N = 0;
        a.error ? (p = a.error, y = uo, N = fo) : a.isExactActive ? (y = wt, P = "This is exactly active") : a.isActive && (y = Et, P = "This link is active"), r.tags.push({
          label: p,
          textColor: N,
          tooltip: P,
          backgroundColor: y
        });
      }));
    }), Ce(t.currentRoute, () => {
      f(), s.notifyComponentUpdate(), s.sendInspectorTree(d), s.sendInspectorState(d);
    });
    const u = "router:navigations:" + o;
    s.addTimelineLayer({
      id: u,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((r, c) => {
      s.addTimelineEvent({
        layerId: u,
        event: {
          title: "Error during Navigation",
          subtitle: c.fullPath,
          logType: "error",
          time: s.now(),
          data: { error: r },
          groupId: c.meta.__navigationId
        }
      });
    });
    let l = 0;
    t.beforeEach((r, c) => {
      const a = {
        guard: ae("beforeEach"),
        from: te(c, "Current Location during this navigation"),
        to: te(r, "Target location")
      };
      Object.defineProperty(r.meta, "__navigationId", {
        value: l++
      }), s.addTimelineEvent({
        layerId: u,
        event: {
          time: s.now(),
          title: "Start of navigation",
          subtitle: r.fullPath,
          data: a,
          groupId: r.meta.__navigationId
        }
      });
    }), t.afterEach((r, c, a) => {
      const p = {
        guard: ae("afterEach")
      };
      a ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: a ? a.message : "",
          tooltip: "Navigation Failure",
          value: a
        }
      }, p.status = ae("❌")) : p.status = ae("✅"), p.from = te(c, "Current Location during this navigation"), p.to = te(r, "Target location"), s.addTimelineEvent({
        layerId: u,
        event: {
          title: "End of navigation",
          subtitle: r.fullPath,
          time: s.now(),
          data: p,
          logType: a ? "warning" : "default",
          groupId: r.meta.__navigationId
        }
      });
    });
    const d = "router-inspector:" + o;
    s.addInspector({
      id: d,
      label: "Routes" + (o ? " " + o : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function f() {
      if (!h)
        return;
      const r = h;
      let c = n.getRoutes().filter((a) => !a.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !a.parent.record.components);
      c.forEach(kt), r.filter && (c = c.filter((a) => (
        // save matches state based on the payload
        Pe(a, r.filter.toLowerCase())
      ))), c.forEach((a) => St(a, t.currentRoute.value)), r.rootNodes = c.map(Rt);
    }
    let h;
    s.on.getInspectorTree((r) => {
      h = r, r.app === e && r.inspectorId === d && f();
    }), s.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === d) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === r.nodeId);
        a && (r.state = {
          options: ao(a)
        });
      }
    }), s.sendInspectorTree(d), s.sendInspectorState(d);
  });
}
function io(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function ao(e) {
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
        display: e.keys.map((o) => `${o.name}${io(o)}`).join(" "),
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
const _t = 15485081, Et = 2450411, wt = 8702998, co = 2282478, bt = 16486972, lo = 6710886, uo = 16704226, fo = 12131356;
function Rt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: co
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: bt
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: _t
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: wt
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: Et
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: lo
  });
  let o = n.__vd_id;
  return o == null && (o = String(ho++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Rt)
  };
}
let ho = 0;
const po = /^\/(.*)\/([a-z]*)$/;
function St(e, t) {
  const n = t.matched.length && U(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => U(o, e.record))), e.children.forEach((o) => St(o, t));
}
function kt(e) {
  e.__vd_match = !1, e.children.forEach(kt);
}
function Pe(e, t) {
  const n = String(e.re).match(po);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((l) => Pe(l, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const s = e.record.path.toLowerCase(), u = Y(s);
  return !t.startsWith("/") && (u.includes(t) || s.includes(t)) || u.startsWith(t) || s.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((l) => Pe(l, t));
}
function mo(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function go(e) {
  const t = Ln(e.routes, e), n = e.parseQuery || Wn, o = e.stringifyQuery || Je, s = e.history;
  if (process.env.NODE_ENV !== "production" && !s)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const u = ee(), l = ee(), d = ee(), f = $t(M);
  let h = M;
  j && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const r = ye.bind(null, (i) => "" + i), c = ye.bind(null, un), a = (
    // @ts-expect-error: intentionally avoid the type check
    ye.bind(null, Y)
  );
  function p(i, g) {
    let m, v;
    return vt(i) ? (m = t.getRecordMatcher(i), process.env.NODE_ENV !== "production" && !m && b(`Parent route "${String(i)}" not found when adding child route`, g), v = g) : v = i, t.addRoute(v, m);
  }
  function y(i) {
    const g = t.getRecordMatcher(i);
    g ? t.removeRoute(g) : process.env.NODE_ENV !== "production" && b(`Cannot remove non-existent route "${String(i)}"`);
  }
  function P() {
    return t.getRoutes().map((i) => i.record);
  }
  function N(i) {
    return !!t.getRecordMatcher(i);
  }
  function _(i, g) {
    if (g = k({}, g || f.value), typeof i == "string") {
      const w = _e(n, i, g.path), O = t.resolve({ path: w.path }, g), G = s.createHref(w.fullPath);
      return process.env.NODE_ENV !== "production" && (G.startsWith("//") ? b(`Location "${i}" resolved to "${G}". A resolved location cannot start with multiple slashes.`) : O.matched.length || b(`No match found for location with path "${i}"`)), k(w, O, {
        params: a(O.params),
        hash: Y(w.hash),
        redirectedFrom: void 0,
        href: G
      });
    }
    process.env.NODE_ENV !== "production" && !ce(i) && (b(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, i), i = {});
    let m;
    if (i.path != null)
      process.env.NODE_ENV !== "production" && "params" in i && !("name" in i) && // @ts-expect-error: the type is never
      Object.keys(i.params).length && b(`Path "${i.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), m = k({}, i, {
        path: _e(n, i.path, g.path).path
      });
    else {
      const w = k({}, i.params);
      for (const O in w)
        w[O] == null && delete w[O];
      m = k({}, i, {
        params: c(w)
      }), g.params = c(g.params);
    }
    const v = t.resolve(m, g), S = i.hash || "";
    process.env.NODE_ENV !== "production" && S && !S.startsWith("#") && b(`A \`hash\` should always start with the character "#". Replace "${S}" with "#${S}".`), v.params = r(a(v.params));
    const $ = hn(o, k({}, i, {
      hash: an(S),
      path: v.path
    })), R = s.createHref($);
    return process.env.NODE_ENV !== "production" && (R.startsWith("//") ? b(`Location "${i}" resolved to "${R}". A resolved location cannot start with multiple slashes.`) : v.matched.length || b(`No match found for location with path "${i.path != null ? i.path : i}"`)), k({
      fullPath: $,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: S,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === Je ? zn(i.query) : i.query || {}
      )
    }, v, {
      redirectedFrom: void 0,
      href: R
    });
  }
  function E(i) {
    return typeof i == "string" ? _e(n, i, f.value.path) : k({}, i);
  }
  function C(i, g) {
    if (h !== i)
      return J(8, {
        from: g,
        to: i
      });
  }
  function x(i) {
    return X(i);
  }
  function B(i) {
    return x(k(E(i), { replace: !0 }));
  }
  function D(i) {
    const g = i.matched[i.matched.length - 1];
    if (g && g.redirect) {
      const { redirect: m } = g;
      let v = typeof m == "function" ? m(i) : m;
      if (typeof v == "string" && (v = v.includes("?") || v.includes("#") ? v = E(v) : (
        // force empty params
        { path: v }
      ), v.params = {}), process.env.NODE_ENV !== "production" && v.path == null && !("name" in v))
        throw b(`Invalid redirect found:
${JSON.stringify(v, null, 2)}
 when navigating to "${i.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return k({
        query: i.query,
        hash: i.hash,
        // avoid transferring params if the redirect has a path
        params: v.path != null ? {} : i.params
      }, v);
    }
  }
  function X(i, g) {
    const m = h = _(i), v = f.value, S = i.state, $ = i.force, R = i.replace === !0, w = D(m);
    if (w)
      return X(
        k(E(w), {
          state: typeof w == "object" ? k({}, S, w.state) : S,
          force: $,
          replace: R
        }),
        // keep original redirectedFrom if it exists
        g || m
      );
    const O = m;
    O.redirectedFrom = g;
    let G;
    return !$ && Be(o, v, m) && (G = J(16, { to: O, from: v }), je(
      v,
      v,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (G ? Promise.resolve(G) : Te(O, v)).catch((A) => V(A) ? (
      // navigation redirects still mark the router as ready
      V(
        A,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? A : pe(A)
    ) : (
      // reject any unknown error
      he(A, O, v)
    )).then((A) => {
      if (A) {
        if (V(
          A,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          Be(o, _(A.to), O) && // and we have done it a couple of times
          g && // @ts-expect-error: added only in dev
          (g._count = g._count ? (
            // @ts-expect-error
            g._count + 1
          ) : 1) > 30 ? (b(`Detected a possibly infinite redirection in a navigation guard when going from "${v.fullPath}" to "${O.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : X(
            // keep options
            k({
              // preserve an existing replacement but allow the redirect to override it
              replace: R
            }, E(A.to), {
              state: typeof A.to == "object" ? k({}, S, A.to.state) : S,
              force: $
            }),
            // preserve the original redirectedFrom if any
            g || O
          );
      } else
        A = De(O, v, !0, R, S);
      return Ie(O, v, A), A;
    });
  }
  function Nt(i, g) {
    const m = C(i, g);
    return m ? Promise.reject(m) : Promise.resolve();
  }
  function fe(i) {
    const g = ie.values().next().value;
    return g && typeof g.runWithContext == "function" ? g.runWithContext(i) : i();
  }
  function Te(i, g) {
    let m;
    const [v, S, $] = vo(i, g);
    m = Ee(v.reverse(), "beforeRouteLeave", i, g);
    for (const w of v)
      w.leaveGuards.forEach((O) => {
        m.push(L(O, i, g));
      });
    const R = Nt.bind(null, i, g);
    return m.push(R), K(m).then(() => {
      m = [];
      for (const w of u.list())
        m.push(L(w, i, g));
      return m.push(R), K(m);
    }).then(() => {
      m = Ee(S, "beforeRouteUpdate", i, g);
      for (const w of S)
        w.updateGuards.forEach((O) => {
          m.push(L(O, i, g));
        });
      return m.push(R), K(m);
    }).then(() => {
      m = [];
      for (const w of $)
        if (w.beforeEnter)
          if (T(w.beforeEnter))
            for (const O of w.beforeEnter)
              m.push(L(O, i, g));
          else
            m.push(L(w.beforeEnter, i, g));
      return m.push(R), K(m);
    }).then(() => (i.matched.forEach((w) => w.enterCallbacks = {}), m = Ee($, "beforeRouteEnter", i, g, fe), m.push(R), K(m))).then(() => {
      m = [];
      for (const w of l.list())
        m.push(L(w, i, g));
      return m.push(R), K(m);
    }).catch((w) => V(
      w,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? w : Promise.reject(w));
  }
  function Ie(i, g, m) {
    d.list().forEach((v) => fe(() => v(i, g, m)));
  }
  function De(i, g, m, v, S) {
    const $ = C(i, g);
    if ($)
      return $;
    const R = g === M, w = j ? history.state : {};
    m && (v || R ? s.replace(i.fullPath, k({
      scroll: R && w && w.scroll
    }, S)) : s.push(i.fullPath, S)), f.value = i, je(i, g, m, R), pe();
  }
  let Z;
  function Pt() {
    Z || (Z = s.listen((i, g, m) => {
      const v = _(i), S = D(v);
      if (S) {
        X(k(S, { replace: !0 }), v).catch(ne);
        return;
      }
      h = v;
      const $ = f.value;
      j && wn(He($.fullPath, m.delta), ue()), Te(v, $).catch((R) => V(
        R,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? R : V(
        R,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (X(
        R.to,
        v
        // avoid an uncaught rejection, let push call triggerError
      ).then((w) => {
        V(
          w,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !m.delta && m.type === re.pop && s.go(-1, !1);
      }).catch(ne), Promise.reject()) : (m.delta && s.go(-m.delta, !1), he(R, v, $))).then((R) => {
        R = R || De(
          // after navigation, all matched components are resolved
          v,
          $,
          !1
        ), R && (m.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !V(
          R,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? s.go(-m.delta, !1) : m.type === re.pop && V(
          R,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && s.go(-1, !1)), Ie(v, $, R);
      }).catch(ne);
    }));
  }
  let de = ee(), Ve = ee(), se;
  function he(i, g, m) {
    pe(i);
    const v = Ve.list();
    return v.length ? v.forEach((S) => S(i, g, m)) : (process.env.NODE_ENV !== "production" && b("uncaught error during route navigation:"), console.error(i)), Promise.reject(i);
  }
  function Ot() {
    return se && f.value !== M ? Promise.resolve() : new Promise((i, g) => {
      de.add([i, g]);
    });
  }
  function pe(i) {
    return se || (se = !i, Pt(), de.list().forEach(([g, m]) => i ? m(i) : g()), de.reset()), i;
  }
  function je(i, g, m, v) {
    const { scrollBehavior: S } = e;
    if (!j || !S)
      return Promise.resolve();
    const $ = !m && bn(He(i.fullPath, 0)) || (v || !m) && history.state && history.state.scroll || null;
    return xt().then(() => S(i, g, $)).then((R) => R && En(R)).catch((R) => he(R, i, g));
  }
  const me = (i) => s.go(i);
  let ge;
  const ie = /* @__PURE__ */ new Set(), Ct = {
    currentRoute: f,
    listening: !0,
    addRoute: p,
    removeRoute: y,
    hasRoute: N,
    getRoutes: P,
    resolve: _,
    options: e,
    push: x,
    replace: B,
    go: me,
    back: () => me(-1),
    forward: () => me(1),
    beforeEach: u.add,
    beforeResolve: l.add,
    afterEach: d.add,
    onError: Ve.add,
    isReady: Ot,
    install(i) {
      const g = this;
      i.component("RouterLink", Xn), i.component("RouterView", no), i.config.globalProperties.$router = g, Object.defineProperty(i.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Q(f)
      }), j && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !ge && f.value === M && (ge = !0, x(s.location).catch((S) => {
        process.env.NODE_ENV !== "production" && b("Unexpected error when starting the router:", S);
      }));
      const m = {};
      for (const S in M)
        Object.defineProperty(m, S, {
          get: () => f.value[S],
          enumerable: !0
        });
      i.provide(Ae, g), i.provide(xe, At(m)), i.provide(Ne, f);
      const v = i.unmount;
      ie.add(i), i.unmount = function() {
        ie.delete(i), ie.size < 1 && (h = M, Z && Z(), Z = null, f.value = M, ge = !1, se = !1), v();
      }, process.env.NODE_ENV !== "production" && j && so(i, g, t);
    }
  };
  function K(i) {
    return i.reduce((g, m) => g.then(() => fe(m)), Promise.resolve());
  }
  return Ct;
}
function vo(e, t) {
  const n = [], o = [], s = [], u = Math.max(t.matched.length, e.matched.length);
  for (let l = 0; l < u; l++) {
    const d = t.matched[l];
    d && (e.matched.find((h) => U(h, d)) ? o.push(d) : n.push(d));
    const f = e.matched[l];
    f && (t.matched.find((h) => U(h, f)) || s.push(f));
  }
  return [n, o, s];
}
function yo() {
  return F(xe);
}
const _o = async (e) => {
  try {
    const t = await fetch(
      `https://pokeapi.co/api/v2/type/${e.toString()}`
    );
    if (!t.ok)
      throw new Error(`HTTP error! status: ${t.status}`);
    return [(await t.json()).name];
  } catch (t) {
    return console.log(t), [];
  }
}, Eo = (e) => (jt("data-v-9b1a372d"), e = e(), Mt(), e), wo = { class: "search-results-container" }, bo = /* @__PURE__ */ Eo(() => /* @__PURE__ */ H("h2", null, "Search Results", -1)), Ro = {
  key: 0,
  class: "results"
}, So = {
  key: 1,
  class: "no-results"
}, ko = /* @__PURE__ */ le({
  __name: "DisplayResult",
  setup(e) {
    const t = yo(), n = st([]), o = async () => {
      var u;
      const s = ((u = t.query) == null ? void 0 : u.tag) || "1";
      if (console.log("Fetching data for tag:", s), s) {
        const l = await _o(s);
        n.value = l, console.log("Search results:", l);
      } else
        n.value = [];
    };
    return at(o), Ce(
      () => t.query.tag,
      (s, u) => {
        s !== u && o();
      }
    ), (s, u) => (W(), z("div", wo, [
      bo,
      n.value.length ? (W(), z("div", Ro, [
        H("ul", null, [
          (W(!0), z(ct, null, Dt(n.value, (l, d) => (W(), z("li", { key: d }, Vt(l), 1))), 128))
        ])
      ])) : (W(), z("p", So, "No results found"))
    ]));
  }
}), No = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, Oe = /* @__PURE__ */ No(ko, [["__scopeId", "data-v-9b1a372d"]]), Po = [
  // { path: "/", component: CrucibleSearch },
  { path: "/result-tag-search", component: Oe }
], ot = go({
  history: Nn(),
  routes: Po
}), Oo = { class: "search-container" }, Co = /* @__PURE__ */ H("h1", null, "Crucible Resource Search", -1), $o = { class: "search-box" }, Ao = /* @__PURE__ */ H("p", null, "Try it - enter a Pokémon type (number):", -1), xo = /* @__PURE__ */ le({
  __name: "CrucibleSearch",
  setup(e) {
    at(() => {
      console.log("CrucibleSearch mounted");
    });
    const t = (n) => {
      console.log("0", n), ot.push({ path: "/result-tag-search", query: { tag: n || "1" } }), console.log("2", n, ot);
    };
    return (n, o) => {
      const s = Me("RouterLink"), u = Me("RouterView");
      return W(), z(ct, null, [
        H("div", Oo, [
          Co,
          H("div", $o, [
            Ao,
            H("input", {
              type: "text",
              placeholder: "Enter a Tag",
              onKeyup: o[0] || (o[0] = Lt((l) => t(l.target.value), ["enter"]))
            }, null, 32)
          ])
        ]),
        Le(s, { to: "/result-tag-search" }, {
          default: Ut(() => [
            Bt("Results")
          ]),
          _: 1
        }),
        Le(u)
      ], 64);
    };
  }
});
function Io(e, t) {
  console.log("Creating Search Plugin");
  const { router: n } = t;
  e.component("CrucibleSearch", xo), e.component("DisplayResult", Oe), n.addRoute({ path: "/result-tag-search", component: Oe }), console.log("Router", n);
}
export {
  xo as CrucibleSearch,
  Oe as DisplayResult,
  Io as createSearchPlugin
};
