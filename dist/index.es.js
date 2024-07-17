import { shallowRef as qt, unref as Z, shallowReactive as Ft, nextTick as Gt, defineComponent as z, reactive as Kt, inject as q, computed as j, h as ft, provide as Se, ref as L, watch as Ve, getCurrentInstance as dt, watchEffect as zt, onMounted as je, openBlock as $, createElementBlock as A, createElementVNode as O, toDisplayString as M, Fragment as Y, renderList as ee, normalizeClass as ge, pushScopeId as ht, popScopeId as pt, createVNode as te, createTextVNode as Wt, withDirectives as gt, vShow as Qt, createCommentVNode as vt, resolveComponent as Ke, onUnmounted as Yt, vModelText as Jt } from "vue";
function Xt() {
  return mt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function mt() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Zt = typeof Proxy == "function", en = "devtools-plugin:setup", tn = "plugin:settings:set";
let X, Ne;
function nn() {
  var e;
  return X !== void 0 || (typeof window < "u" && window.performance ? (X = !0, Ne = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (X = !0, Ne = globalThis.perf_hooks.performance) : X = !1), X;
}
function on() {
  return nn() ? Ne.now() : Date.now();
}
class rn {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const c in t.settings) {
        const d = t.settings[c];
        o[c] = d.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let i = Object.assign({}, o);
    try {
      const c = localStorage.getItem(r), d = JSON.parse(c);
      Object.assign(i, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return i;
      },
      setSettings(c) {
        try {
          localStorage.setItem(r, JSON.stringify(c));
        } catch {
        }
        i = c;
      },
      now() {
        return on();
      }
    }, n && n.on(tn, (c, d) => {
      c === this.plugin.id && this.fallbacks.setSettings(d);
    }), this.proxiedOn = new Proxy({}, {
      get: (c, d) => this.target ? this.target.on[d] : (...u) => {
        this.onQueue.push({
          method: d,
          args: u
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (c, d) => this.target ? this.target[d] : d === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(d) ? (...u) => (this.targetQueue.push({
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
function sn(e, t) {
  const n = e, o = mt(), r = Xt(), i = Zt && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    r.emit(en, e, t);
  else {
    const c = i ? new rn(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: c
    }), c && t(c.proxiedTarget);
  }
}
/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const H = typeof document < "u";
function an(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const C = Object.assign;
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
function S(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const yt = /#/g, cn = /&/g, ln = /\//g, un = /=/g, fn = /\?/g, _t = /\+/g, dn = /%5B/g, hn = /%5D/g, Et = /%5E/g, pn = /%60/g, bt = /%7B/g, gn = /%7C/g, wt = /%7D/g, vn = /%20/g;
function Le(e) {
  return encodeURI("" + e).replace(gn, "|").replace(dn, "[").replace(hn, "]");
}
function mn(e) {
  return Le(e).replace(bt, "{").replace(wt, "}").replace(Et, "^");
}
function Oe(e) {
  return Le(e).replace(_t, "%2B").replace(vn, "+").replace(yt, "%23").replace(cn, "%26").replace(pn, "`").replace(bt, "{").replace(wt, "}").replace(Et, "^");
}
function yn(e) {
  return Oe(e).replace(un, "%3D");
}
function _n(e) {
  return Le(e).replace(yt, "%23").replace(fn, "%3F");
}
function En(e) {
  return e == null ? "" : _n(e).replace(ln, "%2F");
}
function ne(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && S(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const bn = /\/$/, wn = (e) => e.replace(bn, "");
function Pe(e, t, n = "/") {
  let o, r = {}, i = "", c = "";
  const d = t.indexOf("#");
  let u = t.indexOf("?");
  return d < u && d >= 0 && (u = -1), u > -1 && (o = t.slice(0, u), i = t.slice(u + 1, d > -1 ? d : t.length), r = e(i)), d > -1 && (o = o || t.slice(0, d), c = t.slice(d, t.length)), o = kn(o ?? t, n), {
    fullPath: o + (i && "?") + i + c,
    path: o,
    query: r,
    hash: ne(c)
  };
}
function Rn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ze(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function We(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && K(t.matched[o], n.matched[r]) && Rt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function K(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Rt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Sn(e[n], t[n]))
      return !1;
  return !0;
}
function Sn(e, t) {
  return V(e) ? Qe(e, t) : V(t) ? Qe(t, e) : e === t;
}
function Qe(e, t) {
  return V(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function kn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return S(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let i = n.length - 1, c, d;
  for (c = 0; c < o.length; c++)
    if (d = o[c], d !== ".")
      if (d === "..")
        i > 1 && i--;
      else
        break;
  return n.slice(0, i).join("/") + "/" + o.slice(c).join("/");
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
    if (H) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), wn(e);
}
const Cn = /^[^#]+#/;
function Nn(e, t) {
  return e.replace(Cn, "#") + t;
}
function On(e, t) {
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
function $n(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const i = document.querySelector(e.el);
        if (o && i) {
          S(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        S(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const r = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) {
      process.env.NODE_ENV !== "production" && S(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = On(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Ye(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const $e = /* @__PURE__ */ new Map();
function An(e, t) {
  $e.set(e, t);
}
function Tn(e) {
  const t = $e.get(e);
  return $e.delete(e), t;
}
let xn = () => location.protocol + "//" + location.host;
function St(e, t) {
  const { pathname: n, search: o, hash: r } = t, i = e.indexOf("#");
  if (i > -1) {
    let d = r.includes(e.slice(i)) ? e.slice(i).length : 1, u = r.slice(d);
    return u[0] !== "/" && (u = "/" + u), ze(u, "");
  }
  return ze(n, e) + o + r;
}
function Dn(e, t, n, o) {
  let r = [], i = [], c = null;
  const d = ({ state: a }) => {
    const p = St(e, location), m = n.value, _ = t.value;
    let b = 0;
    if (a) {
      if (n.value = p, t.value = a, c && c === m) {
        c = null;
        return;
      }
      b = _ ? a.position - _.position : 0;
    } else
      o(p);
    r.forEach((E) => {
      E(n.value, m, {
        delta: b,
        type: ue.pop,
        direction: b ? b > 0 ? le.forward : le.back : le.unknown
      });
    });
  };
  function u() {
    c = n.value;
  }
  function h(a) {
    r.push(a);
    const p = () => {
      const m = r.indexOf(a);
      m > -1 && r.splice(m, 1);
    };
    return i.push(p), p;
  }
  function s() {
    const { history: a } = window;
    a.state && a.replaceState(C({}, a.state, { scroll: me() }), "");
  }
  function f() {
    for (const a of i)
      a();
    i = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: u,
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
function In(e) {
  const { history: t, location: n } = window, o = {
    value: St(e, n)
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
  function i(u, h, s) {
    const f = e.indexOf("#"), a = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + u : xn() + e + u;
    try {
      t[s ? "replaceState" : "pushState"](h, "", a), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? S("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](a);
    }
  }
  function c(u, h) {
    const s = C({}, t.state, Je(
      r.value.back,
      // keep back and forward entries but override current position
      u,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    i(u, s, !0), o.value = u;
  }
  function d(u, h) {
    const s = C(
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
    process.env.NODE_ENV !== "production" && !t.state && S(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), i(s.current, s, !0);
    const f = C({}, Je(o.value, u, null), { position: s.position + 1 }, h);
    i(u, f, !1), o.value = u;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: c
  };
}
function Vn(e) {
  e = Pn(e);
  const t = In(e), n = Dn(e, t.state, t.location, t.replace);
  function o(i, c = !0) {
    c || n.pauseListeners(), history.go(i);
  }
  const r = C({
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
function ve(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function kt(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const F = {
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
const jn = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Mn(t)}" via a navigation guard.`;
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
  return process.env.NODE_ENV !== "production" ? C(new Error(jn[e](t)), {
    type: e,
    [Ae]: !0
  }, t) : C(new Error(), {
    type: e,
    [Ae]: !0
  }, t);
}
function U(e, t) {
  return e instanceof Error && Ae in e && (t == null || !!(e.type & t));
}
const Ln = ["params", "query", "hash"];
function Mn(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of Ln)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Ze = "[^/]+?", Bn = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Un = /[.+*?^${}()[\]/\\]/g;
function Hn(e, t) {
  const n = C({}, Bn, t), o = [];
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
        f || (r += "/"), r += a.value.replace(Un, "\\$&"), p += 40;
      else if (a.type === 1) {
        const { value: m, repeatable: _, optional: b, regexp: E } = a;
        i.push({
          name: m,
          repeatable: _,
          optional: b
        });
        const w = E || Ze;
        if (w !== Ze) {
          p += 10;
          try {
            new RegExp(`(${w})`);
          } catch (I) {
            throw new Error(`Invalid custom RegExp for param "${m}" (${w}): ` + I.message);
          }
        }
        let N = _ ? `((?:${w})(?:/(?:${w}))*)` : `(${w})`;
        f || (N = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        b && h.length < 2 ? `(?:/${N})` : "/" + N), b && (N += "?"), r += N, p += 20, b && (p += -8), _ && (p += -20), w === ".*" && (p += -50);
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
  const c = new RegExp(r, n.sensitive ? "" : "i");
  function d(h) {
    const s = h.match(c), f = {};
    if (!s)
      return null;
    for (let a = 1; a < s.length; a++) {
      const p = s[a] || "", m = i[a - 1];
      f[m.name] = p && m.repeatable ? p.split("/") : p;
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
          const { value: m, repeatable: _, optional: b } = p, E = m in h ? h[m] : "";
          if (V(E) && !_)
            throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);
          const w = V(E) ? E.join("/") : E;
          if (!w)
            if (b)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : f = !0);
            else
              throw new Error(`Missing required param "${m}"`);
          s += w;
        }
    }
    return s || "/";
  }
  return {
    re: c,
    score: o,
    keys: i,
    parse: d,
    stringify: u
  };
}
function qn(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function Fn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const i = qn(o[n], r[n]);
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
  let i;
  function c() {
    i && r.push(i), i = [];
  }
  let d = 0, u, h = "", s = "";
  function f() {
    h && (n === 0 ? i.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (i.length > 1 && (u === "*" || u === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), i.push({
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
        u === "/" ? (h && f(), c()) : u === ":" ? (f(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        u === "(" ? n = 2 : Kn.test(u) ? a() : (f(), n = 0, u !== "*" && u !== "?" && u !== "+" && d--);
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
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), f(), c(), r;
}
function Wn(e, t, n) {
  const o = Hn(zn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const i = /* @__PURE__ */ new Set();
    for (const c of o.keys)
      i.has(c.name) && S(`Found duplicated params with name "${c.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), i.add(c.name);
  }
  const r = C(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Qn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = ot({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function i(s, f, a) {
    const p = !a, m = Yn(s);
    process.env.NODE_ENV !== "production" && eo(m, f), m.aliasOf = a && a.record;
    const _ = ot(t, s), b = [
      m
    ];
    if ("alias" in s) {
      const N = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const I of N)
        b.push(C({}, m, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: a ? a.record.components : m.components,
          path: I,
          // we might be the child of an alias
          aliasOf: a ? a.record : m
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let E, w;
    for (const N of b) {
      const { path: I } = N;
      if (f && I[0] !== "/") {
        const W = f.record.path, B = W[W.length - 1] === "/" ? "" : "/";
        N.path = f.record.path + (I && B + I);
      }
      if (process.env.NODE_ENV !== "production" && N.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (E = Wn(N, f, _), process.env.NODE_ENV !== "production" && f && I[0] === "/" && to(E, f), a ? (a.alias.push(E), process.env.NODE_ENV !== "production" && Zn(a, E)) : (w = w || E, w !== E && w.alias.push(E), p && s.name && !nt(E) && c(s.name)), m.children) {
        const W = m.children;
        for (let B = 0; B < W.length; B++)
          i(W[B], E, a && a.children[B]);
      }
      a = a || E, (E.record.components && Object.keys(E.record.components).length || E.record.name || E.record.redirect) && u(E);
    }
    return w ? () => {
      c(w);
    } : ce;
  }
  function c(s) {
    if (kt(s)) {
      const f = o.get(s);
      f && (o.delete(s), n.splice(n.indexOf(f), 1), f.children.forEach(c), f.alias.forEach(c));
    } else {
      const f = n.indexOf(s);
      f > -1 && (n.splice(f, 1), s.record.name && o.delete(s.record.name), s.children.forEach(c), s.alias.forEach(c));
    }
  }
  function d() {
    return n;
  }
  function u(s) {
    let f = 0;
    for (; f < n.length && Fn(s, n[f]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[f].record.path || !Pt(s, n[f])); )
      f++;
    n.splice(f, 0, s), s.record.name && !nt(s) && o.set(s.record.name, s);
  }
  function h(s, f) {
    let a, p = {}, m, _;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw oe(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const w = Object.keys(s.params || {}).filter((N) => !a.keys.find((I) => I.name === N));
        w.length && S(`Discarded invalid param(s) "${w.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      _ = a.record.name, p = C(
        // paramsFromLocation is a new object
        tt(
          f.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          a.keys.filter((w) => !w.optional).concat(a.parent ? a.parent.keys.filter((w) => w.optional) : []).map((w) => w.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && tt(s.params, a.keys.map((w) => w.name))
      ), m = a.stringify(p);
    } else if (s.path != null)
      m = s.path, process.env.NODE_ENV !== "production" && !m.startsWith("/") && S(`The Matcher cannot resolve relative paths but received "${m}". Unless you directly called \`matcher.resolve("${m}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((w) => w.re.test(m)), a && (p = a.parse(m), _ = a.record.name);
    else {
      if (a = f.name ? o.get(f.name) : n.find((w) => w.re.test(f.path)), !a)
        throw oe(1, {
          location: s,
          currentLocation: f
        });
      _ = a.record.name, p = C({}, f.params, s.params), m = a.stringify(p);
    }
    const b = [];
    let E = a;
    for (; E; )
      b.unshift(E.record), E = E.parent;
    return {
      name: _,
      path: m,
      params: p,
      matched: b,
      meta: Xn(b)
    };
  }
  return e.forEach((s) => i(s)), { addRoute: i, resolve: h, removeRoute: c, getRoutes: d, getRecordMatcher: r };
}
function tt(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Yn(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Jn(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Jn(e) {
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
function Xn(e) {
  return e.reduce((t, n) => C(t, n.meta), {});
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
function Zn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Te.bind(null, n)))
      return S(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Te.bind(null, n)))
      return S(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function eo(e, t) {
  t && t.record.name && !e.name && !e.path && S(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function to(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Te.bind(null, n)))
      return S(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Pt(e, t) {
  return t.children.some((n) => n === e || Pt(e, n));
}
function no(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const i = o[r].replace(_t, " "), c = i.indexOf("="), d = ne(c < 0 ? i : i.slice(0, c)), u = c < 0 ? null : ne(i.slice(c + 1));
    if (d in t) {
      let h = t[d];
      V(h) || (h = t[d] = [h]), h.push(u);
    } else
      t[d] = u;
  }
  return t;
}
function rt(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = yn(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (V(o) ? o.map((i) => i && Oe(i)) : [o && Oe(o)]).forEach((i) => {
      i !== void 0 && (t += (t.length ? "&" : "") + n, i != null && (t += "=" + i));
    });
  }
  return t;
}
function oo(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = V(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const ro = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), st = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Me = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Ct = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), xe = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
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
function G(e, t, n, o, r, i = (c) => c()) {
  const c = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((d, u) => {
    const h = (a) => {
      a === !1 ? u(oe(4, {
        from: n,
        to: t
      })) : a instanceof Error ? u(a) : ve(a) ? u(oe(2, {
        from: t,
        to: a
      })) : (c && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === c && typeof a == "function" && c.push(a), d());
    }, s = i(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? so(h, t, n) : h));
    let f = Promise.resolve(s);
    if (e.length < 3 && (f = f.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        f = f.then((p) => h._called ? p : (S(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        S(a), u(new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((a) => u(a));
  });
}
function so(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && S(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Ce(e, t, n, o, r = (i) => i()) {
  const i = [];
  for (const c of e) {
    process.env.NODE_ENV !== "production" && !c.components && !c.children.length && S(`Record with path "${c.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in c.components) {
      let u = c.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!u || typeof u != "object" && typeof u != "function")
          throw S(`Component "${d}" in record with path "${c.path}" is not a valid component. Received "${String(u)}".`), new Error("Invalid route component");
        if ("then" in u) {
          S(`Component "${d}" in record with path "${c.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = u;
          u = () => h;
        } else
          u.__asyncLoader && // warn only once per component
          !u.__warnedDefineAsync && (u.__warnedDefineAsync = !0, S(`Component "${d}" in record with path "${c.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !c.instances[d]))
        if (ao(u)) {
          const s = (u.__vccOpts || u)[t];
          s && i.push(G(s, n, o, c, d, r));
        } else {
          let h = u();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (S(`Component "${d}" in record with path "${c.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), i.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${c.path}"`));
            const f = an(s) ? s.default : s;
            c.components[d] = f;
            const p = (f.__vccOpts || f)[t];
            return p && G(p, n, o, c, d, r)();
          }));
        }
    }
  }
  return i;
}
function ao(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function at(e) {
  const t = q(Me), n = q(Ct);
  let o = !1, r = null;
  const i = j(() => {
    const s = Z(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (ve(s) || (o ? S(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : S(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), c = j(() => {
    const { matched: s } = i.value, { length: f } = s, a = s[f - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const m = p.findIndex(K.bind(null, a));
    if (m > -1)
      return m;
    const _ = it(s[f - 2]);
    return (
      // we are dealing with nested routes
      f > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      it(a) === _ && // avoid comparing the child with its parent
      p[p.length - 1].path !== _ ? p.findIndex(K.bind(null, s[f - 2])) : m
    );
  }), d = j(() => c.value > -1 && uo(n.params, i.value.params)), u = j(() => c.value > -1 && c.value === n.matched.length - 1 && Rt(n.params, i.value.params));
  function h(s = {}) {
    return lo(s) ? t[Z(e.replace) ? "replace" : "push"](
      Z(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ce) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && H) {
    const s = dt();
    if (s) {
      const f = {
        route: i.value,
        isActive: d.value,
        isExactActive: u.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(f), zt(() => {
        f.route = i.value, f.isActive = d.value, f.isExactActive = u.value, f.error = ve(Z(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: i,
    href: j(() => i.value.href),
    isActive: d,
    isExactActive: u,
    navigate: h
  };
}
const io = /* @__PURE__ */ z({
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
    const n = Kt(at(e)), { options: o } = q(Me), r = j(() => ({
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
}), co = io;
function lo(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function uo(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!V(r) || r.length !== o.length || o.some((i, c) => i !== r[c]))
      return !1;
  }
  return !0;
}
function it(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const ct = (e, t, n) => e ?? t ?? n, fo = /* @__PURE__ */ z({
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
    process.env.NODE_ENV !== "production" && po();
    const o = q(xe), r = j(() => e.route || o.value), i = q(st, 0), c = j(() => {
      let h = Z(i);
      const { matched: s } = r.value;
      let f;
      for (; (f = s[h]) && !f.components; )
        h++;
      return h;
    }), d = j(() => r.value.matched[c.value]);
    Se(st, j(() => c.value + 1)), Se(ro, d), Se(xe, r);
    const u = L();
    return Ve(() => [u.value, d.value, e.name], ([h, s, f], [a, p, m]) => {
      s && (s.instances[f] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !K(s, p) || !a) && (s.enterCallbacks[f] || []).forEach((_) => _(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, f = d.value, a = f && f.components[s];
      if (!a)
        return lt(n.default, { Component: a, route: h });
      const p = f.props[s], m = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, b = ft(a, C({}, m, t, {
        onVnodeUnmounted: (E) => {
          E.component.isUnmounted && (f.instances[s] = null);
        },
        ref: u
      }));
      if (process.env.NODE_ENV !== "production" && H && b.ref) {
        const E = {
          depth: c.value,
          name: f.name,
          path: f.path,
          meta: f.meta
        };
        (V(b.ref) ? b.ref.map((N) => N.i) : [b.ref.i]).forEach((N) => {
          N.__vrv_devtools = E;
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
const ho = fo;
function po() {
  const e = dt(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    S(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
  }
}
function ie(e, t) {
  const n = C({}, e, {
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
let go = 0;
function vo(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = go++;
  sn({
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
          backgroundColor: Nt
        });
      }
      V(f.__vrl_devtools) && (f.__devtoolsApi = r, f.__vrl_devtools.forEach((a) => {
        let p = a.route.path, m = At, _ = "", b = 0;
        a.error ? (p = a.error, m = bo, b = wo) : a.isExactActive ? (m = $t, _ = "This is exactly active") : a.isActive && (m = Ot, _ = "This link is active"), s.tags.push({
          label: p,
          textColor: b,
          tooltip: _,
          backgroundColor: m
        });
      }));
    }), Ve(t.currentRoute, () => {
      u(), r.notifyComponentUpdate(), r.sendInspectorTree(d), r.sendInspectorState(d);
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
    let c = 0;
    t.beforeEach((s, f) => {
      const a = {
        guard: pe("beforeEach"),
        from: ie(f, "Current Location during this navigation"),
        to: ie(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: c++
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
    function u() {
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
      h = s, s.app === e && s.inspectorId === d && u();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === d) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        a && (s.state = {
          options: yo(a)
        });
      }
    }), r.sendInspectorTree(d), r.sendInspectorState(d);
  });
}
function mo(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function yo(e) {
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
        display: e.keys.map((o) => `${o.name}${mo(o)}`).join(" "),
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
const Nt = 15485081, Ot = 2450411, $t = 8702998, _o = 2282478, At = 16486972, Eo = 6710886, bo = 16704226, wo = 12131356;
function Tt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: _o
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: At
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
    backgroundColor: Ot
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: Eo
  });
  let o = n.__vd_id;
  return o == null && (o = String(Ro++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Tt)
  };
}
let Ro = 0;
const So = /^\/(.*)\/([a-z]*)$/;
function xt(e, t) {
  const n = t.matched.length && K(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => K(o, e.record))), e.children.forEach((o) => xt(o, t));
}
function Dt(e) {
  e.__vd_match = !1, e.children.forEach(Dt);
}
function De(e, t) {
  const n = String(e.re).match(So);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((c) => De(c, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), i = ne(r);
  return !t.startsWith("/") && (i.includes(t) || r.includes(t)) || i.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((c) => De(c, t));
}
function ko(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function Po(e) {
  const t = Qn(e.routes, e), n = e.parseQuery || no, o = e.stringifyQuery || rt, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const i = ae(), c = ae(), d = ae(), u = qt(F);
  let h = F;
  H && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = ke.bind(null, (l) => "" + l), f = ke.bind(null, En), a = (
    // @ts-expect-error: intentionally avoid the type check
    ke.bind(null, ne)
  );
  function p(l, v) {
    let g, y;
    return kt(l) ? (g = t.getRecordMatcher(l), process.env.NODE_ENV !== "production" && !g && S(`Parent route "${String(l)}" not found when adding child route`, v), y = v) : y = l, t.addRoute(y, g);
  }
  function m(l) {
    const v = t.getRecordMatcher(l);
    v ? t.removeRoute(v) : process.env.NODE_ENV !== "production" && S(`Cannot remove non-existent route "${String(l)}"`);
  }
  function _() {
    return t.getRoutes().map((l) => l.record);
  }
  function b(l) {
    return !!t.getRecordMatcher(l);
  }
  function E(l, v) {
    if (v = C({}, v || u.value), typeof l == "string") {
      const R = Pe(n, l, v.path), T = t.resolve({ path: R.path }, v), Q = r.createHref(R.fullPath);
      return process.env.NODE_ENV !== "production" && (Q.startsWith("//") ? S(`Location "${l}" resolved to "${Q}". A resolved location cannot start with multiple slashes.`) : T.matched.length || S(`No match found for location with path "${l}"`)), C(R, T, {
        params: a(T.params),
        hash: ne(R.hash),
        redirectedFrom: void 0,
        href: Q
      });
    }
    process.env.NODE_ENV !== "production" && !ve(l) && (S(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, l), l = {});
    let g;
    if (l.path != null)
      process.env.NODE_ENV !== "production" && "params" in l && !("name" in l) && // @ts-expect-error: the type is never
      Object.keys(l.params).length && S(`Path "${l.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), g = C({}, l, {
        path: Pe(n, l.path, v.path).path
      });
    else {
      const R = C({}, l.params);
      for (const T in R)
        R[T] == null && delete R[T];
      g = C({}, l, {
        params: f(R)
      }), v.params = f(v.params);
    }
    const y = t.resolve(g, v), P = l.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && S(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), y.params = s(a(y.params));
    const x = Rn(o, C({}, l, {
      hash: mn(P),
      path: y.path
    })), k = r.createHref(x);
    return process.env.NODE_ENV !== "production" && (k.startsWith("//") ? S(`Location "${l}" resolved to "${k}". A resolved location cannot start with multiple slashes.`) : y.matched.length || S(`No match found for location with path "${l.path != null ? l.path : l}"`)), C({
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
        o === rt ? oo(l.query) : l.query || {}
      )
    }, y, {
      redirectedFrom: void 0,
      href: k
    });
  }
  function w(l) {
    return typeof l == "string" ? Pe(n, l, u.value.path) : C({}, l);
  }
  function N(l, v) {
    if (h !== l)
      return oe(8, {
        from: v,
        to: l
      });
  }
  function I(l) {
    return re(l);
  }
  function W(l) {
    return I(C(w(l), { replace: !0 }));
  }
  function B(l) {
    const v = l.matched[l.matched.length - 1];
    if (v && v.redirect) {
      const { redirect: g } = v;
      let y = typeof g == "function" ? g(l) : g;
      if (typeof y == "string" && (y = y.includes("?") || y.includes("#") ? y = w(y) : (
        // force empty params
        { path: y }
      ), y.params = {}), process.env.NODE_ENV !== "production" && y.path == null && !("name" in y))
        throw S(`Invalid redirect found:
${JSON.stringify(y, null, 2)}
 when navigating to "${l.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return C({
        query: l.query,
        hash: l.hash,
        // avoid transferring params if the redirect has a path
        params: y.path != null ? {} : l.params
      }, y);
    }
  }
  function re(l, v) {
    const g = h = E(l), y = u.value, P = l.state, x = l.force, k = l.replace === !0, R = B(g);
    if (R)
      return re(
        C(w(R), {
          state: typeof R == "object" ? C({}, P, R.state) : P,
          force: x,
          replace: k
        }),
        // keep original redirectedFrom if it exists
        v || g
      );
    const T = g;
    T.redirectedFrom = v;
    let Q;
    return !x && We(o, y, g) && (Q = oe(16, { to: T, from: y }), Fe(
      y,
      y,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (Q ? Promise.resolve(Q) : Be(T, y)).catch((D) => U(D) ? (
      // navigation redirects still mark the router as ready
      U(
        D,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? D : be(D)
    ) : (
      // reject any unknown error
      Ee(D, T, y)
    )).then((D) => {
      if (D) {
        if (U(
          D,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          We(o, E(D.to), T) && // and we have done it a couple of times
          v && // @ts-expect-error: added only in dev
          (v._count = v._count ? (
            // @ts-expect-error
            v._count + 1
          ) : 1) > 30 ? (S(`Detected a possibly infinite redirection in a navigation guard when going from "${y.fullPath}" to "${T.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : re(
            // keep options
            C({
              // preserve an existing replacement but allow the redirect to override it
              replace: k
            }, w(D.to), {
              state: typeof D.to == "object" ? C({}, P, D.to.state) : P,
              force: x
            }),
            // preserve the original redirectedFrom if any
            v || T
          );
      } else
        D = He(T, y, !0, k, P);
      return Ue(T, y, D), D;
    });
  }
  function Bt(l, v) {
    const g = N(l, v);
    return g ? Promise.reject(g) : Promise.resolve();
  }
  function ye(l) {
    const v = he.values().next().value;
    return v && typeof v.runWithContext == "function" ? v.runWithContext(l) : l();
  }
  function Be(l, v) {
    let g;
    const [y, P, x] = Co(l, v);
    g = Ce(y.reverse(), "beforeRouteLeave", l, v);
    for (const R of y)
      R.leaveGuards.forEach((T) => {
        g.push(G(T, l, v));
      });
    const k = Bt.bind(null, l, v);
    return g.push(k), J(g).then(() => {
      g = [];
      for (const R of i.list())
        g.push(G(R, l, v));
      return g.push(k), J(g);
    }).then(() => {
      g = Ce(P, "beforeRouteUpdate", l, v);
      for (const R of P)
        R.updateGuards.forEach((T) => {
          g.push(G(T, l, v));
        });
      return g.push(k), J(g);
    }).then(() => {
      g = [];
      for (const R of x)
        if (R.beforeEnter)
          if (V(R.beforeEnter))
            for (const T of R.beforeEnter)
              g.push(G(T, l, v));
          else
            g.push(G(R.beforeEnter, l, v));
      return g.push(k), J(g);
    }).then(() => (l.matched.forEach((R) => R.enterCallbacks = {}), g = Ce(x, "beforeRouteEnter", l, v, ye), g.push(k), J(g))).then(() => {
      g = [];
      for (const R of c.list())
        g.push(G(R, l, v));
      return g.push(k), J(g);
    }).catch((R) => U(
      R,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? R : Promise.reject(R));
  }
  function Ue(l, v, g) {
    d.list().forEach((y) => ye(() => y(l, v, g)));
  }
  function He(l, v, g, y, P) {
    const x = N(l, v);
    if (x)
      return x;
    const k = v === F, R = H ? history.state : {};
    g && (y || k ? r.replace(l.fullPath, C({
      scroll: k && R && R.scroll
    }, P)) : r.push(l.fullPath, P)), u.value = l, Fe(l, v, g, k), be();
  }
  let se;
  function Ut() {
    se || (se = r.listen((l, v, g) => {
      if (!Ge.listening)
        return;
      const y = E(l), P = B(y);
      if (P) {
        re(C(P, { replace: !0 }), y).catch(ce);
        return;
      }
      h = y;
      const x = u.value;
      H && An(Ye(x.fullPath, g.delta), me()), Be(y, x).catch((k) => U(
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
      ).then((R) => {
        U(
          R,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !g.delta && g.type === ue.pop && r.go(-1, !1);
      }).catch(ce), Promise.reject()) : (g.delta && r.go(-g.delta, !1), Ee(k, y, x))).then((k) => {
        k = k || He(
          // after navigation, all matched components are resolved
          y,
          x,
          !1
        ), k && (g.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !U(
          k,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-g.delta, !1) : g.type === ue.pop && U(
          k,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Ue(y, x, k);
      }).catch(ce);
    }));
  }
  let _e = ae(), qe = ae(), de;
  function Ee(l, v, g) {
    be(l);
    const y = qe.list();
    return y.length ? y.forEach((P) => P(l, v, g)) : (process.env.NODE_ENV !== "production" && S("uncaught error during route navigation:"), console.error(l)), Promise.reject(l);
  }
  function Ht() {
    return de && u.value !== F ? Promise.resolve() : new Promise((l, v) => {
      _e.add([l, v]);
    });
  }
  function be(l) {
    return de || (de = !l, Ut(), _e.list().forEach(([v, g]) => l ? g(l) : v()), _e.reset()), l;
  }
  function Fe(l, v, g, y) {
    const { scrollBehavior: P } = e;
    if (!H || !P)
      return Promise.resolve();
    const x = !g && Tn(Ye(l.fullPath, 0)) || (y || !g) && history.state && history.state.scroll || null;
    return Gt().then(() => P(l, v, x)).then((k) => k && $n(k)).catch((k) => Ee(k, l, v));
  }
  const we = (l) => r.go(l);
  let Re;
  const he = /* @__PURE__ */ new Set(), Ge = {
    currentRoute: u,
    listening: !0,
    addRoute: p,
    removeRoute: m,
    hasRoute: b,
    getRoutes: _,
    resolve: E,
    options: e,
    push: I,
    replace: W,
    go: we,
    back: () => we(-1),
    forward: () => we(1),
    beforeEach: i.add,
    beforeResolve: c.add,
    afterEach: d.add,
    onError: qe.add,
    isReady: Ht,
    install(l) {
      const v = this;
      l.component("RouterLink", co), l.component("RouterView", ho), l.config.globalProperties.$router = v, Object.defineProperty(l.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Z(u)
      }), H && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !Re && u.value === F && (Re = !0, I(r.location).catch((P) => {
        process.env.NODE_ENV !== "production" && S("Unexpected error when starting the router:", P);
      }));
      const g = {};
      for (const P in F)
        Object.defineProperty(g, P, {
          get: () => u.value[P],
          enumerable: !0
        });
      l.provide(Me, v), l.provide(Ct, Ft(g)), l.provide(xe, u);
      const y = l.unmount;
      he.add(l), l.unmount = function() {
        he.delete(l), he.size < 1 && (h = F, se && se(), se = null, u.value = F, Re = !1, de = !1), y();
      }, process.env.NODE_ENV !== "production" && H && vo(l, v, t);
    }
  };
  function J(l) {
    return l.reduce((v, g) => v.then(() => ye(g)), Promise.resolve());
  }
  return Ge;
}
function Co(e, t) {
  const n = [], o = [], r = [], i = Math.max(t.matched.length, e.matched.length);
  for (let c = 0; c < i; c++) {
    const d = t.matched[c];
    d && (e.matched.find((h) => K(h, d)) ? o.push(d) : n.push(d));
    const u = e.matched[c];
    u && (t.matched.find((h) => K(h, u)) || r.push(u));
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
], Oo = ["VET2011"], $o = [
  { "course:VETS2011": 10 },
  { "course:VETS2012": 10 },
  { "course:VETS3012": 10 },
  { "course:VETS4012": 10 },
  { "subject:Physiology": 20 },
  { "system:Respiratory_System": 15 },
  { "system:Exercise": 20 },
  { "animal:Horse": 10 }
], Ao = async (e, t) => {
  try {
    return await (await fetch(
      t + "?" + new URLSearchParams({ tag: e })
    )).json();
  } catch (n) {
    console.error("Error fetching data from the server", n), alert("Error fetching data from the server, only display test data.");
  }
}, To = async (e, t) => {
  try {
    return await Ao(e, t) || No.filter(
      (o) => o.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, xo = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), r = await (await fetch(`${t}?${n}`)).json() ?? Oo, i = new Set(r);
    return Array.from(i);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, Do = async (e) => {
  try {
    return await (await fetch(e)).json();
  } catch (t) {
    return alert(
      "An error occurred while fetching tags" + t + "fallback to static tags"
    ), {};
  }
}, Io = async (e) => {
  const t = await Do(e), n = Object.keys(t).map((o) => ({
    [o]: t[o]
  }));
  return It(n);
}, It = (e) => e ? e.reduce(
  (t, n) => {
    const [o, r] = Object.keys(n)[0].split(":"), i = Object.values(n)[0];
    return t[o] || (t[o] = []), t[o].push({ [r.replace("_", " ")]: i }), t;
  },
  {}
) : {}, Vo = It($o), jo = { class: "search-results-container" }, Lo = { class: "container-description" }, Mo = { class: "label-badges" }, Bo = {
  key: 0,
  class: "results"
}, Uo = ["href"], Ho = {
  key: 1,
  class: "no-results"
}, qo = /* @__PURE__ */ z({
  __name: "DisplayResult",
  setup(e) {
    const t = q("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("Retrieving data from:", t);
    const n = L([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = Mt(), r = L("");
    je(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, await i(r.value)) : r.value = "undefined";
    });
    const i = async (c) => {
      const d = await To(c, t);
      d && (n.value = d);
    };
    return Ve(o.currentRoute, async (c, d) => {
      const u = c.query.tag || "", h = d.query.tag || "";
      u !== h && await i(u);
    }), (c, d) => ($(), A("div", jo, [
      O("div", Lo, [
        O("button", {
          onClick: d[0] || (d[0] = () => c.$router.back())
        }, "↵"),
        O("div", Mo, " (" + M(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? ($(), A("div", Bo, [
        O("ul", null, [
          ($(!0), A(Y, null, ee(n.value, (u, h) => ($(), A("li", { key: h }, [
            O("a", {
              href: u.url,
              target: "_blank",
              class: "linkToResource"
            }, M(u.label), 9, Uo)
          ]))), 128))
        ])
      ])) : ($(), A("p", Ho, "No results found"))
    ]));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Ie = /* @__PURE__ */ fe(qo, [["__scopeId", "data-v-ae262433"]]), Vt = (e) => (ht("data-v-b97c2a53"), e = e(), pt(), e), Fo = /* @__PURE__ */ Vt(() => /* @__PURE__ */ O("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }, null, -1)), Go = /* @__PURE__ */ Vt(() => /* @__PURE__ */ O("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}, null, -1)), Ko = [
  Fo,
  Go
], zo = /* @__PURE__ */ z({
  __name: "CollapseBtn",
  props: { showDropdown: Boolean },
  setup(e) {
    return (t, n) => ($(), A("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      class: ge(
        e.showDropdown ? "collapse-btn collapse-btn-rotation" : "collapse-btn"
      )
    }, Ko, 2));
  }
}), jt = /* @__PURE__ */ fe(zo, [["__scopeId", "data-v-b97c2a53"]]), ut = /* @__PURE__ */ z({
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
    }, i = j(() => r[o] || "Default");
    return (c, d) => ($(), A("button", {
      class: "filter-btn",
      onClick: d[0] || (d[0] = (u) => n("click", c.actionType))
    }, M(i.value), 1));
  }
}), Wo = (e) => (ht("data-v-eefe5a08"), e = e(), pt(), e), Qo = { class: "crucible-filter-container" }, Yo = {
  key: 0,
  class: "crucible-filter-panel"
}, Jo = { class: "crucible-filter-action" }, Xo = /* @__PURE__ */ Wo(() => /* @__PURE__ */ O("hr", null, null, -1)), Zo = { class: "crucible-filter-collection" }, er = ["onClick"], tr = { class: "capital-first" }, nr = { class: "crucible-filters" }, or = ["onClick"], rr = { class: "crucible-filter-dropdown-menu" }, sr = ["value", "onClick"], ar = { for: "tag&{key}&{index.toString()}" }, ir = /* @__PURE__ */ z({
  __name: "CrucibleFilter",
  emits: ["updateFilterTagArray"],
  setup(e, { emit: t }) {
    const n = t, o = q("$filterSetApi") || "http://localhost:8080/api/resource/getFilterSet", r = L(!1), i = L({}), c = L([]), d = L({}), u = (p) => {
      i.value[p] = !i.value[p];
    }, h = (p, m) => {
      const _ = `${p}:${m.replace(" ", "_")}`;
      c.value.includes(_) ? c.value = c.value.filter(
        (b) => b !== _
      ) : c.value.push(_);
    }, s = j(() => c.value.map(
      (p) => p.split(":")[1].replace("_", " ")
    )), f = () => {
      i.value = {}, c.value = [];
    }, a = () => {
      n("updateFilterTagArray", c);
    };
    return je(async () => {
      const p = await Io(o);
      d.value = Object.keys(p).length > 0 ? p : Vo;
    }), (p, m) => ($(), A("div", Qo, [
      r.value ? ($(), A("div", Yo, [
        O("div", Jo, [
          te(ut, {
            "action-type": "apply",
            onClick: a
          }),
          te(ut, {
            "action-type": "clear",
            onClick: f
          })
        ]),
        Xo,
        O("div", Zo, [
          ($(!0), A(Y, null, ee(c.value, (_, b) => ($(), A("span", {
            key: b,
            onClick: (E) => c.value.splice(b, 1)
          }, [
            Wt(" ☒ "),
            O("strong", null, M(_.split(":")[0]), 1),
            O("span", tr, M(_.split(":")[1].replace("_", " ")), 1)
          ], 8, er))), 128))
        ]),
        O("div", nr, [
          ($(!0), A(Y, null, ee(d.value, (_, b) => ($(), A("div", {
            key: b,
            class: "crucible-filter-dropdown"
          }, [
            O("h4", {
              class: ge(i.value[b] ? "selected-background" : ""),
              onClick: (E) => u(b)
            }, [
              O("span", null, M(b), 1),
              te(jt, {
                "show-dropdown": i.value[b]
              }, null, 8, ["show-dropdown"])
            ], 10, or),
            gt(O("div", rr, [
              ($(!0), A(Y, null, ee(_, (E, w) => ($(), A("div", {
                key: w,
                class: ge(
                  s.value.includes(Object.keys(E)[0]) ? "selected-filter-tag column" : "column"
                )
              }, [
                O("input", {
                  id: "tag&{key}&{index.toString()}",
                  type: "checkbox",
                  value: Object.keys(E)[0],
                  onClick: (N) => h(b, Object.keys(E)[0])
                }, null, 8, sr),
                O("label", ar, [
                  O("span", null, M(Object.keys(E)[0]), 1),
                  O("span", null, " (" + M(Object.values(E)[0]) + ") ", 1)
                ])
              ], 2))), 128))
            ], 512), [
              [Qt, i.value[b]]
            ])
          ]))), 128))
        ])
      ])) : vt("", !0),
      O("button", {
        class: ge(
          r.value ? "crucible-filter-control svg-background-light" : "crucible-filter-control crucible-filter-control-light svg-background-dark"
        ),
        onClick: m[0] || (m[0] = (_) => r.value = !r.value)
      }, null, 2)
    ]));
  }
}), Lt = /* @__PURE__ */ fe(ir, [["__scopeId", "data-v-eefe5a08"]]), cr = { id: "app" }, lr = { class: "main" }, ur = /* @__PURE__ */ z({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = Ke("CrucibleSearch"), r = Ke("RouterView");
      return $(), A("div", cr, [
        O("div", lr, [
          te(o),
          te(r),
          O("div", null, [
            te(Lt)
          ])
        ])
      ]);
    };
  }
}), fr = /* @__PURE__ */ fe(ur, [["__scopeId", "data-v-aabb2d26"]]), dr = [
  { path: "/", component: fr },
  { path: "/search", component: Ie }
], hr = Po({
  history: Vn("/"),
  routes: dr
});
function Mt() {
  const e = q("$router");
  return e || hr;
}
const pr = { class: "search-container" }, gr = { key: 0 }, vr = ["onClick"], mr = 10, yr = /* @__PURE__ */ z({
  __name: "CrucibleSearch",
  setup(e) {
    const t = Mt(), n = L(""), o = L([]), r = L(!1), i = L(null), c = q("$tagsApi") || "http://localhost:8080/api/resource/alltags", d = (_) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(_.toLowerCase())
    ), u = (_) => _.replace(/_/g, " "), h = (_) => _.replace(/ /g, "_"), s = async () => {
      n.value ? (o.value = (await xo(n.value, c)).slice(0, mr), o.value = o.value.map(u), r.value = !0) : (o.value = [], r.value = !1);
    }, f = (_) => {
      n.value = o.value.includes(_) ? _ : o.value[0], r.value = !1, t.push({
        path: "/search",
        query: { tag: h(n.value) }
      });
    }, a = () => {
      o.value.length && n.value && (r.value = !0);
    }, p = (_) => {
      _.key === "Enter" ? (f(n.value), n.value = "") : _.key === "Tab" && (_.preventDefault(), n.value = o.value[0] ?? n.value);
    }, m = (_) => {
      i.value && !i.value.contains(_.target) && (r.value = !1);
    };
    return je(() => {
      document.addEventListener("click", m);
    }), Yt(() => {
      document.removeEventListener("click", m);
    }), (_, b) => ($(), A("div", pr, [
      O("div", {
        ref_key: "searchBoxRef",
        ref: i,
        class: "search-container"
      }, [
        gt(O("input", {
          "onUpdate:modelValue": b[0] || (b[0] = (E) => n.value = E),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: s,
          onFocus: a,
          onKeydown: p
        }, null, 544), [
          [Jt, n.value]
        ]),
        o.value.length && n.value && r.value ? ($(), A("ul", gr, [
          ($(!0), A(Y, null, ee(o.value, (E) => ($(), A("li", {
            key: E,
            onClick: (w) => f(E)
          }, [
            ($(!0), A(Y, null, ee(E.split(""), (w, N) => ($(), A(Y, null, [
              d(w) ? ($(), A("strong", {
                key: `strong-${N}`
              }, M(w), 1)) : ($(), A("span", { key: N }, M(w), 1))
            ], 64))), 256))
          ], 8, vr))), 128))
        ])) : vt("", !0)
      ], 512)
    ]));
  }
}), _r = /* @__PURE__ */ fe(yr, [["__scopeId", "data-v-5cb7fe60"]]);
function br(e, t) {
  const { router: n, getApi: o, tagsApi: r, filterSetApi: i } = t;
  e.component("CrucibleSearch", _r), e.component("DisplayResult", Ie), e.component("CrucibleFilter", Lt), e.component("CollapseBtn", jt), e.provide("$router", n || null), e.provide("$getApi", o || null), e.provide("$tagsApi", r || null), e.provide("$filterSetApi", i || null), n.addRoute({ path: "/search", component: Ie });
}
export {
  jt as CollapseBtn,
  Lt as CrucibleFilter,
  _r as CrucibleSearch,
  Ie as DisplayResult,
  br as createSearchFilterPlugin
};
