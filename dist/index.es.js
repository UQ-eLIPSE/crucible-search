import { shallowRef as Ut, unref as W, shallowReactive as Ht, nextTick as qt, defineComponent as J, reactive as Gt, inject as G, computed as j, h as ut, provide as Re, ref as L, watch as je, getCurrentInstance as ft, watchEffect as Kt, onMounted as dt, openBlock as $, createElementBlock as O, createElementVNode as T, toDisplayString as Q, Fragment as Y, renderList as ee, normalizeClass as Ne, pushScopeId as ht, popScopeId as pt, createVNode as pe, withDirectives as vt, vShow as zt, createCommentVNode as Ce, resolveComponent as ze, onUnmounted as Ft, vModelText as Wt } from "vue";
function Qt() {
  return mt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function mt() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Yt = typeof Proxy == "function", Jt = "devtools-plugin:setup", Xt = "plugin:settings:set";
let Z, $e;
function Zt() {
  var e;
  return Z !== void 0 || (typeof window < "u" && window.performance ? (Z = !0, $e = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Z = !0, $e = globalThis.perf_hooks.performance) : Z = !1), Z;
}
function en() {
  return Zt() ? $e.now() : Date.now();
}
class tn {
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
        return en();
      }
    }, n && n.on(Xt, (u, d) => {
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
function nn(e, t) {
  const n = e, o = mt(), r = Qt(), f = Yt && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !f))
    r.emit(Jt, e, t);
  else {
    const u = f ? new tn(n, r) : null;
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
const U = typeof document < "u";
function on(e) {
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
const ie = () => {
}, V = Array.isArray;
function R(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const gt = /#/g, rn = /&/g, sn = /\//g, an = /=/g, cn = /\?/g, _t = /\+/g, ln = /%5B/g, un = /%5D/g, yt = /%5E/g, fn = /%60/g, Et = /%7B/g, dn = /%7C/g, bt = /%7D/g, hn = /%20/g;
function Le(e) {
  return encodeURI("" + e).replace(dn, "|").replace(ln, "[").replace(un, "]");
}
function pn(e) {
  return Le(e).replace(Et, "{").replace(bt, "}").replace(yt, "^");
}
function Oe(e) {
  return Le(e).replace(_t, "%2B").replace(hn, "+").replace(gt, "%23").replace(rn, "%26").replace(fn, "`").replace(Et, "{").replace(bt, "}").replace(yt, "^");
}
function vn(e) {
  return Oe(e).replace(an, "%3D");
}
function mn(e) {
  return Le(e).replace(gt, "%23").replace(cn, "%3F");
}
function gn(e) {
  return e == null ? "" : mn(e).replace(sn, "%2F");
}
function te(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && R(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const _n = /\/$/, yn = (e) => e.replace(_n, "");
function Se(e, t, n = "/") {
  let o, r = {}, f = "", u = "";
  const d = t.indexOf("#");
  let l = t.indexOf("?");
  return d < l && d >= 0 && (l = -1), l > -1 && (o = t.slice(0, l), f = t.slice(l + 1, d > -1 ? d : t.length), r = e(f)), d > -1 && (o = o || t.slice(0, d), u = t.slice(d, t.length)), o = wn(o ?? t, n), {
    fullPath: o + (f && "?") + f + u,
    path: o,
    query: r,
    hash: te(u)
  };
}
function En(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Fe(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function We(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && K(t.matched[o], n.matched[r]) && wt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function K(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function wt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!bn(e[n], t[n]))
      return !1;
  return !0;
}
function bn(e, t) {
  return V(e) ? Qe(e, t) : V(t) ? Qe(t, e) : e === t;
}
function Qe(e, t) {
  return V(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function wn(e, t) {
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
var le;
(function(e) {
  e.pop = "pop", e.push = "push";
})(le || (le = {}));
var ce;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(ce || (ce = {}));
function Rn(e) {
  if (!e)
    if (U) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), yn(e);
}
const kn = /^[^#]+#/;
function Sn(e, t) {
  return e.replace(kn, "#") + t;
}
function Pn(e, t) {
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
function Nn(e) {
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
    t = Pn(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Ye(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ae = /* @__PURE__ */ new Map();
function Cn(e, t) {
  Ae.set(e, t);
}
function $n(e) {
  const t = Ae.get(e);
  return Ae.delete(e), t;
}
let On = () => location.protocol + "//" + location.host;
function Rt(e, t) {
  const { pathname: n, search: o, hash: r } = t, f = e.indexOf("#");
  if (f > -1) {
    let d = r.includes(e.slice(f)) ? e.slice(f).length : 1, l = r.slice(d);
    return l[0] !== "/" && (l = "/" + l), Fe(l, "");
  }
  return Fe(n, e) + o + r;
}
function An(e, t, n, o) {
  let r = [], f = [], u = null;
  const d = ({ state: a }) => {
    const p = Rt(e, location), g = n.value, y = t.value;
    let S = 0;
    if (a) {
      if (n.value = p, t.value = a, u && u === g) {
        u = null;
        return;
      }
      S = y ? a.position - y.position : 0;
    } else
      o(p);
    r.forEach((E) => {
      E(n.value, g, {
        delta: S,
        type: le.pop,
        direction: S ? S > 0 ? ce.forward : ce.back : ce.unknown
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
    a.state && a.replaceState(N({}, a.state, { scroll: me() }), "");
  }
  function i() {
    for (const a of f)
      a();
    f = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: l,
    listen: h,
    destroy: i
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
function Tn(e) {
  const { history: t, location: n } = window, o = {
    value: Rt(e, n)
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
    const i = e.indexOf("#"), a = i > -1 ? (n.host && document.querySelector("base") ? e : e.slice(i)) + l : On() + e + l;
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
        scroll: me()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && R(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), f(s.current, s, !0);
    const i = N({}, Je(o.value, l, null), { position: s.position + 1 }, h);
    f(l, i, !1), o.value = l;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: u
  };
}
function xn(e) {
  e = Rn(e);
  const t = Tn(e), n = An(e, t.state, t.location, t.replace);
  function o(f, u = !0) {
    u || n.pauseListeners(), history.go(f);
  }
  const r = N({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: Sn.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function ve(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function kt(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const H = {
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
const In = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Vn(t)}" via a navigation guard.`;
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
function ne(e, t) {
  return process.env.NODE_ENV !== "production" ? N(new Error(In[e](t)), {
    type: e,
    [Te]: !0
  }, t) : N(new Error(), {
    type: e,
    [Te]: !0
  }, t);
}
function B(e, t) {
  return e instanceof Error && Te in e && (t == null || !!(e.type & t));
}
const Dn = ["params", "query", "hash"];
function Vn(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of Dn)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Ze = "[^/]+?", jn = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Ln = /[.+*?^${}()[\]/\\]/g;
function Mn(e, t) {
  const n = N({}, jn, t), o = [];
  let r = n.start ? "^" : "";
  const f = [];
  for (const h of e) {
    const s = h.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !h.length && (r += "/");
    for (let i = 0; i < h.length; i++) {
      const a = h[i];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (a.type === 0)
        i || (r += "/"), r += a.value.replace(Ln, "\\$&"), p += 40;
      else if (a.type === 1) {
        const { value: g, repeatable: y, optional: S, regexp: E } = a;
        f.push({
          name: g,
          repeatable: y,
          optional: S
        });
        const b = E || Ze;
        if (b !== Ze) {
          p += 10;
          try {
            new RegExp(`(${b})`);
          } catch (D) {
            throw new Error(`Invalid custom RegExp for param "${g}" (${b}): ` + D.message);
          }
        }
        let C = y ? `((?:${b})(?:/(?:${b}))*)` : `(${b})`;
        i || (C = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        S && h.length < 2 ? `(?:/${C})` : "/" + C), S && (C += "?"), r += C, p += 20, S && (p += -8), y && (p += -20), b === ".*" && (p += -50);
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
    const s = h.match(u), i = {};
    if (!s)
      return null;
    for (let a = 1; a < s.length; a++) {
      const p = s[a] || "", g = f[a - 1];
      i[g.name] = p && g.repeatable ? p.split("/") : p;
    }
    return i;
  }
  function l(h) {
    let s = "", i = !1;
    for (const a of e) {
      (!i || !s.endsWith("/")) && (s += "/"), i = !1;
      for (const p of a)
        if (p.type === 0)
          s += p.value;
        else if (p.type === 1) {
          const { value: g, repeatable: y, optional: S } = p, E = g in h ? h[g] : "";
          if (V(E) && !y)
            throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);
          const b = V(E) ? E.join("/") : E;
          if (!b)
            if (S)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : i = !0);
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
function Bn(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function Un(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const f = Bn(o[n], r[n]);
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
const Hn = {
  type: 0,
  value: ""
}, qn = /[a-zA-Z0-9_]/;
function Gn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Hn]];
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
  function i() {
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
        l === "/" ? (h && i(), u()) : l === ":" ? (i(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        l === "(" ? n = 2 : qn.test(l) ? a() : (i(), n = 0, l !== "*" && l !== "?" && l !== "+" && d--);
        break;
      case 2:
        l === ")" ? s[s.length - 1] == "\\" ? s = s.slice(0, -1) + l : n = 3 : s += l;
        break;
      case 3:
        i(), n = 0, l !== "*" && l !== "?" && l !== "+" && d--, s = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), i(), u(), r;
}
function Kn(e, t, n) {
  const o = Mn(Gn(e.path), n);
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
function zn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = ot({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function f(s, i, a) {
    const p = !a, g = Fn(s);
    process.env.NODE_ENV !== "production" && Jn(g, i), g.aliasOf = a && a.record;
    const y = ot(t, s), S = [
      g
    ];
    if ("alias" in s) {
      const C = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const D of C)
        S.push(N({}, g, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: a ? a.record.components : g.components,
          path: D,
          // we might be the child of an alias
          aliasOf: a ? a.record : g
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let E, b;
    for (const C of S) {
      const { path: D } = C;
      if (i && D[0] !== "/") {
        const z = i.record.path, M = z[z.length - 1] === "/" ? "" : "/";
        C.path = i.record.path + (D && M + D);
      }
      if (process.env.NODE_ENV !== "production" && C.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (E = Kn(C, i, y), process.env.NODE_ENV !== "production" && i && D[0] === "/" && Xn(E, i), a ? (a.alias.push(E), process.env.NODE_ENV !== "production" && Yn(a, E)) : (b = b || E, b !== E && b.alias.push(E), p && s.name && !nt(E) && u(s.name)), g.children) {
        const z = g.children;
        for (let M = 0; M < z.length; M++)
          f(z[M], E, a && a.children[M]);
      }
      a = a || E, (E.record.components && Object.keys(E.record.components).length || E.record.name || E.record.redirect) && l(E);
    }
    return b ? () => {
      u(b);
    } : ie;
  }
  function u(s) {
    if (kt(s)) {
      const i = o.get(s);
      i && (o.delete(s), n.splice(n.indexOf(i), 1), i.children.forEach(u), i.alias.forEach(u));
    } else {
      const i = n.indexOf(s);
      i > -1 && (n.splice(i, 1), s.record.name && o.delete(s.record.name), s.children.forEach(u), s.alias.forEach(u));
    }
  }
  function d() {
    return n;
  }
  function l(s) {
    let i = 0;
    for (; i < n.length && Un(s, n[i]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[i].record.path || !St(s, n[i])); )
      i++;
    n.splice(i, 0, s), s.record.name && !nt(s) && o.set(s.record.name, s);
  }
  function h(s, i) {
    let a, p = {}, g, y;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw ne(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const b = Object.keys(s.params || {}).filter((C) => !a.keys.find((D) => D.name === C));
        b.length && R(`Discarded invalid param(s) "${b.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      y = a.record.name, p = N(
        // paramsFromLocation is a new object
        tt(
          i.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          a.keys.filter((b) => !b.optional).concat(a.parent ? a.parent.keys.filter((b) => b.optional) : []).map((b) => b.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && tt(s.params, a.keys.map((b) => b.name))
      ), g = a.stringify(p);
    } else if (s.path != null)
      g = s.path, process.env.NODE_ENV !== "production" && !g.startsWith("/") && R(`The Matcher cannot resolve relative paths but received "${g}". Unless you directly called \`matcher.resolve("${g}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((b) => b.re.test(g)), a && (p = a.parse(g), y = a.record.name);
    else {
      if (a = i.name ? o.get(i.name) : n.find((b) => b.re.test(i.path)), !a)
        throw ne(1, {
          location: s,
          currentLocation: i
        });
      y = a.record.name, p = N({}, i.params, s.params), g = a.stringify(p);
    }
    const S = [];
    let E = a;
    for (; E; )
      S.unshift(E.record), E = E.parent;
    return {
      name: y,
      path: g,
      params: p,
      matched: S,
      meta: Qn(S)
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
function Fn(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Wn(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Wn(e) {
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
function Qn(e) {
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
function Yn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(xe.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(xe.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Jn(e, t) {
  t && t.record.name && !e.name && !e.path && R(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Xn(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(xe.bind(null, n)))
      return R(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function St(e, t) {
  return t.children.some((n) => n === e || St(e, n));
}
function Zn(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const f = o[r].replace(_t, " "), u = f.indexOf("="), d = te(u < 0 ? f : f.slice(0, u)), l = u < 0 ? null : te(f.slice(u + 1));
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
    if (n = vn(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (V(o) ? o.map((f) => f && Oe(f)) : [o && Oe(o)]).forEach((f) => {
      f !== void 0 && (t += (t.length ? "&" : "") + n, f != null && (t += "=" + f));
    });
  }
  return t;
}
function eo(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = V(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const to = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), st = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Me = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Pt = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), Ie = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function se() {
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
function q(e, t, n, o, r, f = (u) => u()) {
  const u = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((d, l) => {
    const h = (a) => {
      a === !1 ? l(ne(4, {
        from: n,
        to: t
      })) : a instanceof Error ? l(a) : ve(a) ? l(ne(2, {
        from: t,
        to: a
      })) : (u && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === u && typeof a == "function" && u.push(a), d());
    }, s = f(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? no(h, t, n) : h));
    let i = Promise.resolve(s);
    if (e.length < 3 && (i = i.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        i = i.then((p) => h._called ? p : (R(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        R(a), l(new Error("Invalid navigation guard"));
        return;
      }
    }
    i.catch((a) => l(a));
  });
}
function no(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && R(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Pe(e, t, n, o, r = (f) => f()) {
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
        if (oo(l)) {
          const s = (l.__vccOpts || l)[t];
          s && f.push(q(s, n, o, u, d, r));
        } else {
          let h = l();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (R(`Component "${d}" in record with path "${u.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), f.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${u.path}"`));
            const i = on(s) ? s.default : s;
            u.components[d] = i;
            const p = (i.__vccOpts || i)[t];
            return p && q(p, n, o, u, d, r)();
          }));
        }
    }
  }
  return f;
}
function oo(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function at(e) {
  const t = G(Me), n = G(Pt);
  let o = !1, r = null;
  const f = j(() => {
    const s = W(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (ve(s) || (o ? R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), u = j(() => {
    const { matched: s } = f.value, { length: i } = s, a = s[i - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const g = p.findIndex(K.bind(null, a));
    if (g > -1)
      return g;
    const y = it(s[i - 2]);
    return (
      // we are dealing with nested routes
      i > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      it(a) === y && // avoid comparing the child with its parent
      p[p.length - 1].path !== y ? p.findIndex(K.bind(null, s[i - 2])) : g
    );
  }), d = j(() => u.value > -1 && io(n.params, f.value.params)), l = j(() => u.value > -1 && u.value === n.matched.length - 1 && wt(n.params, f.value.params));
  function h(s = {}) {
    return ao(s) ? t[W(e.replace) ? "replace" : "push"](
      W(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ie) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && U) {
    const s = ft();
    if (s) {
      const i = {
        route: f.value,
        isActive: d.value,
        isExactActive: l.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(i), Kt(() => {
        i.route = f.value, i.isActive = d.value, i.isExactActive = l.value, i.error = ve(W(e.to)) ? null : 'Invalid "to" value';
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
const ro = /* @__PURE__ */ J({
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
    const n = Gt(at(e)), { options: o } = G(Me), r = j(() => ({
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
      return e.custom ? f : ut("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, f);
    };
  }
}), so = ro;
function ao(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function io(e, t) {
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
const ct = (e, t, n) => e ?? t ?? n, co = /* @__PURE__ */ J({
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
    process.env.NODE_ENV !== "production" && uo();
    const o = G(Ie), r = j(() => e.route || o.value), f = G(st, 0), u = j(() => {
      let h = W(f);
      const { matched: s } = r.value;
      let i;
      for (; (i = s[h]) && !i.components; )
        h++;
      return h;
    }), d = j(() => r.value.matched[u.value]);
    Re(st, j(() => u.value + 1)), Re(to, d), Re(Ie, r);
    const l = L();
    return je(() => [l.value, d.value, e.name], ([h, s, i], [a, p, g]) => {
      s && (s.instances[i] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !K(s, p) || !a) && (s.enterCallbacks[i] || []).forEach((y) => y(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, i = d.value, a = i && i.components[s];
      if (!a)
        return lt(n.default, { Component: a, route: h });
      const p = i.props[s], g = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, S = ut(a, N({}, g, t, {
        onVnodeUnmounted: (E) => {
          E.component.isUnmounted && (i.instances[s] = null);
        },
        ref: l
      }));
      if (process.env.NODE_ENV !== "production" && U && S.ref) {
        const E = {
          depth: u.value,
          name: i.name,
          path: i.path,
          meta: i.meta
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
const lo = co;
function uo() {
  const e = ft(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
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
function ae(e, t) {
  const n = N({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => wo(o, ["instances", "children", "aliasOf"]))
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
function he(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let fo = 0;
function ho(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = fo++;
  nn({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (r) => {
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((s, i) => {
      s.instanceData && s.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: ae(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: i }) => {
      if (i.__vrv_devtools) {
        const a = i.__vrv_devtools;
        s.tags.push({
          label: (a.name ? `${a.name.toString()}: ` : "") + a.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: Nt
        });
      }
      V(i.__vrl_devtools) && (i.__devtoolsApi = r, i.__vrl_devtools.forEach((a) => {
        let p = a.route.path, g = Ot, y = "", S = 0;
        a.error ? (p = a.error, g = _o, S = yo) : a.isExactActive ? (g = $t, y = "This is exactly active") : a.isActive && (g = Ct, y = "This link is active"), s.tags.push({
          label: p,
          textColor: S,
          tooltip: y,
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
    }), t.onError((s, i) => {
      r.addTimelineEvent({
        layerId: f,
        event: {
          title: "Error during Navigation",
          subtitle: i.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: s },
          groupId: i.meta.__navigationId
        }
      });
    });
    let u = 0;
    t.beforeEach((s, i) => {
      const a = {
        guard: he("beforeEach"),
        from: ae(i, "Current Location during this navigation"),
        to: ae(s, "Target location")
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
    }), t.afterEach((s, i, a) => {
      const p = {
        guard: he("afterEach")
      };
      a ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: a ? a.message : "",
          tooltip: "Navigation Failure",
          value: a
        }
      }, p.status = he("❌")) : p.status = he("✅"), p.from = ae(i, "Current Location during this navigation"), p.to = ae(s, "Target location"), r.addTimelineEvent({
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
      let i = n.getRoutes().filter((a) => !a.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !a.parent.record.components);
      i.forEach(xt), s.filter && (i = i.filter((a) => (
        // save matches state based on the payload
        De(a, s.filter.toLowerCase())
      ))), i.forEach((a) => Tt(a, t.currentRoute.value)), s.rootNodes = i.map(At);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && l();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === d) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        a && (s.state = {
          options: vo(a)
        });
      }
    }), r.sendInspectorTree(d), r.sendInspectorState(d);
  });
}
function po(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function vo(e) {
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
        display: e.keys.map((o) => `${o.name}${po(o)}`).join(" "),
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
const Nt = 15485081, Ct = 2450411, $t = 8702998, mo = 2282478, Ot = 16486972, go = 6710886, _o = 16704226, yo = 12131356;
function At(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: mo
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Ot
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Nt
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: $t
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: Ct
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: go
  });
  let o = n.__vd_id;
  return o == null && (o = String(Eo++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(At)
  };
}
let Eo = 0;
const bo = /^\/(.*)\/([a-z]*)$/;
function Tt(e, t) {
  const n = t.matched.length && K(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => K(o, e.record))), e.children.forEach((o) => Tt(o, t));
}
function xt(e) {
  e.__vd_match = !1, e.children.forEach(xt);
}
function De(e, t) {
  const n = String(e.re).match(bo);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((u) => De(u, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), f = te(r);
  return !t.startsWith("/") && (f.includes(t) || r.includes(t)) || f.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((u) => De(u, t));
}
function wo(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function Ro(e) {
  const t = zn(e.routes, e), n = e.parseQuery || Zn, o = e.stringifyQuery || rt, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const f = se(), u = se(), d = se(), l = Ut(H);
  let h = H;
  U && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = ke.bind(null, (c) => "" + c), i = ke.bind(null, gn), a = (
    // @ts-expect-error: intentionally avoid the type check
    ke.bind(null, te)
  );
  function p(c, m) {
    let v, _;
    return kt(c) ? (v = t.getRecordMatcher(c), process.env.NODE_ENV !== "production" && !v && R(`Parent route "${String(c)}" not found when adding child route`, m), _ = m) : _ = c, t.addRoute(_, v);
  }
  function g(c) {
    const m = t.getRecordMatcher(c);
    m ? t.removeRoute(m) : process.env.NODE_ENV !== "production" && R(`Cannot remove non-existent route "${String(c)}"`);
  }
  function y() {
    return t.getRoutes().map((c) => c.record);
  }
  function S(c) {
    return !!t.getRecordMatcher(c);
  }
  function E(c, m) {
    if (m = N({}, m || l.value), typeof c == "string") {
      const w = Se(n, c, m.path), A = t.resolve({ path: w.path }, m), F = r.createHref(w.fullPath);
      return process.env.NODE_ENV !== "production" && (F.startsWith("//") ? R(`Location "${c}" resolved to "${F}". A resolved location cannot start with multiple slashes.`) : A.matched.length || R(`No match found for location with path "${c}"`)), N(w, A, {
        params: a(A.params),
        hash: te(w.hash),
        redirectedFrom: void 0,
        href: F
      });
    }
    process.env.NODE_ENV !== "production" && !ve(c) && (R(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, c), c = {});
    let v;
    if (c.path != null)
      process.env.NODE_ENV !== "production" && "params" in c && !("name" in c) && // @ts-expect-error: the type is never
      Object.keys(c.params).length && R(`Path "${c.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), v = N({}, c, {
        path: Se(n, c.path, m.path).path
      });
    else {
      const w = N({}, c.params);
      for (const A in w)
        w[A] == null && delete w[A];
      v = N({}, c, {
        params: i(w)
      }), m.params = i(m.params);
    }
    const _ = t.resolve(v, m), P = c.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && R(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), _.params = s(a(_.params));
    const x = En(o, N({}, c, {
      hash: pn(P),
      path: _.path
    })), k = r.createHref(x);
    return process.env.NODE_ENV !== "production" && (k.startsWith("//") ? R(`Location "${c}" resolved to "${k}". A resolved location cannot start with multiple slashes.`) : _.matched.length || R(`No match found for location with path "${c.path != null ? c.path : c}"`)), N({
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
        o === rt ? eo(c.query) : c.query || {}
      )
    }, _, {
      redirectedFrom: void 0,
      href: k
    });
  }
  function b(c) {
    return typeof c == "string" ? Se(n, c, l.value.path) : N({}, c);
  }
  function C(c, m) {
    if (h !== c)
      return ne(8, {
        from: m,
        to: c
      });
  }
  function D(c) {
    return oe(c);
  }
  function z(c) {
    return D(N(b(c), { replace: !0 }));
  }
  function M(c) {
    const m = c.matched[c.matched.length - 1];
    if (m && m.redirect) {
      const { redirect: v } = m;
      let _ = typeof v == "function" ? v(c) : v;
      if (typeof _ == "string" && (_ = _.includes("?") || _.includes("#") ? _ = b(_) : (
        // force empty params
        { path: _ }
      ), _.params = {}), process.env.NODE_ENV !== "production" && _.path == null && !("name" in _))
        throw R(`Invalid redirect found:
${JSON.stringify(_, null, 2)}
 when navigating to "${c.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return N({
        query: c.query,
        hash: c.hash,
        // avoid transferring params if the redirect has a path
        params: _.path != null ? {} : c.params
      }, _);
    }
  }
  function oe(c, m) {
    const v = h = E(c), _ = l.value, P = c.state, x = c.force, k = c.replace === !0, w = M(v);
    if (w)
      return oe(
        N(b(w), {
          state: typeof w == "object" ? N({}, P, w.state) : P,
          force: x,
          replace: k
        }),
        // keep original redirectedFrom if it exists
        m || v
      );
    const A = v;
    A.redirectedFrom = m;
    let F;
    return !x && We(o, _, v) && (F = ne(16, { to: A, from: _ }), Ge(
      _,
      _,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (F ? Promise.resolve(F) : Be(A, _)).catch((I) => B(I) ? (
      // navigation redirects still mark the router as ready
      B(
        I,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? I : Ee(I)
    ) : (
      // reject any unknown error
      ye(I, A, _)
    )).then((I) => {
      if (I) {
        if (B(
          I,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          We(o, E(I.to), A) && // and we have done it a couple of times
          m && // @ts-expect-error: added only in dev
          (m._count = m._count ? (
            // @ts-expect-error
            m._count + 1
          ) : 1) > 30 ? (R(`Detected a possibly infinite redirection in a navigation guard when going from "${_.fullPath}" to "${A.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : oe(
            // keep options
            N({
              // preserve an existing replacement but allow the redirect to override it
              replace: k
            }, b(I.to), {
              state: typeof I.to == "object" ? N({}, P, I.to.state) : P,
              force: x
            }),
            // preserve the original redirectedFrom if any
            m || A
          );
      } else
        I = He(A, _, !0, k, P);
      return Ue(A, _, I), I;
    });
  }
  function Lt(c, m) {
    const v = C(c, m);
    return v ? Promise.reject(v) : Promise.resolve();
  }
  function ge(c) {
    const m = de.values().next().value;
    return m && typeof m.runWithContext == "function" ? m.runWithContext(c) : c();
  }
  function Be(c, m) {
    let v;
    const [_, P, x] = ko(c, m);
    v = Pe(_.reverse(), "beforeRouteLeave", c, m);
    for (const w of _)
      w.leaveGuards.forEach((A) => {
        v.push(q(A, c, m));
      });
    const k = Lt.bind(null, c, m);
    return v.push(k), X(v).then(() => {
      v = [];
      for (const w of f.list())
        v.push(q(w, c, m));
      return v.push(k), X(v);
    }).then(() => {
      v = Pe(P, "beforeRouteUpdate", c, m);
      for (const w of P)
        w.updateGuards.forEach((A) => {
          v.push(q(A, c, m));
        });
      return v.push(k), X(v);
    }).then(() => {
      v = [];
      for (const w of x)
        if (w.beforeEnter)
          if (V(w.beforeEnter))
            for (const A of w.beforeEnter)
              v.push(q(A, c, m));
          else
            v.push(q(w.beforeEnter, c, m));
      return v.push(k), X(v);
    }).then(() => (c.matched.forEach((w) => w.enterCallbacks = {}), v = Pe(x, "beforeRouteEnter", c, m, ge), v.push(k), X(v))).then(() => {
      v = [];
      for (const w of u.list())
        v.push(q(w, c, m));
      return v.push(k), X(v);
    }).catch((w) => B(
      w,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? w : Promise.reject(w));
  }
  function Ue(c, m, v) {
    d.list().forEach((_) => ge(() => _(c, m, v)));
  }
  function He(c, m, v, _, P) {
    const x = C(c, m);
    if (x)
      return x;
    const k = m === H, w = U ? history.state : {};
    v && (_ || k ? r.replace(c.fullPath, N({
      scroll: k && w && w.scroll
    }, P)) : r.push(c.fullPath, P)), l.value = c, Ge(c, m, v, k), Ee();
  }
  let re;
  function Mt() {
    re || (re = r.listen((c, m, v) => {
      if (!Ke.listening)
        return;
      const _ = E(c), P = M(_);
      if (P) {
        oe(N(P, { replace: !0 }), _).catch(ie);
        return;
      }
      h = _;
      const x = l.value;
      U && Cn(Ye(x.fullPath, v.delta), me()), Be(_, x).catch((k) => B(
        k,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? k : B(
        k,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (oe(
        k.to,
        _
        // avoid an uncaught rejection, let push call triggerError
      ).then((w) => {
        B(
          w,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !v.delta && v.type === le.pop && r.go(-1, !1);
      }).catch(ie), Promise.reject()) : (v.delta && r.go(-v.delta, !1), ye(k, _, x))).then((k) => {
        k = k || He(
          // after navigation, all matched components are resolved
          _,
          x,
          !1
        ), k && (v.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !B(
          k,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-v.delta, !1) : v.type === le.pop && B(
          k,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Ue(_, x, k);
      }).catch(ie);
    }));
  }
  let _e = se(), qe = se(), fe;
  function ye(c, m, v) {
    Ee(c);
    const _ = qe.list();
    return _.length ? _.forEach((P) => P(c, m, v)) : (process.env.NODE_ENV !== "production" && R("uncaught error during route navigation:"), console.error(c)), Promise.reject(c);
  }
  function Bt() {
    return fe && l.value !== H ? Promise.resolve() : new Promise((c, m) => {
      _e.add([c, m]);
    });
  }
  function Ee(c) {
    return fe || (fe = !c, Mt(), _e.list().forEach(([m, v]) => c ? v(c) : m()), _e.reset()), c;
  }
  function Ge(c, m, v, _) {
    const { scrollBehavior: P } = e;
    if (!U || !P)
      return Promise.resolve();
    const x = !v && $n(Ye(c.fullPath, 0)) || (_ || !v) && history.state && history.state.scroll || null;
    return qt().then(() => P(c, m, x)).then((k) => k && Nn(k)).catch((k) => ye(k, c, m));
  }
  const be = (c) => r.go(c);
  let we;
  const de = /* @__PURE__ */ new Set(), Ke = {
    currentRoute: l,
    listening: !0,
    addRoute: p,
    removeRoute: g,
    hasRoute: S,
    getRoutes: y,
    resolve: E,
    options: e,
    push: D,
    replace: z,
    go: be,
    back: () => be(-1),
    forward: () => be(1),
    beforeEach: f.add,
    beforeResolve: u.add,
    afterEach: d.add,
    onError: qe.add,
    isReady: Bt,
    install(c) {
      const m = this;
      c.component("RouterLink", so), c.component("RouterView", lo), c.config.globalProperties.$router = m, Object.defineProperty(c.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => W(l)
      }), U && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !we && l.value === H && (we = !0, D(r.location).catch((P) => {
        process.env.NODE_ENV !== "production" && R("Unexpected error when starting the router:", P);
      }));
      const v = {};
      for (const P in H)
        Object.defineProperty(v, P, {
          get: () => l.value[P],
          enumerable: !0
        });
      c.provide(Me, m), c.provide(Pt, Ht(v)), c.provide(Ie, l);
      const _ = c.unmount;
      de.add(c), c.unmount = function() {
        de.delete(c), de.size < 1 && (h = H, re && re(), re = null, l.value = H, we = !1, fe = !1), _();
      }, process.env.NODE_ENV !== "production" && U && ho(c, m, t);
    }
  };
  function X(c) {
    return c.reduce((m, v) => m.then(() => ge(v)), Promise.resolve());
  }
  return Ke;
}
function ko(e, t) {
  const n = [], o = [], r = [], f = Math.max(t.matched.length, e.matched.length);
  for (let u = 0; u < f; u++) {
    const d = t.matched[u];
    d && (e.matched.find((h) => K(h, d)) ? o.push(d) : n.push(d));
    const l = e.matched[u];
    l && (t.matched.find((h) => K(h, l)) || r.push(l));
  }
  return [n, o, r];
}
const So = [
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
], Po = ["VET2011"], No = [
  "course:VETS2011",
  "course:VETS2012",
  "subject:Physiology",
  "system:Respiratory_System",
  "system:Exercise",
  "animal:Horse"
], Co = async (e, t) => {
  try {
    return await (await fetch(
      t + "?" + new URLSearchParams({ tag: e })
    )).json();
  } catch (n) {
    console.error("Error fetching data from the server", n), alert("Error fetching data from the server, only display test data.");
  }
}, $o = async (e, t) => {
  try {
    return await Co(e, t) || So.filter(
      (o) => o.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, Oo = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), r = await (await fetch(`${t}?${n}`)).json() ?? Po, f = new Set(r);
    return Array.from(f);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, Ao = { class: "search-results-container" }, To = { class: "container-description" }, xo = { class: "label-badges" }, Io = {
  key: 0,
  class: "results"
}, Do = ["href"], Vo = {
  key: 1,
  class: "no-results"
}, jo = /* @__PURE__ */ J({
  __name: "DisplayResult",
  setup(e) {
    const t = G("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("%cRetrieving data from:", "color: skyblue;", t);
    const n = L([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = jt(), r = L("");
    dt(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, await f(r.value)) : r.value = "undefined";
    });
    const f = async (u) => {
      const d = await $o(u, t);
      d && (n.value = d);
    };
    return je(o.currentRoute, async (u, d) => {
      const l = u.query.tag || "", h = d.query.tag || "";
      l !== h && await f(l);
    }), (u, d) => ($(), O("div", Ao, [
      T("div", To, [
        T("button", {
          onClick: d[0] || (d[0] = () => u.$router.back())
        }, "↵"),
        T("div", xo, " (" + Q(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? ($(), O("div", Io, [
        T("ul", null, [
          ($(!0), O(Y, null, ee(n.value, (l, h) => ($(), O("li", { key: h }, [
            T("a", {
              href: l.url,
              target: "_blank",
              class: "linkToResource"
            }, Q(l.label), 9, Do)
          ]))), 128))
        ])
      ])) : ($(), O("p", Vo, "No results found"))
    ]));
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Ve = /* @__PURE__ */ ue(jo, [["__scopeId", "data-v-8413d12c"]]), It = (e) => (ht("data-v-b97c2a53"), e = e(), pt(), e), Lo = /* @__PURE__ */ It(() => /* @__PURE__ */ T("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }, null, -1)), Mo = /* @__PURE__ */ It(() => /* @__PURE__ */ T("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}, null, -1)), Bo = [
  Lo,
  Mo
], Uo = /* @__PURE__ */ J({
  __name: "CollapseBtn",
  props: { showDropdown: Boolean },
  setup(e) {
    return (t, n) => ($(), O("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      class: Ne(
        e.showDropdown ? "collapse-btn collapse-btn-rotation" : "collapse-btn"
      )
    }, Bo, 2));
  }
}), Dt = /* @__PURE__ */ ue(Uo, [["__scopeId", "data-v-b97c2a53"]]), Ho = (e) => (ht("data-v-74a9761f"), e = e(), pt(), e), qo = { class: "crucible-filter-container" }, Go = {
  key: 0,
  class: "crucible-filter-panel"
}, Ko = /* @__PURE__ */ Ho(() => /* @__PURE__ */ T("hr", null, null, -1)), zo = { class: "crucible-filter-collection" }, Fo = ["onClick"], Wo = { class: "crucible-filters" }, Qo = ["onClick"], Yo = { class: "crucible-filter-dropdown-menu" }, Jo = ["onClick"], Xo = { key: 0 }, Zo = /* @__PURE__ */ J({
  __name: "CrucibleFilter",
  setup(e) {
    const t = L(!1), n = L({}), o = L([]), r = No.reduce(
      (i, a) => {
        const [p, g] = a.split(":");
        return i[p] || (i[p] = []), i[p].push(g.replace("_", " ")), i;
      },
      {}
    ), f = (i) => {
      n.value[i] = !n.value[i];
    }, u = (i, a) => {
      o.value.includes(`${i}:${a.replace(" ", "_")}`) || o.value.push(`${i}:${a.replace(" ", "_")}`);
    }, d = () => {
    }, l = j(() => o.value.map(
      (i) => i.split(":")[1].replace("_", " ")
    )), h = () => {
      n.value = {}, o.value = [];
    }, s = () => {
      console.log("Applying the filter", o);
    };
    return (i, a) => ($(), O("div", qo, [
      t.value ? ($(), O("div", Go, [
        T("div", null, [
          T("button", {
            class: "filter-btn",
            onClick: s
          }, "Apply"),
          T("button", {
            class: "filter-btn",
            onClick: h
          }, "Clear")
        ]),
        Ko,
        T("div", zo, [
          ($(!0), O(Y, null, ee(o.value, (p, g) => ($(), O("span", {
            key: g,
            onClick: (y) => (o.value.splice(g, 1), d)
          }, " ☒ " + Q(p.split(":")[1].replace("_", " ")), 9, Fo))), 128))
        ]),
        T("div", Wo, [
          ($(!0), O(Y, null, ee(W(r), (p, g) => ($(), O("div", {
            key: g,
            class: "crucible-filter-dropdown"
          }, [
            T("h4", {
              onClick: (y) => f(g)
            }, [
              T("span", null, Q(g), 1),
              pe(Dt, {
                "show-dropdown": n.value[g]
              }, null, 8, ["show-dropdown"])
            ], 8, Qo),
            vt(T("ul", Yo, [
              ($(!0), O(Y, null, ee(p, (y, S) => ($(), O("li", {
                key: S,
                class: Ne(l.value.includes(y) ? "selected-filter-tag" : ""),
                onClick: (E) => u(g, y)
              }, Q(y), 11, Jo))), 128))
            ], 512), [
              [zt, n.value[g]]
            ])
          ]))), 128))
        ])
      ])) : Ce("", !0),
      T("button", {
        class: Ne(
          t.value ? "crucible-filter-control svg-background" : "crucible-filter-control"
        ),
        onClick: a[0] || (a[0] = (p) => t.value = !t.value)
      }, [
        t.value ? Ce("", !0) : ($(), O("span", Xo, "Filters"))
      ], 2)
    ]));
  }
}), Vt = /* @__PURE__ */ ue(Zo, [["__scopeId", "data-v-74a9761f"]]), er = { id: "app" }, tr = { class: "main" }, nr = /* @__PURE__ */ J({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = ze("CrucibleSearch"), r = ze("RouterView");
      return $(), O("div", er, [
        T("div", tr, [
          pe(o),
          pe(r),
          T("div", null, [
            pe(Vt)
          ])
        ])
      ]);
    };
  }
}), or = /* @__PURE__ */ ue(nr, [["__scopeId", "data-v-aabb2d26"]]), rr = [
  { path: "/", component: or },
  { path: "/search", component: Ve }
], sr = Ro({
  history: xn("/"),
  routes: rr
});
function jt() {
  const e = G("$router");
  return e || sr;
}
const ar = { class: "search-container" }, ir = { key: 0 }, cr = ["onClick"], lr = 10, ur = /* @__PURE__ */ J({
  __name: "CrucibleSearch",
  setup(e) {
    const t = jt(), n = L(""), o = L([]), r = L(!1), f = L(null), u = G("$tagsApi") || "http://localhost:8080/api/resource/alltags", d = (y) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(y.toLowerCase())
    ), l = (y) => y.replace(/_/g, " "), h = (y) => y.replace(/ /g, "_"), s = async () => {
      n.value ? (o.value = (await Oo(n.value, u)).slice(0, lr), o.value = o.value.map(l), r.value = !0) : (o.value = [], r.value = !1);
    }, i = (y) => {
      n.value = o.value.includes(y) ? y : o.value[0], r.value = !1, t.push({
        path: "/search",
        query: { tag: h(n.value) }
      });
    }, a = () => {
      o.value.length && n.value && (r.value = !0);
    }, p = (y) => {
      y.key === "Enter" ? (i(n.value), n.value = "") : y.key === "Tab" && (y.preventDefault(), n.value = o.value[0] ?? n.value);
    }, g = (y) => {
      f.value && !f.value.contains(y.target) && (r.value = !1);
    };
    return dt(() => {
      document.addEventListener("click", g);
    }), Ft(() => {
      document.removeEventListener("click", g);
    }), (y, S) => ($(), O("div", ar, [
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
          [Wt, n.value]
        ]),
        o.value.length && n.value && r.value ? ($(), O("ul", ir, [
          ($(!0), O(Y, null, ee(o.value, (E) => ($(), O("li", {
            key: E,
            onClick: (b) => i(E)
          }, [
            ($(!0), O(Y, null, ee(E.split(""), (b, C) => ($(), O(Y, null, [
              d(b) ? ($(), O("strong", {
                key: `strong-${C}`
              }, Q(b), 1)) : ($(), O("span", { key: C }, Q(b), 1))
            ], 64))), 256))
          ], 8, cr))), 128))
        ])) : Ce("", !0)
      ], 512)
    ]));
  }
}), fr = /* @__PURE__ */ ue(ur, [["__scopeId", "data-v-5cb7fe60"]]);
function hr(e, t) {
  const { router: n, getApi: o, tagsApi: r } = t;
  e.component("CrucibleSearch", fr), e.component("DisplayResult", Ve), e.component("CrucibleFilter", Vt), e.component("CollapseBtn", Dt), e.provide("$router", n), e.provide("$getApi", o), e.provide("$tagsApi", r), n.addRoute({ path: "/search", component: Ve });
}
export {
  Dt as CollapseBtn,
  Vt as CrucibleFilter,
  fr as CrucibleSearch,
  Ve as DisplayResult,
  hr as createSearchPlugin
};
