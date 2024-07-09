import { shallowRef as Vt, unref as J, shallowReactive as jt, nextTick as Lt, defineComponent as Z, reactive as Mt, inject as G, computed as j, h as lt, provide as be, ref as H, watch as Ie, getCurrentInstance as ut, watchEffect as Ut, onMounted as dt, openBlock as T, createElementBlock as x, createElementVNode as C, toDisplayString as fe, Fragment as se, renderList as Pe, createCommentVNode as ft, createStaticVNode as Bt, pushScopeId as qt, popScopeId as Ht, resolveComponent as Ke, createVNode as we, onUnmounted as Gt, withDirectives as Kt, vModelText as Wt } from "vue";
function Qt() {
  return ht().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function ht() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const zt = typeof Proxy == "function", Ft = "devtools-plugin:setup", Jt = "plugin:settings:set";
let F, Ne;
function Yt() {
  var e;
  return F !== void 0 || (typeof window < "u" && window.performance ? (F = !0, Ne = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (F = !0, Ne = globalThis.perf_hooks.performance) : F = !1), F;
}
function Xt() {
  return Yt() ? Ne.now() : Date.now();
}
class Zt {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const u in t.settings) {
        const f = t.settings[u];
        o[u] = f.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let d = Object.assign({}, o);
    try {
      const u = localStorage.getItem(r), f = JSON.parse(u);
      Object.assign(d, f);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return d;
      },
      setSettings(u) {
        try {
          localStorage.setItem(r, JSON.stringify(u));
        } catch {
        }
        d = u;
      },
      now() {
        return Xt();
      }
    }, n && n.on(Jt, (u, f) => {
      u === this.plugin.id && this.fallbacks.setSettings(f);
    }), this.proxiedOn = new Proxy({}, {
      get: (u, f) => this.target ? this.target.on[f] : (...c) => {
        this.onQueue.push({
          method: f,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (u, f) => this.target ? this.target[f] : f === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(f) ? (...c) => (this.targetQueue.push({
        method: f,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[f](...c)) : (...c) => new Promise((h) => {
        this.targetQueue.push({
          method: f,
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
function en(e, t) {
  const n = e, o = ht(), r = Qt(), d = zt && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !d))
    r.emit(Ft, e, t);
  else {
    const u = d ? new Zt(n, r) : null;
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
function tn(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const N = Object.assign;
function Re(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = V(r) ? r.map(e) : e(r);
  }
  return n;
}
const ae = () => {
}, V = Array.isArray;
function R(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const pt = /#/g, nn = /&/g, on = /\//g, rn = /=/g, sn = /\?/g, mt = /\+/g, an = /%5B/g, cn = /%5D/g, gt = /%5E/g, ln = /%60/g, vt = /%7B/g, un = /%7C/g, yt = /%7D/g, dn = /%20/g;
function Ve(e) {
  return encodeURI("" + e).replace(un, "|").replace(an, "[").replace(cn, "]");
}
function fn(e) {
  return Ve(e).replace(vt, "{").replace(yt, "}").replace(gt, "^");
}
function Oe(e) {
  return Ve(e).replace(mt, "%2B").replace(dn, "+").replace(pt, "%23").replace(nn, "%26").replace(ln, "`").replace(vt, "{").replace(yt, "}").replace(gt, "^");
}
function hn(e) {
  return Oe(e).replace(rn, "%3D");
}
function pn(e) {
  return Ve(e).replace(pt, "%23").replace(sn, "%3F");
}
function mn(e) {
  return e == null ? "" : pn(e).replace(on, "%2F");
}
function Y(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && R(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const gn = /\/$/, vn = (e) => e.replace(gn, "");
function Se(e, t, n = "/") {
  let o, r = {}, d = "", u = "";
  const f = t.indexOf("#");
  let c = t.indexOf("?");
  return f < c && f >= 0 && (c = -1), c > -1 && (o = t.slice(0, c), d = t.slice(c + 1, f > -1 ? f : t.length), r = e(d)), f > -1 && (o = o || t.slice(0, f), u = t.slice(f, t.length)), o = En(o ?? t, n), {
    fullPath: o + (d && "?") + d + u,
    path: o,
    query: r,
    hash: Y(u)
  };
}
function yn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function We(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Qe(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && K(t.matched[o], n.matched[r]) && _t(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function K(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function _t(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!_n(e[n], t[n]))
      return !1;
  return !0;
}
function _n(e, t) {
  return V(e) ? ze(e, t) : V(t) ? ze(t, e) : e === t;
}
function ze(e, t) {
  return V(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function En(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return R(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let d = n.length - 1, u, f;
  for (u = 0; u < o.length; u++)
    if (f = o[u], f !== ".")
      if (f === "..")
        d > 1 && d--;
      else
        break;
  return n.slice(0, d).join("/") + "/" + o.slice(u).join("/");
}
var ce;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ce || (ce = {}));
var ie;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(ie || (ie = {}));
function bn(e) {
  if (!e)
    if (U) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), vn(e);
}
const wn = /^[^#]+#/;
function Rn(e, t) {
  return e.replace(wn, "#") + t;
}
function Sn(e, t) {
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
function kn(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const d = document.querySelector(e.el);
        if (o && d) {
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
    t = Sn(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Fe(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ce = /* @__PURE__ */ new Map();
function Pn(e, t) {
  Ce.set(e, t);
}
function Nn(e) {
  const t = Ce.get(e);
  return Ce.delete(e), t;
}
let On = () => location.protocol + "//" + location.host;
function Et(e, t) {
  const { pathname: n, search: o, hash: r } = t, d = e.indexOf("#");
  if (d > -1) {
    let f = r.includes(e.slice(d)) ? e.slice(d).length : 1, c = r.slice(f);
    return c[0] !== "/" && (c = "/" + c), We(c, "");
  }
  return We(n, e) + o + r;
}
function Cn(e, t, n, o) {
  let r = [], d = [], u = null;
  const f = ({ state: a }) => {
    const p = Et(e, location), y = n.value, E = t.value;
    let k = 0;
    if (a) {
      if (n.value = p, t.value = a, u && u === y) {
        u = null;
        return;
      }
      k = E ? a.position - E.position : 0;
    } else
      o(p);
    r.forEach((_) => {
      _(n.value, y, {
        delta: k,
        type: ce.pop,
        direction: k ? k > 0 ? ie.forward : ie.back : ie.unknown
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
    return d.push(p), p;
  }
  function s() {
    const { history: a } = window;
    a.state && a.replaceState(N({}, a.state, { scroll: pe() }), "");
  }
  function l() {
    for (const a of d)
      a();
    d = [], window.removeEventListener("popstate", f), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", f), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: c,
    listen: h,
    destroy: l
  };
}
function Je(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? pe() : null
  };
}
function $n(e) {
  const { history: t, location: n } = window, o = {
    value: Et(e, n)
  }, r = { value: t.state };
  r.value || d(o.value, {
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
  function d(c, h, s) {
    const l = e.indexOf("#"), a = l > -1 ? (n.host && document.querySelector("base") ? e : e.slice(l)) + c : On() + e + c;
    try {
      t[s ? "replaceState" : "pushState"](h, "", a), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? R("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](a);
    }
  }
  function u(c, h) {
    const s = N({}, t.state, Je(
      r.value.back,
      // keep back and forward entries but override current position
      c,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    d(c, s, !0), o.value = c;
  }
  function f(c, h) {
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
    process.env.NODE_ENV !== "production" && !t.state && R(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), d(s.current, s, !0);
    const l = N({}, Je(o.value, c, null), { position: s.position + 1 }, h);
    d(c, l, !1), o.value = c;
  }
  return {
    location: o,
    state: r,
    push: f,
    replace: u
  };
}
function An(e) {
  e = bn(e);
  const t = $n(e), n = Cn(e, t.state, t.location, t.replace);
  function o(d, u = !0) {
    u || n.pauseListeners(), history.go(d);
  }
  const r = N({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: Rn.bind(null, e)
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
function bt(e) {
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
}, $e = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var Ye;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Ye || (Ye = {}));
const Tn = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Dn(t)}" via a navigation guard.`;
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
  return process.env.NODE_ENV !== "production" ? N(new Error(Tn[e](t)), {
    type: e,
    [$e]: !0
  }, t) : N(new Error(), {
    type: e,
    [$e]: !0
  }, t);
}
function M(e, t) {
  return e instanceof Error && $e in e && (t == null || !!(e.type & t));
}
const xn = ["params", "query", "hash"];
function Dn(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of xn)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Xe = "[^/]+?", In = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Vn = /[.+*?^${}()[\]/\\]/g;
function jn(e, t) {
  const n = N({}, In, t), o = [];
  let r = n.start ? "^" : "";
  const d = [];
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
        l || (r += "/"), r += a.value.replace(Vn, "\\$&"), p += 40;
      else if (a.type === 1) {
        const { value: y, repeatable: E, optional: k, regexp: _ } = a;
        d.push({
          name: y,
          repeatable: E,
          optional: k
        });
        const b = _ || Xe;
        if (b !== Xe) {
          p += 10;
          try {
            new RegExp(`(${b})`);
          } catch (I) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${b}): ` + I.message);
          }
        }
        let O = E ? `((?:${b})(?:/(?:${b}))*)` : `(${b})`;
        l || (O = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        k && h.length < 2 ? `(?:/${O})` : "/" + O), k && (O += "?"), r += O, p += 20, k && (p += -8), E && (p += -20), b === ".*" && (p += -50);
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
  function f(h) {
    const s = h.match(u), l = {};
    if (!s)
      return null;
    for (let a = 1; a < s.length; a++) {
      const p = s[a] || "", y = d[a - 1];
      l[y.name] = p && y.repeatable ? p.split("/") : p;
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
          const { value: y, repeatable: E, optional: k } = p, _ = y in h ? h[y] : "";
          if (V(_) && !E)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const b = V(_) ? _.join("/") : _;
          if (!b)
            if (k)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : l = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          s += b;
        }
    }
    return s || "/";
  }
  return {
    re: u,
    score: o,
    keys: d,
    parse: f,
    stringify: c
  };
}
function Ln(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function Mn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const d = Ln(o[n], r[n]);
    if (d)
      return d;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (Ze(o))
      return 1;
    if (Ze(r))
      return -1;
  }
  return r.length - o.length;
}
function Ze(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Un = {
  type: 0,
  value: ""
}, Bn = /[a-zA-Z0-9_]/;
function qn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Un]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${h}": ${p}`);
  }
  let n = 0, o = n;
  const r = [];
  let d;
  function u() {
    d && r.push(d), d = [];
  }
  let f = 0, c, h = "", s = "";
  function l() {
    h && (n === 0 ? d.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (d.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), d.push({
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
  for (; f < e.length; ) {
    if (c = e[f++], c === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (h && l(), u()) : c === ":" ? (l(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        c === "(" ? n = 2 : Bn.test(c) ? a() : (l(), n = 0, c !== "*" && c !== "?" && c !== "+" && f--);
        break;
      case 2:
        c === ")" ? s[s.length - 1] == "\\" ? s = s.slice(0, -1) + c : n = 3 : s += c;
        break;
      case 3:
        l(), n = 0, c !== "*" && c !== "?" && c !== "+" && f--, s = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), l(), u(), r;
}
function Hn(e, t, n) {
  const o = jn(qn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const d = /* @__PURE__ */ new Set();
    for (const u of o.keys)
      d.has(u.name) && R(`Found duplicated params with name "${u.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), d.add(u.name);
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
function Gn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = nt({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function d(s, l, a) {
    const p = !a, y = Kn(s);
    process.env.NODE_ENV !== "production" && Fn(y, l), y.aliasOf = a && a.record;
    const E = nt(t, s), k = [
      y
    ];
    if ("alias" in s) {
      const O = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const I of O)
        k.push(N({}, y, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: a ? a.record.components : y.components,
          path: I,
          // we might be the child of an alias
          aliasOf: a ? a.record : y
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let _, b;
    for (const O of k) {
      const { path: I } = O;
      if (l && I[0] !== "/") {
        const W = l.record.path, L = W[W.length - 1] === "/" ? "" : "/";
        O.path = l.record.path + (I && L + I);
      }
      if (process.env.NODE_ENV !== "production" && O.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (_ = Hn(O, l, E), process.env.NODE_ENV !== "production" && l && I[0] === "/" && Jn(_, l), a ? (a.alias.push(_), process.env.NODE_ENV !== "production" && zn(a, _)) : (b = b || _, b !== _ && b.alias.push(_), p && s.name && !tt(_) && u(s.name)), y.children) {
        const W = y.children;
        for (let L = 0; L < W.length; L++)
          d(W[L], _, a && a.children[L]);
      }
      a = a || _, (_.record.components && Object.keys(_.record.components).length || _.record.name || _.record.redirect) && c(_);
    }
    return b ? () => {
      u(b);
    } : ae;
  }
  function u(s) {
    if (bt(s)) {
      const l = o.get(s);
      l && (o.delete(s), n.splice(n.indexOf(l), 1), l.children.forEach(u), l.alias.forEach(u));
    } else {
      const l = n.indexOf(s);
      l > -1 && (n.splice(l, 1), s.record.name && o.delete(s.record.name), s.children.forEach(u), s.alias.forEach(u));
    }
  }
  function f() {
    return n;
  }
  function c(s) {
    let l = 0;
    for (; l < n.length && Mn(s, n[l]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[l].record.path || !wt(s, n[l])); )
      l++;
    n.splice(l, 0, s), s.record.name && !tt(s) && o.set(s.record.name, s);
  }
  function h(s, l) {
    let a, p = {}, y, E;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw X(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const b = Object.keys(s.params || {}).filter((O) => !a.keys.find((I) => I.name === O));
        b.length && R(`Discarded invalid param(s) "${b.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      E = a.record.name, p = N(
        // paramsFromLocation is a new object
        et(
          l.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          a.keys.filter((b) => !b.optional).concat(a.parent ? a.parent.keys.filter((b) => b.optional) : []).map((b) => b.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && et(s.params, a.keys.map((b) => b.name))
      ), y = a.stringify(p);
    } else if (s.path != null)
      y = s.path, process.env.NODE_ENV !== "production" && !y.startsWith("/") && R(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((b) => b.re.test(y)), a && (p = a.parse(y), E = a.record.name);
    else {
      if (a = l.name ? o.get(l.name) : n.find((b) => b.re.test(l.path)), !a)
        throw X(1, {
          location: s,
          currentLocation: l
        });
      E = a.record.name, p = N({}, l.params, s.params), y = a.stringify(p);
    }
    const k = [];
    let _ = a;
    for (; _; )
      k.unshift(_.record), _ = _.parent;
    return {
      name: E,
      path: y,
      params: p,
      matched: k,
      meta: Qn(k)
    };
  }
  return e.forEach((s) => d(s)), { addRoute: d, resolve: h, removeRoute: u, getRoutes: f, getRecordMatcher: r };
}
function et(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Kn(e) {
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
function tt(e) {
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
function nt(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function Ae(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function zn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Ae.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Ae.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Fn(e, t) {
  t && t.record.name && !e.name && !e.path && R(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Jn(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Ae.bind(null, n)))
      return R(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function wt(e, t) {
  return t.children.some((n) => n === e || wt(e, n));
}
function Yn(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const d = o[r].replace(mt, " "), u = d.indexOf("="), f = Y(u < 0 ? d : d.slice(0, u)), c = u < 0 ? null : Y(d.slice(u + 1));
    if (f in t) {
      let h = t[f];
      V(h) || (h = t[f] = [h]), h.push(c);
    } else
      t[f] = c;
  }
  return t;
}
function ot(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = hn(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (V(o) ? o.map((d) => d && Oe(d)) : [o && Oe(o)]).forEach((d) => {
      d !== void 0 && (t += (t.length ? "&" : "") + n, d != null && (t += "=" + d));
    });
  }
  return t;
}
function Xn(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = V(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const Zn = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), rt = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), je = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Rt = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), Te = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
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
function q(e, t, n, o, r, d = (u) => u()) {
  const u = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((f, c) => {
    const h = (a) => {
      a === !1 ? c(X(4, {
        from: n,
        to: t
      })) : a instanceof Error ? c(a) : he(a) ? c(X(2, {
        from: t,
        to: a
      })) : (u && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === u && typeof a == "function" && u.push(a), f());
    }, s = d(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? eo(h, t, n) : h));
    let l = Promise.resolve(s);
    if (e.length < 3 && (l = l.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        l = l.then((p) => h._called ? p : (R(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        R(a), c(new Error("Invalid navigation guard"));
        return;
      }
    }
    l.catch((a) => c(a));
  });
}
function eo(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && R(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function ke(e, t, n, o, r = (d) => d()) {
  const d = [];
  for (const u of e) {
    process.env.NODE_ENV !== "production" && !u.components && !u.children.length && R(`Record with path "${u.path}" is either missing a "component(s)" or "children" property.`);
    for (const f in u.components) {
      let c = u.components[f];
      if (process.env.NODE_ENV !== "production") {
        if (!c || typeof c != "object" && typeof c != "function")
          throw R(`Component "${f}" in record with path "${u.path}" is not a valid component. Received "${String(c)}".`), new Error("Invalid route component");
        if ("then" in c) {
          R(`Component "${f}" in record with path "${u.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = c;
          c = () => h;
        } else
          c.__asyncLoader && // warn only once per component
          !c.__warnedDefineAsync && (c.__warnedDefineAsync = !0, R(`Component "${f}" in record with path "${u.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !u.instances[f]))
        if (to(c)) {
          const s = (c.__vccOpts || c)[t];
          s && d.push(q(s, n, o, u, f, r));
        } else {
          let h = c();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (R(`Component "${f}" in record with path "${u.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), d.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${f}" at "${u.path}"`));
            const l = tn(s) ? s.default : s;
            u.components[f] = l;
            const p = (l.__vccOpts || l)[t];
            return p && q(p, n, o, u, f, r)();
          }));
        }
    }
  }
  return d;
}
function to(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function st(e) {
  const t = G(je), n = G(Rt);
  let o = !1, r = null;
  const d = j(() => {
    const s = J(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (he(s) || (o ? R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), u = j(() => {
    const { matched: s } = d.value, { length: l } = s, a = s[l - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const y = p.findIndex(K.bind(null, a));
    if (y > -1)
      return y;
    const E = at(s[l - 2]);
    return (
      // we are dealing with nested routes
      l > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      at(a) === E && // avoid comparing the child with its parent
      p[p.length - 1].path !== E ? p.findIndex(K.bind(null, s[l - 2])) : y
    );
  }), f = j(() => u.value > -1 && so(n.params, d.value.params)), c = j(() => u.value > -1 && u.value === n.matched.length - 1 && _t(n.params, d.value.params));
  function h(s = {}) {
    return ro(s) ? t[J(e.replace) ? "replace" : "push"](
      J(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ae) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && U) {
    const s = ut();
    if (s) {
      const l = {
        route: d.value,
        isActive: f.value,
        isExactActive: c.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(l), Ut(() => {
        l.route = d.value, l.isActive = f.value, l.isExactActive = c.value, l.error = he(J(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: d,
    href: j(() => d.value.href),
    isActive: f,
    isExactActive: c,
    navigate: h
  };
}
const no = /* @__PURE__ */ Z({
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
  useLink: st,
  setup(e, { slots: t }) {
    const n = Mt(st(e)), { options: o } = G(je), r = j(() => ({
      [it(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [it(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const d = t.default && t.default(n);
      return e.custom ? d : lt("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, d);
    };
  }
}), oo = no;
function ro(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function so(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!V(r) || r.length !== o.length || o.some((d, u) => d !== r[u]))
      return !1;
  }
  return !0;
}
function at(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const it = (e, t, n) => e ?? t ?? n, ao = /* @__PURE__ */ Z({
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
    process.env.NODE_ENV !== "production" && co();
    const o = G(Te), r = j(() => e.route || o.value), d = G(rt, 0), u = j(() => {
      let h = J(d);
      const { matched: s } = r.value;
      let l;
      for (; (l = s[h]) && !l.components; )
        h++;
      return h;
    }), f = j(() => r.value.matched[u.value]);
    be(rt, j(() => u.value + 1)), be(Zn, f), be(Te, r);
    const c = H();
    return Ie(() => [c.value, f.value, e.name], ([h, s, l], [a, p, y]) => {
      s && (s.instances[l] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !K(s, p) || !a) && (s.enterCallbacks[l] || []).forEach((E) => E(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, l = f.value, a = l && l.components[s];
      if (!a)
        return ct(n.default, { Component: a, route: h });
      const p = l.props[s], y = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, k = lt(a, N({}, y, t, {
        onVnodeUnmounted: (_) => {
          _.component.isUnmounted && (l.instances[s] = null);
        },
        ref: c
      }));
      if (process.env.NODE_ENV !== "production" && U && k.ref) {
        const _ = {
          depth: u.value,
          name: l.name,
          path: l.path,
          meta: l.meta
        };
        (V(k.ref) ? k.ref.map((O) => O.i) : [k.ref.i]).forEach((O) => {
          O.__vrv_devtools = _;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        ct(n.default, { Component: k, route: h }) || k
      );
    };
  }
});
function ct(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const io = ao;
function co() {
  const e = ut(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
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
function re(e, t) {
  const n = N({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => Eo(o, ["instances", "children", "aliasOf"]))
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
let lo = 0;
function uo(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = lo++;
  en({
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
        value: re(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: l }) => {
      if (l.__vrv_devtools) {
        const a = l.__vrv_devtools;
        s.tags.push({
          label: (a.name ? `${a.name.toString()}: ` : "") + a.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: St
        });
      }
      V(l.__vrl_devtools) && (l.__devtoolsApi = r, l.__vrl_devtools.forEach((a) => {
        let p = a.route.path, y = Nt, E = "", k = 0;
        a.error ? (p = a.error, y = go, k = vo) : a.isExactActive ? (y = Pt, E = "This is exactly active") : a.isActive && (y = kt, E = "This link is active"), s.tags.push({
          label: p,
          textColor: k,
          tooltip: E,
          backgroundColor: y
        });
      }));
    }), Ie(t.currentRoute, () => {
      c(), r.notifyComponentUpdate(), r.sendInspectorTree(f), r.sendInspectorState(f);
    });
    const d = "router:navigations:" + o;
    r.addTimelineLayer({
      id: d,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((s, l) => {
      r.addTimelineEvent({
        layerId: d,
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
    let u = 0;
    t.beforeEach((s, l) => {
      const a = {
        guard: de("beforeEach"),
        from: re(l, "Current Location during this navigation"),
        to: re(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: u++
      }), r.addTimelineEvent({
        layerId: d,
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
      }, p.status = de("❌")) : p.status = de("✅"), p.from = re(l, "Current Location during this navigation"), p.to = re(s, "Target location"), r.addTimelineEvent({
        layerId: d,
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
    const f = "router-inspector:" + o;
    r.addInspector({
      id: f,
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
      l.forEach($t), s.filter && (l = l.filter((a) => (
        // save matches state based on the payload
        xe(a, s.filter.toLowerCase())
      ))), l.forEach((a) => Ct(a, t.currentRoute.value)), s.rootNodes = l.map(Ot);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === f && c();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === f) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        a && (s.state = {
          options: ho(a)
        });
      }
    }), r.sendInspectorTree(f), r.sendInspectorState(f);
  });
}
function fo(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function ho(e) {
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
        display: e.keys.map((o) => `${o.name}${fo(o)}`).join(" "),
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
const St = 15485081, kt = 2450411, Pt = 8702998, po = 2282478, Nt = 16486972, mo = 6710886, go = 16704226, vo = 12131356;
function Ot(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: po
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Nt
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: St
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: Pt
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: kt
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: mo
  });
  let o = n.__vd_id;
  return o == null && (o = String(yo++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Ot)
  };
}
let yo = 0;
const _o = /^\/(.*)\/([a-z]*)$/;
function Ct(e, t) {
  const n = t.matched.length && K(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => K(o, e.record))), e.children.forEach((o) => Ct(o, t));
}
function $t(e) {
  e.__vd_match = !1, e.children.forEach($t);
}
function xe(e, t) {
  const n = String(e.re).match(_o);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((u) => xe(u, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), d = Y(r);
  return !t.startsWith("/") && (d.includes(t) || r.includes(t)) || d.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((u) => xe(u, t));
}
function Eo(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function bo(e) {
  const t = Gn(e.routes, e), n = e.parseQuery || Yn, o = e.stringifyQuery || ot, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const d = oe(), u = oe(), f = oe(), c = Vt(B);
  let h = B;
  U && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = Re.bind(null, (i) => "" + i), l = Re.bind(null, mn), a = (
    // @ts-expect-error: intentionally avoid the type check
    Re.bind(null, Y)
  );
  function p(i, g) {
    let m, v;
    return bt(i) ? (m = t.getRecordMatcher(i), process.env.NODE_ENV !== "production" && !m && R(`Parent route "${String(i)}" not found when adding child route`, g), v = g) : v = i, t.addRoute(v, m);
  }
  function y(i) {
    const g = t.getRecordMatcher(i);
    g ? t.removeRoute(g) : process.env.NODE_ENV !== "production" && R(`Cannot remove non-existent route "${String(i)}"`);
  }
  function E() {
    return t.getRoutes().map((i) => i.record);
  }
  function k(i) {
    return !!t.getRecordMatcher(i);
  }
  function _(i, g) {
    if (g = N({}, g || c.value), typeof i == "string") {
      const w = Se(n, i, g.path), $ = t.resolve({ path: w.path }, g), Q = r.createHref(w.fullPath);
      return process.env.NODE_ENV !== "production" && (Q.startsWith("//") ? R(`Location "${i}" resolved to "${Q}". A resolved location cannot start with multiple slashes.`) : $.matched.length || R(`No match found for location with path "${i}"`)), N(w, $, {
        params: a($.params),
        hash: Y(w.hash),
        redirectedFrom: void 0,
        href: Q
      });
    }
    process.env.NODE_ENV !== "production" && !he(i) && (R(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, i), i = {});
    let m;
    if (i.path != null)
      process.env.NODE_ENV !== "production" && "params" in i && !("name" in i) && // @ts-expect-error: the type is never
      Object.keys(i.params).length && R(`Path "${i.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), m = N({}, i, {
        path: Se(n, i.path, g.path).path
      });
    else {
      const w = N({}, i.params);
      for (const $ in w)
        w[$] == null && delete w[$];
      m = N({}, i, {
        params: l(w)
      }), g.params = l(g.params);
    }
    const v = t.resolve(m, g), P = i.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && R(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), v.params = s(a(v.params));
    const A = yn(o, N({}, i, {
      hash: fn(P),
      path: v.path
    })), S = r.createHref(A);
    return process.env.NODE_ENV !== "production" && (S.startsWith("//") ? R(`Location "${i}" resolved to "${S}". A resolved location cannot start with multiple slashes.`) : v.matched.length || R(`No match found for location with path "${i.path != null ? i.path : i}"`)), N({
      fullPath: A,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: P,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === ot ? Xn(i.query) : i.query || {}
      )
    }, v, {
      redirectedFrom: void 0,
      href: S
    });
  }
  function b(i) {
    return typeof i == "string" ? Se(n, i, c.value.path) : N({}, i);
  }
  function O(i, g) {
    if (h !== i)
      return X(8, {
        from: g,
        to: i
      });
  }
  function I(i) {
    return te(i);
  }
  function W(i) {
    return I(N(b(i), { replace: !0 }));
  }
  function L(i) {
    const g = i.matched[i.matched.length - 1];
    if (g && g.redirect) {
      const { redirect: m } = g;
      let v = typeof m == "function" ? m(i) : m;
      if (typeof v == "string" && (v = v.includes("?") || v.includes("#") ? v = b(v) : (
        // force empty params
        { path: v }
      ), v.params = {}), process.env.NODE_ENV !== "production" && v.path == null && !("name" in v))
        throw R(`Invalid redirect found:
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
  function te(i, g) {
    const m = h = _(i), v = c.value, P = i.state, A = i.force, S = i.replace === !0, w = L(m);
    if (w)
      return te(
        N(b(w), {
          state: typeof w == "object" ? N({}, P, w.state) : P,
          force: A,
          replace: S
        }),
        // keep original redirectedFrom if it exists
        g || m
      );
    const $ = m;
    $.redirectedFrom = g;
    let Q;
    return !A && Qe(o, v, m) && (Q = X(16, { to: $, from: v }), He(
      v,
      v,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (Q ? Promise.resolve(Q) : Me($, v)).catch((D) => M(D) ? (
      // navigation redirects still mark the router as ready
      M(
        D,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? D : ye(D)
    ) : (
      // reject any unknown error
      ve(D, $, v)
    )).then((D) => {
      if (D) {
        if (M(
          D,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          Qe(o, _(D.to), $) && // and we have done it a couple of times
          g && // @ts-expect-error: added only in dev
          (g._count = g._count ? (
            // @ts-expect-error
            g._count + 1
          ) : 1) > 30 ? (R(`Detected a possibly infinite redirection in a navigation guard when going from "${v.fullPath}" to "${$.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : te(
            // keep options
            N({
              // preserve an existing replacement but allow the redirect to override it
              replace: S
            }, b(D.to), {
              state: typeof D.to == "object" ? N({}, P, D.to.state) : P,
              force: A
            }),
            // preserve the original redirectedFrom if any
            g || $
          );
      } else
        D = Be($, v, !0, S, P);
      return Ue($, v, D), D;
    });
  }
  function xt(i, g) {
    const m = O(i, g);
    return m ? Promise.reject(m) : Promise.resolve();
  }
  function me(i) {
    const g = ue.values().next().value;
    return g && typeof g.runWithContext == "function" ? g.runWithContext(i) : i();
  }
  function Me(i, g) {
    let m;
    const [v, P, A] = wo(i, g);
    m = ke(v.reverse(), "beforeRouteLeave", i, g);
    for (const w of v)
      w.leaveGuards.forEach(($) => {
        m.push(q($, i, g));
      });
    const S = xt.bind(null, i, g);
    return m.push(S), z(m).then(() => {
      m = [];
      for (const w of d.list())
        m.push(q(w, i, g));
      return m.push(S), z(m);
    }).then(() => {
      m = ke(P, "beforeRouteUpdate", i, g);
      for (const w of P)
        w.updateGuards.forEach(($) => {
          m.push(q($, i, g));
        });
      return m.push(S), z(m);
    }).then(() => {
      m = [];
      for (const w of A)
        if (w.beforeEnter)
          if (V(w.beforeEnter))
            for (const $ of w.beforeEnter)
              m.push(q($, i, g));
          else
            m.push(q(w.beforeEnter, i, g));
      return m.push(S), z(m);
    }).then(() => (i.matched.forEach((w) => w.enterCallbacks = {}), m = ke(A, "beforeRouteEnter", i, g, me), m.push(S), z(m))).then(() => {
      m = [];
      for (const w of u.list())
        m.push(q(w, i, g));
      return m.push(S), z(m);
    }).catch((w) => M(
      w,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? w : Promise.reject(w));
  }
  function Ue(i, g, m) {
    f.list().forEach((v) => me(() => v(i, g, m)));
  }
  function Be(i, g, m, v, P) {
    const A = O(i, g);
    if (A)
      return A;
    const S = g === B, w = U ? history.state : {};
    m && (v || S ? r.replace(i.fullPath, N({
      scroll: S && w && w.scroll
    }, P)) : r.push(i.fullPath, P)), c.value = i, He(i, g, m, S), ye();
  }
  let ne;
  function Dt() {
    ne || (ne = r.listen((i, g, m) => {
      if (!Ge.listening)
        return;
      const v = _(i), P = L(v);
      if (P) {
        te(N(P, { replace: !0 }), v).catch(ae);
        return;
      }
      h = v;
      const A = c.value;
      U && Pn(Fe(A.fullPath, m.delta), pe()), Me(v, A).catch((S) => M(
        S,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? S : M(
        S,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (te(
        S.to,
        v
        // avoid an uncaught rejection, let push call triggerError
      ).then((w) => {
        M(
          w,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !m.delta && m.type === ce.pop && r.go(-1, !1);
      }).catch(ae), Promise.reject()) : (m.delta && r.go(-m.delta, !1), ve(S, v, A))).then((S) => {
        S = S || Be(
          // after navigation, all matched components are resolved
          v,
          A,
          !1
        ), S && (m.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !M(
          S,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-m.delta, !1) : m.type === ce.pop && M(
          S,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Ue(v, A, S);
      }).catch(ae);
    }));
  }
  let ge = oe(), qe = oe(), le;
  function ve(i, g, m) {
    ye(i);
    const v = qe.list();
    return v.length ? v.forEach((P) => P(i, g, m)) : (process.env.NODE_ENV !== "production" && R("uncaught error during route navigation:"), console.error(i)), Promise.reject(i);
  }
  function It() {
    return le && c.value !== B ? Promise.resolve() : new Promise((i, g) => {
      ge.add([i, g]);
    });
  }
  function ye(i) {
    return le || (le = !i, Dt(), ge.list().forEach(([g, m]) => i ? m(i) : g()), ge.reset()), i;
  }
  function He(i, g, m, v) {
    const { scrollBehavior: P } = e;
    if (!U || !P)
      return Promise.resolve();
    const A = !m && Nn(Fe(i.fullPath, 0)) || (v || !m) && history.state && history.state.scroll || null;
    return Lt().then(() => P(i, g, A)).then((S) => S && kn(S)).catch((S) => ve(S, i, g));
  }
  const _e = (i) => r.go(i);
  let Ee;
  const ue = /* @__PURE__ */ new Set(), Ge = {
    currentRoute: c,
    listening: !0,
    addRoute: p,
    removeRoute: y,
    hasRoute: k,
    getRoutes: E,
    resolve: _,
    options: e,
    push: I,
    replace: W,
    go: _e,
    back: () => _e(-1),
    forward: () => _e(1),
    beforeEach: d.add,
    beforeResolve: u.add,
    afterEach: f.add,
    onError: qe.add,
    isReady: It,
    install(i) {
      const g = this;
      i.component("RouterLink", oo), i.component("RouterView", io), i.config.globalProperties.$router = g, Object.defineProperty(i.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => J(c)
      }), U && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !Ee && c.value === B && (Ee = !0, I(r.location).catch((P) => {
        process.env.NODE_ENV !== "production" && R("Unexpected error when starting the router:", P);
      }));
      const m = {};
      for (const P in B)
        Object.defineProperty(m, P, {
          get: () => c.value[P],
          enumerable: !0
        });
      i.provide(je, g), i.provide(Rt, jt(m)), i.provide(Te, c);
      const v = i.unmount;
      ue.add(i), i.unmount = function() {
        ue.delete(i), ue.size < 1 && (h = B, ne && ne(), ne = null, c.value = B, Ee = !1, le = !1), v();
      }, process.env.NODE_ENV !== "production" && U && uo(i, g, t);
    }
  };
  function z(i) {
    return i.reduce((g, m) => g.then(() => me(m)), Promise.resolve());
  }
  return Ge;
}
function wo(e, t) {
  const n = [], o = [], r = [], d = Math.max(t.matched.length, e.matched.length);
  for (let u = 0; u < d; u++) {
    const f = t.matched[u];
    f && (e.matched.find((h) => K(h, f)) ? o.push(f) : n.push(f));
    const c = e.matched[u];
    c && (t.matched.find((h) => K(h, c)) || r.push(c));
  }
  return [n, o, r];
}
const Ro = [
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
], So = ["VET2011"], ko = async (e, t) => {
  try {
    return await (await fetch(
      t + "?" + new URLSearchParams({ tag: e })
    )).json();
  } catch (n) {
    console.error("Error fetching data from the server", n), alert("Error fetching data from the server, only display test data.");
  }
}, Po = async (e, t) => {
  try {
    return await ko(e, t) || Ro.filter(
      (o) => o.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, No = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), r = await (await fetch(`${t}?${n}`)).json() ?? So, d = new Set(r);
    return Array.from(d);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, Oo = { class: "search-results-container" }, Co = { class: "container-description" }, $o = { class: "label-badges" }, Ao = {
  key: 0,
  class: "results"
}, To = ["href"], xo = {
  key: 1,
  class: "no-results"
}, Do = /* @__PURE__ */ Z({
  __name: "DisplayResult",
  setup(e) {
    const t = G("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("%cRetrieving data from:", "color: skyblue;", t);
    const n = H([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = Tt(), r = H("");
    dt(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, await d(r.value)) : r.value = "undefined";
    });
    const d = async (u) => {
      const f = await Po(u, t);
      f && (n.value = f);
    };
    return Ie(o.currentRoute, async (u, f) => {
      const c = u.query.tag || "", h = f.query.tag || "";
      c !== h && await d(c);
    }), (u, f) => (T(), x("div", Oo, [
      C("div", Co, [
        C("button", {
          onClick: f[0] || (f[0] = () => u.$router.back())
        }, "↵"),
        C("div", $o, " (" + fe(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? (T(), x("div", Ao, [
        C("ul", null, [
          (T(!0), x(se, null, Pe(n.value, (c, h) => (T(), x("li", { key: h }, [
            C("a", {
              href: c.url,
              target: "_blank",
              class: "linkToResource"
            }, fe(c.label), 9, To)
          ]))), 128))
        ])
      ])) : (T(), x("p", xo, "No results found"))
    ]));
  }
}), Le = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, De = /* @__PURE__ */ Le(Do, [["__scopeId", "data-v-8413d12c"]]), ee = (e) => (qt("data-v-b782ead9"), e = e(), Ht(), e), Io = /* @__PURE__ */ ee(() => /* @__PURE__ */ C("h1", null, "This is a Filter", -1)), Vo = { class: "container" }, jo = /* @__PURE__ */ Bt('<input id="All" type="radio" name="categories" value="All" checked data-v-b782ead9><input id="CSS" type="radio" name="categories" value="CSS" data-v-b782ead9><input id="JavaScript" type="radio" name="categories" value="JavaScript" data-v-b782ead9><input id="jQuery" type="radio" name="categories" value="jQuery" data-v-b782ead9><input id="WordPress" type="radio" name="categories" value="WordPress" data-v-b782ead9><input id="Slider" type="radio" name="categories" value="Slider" data-v-b782ead9><input id="fullPage.js" type="radio" name="categories" value="fullPage.js" data-v-b782ead9>', 7), Lo = { class: "filters" }, Mo = /* @__PURE__ */ ee(() => /* @__PURE__ */ C("div", { class: "dropdown" }, [
  /* @__PURE__ */ C("label", { for: "All" }, "All")
], -1)), Uo = { class: "dropdown" }, Bo = {
  key: 0,
  class: "dropdown-menu"
}, qo = /* @__PURE__ */ ee(() => /* @__PURE__ */ C("li", null, "Vet2011", -1)), Ho = /* @__PURE__ */ ee(() => /* @__PURE__ */ C("li", null, "Vet2012", -1)), Go = [
  qo,
  Ho
], Ko = /* @__PURE__ */ ee(() => /* @__PURE__ */ C("div", null, [
  /* @__PURE__ */ C("label", { for: "JavaScript" }, "Topic"),
  /* @__PURE__ */ C("ol", null, [
    /* @__PURE__ */ C("li", null, "Physiology")
  ])
], -1)), Wo = /* @__PURE__ */ ee(() => /* @__PURE__ */ C("div", null, [
  /* @__PURE__ */ C("label", { for: "jQuery" }, "Animals"),
  /* @__PURE__ */ C("ol", null, [
    /* @__PURE__ */ C("li", null, "Horse")
  ])
], -1)), Qo = /* @__PURE__ */ Z({
  __name: "CrucibleFilter",
  setup(e) {
    const t = H(!1), n = () => {
      console.log("toggleDropdown"), t.value = !t.value, console.log(t.value);
    };
    return (o, r) => (T(), x(se, null, [
      Io,
      C("div", Vo, [
        jo,
        C("div", Lo, [
          Mo,
          C("div", Uo, [
            C("label", {
              for: "CSS",
              onClick: n
            }, "Course"),
            t.value ? (T(), x("ol", Bo, Go)) : ft("", !0)
          ]),
          Ko,
          Wo
        ])
      ])
    ], 64));
  }
}), At = /* @__PURE__ */ Le(Qo, [["__scopeId", "data-v-b782ead9"]]), zo = { id: "app" }, Fo = /* @__PURE__ */ Z({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = Ke("CrucibleSearch"), r = Ke("RouterView");
      return T(), x("div", zo, [
        we(o),
        we(At),
        we(r)
      ]);
    };
  }
}), Jo = [
  { path: "/", component: Fo },
  { path: "/search", component: De }
], Yo = bo({
  history: An("/"),
  routes: Jo
});
function Tt() {
  const e = G("$router");
  return e || Yo;
}
const Xo = { class: "search-container" }, Zo = { key: 0 }, er = ["onClick"], tr = 10, nr = /* @__PURE__ */ Z({
  __name: "CrucibleSearch",
  setup(e) {
    const t = Tt(), n = H(""), o = H([]), r = H(!1), d = H(null), u = G("$tagsApi") || "http://localhost:8080/api/resource/alltags", f = (E) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(E.toLowerCase())
    ), c = (E) => E.replace(/_/g, " "), h = (E) => E.replace(/ /g, "_"), s = async () => {
      n.value ? (o.value = (await No(n.value, u)).slice(0, tr), o.value = o.value.map(c), r.value = !0) : (o.value = [], r.value = !1);
    }, l = (E) => {
      n.value = o.value.includes(E) ? E : o.value[0], r.value = !1, t.push({
        path: "/search",
        query: { tag: h(n.value) }
      });
    }, a = () => {
      o.value.length && n.value && (r.value = !0);
    }, p = (E) => {
      E.key === "Enter" ? (l(n.value), n.value = "") : E.key === "Tab" && (E.preventDefault(), n.value = o.value[0] ?? n.value);
    }, y = (E) => {
      d.value && !d.value.contains(E.target) && (r.value = !1);
    };
    return dt(() => {
      document.addEventListener("click", y);
    }), Gt(() => {
      document.removeEventListener("click", y);
    }), (E, k) => (T(), x("div", Xo, [
      C("div", {
        ref_key: "searchBoxRef",
        ref: d,
        class: "search-container"
      }, [
        Kt(C("input", {
          "onUpdate:modelValue": k[0] || (k[0] = (_) => n.value = _),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: s,
          onFocus: a,
          onKeydown: p
        }, null, 544), [
          [Wt, n.value]
        ]),
        o.value.length && n.value && r.value ? (T(), x("ul", Zo, [
          (T(!0), x(se, null, Pe(o.value, (_) => (T(), x("li", {
            key: _,
            onClick: (b) => l(_)
          }, [
            (T(!0), x(se, null, Pe(_.split(""), (b, O) => (T(), x(se, null, [
              f(b) ? (T(), x("strong", {
                key: `strong-${O}`
              }, fe(b), 1)) : (T(), x("span", { key: O }, fe(b), 1))
            ], 64))), 256))
          ], 8, er))), 128))
        ])) : ft("", !0)
      ], 512)
    ]));
  }
}), or = /* @__PURE__ */ Le(nr, [["__scopeId", "data-v-5cb7fe60"]]);
function sr(e, t) {
  const { router: n, getApi: o, tagsApi: r } = t;
  e.component("CrucibleSearch", or), e.component("DisplayResult", De), e.component("CrucibleFilter", At), e.provide("$router", n), e.provide("$getApi", o), e.provide("$tagsApi", r), n.addRoute({ path: "/search", component: De });
}
export {
  At as CrucibleFilter,
  or as CrucibleSearch,
  De as DisplayResult,
  sr as createSearchPlugin
};
