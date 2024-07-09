import { shallowRef as Vt, unref as Q, shallowReactive as It, nextTick as jt, defineComponent as te, reactive as Lt, inject as G, computed as j, h as lt, provide as we, ref as H, watch as Ve, getCurrentInstance as ut, watchEffect as Mt, onMounted as ft, openBlock as A, createElementBlock as T, createElementVNode as I, toDisplayString as X, Fragment as J, renderList as ce, withDirectives as dt, vShow as Ut, resolveComponent as Ke, createVNode as de, onUnmounted as Bt, vModelText as qt, createCommentVNode as Ht } from "vue";
function Gt() {
  return ht().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function ht() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Kt = typeof Proxy == "function", Wt = "devtools-plugin:setup", zt = "plugin:settings:set";
let Y, Pe;
function Qt() {
  var e;
  return Y !== void 0 || (typeof window < "u" && window.performance ? (Y = !0, Pe = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Y = !0, Pe = globalThis.perf_hooks.performance) : Y = !1), Y;
}
function Ft() {
  return Qt() ? Pe.now() : Date.now();
}
class Yt {
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
        return Ft();
      }
    }, n && n.on(zt, (i, d) => {
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
function Jt(e, t) {
  const n = e, o = ht(), r = Gt(), f = Kt && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !f))
    r.emit(Wt, e, t);
  else {
    const i = f ? new Yt(n, r) : null;
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
function Xt(e) {
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
const pt = /#/g, Zt = /&/g, en = /\//g, tn = /=/g, nn = /\?/g, mt = /\+/g, on = /%5B/g, rn = /%5D/g, gt = /%5E/g, sn = /%60/g, vt = /%7B/g, an = /%7C/g, yt = /%7D/g, cn = /%20/g;
function Ie(e) {
  return encodeURI("" + e).replace(an, "|").replace(on, "[").replace(rn, "]");
}
function ln(e) {
  return Ie(e).replace(vt, "{").replace(yt, "}").replace(gt, "^");
}
function Ne(e) {
  return Ie(e).replace(mt, "%2B").replace(cn, "+").replace(pt, "%23").replace(Zt, "%26").replace(sn, "`").replace(vt, "{").replace(yt, "}").replace(gt, "^");
}
function un(e) {
  return Ne(e).replace(tn, "%3D");
}
function fn(e) {
  return Ie(e).replace(pt, "%23").replace(nn, "%3F");
}
function dn(e) {
  return e == null ? "" : fn(e).replace(en, "%2F");
}
function Z(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && R(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const hn = /\/$/, pn = (e) => e.replace(hn, "");
function ke(e, t, n = "/") {
  let o, r = {}, f = "", i = "";
  const d = t.indexOf("#");
  let c = t.indexOf("?");
  return d < c && d >= 0 && (c = -1), c > -1 && (o = t.slice(0, c), f = t.slice(c + 1, d > -1 ? d : t.length), r = e(f)), d > -1 && (o = o || t.slice(0, d), i = t.slice(d, t.length)), o = vn(o ?? t, n), {
    fullPath: o + (f && "?") + f + i,
    path: o,
    query: r,
    hash: Z(i)
  };
}
function mn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function We(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function ze(e, t, n) {
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
    if (!gn(e[n], t[n]))
      return !1;
  return !0;
}
function gn(e, t) {
  return V(e) ? Qe(e, t) : V(t) ? Qe(t, e) : e === t;
}
function Qe(e, t) {
  return V(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function vn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return R(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
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
var le;
(function(e) {
  e.pop = "pop", e.push = "push";
})(le || (le = {}));
var ie;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(ie || (ie = {}));
function yn(e) {
  if (!e)
    if (U) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), pn(e);
}
const _n = /^[^#]+#/;
function En(e, t) {
  return e.replace(_n, "#") + t;
}
function bn(e, t) {
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
function wn(e) {
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
    t = bn(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Fe(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Oe = /* @__PURE__ */ new Map();
function Rn(e, t) {
  Oe.set(e, t);
}
function kn(e) {
  const t = Oe.get(e);
  return Oe.delete(e), t;
}
let Sn = () => location.protocol + "//" + location.host;
function Et(e, t) {
  const { pathname: n, search: o, hash: r } = t, f = e.indexOf("#");
  if (f > -1) {
    let d = r.includes(e.slice(f)) ? e.slice(f).length : 1, c = r.slice(d);
    return c[0] !== "/" && (c = "/" + c), We(c, "");
  }
  return We(n, e) + o + r;
}
function Pn(e, t, n, o) {
  let r = [], f = [], i = null;
  const d = ({ state: a }) => {
    const p = Et(e, location), y = n.value, E = t.value;
    let S = 0;
    if (a) {
      if (n.value = p, t.value = a, i && i === y) {
        i = null;
        return;
      }
      S = E ? a.position - E.position : 0;
    } else
      o(p);
    r.forEach((_) => {
      _(n.value, y, {
        delta: S,
        type: le.pop,
        direction: S ? S > 0 ? ie.forward : ie.back : ie.unknown
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
    a.state && a.replaceState(N({}, a.state, { scroll: me() }), "");
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
function Ye(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? me() : null
  };
}
function Nn(e) {
  const { history: t, location: n } = window, o = {
    value: Et(e, n)
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
    const u = e.indexOf("#"), a = u > -1 ? (n.host && document.querySelector("base") ? e : e.slice(u)) + c : Sn() + e + c;
    try {
      t[s ? "replaceState" : "pushState"](h, "", a), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? R("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](a);
    }
  }
  function i(c, h) {
    const s = N({}, t.state, Ye(
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
        scroll: me()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && R(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), f(s.current, s, !0);
    const u = N({}, Ye(o.value, c, null), { position: s.position + 1 }, h);
    f(c, u, !1), o.value = c;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: i
  };
}
function On(e) {
  e = yn(e);
  const t = Nn(e), n = Pn(e, t.state, t.location, t.replace);
  function o(f, i = !0) {
    i || n.pauseListeners(), history.go(f);
  }
  const r = N({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: En.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function pe(e) {
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
}, Ce = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var Je;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Je || (Je = {}));
const Cn = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${An(t)}" via a navigation guard.`;
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
  return process.env.NODE_ENV !== "production" ? N(new Error(Cn[e](t)), {
    type: e,
    [Ce]: !0
  }, t) : N(new Error(), {
    type: e,
    [Ce]: !0
  }, t);
}
function M(e, t) {
  return e instanceof Error && Ce in e && (t == null || !!(e.type & t));
}
const $n = ["params", "query", "hash"];
function An(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of $n)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Xe = "[^/]+?", Tn = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, xn = /[.+*?^${}()[\]/\\]/g;
function Dn(e, t) {
  const n = N({}, Tn, t), o = [];
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
        u || (r += "/"), r += a.value.replace(xn, "\\$&"), p += 40;
      else if (a.type === 1) {
        const { value: y, repeatable: E, optional: S, regexp: _ } = a;
        f.push({
          name: y,
          repeatable: E,
          optional: S
        });
        const b = _ || Xe;
        if (b !== Xe) {
          p += 10;
          try {
            new RegExp(`(${b})`);
          } catch (D) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${b}): ` + D.message);
          }
        }
        let O = E ? `((?:${b})(?:/(?:${b}))*)` : `(${b})`;
        u || (O = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        S && h.length < 2 ? `(?:/${O})` : "/" + O), S && (O += "?"), r += O, p += 20, S && (p += -8), E && (p += -20), b === ".*" && (p += -50);
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
          const { value: y, repeatable: E, optional: S } = p, _ = y in h ? h[y] : "";
          if (V(_) && !E)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const b = V(_) ? _.join("/") : _;
          if (!b)
            if (S)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : u = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          s += b;
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
function Vn(e, t) {
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
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const f = Vn(o[n], r[n]);
    if (f)
      return f;
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
const jn = {
  type: 0,
  value: ""
}, Ln = /[a-zA-Z0-9_]/;
function Mn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[jn]];
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
        c === "(" ? n = 2 : Ln.test(c) ? a() : (u(), n = 0, c !== "*" && c !== "?" && c !== "+" && d--);
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
function Un(e, t, n) {
  const o = Dn(Mn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const f = /* @__PURE__ */ new Set();
    for (const i of o.keys)
      f.has(i.name) && R(`Found duplicated params with name "${i.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), f.add(i.name);
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
function Bn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = nt({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function f(s, u, a) {
    const p = !a, y = qn(s);
    process.env.NODE_ENV !== "production" && Wn(y, u), y.aliasOf = a && a.record;
    const E = nt(t, s), S = [
      y
    ];
    if ("alias" in s) {
      const O = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const D of O)
        S.push(N({}, y, {
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
    let _, b;
    for (const O of S) {
      const { path: D } = O;
      if (u && D[0] !== "/") {
        const W = u.record.path, L = W[W.length - 1] === "/" ? "" : "/";
        O.path = u.record.path + (D && L + D);
      }
      if (process.env.NODE_ENV !== "production" && O.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (_ = Un(O, u, E), process.env.NODE_ENV !== "production" && u && D[0] === "/" && zn(_, u), a ? (a.alias.push(_), process.env.NODE_ENV !== "production" && Kn(a, _)) : (b = b || _, b !== _ && b.alias.push(_), p && s.name && !tt(_) && i(s.name)), y.children) {
        const W = y.children;
        for (let L = 0; L < W.length; L++)
          f(W[L], _, a && a.children[L]);
      }
      a = a || _, (_.record.components && Object.keys(_.record.components).length || _.record.name || _.record.redirect) && c(_);
    }
    return b ? () => {
      i(b);
    } : ae;
  }
  function i(s) {
    if (bt(s)) {
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
    for (; u < n.length && In(s, n[u]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[u].record.path || !wt(s, n[u])); )
      u++;
    n.splice(u, 0, s), s.record.name && !tt(s) && o.set(s.record.name, s);
  }
  function h(s, u) {
    let a, p = {}, y, E;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw ee(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const b = Object.keys(s.params || {}).filter((O) => !a.keys.find((D) => D.name === O));
        b.length && R(`Discarded invalid param(s) "${b.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      E = a.record.name, p = N(
        // paramsFromLocation is a new object
        et(
          u.params,
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
      if (a = u.name ? o.get(u.name) : n.find((b) => b.re.test(u.path)), !a)
        throw ee(1, {
          location: s,
          currentLocation: u
        });
      E = a.record.name, p = N({}, u.params, s.params), y = a.stringify(p);
    }
    const S = [];
    let _ = a;
    for (; _; )
      S.unshift(_.record), _ = _.parent;
    return {
      name: E,
      path: y,
      params: p,
      matched: S,
      meta: Gn(S)
    };
  }
  return e.forEach((s) => f(s)), { addRoute: f, resolve: h, removeRoute: i, getRoutes: d, getRecordMatcher: r };
}
function et(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function qn(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Hn(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Hn(e) {
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
function Gn(e) {
  return e.reduce((t, n) => N(t, n.meta), {});
}
function nt(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function $e(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function Kn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find($e.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find($e.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Wn(e, t) {
  t && t.record.name && !e.name && !e.path && R(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function zn(e, t) {
  for (const n of t.keys)
    if (!e.keys.find($e.bind(null, n)))
      return R(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function wt(e, t) {
  return t.children.some((n) => n === e || wt(e, n));
}
function Qn(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const f = o[r].replace(mt, " "), i = f.indexOf("="), d = Z(i < 0 ? f : f.slice(0, i)), c = i < 0 ? null : Z(f.slice(i + 1));
    if (d in t) {
      let h = t[d];
      V(h) || (h = t[d] = [h]), h.push(c);
    } else
      t[d] = c;
  }
  return t;
}
function ot(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = un(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (V(o) ? o.map((f) => f && Ne(f)) : [o && Ne(o)]).forEach((f) => {
      f !== void 0 && (t += (t.length ? "&" : "") + n, f != null && (t += "=" + f));
    });
  }
  return t;
}
function Fn(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = V(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const Yn = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), rt = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), je = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Rt = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), Ae = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function re() {
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
      })) : a instanceof Error ? c(a) : pe(a) ? c(ee(2, {
        from: t,
        to: a
      })) : (i && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === i && typeof a == "function" && i.push(a), d());
    }, s = f(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? Jn(h, t, n) : h));
    let u = Promise.resolve(s);
    if (e.length < 3 && (u = u.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        u = u.then((p) => h._called ? p : (R(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        R(a), c(new Error("Invalid navigation guard"));
        return;
      }
    }
    u.catch((a) => c(a));
  });
}
function Jn(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && R(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Se(e, t, n, o, r = (f) => f()) {
  const f = [];
  for (const i of e) {
    process.env.NODE_ENV !== "production" && !i.components && !i.children.length && R(`Record with path "${i.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in i.components) {
      let c = i.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!c || typeof c != "object" && typeof c != "function")
          throw R(`Component "${d}" in record with path "${i.path}" is not a valid component. Received "${String(c)}".`), new Error("Invalid route component");
        if ("then" in c) {
          R(`Component "${d}" in record with path "${i.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = c;
          c = () => h;
        } else
          c.__asyncLoader && // warn only once per component
          !c.__warnedDefineAsync && (c.__warnedDefineAsync = !0, R(`Component "${d}" in record with path "${i.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !i.instances[d]))
        if (Xn(c)) {
          const s = (c.__vccOpts || c)[t];
          s && f.push(q(s, n, o, i, d, r));
        } else {
          let h = c();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (R(`Component "${d}" in record with path "${i.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), f.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${i.path}"`));
            const u = Xt(s) ? s.default : s;
            i.components[d] = u;
            const p = (u.__vccOpts || u)[t];
            return p && q(p, n, o, i, d, r)();
          }));
        }
    }
  }
  return f;
}
function Xn(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function st(e) {
  const t = G(je), n = G(Rt);
  let o = !1, r = null;
  const f = j(() => {
    const s = Q(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (pe(s) || (o ? R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), i = j(() => {
    const { matched: s } = f.value, { length: u } = s, a = s[u - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const y = p.findIndex(K.bind(null, a));
    if (y > -1)
      return y;
    const E = at(s[u - 2]);
    return (
      // we are dealing with nested routes
      u > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      at(a) === E && // avoid comparing the child with its parent
      p[p.length - 1].path !== E ? p.findIndex(K.bind(null, s[u - 2])) : y
    );
  }), d = j(() => i.value > -1 && no(n.params, f.value.params)), c = j(() => i.value > -1 && i.value === n.matched.length - 1 && _t(n.params, f.value.params));
  function h(s = {}) {
    return to(s) ? t[Q(e.replace) ? "replace" : "push"](
      Q(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ae) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && U) {
    const s = ut();
    if (s) {
      const u = {
        route: f.value,
        isActive: d.value,
        isExactActive: c.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(u), Mt(() => {
        u.route = f.value, u.isActive = d.value, u.isExactActive = c.value, u.error = pe(Q(e.to)) ? null : 'Invalid "to" value';
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
const Zn = /* @__PURE__ */ te({
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
    const n = Lt(st(e)), { options: o } = G(je), r = j(() => ({
      [it(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [it(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const f = t.default && t.default(n);
      return e.custom ? f : lt("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, f);
    };
  }
}), eo = Zn;
function to(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function no(e, t) {
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
function at(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const it = (e, t, n) => e ?? t ?? n, oo = /* @__PURE__ */ te({
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
    process.env.NODE_ENV !== "production" && so();
    const o = G(Ae), r = j(() => e.route || o.value), f = G(rt, 0), i = j(() => {
      let h = Q(f);
      const { matched: s } = r.value;
      let u;
      for (; (u = s[h]) && !u.components; )
        h++;
      return h;
    }), d = j(() => r.value.matched[i.value]);
    we(rt, j(() => i.value + 1)), we(Yn, d), we(Ae, r);
    const c = H();
    return Ve(() => [c.value, d.value, e.name], ([h, s, u], [a, p, y]) => {
      s && (s.instances[u] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !K(s, p) || !a) && (s.enterCallbacks[u] || []).forEach((E) => E(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, u = d.value, a = u && u.components[s];
      if (!a)
        return ct(n.default, { Component: a, route: h });
      const p = u.props[s], y = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, S = lt(a, N({}, y, t, {
        onVnodeUnmounted: (_) => {
          _.component.isUnmounted && (u.instances[s] = null);
        },
        ref: c
      }));
      if (process.env.NODE_ENV !== "production" && U && S.ref) {
        const _ = {
          depth: i.value,
          name: u.name,
          path: u.path,
          meta: u.meta
        };
        (V(S.ref) ? S.ref.map((O) => O.i) : [S.ref.i]).forEach((O) => {
          O.__vrv_devtools = _;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        ct(n.default, { Component: S, route: h }) || S
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
const ro = oo;
function so() {
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
function se(e, t) {
  const n = N({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => vo(o, ["instances", "children", "aliasOf"]))
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
let ao = 0;
function io(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = ao++;
  Jt({
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
        value: se(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: u }) => {
      if (u.__vrv_devtools) {
        const a = u.__vrv_devtools;
        s.tags.push({
          label: (a.name ? `${a.name.toString()}: ` : "") + a.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: kt
        });
      }
      V(u.__vrl_devtools) && (u.__devtoolsApi = r, u.__vrl_devtools.forEach((a) => {
        let p = a.route.path, y = Nt, E = "", S = 0;
        a.error ? (p = a.error, y = ho, S = po) : a.isExactActive ? (y = Pt, E = "This is exactly active") : a.isActive && (y = St, E = "This link is active"), s.tags.push({
          label: p,
          textColor: S,
          tooltip: E,
          backgroundColor: y
        });
      }));
    }), Ve(t.currentRoute, () => {
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
        guard: he("beforeEach"),
        from: se(u, "Current Location during this navigation"),
        to: se(s, "Target location")
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
      }, p.status = he("❌")) : p.status = he("✅"), p.from = se(u, "Current Location during this navigation"), p.to = se(s, "Target location"), r.addTimelineEvent({
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
      u.forEach($t), s.filter && (u = u.filter((a) => (
        // save matches state based on the payload
        Te(a, s.filter.toLowerCase())
      ))), u.forEach((a) => Ct(a, t.currentRoute.value)), s.rootNodes = u.map(Ot);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && c();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === d) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        a && (s.state = {
          options: lo(a)
        });
      }
    }), r.sendInspectorTree(d), r.sendInspectorState(d);
  });
}
function co(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function lo(e) {
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
        display: e.keys.map((o) => `${o.name}${co(o)}`).join(" "),
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
const kt = 15485081, St = 2450411, Pt = 8702998, uo = 2282478, Nt = 16486972, fo = 6710886, ho = 16704226, po = 12131356;
function Ot(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: uo
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Nt
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: kt
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: Pt
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: St
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: fo
  });
  let o = n.__vd_id;
  return o == null && (o = String(mo++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Ot)
  };
}
let mo = 0;
const go = /^\/(.*)\/([a-z]*)$/;
function Ct(e, t) {
  const n = t.matched.length && K(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => K(o, e.record))), e.children.forEach((o) => Ct(o, t));
}
function $t(e) {
  e.__vd_match = !1, e.children.forEach($t);
}
function Te(e, t) {
  const n = String(e.re).match(go);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((i) => Te(i, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), f = Z(r);
  return !t.startsWith("/") && (f.includes(t) || r.includes(t)) || f.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((i) => Te(i, t));
}
function vo(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function yo(e) {
  const t = Bn(e.routes, e), n = e.parseQuery || Qn, o = e.stringifyQuery || ot, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const f = re(), i = re(), d = re(), c = Vt(B);
  let h = B;
  U && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = Re.bind(null, (l) => "" + l), u = Re.bind(null, dn), a = (
    // @ts-expect-error: intentionally avoid the type check
    Re.bind(null, Z)
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
  function S(l) {
    return !!t.getRecordMatcher(l);
  }
  function _(l, g) {
    if (g = N({}, g || c.value), typeof l == "string") {
      const w = ke(n, l, g.path), C = t.resolve({ path: w.path }, g), z = r.createHref(w.fullPath);
      return process.env.NODE_ENV !== "production" && (z.startsWith("//") ? R(`Location "${l}" resolved to "${z}". A resolved location cannot start with multiple slashes.`) : C.matched.length || R(`No match found for location with path "${l}"`)), N(w, C, {
        params: a(C.params),
        hash: Z(w.hash),
        redirectedFrom: void 0,
        href: z
      });
    }
    process.env.NODE_ENV !== "production" && !pe(l) && (R(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, l), l = {});
    let m;
    if (l.path != null)
      process.env.NODE_ENV !== "production" && "params" in l && !("name" in l) && // @ts-expect-error: the type is never
      Object.keys(l.params).length && R(`Path "${l.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), m = N({}, l, {
        path: ke(n, l.path, g.path).path
      });
    else {
      const w = N({}, l.params);
      for (const C in w)
        w[C] == null && delete w[C];
      m = N({}, l, {
        params: u(w)
      }), g.params = u(g.params);
    }
    const v = t.resolve(m, g), P = l.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && R(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), v.params = s(a(v.params));
    const $ = mn(o, N({}, l, {
      hash: ln(P),
      path: v.path
    })), k = r.createHref($);
    return process.env.NODE_ENV !== "production" && (k.startsWith("//") ? R(`Location "${l}" resolved to "${k}". A resolved location cannot start with multiple slashes.`) : v.matched.length || R(`No match found for location with path "${l.path != null ? l.path : l}"`)), N({
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
        o === ot ? Fn(l.query) : l.query || {}
      )
    }, v, {
      redirectedFrom: void 0,
      href: k
    });
  }
  function b(l) {
    return typeof l == "string" ? ke(n, l, c.value.path) : N({}, l);
  }
  function O(l, g) {
    if (h !== l)
      return ee(8, {
        from: g,
        to: l
      });
  }
  function D(l) {
    return ne(l);
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
  function ne(l, g) {
    const m = h = _(l), v = c.value, P = l.state, $ = l.force, k = l.replace === !0, w = L(m);
    if (w)
      return ne(
        N(b(w), {
          state: typeof w == "object" ? N({}, P, w.state) : P,
          force: $,
          replace: k
        }),
        // keep original redirectedFrom if it exists
        g || m
      );
    const C = m;
    C.redirectedFrom = g;
    let z;
    return !$ && ze(o, v, m) && (z = ee(16, { to: C, from: v }), He(
      v,
      v,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (z ? Promise.resolve(z) : Me(C, v)).catch((x) => M(x) ? (
      // navigation redirects still mark the router as ready
      M(
        x,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? x : _e(x)
    ) : (
      // reject any unknown error
      ye(x, C, v)
    )).then((x) => {
      if (x) {
        if (M(
          x,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          ze(o, _(x.to), C) && // and we have done it a couple of times
          g && // @ts-expect-error: added only in dev
          (g._count = g._count ? (
            // @ts-expect-error
            g._count + 1
          ) : 1) > 30 ? (R(`Detected a possibly infinite redirection in a navigation guard when going from "${v.fullPath}" to "${C.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : ne(
            // keep options
            N({
              // preserve an existing replacement but allow the redirect to override it
              replace: k
            }, b(x.to), {
              state: typeof x.to == "object" ? N({}, P, x.to.state) : P,
              force: $
            }),
            // preserve the original redirectedFrom if any
            g || C
          );
      } else
        x = Be(C, v, !0, k, P);
      return Ue(C, v, x), x;
    });
  }
  function Tt(l, g) {
    const m = O(l, g);
    return m ? Promise.reject(m) : Promise.resolve();
  }
  function ge(l) {
    const g = fe.values().next().value;
    return g && typeof g.runWithContext == "function" ? g.runWithContext(l) : l();
  }
  function Me(l, g) {
    let m;
    const [v, P, $] = _o(l, g);
    m = Se(v.reverse(), "beforeRouteLeave", l, g);
    for (const w of v)
      w.leaveGuards.forEach((C) => {
        m.push(q(C, l, g));
      });
    const k = Tt.bind(null, l, g);
    return m.push(k), F(m).then(() => {
      m = [];
      for (const w of f.list())
        m.push(q(w, l, g));
      return m.push(k), F(m);
    }).then(() => {
      m = Se(P, "beforeRouteUpdate", l, g);
      for (const w of P)
        w.updateGuards.forEach((C) => {
          m.push(q(C, l, g));
        });
      return m.push(k), F(m);
    }).then(() => {
      m = [];
      for (const w of $)
        if (w.beforeEnter)
          if (V(w.beforeEnter))
            for (const C of w.beforeEnter)
              m.push(q(C, l, g));
          else
            m.push(q(w.beforeEnter, l, g));
      return m.push(k), F(m);
    }).then(() => (l.matched.forEach((w) => w.enterCallbacks = {}), m = Se($, "beforeRouteEnter", l, g, ge), m.push(k), F(m))).then(() => {
      m = [];
      for (const w of i.list())
        m.push(q(w, l, g));
      return m.push(k), F(m);
    }).catch((w) => M(
      w,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? w : Promise.reject(w));
  }
  function Ue(l, g, m) {
    d.list().forEach((v) => ge(() => v(l, g, m)));
  }
  function Be(l, g, m, v, P) {
    const $ = O(l, g);
    if ($)
      return $;
    const k = g === B, w = U ? history.state : {};
    m && (v || k ? r.replace(l.fullPath, N({
      scroll: k && w && w.scroll
    }, P)) : r.push(l.fullPath, P)), c.value = l, He(l, g, m, k), _e();
  }
  let oe;
  function xt() {
    oe || (oe = r.listen((l, g, m) => {
      if (!Ge.listening)
        return;
      const v = _(l), P = L(v);
      if (P) {
        ne(N(P, { replace: !0 }), v).catch(ae);
        return;
      }
      h = v;
      const $ = c.value;
      U && Rn(Fe($.fullPath, m.delta), me()), Me(v, $).catch((k) => M(
        k,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? k : M(
        k,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (ne(
        k.to,
        v
        // avoid an uncaught rejection, let push call triggerError
      ).then((w) => {
        M(
          w,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !m.delta && m.type === le.pop && r.go(-1, !1);
      }).catch(ae), Promise.reject()) : (m.delta && r.go(-m.delta, !1), ye(k, v, $))).then((k) => {
        k = k || Be(
          // after navigation, all matched components are resolved
          v,
          $,
          !1
        ), k && (m.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !M(
          k,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-m.delta, !1) : m.type === le.pop && M(
          k,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Ue(v, $, k);
      }).catch(ae);
    }));
  }
  let ve = re(), qe = re(), ue;
  function ye(l, g, m) {
    _e(l);
    const v = qe.list();
    return v.length ? v.forEach((P) => P(l, g, m)) : (process.env.NODE_ENV !== "production" && R("uncaught error during route navigation:"), console.error(l)), Promise.reject(l);
  }
  function Dt() {
    return ue && c.value !== B ? Promise.resolve() : new Promise((l, g) => {
      ve.add([l, g]);
    });
  }
  function _e(l) {
    return ue || (ue = !l, xt(), ve.list().forEach(([g, m]) => l ? m(l) : g()), ve.reset()), l;
  }
  function He(l, g, m, v) {
    const { scrollBehavior: P } = e;
    if (!U || !P)
      return Promise.resolve();
    const $ = !m && kn(Fe(l.fullPath, 0)) || (v || !m) && history.state && history.state.scroll || null;
    return jt().then(() => P(l, g, $)).then((k) => k && wn(k)).catch((k) => ye(k, l, g));
  }
  const Ee = (l) => r.go(l);
  let be;
  const fe = /* @__PURE__ */ new Set(), Ge = {
    currentRoute: c,
    listening: !0,
    addRoute: p,
    removeRoute: y,
    hasRoute: S,
    getRoutes: E,
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
    isReady: Dt,
    install(l) {
      const g = this;
      l.component("RouterLink", eo), l.component("RouterView", ro), l.config.globalProperties.$router = g, Object.defineProperty(l.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Q(c)
      }), U && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !be && c.value === B && (be = !0, D(r.location).catch((P) => {
        process.env.NODE_ENV !== "production" && R("Unexpected error when starting the router:", P);
      }));
      const m = {};
      for (const P in B)
        Object.defineProperty(m, P, {
          get: () => c.value[P],
          enumerable: !0
        });
      l.provide(je, g), l.provide(Rt, It(m)), l.provide(Ae, c);
      const v = l.unmount;
      fe.add(l), l.unmount = function() {
        fe.delete(l), fe.size < 1 && (h = B, oe && oe(), oe = null, c.value = B, be = !1, ue = !1), v();
      }, process.env.NODE_ENV !== "production" && U && io(l, g, t);
    }
  };
  function F(l) {
    return l.reduce((g, m) => g.then(() => ge(m)), Promise.resolve());
  }
  return Ge;
}
function _o(e, t) {
  const n = [], o = [], r = [], f = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < f; i++) {
    const d = t.matched[i];
    d && (e.matched.find((h) => K(h, d)) ? o.push(d) : n.push(d));
    const c = e.matched[i];
    c && (t.matched.find((h) => K(h, c)) || r.push(c));
  }
  return [n, o, r];
}
const Eo = [
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
], bo = ["VET2011"], wo = [
  "course:VETS2011",
  "course:VETS2012",
  "subject:Physiology",
  "system:Respiratory_System",
  "system:Exercise",
  "animal:Horse"
], Ro = async (e, t) => {
  try {
    return await (await fetch(
      t + "?" + new URLSearchParams({ tag: e })
    )).json();
  } catch (n) {
    console.error("Error fetching data from the server", n), alert("Error fetching data from the server, only display test data.");
  }
}, ko = async (e, t) => {
  try {
    return await Ro(e, t) || Eo.filter(
      (o) => o.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, So = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), r = await (await fetch(`${t}?${n}`)).json() ?? bo, f = new Set(r);
    return Array.from(f);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, Po = { class: "search-results-container" }, No = { class: "container-description" }, Oo = { class: "label-badges" }, Co = {
  key: 0,
  class: "results"
}, $o = ["href"], Ao = {
  key: 1,
  class: "no-results"
}, To = /* @__PURE__ */ te({
  __name: "DisplayResult",
  setup(e) {
    const t = G("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("%cRetrieving data from:", "color: skyblue;", t);
    const n = H([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = At(), r = H("");
    ft(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, await f(r.value)) : r.value = "undefined";
    });
    const f = async (i) => {
      const d = await ko(i, t);
      d && (n.value = d);
    };
    return Ve(o.currentRoute, async (i, d) => {
      const c = i.query.tag || "", h = d.query.tag || "";
      c !== h && await f(c);
    }), (i, d) => (A(), T("div", Po, [
      I("div", No, [
        I("button", {
          onClick: d[0] || (d[0] = () => i.$router.back())
        }, "↵"),
        I("div", Oo, " (" + X(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? (A(), T("div", Co, [
        I("ul", null, [
          (A(!0), T(J, null, ce(n.value, (c, h) => (A(), T("li", { key: h }, [
            I("a", {
              href: c.url,
              target: "_blank",
              class: "linkToResource"
            }, X(c.label), 9, $o)
          ]))), 128))
        ])
      ])) : (A(), T("p", Ao, "No results found"))
    ]));
  }
}), Le = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, xe = /* @__PURE__ */ Le(To, [["__scopeId", "data-v-8413d12c"]]), xo = { class: "crucible-filters" }, Do = ["onClick"], Vo = { class: "crucible-filter-dropdown-menu" }, Io = ["onClick"], jo = /* @__PURE__ */ te({
  __name: "CrucibleFilter",
  setup(e) {
    const t = H({}), n = wo.reduce(
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
    return (i, d) => (A(), T("div", xo, [
      I("div", { class: "crucible-filter-dropdown" }, [
        I("label", {
          for: "All",
          onClick: f
        }, "All")
      ]),
      (A(!0), T(J, null, ce(Q(n), (c, h) => (A(), T("div", {
        key: h,
        class: "crucible-filter-dropdown"
      }, [
        I("label", {
          onClick: (s) => o(h)
        }, X(h), 9, Do),
        dt(I("ol", Vo, [
          (A(!0), T(J, null, ce(c, (s, u) => (A(), T("li", {
            key: u,
            onClick: (a) => r(s)
          }, X(s), 9, Io))), 128))
        ], 512), [
          [Ut, t.value[h]]
        ])
      ]))), 128))
    ]));
  }
}), De = /* @__PURE__ */ Le(jo, [["__scopeId", "data-v-faf4f1c7"]]), Lo = { id: "app" }, Mo = /* @__PURE__ */ te({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = Ke("CrucibleSearch"), r = Ke("RouterView");
      return A(), T("div", Lo, [
        de(De),
        de(o),
        de(De),
        de(r)
      ]);
    };
  }
}), Uo = [
  { path: "/", component: Mo },
  { path: "/search", component: xe }
], Bo = yo({
  history: On("/"),
  routes: Uo
});
function At() {
  const e = G("$router");
  return e || Bo;
}
const qo = { class: "search-container" }, Ho = { key: 0 }, Go = ["onClick"], Ko = 10, Wo = /* @__PURE__ */ te({
  __name: "CrucibleSearch",
  setup(e) {
    const t = At(), n = H(""), o = H([]), r = H(!1), f = H(null), i = G("$tagsApi") || "http://localhost:8080/api/resource/alltags", d = (E) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(E.toLowerCase())
    ), c = (E) => E.replace(/_/g, " "), h = (E) => E.replace(/ /g, "_"), s = async () => {
      n.value ? (o.value = (await So(n.value, i)).slice(0, Ko), o.value = o.value.map(c), r.value = !0) : (o.value = [], r.value = !1);
    }, u = (E) => {
      n.value = o.value.includes(E) ? E : o.value[0], r.value = !1, t.push({
        path: "/search",
        query: { tag: h(n.value) }
      });
    }, a = () => {
      o.value.length && n.value && (r.value = !0);
    }, p = (E) => {
      E.key === "Enter" ? (u(n.value), n.value = "") : E.key === "Tab" && (E.preventDefault(), n.value = o.value[0] ?? n.value);
    }, y = (E) => {
      f.value && !f.value.contains(E.target) && (r.value = !1);
    };
    return ft(() => {
      document.addEventListener("click", y);
    }), Bt(() => {
      document.removeEventListener("click", y);
    }), (E, S) => (A(), T("div", qo, [
      I("div", {
        ref_key: "searchBoxRef",
        ref: f,
        class: "search-container"
      }, [
        dt(I("input", {
          "onUpdate:modelValue": S[0] || (S[0] = (_) => n.value = _),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: s,
          onFocus: a,
          onKeydown: p
        }, null, 544), [
          [qt, n.value]
        ]),
        o.value.length && n.value && r.value ? (A(), T("ul", Ho, [
          (A(!0), T(J, null, ce(o.value, (_) => (A(), T("li", {
            key: _,
            onClick: (b) => u(_)
          }, [
            (A(!0), T(J, null, ce(_.split(""), (b, O) => (A(), T(J, null, [
              d(b) ? (A(), T("strong", {
                key: `strong-${O}`
              }, X(b), 1)) : (A(), T("span", { key: O }, X(b), 1))
            ], 64))), 256))
          ], 8, Go))), 128))
        ])) : Ht("", !0)
      ], 512)
    ]));
  }
}), zo = /* @__PURE__ */ Le(Wo, [["__scopeId", "data-v-5cb7fe60"]]);
function Fo(e, t) {
  const { router: n, getApi: o, tagsApi: r } = t;
  e.component("CrucibleSearch", zo), e.component("DisplayResult", xe), e.component("CrucibleFilter", De), e.provide("$router", n), e.provide("$getApi", o), e.provide("$tagsApi", r), n.addRoute({ path: "/search", component: xe });
}
export {
  De as CrucibleFilter,
  zo as CrucibleSearch,
  xe as DisplayResult,
  Fo as createSearchPlugin
};
