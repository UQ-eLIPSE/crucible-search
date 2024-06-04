import { shallowRef as Dt, unref as Y, shallowReactive as It, nextTick as Vt, defineComponent as fe, reactive as jt, inject as z, computed as V, h as ct, provide as _e, ref as W, watch as Te, getCurrentInstance as lt, watchEffect as Lt, onMounted as ut, openBlock as D, createElementBlock as I, createElementVNode as K, toDisplayString as le, Fragment as Re, renderList as ke, resolveComponent as He, createVNode as Ge, onUnmounted as Mt, withDirectives as Ut, vModelText as Bt, createCommentVNode as qt } from "vue";
function Ht() {
  return ft().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function ft() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Gt = typeof Proxy == "function", Kt = "devtools-plugin:setup", Wt = "plugin:settings:set";
let F, Se;
function zt() {
  var e;
  return F !== void 0 || (typeof window < "u" && window.performance ? (F = !0, Se = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (F = !0, Se = globalThis.perf_hooks.performance) : F = !1), F;
}
function Qt() {
  return zt() ? Se.now() : Date.now();
}
class Ft {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const l in t.settings) {
        const d = t.settings[l];
        o[l] = d.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${t.id}`;
    let f = Object.assign({}, o);
    try {
      const l = localStorage.getItem(s), d = JSON.parse(l);
      Object.assign(f, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return f;
      },
      setSettings(l) {
        try {
          localStorage.setItem(s, JSON.stringify(l));
        } catch {
        }
        f = l;
      },
      now() {
        return Qt();
      }
    }, n && n.on(Wt, (l, d) => {
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
function Yt(e, t) {
  const n = e, o = ft(), s = Ht(), f = Gt && n.enableEarlyProxy;
  if (s && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !f))
    s.emit(Kt, e, t);
  else {
    const l = f ? new Ft(n, s) : null;
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
const M = typeof document < "u";
function Jt(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const S = Object.assign;
function Ee(e, t) {
  const n = {};
  for (const o in t) {
    const s = t[o];
    n[o] = T(s) ? s.map(e) : e(s);
  }
  return n;
}
const oe = () => {
}, T = Array.isArray;
function w(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const dt = /#/g, Xt = /&/g, Zt = /\//g, en = /=/g, tn = /\?/g, ht = /\+/g, nn = /%5B/g, on = /%5D/g, pt = /%5E/g, rn = /%60/g, mt = /%7B/g, sn = /%7C/g, gt = /%7D/g, an = /%20/g;
function De(e) {
  return encodeURI("" + e).replace(sn, "|").replace(nn, "[").replace(on, "]");
}
function cn(e) {
  return De(e).replace(mt, "{").replace(gt, "}").replace(pt, "^");
}
function Pe(e) {
  return De(e).replace(ht, "%2B").replace(an, "+").replace(dt, "%23").replace(Xt, "%26").replace(rn, "`").replace(mt, "{").replace(gt, "}").replace(pt, "^");
}
function ln(e) {
  return Pe(e).replace(en, "%3D");
}
function un(e) {
  return De(e).replace(dt, "%23").replace(tn, "%3F");
}
function fn(e) {
  return e == null ? "" : un(e).replace(Zt, "%2F");
}
function J(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && w(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const dn = /\/$/, hn = (e) => e.replace(dn, "");
function be(e, t, n = "/") {
  let o, s = {}, f = "", l = "";
  const d = t.indexOf("#");
  let u = t.indexOf("?");
  return d < u && d >= 0 && (u = -1), u > -1 && (o = t.slice(0, u), f = t.slice(u + 1, d > -1 ? d : t.length), s = e(f)), d > -1 && (o = o || t.slice(0, d), l = t.slice(d, t.length)), o = gn(o ?? t, n), {
    fullPath: o + (f && "?") + f + l,
    path: o,
    query: s,
    hash: J(l)
  };
}
function pn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Ke(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function We(e, t, n) {
  const o = t.matched.length - 1, s = n.matched.length - 1;
  return o > -1 && o === s && q(t.matched[o], n.matched[s]) && vt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function q(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function vt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!mn(e[n], t[n]))
      return !1;
  return !0;
}
function mn(e, t) {
  return T(e) ? ze(e, t) : T(t) ? ze(t, e) : e === t;
}
function ze(e, t) {
  return T(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function gn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return w(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), s = o[o.length - 1];
  (s === ".." || s === ".") && o.push("");
  let f = n.length - 1, l, d;
  for (l = 0; l < o.length; l++)
    if (d = o[l], d !== ".")
      if (d === "..")
        f > 1 && f--;
      else
        break;
  return n.slice(0, f).join("/") + "/" + o.slice(l).join("/");
}
var se;
(function(e) {
  e.pop = "pop", e.push = "push";
})(se || (se = {}));
var re;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(re || (re = {}));
function vn(e) {
  if (!e)
    if (M) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), hn(e);
}
const yn = /^[^#]+#/;
function _n(e, t) {
  return e.replace(yn, "#") + t;
}
function En(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const de = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function bn(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const f = document.querySelector(e.el);
        if (o && f) {
          w(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        w(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const s = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!s) {
      process.env.NODE_ENV !== "production" && w(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = En(s, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Qe(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ne = /* @__PURE__ */ new Map();
function wn(e, t) {
  Ne.set(e, t);
}
function Rn(e) {
  const t = Ne.get(e);
  return Ne.delete(e), t;
}
let kn = () => location.protocol + "//" + location.host;
function yt(e, t) {
  const { pathname: n, search: o, hash: s } = t, f = e.indexOf("#");
  if (f > -1) {
    let d = s.includes(e.slice(f)) ? e.slice(f).length : 1, u = s.slice(d);
    return u[0] !== "/" && (u = "/" + u), Ke(u, "");
  }
  return Ke(n, e) + o + s;
}
function Sn(e, t, n, o) {
  let s = [], f = [], l = null;
  const d = ({ state: a }) => {
    const p = yt(e, location), y = n.value, N = t.value;
    let P = 0;
    if (a) {
      if (n.value = p, t.value = a, l && l === y) {
        l = null;
        return;
      }
      P = N ? a.position - N.position : 0;
    } else
      o(p);
    s.forEach((_) => {
      _(n.value, y, {
        delta: P,
        type: se.pop,
        direction: P ? P > 0 ? re.forward : re.back : re.unknown
      });
    });
  };
  function u() {
    l = n.value;
  }
  function h(a) {
    s.push(a);
    const p = () => {
      const y = s.indexOf(a);
      y > -1 && s.splice(y, 1);
    };
    return f.push(p), p;
  }
  function r() {
    const { history: a } = window;
    a.state && a.replaceState(S({}, a.state, { scroll: de() }), "");
  }
  function c() {
    for (const a of f)
      a();
    f = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", r);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", r, {
    passive: !0
  }), {
    pauseListeners: u,
    listen: h,
    destroy: l
  };
}
function Fe(e, t, n, o = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: s ? de() : null
  };
}
function Pn(e) {
  const { history: t, location: n } = window, o = {
    value: yt(e, n)
  }, s = { value: t.state };
  s.value || f(o.value, {
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
  function f(u, h, r) {
    const c = e.indexOf("#"), a = c > -1 ? (n.host && document.querySelector("base") ? e : e.slice(c)) + u : kn() + e + u;
    try {
      t[r ? "replaceState" : "pushState"](h, "", a), s.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? w("Error with push/replace State", p) : console.error(p), n[r ? "replace" : "assign"](a);
    }
  }
  function l(u, h) {
    const r = S({}, t.state, Fe(
      s.value.back,
      // keep back and forward entries but override current position
      u,
      s.value.forward,
      !0
    ), h, { position: s.value.position });
    f(u, r, !0), o.value = u;
  }
  function d(u, h) {
    const r = S(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      s.value,
      t.state,
      {
        forward: u,
        scroll: de()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && w(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), f(r.current, r, !0);
    const c = S({}, Fe(o.value, u, null), { position: r.position + 1 }, h);
    f(u, c, !1), o.value = u;
  }
  return {
    location: o,
    state: s,
    push: d,
    replace: l
  };
}
function Nn(e) {
  e = vn(e);
  const t = Pn(e), n = Sn(e, t.state, t.location, t.replace);
  function o(f, l = !0) {
    l || n.pauseListeners(), history.go(f);
  }
  const s = S({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: _n.bind(null, e)
  }, t, n);
  return Object.defineProperty(s, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(s, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), s;
}
function ue(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function _t(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const U = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, Oe = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var Ye;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Ye || (Ye = {}));
const On = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${$n(t)}" via a navigation guard.`;
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
function X(e, t) {
  return process.env.NODE_ENV !== "production" ? S(new Error(On[e](t)), {
    type: e,
    [Oe]: !0
  }, t) : S(new Error(), {
    type: e,
    [Oe]: !0
  }, t);
}
function L(e, t) {
  return e instanceof Error && Oe in e && (t == null || !!(e.type & t));
}
const Cn = ["params", "query", "hash"];
function $n(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of Cn)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Je = "[^/]+?", An = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, xn = /[.+*?^${}()[\]/\\]/g;
function Tn(e, t) {
  const n = S({}, An, t), o = [];
  let s = n.start ? "^" : "";
  const f = [];
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
        c || (s += "/"), s += a.value.replace(xn, "\\$&"), p += 40;
      else if (a.type === 1) {
        const { value: y, repeatable: N, optional: P, regexp: _ } = a;
        f.push({
          name: y,
          repeatable: N,
          optional: P
        });
        const E = _ || Je;
        if (E !== Je) {
          p += 10;
          try {
            new RegExp(`(${E})`);
          } catch (x) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${E}): ` + x.message);
          }
        }
        let C = N ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        l || (C = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        P && h.length < 2 ? `(?:/${C})` : "/" + C), P && (C += "?"), s += C, p += 20, P && (p += -8), N && (p += -20), E === ".*" && (p += -50);
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
      const p = r[a] || "", y = f[a - 1];
      c[y.name] = p && y.repeatable ? p.split("/") : p;
    }
    return l;
  }
  function u(h) {
    let r = "", c = !1;
    for (const a of e) {
      (!c || !r.endsWith("/")) && (r += "/"), c = !1;
      for (const p of a)
        if (p.type === 0)
          r += p.value;
        else if (p.type === 1) {
          const { value: y, repeatable: N, optional: P } = p, _ = y in h ? h[y] : "";
          if (T(_) && !N)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const E = T(_) ? _.join("/") : _;
          if (!E)
            if (P)
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
    keys: f,
    parse: d,
    stringify: u
  };
}
function Dn(e, t) {
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
    const f = Dn(o[n], s[n]);
    if (f)
      return f;
    n++;
  }
  if (Math.abs(s.length - o.length) === 1) {
    if (Xe(o))
      return 1;
    if (Xe(s))
      return -1;
  }
  return s.length - o.length;
}
function Xe(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Vn = {
  type: 0,
  value: ""
}, jn = /[a-zA-Z0-9_]/;
function Ln(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Vn]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${h}": ${p}`);
  }
  let n = 0, o = n;
  const s = [];
  let f;
  function l() {
    f && s.push(f), f = [];
  }
  let d = 0, u, h = "", r = "";
  function c() {
    h && (n === 0 ? f.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (f.length > 1 && (u === "*" || u === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), f.push({
      type: 1,
      value: h,
      regexp: r,
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
        u === "/" ? (h && c(), l()) : u === ":" ? (c(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        u === "(" ? n = 2 : jn.test(u) ? a() : (c(), n = 0, u !== "*" && u !== "?" && u !== "+" && d--);
        break;
      case 2:
        u === ")" ? r[r.length - 1] == "\\" ? r = r.slice(0, -1) + u : n = 3 : r += u;
        break;
      case 3:
        c(), n = 0, u !== "*" && u !== "?" && u !== "+" && d--, r = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), c(), l(), s;
}
function Mn(e, t, n) {
  const o = Tn(Ln(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const f = /* @__PURE__ */ new Set();
    for (const l of o.keys)
      f.has(l.name) && w(`Found duplicated params with name "${l.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), f.add(l.name);
  }
  const s = S(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function Un(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = tt({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(r) {
    return o.get(r);
  }
  function f(r, c, a) {
    const p = !a, y = Bn(r);
    process.env.NODE_ENV !== "production" && Kn(y, c), y.aliasOf = a && a.record;
    const N = tt(t, r), P = [
      y
    ];
    if ("alias" in r) {
      const C = typeof r.alias == "string" ? [r.alias] : r.alias;
      for (const x of C)
        P.push(S({}, y, {
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
    for (const C of P) {
      const { path: x } = C;
      if (c && x[0] !== "/") {
        const H = c.record.path, j = H[H.length - 1] === "/" ? "" : "/";
        C.path = c.record.path + (x && j + x);
      }
      if (process.env.NODE_ENV !== "production" && C.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (_ = Mn(C, c, N), process.env.NODE_ENV !== "production" && c && x[0] === "/" && Wn(_, c), a ? (a.alias.push(_), process.env.NODE_ENV !== "production" && Gn(a, _)) : (E = E || _, E !== _ && E.alias.push(_), p && r.name && !et(_) && l(r.name)), y.children) {
        const H = y.children;
        for (let j = 0; j < H.length; j++)
          f(H[j], _, a && a.children[j]);
      }
      a = a || _, (_.record.components && Object.keys(_.record.components).length || _.record.name || _.record.redirect) && u(_);
    }
    return E ? () => {
      l(E);
    } : oe;
  }
  function l(r) {
    if (_t(r)) {
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
  function u(r) {
    let c = 0;
    for (; c < n.length && In(r, n[c]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (r.record.path !== n[c].record.path || !Et(r, n[c])); )
      c++;
    n.splice(c, 0, r), r.record.name && !et(r) && o.set(r.record.name, r);
  }
  function h(r, c) {
    let a, p = {}, y, N;
    if ("name" in r && r.name) {
      if (a = o.get(r.name), !a)
        throw X(1, {
          location: r
        });
      if (process.env.NODE_ENV !== "production") {
        const E = Object.keys(r.params || {}).filter((C) => !a.keys.find((x) => x.name === C));
        E.length && w(`Discarded invalid param(s) "${E.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      N = a.record.name, p = S(
        // paramsFromLocation is a new object
        Ze(
          l.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          a.keys.filter((E) => !E.optional).concat(a.parent ? a.parent.keys.filter((E) => E.optional) : []).map((E) => E.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        r.params && Ze(r.params, a.keys.map((E) => E.name))
      ), y = a.stringify(p);
    } else if (r.path != null)
      y = r.path, process.env.NODE_ENV !== "production" && !y.startsWith("/") && w(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((E) => E.re.test(y)), a && (p = a.parse(y), N = a.record.name);
    else {
      if (a = c.name ? o.get(c.name) : n.find((E) => E.re.test(c.path)), !a)
        throw X(1, {
          location: r,
          currentLocation: l
        });
      N = a.record.name, p = S({}, c.params, r.params), y = a.stringify(p);
    }
    const P = [];
    let _ = a;
    for (; _; )
      P.unshift(_.record), _ = _.parent;
    return {
      name: N,
      path: y,
      params: p,
      matched: P,
      meta: Hn(P)
    };
  }
  return e.forEach((r) => f(r)), { addRoute: f, resolve: h, removeRoute: l, getRoutes: d, getRecordMatcher: s };
}
function Ze(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Bn(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: qn(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function qn(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const o in e.components)
      t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function et(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function Hn(e) {
  return e.reduce((t, n) => S(t, n.meta), {});
}
function tt(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function Ce(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function Gn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Ce.bind(null, n)))
      return w(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Ce.bind(null, n)))
      return w(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Kn(e, t) {
  t && t.record.name && !e.name && !e.path && w(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Wn(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Ce.bind(null, n)))
      return w(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Et(e, t) {
  return t.children.some((n) => n === e || Et(e, n));
}
function zn(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < o.length; ++s) {
    const f = o[s].replace(ht, " "), l = f.indexOf("="), d = J(l < 0 ? f : f.slice(0, l)), u = l < 0 ? null : J(f.slice(l + 1));
    if (d in t) {
      let h = t[d];
      T(h) || (h = t[d] = [h]), h.push(u);
    } else
      t[d] = u;
  }
  return t;
}
function nt(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = ln(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (T(o) ? o.map((f) => f && Pe(f)) : [o && Pe(o)]).forEach((f) => {
      f !== void 0 && (t += (t.length ? "&" : "") + n, f != null && (t += "=" + f));
    });
  }
  return t;
}
function Qn(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = T(o) ? o.map((s) => s == null ? null : "" + s) : o == null ? o : "" + o);
  }
  return t;
}
const Fn = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), ot = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Ie = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), bt = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), $e = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function te() {
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
function B(e, t, n, o, s, f = (l) => l()) {
  const l = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[s] = o.enterCallbacks[s] || []);
  return () => new Promise((d, u) => {
    const h = (a) => {
      a === !1 ? u(X(4, {
        from: n,
        to: t
      })) : a instanceof Error ? u(a) : ue(a) ? u(X(2, {
        from: t,
        to: a
      })) : (l && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[s] === l && typeof a == "function" && l.push(a), d());
    }, r = f(() => e.call(o && o.instances[s], t, n, process.env.NODE_ENV !== "production" ? Yn(h, t, n) : h));
    let c = Promise.resolve(r);
    if (e.length < 3 && (c = c.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof r == "object" && "then" in r)
        c = c.then((p) => h._called ? p : (w(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (r !== void 0 && !h._called) {
        w(a), u(new Error("Invalid navigation guard"));
        return;
      }
    }
    c.catch((a) => u(a));
  });
}
function Yn(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && w(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function we(e, t, n, o, s = (f) => f()) {
  const f = [];
  for (const l of e) {
    process.env.NODE_ENV !== "production" && !l.components && !l.children.length && w(`Record with path "${l.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in l.components) {
      let u = l.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!u || typeof u != "object" && typeof u != "function")
          throw w(`Component "${d}" in record with path "${l.path}" is not a valid component. Received "${String(u)}".`), new Error("Invalid route component");
        if ("then" in u) {
          w(`Component "${d}" in record with path "${l.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = u;
          u = () => h;
        } else
          u.__asyncLoader && // warn only once per component
          !u.__warnedDefineAsync && (u.__warnedDefineAsync = !0, w(`Component "${d}" in record with path "${l.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !l.instances[d]))
        if (Jn(u)) {
          const r = (u.__vccOpts || u)[t];
          r && f.push(B(r, n, o, l, d, s));
        } else {
          let h = u();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (w(`Component "${d}" in record with path "${l.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), f.push(() => h.then((r) => {
            if (!r)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${l.path}"`));
            const c = Jt(r) ? r.default : r;
            l.components[d] = c;
            const p = (c.__vccOpts || c)[t];
            return p && B(p, n, o, l, d, s)();
          }));
        }
    }
  }
  return f;
}
function Jn(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function rt(e) {
  const t = z(Ie), n = z(bt);
  let o = !1, s = null;
  const f = V(() => {
    const r = Y(e.to);
    return process.env.NODE_ENV !== "production" && (!o || r !== s) && (ue(r) || (o ? w(`Invalid value for prop "to" in useLink()
- to:`, r, `
- previous to:`, s, `
- props:`, e) : w(`Invalid value for prop "to" in useLink()
- to:`, r, `
- props:`, e)), s = r, o = !0), t.resolve(r);
  }), l = V(() => {
    const { matched: r } = f.value, { length: c } = r, a = r[c - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const y = p.findIndex(q.bind(null, a));
    if (y > -1)
      return y;
    const N = st(r[l - 2]);
    return (
      // we are dealing with nested routes
      l > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      st(a) === N && // avoid comparing the child with its parent
      p[p.length - 1].path !== N ? p.findIndex(q.bind(null, r[c - 2])) : y
    );
  }), d = V(() => l.value > -1 && to(n.params, f.value.params)), u = V(() => l.value > -1 && l.value === n.matched.length - 1 && vt(n.params, f.value.params));
  function h(r = {}) {
    return eo(r) ? t[Y(e.replace) ? "replace" : "push"](
      Y(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(oe) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && M) {
    const r = lt();
    if (r) {
      const l = {
        route: f.value,
        isActive: d.value,
        isExactActive: u.value,
        error: null
      };
      r.__vrl_devtools = r.__vrl_devtools || [], r.__vrl_devtools.push(c), Lt(() => {
        c.route = f.value, c.isActive = d.value, c.isExactActive = u.value, c.error = ue(Y(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: f,
    href: V(() => f.value.href),
    isActive: d,
    isExactActive: u,
    navigate: h
  };
}
const Xn = /* @__PURE__ */ fe({
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
  useLink: rt,
  setup(e, { slots: t }) {
    const n = jt(rt(e)), { options: o } = z(Ie), s = V(() => ({
      [at(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [at(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const f = t.default && t.default(n);
      return e.custom ? f : ct("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: s.value
      }, f);
    };
  }
}), Zn = Xn;
function eo(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function to(e, t) {
  for (const n in t) {
    const o = t[n], s = e[n];
    if (typeof o == "string") {
      if (o !== s)
        return !1;
    } else if (!T(s) || s.length !== o.length || o.some((f, l) => f !== s[l]))
      return !1;
  }
  return !0;
}
function st(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const at = (e, t, n) => e ?? t ?? n, no = /* @__PURE__ */ fe({
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
    process.env.NODE_ENV !== "production" && ro();
    const o = z($e), s = V(() => e.route || o.value), f = z(ot, 0), l = V(() => {
      let h = Y(f);
      const { matched: r } = s.value;
      let l;
      for (; (l = r[h]) && !l.components; )
        h++;
      return h;
    }), d = V(() => s.value.matched[l.value]);
    _e(ot, V(() => l.value + 1)), _e(Fn, d), _e($e, s);
    const u = W();
    return Te(() => [u.value, d.value, e.name], ([h, r, c], [a, p, y]) => {
      r && (r.instances[c] = h, p && p !== r && h && h === a && (r.leaveGuards.size || (r.leaveGuards = p.leaveGuards), r.updateGuards.size || (r.updateGuards = p.updateGuards))), h && r && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !q(r, p) || !a) && (r.enterCallbacks[c] || []).forEach((N) => N(h));
    }, { flush: "post" }), () => {
      const h = s.value, r = e.name, c = d.value, a = c && c.components[r];
      if (!a)
        return it(n.default, { Component: a, route: h });
      const p = c.props[r], y = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, P = ct(a, S({}, y, t, {
        onVnodeUnmounted: (_) => {
          _.component.isUnmounted && (l.instances[r] = null);
        },
        ref: u
      }));
      if (process.env.NODE_ENV !== "production" && M && P.ref) {
        const _ = {
          depth: l.value,
          name: c.name,
          path: c.path,
          meta: c.meta
        };
        (T(P.ref) ? P.ref.map((C) => C.i) : [P.ref.i]).forEach((C) => {
          C.__vrv_devtools = _;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        it(n.default, { Component: P, route: h }) || P
      );
    };
  }
});
function it(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const oo = no;
function ro() {
  const e = lt(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    w(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
  }
}
function ne(e, t) {
  const n = S({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => go(o, ["instances", "children", "aliasOf"]))
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
function ce(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let so = 0;
function ao(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = so++;
  Yt({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (s) => {
    typeof s.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), s.on.inspectComponent((r, l) => {
      r.instanceData && r.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: ne(t.currentRoute.value, "Current Route")
      });
    }), s.on.visitComponentTree(({ treeNode: r, componentInstance: c }) => {
      if (c.__vrv_devtools) {
        const a = c.__vrv_devtools;
        r.tags.push({
          label: (a.name ? `${a.name.toString()}: ` : "") + a.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: wt
        });
      }
      T(c.__vrl_devtools) && (c.__devtoolsApi = s, c.__vrl_devtools.forEach((a) => {
        let p = a.route.path, y = St, N = "", P = 0;
        a.error ? (p = a.error, y = fo, P = ho) : a.isExactActive ? (y = kt, N = "This is exactly active") : a.isActive && (y = Rt, N = "This link is active"), r.tags.push({
          label: p,
          textColor: P,
          tooltip: N,
          backgroundColor: y
        });
      }));
    }), Te(t.currentRoute, () => {
      u(), s.notifyComponentUpdate(), s.sendInspectorTree(d), s.sendInspectorState(d);
    });
    const f = "router:navigations:" + o;
    s.addTimelineLayer({
      id: f,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((r, l) => {
      s.addTimelineEvent({
        layerId: f,
        event: {
          title: "Error during Navigation",
          subtitle: l.fullPath,
          logType: "error",
          time: s.now(),
          data: { error: r },
          groupId: l.meta.__navigationId
        }
      });
    });
    let l = 0;
    t.beforeEach((r, c) => {
      const a = {
        guard: ce("beforeEach"),
        from: ne(c, "Current Location during this navigation"),
        to: ne(r, "Target location")
      };
      Object.defineProperty(r.meta, "__navigationId", {
        value: l++
      }), s.addTimelineEvent({
        layerId: f,
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
        guard: ce("afterEach")
      };
      a ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: a ? a.message : "",
          tooltip: "Navigation Failure",
          value: a
        }
      }, p.status = ce("❌")) : p.status = ce("✅"), p.from = ne(c, "Current Location during this navigation"), p.to = ne(r, "Target location"), s.addTimelineEvent({
        layerId: f,
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
    function u() {
      if (!h)
        return;
      const r = h;
      let c = n.getRoutes().filter((a) => !a.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !a.parent.record.components);
      c.forEach(Ot), r.filter && (c = c.filter((a) => (
        // save matches state based on the payload
        Ae(a, r.filter.toLowerCase())
      ))), c.forEach((a) => Nt(a, t.currentRoute.value)), r.rootNodes = c.map(Pt);
    }
    let h;
    s.on.getInspectorTree((r) => {
      h = r, r.app === e && r.inspectorId === d && u();
    }), s.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === d) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === r.nodeId);
        a && (r.state = {
          options: co(a)
        });
      }
    }), s.sendInspectorTree(d), s.sendInspectorState(d);
  });
}
function io(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function co(e) {
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
const wt = 15485081, Rt = 2450411, kt = 8702998, lo = 2282478, St = 16486972, uo = 6710886, fo = 16704226, ho = 12131356;
function Pt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: lo
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: St
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: wt
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: kt
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: Rt
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: uo
  });
  let o = n.__vd_id;
  return o == null && (o = String(po++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Pt)
  };
}
let po = 0;
const mo = /^\/(.*)\/([a-z]*)$/;
function Nt(e, t) {
  const n = t.matched.length && q(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => q(o, e.record))), e.children.forEach((o) => Nt(o, t));
}
function Ot(e) {
  e.__vd_match = !1, e.children.forEach(Ot);
}
function Ae(e, t) {
  const n = String(e.re).match(mo);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((l) => Ae(l, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const s = e.record.path.toLowerCase(), f = J(s);
  return !t.startsWith("/") && (f.includes(t) || s.includes(t)) || f.startsWith(t) || s.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((l) => Ae(l, t));
}
function go(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function vo(e) {
  const t = Un(e.routes, e), n = e.parseQuery || zn, o = e.stringifyQuery || nt, s = e.history;
  if (process.env.NODE_ENV !== "production" && !s)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const f = te(), l = te(), d = te(), u = Dt(U);
  let h = U;
  M && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const r = Ee.bind(null, (i) => "" + i), c = Ee.bind(null, fn), a = (
    // @ts-expect-error: intentionally avoid the type check
    Ee.bind(null, J)
  );
  function p(i, g) {
    let m, v;
    return _t(i) ? (m = t.getRecordMatcher(i), process.env.NODE_ENV !== "production" && !m && w(`Parent route "${String(i)}" not found when adding child route`, g), v = g) : v = i, t.addRoute(v, m);
  }
  function y(i) {
    const g = t.getRecordMatcher(i);
    g ? t.removeRoute(g) : process.env.NODE_ENV !== "production" && w(`Cannot remove non-existent route "${String(i)}"`);
  }
  function N() {
    return t.getRoutes().map((i) => i.record);
  }
  function P(i) {
    return !!t.getRecordMatcher(i);
  }
  function _(i, g) {
    if (g = S({}, g || u.value), typeof i == "string") {
      const b = be(n, i, g.path), O = t.resolve({ path: b.path }, g), G = s.createHref(b.fullPath);
      return process.env.NODE_ENV !== "production" && (G.startsWith("//") ? w(`Location "${i}" resolved to "${G}". A resolved location cannot start with multiple slashes.`) : O.matched.length || w(`No match found for location with path "${i}"`)), S(b, O, {
        params: a(O.params),
        hash: J(b.hash),
        redirectedFrom: void 0,
        href: G
      });
    }
    process.env.NODE_ENV !== "production" && !ue(i) && (w(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, i), i = {});
    let m;
    if (i.path != null)
      process.env.NODE_ENV !== "production" && "params" in i && !("name" in i) && // @ts-expect-error: the type is never
      Object.keys(i.params).length && w(`Path "${i.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), m = S({}, i, {
        path: be(n, i.path, g.path).path
      });
    else {
      const b = S({}, i.params);
      for (const O in b)
        b[O] == null && delete b[O];
      m = S({}, i, {
        params: c(b)
      }), g.params = c(g.params);
    }
    const v = t.resolve(m, g), k = i.hash || "";
    process.env.NODE_ENV !== "production" && k && !k.startsWith("#") && w(`A \`hash\` should always start with the character "#". Replace "${k}" with "#${k}".`), v.params = r(a(v.params));
    const $ = pn(o, S({}, i, {
      hash: cn(k),
      path: v.path
    })), R = s.createHref($);
    return process.env.NODE_ENV !== "production" && (R.startsWith("//") ? w(`Location "${i}" resolved to "${R}". A resolved location cannot start with multiple slashes.`) : v.matched.length || w(`No match found for location with path "${i.path != null ? i.path : i}"`)), S({
      fullPath: $,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: k,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === nt ? Qn(i.query) : i.query || {}
      )
    }, v, {
      redirectedFrom: void 0,
      href: R
    });
  }
  function E(i) {
    return typeof i == "string" ? be(n, i, u.value.path) : S({}, i);
  }
  function C(i, g) {
    if (h !== i)
      return X(8, {
        from: g,
        to: i
      });
  }
  function x(i) {
    return Z(i);
  }
  function H(i) {
    return x(S(E(i), { replace: !0 }));
  }
  function j(i) {
    const g = i.matched[i.matched.length - 1];
    if (g && g.redirect) {
      const { redirect: m } = g;
      let v = typeof m == "function" ? m(i) : m;
      if (typeof v == "string" && (v = v.includes("?") || v.includes("#") ? v = E(v) : (
        // force empty params
        { path: v }
      ), v.params = {}), process.env.NODE_ENV !== "production" && v.path == null && !("name" in v))
        throw w(`Invalid redirect found:
${JSON.stringify(v, null, 2)}
 when navigating to "${i.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return S({
        query: i.query,
        hash: i.hash,
        // avoid transferring params if the redirect has a path
        params: v.path != null ? {} : i.params
      }, v);
    }
  }
  function Z(i, g) {
    const m = h = _(i), v = u.value, k = i.state, $ = i.force, R = i.replace === !0, b = j(m);
    if (b)
      return Z(
        S(E(b), {
          state: typeof b == "object" ? S({}, k, b.state) : k,
          force: $,
          replace: R
        }),
        // keep original redirectedFrom if it exists
        g || m
      );
    const O = m;
    O.redirectedFrom = g;
    let G;
    return !$ && We(o, v, m) && (G = X(16, { to: O, from: v }), Be(
      v,
      v,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (G ? Promise.resolve(G) : je(O, v)).catch((A) => L(A) ? (
      // navigation redirects still mark the router as ready
      L(
        A,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? A : ge(A)
    ) : (
      // reject any unknown error
      me(A, O, v)
    )).then((A) => {
      if (A) {
        if (L(
          A,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          We(o, _(A.to), O) && // and we have done it a couple of times
          g && // @ts-expect-error: added only in dev
          (g._count = g._count ? (
            // @ts-expect-error
            g._count + 1
          ) : 1) > 30 ? (w(`Detected a possibly infinite redirection in a navigation guard when going from "${v.fullPath}" to "${O.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : Z(
            // keep options
            S({
              // preserve an existing replacement but allow the redirect to override it
              replace: R
            }, E(A.to), {
              state: typeof A.to == "object" ? S({}, k, A.to.state) : k,
              force: $
            }),
            // preserve the original redirectedFrom if any
            g || O
          );
      } else
        A = Me(O, v, !0, R, k);
      return Le(O, v, A), A;
    });
  }
  function At(i, g) {
    const m = C(i, g);
    return m ? Promise.reject(m) : Promise.resolve();
  }
  function he(i) {
    const g = ie.values().next().value;
    return g && typeof g.runWithContext == "function" ? g.runWithContext(i) : i();
  }
  function je(i, g) {
    let m;
    const [v, k, $] = yo(i, g);
    m = we(v.reverse(), "beforeRouteLeave", i, g);
    for (const b of v)
      b.leaveGuards.forEach((O) => {
        m.push(B(O, i, g));
      });
    const R = At.bind(null, i, g);
    return m.push(R), Q(m).then(() => {
      m = [];
      for (const b of f.list())
        m.push(B(b, i, g));
      return m.push(R), Q(m);
    }).then(() => {
      m = we(k, "beforeRouteUpdate", i, g);
      for (const b of k)
        b.updateGuards.forEach((O) => {
          m.push(B(O, i, g));
        });
      return m.push(R), Q(m);
    }).then(() => {
      m = [];
      for (const b of $)
        if (b.beforeEnter)
          if (T(b.beforeEnter))
            for (const O of b.beforeEnter)
              m.push(B(O, i, g));
          else
            m.push(B(b.beforeEnter, i, g));
      return m.push(R), Q(m);
    }).then(() => (i.matched.forEach((b) => b.enterCallbacks = {}), m = we($, "beforeRouteEnter", i, g, he), m.push(R), Q(m))).then(() => {
      m = [];
      for (const b of l.list())
        m.push(B(b, i, g));
      return m.push(R), Q(m);
    }).catch((b) => L(
      b,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? b : Promise.reject(b));
  }
  function Le(i, g, m) {
    d.list().forEach((v) => he(() => v(i, g, m)));
  }
  function Me(i, g, m, v, k) {
    const $ = C(i, g);
    if ($)
      return $;
    const R = g === U, b = M ? history.state : {};
    m && (v || R ? s.replace(i.fullPath, S({
      scroll: R && b && b.scroll
    }, k)) : s.push(i.fullPath, k)), u.value = i, Be(i, g, m, R), ge();
  }
  let ee;
  function xt() {
    ee || (ee = s.listen((i, g, m) => {
      if (!qe.listening)
        return;
      const v = _(i), k = j(v);
      if (k) {
        Z(S(k, { replace: !0 }), v).catch(oe);
        return;
      }
      h = v;
      const $ = u.value;
      M && wn(Qe($.fullPath, m.delta), de()), je(v, $).catch((R) => L(
        R,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? R : L(
        R,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (Z(
        R.to,
        v
        // avoid an uncaught rejection, let push call triggerError
      ).then((b) => {
        L(
          b,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !m.delta && m.type === se.pop && s.go(-1, !1);
      }).catch(oe), Promise.reject()) : (m.delta && s.go(-m.delta, !1), me(R, v, $))).then((R) => {
        R = R || Me(
          // after navigation, all matched components are resolved
          v,
          $,
          !1
        ), R && (m.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !L(
          R,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? s.go(-m.delta, !1) : m.type === se.pop && L(
          R,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && s.go(-1, !1)), Le(v, $, R);
      }).catch(oe);
    }));
  }
  let pe = te(), Ue = te(), ae;
  function me(i, g, m) {
    ge(i);
    const v = Ue.list();
    return v.length ? v.forEach((k) => k(i, g, m)) : (process.env.NODE_ENV !== "production" && w("uncaught error during route navigation:"), console.error(i)), Promise.reject(i);
  }
  function Tt() {
    return ae && u.value !== U ? Promise.resolve() : new Promise((i, g) => {
      pe.add([i, g]);
    });
  }
  function ge(i) {
    return ae || (ae = !i, xt(), pe.list().forEach(([g, m]) => i ? m(i) : g()), pe.reset()), i;
  }
  function Be(i, g, m, v) {
    const { scrollBehavior: k } = e;
    if (!M || !k)
      return Promise.resolve();
    const $ = !m && Rn(Qe(i.fullPath, 0)) || (v || !m) && history.state && history.state.scroll || null;
    return Vt().then(() => k(i, g, $)).then((R) => R && bn(R)).catch((R) => me(R, i, g));
  }
  const ve = (i) => s.go(i);
  let ye;
  const ie = /* @__PURE__ */ new Set(), qe = {
    currentRoute: u,
    listening: !0,
    addRoute: p,
    removeRoute: y,
    hasRoute: P,
    getRoutes: N,
    resolve: _,
    options: e,
    push: x,
    replace: H,
    go: ve,
    back: () => ve(-1),
    forward: () => ve(1),
    beforeEach: f.add,
    beforeResolve: l.add,
    afterEach: d.add,
    onError: Ue.add,
    isReady: Tt,
    install(i) {
      const g = this;
      i.component("RouterLink", Zn), i.component("RouterView", oo), i.config.globalProperties.$router = g, Object.defineProperty(i.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Y(u)
      }), M && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !ye && u.value === U && (ye = !0, x(s.location).catch((k) => {
        process.env.NODE_ENV !== "production" && w("Unexpected error when starting the router:", k);
      }));
      const m = {};
      for (const k in U)
        Object.defineProperty(m, k, {
          get: () => u.value[k],
          enumerable: !0
        });
      i.provide(Ie, g), i.provide(bt, It(m)), i.provide($e, u);
      const v = i.unmount;
      ie.add(i), i.unmount = function() {
        ie.delete(i), ie.size < 1 && (h = U, ee && ee(), ee = null, u.value = U, ye = !1, ae = !1), v();
      }, process.env.NODE_ENV !== "production" && M && ao(i, g, t);
    }
  };
  function Q(i) {
    return i.reduce((g, m) => g.then(() => he(m)), Promise.resolve());
  }
  return qe;
}
function yo(e, t) {
  const n = [], o = [], s = [], f = Math.max(t.matched.length, e.matched.length);
  for (let l = 0; l < f; l++) {
    const d = t.matched[l];
    d && (e.matched.find((h) => q(h, d)) ? o.push(d) : n.push(d));
    const u = e.matched[l];
    u && (t.matched.find((h) => q(h, u)) || s.push(u));
  }
  return [n, o, s];
}
const Ct = [
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
], _o = async (e) => {
  try {
    const t = z("$getApi");
    return await (await fetch(
      t + "?" + new URLSearchParams({ tag: e })
    )).json();
  } catch {
    alert("Error fetching data from the server, only display test data.");
  }
}, Eo = async (e) => {
  try {
    return await _o(e) || Ct.filter(
      (n) => n.tags.join(",").includes(e)
    );
  } catch (t) {
    return console.log(t), [];
  }
}, bo = async (e) => {
  try {
    const t = Ct, n = /* @__PURE__ */ new Set();
    return t.forEach((o) => {
      o.tags.forEach((s) => {
        const l = s.split(":")[1];
        l.toLowerCase().includes(e.toLowerCase()) && n.add(l);
      });
    }), Array.from(n);
  } catch (t) {
    return console.log(t), [];
  }
}, wo = { class: "search-results-container" }, Ro = { class: "container-description" }, ko = { class: "label-badges" }, So = {
  key: 0,
  class: "results"
}, Po = ["href"], No = {
  key: 1,
  class: "no-results"
}, Oo = /* @__PURE__ */ fe({
  __name: "DisplayResult",
  setup(e) {
    const t = W([
      { _id: "", label: "", tags: [""], url: "" }
    ]), n = $t(), o = W("");
    ut(async () => {
      n ? (o.value = n.currentRoute.value.query.tag, await s(o.value)) : o.value = "undefined";
    });
    const s = async (f) => {
      const l = await Eo(f);
      l && (t.value = l);
    };
    return Te(n.currentRoute, async (f, l) => {
      const d = f.query.tag || "", u = l.query.tag || "";
      d !== u && await s(d);
    }), (f, l) => (D(), I("div", wo, [
      K("div", Ro, [
        K("button", {
          onClick: l[0] || (l[0] = () => f.$router.back())
        }, "↵"),
        K("div", ko, " (" + le(t.value.length) + " records in total) ", 1)
      ]),
      t.value.length ? (D(), I("div", So, [
        K("ul", null, [
          (D(!0), I(Re, null, ke(t.value, (d, u) => (D(), I("li", { key: u }, [
            K("a", {
              href: d.url,
              target: "_blank",
              class: "linkToResource"
            }, le(d.label), 9, Po),
            (D(!0), I(Re, null, ke(d.tags, (h, r) => (D(), I("span", {
              key: r,
              class: "tag-badges"
            }, le(h), 1))), 128))
          ]))), 128))
        ])
      ])) : (D(), I("p", No, "No results found"))
    ]));
  }
}), Ve = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, xe = /* @__PURE__ */ Ve(Oo, [["__scopeId", "data-v-cbd9fd05"]]), Co = {}, $o = { id: "app" };
function Ao(e, t) {
  const n = He("CrucibleSearch"), o = He("RouterView");
  return D(), I("div", $o, [
    Ge(n),
    Ge(o)
  ]);
}
const xo = /* @__PURE__ */ Ve(Co, [["render", Ao]]), To = [
  { path: "/", component: xo },
  { path: "/search", component: xe }
], Do = vo({
  history: Nn("/"),
  routes: To
});
function $t() {
  const e = z("$router");
  return e || Do;
}
const Io = { class: "search-container" }, Vo = { key: 0 }, jo = ["onClick"], Lo = /* @__PURE__ */ fe({
  __name: "CrucibleSearch",
  setup(e) {
    const t = $t(), n = W(""), o = W([]), s = W(!1), f = W(null), l = async () => {
      n.value ? (o.value = await bo(n.value), s.value = !0) : (o.value = [], s.value = !1);
    }, d = (c) => {
      n.value = c, s.value = !1, t.push({ path: "/search", query: { tag: c } });
    }, u = () => {
      o.value.length && n.value && (s.value = !0);
    }, h = (c) => {
      c.key === "Enter" && (d(n.value), n.value = "");
    }, r = (c) => {
      f.value && !f.value.contains(c.target) && (s.value = !1);
    };
    return ut(() => {
      document.addEventListener("click", r);
    }), Mt(() => {
      document.removeEventListener("click", r);
    }), (c, a) => (D(), I("div", Io, [
      K("div", {
        ref_key: "searchBoxRef",
        ref: f,
        class: "search-container"
      }, [
        Ut(K("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (p) => n.value = p),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: l,
          onFocus: u,
          onKeydown: h
        }, null, 544), [
          [Bt, n.value]
        ]),
        o.value.length && n.value && s.value ? (D(), I("ul", Vo, [
          (D(!0), I(Re, null, ke(o.value, (p) => (D(), I("li", {
            key: p,
            onClick: (y) => d(p)
          }, le(p), 9, jo))), 128))
        ])) : qt("", !0)
      ], 512)
    ]));
  }
}), Mo = /* @__PURE__ */ Ve(Lo, [["__scopeId", "data-v-f21be478"]]);
function Bo(e, t) {
  const { router: n, getApi: o } = t;
  e.component("CrucibleSearch", Mo), e.component("DisplayResult", xe), e.provide("$router", n), e.provide("$getApi", o), n.addRoute({ path: "/search", component: xe });
}
export {
  Mo as CrucibleSearch,
  xe as DisplayResult,
  Bo as createSearchPlugin
};
