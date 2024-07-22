import { shallowRef as Ht, unref as Z, shallowReactive as Gt, nextTick as Kt, defineComponent as z, reactive as zt, inject as q, computed as j, h as ft, provide as Re, ref as L, watch as Ve, getCurrentInstance as dt, watchEffect as Wt, onMounted as je, openBlock as $, createElementBlock as A, createElementVNode as O, toDisplayString as M, Fragment as Y, renderList as ee, normalizeClass as ge, pushScopeId as ht, popScopeId as pt, createVNode as te, createTextVNode as Qt, withDirectives as gt, vShow as Yt, createCommentVNode as vt, resolveComponent as Ke, onUnmounted as Jt, vModelText as Xt } from "vue";
function Zt() {
  return mt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function mt() {
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
        return rn();
      }
    }, n && n.on(nn, (c, d) => {
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
function an(e, t) {
  const n = e, o = mt(), r = Zt(), i = en && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    r.emit(tn, e, t);
  else {
    const c = i ? new sn(n, r) : null;
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
const F = typeof document < "u";
function cn(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const P = Object.assign;
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
const yt = /#/g, ln = /&/g, un = /\//g, fn = /=/g, dn = /\?/g, _t = /\+/g, hn = /%5B/g, pn = /%5D/g, Et = /%5E/g, gn = /%60/g, bt = /%7B/g, vn = /%7C/g, wt = /%7D/g, mn = /%20/g;
function Le(e) {
  return encodeURI("" + e).replace(vn, "|").replace(hn, "[").replace(pn, "]");
}
function yn(e) {
  return Le(e).replace(bt, "{").replace(wt, "}").replace(Et, "^");
}
function Oe(e) {
  return Le(e).replace(_t, "%2B").replace(mn, "+").replace(yt, "%23").replace(ln, "%26").replace(gn, "`").replace(bt, "{").replace(wt, "}").replace(Et, "^");
}
function _n(e) {
  return Oe(e).replace(fn, "%3D");
}
function En(e) {
  return Le(e).replace(yt, "%23").replace(dn, "%3F");
}
function bn(e) {
  return e == null ? "" : En(e).replace(un, "%2F");
}
function ne(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && R(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const wn = /\/$/, kn = (e) => e.replace(wn, "");
function Ce(e, t, n = "/") {
  let o, r = {}, i = "", c = "";
  const d = t.indexOf("#");
  let u = t.indexOf("?");
  return d < u && d >= 0 && (u = -1), u > -1 && (o = t.slice(0, u), i = t.slice(u + 1, d > -1 ? d : t.length), r = e(i)), d > -1 && (o = o || t.slice(0, d), c = t.slice(d, t.length)), o = Cn(o ?? t, n), {
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
  return o > -1 && o === r && K(t.matched[o], n.matched[r]) && kt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function K(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function kt(e, t) {
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
function Cn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return R(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
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
    if (F) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), kn(e);
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
        const i = document.querySelector(e.el);
        if (o && i) {
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
    t = $n(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Ye(e, t) {
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
function Rt(e, t) {
  const { pathname: n, search: o, hash: r } = t, i = e.indexOf("#");
  if (i > -1) {
    let d = r.includes(e.slice(i)) ? e.slice(i).length : 1, u = r.slice(d);
    return u[0] !== "/" && (u = "/" + u), ze(u, "");
  }
  return ze(n, e) + o + r;
}
function In(e, t, n, o) {
  let r = [], i = [], c = null;
  const d = ({ state: a }) => {
    const p = Rt(e, location), m = n.value, b = t.value;
    let w = 0;
    if (a) {
      if (n.value = p, t.value = a, c && c === m) {
        c = null;
        return;
      }
      w = b ? a.position - b.position : 0;
    } else
      o(p);
    r.forEach((y) => {
      y(n.value, m, {
        delta: w,
        type: ue.pop,
        direction: w ? w > 0 ? le.forward : le.back : le.unknown
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
function Vn(e) {
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
  function i(u, h, s) {
    const f = e.indexOf("#"), a = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + u : Dn() + e + u;
    try {
      t[s ? "replaceState" : "pushState"](h, "", a), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? R("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](a);
    }
  }
  function c(u, h) {
    const s = P({}, t.state, Je(
      r.value.back,
      // keep back and forward entries but override current position
      u,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    i(u, s, !0), o.value = u;
  }
  function d(u, h) {
    const s = P(
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
    process.env.NODE_ENV !== "production" && !t.state && R(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), i(s.current, s, !0);
    const f = P({}, Je(o.value, u, null), { position: s.position + 1 }, h);
    i(u, f, !1), o.value = u;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: c
  };
}
function jn(e) {
  e = Pn(e);
  const t = Vn(e), n = In(e, t.state, t.location, t.replace);
  function o(i, c = !0) {
    c || n.pauseListeners(), history.go(i);
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
function ve(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function St(e) {
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
}, Ae = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var Xe;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Xe || (Xe = {}));
const Ln = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Un(t)}" via a navigation guard.`;
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
  return process.env.NODE_ENV !== "production" ? P(new Error(Ln[e](t)), {
    type: e,
    [Ae]: !0
  }, t) : P(new Error(), {
    type: e,
    [Ae]: !0
  }, t);
}
function B(e, t) {
  return e instanceof Error && Ae in e && (t == null || !!(e.type & t));
}
const Mn = ["params", "query", "hash"];
function Un(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of Mn)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Ze = "[^/]+?", Bn = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Fn = /[.+*?^${}()[\]/\\]/g;
function qn(e, t) {
  const n = P({}, Bn, t), o = [];
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
        const { value: m, repeatable: b, optional: w, regexp: y } = a;
        i.push({
          name: m,
          repeatable: b,
          optional: w
        });
        const E = y || Ze;
        if (E !== Ze) {
          p += 10;
          try {
            new RegExp(`(${E})`);
          } catch (D) {
            throw new Error(`Invalid custom RegExp for param "${m}" (${E}): ` + D.message);
          }
        }
        let N = b ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        f || (N = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        w && h.length < 2 ? `(?:/${N})` : "/" + N), w && (N += "?"), r += N, p += 20, w && (p += -8), b && (p += -20), E === ".*" && (p += -50);
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
          const { value: m, repeatable: b, optional: w } = p, y = m in h ? h[m] : "";
          if (V(y) && !b)
            throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);
          const E = V(y) ? y.join("/") : y;
          if (!E)
            if (w)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : f = !0);
            else
              throw new Error(`Missing required param "${m}"`);
          s += E;
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
function Gn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const i = Hn(o[n], r[n]);
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
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), f(), c(), r;
}
function Qn(e, t, n) {
  const o = qn(Wn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const i = /* @__PURE__ */ new Set();
    for (const c of o.keys)
      i.has(c.name) && R(`Found duplicated params with name "${c.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), i.add(c.name);
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
function Yn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = ot({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function i(s, f, a) {
    const p = !a, m = Jn(s);
    process.env.NODE_ENV !== "production" && to(m, f), m.aliasOf = a && a.record;
    const b = ot(t, s), w = [
      m
    ];
    if ("alias" in s) {
      const N = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const D of N)
        w.push(P({}, m, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: a ? a.record.components : m.components,
          path: D,
          // we might be the child of an alias
          aliasOf: a ? a.record : m
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let y, E;
    for (const N of w) {
      const { path: D } = N;
      if (f && D[0] !== "/") {
        const W = f.record.path, U = W[W.length - 1] === "/" ? "" : "/";
        N.path = f.record.path + (D && U + D);
      }
      if (process.env.NODE_ENV !== "production" && N.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (y = Qn(N, f, b), process.env.NODE_ENV !== "production" && f && D[0] === "/" && no(y, f), a ? (a.alias.push(y), process.env.NODE_ENV !== "production" && eo(a, y)) : (E = E || y, E !== y && E.alias.push(y), p && s.name && !nt(y) && c(s.name)), m.children) {
        const W = m.children;
        for (let U = 0; U < W.length; U++)
          i(W[U], y, a && a.children[U]);
      }
      a = a || y, (y.record.components && Object.keys(y.record.components).length || y.record.name || y.record.redirect) && u(y);
    }
    return E ? () => {
      c(E);
    } : ce;
  }
  function c(s) {
    if (St(s)) {
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
    for (; f < n.length && Gn(s, n[f]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[f].record.path || !Ct(s, n[f])); )
      f++;
    n.splice(f, 0, s), s.record.name && !nt(s) && o.set(s.record.name, s);
  }
  function h(s, f) {
    let a, p = {}, m, b;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw oe(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const E = Object.keys(s.params || {}).filter((N) => !a.keys.find((D) => D.name === N));
        E.length && R(`Discarded invalid param(s) "${E.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      b = a.record.name, p = P(
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
      ), m = a.stringify(p);
    } else if (s.path != null)
      m = s.path, process.env.NODE_ENV !== "production" && !m.startsWith("/") && R(`The Matcher cannot resolve relative paths but received "${m}". Unless you directly called \`matcher.resolve("${m}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((E) => E.re.test(m)), a && (p = a.parse(m), b = a.record.name);
    else {
      if (a = f.name ? o.get(f.name) : n.find((E) => E.re.test(f.path)), !a)
        throw oe(1, {
          location: s,
          currentLocation: f
        });
      b = a.record.name, p = P({}, f.params, s.params), m = a.stringify(p);
    }
    const w = [];
    let y = a;
    for (; y; )
      w.unshift(y.record), y = y.parent;
    return {
      name: b,
      path: m,
      params: p,
      matched: w,
      meta: Zn(w)
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
function nt(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function Zn(e) {
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
function eo(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Te.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Te.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function to(e, t) {
  t && t.record.name && !e.name && !e.path && R(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function no(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Te.bind(null, n)))
      return R(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Ct(e, t) {
  return t.children.some((n) => n === e || Ct(e, n));
}
function oo(e) {
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
    if (n = _n(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (V(o) ? o.map((i) => i && Oe(i)) : [o && Oe(o)]).forEach((i) => {
      i !== void 0 && (t += (t.length ? "&" : "") + n, i != null && (t += "=" + i));
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
const so = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), st = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Me = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Pt = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), xe = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
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
    }, s = i(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? ao(h, t, n) : h));
    let f = Promise.resolve(s);
    if (e.length < 3 && (f = f.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        f = f.then((p) => h._called ? p : (R(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        R(a), u(new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((a) => u(a));
  });
}
function ao(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && R(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Pe(e, t, n, o, r = (i) => i()) {
  const i = [];
  for (const c of e) {
    process.env.NODE_ENV !== "production" && !c.components && !c.children.length && R(`Record with path "${c.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in c.components) {
      let u = c.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!u || typeof u != "object" && typeof u != "function")
          throw R(`Component "${d}" in record with path "${c.path}" is not a valid component. Received "${String(u)}".`), new Error("Invalid route component");
        if ("then" in u) {
          R(`Component "${d}" in record with path "${c.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = u;
          u = () => h;
        } else
          u.__asyncLoader && // warn only once per component
          !u.__warnedDefineAsync && (u.__warnedDefineAsync = !0, R(`Component "${d}" in record with path "${c.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !c.instances[d]))
        if (io(u)) {
          const s = (u.__vccOpts || u)[t];
          s && i.push(G(s, n, o, c, d, r));
        } else {
          let h = u();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (R(`Component "${d}" in record with path "${c.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), i.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${c.path}"`));
            const f = cn(s) ? s.default : s;
            c.components[d] = f;
            const p = (f.__vccOpts || f)[t];
            return p && G(p, n, o, c, d, r)();
          }));
        }
    }
  }
  return i;
}
function io(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function at(e) {
  const t = q(Me), n = q(Pt);
  let o = !1, r = null;
  const i = j(() => {
    const s = Z(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (ve(s) || (o ? R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), c = j(() => {
    const { matched: s } = i.value, { length: f } = s, a = s[f - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const m = p.findIndex(K.bind(null, a));
    if (m > -1)
      return m;
    const b = it(s[f - 2]);
    return (
      // we are dealing with nested routes
      f > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      it(a) === b && // avoid comparing the child with its parent
      p[p.length - 1].path !== b ? p.findIndex(K.bind(null, s[f - 2])) : m
    );
  }), d = j(() => c.value > -1 && fo(n.params, i.value.params)), u = j(() => c.value > -1 && c.value === n.matched.length - 1 && kt(n.params, i.value.params));
  function h(s = {}) {
    return uo(s) ? t[Z(e.replace) ? "replace" : "push"](
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
        isExactActive: u.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(f), Wt(() => {
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
const co = /* @__PURE__ */ z({
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
    const n = zt(at(e)), { options: o } = q(Me), r = j(() => ({
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
    } else if (!V(r) || r.length !== o.length || o.some((i, c) => i !== r[c]))
      return !1;
  }
  return !0;
}
function it(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const ct = (e, t, n) => e ?? t ?? n, ho = /* @__PURE__ */ z({
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
    const o = q(xe), r = j(() => e.route || o.value), i = q(st, 0), c = j(() => {
      let h = Z(i);
      const { matched: s } = r.value;
      let f;
      for (; (f = s[h]) && !f.components; )
        h++;
      return h;
    }), d = j(() => r.value.matched[c.value]);
    Re(st, j(() => c.value + 1)), Re(so, d), Re(xe, r);
    const u = L();
    return Ve(() => [u.value, d.value, e.name], ([h, s, f], [a, p, m]) => {
      s && (s.instances[f] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !K(s, p) || !a) && (s.enterCallbacks[f] || []).forEach((b) => b(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, f = d.value, a = f && f.components[s];
      if (!a)
        return lt(n.default, { Component: a, route: h });
      const p = f.props[s], m = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, w = ft(a, P({}, m, t, {
        onVnodeUnmounted: (y) => {
          y.component.isUnmounted && (f.instances[s] = null);
        },
        ref: u
      }));
      if (process.env.NODE_ENV !== "production" && F && w.ref) {
        const y = {
          depth: c.value,
          name: f.name,
          path: f.path,
          meta: f.meta
        };
        (V(w.ref) ? w.ref.map((N) => N.i) : [w.ref.i]).forEach((N) => {
          N.__vrv_devtools = y;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        lt(n.default, { Component: w, route: h }) || w
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
const po = ho;
function go() {
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
let vo = 0;
function mo(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = vo++;
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
          backgroundColor: Nt
        });
      }
      V(f.__vrl_devtools) && (f.__devtoolsApi = r, f.__vrl_devtools.forEach((a) => {
        let p = a.route.path, m = At, b = "", w = 0;
        a.error ? (p = a.error, m = wo, w = ko) : a.isExactActive ? (m = $t, b = "This is exactly active") : a.isActive && (m = Ot, b = "This link is active"), s.tags.push({
          label: p,
          textColor: w,
          tooltip: b,
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
const Nt = 15485081, Ot = 2450411, $t = 8702998, Eo = 2282478, At = 16486972, bo = 6710886, wo = 16704226, ko = 12131356;
function Tt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: Eo
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
    backgroundColor: bo
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
function Co(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function Po(e) {
  const t = Yn(e.routes, e), n = e.parseQuery || oo, o = e.stringifyQuery || rt, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const i = ae(), c = ae(), d = ae(), u = Ht(H);
  let h = H;
  F && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = Se.bind(null, (l) => "" + l), f = Se.bind(null, bn), a = (
    // @ts-expect-error: intentionally avoid the type check
    Se.bind(null, ne)
  );
  function p(l, v) {
    let g, _;
    return St(l) ? (g = t.getRecordMatcher(l), process.env.NODE_ENV !== "production" && !g && R(`Parent route "${String(l)}" not found when adding child route`, v), _ = v) : _ = l, t.addRoute(_, g);
  }
  function m(l) {
    const v = t.getRecordMatcher(l);
    v ? t.removeRoute(v) : process.env.NODE_ENV !== "production" && R(`Cannot remove non-existent route "${String(l)}"`);
  }
  function b() {
    return t.getRoutes().map((l) => l.record);
  }
  function w(l) {
    return !!t.getRecordMatcher(l);
  }
  function y(l, v) {
    if (v = P({}, v || u.value), typeof l == "string") {
      const k = Ce(n, l, v.path), T = t.resolve({ path: k.path }, v), Q = r.createHref(k.fullPath);
      return process.env.NODE_ENV !== "production" && (Q.startsWith("//") ? R(`Location "${l}" resolved to "${Q}". A resolved location cannot start with multiple slashes.`) : T.matched.length || R(`No match found for location with path "${l}"`)), P(k, T, {
        params: a(T.params),
        hash: ne(k.hash),
        redirectedFrom: void 0,
        href: Q
      });
    }
    process.env.NODE_ENV !== "production" && !ve(l) && (R(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, l), l = {});
    let g;
    if (l.path != null)
      process.env.NODE_ENV !== "production" && "params" in l && !("name" in l) && // @ts-expect-error: the type is never
      Object.keys(l.params).length && R(`Path "${l.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), g = P({}, l, {
        path: Ce(n, l.path, v.path).path
      });
    else {
      const k = P({}, l.params);
      for (const T in k)
        k[T] == null && delete k[T];
      g = P({}, l, {
        params: f(k)
      }), v.params = f(v.params);
    }
    const _ = t.resolve(g, v), C = l.hash || "";
    process.env.NODE_ENV !== "production" && C && !C.startsWith("#") && R(`A \`hash\` should always start with the character "#". Replace "${C}" with "#${C}".`), _.params = s(a(_.params));
    const x = Rn(o, P({}, l, {
      hash: yn(C),
      path: _.path
    })), S = r.createHref(x);
    return process.env.NODE_ENV !== "production" && (S.startsWith("//") ? R(`Location "${l}" resolved to "${S}". A resolved location cannot start with multiple slashes.`) : _.matched.length || R(`No match found for location with path "${l.path != null ? l.path : l}"`)), P({
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
        o === rt ? ro(l.query) : l.query || {}
      )
    }, _, {
      redirectedFrom: void 0,
      href: S
    });
  }
  function E(l) {
    return typeof l == "string" ? Ce(n, l, u.value.path) : P({}, l);
  }
  function N(l, v) {
    if (h !== l)
      return oe(8, {
        from: v,
        to: l
      });
  }
  function D(l) {
    return re(l);
  }
  function W(l) {
    return D(P(E(l), { replace: !0 }));
  }
  function U(l) {
    const v = l.matched[l.matched.length - 1];
    if (v && v.redirect) {
      const { redirect: g } = v;
      let _ = typeof g == "function" ? g(l) : g;
      if (typeof _ == "string" && (_ = _.includes("?") || _.includes("#") ? _ = E(_) : (
        // force empty params
        { path: _ }
      ), _.params = {}), process.env.NODE_ENV !== "production" && _.path == null && !("name" in _))
        throw R(`Invalid redirect found:
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
  function re(l, v) {
    const g = h = y(l), _ = u.value, C = l.state, x = l.force, S = l.replace === !0, k = U(g);
    if (k)
      return re(
        P(E(k), {
          state: typeof k == "object" ? P({}, C, k.state) : C,
          force: x,
          replace: S
        }),
        // keep original redirectedFrom if it exists
        v || g
      );
    const T = g;
    T.redirectedFrom = v;
    let Q;
    return !x && We(o, _, g) && (Q = oe(16, { to: T, from: _ }), He(
      _,
      _,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (Q ? Promise.resolve(Q) : Ue(T, _)).catch((I) => B(I) ? (
      // navigation redirects still mark the router as ready
      B(
        I,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? I : be(I)
    ) : (
      // reject any unknown error
      Ee(I, T, _)
    )).then((I) => {
      if (I) {
        if (B(
          I,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          We(o, y(I.to), T) && // and we have done it a couple of times
          v && // @ts-expect-error: added only in dev
          (v._count = v._count ? (
            // @ts-expect-error
            v._count + 1
          ) : 1) > 30 ? (R(`Detected a possibly infinite redirection in a navigation guard when going from "${_.fullPath}" to "${T.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : re(
            // keep options
            P({
              // preserve an existing replacement but allow the redirect to override it
              replace: S
            }, E(I.to), {
              state: typeof I.to == "object" ? P({}, C, I.to.state) : C,
              force: x
            }),
            // preserve the original redirectedFrom if any
            v || T
          );
      } else
        I = Fe(T, _, !0, S, C);
      return Be(T, _, I), I;
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
  function Ue(l, v) {
    let g;
    const [_, C, x] = No(l, v);
    g = Pe(_.reverse(), "beforeRouteLeave", l, v);
    for (const k of _)
      k.leaveGuards.forEach((T) => {
        g.push(G(T, l, v));
      });
    const S = Bt.bind(null, l, v);
    return g.push(S), J(g).then(() => {
      g = [];
      for (const k of i.list())
        g.push(G(k, l, v));
      return g.push(S), J(g);
    }).then(() => {
      g = Pe(C, "beforeRouteUpdate", l, v);
      for (const k of C)
        k.updateGuards.forEach((T) => {
          g.push(G(T, l, v));
        });
      return g.push(S), J(g);
    }).then(() => {
      g = [];
      for (const k of x)
        if (k.beforeEnter)
          if (V(k.beforeEnter))
            for (const T of k.beforeEnter)
              g.push(G(T, l, v));
          else
            g.push(G(k.beforeEnter, l, v));
      return g.push(S), J(g);
    }).then(() => (l.matched.forEach((k) => k.enterCallbacks = {}), g = Pe(x, "beforeRouteEnter", l, v, ye), g.push(S), J(g))).then(() => {
      g = [];
      for (const k of c.list())
        g.push(G(k, l, v));
      return g.push(S), J(g);
    }).catch((k) => B(
      k,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? k : Promise.reject(k));
  }
  function Be(l, v, g) {
    d.list().forEach((_) => ye(() => _(l, v, g)));
  }
  function Fe(l, v, g, _, C) {
    const x = N(l, v);
    if (x)
      return x;
    const S = v === H, k = F ? history.state : {};
    g && (_ || S ? r.replace(l.fullPath, P({
      scroll: S && k && k.scroll
    }, C)) : r.push(l.fullPath, C)), u.value = l, He(l, v, g, S), be();
  }
  let se;
  function Ft() {
    se || (se = r.listen((l, v, g) => {
      if (!Ge.listening)
        return;
      const _ = y(l), C = U(_);
      if (C) {
        re(P(C, { replace: !0 }), _).catch(ce);
        return;
      }
      h = _;
      const x = u.value;
      F && Tn(Ye(x.fullPath, g.delta), me()), Ue(_, x).catch((S) => B(
        S,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? S : B(
        S,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (re(
        S.to,
        _
        // avoid an uncaught rejection, let push call triggerError
      ).then((k) => {
        B(
          k,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !g.delta && g.type === ue.pop && r.go(-1, !1);
      }).catch(ce), Promise.reject()) : (g.delta && r.go(-g.delta, !1), Ee(S, _, x))).then((S) => {
        S = S || Fe(
          // after navigation, all matched components are resolved
          _,
          x,
          !1
        ), S && (g.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !B(
          S,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-g.delta, !1) : g.type === ue.pop && B(
          S,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Be(_, x, S);
      }).catch(ce);
    }));
  }
  let _e = ae(), qe = ae(), de;
  function Ee(l, v, g) {
    be(l);
    const _ = qe.list();
    return _.length ? _.forEach((C) => C(l, v, g)) : (process.env.NODE_ENV !== "production" && R("uncaught error during route navigation:"), console.error(l)), Promise.reject(l);
  }
  function qt() {
    return de && u.value !== H ? Promise.resolve() : new Promise((l, v) => {
      _e.add([l, v]);
    });
  }
  function be(l) {
    return de || (de = !l, Ft(), _e.list().forEach(([v, g]) => l ? g(l) : v()), _e.reset()), l;
  }
  function He(l, v, g, _) {
    const { scrollBehavior: C } = e;
    if (!F || !C)
      return Promise.resolve();
    const x = !g && xn(Ye(l.fullPath, 0)) || (_ || !g) && history.state && history.state.scroll || null;
    return Kt().then(() => C(l, v, x)).then((S) => S && An(S)).catch((S) => Ee(S, l, v));
  }
  const we = (l) => r.go(l);
  let ke;
  const he = /* @__PURE__ */ new Set(), Ge = {
    currentRoute: u,
    listening: !0,
    addRoute: p,
    removeRoute: m,
    hasRoute: w,
    getRoutes: b,
    resolve: y,
    options: e,
    push: D,
    replace: W,
    go: we,
    back: () => we(-1),
    forward: () => we(1),
    beforeEach: i.add,
    beforeResolve: c.add,
    afterEach: d.add,
    onError: qe.add,
    isReady: qt,
    install(l) {
      const v = this;
      l.component("RouterLink", lo), l.component("RouterView", po), l.config.globalProperties.$router = v, Object.defineProperty(l.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Z(u)
      }), F && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !ke && u.value === H && (ke = !0, D(r.location).catch((C) => {
        process.env.NODE_ENV !== "production" && R("Unexpected error when starting the router:", C);
      }));
      const g = {};
      for (const C in H)
        Object.defineProperty(g, C, {
          get: () => u.value[C],
          enumerable: !0
        });
      l.provide(Me, v), l.provide(Pt, Gt(g)), l.provide(xe, u);
      const _ = l.unmount;
      he.add(l), l.unmount = function() {
        he.delete(l), he.size < 1 && (h = H, se && se(), se = null, u.value = H, ke = !1, de = !1), _();
      }, process.env.NODE_ENV !== "production" && F && mo(l, v, t);
    }
  };
  function J(l) {
    return l.reduce((v, g) => v.then(() => ye(g)), Promise.resolve());
  }
  return Ge;
}
function No(e, t) {
  const n = [], o = [], r = [], i = Math.max(t.matched.length, e.matched.length);
  for (let c = 0; c < i; c++) {
    const d = t.matched[c];
    d && (e.matched.find((h) => K(h, d)) ? o.push(d) : n.push(d));
    const u = e.matched[c];
    u && (t.matched.find((h) => K(h, u)) || r.push(u));
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
  { "course:Unknown": 10 },
  { "course:Unknown": 10 },
  { "course:Unknown": 10 },
  { "course:Unknown": 10 },
  { "subject:Unknown": 20 },
  { "system:Unknown": 15 },
  { "system:Unknow": 20 },
  { "topic:Unknow": 10 }
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
    }), r = await (await fetch(`${t}?${n}`)).json() ?? $o, i = new Set(r);
    return Array.from(i);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, Io = async (e) => {
  try {
    return await (await fetch(e)).json();
  } catch (t) {
    return alert(
      "An error occurred while fetching tags" + t + "fallback to static tags"
    ), {};
  }
}, Vo = async (e) => {
  const t = await Io(e), n = Object.keys(t).map((o) => ({
    [o]: t[o]
  }));
  return It(n);
}, It = (e) => e ? e.reduce(
  (t, n) => {
    const [o, r] = Object.keys(n)[0].split(":"), i = Object.values(n)[0];
    return t[o] || (t[o] = []), t[o].push({ [r.replace("_", " ")]: i }), t;
  },
  {}
) : {}, jo = It(Ao), Lo = { class: "search-results-container" }, Mo = { class: "container-description" }, Uo = { class: "label-badges" }, Bo = {
  key: 0,
  class: "results"
}, Fo = ["href"], qo = {
  key: 1,
  class: "no-results"
}, Ho = /* @__PURE__ */ z({
  __name: "DisplayResult",
  setup(e) {
    const t = q("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("Retrieving data from:", t);
    const n = L([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = Ut(), r = L("");
    je(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, await i(r.value)) : r.value = "undefined";
    });
    const i = async (c) => {
      const d = await xo(c, t);
      d && (n.value = d);
    };
    return Ve(o.currentRoute, async (c, d) => {
      const u = c.query.tag || "", h = d.query.tag || "";
      u !== h && await i(u);
    }), (c, d) => ($(), A("div", Lo, [
      O("div", Mo, [
        O("button", {
          onClick: d[0] || (d[0] = () => c.$router.back())
        }, "↵"),
        O("div", Uo, " (" + M(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? ($(), A("div", Bo, [
        O("ul", null, [
          ($(!0), A(Y, null, ee(n.value, (u, h) => ($(), A("li", { key: h }, [
            O("a", {
              href: u.url,
              target: "_blank",
              class: "linkToResource"
            }, M(u.label), 9, Fo)
          ]))), 128))
        ])
      ])) : ($(), A("p", qo, "No results found"))
    ]));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Ie = /* @__PURE__ */ fe(Ho, [["__scopeId", "data-v-ae262433"]]), Vt = (e) => (ht("data-v-b97c2a53"), e = e(), pt(), e), Go = /* @__PURE__ */ Vt(() => /* @__PURE__ */ O("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }, null, -1)), Ko = /* @__PURE__ */ Vt(() => /* @__PURE__ */ O("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}, null, -1)), zo = [
  Go,
  Ko
], Wo = /* @__PURE__ */ z({
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
    }, zo, 2));
  }
}), jt = /* @__PURE__ */ fe(Wo, [["__scopeId", "data-v-b97c2a53"]]), ut = /* @__PURE__ */ z({
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
}), Lt = (e) => (ht("data-v-ed4d0275"), e = e(), pt(), e), Qo = { class: "crucible-filter-container" }, Yo = {
  key: 0,
  class: "crucible-filter-panel"
}, Jo = { class: "crucible-filter-action" }, Xo = /* @__PURE__ */ Lt(() => /* @__PURE__ */ O("hr", null, null, -1)), Zo = { class: "crucible-filter-collection" }, er = /* @__PURE__ */ Lt(() => /* @__PURE__ */ O("h5", null, "Selected: ", -1)), tr = ["onClick"], nr = { class: "capital-first" }, or = { class: "crucible-filters" }, rr = ["onClick"], sr = { class: "crucible-filter-dropdown-menu" }, ar = ["id", "value", "onClick", "checked"], ir = ["for"], cr = /* @__PURE__ */ z({
  __name: "CrucibleFilter",
  emits: ["updateFilterTagArray", "checkTaxonomyExists"],
  setup(e, { emit: t }) {
    const n = t, o = q("$filterSetApi") || "http://localhost:8080/api/resource/getFilterSet", r = L(!1), i = L({}), c = L([]), d = L({}), u = L(!1), h = (m) => {
      i.value[m] = !i.value[m], console.log(u.value);
    }, s = (m, b) => {
      const w = `${m}:${b.replace(" ", "_")}`;
      c.value.includes(w) ? c.value = c.value.filter(
        (y) => y !== w
      ) : c.value.push(w);
    }, f = j(() => c.value.map(
      (m) => m.split(":")[1].replace("_", " ")
    )), a = () => {
      i.value = {}, c.value = [];
    }, p = () => {
      n("updateFilterTagArray", c);
    };
    return je(async () => {
      const m = await Vo(o), b = Object.keys(m).length > 0;
      d.value = b ? m : jo, u.value = b, n("checkTaxonomyExists", u);
    }), (m, b) => ($(), A("div", Qo, [
      r.value ? ($(), A("div", Yo, [
        O("div", Jo, [
          te(ut, {
            "action-type": "apply",
            onClick: p
          }),
          te(ut, {
            "action-type": "clear",
            onClick: a
          })
        ]),
        Xo,
        O("div", Zo, [
          er,
          ($(!0), A(Y, null, ee(c.value, (w, y) => ($(), A("span", {
            key: y,
            onClick: (E) => c.value.splice(y, 1)
          }, [
            Qt(" ☒ "),
            O("strong", null, M(w.split(":")[0]), 1),
            O("span", nr, M(w.split(":")[1].replace("_", " ")), 1)
          ], 8, tr))), 128))
        ]),
        O("div", or, [
          ($(!0), A(Y, null, ee(d.value, (w, y) => ($(), A("div", {
            key: y,
            class: "crucible-filter-dropdown"
          }, [
            O("h4", {
              class: ge(i.value[y] ? "selected-background" : ""),
              onClick: (E) => h(y)
            }, [
              O("span", null, M(y), 1),
              te(jt, {
                "show-dropdown": i.value[y]
              }, null, 8, ["show-dropdown"])
            ], 10, rr),
            gt(O("div", sr, [
              ($(!0), A(Y, null, ee(w, (E, N) => ($(), A("div", {
                key: N,
                class: ge(
                  f.value.includes(Object.keys(E)[0]) ? "selected-filter-tag column" : "column"
                )
              }, [
                O("input", {
                  id: `tag-${y}-${N.toString()}`,
                  type: "checkbox",
                  value: Object.keys(E)[0],
                  onClick: (D) => s(y, Object.keys(E)[0]),
                  checked: f.value.includes(Object.keys(E)[0])
                }, null, 8, ar),
                O("label", {
                  for: `tag-${y}-${N.toString()}`
                }, [
                  O("span", null, M(Object.keys(E)[0]), 1),
                  O("span", null, " (" + M(Object.values(E)[0]) + ") ", 1)
                ], 8, ir)
              ], 2))), 128))
            ], 512), [
              [Yt, i.value[y]]
            ])
          ]))), 128))
        ])
      ])) : vt("", !0),
      O("button", {
        class: ge(
          r.value ? "crucible-filter-control svg-background-light" : "crucible-filter-control crucible-filter-control-light svg-background-dark"
        ),
        onClick: b[0] || (b[0] = (w) => r.value = !r.value)
      }, null, 2)
    ]));
  }
}), Mt = /* @__PURE__ */ fe(cr, [["__scopeId", "data-v-ed4d0275"]]), lr = { id: "app" }, ur = { class: "main" }, fr = /* @__PURE__ */ z({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = Ke("CrucibleSearch"), r = Ke("RouterView");
      return $(), A("div", lr, [
        O("div", ur, [
          te(o),
          te(r),
          O("div", null, [
            te(Mt)
          ])
        ])
      ]);
    };
  }
}), dr = /* @__PURE__ */ fe(fr, [["__scopeId", "data-v-aabb2d26"]]), hr = [
  { path: "/", component: dr },
  { path: "/search", component: Ie }
], pr = Po({
  history: jn("/"),
  routes: hr
});
function Ut() {
  const e = q("$router");
  return e || pr;
}
const gr = { class: "search-container" }, vr = { key: 0 }, mr = ["onClick"], yr = 10, _r = /* @__PURE__ */ z({
  __name: "CrucibleSearch",
  setup(e) {
    const t = Ut(), n = L(""), o = L([]), r = L(!1), i = L(null), c = q("$tagsApi") || "http://localhost:8080/api/resource/alltags", d = (b) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(b.toLowerCase())
    ), u = (b) => b.replace(/_/g, " "), h = (b) => b.replace(/ /g, "_"), s = async () => {
      n.value ? (o.value = (await Do(n.value, c)).slice(0, yr), o.value = o.value.map(u), r.value = !0) : (o.value = [], r.value = !1);
    }, f = (b) => {
      n.value = o.value.includes(b) ? b : o.value[0], r.value = !1, t.push({
        path: "/search",
        query: { tag: h(n.value) }
      });
    }, a = () => {
      o.value.length && n.value && (r.value = !0);
    }, p = (b) => {
      b.key === "Enter" ? (f(n.value), n.value = "") : b.key === "Tab" && (b.preventDefault(), n.value = o.value[0] ?? n.value);
    }, m = (b) => {
      i.value && !i.value.contains(b.target) && (r.value = !1);
    };
    return je(() => {
      document.addEventListener("click", m);
    }), Jt(() => {
      document.removeEventListener("click", m);
    }), (b, w) => ($(), A("div", gr, [
      O("div", {
        ref_key: "searchBoxRef",
        ref: i,
        class: "search-container"
      }, [
        gt(O("input", {
          "onUpdate:modelValue": w[0] || (w[0] = (y) => n.value = y),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: s,
          onFocus: a,
          onKeydown: p
        }, null, 544), [
          [Xt, n.value]
        ]),
        o.value.length && n.value && r.value ? ($(), A("ul", vr, [
          ($(!0), A(Y, null, ee(o.value, (y) => ($(), A("li", {
            key: y,
            onClick: (E) => f(y)
          }, [
            ($(!0), A(Y, null, ee(y.split(""), (E, N) => ($(), A(Y, null, [
              d(E) ? ($(), A("strong", {
                key: `strong-${N}`
              }, M(E), 1)) : ($(), A("span", { key: N }, M(E), 1))
            ], 64))), 256))
          ], 8, mr))), 128))
        ])) : vt("", !0)
      ], 512)
    ]));
  }
}), Er = /* @__PURE__ */ fe(_r, [["__scopeId", "data-v-5cb7fe60"]]);
function wr(e, t) {
  const { router: n, getApi: o, tagsApi: r, filterSetApi: i } = t;
  e.component("CrucibleSearch", Er), e.component("DisplayResult", Ie), e.component("CrucibleFilter", Mt), e.component("CollapseBtn", jt), e.provide("$router", n || null), e.provide("$getApi", o || null), e.provide("$tagsApi", r || null), e.provide("$filterSetApi", i || null), n.addRoute({ path: "/search", component: Ie });
}
export {
  jt as CollapseBtn,
  Mt as CrucibleFilter,
  Er as CrucibleSearch,
  Ie as DisplayResult,
  wr as createSearchFilterPlugin
};
