import { shallowRef as Gt, unref as Z, shallowReactive as Kt, nextTick as zt, defineComponent as F, reactive as Ft, inject as q, computed as j, h as ht, provide as Re, ref as L, watch as Ve, getCurrentInstance as pt, watchEffect as Wt, onMounted as je, openBlock as O, createElementBlock as $, createElementVNode as T, toDisplayString as M, Fragment as Y, renderList as ee, normalizeClass as Ne, pushScopeId as gt, popScopeId as mt, createVNode as te, createTextVNode as ze, withDirectives as vt, vShow as Qt, createCommentVNode as yt, resolveComponent as Fe, onUnmounted as Yt, vModelText as Jt } from "vue";
function Xt() {
  return _t().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function _t() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Zt = typeof Proxy == "function", en = "devtools-plugin:setup", tn = "plugin:settings:set";
let X, Ce;
function nn() {
  var e;
  return X !== void 0 || (typeof window < "u" && window.performance ? (X = !0, Ce = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (X = !0, Ce = globalThis.perf_hooks.performance) : X = !1), X;
}
function on() {
  return nn() ? Ce.now() : Date.now();
}
class rn {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const f in t.settings) {
        const d = t.settings[f];
        o[f] = d.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let u = Object.assign({}, o);
    try {
      const f = localStorage.getItem(r), d = JSON.parse(f);
      Object.assign(u, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return u;
      },
      setSettings(f) {
        try {
          localStorage.setItem(r, JSON.stringify(f));
        } catch {
        }
        u = f;
      },
      now() {
        return on();
      }
    }, n && n.on(tn, (f, d) => {
      f === this.plugin.id && this.fallbacks.setSettings(d);
    }), this.proxiedOn = new Proxy({}, {
      get: (f, d) => this.target ? this.target.on[d] : (...c) => {
        this.onQueue.push({
          method: d,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (f, d) => this.target ? this.target[d] : d === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(d) ? (...c) => (this.targetQueue.push({
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
function sn(e, t) {
  const n = e, o = _t(), r = Xt(), u = Zt && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !u))
    r.emit(en, e, t);
  else {
    const f = u ? new rn(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: f
    }), f && t(f.proxiedTarget);
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
const Et = /#/g, cn = /&/g, ln = /\//g, un = /=/g, fn = /\?/g, bt = /\+/g, dn = /%5B/g, hn = /%5D/g, wt = /%5E/g, pn = /%60/g, Rt = /%7B/g, gn = /%7C/g, kt = /%7D/g, mn = /%20/g;
function Le(e) {
  return encodeURI("" + e).replace(gn, "|").replace(dn, "[").replace(hn, "]");
}
function vn(e) {
  return Le(e).replace(Rt, "{").replace(kt, "}").replace(wt, "^");
}
function Oe(e) {
  return Le(e).replace(bt, "%2B").replace(mn, "+").replace(Et, "%23").replace(cn, "%26").replace(pn, "`").replace(Rt, "{").replace(kt, "}").replace(wt, "^");
}
function yn(e) {
  return Oe(e).replace(un, "%3D");
}
function _n(e) {
  return Le(e).replace(Et, "%23").replace(fn, "%3F");
}
function En(e) {
  return e == null ? "" : _n(e).replace(ln, "%2F");
}
function ne(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && k(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const bn = /\/$/, wn = (e) => e.replace(bn, "");
function Se(e, t, n = "/") {
  let o, r = {}, u = "", f = "";
  const d = t.indexOf("#");
  let c = t.indexOf("?");
  return d < c && d >= 0 && (c = -1), c > -1 && (o = t.slice(0, c), u = t.slice(c + 1, d > -1 ? d : t.length), r = e(u)), d > -1 && (o = o || t.slice(0, d), f = t.slice(d, t.length)), o = Sn(o ?? t, n), {
    fullPath: o + (u && "?") + u + f,
    path: o,
    query: r,
    hash: ne(f)
  };
}
function Rn(e, t) {
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
    if (!kn(e[n], t[n]))
      return !1;
  return !0;
}
function kn(e, t) {
  return V(e) ? Ye(e, t) : V(t) ? Ye(t, e) : e === t;
}
function Ye(e, t) {
  return V(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Sn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return k(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let u = n.length - 1, f, d;
  for (f = 0; f < o.length; f++)
    if (d = o[f], d !== ".")
      if (d === "..")
        u > 1 && u--;
      else
        break;
  return n.slice(0, u).join("/") + "/" + o.slice(f).join("/");
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
const Nn = /^[^#]+#/;
function Cn(e, t) {
  return e.replace(Nn, "#") + t;
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
        const u = document.querySelector(e.el);
        if (o && u) {
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
    t = On(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Je(e, t) {
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
function Pt(e, t) {
  const { pathname: n, search: o, hash: r } = t, u = e.indexOf("#");
  if (u > -1) {
    let d = r.includes(e.slice(u)) ? e.slice(u).length : 1, c = r.slice(d);
    return c[0] !== "/" && (c = "/" + c), We(c, "");
  }
  return We(n, e) + o + r;
}
function Dn(e, t, n, o) {
  let r = [], u = [], f = null;
  const d = ({ state: a }) => {
    const p = Pt(e, location), v = n.value, _ = t.value;
    let w = 0;
    if (a) {
      if (n.value = p, t.value = a, f && f === v) {
        f = null;
        return;
      }
      w = _ ? a.position - _.position : 0;
    } else
      o(p);
    r.forEach((E) => {
      E(n.value, v, {
        delta: w,
        type: ue.pop,
        direction: w ? w > 0 ? le.forward : le.back : le.unknown
      });
    });
  };
  function c() {
    f = n.value;
  }
  function h(a) {
    r.push(a);
    const p = () => {
      const v = r.indexOf(a);
      v > -1 && r.splice(v, 1);
    };
    return u.push(p), p;
  }
  function s() {
    const { history: a } = window;
    a.state && a.replaceState(N({}, a.state, { scroll: me() }), "");
  }
  function l() {
    for (const a of u)
      a();
    u = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: c,
    listen: h,
    destroy: l
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
function In(e) {
  const { history: t, location: n } = window, o = {
    value: Pt(e, n)
  }, r = { value: t.state };
  r.value || u(o.value, {
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
  function u(c, h, s) {
    const l = e.indexOf("#"), a = l > -1 ? (n.host && document.querySelector("base") ? e : e.slice(l)) + c : xn() + e + c;
    try {
      t[s ? "replaceState" : "pushState"](h, "", a), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? k("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](a);
    }
  }
  function f(c, h) {
    const s = N({}, t.state, Xe(
      r.value.back,
      // keep back and forward entries but override current position
      c,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    u(c, s, !0), o.value = c;
  }
  function d(c, h) {
    const s = N(
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

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), u(s.current, s, !0);
    const l = N({}, Xe(o.value, c, null), { position: s.position + 1 }, h);
    u(c, l, !1), o.value = c;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: f
  };
}
function Vn(e) {
  e = Pn(e);
  const t = In(e), n = Dn(e, t.state, t.location, t.replace);
  function o(u, f = !0) {
    f || n.pauseListeners(), history.go(u);
  }
  const r = N({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: Cn.bind(null, e)
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
function Nt(e) {
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
  return process.env.NODE_ENV !== "production" ? N(new Error(jn[e](t)), {
    type: e,
    [Ae]: !0
  }, t) : N(new Error(), {
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
const et = "[^/]+?", Bn = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Un = /[.+*?^${}()[\]/\\]/g;
function Hn(e, t) {
  const n = N({}, Bn, t), o = [];
  let r = n.start ? "^" : "";
  const u = [];
  for (const h of e) {
    const s = h.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !h.length && (r += "/");
    for (let l = 0; l < h.length; l++) {
      const a = h[l];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (a.type === 0)
        l || (r += "/"), r += a.value.replace(Un, "\\$&"), p += 40;
      else if (a.type === 1) {
        const { value: v, repeatable: _, optional: w, regexp: E } = a;
        u.push({
          name: v,
          repeatable: _,
          optional: w
        });
        const b = E || et;
        if (b !== et) {
          p += 10;
          try {
            new RegExp(`(${b})`);
          } catch (I) {
            throw new Error(`Invalid custom RegExp for param "${v}" (${b}): ` + I.message);
          }
        }
        let C = _ ? `((?:${b})(?:/(?:${b}))*)` : `(${b})`;
        l || (C = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        w && h.length < 2 ? `(?:/${C})` : "/" + C), w && (C += "?"), r += C, p += 20, w && (p += -8), _ && (p += -20), b === ".*" && (p += -50);
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
  const f = new RegExp(r, n.sensitive ? "" : "i");
  function d(h) {
    const s = h.match(f), l = {};
    if (!s)
      return null;
    for (let a = 1; a < s.length; a++) {
      const p = s[a] || "", v = u[a - 1];
      l[v.name] = p && v.repeatable ? p.split("/") : p;
    }
    return l;
  }
  function c(h) {
    let s = "", l = !1;
    for (const a of e) {
      (!l || !s.endsWith("/")) && (s += "/"), l = !1;
      for (const p of a)
        if (p.type === 0)
          s += p.value;
        else if (p.type === 1) {
          const { value: v, repeatable: _, optional: w } = p, E = v in h ? h[v] : "";
          if (V(E) && !_)
            throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);
          const b = V(E) ? E.join("/") : E;
          if (!b)
            if (w)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : l = !0);
            else
              throw new Error(`Missing required param "${v}"`);
          s += b;
        }
    }
    return s || "/";
  }
  return {
    re: f,
    score: o,
    keys: u,
    parse: d,
    stringify: c
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
function Gn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const u = qn(o[n], r[n]);
    if (u)
      return u;
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
function Fn(e) {
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
  let u;
  function f() {
    u && r.push(u), u = [];
  }
  let d = 0, c, h = "", s = "";
  function l() {
    h && (n === 0 ? u.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (u.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), u.push({
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
        c === "/" ? (h && l(), f()) : c === ":" ? (l(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        c === "(" ? n = 2 : zn.test(c) ? a() : (l(), n = 0, c !== "*" && c !== "?" && c !== "+" && d--);
        break;
      case 2:
        c === ")" ? s[s.length - 1] == "\\" ? s = s.slice(0, -1) + c : n = 3 : s += c;
        break;
      case 3:
        l(), n = 0, c !== "*" && c !== "?" && c !== "+" && d--, s = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), l(), f(), r;
}
function Wn(e, t, n) {
  const o = Hn(Fn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const u = /* @__PURE__ */ new Set();
    for (const f of o.keys)
      u.has(f.name) && k(`Found duplicated params with name "${f.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), u.add(f.name);
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
function Qn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = rt({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function u(s, l, a) {
    const p = !a, v = Yn(s);
    process.env.NODE_ENV !== "production" && eo(v, l), v.aliasOf = a && a.record;
    const _ = rt(t, s), w = [
      v
    ];
    if ("alias" in s) {
      const C = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const I of C)
        w.push(N({}, v, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: a ? a.record.components : v.components,
          path: I,
          // we might be the child of an alias
          aliasOf: a ? a.record : v
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let E, b;
    for (const C of w) {
      const { path: I } = C;
      if (l && I[0] !== "/") {
        const W = l.record.path, B = W[W.length - 1] === "/" ? "" : "/";
        C.path = l.record.path + (I && B + I);
      }
      if (process.env.NODE_ENV !== "production" && C.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (E = Wn(C, l, _), process.env.NODE_ENV !== "production" && l && I[0] === "/" && to(E, l), a ? (a.alias.push(E), process.env.NODE_ENV !== "production" && Zn(a, E)) : (b = b || E, b !== E && b.alias.push(E), p && s.name && !ot(E) && f(s.name)), v.children) {
        const W = v.children;
        for (let B = 0; B < W.length; B++)
          u(W[B], E, a && a.children[B]);
      }
      a = a || E, (E.record.components && Object.keys(E.record.components).length || E.record.name || E.record.redirect) && c(E);
    }
    return b ? () => {
      f(b);
    } : ce;
  }
  function f(s) {
    if (Nt(s)) {
      const l = o.get(s);
      l && (o.delete(s), n.splice(n.indexOf(l), 1), l.children.forEach(f), l.alias.forEach(f));
    } else {
      const l = n.indexOf(s);
      l > -1 && (n.splice(l, 1), s.record.name && o.delete(s.record.name), s.children.forEach(f), s.alias.forEach(f));
    }
  }
  function d() {
    return n;
  }
  function c(s) {
    let l = 0;
    for (; l < n.length && Gn(s, n[l]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[l].record.path || !Ct(s, n[l])); )
      l++;
    n.splice(l, 0, s), s.record.name && !ot(s) && o.set(s.record.name, s);
  }
  function h(s, l) {
    let a, p = {}, v, _;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw oe(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const b = Object.keys(s.params || {}).filter((C) => !a.keys.find((I) => I.name === C));
        b.length && k(`Discarded invalid param(s) "${b.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      _ = a.record.name, p = N(
        // paramsFromLocation is a new object
        nt(
          l.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          a.keys.filter((b) => !b.optional).concat(a.parent ? a.parent.keys.filter((b) => b.optional) : []).map((b) => b.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && nt(s.params, a.keys.map((b) => b.name))
      ), v = a.stringify(p);
    } else if (s.path != null)
      v = s.path, process.env.NODE_ENV !== "production" && !v.startsWith("/") && k(`The Matcher cannot resolve relative paths but received "${v}". Unless you directly called \`matcher.resolve("${v}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((b) => b.re.test(v)), a && (p = a.parse(v), _ = a.record.name);
    else {
      if (a = l.name ? o.get(l.name) : n.find((b) => b.re.test(l.path)), !a)
        throw oe(1, {
          location: s,
          currentLocation: l
        });
      _ = a.record.name, p = N({}, l.params, s.params), v = a.stringify(p);
    }
    const w = [];
    let E = a;
    for (; E; )
      w.unshift(E.record), E = E.parent;
    return {
      name: _,
      path: v,
      params: p,
      matched: w,
      meta: Xn(w)
    };
  }
  return e.forEach((s) => u(s)), { addRoute: u, resolve: h, removeRoute: f, getRoutes: d, getRecordMatcher: r };
}
function nt(e, t) {
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
function ot(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function Xn(e) {
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
function Zn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Te.bind(null, n)))
      return k(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Te.bind(null, n)))
      return k(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function eo(e, t) {
  t && t.record.name && !e.name && !e.path && k(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function to(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Te.bind(null, n)))
      return k(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Ct(e, t) {
  return t.children.some((n) => n === e || Ct(e, n));
}
function no(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const u = o[r].replace(bt, " "), f = u.indexOf("="), d = ne(f < 0 ? u : u.slice(0, f)), c = f < 0 ? null : ne(u.slice(f + 1));
    if (d in t) {
      let h = t[d];
      V(h) || (h = t[d] = [h]), h.push(c);
    } else
      t[d] = c;
  }
  return t;
}
function st(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = yn(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (V(o) ? o.map((u) => u && Oe(u)) : [o && Oe(o)]).forEach((u) => {
      u !== void 0 && (t += (t.length ? "&" : "") + n, u != null && (t += "=" + u));
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
const ro = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), at = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Me = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Ot = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), xe = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
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
function K(e, t, n, o, r, u = (f) => f()) {
  const f = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((d, c) => {
    const h = (a) => {
      a === !1 ? c(oe(4, {
        from: n,
        to: t
      })) : a instanceof Error ? c(a) : ge(a) ? c(oe(2, {
        from: t,
        to: a
      })) : (f && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === f && typeof a == "function" && f.push(a), d());
    }, s = u(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? so(h, t, n) : h));
    let l = Promise.resolve(s);
    if (e.length < 3 && (l = l.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        l = l.then((p) => h._called ? p : (k(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        k(a), c(new Error("Invalid navigation guard"));
        return;
      }
    }
    l.catch((a) => c(a));
  });
}
function so(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && k(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Pe(e, t, n, o, r = (u) => u()) {
  const u = [];
  for (const f of e) {
    process.env.NODE_ENV !== "production" && !f.components && !f.children.length && k(`Record with path "${f.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in f.components) {
      let c = f.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!c || typeof c != "object" && typeof c != "function")
          throw k(`Component "${d}" in record with path "${f.path}" is not a valid component. Received "${String(c)}".`), new Error("Invalid route component");
        if ("then" in c) {
          k(`Component "${d}" in record with path "${f.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = c;
          c = () => h;
        } else
          c.__asyncLoader && // warn only once per component
          !c.__warnedDefineAsync && (c.__warnedDefineAsync = !0, k(`Component "${d}" in record with path "${f.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !f.instances[d]))
        if (ao(c)) {
          const s = (c.__vccOpts || c)[t];
          s && u.push(K(s, n, o, f, d, r));
        } else {
          let h = c();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (k(`Component "${d}" in record with path "${f.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), u.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${f.path}"`));
            const l = an(s) ? s.default : s;
            f.components[d] = l;
            const p = (l.__vccOpts || l)[t];
            return p && K(p, n, o, f, d, r)();
          }));
        }
    }
  }
  return u;
}
function ao(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function it(e) {
  const t = q(Me), n = q(Ot);
  let o = !1, r = null;
  const u = j(() => {
    const s = Z(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (ge(s) || (o ? k(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : k(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), f = j(() => {
    const { matched: s } = u.value, { length: l } = s, a = s[l - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const v = p.findIndex(z.bind(null, a));
    if (v > -1)
      return v;
    const _ = ct(s[l - 2]);
    return (
      // we are dealing with nested routes
      l > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      ct(a) === _ && // avoid comparing the child with its parent
      p[p.length - 1].path !== _ ? p.findIndex(z.bind(null, s[l - 2])) : v
    );
  }), d = j(() => f.value > -1 && uo(n.params, u.value.params)), c = j(() => f.value > -1 && f.value === n.matched.length - 1 && St(n.params, u.value.params));
  function h(s = {}) {
    return lo(s) ? t[Z(e.replace) ? "replace" : "push"](
      Z(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ce) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && H) {
    const s = pt();
    if (s) {
      const l = {
        route: u.value,
        isActive: d.value,
        isExactActive: c.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(l), Wt(() => {
        l.route = u.value, l.isActive = d.value, l.isExactActive = c.value, l.error = ge(Z(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: u,
    href: j(() => u.value.href),
    isActive: d,
    isExactActive: c,
    navigate: h
  };
}
const io = /* @__PURE__ */ F({
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
    const n = Ft(it(e)), { options: o } = q(Me), r = j(() => ({
      [lt(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [lt(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const u = t.default && t.default(n);
      return e.custom ? u : ht("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, u);
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
    } else if (!V(r) || r.length !== o.length || o.some((u, f) => u !== r[f]))
      return !1;
  }
  return !0;
}
function ct(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const lt = (e, t, n) => e ?? t ?? n, fo = /* @__PURE__ */ F({
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
    const o = q(xe), r = j(() => e.route || o.value), u = q(at, 0), f = j(() => {
      let h = Z(u);
      const { matched: s } = r.value;
      let l;
      for (; (l = s[h]) && !l.components; )
        h++;
      return h;
    }), d = j(() => r.value.matched[f.value]);
    Re(at, j(() => f.value + 1)), Re(ro, d), Re(xe, r);
    const c = L();
    return Ve(() => [c.value, d.value, e.name], ([h, s, l], [a, p, v]) => {
      s && (s.instances[l] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !z(s, p) || !a) && (s.enterCallbacks[l] || []).forEach((_) => _(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, l = d.value, a = l && l.components[s];
      if (!a)
        return ut(n.default, { Component: a, route: h });
      const p = l.props[s], v = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, w = ht(a, N({}, v, t, {
        onVnodeUnmounted: (E) => {
          E.component.isUnmounted && (l.instances[s] = null);
        },
        ref: c
      }));
      if (process.env.NODE_ENV !== "production" && H && w.ref) {
        const E = {
          depth: f.value,
          name: l.name,
          path: l.path,
          meta: l.meta
        };
        (V(w.ref) ? w.ref.map((C) => C.i) : [w.ref.i]).forEach((C) => {
          C.__vrv_devtools = E;
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
const ho = fo;
function po() {
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
    matched: e.matched.map((o) => So(o, ["instances", "children", "aliasOf"]))
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
function mo(e, t, n) {
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
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((s, l) => {
      s.instanceData && s.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: ie(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: l }) => {
      if (l.__vrv_devtools) {
        const a = l.__vrv_devtools;
        s.tags.push({
          label: (a.name ? `${a.name.toString()}: ` : "") + a.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: $t
        });
      }
      V(l.__vrl_devtools) && (l.__devtoolsApi = r, l.__vrl_devtools.forEach((a) => {
        let p = a.route.path, v = xt, _ = "", w = 0;
        a.error ? (p = a.error, v = bo, w = wo) : a.isExactActive ? (v = Tt, _ = "This is exactly active") : a.isActive && (v = At, _ = "This link is active"), s.tags.push({
          label: p,
          textColor: w,
          tooltip: _,
          backgroundColor: v
        });
      }));
    }), Ve(t.currentRoute, () => {
      c(), r.notifyComponentUpdate(), r.sendInspectorTree(d), r.sendInspectorState(d);
    });
    const u = "router:navigations:" + o;
    r.addTimelineLayer({
      id: u,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((s, l) => {
      r.addTimelineEvent({
        layerId: u,
        event: {
          title: "Error during Navigation",
          subtitle: l.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: s },
          groupId: l.meta.__navigationId
        }
      });
    });
    let f = 0;
    t.beforeEach((s, l) => {
      const a = {
        guard: pe("beforeEach"),
        from: ie(l, "Current Location during this navigation"),
        to: ie(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: f++
      }), r.addTimelineEvent({
        layerId: u,
        event: {
          time: r.now(),
          title: "Start of navigation",
          subtitle: s.fullPath,
          data: a,
          groupId: s.meta.__navigationId
        }
      });
    }), t.afterEach((s, l, a) => {
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
      }, p.status = pe("❌")) : p.status = pe("✅"), p.from = ie(l, "Current Location during this navigation"), p.to = ie(s, "Target location"), r.addTimelineEvent({
        layerId: u,
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
      let l = n.getRoutes().filter((a) => !a.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !a.parent.record.components);
      l.forEach(Vt), s.filter && (l = l.filter((a) => (
        // save matches state based on the payload
        De(a, s.filter.toLowerCase())
      ))), l.forEach((a) => It(a, t.currentRoute.value)), s.rootNodes = l.map(Dt);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && c();
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
function vo(e) {
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
const $t = 15485081, At = 2450411, Tt = 8702998, _o = 2282478, xt = 16486972, Eo = 6710886, bo = 16704226, wo = 12131356;
function Dt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: _o
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
    backgroundColor: Eo
  });
  let o = n.__vd_id;
  return o == null && (o = String(Ro++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Dt)
  };
}
let Ro = 0;
const ko = /^\/(.*)\/([a-z]*)$/;
function It(e, t) {
  const n = t.matched.length && z(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => z(o, e.record))), e.children.forEach((o) => It(o, t));
}
function Vt(e) {
  e.__vd_match = !1, e.children.forEach(Vt);
}
function De(e, t) {
  const n = String(e.re).match(ko);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((f) => De(f, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), u = ne(r);
  return !t.startsWith("/") && (u.includes(t) || r.includes(t)) || u.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((f) => De(f, t));
}
function So(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function Po(e) {
  const t = Qn(e.routes, e), n = e.parseQuery || no, o = e.stringifyQuery || st, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const u = ae(), f = ae(), d = ae(), c = Gt(G);
  let h = G;
  H && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = ke.bind(null, (i) => "" + i), l = ke.bind(null, En), a = (
    // @ts-expect-error: intentionally avoid the type check
    ke.bind(null, ne)
  );
  function p(i, m) {
    let g, y;
    return Nt(i) ? (g = t.getRecordMatcher(i), process.env.NODE_ENV !== "production" && !g && k(`Parent route "${String(i)}" not found when adding child route`, m), y = m) : y = i, t.addRoute(y, g);
  }
  function v(i) {
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
    if (m = N({}, m || c.value), typeof i == "string") {
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
        params: l(R)
      }), m.params = l(m.params);
    }
    const y = t.resolve(g, m), P = i.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && k(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), y.params = s(a(y.params));
    const x = Rn(o, N({}, i, {
      hash: vn(P),
      path: y.path
    })), S = r.createHref(x);
    return process.env.NODE_ENV !== "production" && (S.startsWith("//") ? k(`Location "${i}" resolved to "${S}". A resolved location cannot start with multiple slashes.`) : y.matched.length || k(`No match found for location with path "${i.path != null ? i.path : i}"`)), N({
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
        o === st ? oo(i.query) : i.query || {}
      )
    }, y, {
      redirectedFrom: void 0,
      href: S
    });
  }
  function b(i) {
    return typeof i == "string" ? Se(n, i, c.value.path) : N({}, i);
  }
  function C(i, m) {
    if (h !== i)
      return oe(8, {
        from: m,
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
    const m = i.matched[i.matched.length - 1];
    if (m && m.redirect) {
      const { redirect: g } = m;
      let y = typeof g == "function" ? g(i) : g;
      if (typeof y == "string" && (y = y.includes("?") || y.includes("#") ? y = b(y) : (
        // force empty params
        { path: y }
      ), y.params = {}), process.env.NODE_ENV !== "production" && y.path == null && !("name" in y))
        throw k(`Invalid redirect found:
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
  function re(i, m) {
    const g = h = E(i), y = c.value, P = i.state, x = i.force, S = i.replace === !0, R = B(g);
    if (R)
      return re(
        N(b(R), {
          state: typeof R == "object" ? N({}, P, R.state) : P,
          force: x,
          replace: S
        }),
        // keep original redirectedFrom if it exists
        m || g
      );
    const A = g;
    A.redirectedFrom = m;
    let Q;
    return !x && Qe(o, y, g) && (Q = oe(16, { to: A, from: y }), Ge(
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
          Qe(o, E(D.to), A) && // and we have done it a couple of times
          m && // @ts-expect-error: added only in dev
          (m._count = m._count ? (
            // @ts-expect-error
            m._count + 1
          ) : 1) > 30 ? (k(`Detected a possibly infinite redirection in a navigation guard when going from "${y.fullPath}" to "${A.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : re(
            // keep options
            N({
              // preserve an existing replacement but allow the redirect to override it
              replace: S
            }, b(D.to), {
              state: typeof D.to == "object" ? N({}, P, D.to.state) : P,
              force: x
            }),
            // preserve the original redirectedFrom if any
            m || A
          );
      } else
        D = He(A, y, !0, S, P);
      return Ue(A, y, D), D;
    });
  }
  function Ut(i, m) {
    const g = C(i, m);
    return g ? Promise.reject(g) : Promise.resolve();
  }
  function ve(i) {
    const m = he.values().next().value;
    return m && typeof m.runWithContext == "function" ? m.runWithContext(i) : i();
  }
  function Be(i, m) {
    let g;
    const [y, P, x] = No(i, m);
    g = Pe(y.reverse(), "beforeRouteLeave", i, m);
    for (const R of y)
      R.leaveGuards.forEach((A) => {
        g.push(K(A, i, m));
      });
    const S = Ut.bind(null, i, m);
    return g.push(S), J(g).then(() => {
      g = [];
      for (const R of u.list())
        g.push(K(R, i, m));
      return g.push(S), J(g);
    }).then(() => {
      g = Pe(P, "beforeRouteUpdate", i, m);
      for (const R of P)
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
      for (const R of f.list())
        g.push(K(R, i, m));
      return g.push(S), J(g);
    }).catch((R) => U(
      R,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? R : Promise.reject(R));
  }
  function Ue(i, m, g) {
    d.list().forEach((y) => ve(() => y(i, m, g)));
  }
  function He(i, m, g, y, P) {
    const x = C(i, m);
    if (x)
      return x;
    const S = m === G, R = H ? history.state : {};
    g && (y || S ? r.replace(i.fullPath, N({
      scroll: S && R && R.scroll
    }, P)) : r.push(i.fullPath, P)), c.value = i, Ge(i, m, g, S), Ee();
  }
  let se;
  function Ht() {
    se || (se = r.listen((i, m, g) => {
      if (!Ke.listening)
        return;
      const y = E(i), P = B(y);
      if (P) {
        re(N(P, { replace: !0 }), y).catch(ce);
        return;
      }
      h = y;
      const x = c.value;
      H && An(Je(x.fullPath, g.delta), me()), Be(y, x).catch((S) => U(
        S,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? S : U(
        S,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (re(
        S.to,
        y
        // avoid an uncaught rejection, let push call triggerError
      ).then((R) => {
        U(
          R,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !g.delta && g.type === ue.pop && r.go(-1, !1);
      }).catch(ce), Promise.reject()) : (g.delta && r.go(-g.delta, !1), _e(S, y, x))).then((S) => {
        S = S || He(
          // after navigation, all matched components are resolved
          y,
          x,
          !1
        ), S && (g.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !U(
          S,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-g.delta, !1) : g.type === ue.pop && U(
          S,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Ue(y, x, S);
      }).catch(ce);
    }));
  }
  let ye = ae(), qe = ae(), de;
  function _e(i, m, g) {
    Ee(i);
    const y = qe.list();
    return y.length ? y.forEach((P) => P(i, m, g)) : (process.env.NODE_ENV !== "production" && k("uncaught error during route navigation:"), console.error(i)), Promise.reject(i);
  }
  function qt() {
    return de && c.value !== G ? Promise.resolve() : new Promise((i, m) => {
      ye.add([i, m]);
    });
  }
  function Ee(i) {
    return de || (de = !i, Ht(), ye.list().forEach(([m, g]) => i ? g(i) : m()), ye.reset()), i;
  }
  function Ge(i, m, g, y) {
    const { scrollBehavior: P } = e;
    if (!H || !P)
      return Promise.resolve();
    const x = !g && Tn(Je(i.fullPath, 0)) || (y || !g) && history.state && history.state.scroll || null;
    return zt().then(() => P(i, m, x)).then((S) => S && $n(S)).catch((S) => _e(S, i, m));
  }
  const be = (i) => r.go(i);
  let we;
  const he = /* @__PURE__ */ new Set(), Ke = {
    currentRoute: c,
    listening: !0,
    addRoute: p,
    removeRoute: v,
    hasRoute: w,
    getRoutes: _,
    resolve: E,
    options: e,
    push: I,
    replace: W,
    go: be,
    back: () => be(-1),
    forward: () => be(1),
    beforeEach: u.add,
    beforeResolve: f.add,
    afterEach: d.add,
    onError: qe.add,
    isReady: qt,
    install(i) {
      const m = this;
      i.component("RouterLink", co), i.component("RouterView", ho), i.config.globalProperties.$router = m, Object.defineProperty(i.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Z(c)
      }), H && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !we && c.value === G && (we = !0, I(r.location).catch((P) => {
        process.env.NODE_ENV !== "production" && k("Unexpected error when starting the router:", P);
      }));
      const g = {};
      for (const P in G)
        Object.defineProperty(g, P, {
          get: () => c.value[P],
          enumerable: !0
        });
      i.provide(Me, m), i.provide(Ot, Kt(g)), i.provide(xe, c);
      const y = i.unmount;
      he.add(i), i.unmount = function() {
        he.delete(i), he.size < 1 && (h = G, se && se(), se = null, c.value = G, we = !1, de = !1), y();
      }, process.env.NODE_ENV !== "production" && H && mo(i, m, t);
    }
  };
  function J(i) {
    return i.reduce((m, g) => m.then(() => ve(g)), Promise.resolve());
  }
  return Ke;
}
function No(e, t) {
  const n = [], o = [], r = [], u = Math.max(t.matched.length, e.matched.length);
  for (let f = 0; f < u; f++) {
    const d = t.matched[f];
    d && (e.matched.find((h) => z(h, d)) ? o.push(d) : n.push(d));
    const c = e.matched[f];
    c && (t.matched.find((h) => z(h, c)) || r.push(c));
  }
  return [n, o, r];
}
const Co = [
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
    return await Ao(e, t) || Co.filter(
      (o) => o.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, xo = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), r = await (await fetch(`${t}?${n}`)).json() ?? Oo, u = new Set(r);
    return Array.from(u);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, ft = async (e) => {
  try {
    const t = await fetch(e), n = await t.json();
    return console.log("tagsCollection", t), n;
  } catch (t) {
    return console.error("An error occurred while fetching tags", t), [];
  }
}, Do = $o.reduce(
  (e, t) => {
    const [n, o] = Object.keys(t)[0].split(":"), r = Object.values(t)[0];
    return e[n] || (e[n] = []), e[n].push({ [o.replace("_", " ")]: r }), e;
  },
  {}
), Io = { class: "search-results-container" }, Vo = { class: "container-description" }, jo = { class: "label-badges" }, Lo = {
  key: 0,
  class: "results"
}, Mo = ["href"], Bo = {
  key: 1,
  class: "no-results"
}, Uo = /* @__PURE__ */ F({
  __name: "DisplayResult",
  setup(e) {
    const t = q("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("%cRetrieving data from:", "color: skyblue;", t);
    const n = L([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = Bt(), r = L("");
    je(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, await u(r.value)) : r.value = "undefined";
    });
    const u = async (f) => {
      const d = await To(f, t);
      d && (n.value = d);
    };
    return Ve(o.currentRoute, async (f, d) => {
      const c = f.query.tag || "", h = d.query.tag || "";
      c !== h && await u(c);
    }), (f, d) => (O(), $("div", Io, [
      T("div", Vo, [
        T("button", {
          onClick: d[0] || (d[0] = () => f.$router.back())
        }, "↵"),
        T("div", jo, " (" + M(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? (O(), $("div", Lo, [
        T("ul", null, [
          (O(!0), $(Y, null, ee(n.value, (c, h) => (O(), $("li", { key: h }, [
            T("a", {
              href: c.url,
              target: "_blank",
              class: "linkToResource"
            }, M(c.label), 9, Mo)
          ]))), 128))
        ])
      ])) : (O(), $("p", Bo, "No results found"))
    ]));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Ie = /* @__PURE__ */ fe(Uo, [["__scopeId", "data-v-8413d12c"]]), jt = (e) => (gt("data-v-b97c2a53"), e = e(), mt(), e), Ho = /* @__PURE__ */ jt(() => /* @__PURE__ */ T("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }, null, -1)), qo = /* @__PURE__ */ jt(() => /* @__PURE__ */ T("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}, null, -1)), Go = [
  Ho,
  qo
], Ko = /* @__PURE__ */ F({
  __name: "CollapseBtn",
  props: { showDropdown: Boolean },
  setup(e) {
    return (t, n) => (O(), $("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      class: Ne(
        e.showDropdown ? "collapse-btn collapse-btn-rotation" : "collapse-btn"
      )
    }, Go, 2));
  }
}), Lt = /* @__PURE__ */ fe(Ko, [["__scopeId", "data-v-b97c2a53"]]), dt = /* @__PURE__ */ F({
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
    }, u = j(() => r[o] || "Default");
    return (f, d) => (O(), $("button", {
      class: "filter-btn",
      onClick: d[0] || (d[0] = (c) => n("click", f.actionType))
    }, M(u.value), 1));
  }
}), zo = (e) => (gt("data-v-567ba7d0"), e = e(), mt(), e), Fo = { class: "crucible-filter-container" }, Wo = {
  key: 0,
  class: "crucible-filter-panel"
}, Qo = { class: "crucible-filter-action" }, Yo = /* @__PURE__ */ zo(() => /* @__PURE__ */ T("hr", null, null, -1)), Jo = { class: "crucible-filter-collection" }, Xo = ["onClick"], Zo = { class: "capital-first" }, er = { class: "crucible-filters" }, tr = ["onClick"], nr = { class: "row crucible-filter-dropdown-menu" }, or = ["onClick"], rr = /* @__PURE__ */ F({
  __name: "CrucibleFilter",
  setup(e) {
    console.log("Taxonomy Groups", ft);
    const t = q("$filterSetApi") || "http://localhost:8080/api/resource/getFilterSet", n = L(!1), o = L({}), r = L([]), u = L({}), f = (a) => {
      o.value[a] = !o.value[a];
    }, d = (a, p) => {
      const v = `${a}:${p.replace(" ", "_")}`;
      r.value.includes(v) || r.value.push(v);
    }, c = () => {
    }, h = j(() => r.value.map(
      (a) => a.split(":")[1].replace("_", " ")
    )), s = () => {
      o.value = {}, r.value = [];
    }, l = () => {
      console.log("Applying the filter", r);
    };
    return je(async () => {
      u.value = await ft(t) || Do;
    }), (a, p) => (O(), $("div", Fo, [
      n.value ? (O(), $("div", Wo, [
        T("div", Qo, [
          te(dt, {
            "action-type": "apply",
            onClick: l
          }),
          te(dt, {
            "action-type": "clear",
            onClick: s
          })
        ]),
        Yo,
        T("div", Jo, [
          (O(!0), $(Y, null, ee(r.value, (v, _) => (O(), $("span", {
            key: _,
            onClick: (w) => (r.value.splice(_, 1), c)
          }, [
            ze(" ☒ "),
            T("strong", null, M(v.split(":")[0]), 1),
            T("span", Zo, M(v.split(":")[1].replace("_", " ")), 1)
          ], 8, Xo))), 128))
        ]),
        T("div", er, [
          (O(!0), $(Y, null, ee(u.value, (v, _) => (O(), $("div", {
            key: _,
            class: "crucible-filter-dropdown"
          }, [
            T("h4", {
              onClick: (w) => f(_)
            }, [
              T("span", null, M(_), 1),
              te(Lt, {
                "show-dropdown": o.value[_]
              }, null, 8, ["show-dropdown"])
            ], 8, tr),
            vt(T("div", nr, [
              (O(!0), $(Y, null, ee(v, (w, E) => (O(), $("div", {
                key: E,
                class: Ne(
                  h.value.includes(Object.keys(w)[0]) ? "selected-filter-tag column" : "column"
                ),
                onClick: (b) => d(_, Object.keys(w)[0])
              }, [
                ze(M(Object.keys(w)[0]) + " ", 1),
                T("span", null, "(" + M(Object.values(w)[0]) + ")", 1)
              ], 10, or))), 128))
            ], 512), [
              [Qt, o.value[_]]
            ])
          ]))), 128))
        ])
      ])) : yt("", !0),
      T("button", {
        class: Ne(
          n.value ? "crucible-filter-control svg-background-light" : "crucible-filter-control crucible-filter-control-light svg-background-dark"
        ),
        onClick: p[0] || (p[0] = (v) => n.value = !n.value)
      }, null, 2)
    ]));
  }
}), Mt = /* @__PURE__ */ fe(rr, [["__scopeId", "data-v-567ba7d0"]]), sr = { id: "app" }, ar = { class: "main" }, ir = /* @__PURE__ */ F({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = Fe("CrucibleSearch"), r = Fe("RouterView");
      return O(), $("div", sr, [
        T("div", ar, [
          te(o),
          te(r),
          T("div", null, [
            te(Mt)
          ])
        ])
      ]);
    };
  }
}), cr = /* @__PURE__ */ fe(ir, [["__scopeId", "data-v-aabb2d26"]]), lr = [
  { path: "/", component: cr },
  { path: "/search", component: Ie }
], ur = Po({
  history: Vn("/"),
  routes: lr
});
function Bt() {
  const e = q("$router");
  return e || ur;
}
const fr = { class: "search-container" }, dr = { key: 0 }, hr = ["onClick"], pr = 10, gr = /* @__PURE__ */ F({
  __name: "CrucibleSearch",
  setup(e) {
    const t = Bt(), n = L(""), o = L([]), r = L(!1), u = L(null), f = q("$tagsApi") || "http://localhost:8080/api/resource/alltags", d = (_) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(_.toLowerCase())
    ), c = (_) => _.replace(/_/g, " "), h = (_) => _.replace(/ /g, "_"), s = async () => {
      n.value ? (o.value = (await xo(n.value, f)).slice(0, pr), o.value = o.value.map(c), r.value = !0) : (o.value = [], r.value = !1);
    }, l = (_) => {
      n.value = o.value.includes(_) ? _ : o.value[0], r.value = !1, t.push({
        path: "/search",
        query: { tag: h(n.value) }
      });
    }, a = () => {
      o.value.length && n.value && (r.value = !0);
    }, p = (_) => {
      _.key === "Enter" ? (l(n.value), n.value = "") : _.key === "Tab" && (_.preventDefault(), n.value = o.value[0] ?? n.value);
    }, v = (_) => {
      u.value && !u.value.contains(_.target) && (r.value = !1);
    };
    return je(() => {
      document.addEventListener("click", v);
    }), Yt(() => {
      document.removeEventListener("click", v);
    }), (_, w) => (O(), $("div", fr, [
      T("div", {
        ref_key: "searchBoxRef",
        ref: u,
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
          [Jt, n.value]
        ]),
        o.value.length && n.value && r.value ? (O(), $("ul", dr, [
          (O(!0), $(Y, null, ee(o.value, (E) => (O(), $("li", {
            key: E,
            onClick: (b) => l(E)
          }, [
            (O(!0), $(Y, null, ee(E.split(""), (b, C) => (O(), $(Y, null, [
              d(b) ? (O(), $("strong", {
                key: `strong-${C}`
              }, M(b), 1)) : (O(), $("span", { key: C }, M(b), 1))
            ], 64))), 256))
          ], 8, hr))), 128))
        ])) : yt("", !0)
      ], 512)
    ]));
  }
}), mr = /* @__PURE__ */ fe(gr, [["__scopeId", "data-v-5cb7fe60"]]);
function yr(e, t) {
  const { router: n, getApi: o, tagsApi: r, filterSetApi: u } = t;
  e.component("CrucibleSearch", mr), e.component("DisplayResult", Ie), e.component("CrucibleFilter", Mt), e.component("CollapseBtn", Lt), e.provide("$router", n), e.provide("$getApi", o), e.provide("$tagsApi", r), e.provide("$tagsApi", u), n.addRoute({ path: "/search", component: Ie });
}
export {
  Lt as CollapseBtn,
  Mt as CrucibleFilter,
  mr as CrucibleSearch,
  Ie as DisplayResult,
  yr as createSearchPlugin
};
