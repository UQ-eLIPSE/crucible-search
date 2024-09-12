import { shallowRef as Gt, unref as ne, shallowReactive as Kt, nextTick as zt, defineComponent as W, reactive as Wt, inject as B, computed as U, h as dt, provide as Se, ref as L, watch as je, getCurrentInstance as ht, watchEffect as Qt, onMounted as Le, openBlock as A, createElementBlock as T, createElementVNode as O, toDisplayString as F, Fragment as J, renderList as oe, normalizeClass as me, pushScopeId as pt, popScopeId as vt, createVNode as re, createTextVNode as Yt, withDirectives as gt, vShow as Jt, createCommentVNode as mt, resolveComponent as ze, toRefs as Xt, onUnmounted as Zt, vModelText as en } from "vue";
function tn() {
  return yt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function yt() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const nn = typeof Proxy == "function", on = "devtools-plugin:setup", rn = "plugin:settings:set";
let te, Ne;
function sn() {
  var e;
  return te !== void 0 || (typeof window < "u" && window.performance ? (te = !0, Ne = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (te = !0, Ne = globalThis.perf_hooks.performance) : te = !1), te;
}
function an() {
  return sn() ? Ne.now() : Date.now();
}
class cn {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const i in t.settings) {
        const d = t.settings[i];
        o[i] = d.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let a = Object.assign({}, o);
    try {
      const i = localStorage.getItem(r), d = JSON.parse(i);
      Object.assign(a, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(i) {
        try {
          localStorage.setItem(r, JSON.stringify(i));
        } catch {
        }
        a = i;
      },
      now() {
        return an();
      }
    }, n && n.on(rn, (i, d) => {
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
function ln(e, t) {
  const n = e, o = yt(), r = tn(), a = nn && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    r.emit(on, e, t);
  else {
    const i = a ? new cn(n, r) : null;
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
const H = typeof document < "u";
function un(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const P = Object.assign;
function $e(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = M(r) ? r.map(e) : e(r);
  }
  return n;
}
const ue = () => {
}, M = Array.isArray;
function R(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const _t = /#/g, fn = /&/g, dn = /\//g, hn = /=/g, pn = /\?/g, Et = /\+/g, vn = /%5B/g, gn = /%5D/g, bt = /%5E/g, mn = /%60/g, wt = /%7B/g, yn = /%7C/g, Rt = /%7D/g, _n = /%20/g;
function Me(e) {
  return encodeURI("" + e).replace(yn, "|").replace(vn, "[").replace(gn, "]");
}
function En(e) {
  return Me(e).replace(wt, "{").replace(Rt, "}").replace(bt, "^");
}
function Oe(e) {
  return Me(e).replace(Et, "%2B").replace(_n, "+").replace(_t, "%23").replace(fn, "%26").replace(mn, "`").replace(wt, "{").replace(Rt, "}").replace(bt, "^");
}
function bn(e) {
  return Oe(e).replace(hn, "%3D");
}
function wn(e) {
  return Me(e).replace(_t, "%23").replace(pn, "%3F");
}
function Rn(e) {
  return e == null ? "" : wn(e).replace(dn, "%2F");
}
function se(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && R(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const kn = /\/$/, Sn = (e) => e.replace(kn, "");
function Ce(e, t, n = "/") {
  let o, r = {}, a = "", i = "";
  const d = t.indexOf("#");
  let c = t.indexOf("?");
  return d < c && d >= 0 && (c = -1), c > -1 && (o = t.slice(0, c), a = t.slice(c + 1, d > -1 ? d : t.length), r = e(a)), d > -1 && (o = o || t.slice(0, d), i = t.slice(d, t.length)), o = Pn(o ?? t, n), {
    fullPath: o + (a && "?") + a + i,
    path: o,
    query: r,
    hash: se(i)
  };
}
function $n(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function We(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Qe(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && z(t.matched[o], n.matched[r]) && kt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function z(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function kt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Cn(e[n], t[n]))
      return !1;
  return !0;
}
function Cn(e, t) {
  return M(e) ? Ye(e, t) : M(t) ? Ye(t, e) : e === t;
}
function Ye(e, t) {
  return M(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Pn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return R(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let a = n.length - 1, i, d;
  for (i = 0; i < o.length; i++)
    if (d = o[i], d !== ".")
      if (d === "..")
        a > 1 && a--;
      else
        break;
  return n.slice(0, a).join("/") + "/" + o.slice(i).join("/");
}
var de;
(function(e) {
  e.pop = "pop", e.push = "push";
})(de || (de = {}));
var fe;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(fe || (fe = {}));
function Nn(e) {
  if (!e)
    if (H) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Sn(e);
}
const On = /^[^#]+#/;
function An(e, t) {
  return e.replace(On, "#") + t;
}
function Tn(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const _e = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function xn(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const a = document.querySelector(e.el);
        if (o && a) {
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
    t = Tn(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Je(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ae = /* @__PURE__ */ new Map();
function Dn(e, t) {
  Ae.set(e, t);
}
function In(e) {
  const t = Ae.get(e);
  return Ae.delete(e), t;
}
let Vn = () => location.protocol + "//" + location.host;
function St(e, t) {
  const { pathname: n, search: o, hash: r } = t, a = e.indexOf("#");
  if (a > -1) {
    let d = r.includes(e.slice(a)) ? e.slice(a).length : 1, c = r.slice(d);
    return c[0] !== "/" && (c = "/" + c), We(c, "");
  }
  return We(n, e) + o + r;
}
function jn(e, t, n, o) {
  let r = [], a = [], i = null;
  const d = ({ state: l }) => {
    const p = St(e, location), m = n.value, k = t.value;
    let b = 0;
    if (l) {
      if (n.value = p, t.value = l, i && i === m) {
        i = null;
        return;
      }
      b = k ? l.position - k.position : 0;
    } else
      o(p);
    r.forEach((y) => {
      y(n.value, m, {
        delta: b,
        type: de.pop,
        direction: b ? b > 0 ? fe.forward : fe.back : fe.unknown
      });
    });
  };
  function c() {
    i = n.value;
  }
  function h(l) {
    r.push(l);
    const p = () => {
      const m = r.indexOf(l);
      m > -1 && r.splice(m, 1);
    };
    return a.push(p), p;
  }
  function s() {
    const { history: l } = window;
    l.state && l.replaceState(P({}, l.state, { scroll: _e() }), "");
  }
  function u() {
    for (const l of a)
      l();
    a = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: c,
    listen: h,
    destroy: u
  };
}
function Xe(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? _e() : null
  };
}
function Ln(e) {
  const { history: t, location: n } = window, o = {
    value: St(e, n)
  }, r = { value: t.state };
  r.value || a(o.value, {
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
  function a(c, h, s) {
    const u = e.indexOf("#"), l = u > -1 ? (n.host && document.querySelector("base") ? e : e.slice(u)) + c : Vn() + e + c;
    try {
      t[s ? "replaceState" : "pushState"](h, "", l), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? R("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](l);
    }
  }
  function i(c, h) {
    const s = P({}, t.state, Xe(
      r.value.back,
      // keep back and forward entries but override current position
      c,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    a(c, s, !0), o.value = c;
  }
  function d(c, h) {
    const s = P(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: c,
        scroll: _e()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && R(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), a(s.current, s, !0);
    const u = P({}, Xe(o.value, c, null), { position: s.position + 1 }, h);
    a(c, u, !1), o.value = c;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: i
  };
}
function Mn(e) {
  e = Nn(e);
  const t = Ln(e), n = jn(e, t.state, t.location, t.replace);
  function o(a, i = !0) {
    i || n.pauseListeners(), history.go(a);
  }
  const r = P({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: An.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function ye(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function $t(e) {
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
}, Te = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var Ze;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Ze || (Ze = {}));
const Un = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Fn(t)}" via a navigation guard.`;
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
function ae(e, t) {
  return process.env.NODE_ENV !== "production" ? P(new Error(Un[e](t)), {
    type: e,
    [Te]: !0
  }, t) : P(new Error(), {
    type: e,
    [Te]: !0
  }, t);
}
function q(e, t) {
  return e instanceof Error && Te in e && (t == null || !!(e.type & t));
}
const Bn = ["params", "query", "hash"];
function Fn(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of Bn)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const et = "[^/]+?", qn = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Hn = /[.+*?^${}()[\]/\\]/g;
function Gn(e, t) {
  const n = P({}, qn, t), o = [];
  let r = n.start ? "^" : "";
  const a = [];
  for (const h of e) {
    const s = h.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !h.length && (r += "/");
    for (let u = 0; u < h.length; u++) {
      const l = h[u];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (l.type === 0)
        u || (r += "/"), r += l.value.replace(Hn, "\\$&"), p += 40;
      else if (l.type === 1) {
        const { value: m, repeatable: k, optional: b, regexp: y } = l;
        a.push({
          name: m,
          repeatable: k,
          optional: b
        });
        const E = y || et;
        if (E !== et) {
          p += 10;
          try {
            new RegExp(`(${E})`);
          } catch ($) {
            throw new Error(`Invalid custom RegExp for param "${m}" (${E}): ` + $.message);
          }
        }
        let N = k ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        u || (N = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        b && h.length < 2 ? `(?:/${N})` : "/" + N), b && (N += "?"), r += N, p += 20, b && (p += -8), k && (p += -20), E === ".*" && (p += -50);
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
    for (let l = 1; l < s.length; l++) {
      const p = s[l] || "", m = a[l - 1];
      u[m.name] = p && m.repeatable ? p.split("/") : p;
    }
    return u;
  }
  function c(h) {
    let s = "", u = !1;
    for (const l of e) {
      (!u || !s.endsWith("/")) && (s += "/"), u = !1;
      for (const p of l)
        if (p.type === 0)
          s += p.value;
        else if (p.type === 1) {
          const { value: m, repeatable: k, optional: b } = p, y = m in h ? h[m] : "";
          if (M(y) && !k)
            throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);
          const E = M(y) ? y.join("/") : y;
          if (!E)
            if (b)
              l.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : u = !0);
            else
              throw new Error(`Missing required param "${m}"`);
          s += E;
        }
    }
    return s || "/";
  }
  return {
    re: i,
    score: o,
    keys: a,
    parse: d,
    stringify: c
  };
}
function Kn(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function zn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const a = Kn(o[n], r[n]);
    if (a)
      return a;
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
const Wn = {
  type: 0,
  value: ""
}, Qn = /[a-zA-Z0-9_]/;
function Yn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Wn]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${h}": ${p}`);
  }
  let n = 0, o = n;
  const r = [];
  let a;
  function i() {
    a && r.push(a), a = [];
  }
  let d = 0, c, h = "", s = "";
  function u() {
    h && (n === 0 ? a.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (a.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), a.push({
      type: 1,
      value: h,
      regexp: s,
      repeatable: c === "*" || c === "+",
      optional: c === "*" || c === "?"
    })) : t("Invalid state to consume buffer"), h = "");
  }
  function l() {
    h += c;
  }
  for (; d < e.length; ) {
    if (c = e[d++], c === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (h && u(), i()) : c === ":" ? (u(), n = 1) : l();
        break;
      case 4:
        l(), n = o;
        break;
      case 1:
        c === "(" ? n = 2 : Qn.test(c) ? l() : (u(), n = 0, c !== "*" && c !== "?" && c !== "+" && d--);
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
function Jn(e, t, n) {
  const o = Gn(Yn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const a = /* @__PURE__ */ new Set();
    for (const i of o.keys)
      a.has(i.name) && R(`Found duplicated params with name "${i.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), a.add(i.name);
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
function Xn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = rt({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function a(s, u, l) {
    const p = !l, m = Zn(s);
    process.env.NODE_ENV !== "production" && oo(m, u), m.aliasOf = l && l.record;
    const k = rt(t, s), b = [
      m
    ];
    if ("alias" in s) {
      const N = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const $ of N)
        b.push(P({}, m, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: l ? l.record.components : m.components,
          path: $,
          // we might be the child of an alias
          aliasOf: l ? l.record : m
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let y, E;
    for (const N of b) {
      const { path: $ } = N;
      if (u && $[0] !== "/") {
        const I = u.record.path, V = I[I.length - 1] === "/" ? "" : "/";
        N.path = u.record.path + ($ && V + $);
      }
      if (process.env.NODE_ENV !== "production" && N.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (y = Jn(N, u, k), process.env.NODE_ENV !== "production" && u && $[0] === "/" && ro(y, u), l ? (l.alias.push(y), process.env.NODE_ENV !== "production" && no(l, y)) : (E = E || y, E !== y && E.alias.push(y), p && s.name && !ot(y) && i(s.name)), m.children) {
        const I = m.children;
        for (let V = 0; V < I.length; V++)
          a(I[V], y, l && l.children[V]);
      }
      l = l || y, (y.record.components && Object.keys(y.record.components).length || y.record.name || y.record.redirect) && c(y);
    }
    return E ? () => {
      i(E);
    } : ue;
  }
  function i(s) {
    if ($t(s)) {
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
    for (; u < n.length && zn(s, n[u]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[u].record.path || !Ct(s, n[u])); )
      u++;
    n.splice(u, 0, s), s.record.name && !ot(s) && o.set(s.record.name, s);
  }
  function h(s, u) {
    let l, p = {}, m, k;
    if ("name" in s && s.name) {
      if (l = o.get(s.name), !l)
        throw ae(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const E = Object.keys(s.params || {}).filter((N) => !l.keys.find(($) => $.name === N));
        E.length && R(`Discarded invalid param(s) "${E.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      k = l.record.name, p = P(
        // paramsFromLocation is a new object
        nt(
          u.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          l.keys.filter((E) => !E.optional).concat(l.parent ? l.parent.keys.filter((E) => E.optional) : []).map((E) => E.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && nt(s.params, l.keys.map((E) => E.name))
      ), m = l.stringify(p);
    } else if (s.path != null)
      m = s.path, process.env.NODE_ENV !== "production" && !m.startsWith("/") && R(`The Matcher cannot resolve relative paths but received "${m}". Unless you directly called \`matcher.resolve("${m}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), l = n.find((E) => E.re.test(m)), l && (p = l.parse(m), k = l.record.name);
    else {
      if (l = u.name ? o.get(u.name) : n.find((E) => E.re.test(u.path)), !l)
        throw ae(1, {
          location: s,
          currentLocation: u
        });
      k = l.record.name, p = P({}, u.params, s.params), m = l.stringify(p);
    }
    const b = [];
    let y = l;
    for (; y; )
      b.unshift(y.record), y = y.parent;
    return {
      name: k,
      path: m,
      params: p,
      matched: b,
      meta: to(b)
    };
  }
  return e.forEach((s) => a(s)), { addRoute: a, resolve: h, removeRoute: i, getRoutes: d, getRecordMatcher: r };
}
function nt(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Zn(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: eo(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function eo(e) {
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
function to(e) {
  return e.reduce((t, n) => P(t, n.meta), {});
}
function rt(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function xe(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function no(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(xe.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(xe.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function oo(e, t) {
  t && t.record.name && !e.name && !e.path && R(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function ro(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(xe.bind(null, n)))
      return R(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Ct(e, t) {
  return t.children.some((n) => n === e || Ct(e, n));
}
function so(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const a = o[r].replace(Et, " "), i = a.indexOf("="), d = se(i < 0 ? a : a.slice(0, i)), c = i < 0 ? null : se(a.slice(i + 1));
    if (d in t) {
      let h = t[d];
      M(h) || (h = t[d] = [h]), h.push(c);
    } else
      t[d] = c;
  }
  return t;
}
function st(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = bn(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (M(o) ? o.map((a) => a && Oe(a)) : [o && Oe(o)]).forEach((a) => {
      a !== void 0 && (t += (t.length ? "&" : "") + n, a != null && (t += "=" + a));
    });
  }
  return t;
}
function ao(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = M(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const io = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), at = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Ue = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Pt = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), De = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function ce() {
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
function K(e, t, n, o, r, a = (i) => i()) {
  const i = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((d, c) => {
    const h = (l) => {
      l === !1 ? c(ae(4, {
        from: n,
        to: t
      })) : l instanceof Error ? c(l) : ye(l) ? c(ae(2, {
        from: t,
        to: l
      })) : (i && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === i && typeof l == "function" && i.push(l), d());
    }, s = a(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? co(h, t, n) : h));
    let u = Promise.resolve(s);
    if (e.length < 3 && (u = u.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const l = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        u = u.then((p) => h._called ? p : (R(l), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        R(l), c(new Error("Invalid navigation guard"));
        return;
      }
    }
    u.catch((l) => c(l));
  });
}
function co(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && R(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Pe(e, t, n, o, r = (a) => a()) {
  const a = [];
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
        if (lo(c)) {
          const s = (c.__vccOpts || c)[t];
          s && a.push(K(s, n, o, i, d, r));
        } else {
          let h = c();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (R(`Component "${d}" in record with path "${i.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), a.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${i.path}"`));
            const u = un(s) ? s.default : s;
            i.components[d] = u;
            const p = (u.__vccOpts || u)[t];
            return p && K(p, n, o, i, d, r)();
          }));
        }
    }
  }
  return a;
}
function lo(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function it(e) {
  const t = B(Ue), n = B(Pt);
  let o = !1, r = null;
  const a = U(() => {
    const s = ne(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (ye(s) || (o ? R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), i = U(() => {
    const { matched: s } = a.value, { length: u } = s, l = s[u - 1], p = n.matched;
    if (!l || !p.length)
      return -1;
    const m = p.findIndex(z.bind(null, l));
    if (m > -1)
      return m;
    const k = ct(s[u - 2]);
    return (
      // we are dealing with nested routes
      u > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      ct(l) === k && // avoid comparing the child with its parent
      p[p.length - 1].path !== k ? p.findIndex(z.bind(null, s[u - 2])) : m
    );
  }), d = U(() => i.value > -1 && po(n.params, a.value.params)), c = U(() => i.value > -1 && i.value === n.matched.length - 1 && kt(n.params, a.value.params));
  function h(s = {}) {
    return ho(s) ? t[ne(e.replace) ? "replace" : "push"](
      ne(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ue) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && H) {
    const s = ht();
    if (s) {
      const u = {
        route: a.value,
        isActive: d.value,
        isExactActive: c.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(u), Qt(() => {
        u.route = a.value, u.isActive = d.value, u.isExactActive = c.value, u.error = ye(ne(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: a,
    href: U(() => a.value.href),
    isActive: d,
    isExactActive: c,
    navigate: h
  };
}
const uo = /* @__PURE__ */ W({
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
    const n = Wt(it(e)), { options: o } = B(Ue), r = U(() => ({
      [lt(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [lt(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const a = t.default && t.default(n);
      return e.custom ? a : dt("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, a);
    };
  }
}), fo = uo;
function ho(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function po(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!M(r) || r.length !== o.length || o.some((a, i) => a !== r[i]))
      return !1;
  }
  return !0;
}
function ct(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const lt = (e, t, n) => e ?? t ?? n, vo = /* @__PURE__ */ W({
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
    process.env.NODE_ENV !== "production" && mo();
    const o = B(De), r = U(() => e.route || o.value), a = B(at, 0), i = U(() => {
      let h = ne(a);
      const { matched: s } = r.value;
      let u;
      for (; (u = s[h]) && !u.components; )
        h++;
      return h;
    }), d = U(() => r.value.matched[i.value]);
    Se(at, U(() => i.value + 1)), Se(io, d), Se(De, r);
    const c = L();
    return je(() => [c.value, d.value, e.name], ([h, s, u], [l, p, m]) => {
      s && (s.instances[u] = h, p && p !== s && h && h === l && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !z(s, p) || !l) && (s.enterCallbacks[u] || []).forEach((k) => k(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, u = d.value, l = u && u.components[s];
      if (!l)
        return ut(n.default, { Component: l, route: h });
      const p = u.props[s], m = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, b = dt(l, P({}, m, t, {
        onVnodeUnmounted: (y) => {
          y.component.isUnmounted && (u.instances[s] = null);
        },
        ref: c
      }));
      if (process.env.NODE_ENV !== "production" && H && b.ref) {
        const y = {
          depth: i.value,
          name: u.name,
          path: u.path,
          meta: u.meta
        };
        (M(b.ref) ? b.ref.map((N) => N.i) : [b.ref.i]).forEach((N) => {
          N.__vrv_devtools = y;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        ut(n.default, { Component: b, route: h }) || b
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
const go = vo;
function mo() {
  const e = ht(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
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
function le(e, t) {
  const n = P({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => Po(o, ["instances", "children", "aliasOf"]))
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
function ge(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let yo = 0;
function _o(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = yo++;
  ln({
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
        value: le(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: u }) => {
      if (u.__vrv_devtools) {
        const l = u.__vrv_devtools;
        s.tags.push({
          label: (l.name ? `${l.name.toString()}: ` : "") + l.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: Nt
        });
      }
      M(u.__vrl_devtools) && (u.__devtoolsApi = r, u.__vrl_devtools.forEach((l) => {
        let p = l.route.path, m = Tt, k = "", b = 0;
        l.error ? (p = l.error, m = ko, b = So) : l.isExactActive ? (m = At, k = "This is exactly active") : l.isActive && (m = Ot, k = "This link is active"), s.tags.push({
          label: p,
          textColor: b,
          tooltip: k,
          backgroundColor: m
        });
      }));
    }), je(t.currentRoute, () => {
      c(), r.notifyComponentUpdate(), r.sendInspectorTree(d), r.sendInspectorState(d);
    });
    const a = "router:navigations:" + o;
    r.addTimelineLayer({
      id: a,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((s, u) => {
      r.addTimelineEvent({
        layerId: a,
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
      const l = {
        guard: ge("beforeEach"),
        from: le(u, "Current Location during this navigation"),
        to: le(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: i++
      }), r.addTimelineEvent({
        layerId: a,
        event: {
          time: r.now(),
          title: "Start of navigation",
          subtitle: s.fullPath,
          data: l,
          groupId: s.meta.__navigationId
        }
      });
    }), t.afterEach((s, u, l) => {
      const p = {
        guard: ge("afterEach")
      };
      l ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: l ? l.message : "",
          tooltip: "Navigation Failure",
          value: l
        }
      }, p.status = ge("❌")) : p.status = ge("✅"), p.from = le(u, "Current Location during this navigation"), p.to = le(s, "Target location"), r.addTimelineEvent({
        layerId: a,
        event: {
          title: "End of navigation",
          subtitle: s.fullPath,
          time: r.now(),
          data: p,
          logType: l ? "warning" : "default",
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
      let u = n.getRoutes().filter((l) => !l.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !l.parent.record.components);
      u.forEach(It), s.filter && (u = u.filter((l) => (
        // save matches state based on the payload
        Ie(l, s.filter.toLowerCase())
      ))), u.forEach((l) => Dt(l, t.currentRoute.value)), s.rootNodes = u.map(xt);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && c();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === d) {
        const l = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        l && (s.state = {
          options: bo(l)
        });
      }
    }), r.sendInspectorTree(d), r.sendInspectorState(d);
  });
}
function Eo(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function bo(e) {
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
        display: e.keys.map((o) => `${o.name}${Eo(o)}`).join(" "),
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
const Nt = 15485081, Ot = 2450411, At = 8702998, wo = 2282478, Tt = 16486972, Ro = 6710886, ko = 16704226, So = 12131356;
function xt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: wo
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Tt
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Nt
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: At
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: Ot
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: Ro
  });
  let o = n.__vd_id;
  return o == null && (o = String($o++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(xt)
  };
}
let $o = 0;
const Co = /^\/(.*)\/([a-z]*)$/;
function Dt(e, t) {
  const n = t.matched.length && z(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => z(o, e.record))), e.children.forEach((o) => Dt(o, t));
}
function It(e) {
  e.__vd_match = !1, e.children.forEach(It);
}
function Ie(e, t) {
  const n = String(e.re).match(Co);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((i) => Ie(i, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), a = se(r);
  return !t.startsWith("/") && (a.includes(t) || r.includes(t)) || a.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((i) => Ie(i, t));
}
function Po(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function No(e) {
  const t = Xn(e.routes, e), n = e.parseQuery || so, o = e.stringifyQuery || st, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const a = ce(), i = ce(), d = ce(), c = Gt(G);
  let h = G;
  H && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = $e.bind(null, (f) => "" + f), u = $e.bind(null, Rn), l = (
    // @ts-expect-error: intentionally avoid the type check
    $e.bind(null, se)
  );
  function p(f, g) {
    let v, _;
    return $t(f) ? (v = t.getRecordMatcher(f), process.env.NODE_ENV !== "production" && !v && R(`Parent route "${String(f)}" not found when adding child route`, g), _ = g) : _ = f, t.addRoute(_, v);
  }
  function m(f) {
    const g = t.getRecordMatcher(f);
    g ? t.removeRoute(g) : process.env.NODE_ENV !== "production" && R(`Cannot remove non-existent route "${String(f)}"`);
  }
  function k() {
    return t.getRoutes().map((f) => f.record);
  }
  function b(f) {
    return !!t.getRecordMatcher(f);
  }
  function y(f, g) {
    if (g = P({}, g || c.value), typeof f == "string") {
      const w = Ce(n, f, g.path), x = t.resolve({ path: w.path }, g), Y = r.createHref(w.fullPath);
      return process.env.NODE_ENV !== "production" && (Y.startsWith("//") ? R(`Location "${f}" resolved to "${Y}". A resolved location cannot start with multiple slashes.`) : x.matched.length || R(`No match found for location with path "${f}"`)), P(w, x, {
        params: l(x.params),
        hash: se(w.hash),
        redirectedFrom: void 0,
        href: Y
      });
    }
    process.env.NODE_ENV !== "production" && !ye(f) && (R(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, f), f = {});
    let v;
    if (f.path != null)
      process.env.NODE_ENV !== "production" && "params" in f && !("name" in f) && // @ts-expect-error: the type is never
      Object.keys(f.params).length && R(`Path "${f.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), v = P({}, f, {
        path: Ce(n, f.path, g.path).path
      });
    else {
      const w = P({}, f.params);
      for (const x in w)
        w[x] == null && delete w[x];
      v = P({}, f, {
        params: u(w)
      }), g.params = u(g.params);
    }
    const _ = t.resolve(v, g), C = f.hash || "";
    process.env.NODE_ENV !== "production" && C && !C.startsWith("#") && R(`A \`hash\` should always start with the character "#". Replace "${C}" with "#${C}".`), _.params = s(l(_.params));
    const D = $n(o, P({}, f, {
      hash: En(C),
      path: _.path
    })), S = r.createHref(D);
    return process.env.NODE_ENV !== "production" && (S.startsWith("//") ? R(`Location "${f}" resolved to "${S}". A resolved location cannot start with multiple slashes.`) : _.matched.length || R(`No match found for location with path "${f.path != null ? f.path : f}"`)), P({
      fullPath: D,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: C,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === st ? ao(f.query) : f.query || {}
      )
    }, _, {
      redirectedFrom: void 0,
      href: S
    });
  }
  function E(f) {
    return typeof f == "string" ? Ce(n, f, c.value.path) : P({}, f);
  }
  function N(f, g) {
    if (h !== f)
      return ae(8, {
        from: g,
        to: f
      });
  }
  function $(f) {
    return Q(f);
  }
  function I(f) {
    return $(P(E(f), { replace: !0 }));
  }
  function V(f) {
    const g = f.matched[f.matched.length - 1];
    if (g && g.redirect) {
      const { redirect: v } = g;
      let _ = typeof v == "function" ? v(f) : v;
      if (typeof _ == "string" && (_ = _.includes("?") || _.includes("#") ? _ = E(_) : (
        // force empty params
        { path: _ }
      ), _.params = {}), process.env.NODE_ENV !== "production" && _.path == null && !("name" in _))
        throw R(`Invalid redirect found:
${JSON.stringify(_, null, 2)}
 when navigating to "${f.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return P({
        query: f.query,
        hash: f.hash,
        // avoid transferring params if the redirect has a path
        params: _.path != null ? {} : f.params
      }, _);
    }
  }
  function Q(f, g) {
    const v = h = y(f), _ = c.value, C = f.state, D = f.force, S = f.replace === !0, w = V(v);
    if (w)
      return Q(
        P(E(w), {
          state: typeof w == "object" ? P({}, C, w.state) : C,
          force: D,
          replace: S
        }),
        // keep original redirectedFrom if it exists
        g || v
      );
    const x = v;
    x.redirectedFrom = g;
    let Y;
    return !D && Qe(o, _, v) && (Y = ae(16, { to: x, from: _ }), Ge(
      _,
      _,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (Y ? Promise.resolve(Y) : Be(x, _)).catch((j) => q(j) ? (
      // navigation redirects still mark the router as ready
      q(
        j,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? j : we(j)
    ) : (
      // reject any unknown error
      be(j, x, _)
    )).then((j) => {
      if (j) {
        if (q(
          j,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          Qe(o, y(j.to), x) && // and we have done it a couple of times
          g && // @ts-expect-error: added only in dev
          (g._count = g._count ? (
            // @ts-expect-error
            g._count + 1
          ) : 1) > 30 ? (R(`Detected a possibly infinite redirection in a navigation guard when going from "${_.fullPath}" to "${x.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : Q(
            // keep options
            P({
              // preserve an existing replacement but allow the redirect to override it
              replace: S
            }, E(j.to), {
              state: typeof j.to == "object" ? P({}, C, j.to.state) : C,
              force: D
            }),
            // preserve the original redirectedFrom if any
            g || x
          );
      } else
        j = qe(x, _, !0, S, C);
      return Fe(x, _, j), j;
    });
  }
  function X(f, g) {
    const v = N(f, g);
    return v ? Promise.reject(v) : Promise.resolve();
  }
  function Z(f) {
    const g = ve.values().next().value;
    return g && typeof g.runWithContext == "function" ? g.runWithContext(f) : f();
  }
  function Be(f, g) {
    let v;
    const [_, C, D] = Oo(f, g);
    v = Pe(_.reverse(), "beforeRouteLeave", f, g);
    for (const w of _)
      w.leaveGuards.forEach((x) => {
        v.push(K(x, f, g));
      });
    const S = X.bind(null, f, g);
    return v.push(S), ee(v).then(() => {
      v = [];
      for (const w of a.list())
        v.push(K(w, f, g));
      return v.push(S), ee(v);
    }).then(() => {
      v = Pe(C, "beforeRouteUpdate", f, g);
      for (const w of C)
        w.updateGuards.forEach((x) => {
          v.push(K(x, f, g));
        });
      return v.push(S), ee(v);
    }).then(() => {
      v = [];
      for (const w of D)
        if (w.beforeEnter)
          if (M(w.beforeEnter))
            for (const x of w.beforeEnter)
              v.push(K(x, f, g));
          else
            v.push(K(w.beforeEnter, f, g));
      return v.push(S), ee(v);
    }).then(() => (f.matched.forEach((w) => w.enterCallbacks = {}), v = Pe(D, "beforeRouteEnter", f, g, Z), v.push(S), ee(v))).then(() => {
      v = [];
      for (const w of i.list())
        v.push(K(w, f, g));
      return v.push(S), ee(v);
    }).catch((w) => q(
      w,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? w : Promise.reject(w));
  }
  function Fe(f, g, v) {
    d.list().forEach((_) => Z(() => _(f, g, v)));
  }
  function qe(f, g, v, _, C) {
    const D = N(f, g);
    if (D)
      return D;
    const S = g === G, w = H ? history.state : {};
    v && (_ || S ? r.replace(f.fullPath, P({
      scroll: S && w && w.scroll
    }, C)) : r.push(f.fullPath, C)), c.value = f, Ge(f, g, v, S), we();
  }
  let ie;
  function qt() {
    ie || (ie = r.listen((f, g, v) => {
      if (!Ke.listening)
        return;
      const _ = y(f), C = V(_);
      if (C) {
        Q(P(C, { replace: !0 }), _).catch(ue);
        return;
      }
      h = _;
      const D = c.value;
      H && Dn(Je(D.fullPath, v.delta), _e()), Be(_, D).catch((S) => q(
        S,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? S : q(
        S,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (Q(
        S.to,
        _
        // avoid an uncaught rejection, let push call triggerError
      ).then((w) => {
        q(
          w,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !v.delta && v.type === de.pop && r.go(-1, !1);
      }).catch(ue), Promise.reject()) : (v.delta && r.go(-v.delta, !1), be(S, _, D))).then((S) => {
        S = S || qe(
          // after navigation, all matched components are resolved
          _,
          D,
          !1
        ), S && (v.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !q(
          S,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-v.delta, !1) : v.type === de.pop && q(
          S,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Fe(_, D, S);
      }).catch(ue);
    }));
  }
  let Ee = ce(), He = ce(), pe;
  function be(f, g, v) {
    we(f);
    const _ = He.list();
    return _.length ? _.forEach((C) => C(f, g, v)) : (process.env.NODE_ENV !== "production" && R("uncaught error during route navigation:"), console.error(f)), Promise.reject(f);
  }
  function Ht() {
    return pe && c.value !== G ? Promise.resolve() : new Promise((f, g) => {
      Ee.add([f, g]);
    });
  }
  function we(f) {
    return pe || (pe = !f, qt(), Ee.list().forEach(([g, v]) => f ? v(f) : g()), Ee.reset()), f;
  }
  function Ge(f, g, v, _) {
    const { scrollBehavior: C } = e;
    if (!H || !C)
      return Promise.resolve();
    const D = !v && In(Je(f.fullPath, 0)) || (_ || !v) && history.state && history.state.scroll || null;
    return zt().then(() => C(f, g, D)).then((S) => S && xn(S)).catch((S) => be(S, f, g));
  }
  const Re = (f) => r.go(f);
  let ke;
  const ve = /* @__PURE__ */ new Set(), Ke = {
    currentRoute: c,
    listening: !0,
    addRoute: p,
    removeRoute: m,
    hasRoute: b,
    getRoutes: k,
    resolve: y,
    options: e,
    push: $,
    replace: I,
    go: Re,
    back: () => Re(-1),
    forward: () => Re(1),
    beforeEach: a.add,
    beforeResolve: i.add,
    afterEach: d.add,
    onError: He.add,
    isReady: Ht,
    install(f) {
      const g = this;
      f.component("RouterLink", fo), f.component("RouterView", go), f.config.globalProperties.$router = g, Object.defineProperty(f.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => ne(c)
      }), H && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !ke && c.value === G && (ke = !0, $(r.location).catch((C) => {
        process.env.NODE_ENV !== "production" && R("Unexpected error when starting the router:", C);
      }));
      const v = {};
      for (const C in G)
        Object.defineProperty(v, C, {
          get: () => c.value[C],
          enumerable: !0
        });
      f.provide(Ue, g), f.provide(Pt, Kt(v)), f.provide(De, c);
      const _ = f.unmount;
      ve.add(f), f.unmount = function() {
        ve.delete(f), ve.size < 1 && (h = G, ie && ie(), ie = null, c.value = G, ke = !1, pe = !1), _();
      }, process.env.NODE_ENV !== "production" && H && _o(f, g, t);
    }
  };
  function ee(f) {
    return f.reduce((g, v) => g.then(() => Z(v)), Promise.resolve());
  }
  return Ke;
}
function Oo(e, t) {
  const n = [], o = [], r = [], a = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < a; i++) {
    const d = t.matched[i];
    d && (e.matched.find((h) => z(h, d)) ? o.push(d) : n.push(d));
    const c = e.matched[i];
    c && (t.matched.find((h) => z(h, c)) || r.push(c));
  }
  return [n, o, r];
}
const Ao = [
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
], To = ["VET2011"], xo = [
  { "course:Unknown": 10 },
  { "course:Unknown": 10 },
  { "course:Unknown": 10 },
  { "course:Unknown": 10 },
  { "subject:Unknown": 20 },
  { "system:Unknown": 15 },
  { "system:Unknow": 20 },
  { "topic:Unknow": 10 }
], Do = async (e, t, n) => {
  try {
    return await (await fetch(
      `${n}?${new URLSearchParams({
        level: t.toString(),
        tag: e
      })}`
    )).json();
  } catch (o) {
    console.error("Error fetching data from the server", o), alert("Error fetching data from the server, only display test data.");
  }
}, Io = async (e, t, n) => {
  try {
    return await Do(e, t, n) || Ao.filter(
      (r) => r.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, Vo = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), r = await (await fetch(`${t}?${n}`)).json() ?? To, a = new Set(r);
    return Array.from(a);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, Vt = async (e, t) => {
  try {
    const n = new URLSearchParams({
      searchTerm: e
    });
    return await (await fetch(`${t}?${n}`)).json();
  } catch (n) {
    console.error("An error occurred while getting filtered resources", n);
  }
}, jo = async (e) => {
  try {
    return await (await fetch(e)).json();
  } catch (t) {
    return alert(
      "An error occurred while fetching tags" + t + "fallback to static tags"
    ), {};
  }
}, Lo = async (e) => {
  const t = await jo(e), n = Object.keys(t).map((o) => ({
    [o]: t[o]
  }));
  return jt(n);
}, jt = (e) => e ? e.reduce(
  (t, n) => {
    const [o, r] = Object.keys(n)[0].split(":"), a = Object.values(n)[0];
    return t[o] || (t[o] = []), t[o].push({ [r.replace("_", " ")]: a }), t;
  },
  {}
) : {}, Mo = jt(xo), Uo = { class: "search-results-container" }, Bo = { class: "container-description" }, Fo = { class: "label-badges" }, qo = {
  key: 0,
  class: "results"
}, Ho = ["href"], Go = {
  key: 1,
  class: "no-results"
}, Ko = /* @__PURE__ */ W({
  __name: "DisplayResult",
  setup(e) {
    const t = B("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag", n = B("$filterResourcesApi") || "http://localhost:8080/api/resource/filterResources", o = L([
      { _id: "", label: "", tags: [""], url: "" }
    ]), r = Ft(), a = L(""), i = L(5);
    Le(async () => {
      if (r) {
        const c = r.currentRoute.value.query;
        a.value = c.searchResult, i.value = Number(c.level), await d(a.value, i.value, c.type);
      } else
        a.value = "undefined";
    });
    const d = async (c, h, s) => {
      if (c)
        switch (s) {
          case "tag":
            o.value = await Io(
              c,
              h,
              t
            );
            break;
          case "title":
            o.value = await Vt(
              c,
              n
            );
            break;
          default:
            o.value = [];
        }
    };
    return je(r.currentRoute, async (c, h) => {
      const s = c.query.searchResult || "", u = h.query.searchResult || "";
      s !== u && await d(s, i.value, c.query.type);
    }), (c, h) => (A(), T("div", Uo, [
      O("div", Bo, [
        O("button", {
          onClick: h[0] || (h[0] = () => c.$router.back())
        }, "↵"),
        O("div", Fo, " (" + F(o.value.length) + " records in total) ", 1)
      ]),
      o.value.length ? (A(), T("div", qo, [
        O("ul", null, [
          (A(!0), T(J, null, oe(o.value, (s, u) => (A(), T("li", { key: u }, [
            O("a", {
              href: s.url,
              target: "_blank",
              class: "linkToResource"
            }, F(s.label), 9, Ho)
          ]))), 128))
        ])
      ])) : (A(), T("p", Go, "No results found"))
    ]));
  }
}), he = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Ve = /* @__PURE__ */ he(Ko, [["__scopeId", "data-v-cbdea2e0"]]), Lt = (e) => (pt("data-v-b97c2a53"), e = e(), vt(), e), zo = /* @__PURE__ */ Lt(() => /* @__PURE__ */ O("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }, null, -1)), Wo = /* @__PURE__ */ Lt(() => /* @__PURE__ */ O("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}, null, -1)), Qo = [
  zo,
  Wo
], Yo = /* @__PURE__ */ W({
  __name: "CollapseBtn",
  props: { showDropdown: Boolean },
  setup(e) {
    return (t, n) => (A(), T("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      class: me(
        e.showDropdown ? "collapse-btn collapse-btn-rotation" : "collapse-btn"
      )
    }, Qo, 2));
  }
}), Mt = /* @__PURE__ */ he(Yo, [["__scopeId", "data-v-b97c2a53"]]), ft = /* @__PURE__ */ W({
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
    }, a = U(() => r[o] || "Default");
    return (i, d) => (A(), T("button", {
      class: "filter-btn",
      onClick: d[0] || (d[0] = (c) => n("click", i.actionType))
    }, F(a.value), 1));
  }
}), Ut = (e) => (pt("data-v-99d5bb92"), e = e(), vt(), e), Jo = { class: "crucible-filter-container" }, Xo = {
  key: 0,
  class: "crucible-filter-panel"
}, Zo = { class: "crucible-filter-action" }, er = /* @__PURE__ */ Ut(() => /* @__PURE__ */ O("hr", null, null, -1)), tr = /* @__PURE__ */ Ut(() => /* @__PURE__ */ O("h5", null, "Selected:", -1)), nr = { class: "crucible-filter-collection" }, or = ["onClick"], rr = { class: "capital-first" }, sr = { class: "crucible-filters" }, ar = ["onClick"], ir = { class: "crucible-filter-dropdown-menu" }, cr = ["id", "value", "checked", "onClick"], lr = ["for"], ur = /* @__PURE__ */ W({
  __name: "CrucibleFilter",
  emits: ["updateFilterTagArray", "checkTaxonomyExists"],
  setup(e, { emit: t }) {
    const n = t, o = B("$filterSetApi") || "http://localhost:8080/api/resource/getFilterSet", r = L(!1), a = L({}), i = L([]), d = L({}), c = L(!1), h = (m) => {
      a.value[m] = !a.value[m], console.log(c.value);
    }, s = (m, k) => {
      const b = `${m}:${k.replace(" ", "_")}`;
      i.value.includes(b) ? i.value = i.value.filter(
        (y) => y !== b
      ) : i.value.push(b);
    }, u = U(() => i.value.map(
      (m) => m.split(":")[1].replace("_", " ")
    )), l = () => {
      a.value = {}, i.value = [];
    }, p = () => {
      n("updateFilterTagArray", i);
    };
    return Le(async () => {
      const m = await Lo(o), k = Object.keys(m).length > 0;
      d.value = k ? m : Mo, c.value = k, n("checkTaxonomyExists", c);
    }), (m, k) => (A(), T("div", Jo, [
      r.value ? (A(), T("div", Xo, [
        O("div", Zo, [
          re(ft, {
            "action-type": "apply",
            onClick: p
          }),
          re(ft, {
            "action-type": "clear",
            onClick: l
          })
        ]),
        er,
        tr,
        O("div", nr, [
          (A(!0), T(J, null, oe(i.value, (b, y) => (A(), T("span", {
            key: y,
            onClick: (E) => i.value.splice(y, 1)
          }, [
            Yt(" ☒ "),
            O("strong", null, F(b.split(":")[0]), 1),
            O("span", rr, F(b.split(":")[1].replace("_", " ")), 1)
          ], 8, or))), 128))
        ]),
        O("div", sr, [
          (A(!0), T(J, null, oe(d.value, (b, y) => (A(), T("div", {
            key: y,
            class: "crucible-filter-dropdown"
          }, [
            O("h4", {
              class: me(a.value[y] ? "selected-background" : ""),
              onClick: (E) => h(y)
            }, [
              O("span", null, F(y), 1),
              re(Mt, {
                "show-dropdown": a.value[y]
              }, null, 8, ["show-dropdown"])
            ], 10, ar),
            gt(O("div", ir, [
              (A(!0), T(J, null, oe(b, (E, N) => (A(), T("div", {
                key: N,
                class: me(
                  u.value.includes(Object.keys(E)[0]) ? "selected-filter-tag column" : "column"
                )
              }, [
                O("input", {
                  id: `tag-${y}-${N.toString()}`,
                  type: "checkbox",
                  value: Object.keys(E)[0],
                  checked: u.value.includes(Object.keys(E)[0]),
                  onClick: ($) => s(y, Object.keys(E)[0])
                }, null, 8, cr),
                O("label", {
                  for: `tag-${y}-${N.toString()}`
                }, [
                  O("span", null, F(Object.keys(E)[0]), 1),
                  O("span", null, " (" + F(Object.values(E)[0]) + ") ", 1)
                ], 8, lr)
              ], 2))), 128))
            ], 512), [
              [Jt, a.value[y]]
            ])
          ]))), 128))
        ])
      ])) : mt("", !0),
      O("button", {
        class: me(
          r.value ? "crucible-filter-control svg-background-light" : "crucible-filter-control crucible-filter-control-light svg-background-dark"
        ),
        onClick: k[0] || (k[0] = (b) => r.value = !r.value)
      }, null, 2)
    ]));
  }
}), Bt = /* @__PURE__ */ he(ur, [["__scopeId", "data-v-99d5bb92"]]), fr = { id: "app" }, dr = { class: "main" }, hr = /* @__PURE__ */ W({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = ze("CrucibleSearch"), r = ze("RouterView");
      return A(), T("div", fr, [
        O("div", dr, [
          re(o),
          re(r),
          O("div", null, [
            re(Bt)
          ])
        ])
      ]);
    };
  }
}), pr = /* @__PURE__ */ he(hr, [["__scopeId", "data-v-aabb2d26"]]), vr = [
  { path: "/", component: pr },
  { path: "/search", component: Ve }
], gr = No({
  history: Mn("/"),
  routes: vr
});
function Ft() {
  const e = B("$router");
  return e || gr;
}
const mr = { class: "search-container" }, yr = { key: 0 }, _r = ["onClick"], Er = 10, br = /* @__PURE__ */ W({
  __name: "CrucibleSearch",
  props: {
    level: {
      type: Number,
      default: 5
    }
  },
  setup(e) {
    const t = Ft(), n = L(""), o = L([]), r = L([]), a = L([]), i = L(!1), d = L(null), c = B("$tagsApi") || "http://localhost:8080/api/resource/alltags", h = B("$filterResourcesApi") || "http://localhost:8080/api/resource/filterResourcs";
    console.log("SEARCH FILTER API", h);
    const s = e, { level: u } = Xt(s), l = ($) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes($.toLowerCase())
    ), p = ($) => $.replace(/_/g, " "), m = ($) => $.replace(/ /g, "_"), k = async () => {
      if (n.value) {
        o.value = (await Vo(n.value, c)).map(p).map((I) => ({ value: I, type: "tag" }));
        const $ = await Vt(
          n.value,
          h
        );
        r.value = $.map(
          (I) => ({ value: I.label, type: "title" })
        ), a.value = [
          ...o.value,
          ...r.value
        ].slice(0, Er), i.value = !0;
      } else
        o.value = [], r.value = [], i.value = !1;
    }, b = ($) => {
      n.value = a.value.map((I) => I.value).includes($.value) ? $.value : a.value[0].value, i.value = !1, t.push({
        path: "/search",
        query: {
          searchResult: $.type === "tag" ? m(n.value) : n.value,
          level: Number(u.value),
          type: $.type
        }
      });
    }, y = () => {
      o.value.length && n.value && (i.value = !0);
    }, E = ($) => {
      $.key === "Enter" ? (a.value.find((I) => I.value === n.value) ? b({ value: n.value, type: "tag" }) : b(a.value[0]), n.value = "") : $.key === "Tab" && ($.preventDefault(), n.value = o.value[0].value ?? n.value);
    }, N = ($) => {
      d.value && !d.value.contains($.target) && (i.value = !1);
    };
    return Le(() => {
      document.addEventListener("click", N);
    }), Zt(() => {
      document.removeEventListener("click", N);
    }), ($, I) => (A(), T("div", mr, [
      O("div", {
        ref_key: "searchBoxRef",
        ref: d,
        class: "search-container"
      }, [
        gt(O("input", {
          "onUpdate:modelValue": I[0] || (I[0] = (V) => n.value = V),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: k,
          onFocus: y,
          onKeydown: E
        }, null, 544), [
          [en, n.value]
        ]),
        a.value.length && n.value && i.value ? (A(), T("ul", yr, [
          (A(!0), T(J, null, oe(a.value, (V, Q) => (A(), T("li", {
            key: `${V.value}-${Q}`,
            onClick: (X) => b(V)
          }, [
            (A(!0), T(J, null, oe(V.value.split(""), (X, Z) => (A(), T(J, null, [
              l(X) ? (A(), T("strong", {
                key: `strong-${Z}`
              }, F(X), 1)) : (A(), T("span", { key: Z }, F(X), 1))
            ], 64))), 256))
          ], 8, _r))), 128))
        ])) : mt("", !0)
      ], 512)
    ]));
  }
}), wr = /* @__PURE__ */ he(br, [["__scopeId", "data-v-c432c1fa"]]);
function kr(e, t) {
  const { router: n, getApi: o, tagsApi: r, filterSetApi: a, filterResourcesApi: i } = t;
  e.component("CrucibleSearch", wr), e.component("DisplayResult", Ve), e.component("CrucibleFilter", Bt), e.component("CollapseBtn", Mt), e.provide("$router", n || null), e.provide("$getApi", o || null), e.provide("$tagsApi", r || null), e.provide("$filterSetApi", a || null), e.provide("$filterResourcesApi", i || null), n.addRoute({ path: "/search", component: Ve });
}
export {
  Mt as CollapseBtn,
  Bt as CrucibleFilter,
  wr as CrucibleSearch,
  Ve as DisplayResult,
  kr as createSearchFilterPlugin
};
