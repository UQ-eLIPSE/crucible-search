import { shallowRef as Dt, unref as z, shallowReactive as Vt, nextTick as It, defineComponent as le, reactive as jt, inject as G, computed as j, h as ct, provide as we, ref as H, watch as Ie, getCurrentInstance as lt, watchEffect as Lt, onMounted as ut, openBlock as A, createElementBlock as T, createElementVNode as I, toDisplayString as X, Fragment as J, renderList as ie, resolveComponent as Re, createVNode as ke, onUnmounted as Mt, withDirectives as ft, vModelText as Ut, createCommentVNode as Bt, vShow as qt } from "vue";
function Ht() {
  return dt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function dt() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Gt = typeof Proxy == "function", Kt = "devtools-plugin:setup", Wt = "plugin:settings:set";
let Y, Oe;
function Ft() {
  var e;
  return Y !== void 0 || (typeof window < "u" && window.performance ? (Y = !0, Oe = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Y = !0, Oe = globalThis.perf_hooks.performance) : Y = !1), Y;
}
function zt() {
  return Ft() ? Oe.now() : Date.now();
}
class Qt {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const i in t.settings) {
        const d = t.settings[i];
        o[i] = d.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let f = Object.assign({}, o);
    try {
      const i = localStorage.getItem(r), d = JSON.parse(i);
      Object.assign(f, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return f;
      },
      setSettings(i) {
        try {
          localStorage.setItem(r, JSON.stringify(i));
        } catch {
        }
        f = i;
      },
      now() {
        return zt();
      }
    }, n && n.on(Wt, (i, d) => {
      i === this.plugin.id && this.fallbacks.setSettings(d);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, d) => this.target ? this.target.on[d] : (...c) => {
        this.onQueue.push({
          method: d,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, d) => this.target ? this.target[d] : d === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(d) ? (...c) => (this.targetQueue.push({
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
function Yt(e, t) {
  const n = e, o = dt(), r = Ht(), f = Gt && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !f))
    r.emit(Kt, e, t);
  else {
    const i = f ? new Qt(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const U = typeof document < "u";
function Jt(e) {
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
const se = () => {
}, V = Array.isArray;
function w(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const ht = /#/g, Xt = /&/g, Zt = /\//g, en = /=/g, tn = /\?/g, pt = /\+/g, nn = /%5B/g, on = /%5D/g, mt = /%5E/g, rn = /%60/g, gt = /%7B/g, sn = /%7C/g, vt = /%7D/g, an = /%20/g;
function je(e) {
  return encodeURI("" + e).replace(sn, "|").replace(nn, "[").replace(on, "]");
}
function cn(e) {
  return je(e).replace(gt, "{").replace(vt, "}").replace(mt, "^");
}
function Ce(e) {
  return je(e).replace(pt, "%2B").replace(an, "+").replace(ht, "%23").replace(Xt, "%26").replace(rn, "`").replace(gt, "{").replace(vt, "}").replace(mt, "^");
}
function ln(e) {
  return Ce(e).replace(en, "%3D");
}
function un(e) {
  return je(e).replace(ht, "%23").replace(tn, "%3F");
}
function fn(e) {
  return e == null ? "" : un(e).replace(Zt, "%2F");
}
function Z(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && w(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const dn = /\/$/, hn = (e) => e.replace(dn, "");
function Pe(e, t, n = "/") {
  let o, r = {}, f = "", i = "";
  const d = t.indexOf("#");
  let c = t.indexOf("?");
  return d < c && d >= 0 && (c = -1), c > -1 && (o = t.slice(0, c), f = t.slice(c + 1, d > -1 ? d : t.length), r = e(f)), d > -1 && (o = o || t.slice(0, d), i = t.slice(d, t.length)), o = gn(o ?? t, n), {
    fullPath: o + (f && "?") + f + i,
    path: o,
    query: r,
    hash: Z(i)
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
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && K(t.matched[o], n.matched[r]) && yt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function K(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function yt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!mn(e[n], t[n]))
      return !1;
  return !0;
}
function mn(e, t) {
  return V(e) ? Fe(e, t) : V(t) ? Fe(t, e) : e === t;
}
function Fe(e, t) {
  return V(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function gn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return w(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let f = n.length - 1, i, d;
  for (i = 0; i < o.length; i++)
    if (d = o[i], d !== ".")
      if (d === "..")
        f > 1 && f--;
      else
        break;
  return n.slice(0, f).join("/") + "/" + o.slice(i).join("/");
}
var ce;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ce || (ce = {}));
var ae;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(ae || (ae = {}));
function vn(e) {
  if (!e)
    if (U) {
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
const pe = () => ({
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
    const r = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) {
      process.env.NODE_ENV !== "production" && w(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = En(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function ze(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const $e = /* @__PURE__ */ new Map();
function wn(e, t) {
  $e.set(e, t);
}
function Rn(e) {
  const t = $e.get(e);
  return $e.delete(e), t;
}
let kn = () => location.protocol + "//" + location.host;
function _t(e, t) {
  const { pathname: n, search: o, hash: r } = t, f = e.indexOf("#");
  if (f > -1) {
    let d = r.includes(e.slice(f)) ? e.slice(f).length : 1, c = r.slice(d);
    return c[0] !== "/" && (c = "/" + c), Ke(c, "");
  }
  return Ke(n, e) + o + r;
}
function Sn(e, t, n, o) {
  let r = [], f = [], i = null;
  const d = ({ state: a }) => {
    const p = _t(e, location), y = n.value, S = t.value;
    let k = 0;
    if (a) {
      if (n.value = p, t.value = a, i && i === y) {
        i = null;
        return;
      }
      k = S ? a.position - S.position : 0;
    } else
      o(p);
    r.forEach((_) => {
      _(n.value, y, {
        delta: k,
        type: ce.pop,
        direction: k ? k > 0 ? ae.forward : ae.back : ae.unknown
      });
    });
  };
  function c() {
    i = n.value;
  }
  function h(a) {
    r.push(a);
    const p = () => {
      const y = r.indexOf(a);
      y > -1 && r.splice(y, 1);
    };
    return f.push(p), p;
  }
  function s() {
    const { history: a } = window;
    a.state && a.replaceState(N({}, a.state, { scroll: pe() }), "");
  }
  function u() {
    for (const a of f)
      a();
    f = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: c,
    listen: h,
    destroy: u
  };
}
function Qe(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? pe() : null
  };
}
function Pn(e) {
  const { history: t, location: n } = window, o = {
    value: _t(e, n)
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
  function f(c, h, s) {
    const u = e.indexOf("#"), a = u > -1 ? (n.host && document.querySelector("base") ? e : e.slice(u)) + c : kn() + e + c;
    try {
      t[s ? "replaceState" : "pushState"](h, "", a), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? w("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](a);
    }
  }
  function i(c, h) {
    const s = N({}, t.state, Qe(
      r.value.back,
      // keep back and forward entries but override current position
      c,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    f(c, s, !0), o.value = c;
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
        scroll: pe()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && w(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), f(s.current, s, !0);
    const u = N({}, Qe(o.value, c, null), { position: s.position + 1 }, h);
    f(c, u, !1), o.value = c;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: i
  };
}
function Nn(e) {
  e = vn(e);
  const t = Pn(e), n = Sn(e, t.state, t.location, t.replace);
  function o(f, i = !0) {
    i || n.pauseListeners(), history.go(f);
  }
  const r = N({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: _n.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function he(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Et(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const B = {
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
function ee(e, t) {
  return process.env.NODE_ENV !== "production" ? N(new Error(On[e](t)), {
    type: e,
    [Ae]: !0
  }, t) : N(new Error(), {
    type: e,
    [Ae]: !0
  }, t);
}
function M(e, t) {
  return e instanceof Error && Ae in e && (t == null || !!(e.type & t));
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
}, Tn = /[.+*?^${}()[\]/\\]/g;
function xn(e, t) {
  const n = N({}, An, t), o = [];
  let r = n.start ? "^" : "";
  const f = [];
  for (const h of e) {
    const s = h.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !h.length && (r += "/");
    for (let u = 0; u < h.length; u++) {
      const a = h[u];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (a.type === 0)
        u || (r += "/"), r += a.value.replace(Tn, "\\$&"), p += 40;
      else if (a.type === 1) {
        const { value: y, repeatable: S, optional: k, regexp: _ } = a;
        f.push({
          name: y,
          repeatable: S,
          optional: k
        });
        const E = _ || Je;
        if (E !== Je) {
          p += 10;
          try {
            new RegExp(`(${E})`);
          } catch (D) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${E}): ` + D.message);
          }
        }
        let C = S ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        u || (C = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        k && h.length < 2 ? `(?:/${C})` : "/" + C), k && (C += "?"), r += C, p += 20, k && (p += -8), S && (p += -20), E === ".*" && (p += -50);
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
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function d(h) {
    const s = h.match(i), u = {};
    if (!s)
      return null;
    for (let a = 1; a < s.length; a++) {
      const p = s[a] || "", y = f[a - 1];
      u[y.name] = p && y.repeatable ? p.split("/") : p;
    }
    return u;
  }
  function c(h) {
    let s = "", u = !1;
    for (const a of e) {
      (!u || !s.endsWith("/")) && (s += "/"), u = !1;
      for (const p of a)
        if (p.type === 0)
          s += p.value;
        else if (p.type === 1) {
          const { value: y, repeatable: S, optional: k } = p, _ = y in h ? h[y] : "";
          if (V(_) && !S)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const E = V(_) ? _.join("/") : _;
          if (!E)
            if (k)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : u = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          s += E;
        }
    }
    return s || "/";
  }
  return {
    re: i,
    score: o,
    keys: f,
    parse: d,
    stringify: c
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
function Vn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const f = Dn(o[n], r[n]);
    if (f)
      return f;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (Xe(o))
      return 1;
    if (Xe(r))
      return -1;
  }
  return r.length - o.length;
}
function Xe(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const In = {
  type: 0,
  value: ""
}, jn = /[a-zA-Z0-9_]/;
function Ln(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[In]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${h}": ${p}`);
  }
  let n = 0, o = n;
  const r = [];
  let f;
  function i() {
    f && r.push(f), f = [];
  }
  let d = 0, c, h = "", s = "";
  function u() {
    h && (n === 0 ? f.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (f.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), f.push({
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
        c === "/" ? (h && u(), i()) : c === ":" ? (u(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        c === "(" ? n = 2 : jn.test(c) ? a() : (u(), n = 0, c !== "*" && c !== "?" && c !== "+" && d--);
        break;
      case 2:
        c === ")" ? s[s.length - 1] == "\\" ? s = s.slice(0, -1) + c : n = 3 : s += c;
        break;
      case 3:
        u(), n = 0, c !== "*" && c !== "?" && c !== "+" && d--, s = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), u(), i(), r;
}
function Mn(e, t, n) {
  const o = xn(Ln(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const f = /* @__PURE__ */ new Set();
    for (const i of o.keys)
      f.has(i.name) && w(`Found duplicated params with name "${i.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), f.add(i.name);
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
function Un(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = tt({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function f(s, u, a) {
    const p = !a, y = Bn(s);
    process.env.NODE_ENV !== "production" && Kn(y, u), y.aliasOf = a && a.record;
    const S = tt(t, s), k = [
      y
    ];
    if ("alias" in s) {
      const C = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const D of C)
        k.push(N({}, y, {
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
    let _, E;
    for (const C of k) {
      const { path: D } = C;
      if (u && D[0] !== "/") {
        const W = u.record.path, L = W[W.length - 1] === "/" ? "" : "/";
        C.path = u.record.path + (D && L + D);
      }
      if (process.env.NODE_ENV !== "production" && C.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (_ = Mn(C, u, S), process.env.NODE_ENV !== "production" && u && D[0] === "/" && Wn(_, u), a ? (a.alias.push(_), process.env.NODE_ENV !== "production" && Gn(a, _)) : (E = E || _, E !== _ && E.alias.push(_), p && s.name && !et(_) && i(s.name)), y.children) {
        const W = y.children;
        for (let L = 0; L < W.length; L++)
          f(W[L], _, a && a.children[L]);
      }
      a = a || _, (_.record.components && Object.keys(_.record.components).length || _.record.name || _.record.redirect) && c(_);
    }
    return E ? () => {
      i(E);
    } : se;
  }
  function i(s) {
    if (Et(s)) {
      const u = o.get(s);
      u && (o.delete(s), n.splice(n.indexOf(u), 1), u.children.forEach(i), u.alias.forEach(i));
    } else {
      const u = n.indexOf(s);
      u > -1 && (n.splice(u, 1), s.record.name && o.delete(s.record.name), s.children.forEach(i), s.alias.forEach(i));
    }
  }
  function d() {
    return n;
  }
  function c(s) {
    let u = 0;
    for (; u < n.length && Vn(s, n[u]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[u].record.path || !bt(s, n[u])); )
      u++;
    n.splice(u, 0, s), s.record.name && !et(s) && o.set(s.record.name, s);
  }
  function h(s, u) {
    let a, p = {}, y, S;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw ee(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const E = Object.keys(s.params || {}).filter((C) => !a.keys.find((D) => D.name === C));
        E.length && w(`Discarded invalid param(s) "${E.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      S = a.record.name, p = N(
        // paramsFromLocation is a new object
        Ze(
          u.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          a.keys.filter((E) => !E.optional).concat(a.parent ? a.parent.keys.filter((E) => E.optional) : []).map((E) => E.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && Ze(s.params, a.keys.map((E) => E.name))
      ), y = a.stringify(p);
    } else if (s.path != null)
      y = s.path, process.env.NODE_ENV !== "production" && !y.startsWith("/") && w(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((E) => E.re.test(y)), a && (p = a.parse(y), S = a.record.name);
    else {
      if (a = u.name ? o.get(u.name) : n.find((E) => E.re.test(u.path)), !a)
        throw ee(1, {
          location: s,
          currentLocation: u
        });
      S = a.record.name, p = N({}, u.params, s.params), y = a.stringify(p);
    }
    const k = [];
    let _ = a;
    for (; _; )
      k.unshift(_.record), _ = _.parent;
    return {
      name: S,
      path: y,
      params: p,
      matched: k,
      meta: Hn(k)
    };
  }
  return e.forEach((s) => f(s)), { addRoute: f, resolve: h, removeRoute: i, getRoutes: d, getRecordMatcher: r };
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
  return e.reduce((t, n) => N(t, n.meta), {});
}
function tt(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function Te(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function Gn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Te.bind(null, n)))
      return w(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Te.bind(null, n)))
      return w(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Kn(e, t) {
  t && t.record.name && !e.name && !e.path && w(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Wn(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Te.bind(null, n)))
      return w(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function bt(e, t) {
  return t.children.some((n) => n === e || bt(e, n));
}
function Fn(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const f = o[r].replace(pt, " "), i = f.indexOf("="), d = Z(i < 0 ? f : f.slice(0, i)), c = i < 0 ? null : Z(f.slice(i + 1));
    if (d in t) {
      let h = t[d];
      V(h) || (h = t[d] = [h]), h.push(c);
    } else
      t[d] = c;
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
    (V(o) ? o.map((f) => f && Ce(f)) : [o && Ce(o)]).forEach((f) => {
      f !== void 0 && (t += (t.length ? "&" : "") + n, f != null && (t += "=" + f));
    });
  }
  return t;
}
function zn(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = V(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const Qn = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), ot = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Le = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), wt = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), xe = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function oe() {
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
function q(e, t, n, o, r, f = (i) => i()) {
  const i = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((d, c) => {
    const h = (a) => {
      a === !1 ? c(ee(4, {
        from: n,
        to: t
      })) : a instanceof Error ? c(a) : he(a) ? c(ee(2, {
        from: t,
        to: a
      })) : (i && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === i && typeof a == "function" && i.push(a), d());
    }, s = f(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? Yn(h, t, n) : h));
    let u = Promise.resolve(s);
    if (e.length < 3 && (u = u.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        u = u.then((p) => h._called ? p : (w(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        w(a), c(new Error("Invalid navigation guard"));
        return;
      }
    }
    u.catch((a) => c(a));
  });
}
function Yn(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && w(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Ne(e, t, n, o, r = (f) => f()) {
  const f = [];
  for (const i of e) {
    process.env.NODE_ENV !== "production" && !i.components && !i.children.length && w(`Record with path "${i.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in i.components) {
      let c = i.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!c || typeof c != "object" && typeof c != "function")
          throw w(`Component "${d}" in record with path "${i.path}" is not a valid component. Received "${String(c)}".`), new Error("Invalid route component");
        if ("then" in c) {
          w(`Component "${d}" in record with path "${i.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = c;
          c = () => h;
        } else
          c.__asyncLoader && // warn only once per component
          !c.__warnedDefineAsync && (c.__warnedDefineAsync = !0, w(`Component "${d}" in record with path "${i.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !i.instances[d]))
        if (Jn(c)) {
          const s = (c.__vccOpts || c)[t];
          s && f.push(q(s, n, o, i, d, r));
        } else {
          let h = c();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (w(`Component "${d}" in record with path "${i.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), f.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${i.path}"`));
            const u = Jt(s) ? s.default : s;
            i.components[d] = u;
            const p = (u.__vccOpts || u)[t];
            return p && q(p, n, o, i, d, r)();
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
  const t = G(Le), n = G(wt);
  let o = !1, r = null;
  const f = j(() => {
    const s = z(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (he(s) || (o ? w(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : w(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), i = j(() => {
    const { matched: s } = f.value, { length: u } = s, a = s[u - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const y = p.findIndex(K.bind(null, a));
    if (y > -1)
      return y;
    const S = st(s[u - 2]);
    return (
      // we are dealing with nested routes
      u > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      st(a) === S && // avoid comparing the child with its parent
      p[p.length - 1].path !== S ? p.findIndex(K.bind(null, s[u - 2])) : y
    );
  }), d = j(() => i.value > -1 && to(n.params, f.value.params)), c = j(() => i.value > -1 && i.value === n.matched.length - 1 && yt(n.params, f.value.params));
  function h(s = {}) {
    return eo(s) ? t[z(e.replace) ? "replace" : "push"](
      z(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(se) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && U) {
    const s = lt();
    if (s) {
      const u = {
        route: f.value,
        isActive: d.value,
        isExactActive: c.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(u), Lt(() => {
        u.route = f.value, u.isActive = d.value, u.isExactActive = c.value, u.error = he(z(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: f,
    href: j(() => f.value.href),
    isActive: d,
    isExactActive: c,
    navigate: h
  };
}
const Xn = /* @__PURE__ */ le({
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
    const n = jt(rt(e)), { options: o } = G(Le), r = j(() => ({
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
        class: r.value
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
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!V(r) || r.length !== o.length || o.some((f, i) => f !== r[i]))
      return !1;
  }
  return !0;
}
function st(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const at = (e, t, n) => e ?? t ?? n, no = /* @__PURE__ */ le({
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
    const o = G(xe), r = j(() => e.route || o.value), f = G(ot, 0), i = j(() => {
      let h = z(f);
      const { matched: s } = r.value;
      let u;
      for (; (u = s[h]) && !u.components; )
        h++;
      return h;
    }), d = j(() => r.value.matched[i.value]);
    we(ot, j(() => i.value + 1)), we(Qn, d), we(xe, r);
    const c = H();
    return Ie(() => [c.value, d.value, e.name], ([h, s, u], [a, p, y]) => {
      s && (s.instances[u] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !K(s, p) || !a) && (s.enterCallbacks[u] || []).forEach((S) => S(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, u = d.value, a = u && u.components[s];
      if (!a)
        return it(n.default, { Component: a, route: h });
      const p = u.props[s], y = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, k = ct(a, N({}, y, t, {
        onVnodeUnmounted: (_) => {
          _.component.isUnmounted && (u.instances[s] = null);
        },
        ref: c
      }));
      if (process.env.NODE_ENV !== "production" && U && k.ref) {
        const _ = {
          depth: i.value,
          name: u.name,
          path: u.path,
          meta: u.meta
        };
        (V(k.ref) ? k.ref.map((C) => C.i) : [k.ref.i]).forEach((C) => {
          C.__vrv_devtools = _;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        it(n.default, { Component: k, route: h }) || k
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
function re(e, t) {
  const n = N({}, e, {
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
function de(e) {
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
  }, (r) => {
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((s, u) => {
      s.instanceData && s.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: re(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: u }) => {
      if (u.__vrv_devtools) {
        const a = u.__vrv_devtools;
        s.tags.push({
          label: (a.name ? `${a.name.toString()}: ` : "") + a.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: Rt
        });
      }
      V(u.__vrl_devtools) && (u.__devtoolsApi = r, u.__vrl_devtools.forEach((a) => {
        let p = a.route.path, y = Pt, S = "", k = 0;
        a.error ? (p = a.error, y = fo, k = ho) : a.isExactActive ? (y = St, S = "This is exactly active") : a.isActive && (y = kt, S = "This link is active"), s.tags.push({
          label: p,
          textColor: k,
          tooltip: S,
          backgroundColor: y
        });
      }));
    }), Ie(t.currentRoute, () => {
      c(), r.notifyComponentUpdate(), r.sendInspectorTree(d), r.sendInspectorState(d);
    });
    const f = "router:navigations:" + o;
    r.addTimelineLayer({
      id: f,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((s, u) => {
      r.addTimelineEvent({
        layerId: f,
        event: {
          title: "Error during Navigation",
          subtitle: u.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: s },
          groupId: u.meta.__navigationId
        }
      });
    });
    let i = 0;
    t.beforeEach((s, u) => {
      const a = {
        guard: de("beforeEach"),
        from: re(u, "Current Location during this navigation"),
        to: re(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: i++
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
    }), t.afterEach((s, u, a) => {
      const p = {
        guard: de("afterEach")
      };
      a ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: a ? a.message : "",
          tooltip: "Navigation Failure",
          value: a
        }
      }, p.status = de("❌")) : p.status = de("✅"), p.from = re(u, "Current Location during this navigation"), p.to = re(s, "Target location"), r.addTimelineEvent({
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
    function c() {
      if (!h)
        return;
      const s = h;
      let u = n.getRoutes().filter((a) => !a.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !a.parent.record.components);
      u.forEach(Ct), s.filter && (u = u.filter((a) => (
        // save matches state based on the payload
        De(a, s.filter.toLowerCase())
      ))), u.forEach((a) => Ot(a, t.currentRoute.value)), s.rootNodes = u.map(Nt);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && c();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === d) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        a && (s.state = {
          options: co(a)
        });
      }
    }), r.sendInspectorTree(d), r.sendInspectorState(d);
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
const Rt = 15485081, kt = 2450411, St = 8702998, lo = 2282478, Pt = 16486972, uo = 6710886, fo = 16704226, ho = 12131356;
function Nt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: lo
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Pt
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Rt
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: St
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: kt
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
    children: e.children.map(Nt)
  };
}
let po = 0;
const mo = /^\/(.*)\/([a-z]*)$/;
function Ot(e, t) {
  const n = t.matched.length && K(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => K(o, e.record))), e.children.forEach((o) => Ot(o, t));
}
function Ct(e) {
  e.__vd_match = !1, e.children.forEach(Ct);
}
function De(e, t) {
  const n = String(e.re).match(mo);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((i) => De(i, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), f = Z(r);
  return !t.startsWith("/") && (f.includes(t) || r.includes(t)) || f.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((i) => De(i, t));
}
function go(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function vo(e) {
  const t = Un(e.routes, e), n = e.parseQuery || Fn, o = e.stringifyQuery || nt, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const f = oe(), i = oe(), d = oe(), c = Dt(B);
  let h = B;
  U && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = Se.bind(null, (l) => "" + l), u = Se.bind(null, fn), a = (
    // @ts-expect-error: intentionally avoid the type check
    Se.bind(null, Z)
  );
  function p(l, g) {
    let m, v;
    return Et(l) ? (m = t.getRecordMatcher(l), process.env.NODE_ENV !== "production" && !m && w(`Parent route "${String(l)}" not found when adding child route`, g), v = g) : v = l, t.addRoute(v, m);
  }
  function y(l) {
    const g = t.getRecordMatcher(l);
    g ? t.removeRoute(g) : process.env.NODE_ENV !== "production" && w(`Cannot remove non-existent route "${String(l)}"`);
  }
  function S() {
    return t.getRoutes().map((l) => l.record);
  }
  function k(l) {
    return !!t.getRecordMatcher(l);
  }
  function _(l, g) {
    if (g = N({}, g || c.value), typeof l == "string") {
      const b = Pe(n, l, g.path), O = t.resolve({ path: b.path }, g), F = r.createHref(b.fullPath);
      return process.env.NODE_ENV !== "production" && (F.startsWith("//") ? w(`Location "${l}" resolved to "${F}". A resolved location cannot start with multiple slashes.`) : O.matched.length || w(`No match found for location with path "${l}"`)), N(b, O, {
        params: a(O.params),
        hash: Z(b.hash),
        redirectedFrom: void 0,
        href: F
      });
    }
    process.env.NODE_ENV !== "production" && !he(l) && (w(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, l), l = {});
    let m;
    if (l.path != null)
      process.env.NODE_ENV !== "production" && "params" in l && !("name" in l) && // @ts-expect-error: the type is never
      Object.keys(l.params).length && w(`Path "${l.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), m = N({}, l, {
        path: Pe(n, l.path, g.path).path
      });
    else {
      const b = N({}, l.params);
      for (const O in b)
        b[O] == null && delete b[O];
      m = N({}, l, {
        params: u(b)
      }), g.params = u(g.params);
    }
    const v = t.resolve(m, g), P = l.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && w(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), v.params = s(a(v.params));
    const $ = pn(o, N({}, l, {
      hash: cn(P),
      path: v.path
    })), R = r.createHref($);
    return process.env.NODE_ENV !== "production" && (R.startsWith("//") ? w(`Location "${l}" resolved to "${R}". A resolved location cannot start with multiple slashes.`) : v.matched.length || w(`No match found for location with path "${l.path != null ? l.path : l}"`)), N({
      fullPath: $,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: P,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === nt ? zn(l.query) : l.query || {}
      )
    }, v, {
      redirectedFrom: void 0,
      href: R
    });
  }
  function E(l) {
    return typeof l == "string" ? Pe(n, l, c.value.path) : N({}, l);
  }
  function C(l, g) {
    if (h !== l)
      return ee(8, {
        from: g,
        to: l
      });
  }
  function D(l) {
    return te(l);
  }
  function W(l) {
    return D(N(E(l), { replace: !0 }));
  }
  function L(l) {
    const g = l.matched[l.matched.length - 1];
    if (g && g.redirect) {
      const { redirect: m } = g;
      let v = typeof m == "function" ? m(l) : m;
      if (typeof v == "string" && (v = v.includes("?") || v.includes("#") ? v = E(v) : (
        // force empty params
        { path: v }
      ), v.params = {}), process.env.NODE_ENV !== "production" && v.path == null && !("name" in v))
        throw w(`Invalid redirect found:
${JSON.stringify(v, null, 2)}
 when navigating to "${l.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return N({
        query: l.query,
        hash: l.hash,
        // avoid transferring params if the redirect has a path
        params: v.path != null ? {} : l.params
      }, v);
    }
  }
  function te(l, g) {
    const m = h = _(l), v = c.value, P = l.state, $ = l.force, R = l.replace === !0, b = L(m);
    if (b)
      return te(
        N(E(b), {
          state: typeof b == "object" ? N({}, P, b.state) : P,
          force: $,
          replace: R
        }),
        // keep original redirectedFrom if it exists
        g || m
      );
    const O = m;
    O.redirectedFrom = g;
    let F;
    return !$ && We(o, v, m) && (F = ee(16, { to: O, from: v }), He(
      v,
      v,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (F ? Promise.resolve(F) : Me(O, v)).catch((x) => M(x) ? (
      // navigation redirects still mark the router as ready
      M(
        x,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? x : _e(x)
    ) : (
      // reject any unknown error
      ye(x, O, v)
    )).then((x) => {
      if (x) {
        if (M(
          x,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          We(o, _(x.to), O) && // and we have done it a couple of times
          g && // @ts-expect-error: added only in dev
          (g._count = g._count ? (
            // @ts-expect-error
            g._count + 1
          ) : 1) > 30 ? (w(`Detected a possibly infinite redirection in a navigation guard when going from "${v.fullPath}" to "${O.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : te(
            // keep options
            N({
              // preserve an existing replacement but allow the redirect to override it
              replace: R
            }, E(x.to), {
              state: typeof x.to == "object" ? N({}, P, x.to.state) : P,
              force: $
            }),
            // preserve the original redirectedFrom if any
            g || O
          );
      } else
        x = Be(O, v, !0, R, P);
      return Ue(O, v, x), x;
    });
  }
  function At(l, g) {
    const m = C(l, g);
    return m ? Promise.reject(m) : Promise.resolve();
  }
  function ge(l) {
    const g = fe.values().next().value;
    return g && typeof g.runWithContext == "function" ? g.runWithContext(l) : l();
  }
  function Me(l, g) {
    let m;
    const [v, P, $] = yo(l, g);
    m = Ne(v.reverse(), "beforeRouteLeave", l, g);
    for (const b of v)
      b.leaveGuards.forEach((O) => {
        m.push(q(O, l, g));
      });
    const R = At.bind(null, l, g);
    return m.push(R), Q(m).then(() => {
      m = [];
      for (const b of f.list())
        m.push(q(b, l, g));
      return m.push(R), Q(m);
    }).then(() => {
      m = Ne(P, "beforeRouteUpdate", l, g);
      for (const b of P)
        b.updateGuards.forEach((O) => {
          m.push(q(O, l, g));
        });
      return m.push(R), Q(m);
    }).then(() => {
      m = [];
      for (const b of $)
        if (b.beforeEnter)
          if (V(b.beforeEnter))
            for (const O of b.beforeEnter)
              m.push(q(O, l, g));
          else
            m.push(q(b.beforeEnter, l, g));
      return m.push(R), Q(m);
    }).then(() => (l.matched.forEach((b) => b.enterCallbacks = {}), m = Ne($, "beforeRouteEnter", l, g, ge), m.push(R), Q(m))).then(() => {
      m = [];
      for (const b of i.list())
        m.push(q(b, l, g));
      return m.push(R), Q(m);
    }).catch((b) => M(
      b,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? b : Promise.reject(b));
  }
  function Ue(l, g, m) {
    d.list().forEach((v) => ge(() => v(l, g, m)));
  }
  function Be(l, g, m, v, P) {
    const $ = C(l, g);
    if ($)
      return $;
    const R = g === B, b = U ? history.state : {};
    m && (v || R ? r.replace(l.fullPath, N({
      scroll: R && b && b.scroll
    }, P)) : r.push(l.fullPath, P)), c.value = l, He(l, g, m, R), _e();
  }
  let ne;
  function Tt() {
    ne || (ne = r.listen((l, g, m) => {
      if (!Ge.listening)
        return;
      const v = _(l), P = L(v);
      if (P) {
        te(N(P, { replace: !0 }), v).catch(se);
        return;
      }
      h = v;
      const $ = c.value;
      U && wn(ze($.fullPath, m.delta), pe()), Me(v, $).catch((R) => M(
        R,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? R : M(
        R,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (te(
        R.to,
        v
        // avoid an uncaught rejection, let push call triggerError
      ).then((b) => {
        M(
          b,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !m.delta && m.type === ce.pop && r.go(-1, !1);
      }).catch(se), Promise.reject()) : (m.delta && r.go(-m.delta, !1), ye(R, v, $))).then((R) => {
        R = R || Be(
          // after navigation, all matched components are resolved
          v,
          $,
          !1
        ), R && (m.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !M(
          R,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-m.delta, !1) : m.type === ce.pop && M(
          R,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Ue(v, $, R);
      }).catch(se);
    }));
  }
  let ve = oe(), qe = oe(), ue;
  function ye(l, g, m) {
    _e(l);
    const v = qe.list();
    return v.length ? v.forEach((P) => P(l, g, m)) : (process.env.NODE_ENV !== "production" && w("uncaught error during route navigation:"), console.error(l)), Promise.reject(l);
  }
  function xt() {
    return ue && c.value !== B ? Promise.resolve() : new Promise((l, g) => {
      ve.add([l, g]);
    });
  }
  function _e(l) {
    return ue || (ue = !l, Tt(), ve.list().forEach(([g, m]) => l ? m(l) : g()), ve.reset()), l;
  }
  function He(l, g, m, v) {
    const { scrollBehavior: P } = e;
    if (!U || !P)
      return Promise.resolve();
    const $ = !m && Rn(ze(l.fullPath, 0)) || (v || !m) && history.state && history.state.scroll || null;
    return It().then(() => P(l, g, $)).then((R) => R && bn(R)).catch((R) => ye(R, l, g));
  }
  const Ee = (l) => r.go(l);
  let be;
  const fe = /* @__PURE__ */ new Set(), Ge = {
    currentRoute: c,
    listening: !0,
    addRoute: p,
    removeRoute: y,
    hasRoute: k,
    getRoutes: S,
    resolve: _,
    options: e,
    push: D,
    replace: W,
    go: Ee,
    back: () => Ee(-1),
    forward: () => Ee(1),
    beforeEach: f.add,
    beforeResolve: i.add,
    afterEach: d.add,
    onError: qe.add,
    isReady: xt,
    install(l) {
      const g = this;
      l.component("RouterLink", Zn), l.component("RouterView", oo), l.config.globalProperties.$router = g, Object.defineProperty(l.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => z(c)
      }), U && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !be && c.value === B && (be = !0, D(r.location).catch((P) => {
        process.env.NODE_ENV !== "production" && w("Unexpected error when starting the router:", P);
      }));
      const m = {};
      for (const P in B)
        Object.defineProperty(m, P, {
          get: () => c.value[P],
          enumerable: !0
        });
      l.provide(Le, g), l.provide(wt, Vt(m)), l.provide(xe, c);
      const v = l.unmount;
      fe.add(l), l.unmount = function() {
        fe.delete(l), fe.size < 1 && (h = B, ne && ne(), ne = null, c.value = B, be = !1, ue = !1), v();
      }, process.env.NODE_ENV !== "production" && U && ao(l, g, t);
    }
  };
  function Q(l) {
    return l.reduce((g, m) => g.then(() => ge(m)), Promise.resolve());
  }
  return Ge;
}
function yo(e, t) {
  const n = [], o = [], r = [], f = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < f; i++) {
    const d = t.matched[i];
    d && (e.matched.find((h) => K(h, d)) ? o.push(d) : n.push(d));
    const c = e.matched[i];
    c && (t.matched.find((h) => K(h, c)) || r.push(c));
  }
  return [n, o, r];
}
const _o = [
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
], Eo = ["VET2011"], bo = [
  "course:VETS2011",
  "course:VETS2012",
  "subject:Physiology",
  "system:Respiratory_System",
  "system:Exercise",
  "animal:Horse"
], wo = async (e, t) => {
  try {
    return await (await fetch(
      t + "?" + new URLSearchParams({ tag: e })
    )).json();
  } catch (n) {
    console.error("Error fetching data from the server", n), alert("Error fetching data from the server, only display test data.");
  }
}, Ro = async (e, t) => {
  try {
    return await wo(e, t) || _o.filter(
      (o) => o.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, ko = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), r = await (await fetch(`${t}?${n}`)).json() ?? Eo, f = new Set(r);
    return Array.from(f);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, So = { class: "search-results-container" }, Po = { class: "container-description" }, No = { class: "label-badges" }, Oo = {
  key: 0,
  class: "results"
}, Co = ["href"], $o = {
  key: 1,
  class: "no-results"
}, Ao = /* @__PURE__ */ le({
  __name: "DisplayResult",
  setup(e) {
    const t = G("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("%cRetrieving data from:", "color: skyblue;", t);
    const n = H([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = $t(), r = H("");
    ut(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, await f(r.value)) : r.value = "undefined";
    });
    const f = async (i) => {
      const d = await Ro(i, t);
      d && (n.value = d);
    };
    return Ie(o.currentRoute, async (i, d) => {
      const c = i.query.tag || "", h = d.query.tag || "";
      c !== h && await f(c);
    }), (i, d) => (A(), T("div", So, [
      I("div", Po, [
        I("button", {
          onClick: d[0] || (d[0] = () => i.$router.back())
        }, "↵"),
        I("div", No, " (" + X(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? (A(), T("div", Oo, [
        I("ul", null, [
          (A(!0), T(J, null, ie(n.value, (c, h) => (A(), T("li", { key: h }, [
            I("a", {
              href: c.url,
              target: "_blank",
              class: "linkToResource"
            }, X(c.label), 9, Co)
          ]))), 128))
        ])
      ])) : (A(), T("p", $o, "No results found"))
    ]));
  }
}), me = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Ve = /* @__PURE__ */ me(Ao, [["__scopeId", "data-v-8413d12c"]]), To = {}, xo = { id: "app" };
function Do(e, t) {
  const n = Re("CrucibleFilter"), o = Re("CrucibleSearch"), r = Re("RouterView");
  return A(), T("div", xo, [
    ke(n),
    ke(o),
    ke(r)
  ]);
}
const Vo = /* @__PURE__ */ me(To, [["render", Do]]), Io = [
  { path: "/", component: Vo },
  { path: "/search", component: Ve }
], jo = vo({
  history: Nn("/"),
  routes: Io
});
function $t() {
  const e = G("$router");
  return e || jo;
}
const Lo = { class: "search-container" }, Mo = { key: 0 }, Uo = ["onClick"], Bo = 10, qo = /* @__PURE__ */ le({
  __name: "CrucibleSearch",
  setup(e) {
    const t = $t(), n = H(""), o = H([]), r = H(!1), f = H(null), i = G("$tagsApi") || "http://localhost:8080/api/resource/alltags", d = (p) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(p.toLowerCase())
    ), c = async () => {
      n.value ? (o.value = (await ko(n.value, i)).slice(0, Bo), r.value = !0) : (o.value = [], r.value = !1);
    }, h = (p) => {
      n.value = o.value.includes(p) ? p : o.value[0], r.value = !1, t.push({ path: "/search", query: { tag: n.value } });
    }, s = () => {
      o.value.length && n.value && (r.value = !0);
    }, u = (p) => {
      p.key === "Enter" ? (h(n.value), n.value = "") : p.key === "Tab" && (p.preventDefault(), n.value = o.value[0] ?? n.value);
    }, a = (p) => {
      f.value && !f.value.contains(p.target) && (r.value = !1);
    };
    return ut(() => {
      document.addEventListener("click", a);
    }), Mt(() => {
      document.removeEventListener("click", a);
    }), (p, y) => (A(), T("div", Lo, [
      I("div", {
        ref_key: "searchBoxRef",
        ref: f,
        class: "search-container"
      }, [
        ft(I("input", {
          "onUpdate:modelValue": y[0] || (y[0] = (S) => n.value = S),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: c,
          onFocus: s,
          onKeydown: u
        }, null, 544), [
          [Ut, n.value]
        ]),
        o.value.length && n.value && r.value ? (A(), T("ul", Mo, [
          (A(!0), T(J, null, ie(o.value, (S) => (A(), T("li", {
            key: S,
            onClick: (k) => h(S)
          }, [
            (A(!0), T(J, null, ie(S.split(""), (k, _) => (A(), T(J, null, [
              d(k) ? (A(), T("strong", {
                key: `strong-${_}`
              }, X(k), 1)) : (A(), T("span", { key: _ }, X(k), 1))
            ], 64))), 256))
          ], 8, Uo))), 128))
        ])) : Bt("", !0)
      ], 512)
    ]));
  }
}), Ho = /* @__PURE__ */ me(qo, [["__scopeId", "data-v-3a7ef61b"]]), Go = { class: "crucible-filters" }, Ko = ["onClick"], Wo = { class: "crucible-filter-dropdown-menu" }, Fo = ["onClick"], zo = /* @__PURE__ */ le({
  __name: "CrucibleFilter",
  setup(e) {
    const t = H({}), n = bo.reduce(
      (i, d) => {
        const [c, h] = d.split(":");
        return i[c] || (i[c] = []), i[c].push(h.replace("_", " ")), i;
      },
      {}
    ), o = (i) => {
      t.value[i] = !t.value[i], Object.keys(t.value).forEach((d) => {
        d !== i && (t.value[d] = !1);
      });
    }, r = (i) => {
      console.log(i);
    }, f = () => {
      t.value = {}, console.log("Resetting the filter");
    };
    return (i, d) => (A(), T("div", Go, [
      I("div", { class: "crucible-filter-dropdown" }, [
        I("label", {
          for: "All",
          onClick: f
        }, "All")
      ]),
      (A(!0), T(J, null, ie(z(n), (c, h) => (A(), T("div", {
        key: h,
        class: "crucible-filter-dropdown"
      }, [
        I("label", {
          onClick: (s) => o(h)
        }, X(h), 9, Ko),
        ft(I("ol", Wo, [
          (A(!0), T(J, null, ie(c, (s, u) => (A(), T("li", {
            key: u,
            onClick: (a) => r(s)
          }, X(s), 9, Fo))), 128))
        ], 512), [
          [qt, t.value[h]]
        ])
      ]))), 128))
    ]));
  }
}), Qo = /* @__PURE__ */ me(zo, [["__scopeId", "data-v-faf4f1c7"]]);
function Jo(e, t) {
  const { router: n, getApi: o, tagsApi: r } = t;
  e.component("CrucibleSearch", Ho), e.component("DisplayResult", Ve), e.component("CrucibleFilter", Qo), e.provide("$router", n), e.provide("$getApi", o), e.provide("$tagsApi", r), n.addRoute({ path: "/search", component: Ve });
}
export {
  Qo as CrucibleFilter,
  Ho as CrucibleSearch,
  Ve as DisplayResult,
  Jo as createSearchPlugin
};
