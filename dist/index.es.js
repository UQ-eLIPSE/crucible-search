import { shallowRef as Vt, unref as F, shallowReactive as jt, nextTick as Lt, defineComponent as ne, reactive as Mt, inject as G, computed as j, h as ct, provide as be, ref as B, watch as De, getCurrentInstance as lt, watchEffect as Ut, onMounted as ut, openBlock as $, createElementBlock as A, createElementVNode as I, toDisplayString as Q, Fragment as Y, renderList as Z, withDirectives as ft, vShow as Bt, createCommentVNode as dt, pushScopeId as qt, popScopeId as Ht, resolveComponent as Ge, createVNode as we, onUnmounted as Gt, vModelText as Kt } from "vue";
function Wt() {
  return ht().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function ht() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const zt = typeof Proxy == "function", Ft = "devtools-plugin:setup", Qt = "plugin:settings:set";
let X, Pe;
function Yt() {
  var e;
  return X !== void 0 || (typeof window < "u" && window.performance ? (X = !0, Pe = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (X = !0, Pe = globalThis.perf_hooks.performance) : X = !1), X;
}
function Jt() {
  return Yt() ? Pe.now() : Date.now();
}
class Xt {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const u in t.settings) {
        const h = t.settings[u];
        o[u] = h.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${t.id}`;
    let f = Object.assign({}, o);
    try {
      const u = localStorage.getItem(s), h = JSON.parse(u);
      Object.assign(f, h);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return f;
      },
      setSettings(u) {
        try {
          localStorage.setItem(s, JSON.stringify(u));
        } catch {
        }
        f = u;
      },
      now() {
        return Jt();
      }
    }, n && n.on(Qt, (u, h) => {
      u === this.plugin.id && this.fallbacks.setSettings(h);
    }), this.proxiedOn = new Proxy({}, {
      get: (u, h) => this.target ? this.target.on[h] : (...a) => {
        this.onQueue.push({
          method: h,
          args: a
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (u, h) => this.target ? this.target[h] : h === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(h) ? (...a) => (this.targetQueue.push({
        method: h,
        args: a,
        resolve: () => {
        }
      }), this.fallbacks[h](...a)) : (...a) => new Promise((d) => {
        this.targetQueue.push({
          method: h,
          args: a,
          resolve: d
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
function Zt(e, t) {
  const n = e, o = ht(), s = Wt(), f = zt && n.enableEarlyProxy;
  if (s && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !f))
    s.emit(Ft, e, t);
  else {
    const u = f ? new Xt(n, s) : null;
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
function en(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const N = Object.assign;
function Re(e, t) {
  const n = {};
  for (const o in t) {
    const s = t[o];
    n[o] = V(s) ? s.map(e) : e(s);
  }
  return n;
}
const ie = () => {
}, V = Array.isArray;
function R(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const pt = /#/g, tn = /&/g, nn = /\//g, on = /=/g, rn = /\?/g, mt = /\+/g, sn = /%5B/g, an = /%5D/g, gt = /%5E/g, cn = /%60/g, vt = /%7B/g, ln = /%7C/g, yt = /%7D/g, un = /%20/g;
function Ie(e) {
  return encodeURI("" + e).replace(ln, "|").replace(sn, "[").replace(an, "]");
}
function fn(e) {
  return Ie(e).replace(vt, "{").replace(yt, "}").replace(gt, "^");
}
function Ne(e) {
  return Ie(e).replace(mt, "%2B").replace(un, "+").replace(pt, "%23").replace(tn, "%26").replace(cn, "`").replace(vt, "{").replace(yt, "}").replace(gt, "^");
}
function dn(e) {
  return Ne(e).replace(on, "%3D");
}
function hn(e) {
  return Ie(e).replace(pt, "%23").replace(rn, "%3F");
}
function pn(e) {
  return e == null ? "" : hn(e).replace(nn, "%2F");
}
function ee(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && R(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const mn = /\/$/, gn = (e) => e.replace(mn, "");
function Se(e, t, n = "/") {
  let o, s = {}, f = "", u = "";
  const h = t.indexOf("#");
  let a = t.indexOf("?");
  return h < a && h >= 0 && (a = -1), a > -1 && (o = t.slice(0, a), f = t.slice(a + 1, h > -1 ? h : t.length), s = e(f)), h > -1 && (o = o || t.slice(0, h), u = t.slice(h, t.length)), o = _n(o ?? t, n), {
    fullPath: o + (f && "?") + f + u,
    path: o,
    query: s,
    hash: ee(u)
  };
}
function vn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Ke(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function We(e, t, n) {
  const o = t.matched.length - 1, s = n.matched.length - 1;
  return o > -1 && o === s && K(t.matched[o], n.matched[s]) && _t(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function K(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function _t(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!yn(e[n], t[n]))
      return !1;
  return !0;
}
function yn(e, t) {
  return V(e) ? ze(e, t) : V(t) ? ze(t, e) : e === t;
}
function ze(e, t) {
  return V(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function _n(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return R(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), s = o[o.length - 1];
  (s === ".." || s === ".") && o.push("");
  let f = n.length - 1, u, h;
  for (u = 0; u < o.length; u++)
    if (h = o[u], h !== ".")
      if (h === "..")
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
function En(e) {
  if (!e)
    if (U) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), gn(e);
}
const bn = /^[^#]+#/;
function wn(e, t) {
  return e.replace(bn, "#") + t;
}
function Rn(e, t) {
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
function Sn(e) {
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
    const s = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!s) {
      process.env.NODE_ENV !== "production" && R(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = Rn(s, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Fe(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ce = /* @__PURE__ */ new Map();
function kn(e, t) {
  Ce.set(e, t);
}
function Pn(e) {
  const t = Ce.get(e);
  return Ce.delete(e), t;
}
let Nn = () => location.protocol + "//" + location.host;
function Et(e, t) {
  const { pathname: n, search: o, hash: s } = t, f = e.indexOf("#");
  if (f > -1) {
    let h = s.includes(e.slice(f)) ? e.slice(f).length : 1, a = s.slice(h);
    return a[0] !== "/" && (a = "/" + a), Ke(a, "");
  }
  return Ke(n, e) + o + s;
}
function Cn(e, t, n, o) {
  let s = [], f = [], u = null;
  const h = ({ state: i }) => {
    const p = Et(e, location), y = n.value, E = t.value;
    let k = 0;
    if (i) {
      if (n.value = p, t.value = i, u && u === y) {
        u = null;
        return;
      }
      k = E ? i.position - E.position : 0;
    } else
      o(p);
    s.forEach((_) => {
      _(n.value, y, {
        delta: k,
        type: le.pop,
        direction: k ? k > 0 ? ce.forward : ce.back : ce.unknown
      });
    });
  };
  function a() {
    u = n.value;
  }
  function d(i) {
    s.push(i);
    const p = () => {
      const y = s.indexOf(i);
      y > -1 && s.splice(y, 1);
    };
    return f.push(p), p;
  }
  function r() {
    const { history: i } = window;
    i.state && i.replaceState(N({}, i.state, { scroll: pe() }), "");
  }
  function c() {
    for (const i of f)
      i();
    f = [], window.removeEventListener("popstate", h), window.removeEventListener("beforeunload", r);
  }
  return window.addEventListener("popstate", h), window.addEventListener("beforeunload", r, {
    passive: !0
  }), {
    pauseListeners: a,
    listen: d,
    destroy: c
  };
}
function Qe(e, t, n, o = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: s ? pe() : null
  };
}
function On(e) {
  const { history: t, location: n } = window, o = {
    value: Et(e, n)
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
  function f(a, d, r) {
    const c = e.indexOf("#"), i = c > -1 ? (n.host && document.querySelector("base") ? e : e.slice(c)) + a : Nn() + e + a;
    try {
      t[r ? "replaceState" : "pushState"](d, "", i), s.value = d;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? R("Error with push/replace State", p) : console.error(p), n[r ? "replace" : "assign"](i);
    }
  }
  function u(a, d) {
    const r = N({}, t.state, Qe(
      s.value.back,
      // keep back and forward entries but override current position
      a,
      s.value.forward,
      !0
    ), d, { position: s.value.position });
    f(a, r, !0), o.value = a;
  }
  function h(a, d) {
    const r = N(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      s.value,
      t.state,
      {
        forward: a,
        scroll: pe()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && R(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), f(r.current, r, !0);
    const c = N({}, Qe(o.value, a, null), { position: r.position + 1 }, d);
    f(a, c, !1), o.value = a;
  }
  return {
    location: o,
    state: s,
    push: h,
    replace: u
  };
}
function $n(e) {
  e = En(e);
  const t = On(e), n = Cn(e, t.state, t.location, t.replace);
  function o(f, u = !0) {
    u || n.pauseListeners(), history.go(f);
  }
  const s = N({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: wn.bind(null, e)
  }, t, n);
  return Object.defineProperty(s, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(s, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), s;
}
function he(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function bt(e) {
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
}, Oe = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var Ye;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Ye || (Ye = {}));
const An = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${xn(t)}" via a navigation guard.`;
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
function te(e, t) {
  return process.env.NODE_ENV !== "production" ? N(new Error(An[e](t)), {
    type: e,
    [Oe]: !0
  }, t) : N(new Error(), {
    type: e,
    [Oe]: !0
  }, t);
}
function M(e, t) {
  return e instanceof Error && Oe in e && (t == null || !!(e.type & t));
}
const Tn = ["params", "query", "hash"];
function xn(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of Tn)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Je = "[^/]+?", Dn = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, In = /[.+*?^${}()[\]/\\]/g;
function Vn(e, t) {
  const n = N({}, Dn, t), o = [];
  let s = n.start ? "^" : "";
  const f = [];
  for (const d of e) {
    const r = d.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !d.length && (s += "/");
    for (let c = 0; c < d.length; c++) {
      const i = d[c];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (i.type === 0)
        c || (s += "/"), s += i.value.replace(In, "\\$&"), p += 40;
      else if (i.type === 1) {
        const { value: y, repeatable: E, optional: k, regexp: _ } = i;
        f.push({
          name: y,
          repeatable: E,
          optional: k
        });
        const b = _ || Je;
        if (b !== Je) {
          p += 10;
          try {
            new RegExp(`(${b})`);
          } catch (D) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${b}): ` + D.message);
          }
        }
        let C = E ? `((?:${b})(?:/(?:${b}))*)` : `(${b})`;
        c || (C = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        k && d.length < 2 ? `(?:/${C})` : "/" + C), k && (C += "?"), s += C, p += 20, k && (p += -8), E && (p += -20), b === ".*" && (p += -50);
      }
      r.push(p);
    }
    o.push(r);
  }
  if (n.strict && n.end) {
    const d = o.length - 1;
    o[d][o[d].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? s += "$" : n.strict && (s += "(?:/|$)");
  const u = new RegExp(s, n.sensitive ? "" : "i");
  function h(d) {
    const r = d.match(u), c = {};
    if (!r)
      return null;
    for (let i = 1; i < r.length; i++) {
      const p = r[i] || "", y = f[i - 1];
      c[y.name] = p && y.repeatable ? p.split("/") : p;
    }
    return c;
  }
  function a(d) {
    let r = "", c = !1;
    for (const i of e) {
      (!c || !r.endsWith("/")) && (r += "/"), c = !1;
      for (const p of i)
        if (p.type === 0)
          r += p.value;
        else if (p.type === 1) {
          const { value: y, repeatable: E, optional: k } = p, _ = y in d ? d[y] : "";
          if (V(_) && !E)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const b = V(_) ? _.join("/") : _;
          if (!b)
            if (k)
              i.length < 2 && (r.endsWith("/") ? r = r.slice(0, -1) : c = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          r += b;
        }
    }
    return r || "/";
  }
  return {
    re: u,
    score: o,
    keys: f,
    parse: h,
    stringify: a
  };
}
function jn(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function Ln(e, t) {
  let n = 0;
  const o = e.score, s = t.score;
  for (; n < o.length && n < s.length; ) {
    const f = jn(o[n], s[n]);
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
const Mn = {
  type: 0,
  value: ""
}, Un = /[a-zA-Z0-9_]/;
function Bn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Mn]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${d}": ${p}`);
  }
  let n = 0, o = n;
  const s = [];
  let f;
  function u() {
    f && s.push(f), f = [];
  }
  let h = 0, a, d = "", r = "";
  function c() {
    d && (n === 0 ? f.push({
      type: 0,
      value: d
    }) : n === 1 || n === 2 || n === 3 ? (f.length > 1 && (a === "*" || a === "+") && t(`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`), f.push({
      type: 1,
      value: d,
      regexp: r,
      repeatable: a === "*" || a === "+",
      optional: a === "*" || a === "?"
    })) : t("Invalid state to consume buffer"), d = "");
  }
  function i() {
    d += a;
  }
  for (; h < e.length; ) {
    if (a = e[h++], a === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        a === "/" ? (d && c(), u()) : a === ":" ? (c(), n = 1) : i();
        break;
      case 4:
        i(), n = o;
        break;
      case 1:
        a === "(" ? n = 2 : Un.test(a) ? i() : (c(), n = 0, a !== "*" && a !== "?" && a !== "+" && h--);
        break;
      case 2:
        a === ")" ? r[r.length - 1] == "\\" ? r = r.slice(0, -1) + a : n = 3 : r += a;
        break;
      case 3:
        c(), n = 0, a !== "*" && a !== "?" && a !== "+" && h--, r = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${d}"`), c(), u(), s;
}
function qn(e, t, n) {
  const o = Vn(Bn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const f = /* @__PURE__ */ new Set();
    for (const u of o.keys)
      f.has(u.name) && R(`Found duplicated params with name "${u.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), f.add(u.name);
  }
  const s = N(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function Hn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = tt({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(r) {
    return o.get(r);
  }
  function f(r, c, i) {
    const p = !i, y = Gn(r);
    process.env.NODE_ENV !== "production" && Fn(y, c), y.aliasOf = i && i.record;
    const E = tt(t, r), k = [
      y
    ];
    if ("alias" in r) {
      const C = typeof r.alias == "string" ? [r.alias] : r.alias;
      for (const D of C)
        k.push(N({}, y, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: i ? i.record.components : y.components,
          path: D,
          // we might be the child of an alias
          aliasOf: i ? i.record : y
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let _, b;
    for (const C of k) {
      const { path: D } = C;
      if (c && D[0] !== "/") {
        const W = c.record.path, L = W[W.length - 1] === "/" ? "" : "/";
        C.path = c.record.path + (D && L + D);
      }
      if (process.env.NODE_ENV !== "production" && C.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (_ = qn(C, c, E), process.env.NODE_ENV !== "production" && c && D[0] === "/" && Qn(_, c), i ? (i.alias.push(_), process.env.NODE_ENV !== "production" && zn(i, _)) : (b = b || _, b !== _ && b.alias.push(_), p && r.name && !et(_) && u(r.name)), y.children) {
        const W = y.children;
        for (let L = 0; L < W.length; L++)
          f(W[L], _, i && i.children[L]);
      }
      i = i || _, (_.record.components && Object.keys(_.record.components).length || _.record.name || _.record.redirect) && a(_);
    }
    return b ? () => {
      u(b);
    } : ie;
  }
  function u(r) {
    if (bt(r)) {
      const c = o.get(r);
      c && (o.delete(r), n.splice(n.indexOf(c), 1), c.children.forEach(u), c.alias.forEach(u));
    } else {
      const c = n.indexOf(r);
      c > -1 && (n.splice(c, 1), r.record.name && o.delete(r.record.name), r.children.forEach(u), r.alias.forEach(u));
    }
  }
  function h() {
    return n;
  }
  function a(r) {
    let c = 0;
    for (; c < n.length && Ln(r, n[c]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (r.record.path !== n[c].record.path || !wt(r, n[c])); )
      c++;
    n.splice(c, 0, r), r.record.name && !et(r) && o.set(r.record.name, r);
  }
  function d(r, c) {
    let i, p = {}, y, E;
    if ("name" in r && r.name) {
      if (i = o.get(r.name), !i)
        throw te(1, {
          location: r
        });
      if (process.env.NODE_ENV !== "production") {
        const b = Object.keys(r.params || {}).filter((C) => !i.keys.find((D) => D.name === C));
        b.length && R(`Discarded invalid param(s) "${b.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      E = i.record.name, p = N(
        // paramsFromLocation is a new object
        Ze(
          c.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          i.keys.filter((b) => !b.optional).concat(i.parent ? i.parent.keys.filter((b) => b.optional) : []).map((b) => b.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        r.params && Ze(r.params, i.keys.map((b) => b.name))
      ), y = i.stringify(p);
    } else if (r.path != null)
      y = r.path, process.env.NODE_ENV !== "production" && !y.startsWith("/") && R(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), i = n.find((b) => b.re.test(y)), i && (p = i.parse(y), E = i.record.name);
    else {
      if (i = c.name ? o.get(c.name) : n.find((b) => b.re.test(c.path)), !i)
        throw te(1, {
          location: r,
          currentLocation: c
        });
      E = i.record.name, p = N({}, c.params, r.params), y = i.stringify(p);
    }
    const k = [];
    let _ = i;
    for (; _; )
      k.unshift(_.record), _ = _.parent;
    return {
      name: E,
      path: y,
      params: p,
      matched: k,
      meta: Wn(k)
    };
  }
  return e.forEach((r) => f(r)), { addRoute: f, resolve: d, removeRoute: u, getRoutes: h, getRecordMatcher: s };
}
function Ze(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Gn(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Kn(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Kn(e) {
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
function Wn(e) {
  return e.reduce((t, n) => N(t, n.meta), {});
}
function tt(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function $e(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function zn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find($e.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find($e.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Fn(e, t) {
  t && t.record.name && !e.name && !e.path && R(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Qn(e, t) {
  for (const n of t.keys)
    if (!e.keys.find($e.bind(null, n)))
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
  for (let s = 0; s < o.length; ++s) {
    const f = o[s].replace(mt, " "), u = f.indexOf("="), h = ee(u < 0 ? f : f.slice(0, u)), a = u < 0 ? null : ee(f.slice(u + 1));
    if (h in t) {
      let d = t[h];
      V(d) || (d = t[h] = [d]), d.push(a);
    } else
      t[h] = a;
  }
  return t;
}
function nt(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = dn(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (V(o) ? o.map((f) => f && Ne(f)) : [o && Ne(o)]).forEach((f) => {
      f !== void 0 && (t += (t.length ? "&" : "") + n, f != null && (t += "=" + f));
    });
  }
  return t;
}
function Jn(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = V(o) ? o.map((s) => s == null ? null : "" + s) : o == null ? o : "" + o);
  }
  return t;
}
const Xn = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), ot = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Ve = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Rt = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), Ae = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function se() {
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
function H(e, t, n, o, s, f = (u) => u()) {
  const u = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[s] = o.enterCallbacks[s] || []);
  return () => new Promise((h, a) => {
    const d = (i) => {
      i === !1 ? a(te(4, {
        from: n,
        to: t
      })) : i instanceof Error ? a(i) : he(i) ? a(te(2, {
        from: t,
        to: i
      })) : (u && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[s] === u && typeof i == "function" && u.push(i), h());
    }, r = f(() => e.call(o && o.instances[s], t, n, process.env.NODE_ENV !== "production" ? Zn(d, t, n) : d));
    let c = Promise.resolve(r);
    if (e.length < 3 && (c = c.then(d)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const i = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof r == "object" && "then" in r)
        c = c.then((p) => d._called ? p : (R(i), Promise.reject(new Error("Invalid navigation guard"))));
      else if (r !== void 0 && !d._called) {
        R(i), a(new Error("Invalid navigation guard"));
        return;
      }
    }
    c.catch((i) => a(i));
  });
}
function Zn(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && R(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function ke(e, t, n, o, s = (f) => f()) {
  const f = [];
  for (const u of e) {
    process.env.NODE_ENV !== "production" && !u.components && !u.children.length && R(`Record with path "${u.path}" is either missing a "component(s)" or "children" property.`);
    for (const h in u.components) {
      let a = u.components[h];
      if (process.env.NODE_ENV !== "production") {
        if (!a || typeof a != "object" && typeof a != "function")
          throw R(`Component "${h}" in record with path "${u.path}" is not a valid component. Received "${String(a)}".`), new Error("Invalid route component");
        if ("then" in a) {
          R(`Component "${h}" in record with path "${u.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const d = a;
          a = () => d;
        } else
          a.__asyncLoader && // warn only once per component
          !a.__warnedDefineAsync && (a.__warnedDefineAsync = !0, R(`Component "${h}" in record with path "${u.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !u.instances[h]))
        if (eo(a)) {
          const r = (a.__vccOpts || a)[t];
          r && f.push(H(r, n, o, u, h, s));
        } else {
          let d = a();
          process.env.NODE_ENV !== "production" && !("catch" in d) && (R(`Component "${h}" in record with path "${u.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), d = Promise.resolve(d)), f.push(() => d.then((r) => {
            if (!r)
              return Promise.reject(new Error(`Couldn't resolve component "${h}" at "${u.path}"`));
            const c = en(r) ? r.default : r;
            u.components[h] = c;
            const p = (c.__vccOpts || c)[t];
            return p && H(p, n, o, u, h, s)();
          }));
        }
    }
  }
  return f;
}
function eo(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function rt(e) {
  const t = G(Ve), n = G(Rt);
  let o = !1, s = null;
  const f = j(() => {
    const r = F(e.to);
    return process.env.NODE_ENV !== "production" && (!o || r !== s) && (he(r) || (o ? R(`Invalid value for prop "to" in useLink()
- to:`, r, `
- previous to:`, s, `
- props:`, e) : R(`Invalid value for prop "to" in useLink()
- to:`, r, `
- props:`, e)), s = r, o = !0), t.resolve(r);
  }), u = j(() => {
    const { matched: r } = f.value, { length: c } = r, i = r[c - 1], p = n.matched;
    if (!i || !p.length)
      return -1;
    const y = p.findIndex(K.bind(null, i));
    if (y > -1)
      return y;
    const E = st(r[c - 2]);
    return (
      // we are dealing with nested routes
      c > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      st(i) === E && // avoid comparing the child with its parent
      p[p.length - 1].path !== E ? p.findIndex(K.bind(null, r[c - 2])) : y
    );
  }), h = j(() => u.value > -1 && ro(n.params, f.value.params)), a = j(() => u.value > -1 && u.value === n.matched.length - 1 && _t(n.params, f.value.params));
  function d(r = {}) {
    return oo(r) ? t[F(e.replace) ? "replace" : "push"](
      F(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ie) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && U) {
    const r = lt();
    if (r) {
      const c = {
        route: f.value,
        isActive: h.value,
        isExactActive: a.value,
        error: null
      };
      r.__vrl_devtools = r.__vrl_devtools || [], r.__vrl_devtools.push(c), Ut(() => {
        c.route = f.value, c.isActive = h.value, c.isExactActive = a.value, c.error = he(F(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: f,
    href: j(() => f.value.href),
    isActive: h,
    isExactActive: a,
    navigate: d
  };
}
const to = /* @__PURE__ */ ne({
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
    const n = Mt(rt(e)), { options: o } = G(Ve), s = j(() => ({
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
}), no = to;
function oo(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function ro(e, t) {
  for (const n in t) {
    const o = t[n], s = e[n];
    if (typeof o == "string") {
      if (o !== s)
        return !1;
    } else if (!V(s) || s.length !== o.length || o.some((f, u) => f !== s[u]))
      return !1;
  }
  return !0;
}
function st(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const at = (e, t, n) => e ?? t ?? n, so = /* @__PURE__ */ ne({
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
    process.env.NODE_ENV !== "production" && io();
    const o = G(Ae), s = j(() => e.route || o.value), f = G(ot, 0), u = j(() => {
      let d = F(f);
      const { matched: r } = s.value;
      let c;
      for (; (c = r[d]) && !c.components; )
        d++;
      return d;
    }), h = j(() => s.value.matched[u.value]);
    be(ot, j(() => u.value + 1)), be(Xn, h), be(Ae, s);
    const a = B();
    return De(() => [a.value, h.value, e.name], ([d, r, c], [i, p, y]) => {
      r && (r.instances[c] = d, p && p !== r && d && d === i && (r.leaveGuards.size || (r.leaveGuards = p.leaveGuards), r.updateGuards.size || (r.updateGuards = p.updateGuards))), d && r && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !K(r, p) || !i) && (r.enterCallbacks[c] || []).forEach((E) => E(d));
    }, { flush: "post" }), () => {
      const d = s.value, r = e.name, c = h.value, i = c && c.components[r];
      if (!i)
        return it(n.default, { Component: i, route: d });
      const p = c.props[r], y = p ? p === !0 ? d.params : typeof p == "function" ? p(d) : p : null, k = ct(i, N({}, y, t, {
        onVnodeUnmounted: (_) => {
          _.component.isUnmounted && (c.instances[r] = null);
        },
        ref: a
      }));
      if (process.env.NODE_ENV !== "production" && U && k.ref) {
        const _ = {
          depth: u.value,
          name: c.name,
          path: c.path,
          meta: c.meta
        };
        (V(k.ref) ? k.ref.map((C) => C.i) : [k.ref.i]).forEach((C) => {
          C.__vrv_devtools = _;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        it(n.default, { Component: k, route: d }) || k
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
const ao = so;
function io() {
  const e = lt(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
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
    matched: e.matched.map((o) => _o(o, ["instances", "children", "aliasOf"]))
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
let co = 0;
function lo(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = co++;
  Zt({
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
        value: ae(t.currentRoute.value, "Current Route")
      });
    }), s.on.visitComponentTree(({ treeNode: r, componentInstance: c }) => {
      if (c.__vrv_devtools) {
        const i = c.__vrv_devtools;
        r.tags.push({
          label: (i.name ? `${i.name.toString()}: ` : "") + i.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: St
        });
      }
      V(c.__vrl_devtools) && (c.__devtoolsApi = s, c.__vrl_devtools.forEach((i) => {
        let p = i.route.path, y = Nt, E = "", k = 0;
        i.error ? (p = i.error, y = mo, k = go) : i.isExactActive ? (y = Pt, E = "This is exactly active") : i.isActive && (y = kt, E = "This link is active"), r.tags.push({
          label: p,
          textColor: k,
          tooltip: E,
          backgroundColor: y
        });
      }));
    }), De(t.currentRoute, () => {
      a(), s.notifyComponentUpdate(), s.sendInspectorTree(h), s.sendInspectorState(h);
    });
    const f = "router:navigations:" + o;
    s.addTimelineLayer({
      id: f,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((r, c) => {
      s.addTimelineEvent({
        layerId: f,
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
    let u = 0;
    t.beforeEach((r, c) => {
      const i = {
        guard: de("beforeEach"),
        from: ae(c, "Current Location during this navigation"),
        to: ae(r, "Target location")
      };
      Object.defineProperty(r.meta, "__navigationId", {
        value: u++
      }), s.addTimelineEvent({
        layerId: f,
        event: {
          time: s.now(),
          title: "Start of navigation",
          subtitle: r.fullPath,
          data: i,
          groupId: r.meta.__navigationId
        }
      });
    }), t.afterEach((r, c, i) => {
      const p = {
        guard: de("afterEach")
      };
      i ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: i ? i.message : "",
          tooltip: "Navigation Failure",
          value: i
        }
      }, p.status = de("❌")) : p.status = de("✅"), p.from = ae(c, "Current Location during this navigation"), p.to = ae(r, "Target location"), s.addTimelineEvent({
        layerId: f,
        event: {
          title: "End of navigation",
          subtitle: r.fullPath,
          time: s.now(),
          data: p,
          logType: i ? "warning" : "default",
          groupId: r.meta.__navigationId
        }
      });
    });
    const h = "router-inspector:" + o;
    s.addInspector({
      id: h,
      label: "Routes" + (o ? " " + o : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function a() {
      if (!d)
        return;
      const r = d;
      let c = n.getRoutes().filter((i) => !i.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !i.parent.record.components);
      c.forEach($t), r.filter && (c = c.filter((i) => (
        // save matches state based on the payload
        Te(i, r.filter.toLowerCase())
      ))), c.forEach((i) => Ot(i, t.currentRoute.value)), r.rootNodes = c.map(Ct);
    }
    let d;
    s.on.getInspectorTree((r) => {
      d = r, r.app === e && r.inspectorId === h && a();
    }), s.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === h) {
        const i = n.getRoutes().find((p) => p.record.__vd_id === r.nodeId);
        i && (r.state = {
          options: fo(i)
        });
      }
    }), s.sendInspectorTree(h), s.sendInspectorState(h);
  });
}
function uo(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function fo(e) {
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
        display: e.keys.map((o) => `${o.name}${uo(o)}`).join(" "),
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
const St = 15485081, kt = 2450411, Pt = 8702998, ho = 2282478, Nt = 16486972, po = 6710886, mo = 16704226, go = 12131356;
function Ct(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: ho
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
    backgroundColor: po
  });
  let o = n.__vd_id;
  return o == null && (o = String(vo++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Ct)
  };
}
let vo = 0;
const yo = /^\/(.*)\/([a-z]*)$/;
function Ot(e, t) {
  const n = t.matched.length && K(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => K(o, e.record))), e.children.forEach((o) => Ot(o, t));
}
function $t(e) {
  e.__vd_match = !1, e.children.forEach($t);
}
function Te(e, t) {
  const n = String(e.re).match(yo);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((u) => Te(u, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const s = e.record.path.toLowerCase(), f = ee(s);
  return !t.startsWith("/") && (f.includes(t) || s.includes(t)) || f.startsWith(t) || s.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((u) => Te(u, t));
}
function _o(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function Eo(e) {
  const t = Hn(e.routes, e), n = e.parseQuery || Yn, o = e.stringifyQuery || nt, s = e.history;
  if (process.env.NODE_ENV !== "production" && !s)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const f = se(), u = se(), h = se(), a = Vt(q);
  let d = q;
  U && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const r = Re.bind(null, (l) => "" + l), c = Re.bind(null, pn), i = (
    // @ts-expect-error: intentionally avoid the type check
    Re.bind(null, ee)
  );
  function p(l, g) {
    let m, v;
    return bt(l) ? (m = t.getRecordMatcher(l), process.env.NODE_ENV !== "production" && !m && R(`Parent route "${String(l)}" not found when adding child route`, g), v = g) : v = l, t.addRoute(v, m);
  }
  function y(l) {
    const g = t.getRecordMatcher(l);
    g ? t.removeRoute(g) : process.env.NODE_ENV !== "production" && R(`Cannot remove non-existent route "${String(l)}"`);
  }
  function E() {
    return t.getRoutes().map((l) => l.record);
  }
  function k(l) {
    return !!t.getRecordMatcher(l);
  }
  function _(l, g) {
    if (g = N({}, g || a.value), typeof l == "string") {
      const w = Se(n, l, g.path), O = t.resolve({ path: w.path }, g), z = s.createHref(w.fullPath);
      return process.env.NODE_ENV !== "production" && (z.startsWith("//") ? R(`Location "${l}" resolved to "${z}". A resolved location cannot start with multiple slashes.`) : O.matched.length || R(`No match found for location with path "${l}"`)), N(w, O, {
        params: i(O.params),
        hash: ee(w.hash),
        redirectedFrom: void 0,
        href: z
      });
    }
    process.env.NODE_ENV !== "production" && !he(l) && (R(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, l), l = {});
    let m;
    if (l.path != null)
      process.env.NODE_ENV !== "production" && "params" in l && !("name" in l) && // @ts-expect-error: the type is never
      Object.keys(l.params).length && R(`Path "${l.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), m = N({}, l, {
        path: Se(n, l.path, g.path).path
      });
    else {
      const w = N({}, l.params);
      for (const O in w)
        w[O] == null && delete w[O];
      m = N({}, l, {
        params: c(w)
      }), g.params = c(g.params);
    }
    const v = t.resolve(m, g), P = l.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && R(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), v.params = r(i(v.params));
    const T = vn(o, N({}, l, {
      hash: fn(P),
      path: v.path
    })), S = s.createHref(T);
    return process.env.NODE_ENV !== "production" && (S.startsWith("//") ? R(`Location "${l}" resolved to "${S}". A resolved location cannot start with multiple slashes.`) : v.matched.length || R(`No match found for location with path "${l.path != null ? l.path : l}"`)), N({
      fullPath: T,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: P,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === nt ? Jn(l.query) : l.query || {}
      )
    }, v, {
      redirectedFrom: void 0,
      href: S
    });
  }
  function b(l) {
    return typeof l == "string" ? Se(n, l, a.value.path) : N({}, l);
  }
  function C(l, g) {
    if (d !== l)
      return te(8, {
        from: g,
        to: l
      });
  }
  function D(l) {
    return oe(l);
  }
  function W(l) {
    return D(N(b(l), { replace: !0 }));
  }
  function L(l) {
    const g = l.matched[l.matched.length - 1];
    if (g && g.redirect) {
      const { redirect: m } = g;
      let v = typeof m == "function" ? m(l) : m;
      if (typeof v == "string" && (v = v.includes("?") || v.includes("#") ? v = b(v) : (
        // force empty params
        { path: v }
      ), v.params = {}), process.env.NODE_ENV !== "production" && v.path == null && !("name" in v))
        throw R(`Invalid redirect found:
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
  function oe(l, g) {
    const m = d = _(l), v = a.value, P = l.state, T = l.force, S = l.replace === !0, w = L(m);
    if (w)
      return oe(
        N(b(w), {
          state: typeof w == "object" ? N({}, P, w.state) : P,
          force: T,
          replace: S
        }),
        // keep original redirectedFrom if it exists
        g || m
      );
    const O = m;
    O.redirectedFrom = g;
    let z;
    return !T && We(o, v, m) && (z = te(16, { to: O, from: v }), qe(
      v,
      v,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (z ? Promise.resolve(z) : Le(O, v)).catch((x) => M(x) ? (
      // navigation redirects still mark the router as ready
      M(
        x,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? x : ye(x)
    ) : (
      // reject any unknown error
      ve(x, O, v)
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
          ) : 1) > 30 ? (R(`Detected a possibly infinite redirection in a navigation guard when going from "${v.fullPath}" to "${O.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : oe(
            // keep options
            N({
              // preserve an existing replacement but allow the redirect to override it
              replace: S
            }, b(x.to), {
              state: typeof x.to == "object" ? N({}, P, x.to.state) : P,
              force: T
            }),
            // preserve the original redirectedFrom if any
            g || O
          );
      } else
        x = Ue(O, v, !0, S, P);
      return Me(O, v, x), x;
    });
  }
  function xt(l, g) {
    const m = C(l, g);
    return m ? Promise.reject(m) : Promise.resolve();
  }
  function me(l) {
    const g = fe.values().next().value;
    return g && typeof g.runWithContext == "function" ? g.runWithContext(l) : l();
  }
  function Le(l, g) {
    let m;
    const [v, P, T] = bo(l, g);
    m = ke(v.reverse(), "beforeRouteLeave", l, g);
    for (const w of v)
      w.leaveGuards.forEach((O) => {
        m.push(H(O, l, g));
      });
    const S = xt.bind(null, l, g);
    return m.push(S), J(m).then(() => {
      m = [];
      for (const w of f.list())
        m.push(H(w, l, g));
      return m.push(S), J(m);
    }).then(() => {
      m = ke(P, "beforeRouteUpdate", l, g);
      for (const w of P)
        w.updateGuards.forEach((O) => {
          m.push(H(O, l, g));
        });
      return m.push(S), J(m);
    }).then(() => {
      m = [];
      for (const w of T)
        if (w.beforeEnter)
          if (V(w.beforeEnter))
            for (const O of w.beforeEnter)
              m.push(H(O, l, g));
          else
            m.push(H(w.beforeEnter, l, g));
      return m.push(S), J(m);
    }).then(() => (l.matched.forEach((w) => w.enterCallbacks = {}), m = ke(T, "beforeRouteEnter", l, g, me), m.push(S), J(m))).then(() => {
      m = [];
      for (const w of u.list())
        m.push(H(w, l, g));
      return m.push(S), J(m);
    }).catch((w) => M(
      w,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? w : Promise.reject(w));
  }
  function Me(l, g, m) {
    h.list().forEach((v) => me(() => v(l, g, m)));
  }
  function Ue(l, g, m, v, P) {
    const T = C(l, g);
    if (T)
      return T;
    const S = g === q, w = U ? history.state : {};
    m && (v || S ? s.replace(l.fullPath, N({
      scroll: S && w && w.scroll
    }, P)) : s.push(l.fullPath, P)), a.value = l, qe(l, g, m, S), ye();
  }
  let re;
  function Dt() {
    re || (re = s.listen((l, g, m) => {
      if (!He.listening)
        return;
      const v = _(l), P = L(v);
      if (P) {
        oe(N(P, { replace: !0 }), v).catch(ie);
        return;
      }
      d = v;
      const T = a.value;
      U && kn(Fe(T.fullPath, m.delta), pe()), Le(v, T).catch((S) => M(
        S,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? S : M(
        S,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (oe(
        S.to,
        v
        // avoid an uncaught rejection, let push call triggerError
      ).then((w) => {
        M(
          w,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !m.delta && m.type === le.pop && s.go(-1, !1);
      }).catch(ie), Promise.reject()) : (m.delta && s.go(-m.delta, !1), ve(S, v, T))).then((S) => {
        S = S || Ue(
          // after navigation, all matched components are resolved
          v,
          T,
          !1
        ), S && (m.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !M(
          S,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? s.go(-m.delta, !1) : m.type === le.pop && M(
          S,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && s.go(-1, !1)), Me(v, T, S);
      }).catch(ie);
    }));
  }
  let ge = se(), Be = se(), ue;
  function ve(l, g, m) {
    ye(l);
    const v = Be.list();
    return v.length ? v.forEach((P) => P(l, g, m)) : (process.env.NODE_ENV !== "production" && R("uncaught error during route navigation:"), console.error(l)), Promise.reject(l);
  }
  function It() {
    return ue && a.value !== q ? Promise.resolve() : new Promise((l, g) => {
      ge.add([l, g]);
    });
  }
  function ye(l) {
    return ue || (ue = !l, Dt(), ge.list().forEach(([g, m]) => l ? m(l) : g()), ge.reset()), l;
  }
  function qe(l, g, m, v) {
    const { scrollBehavior: P } = e;
    if (!U || !P)
      return Promise.resolve();
    const T = !m && Pn(Fe(l.fullPath, 0)) || (v || !m) && history.state && history.state.scroll || null;
    return Lt().then(() => P(l, g, T)).then((S) => S && Sn(S)).catch((S) => ve(S, l, g));
  }
  const _e = (l) => s.go(l);
  let Ee;
  const fe = /* @__PURE__ */ new Set(), He = {
    currentRoute: a,
    listening: !0,
    addRoute: p,
    removeRoute: y,
    hasRoute: k,
    getRoutes: E,
    resolve: _,
    options: e,
    push: D,
    replace: W,
    go: _e,
    back: () => _e(-1),
    forward: () => _e(1),
    beforeEach: f.add,
    beforeResolve: u.add,
    afterEach: h.add,
    onError: Be.add,
    isReady: It,
    install(l) {
      const g = this;
      l.component("RouterLink", no), l.component("RouterView", ao), l.config.globalProperties.$router = g, Object.defineProperty(l.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => F(a)
      }), U && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !Ee && a.value === q && (Ee = !0, D(s.location).catch((P) => {
        process.env.NODE_ENV !== "production" && R("Unexpected error when starting the router:", P);
      }));
      const m = {};
      for (const P in q)
        Object.defineProperty(m, P, {
          get: () => a.value[P],
          enumerable: !0
        });
      l.provide(Ve, g), l.provide(Rt, jt(m)), l.provide(Ae, a);
      const v = l.unmount;
      fe.add(l), l.unmount = function() {
        fe.delete(l), fe.size < 1 && (d = q, re && re(), re = null, a.value = q, Ee = !1, ue = !1), v();
      }, process.env.NODE_ENV !== "production" && U && lo(l, g, t);
    }
  };
  function J(l) {
    return l.reduce((g, m) => g.then(() => me(m)), Promise.resolve());
  }
  return He;
}
function bo(e, t) {
  const n = [], o = [], s = [], f = Math.max(t.matched.length, e.matched.length);
  for (let u = 0; u < f; u++) {
    const h = t.matched[u];
    h && (e.matched.find((d) => K(d, h)) ? o.push(h) : n.push(h));
    const a = e.matched[u];
    a && (t.matched.find((d) => K(d, a)) || s.push(a));
  }
  return [n, o, s];
}
const wo = [
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
], Ro = ["VET2011"], So = [
  "course:VETS2011",
  "course:VETS2012",
  "subject:Physiology",
  "system:Respiratory_System",
  "system:Exercise",
  "animal:Horse"
], ko = async (e, t) => {
  try {
    return await (await fetch(
      t + "?" + new URLSearchParams({ tag: e })
    )).json();
  } catch (n) {
    console.error("Error fetching data from the server", n), alert("Error fetching data from the server, only display test data.");
  }
}, Po = async (e, t) => {
  try {
    return await ko(e, t) || wo.filter(
      (o) => o.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, No = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), s = await (await fetch(`${t}?${n}`)).json() ?? Ro, f = new Set(s);
    return Array.from(f);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, Co = { class: "search-results-container" }, Oo = { class: "container-description" }, $o = { class: "label-badges" }, Ao = {
  key: 0,
  class: "results"
}, To = ["href"], xo = {
  key: 1,
  class: "no-results"
}, Do = /* @__PURE__ */ ne({
  __name: "DisplayResult",
  setup(e) {
    const t = G("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("%cRetrieving data from:", "color: skyblue;", t);
    const n = B([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = Tt(), s = B("");
    ut(async () => {
      o ? (s.value = o.currentRoute.value.query.tag, await f(s.value)) : s.value = "undefined";
    });
    const f = async (u) => {
      const h = await Po(u, t);
      h && (n.value = h);
    };
    return De(o.currentRoute, async (u, h) => {
      const a = u.query.tag || "", d = h.query.tag || "";
      a !== d && await f(a);
    }), (u, h) => ($(), A("div", Co, [
      I("div", Oo, [
        I("button", {
          onClick: h[0] || (h[0] = () => u.$router.back())
        }, "↵"),
        I("div", $o, " (" + Q(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? ($(), A("div", Ao, [
        I("ul", null, [
          ($(!0), A(Y, null, Z(n.value, (a, d) => ($(), A("li", { key: d }, [
            I("a", {
              href: a.url,
              target: "_blank",
              class: "linkToResource"
            }, Q(a.label), 9, To)
          ]))), 128))
        ])
      ])) : ($(), A("p", xo, "No results found"))
    ]));
  }
}), je = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, xe = /* @__PURE__ */ je(Do, [["__scopeId", "data-v-8413d12c"]]), Io = (e) => (qt("data-v-1a723e93"), e = e(), Ht(), e), Vo = { class: "crucible-filter-panel" }, jo = { class: "crucible-filters" }, Lo = ["onClick"], Mo = { class: "crucible-filter-dropdown-menu" }, Uo = ["onClick"], Bo = { class: "crucible-filter-collection" }, qo = ["onClick"], Ho = {
  key: 0,
  class: "crucible-filter-dropdown"
}, Go = /* @__PURE__ */ Io(() => /* @__PURE__ */ I("span", null, "All", -1)), Ko = [
  Go
], Wo = /* @__PURE__ */ ne({
  __name: "CrucibleFilter",
  setup(e) {
    const t = B({}), n = B([]), o = So.reduce(
      (a, d) => {
        const [r, c] = d.split(":");
        return a[r] || (a[r] = []), a[r].push(c.replace("_", " ")), a;
      },
      {}
    ), s = (a) => {
      t.value[a] = !t.value[a], Object.keys(t.value).forEach((d) => {
        d !== a && (t.value[d] = !1);
      });
    }, f = (a, d) => {
      t.value[a] = !t.value[a], n.value.includes(`${a}:${d.replace(" ", "_")}`) || n.value.push(`${a}:${d.replace(" ", "_")}`);
    }, u = () => {
      t.value = {}, n.value = [];
    }, h = () => {
      console.log("Applying the filter", n);
    };
    return (a, d) => ($(), A("div", Vo, [
      I("div", jo, [
        ($(!0), A(Y, null, Z(F(o), (r, c) => ($(), A("div", {
          key: c,
          class: "crucible-filter-dropdown"
        }, [
          I("p", {
            onClick: (i) => s(c)
          }, Q(c), 9, Lo),
          ft(I("ul", Mo, [
            ($(!0), A(Y, null, Z(r, (i, p) => ($(), A("li", {
              key: p,
              onClick: (y) => f(c, i)
            }, Q(i), 9, Uo))), 128))
          ], 512), [
            [Bt, t.value[c]]
          ])
        ]))), 128))
      ]),
      I("div", Bo, [
        ($(!0), A(Y, null, Z(n.value, (r, c) => ($(), A("span", {
          key: c,
          onClick: (i) => n.value.splice(c, 1)
        }, Q(r.split(":")[1].replace("_", " ")), 9, qo))), 128)),
        n.value.length === 0 ? ($(), A("div", Ho, Ko)) : dt("", !0)
      ]),
      I("button", {
        class: "filter-btn",
        onClick: h
      }, "Apply"),
      I("button", {
        class: "filter-btn",
        onClick: u
      }, "Empty")
    ]));
  }
}), At = /* @__PURE__ */ je(Wo, [["__scopeId", "data-v-1a723e93"]]), zo = { id: "app" }, Fo = /* @__PURE__ */ ne({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = Ge("CrucibleSearch"), s = Ge("RouterView");
      return $(), A("div", zo, [
        we(At),
        we(o),
        we(s)
      ]);
    };
  }
}), Qo = [
  { path: "/", component: Fo },
  { path: "/search", component: xe }
], Yo = Eo({
  history: $n("/"),
  routes: Qo
});
function Tt() {
  const e = G("$router");
  return e || Yo;
}
const Jo = { class: "search-container" }, Xo = { key: 0 }, Zo = ["onClick"], er = 10, tr = /* @__PURE__ */ ne({
  __name: "CrucibleSearch",
  setup(e) {
    const t = Tt(), n = B(""), o = B([]), s = B(!1), f = B(null), u = G("$tagsApi") || "http://localhost:8080/api/resource/alltags", h = (E) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(E.toLowerCase())
    ), a = (E) => E.replace(/_/g, " "), d = (E) => E.replace(/ /g, "_"), r = async () => {
      n.value ? (o.value = (await No(n.value, u)).slice(0, er), o.value = o.value.map(a), s.value = !0) : (o.value = [], s.value = !1);
    }, c = (E) => {
      n.value = o.value.includes(E) ? E : o.value[0], s.value = !1, t.push({
        path: "/search",
        query: { tag: d(n.value) }
      });
    }, i = () => {
      o.value.length && n.value && (s.value = !0);
    }, p = (E) => {
      E.key === "Enter" ? (c(n.value), n.value = "") : E.key === "Tab" && (E.preventDefault(), n.value = o.value[0] ?? n.value);
    }, y = (E) => {
      f.value && !f.value.contains(E.target) && (s.value = !1);
    };
    return ut(() => {
      document.addEventListener("click", y);
    }), Gt(() => {
      document.removeEventListener("click", y);
    }), (E, k) => ($(), A("div", Jo, [
      I("div", {
        ref_key: "searchBoxRef",
        ref: f,
        class: "search-container"
      }, [
        ft(I("input", {
          "onUpdate:modelValue": k[0] || (k[0] = (_) => n.value = _),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: r,
          onFocus: i,
          onKeydown: p
        }, null, 544), [
          [Kt, n.value]
        ]),
        o.value.length && n.value && s.value ? ($(), A("ul", Xo, [
          ($(!0), A(Y, null, Z(o.value, (_) => ($(), A("li", {
            key: _,
            onClick: (b) => c(_)
          }, [
            ($(!0), A(Y, null, Z(_.split(""), (b, C) => ($(), A(Y, null, [
              h(b) ? ($(), A("strong", {
                key: `strong-${C}`
              }, Q(b), 1)) : ($(), A("span", { key: C }, Q(b), 1))
            ], 64))), 256))
          ], 8, Zo))), 128))
        ])) : dt("", !0)
      ], 512)
    ]));
  }
}), nr = /* @__PURE__ */ je(tr, [["__scopeId", "data-v-5cb7fe60"]]);
function rr(e, t) {
  const { router: n, getApi: o, tagsApi: s } = t;
  e.component("CrucibleSearch", nr), e.component("DisplayResult", xe), e.component("CrucibleFilter", At), e.provide("$router", n), e.provide("$getApi", o), e.provide("$tagsApi", s), n.addRoute({ path: "/search", component: xe });
}
export {
  At as CrucibleFilter,
  nr as CrucibleSearch,
  xe as DisplayResult,
  rr as createSearchPlugin
};
