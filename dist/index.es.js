import { shallowRef as Gt, unref as ee, shallowReactive as Kt, nextTick as zt, defineComponent as Q, reactive as Wt, inject as q, computed as U, h as ht, provide as Se, ref as j, watch as je, getCurrentInstance as pt, watchEffect as Qt, onMounted as Le, openBlock as A, createElementBlock as T, createElementVNode as O, toDisplayString as F, Fragment as J, renderList as te, normalizeClass as ge, pushScopeId as vt, popScopeId as gt, createVNode as ne, createTextVNode as Yt, withDirectives as mt, vShow as Jt, createCommentVNode as yt, resolveComponent as ze, toRefs as Xt, onUnmounted as Zt, vModelText as en } from "vue";
function tn() {
  return _t().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function _t() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const nn = typeof Proxy == "function", on = "devtools-plugin:setup", rn = "plugin:settings:set";
let Z, $e;
function sn() {
  var e;
  return Z !== void 0 || (typeof window < "u" && window.performance ? (Z = !0, $e = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Z = !0, $e = globalThis.perf_hooks.performance) : Z = !1), Z;
}
function an() {
  return sn() ? $e.now() : Date.now();
}
class cn {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const a in t.settings) {
        const d = t.settings[a];
        o[a] = d.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let c = Object.assign({}, o);
    try {
      const a = localStorage.getItem(r), d = JSON.parse(a);
      Object.assign(c, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return c;
      },
      setSettings(a) {
        try {
          localStorage.setItem(r, JSON.stringify(a));
        } catch {
        }
        c = a;
      },
      now() {
        return an();
      }
    }, n && n.on(rn, (a, d) => {
      a === this.plugin.id && this.fallbacks.setSettings(d);
    }), this.proxiedOn = new Proxy({}, {
      get: (a, d) => this.target ? this.target.on[d] : (...l) => {
        this.onQueue.push({
          method: d,
          args: l
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (a, d) => this.target ? this.target[d] : d === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(d) ? (...l) => (this.targetQueue.push({
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
function ln(e, t) {
  const n = e, o = _t(), r = tn(), c = nn && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !c))
    r.emit(on, e, t);
  else {
    const a = c ? new cn(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: a
    }), a && t(a.proxiedTarget);
  }
}
/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const G = typeof document < "u";
function un(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const P = Object.assign;
function Ce(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = L(r) ? r.map(e) : e(r);
  }
  return n;
}
const ce = () => {
}, L = Array.isArray;
function R(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const Et = /#/g, fn = /&/g, dn = /\//g, hn = /=/g, pn = /\?/g, bt = /\+/g, vn = /%5B/g, gn = /%5D/g, wt = /%5E/g, mn = /%60/g, Rt = /%7B/g, yn = /%7C/g, kt = /%7D/g, _n = /%20/g;
function Me(e) {
  return encodeURI("" + e).replace(yn, "|").replace(vn, "[").replace(gn, "]");
}
function En(e) {
  return Me(e).replace(Rt, "{").replace(kt, "}").replace(wt, "^");
}
function Oe(e) {
  return Me(e).replace(bt, "%2B").replace(_n, "+").replace(Et, "%23").replace(fn, "%26").replace(mn, "`").replace(Rt, "{").replace(kt, "}").replace(wt, "^");
}
function bn(e) {
  return Oe(e).replace(hn, "%3D");
}
function wn(e) {
  return Me(e).replace(Et, "%23").replace(pn, "%3F");
}
function Rn(e) {
  return e == null ? "" : wn(e).replace(dn, "%2F");
}
function oe(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && R(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const kn = /\/$/, Sn = (e) => e.replace(kn, "");
function Ne(e, t, n = "/") {
  let o, r = {}, c = "", a = "";
  const d = t.indexOf("#");
  let l = t.indexOf("?");
  return d < l && d >= 0 && (l = -1), l > -1 && (o = t.slice(0, l), c = t.slice(l + 1, d > -1 ? d : t.length), r = e(c)), d > -1 && (o = o || t.slice(0, d), a = t.slice(d, t.length)), o = Pn(o ?? t, n), {
    fullPath: o + (c && "?") + c + a,
    path: o,
    query: r,
    hash: oe(a)
  };
}
function Cn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function We(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Qe(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && W(t.matched[o], n.matched[r]) && St(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function W(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function St(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Nn(e[n], t[n]))
      return !1;
  return !0;
}
function Nn(e, t) {
  return L(e) ? Ye(e, t) : L(t) ? Ye(t, e) : e === t;
}
function Ye(e, t) {
  return L(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
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
  let c = n.length - 1, a, d;
  for (a = 0; a < o.length; a++)
    if (d = o[a], d !== ".")
      if (d === "..")
        c > 1 && c--;
      else
        break;
  return n.slice(0, c).join("/") + "/" + o.slice(a).join("/");
}
var ue;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ue || (ue = {}));
var le;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(le || (le = {}));
function $n(e) {
  if (!e)
    if (G) {
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
const ye = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function xn(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const c = document.querySelector(e.el);
        if (o && c) {
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
function Ct(e, t) {
  const { pathname: n, search: o, hash: r } = t, c = e.indexOf("#");
  if (c > -1) {
    let d = r.includes(e.slice(c)) ? e.slice(c).length : 1, l = r.slice(d);
    return l[0] !== "/" && (l = "/" + l), We(l, "");
  }
  return We(n, e) + o + r;
}
function jn(e, t, n, o) {
  let r = [], c = [], a = null;
  const d = ({ state: i }) => {
    const p = Ct(e, location), m = n.value, k = t.value;
    let b = 0;
    if (i) {
      if (n.value = p, t.value = i, a && a === m) {
        a = null;
        return;
      }
      b = k ? i.position - k.position : 0;
    } else
      o(p);
    r.forEach((y) => {
      y(n.value, m, {
        delta: b,
        type: ue.pop,
        direction: b ? b > 0 ? le.forward : le.back : le.unknown
      });
    });
  };
  function l() {
    a = n.value;
  }
  function h(i) {
    r.push(i);
    const p = () => {
      const m = r.indexOf(i);
      m > -1 && r.splice(m, 1);
    };
    return c.push(p), p;
  }
  function s() {
    const { history: i } = window;
    i.state && i.replaceState(P({}, i.state, { scroll: ye() }), "");
  }
  function f() {
    for (const i of c)
      i();
    c = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: l,
    listen: h,
    destroy: f
  };
}
function Xe(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? ye() : null
  };
}
function Ln(e) {
  const { history: t, location: n } = window, o = {
    value: Ct(e, n)
  }, r = { value: t.state };
  r.value || c(o.value, {
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
  function c(l, h, s) {
    const f = e.indexOf("#"), i = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + l : Vn() + e + l;
    try {
      t[s ? "replaceState" : "pushState"](h, "", i), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? R("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](i);
    }
  }
  function a(l, h) {
    const s = P({}, t.state, Xe(
      r.value.back,
      // keep back and forward entries but override current position
      l,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    c(l, s, !0), o.value = l;
  }
  function d(l, h) {
    const s = P(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: l,
        scroll: ye()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && R(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), c(s.current, s, !0);
    const f = P({}, Xe(o.value, l, null), { position: s.position + 1 }, h);
    c(l, f, !1), o.value = l;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: a
  };
}
function Mn(e) {
  e = $n(e);
  const t = Ln(e), n = jn(e, t.state, t.location, t.replace);
  function o(c, a = !0) {
    a || n.pauseListeners(), history.go(c);
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
function me(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Nt(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const K = {
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
function re(e, t) {
  return process.env.NODE_ENV !== "production" ? P(new Error(Un[e](t)), {
    type: e,
    [Te]: !0
  }, t) : P(new Error(), {
    type: e,
    [Te]: !0
  }, t);
}
function H(e, t) {
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
  const c = [];
  for (const h of e) {
    const s = h.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !h.length && (r += "/");
    for (let f = 0; f < h.length; f++) {
      const i = h[f];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (i.type === 0)
        f || (r += "/"), r += i.value.replace(Hn, "\\$&"), p += 40;
      else if (i.type === 1) {
        const { value: m, repeatable: k, optional: b, regexp: y } = i;
        c.push({
          name: m,
          repeatable: k,
          optional: b
        });
        const E = y || et;
        if (E !== et) {
          p += 10;
          try {
            new RegExp(`(${E})`);
          } catch (C) {
            throw new Error(`Invalid custom RegExp for param "${m}" (${E}): ` + C.message);
          }
        }
        let $ = k ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        f || ($ = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        b && h.length < 2 ? `(?:/${$})` : "/" + $), b && ($ += "?"), r += $, p += 20, b && (p += -8), k && (p += -20), E === ".*" && (p += -50);
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
  const a = new RegExp(r, n.sensitive ? "" : "i");
  function d(h) {
    const s = h.match(a), f = {};
    if (!s)
      return null;
    for (let i = 1; i < s.length; i++) {
      const p = s[i] || "", m = c[i - 1];
      f[m.name] = p && m.repeatable ? p.split("/") : p;
    }
    return f;
  }
  function l(h) {
    let s = "", f = !1;
    for (const i of e) {
      (!f || !s.endsWith("/")) && (s += "/"), f = !1;
      for (const p of i)
        if (p.type === 0)
          s += p.value;
        else if (p.type === 1) {
          const { value: m, repeatable: k, optional: b } = p, y = m in h ? h[m] : "";
          if (L(y) && !k)
            throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);
          const E = L(y) ? y.join("/") : y;
          if (!E)
            if (b)
              i.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : f = !0);
            else
              throw new Error(`Missing required param "${m}"`);
          s += E;
        }
    }
    return s || "/";
  }
  return {
    re: a,
    score: o,
    keys: c,
    parse: d,
    stringify: l
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
    const c = Kn(o[n], r[n]);
    if (c)
      return c;
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
  let c;
  function a() {
    c && r.push(c), c = [];
  }
  let d = 0, l, h = "", s = "";
  function f() {
    h && (n === 0 ? c.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (c.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), c.push({
      type: 1,
      value: h,
      regexp: s,
      repeatable: l === "*" || l === "+",
      optional: l === "*" || l === "?"
    })) : t("Invalid state to consume buffer"), h = "");
  }
  function i() {
    h += l;
  }
  for (; d < e.length; ) {
    if (l = e[d++], l === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (h && f(), a()) : l === ":" ? (f(), n = 1) : i();
        break;
      case 4:
        i(), n = o;
        break;
      case 1:
        l === "(" ? n = 2 : Qn.test(l) ? i() : (f(), n = 0, l !== "*" && l !== "?" && l !== "+" && d--);
        break;
      case 2:
        l === ")" ? s[s.length - 1] == "\\" ? s = s.slice(0, -1) + l : n = 3 : s += l;
        break;
      case 3:
        f(), n = 0, l !== "*" && l !== "?" && l !== "+" && d--, s = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), f(), a(), r;
}
function Jn(e, t, n) {
  const o = Gn(Yn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const c = /* @__PURE__ */ new Set();
    for (const a of o.keys)
      c.has(a.name) && R(`Found duplicated params with name "${a.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), c.add(a.name);
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
  function c(s, f, i) {
    const p = !i, m = Zn(s);
    process.env.NODE_ENV !== "production" && oo(m, f), m.aliasOf = i && i.record;
    const k = rt(t, s), b = [
      m
    ];
    if ("alias" in s) {
      const $ = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const C of $)
        b.push(P({}, m, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: i ? i.record.components : m.components,
          path: C,
          // we might be the child of an alias
          aliasOf: i ? i.record : m
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let y, E;
    for (const $ of b) {
      const { path: C } = $;
      if (f && C[0] !== "/") {
        const M = f.record.path, I = M[M.length - 1] === "/" ? "" : "/";
        $.path = f.record.path + (C && I + C);
      }
      if (process.env.NODE_ENV !== "production" && $.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (y = Jn($, f, k), process.env.NODE_ENV !== "production" && f && C[0] === "/" && ro(y, f), i ? (i.alias.push(y), process.env.NODE_ENV !== "production" && no(i, y)) : (E = E || y, E !== y && E.alias.push(y), p && s.name && !ot(y) && a(s.name)), m.children) {
        const M = m.children;
        for (let I = 0; I < M.length; I++)
          c(M[I], y, i && i.children[I]);
      }
      i = i || y, (y.record.components && Object.keys(y.record.components).length || y.record.name || y.record.redirect) && l(y);
    }
    return E ? () => {
      a(E);
    } : ce;
  }
  function a(s) {
    if (Nt(s)) {
      const f = o.get(s);
      f && (o.delete(s), n.splice(n.indexOf(f), 1), f.children.forEach(a), f.alias.forEach(a));
    } else {
      const f = n.indexOf(s);
      f > -1 && (n.splice(f, 1), s.record.name && o.delete(s.record.name), s.children.forEach(a), s.alias.forEach(a));
    }
  }
  function d() {
    return n;
  }
  function l(s) {
    let f = 0;
    for (; f < n.length && zn(s, n[f]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[f].record.path || !Pt(s, n[f])); )
      f++;
    n.splice(f, 0, s), s.record.name && !ot(s) && o.set(s.record.name, s);
  }
  function h(s, f) {
    let i, p = {}, m, k;
    if ("name" in s && s.name) {
      if (i = o.get(s.name), !i)
        throw re(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const E = Object.keys(s.params || {}).filter(($) => !i.keys.find((C) => C.name === $));
        E.length && R(`Discarded invalid param(s) "${E.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      k = i.record.name, p = P(
        // paramsFromLocation is a new object
        nt(
          f.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          i.keys.filter((E) => !E.optional).concat(i.parent ? i.parent.keys.filter((E) => E.optional) : []).map((E) => E.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && nt(s.params, i.keys.map((E) => E.name))
      ), m = i.stringify(p);
    } else if (s.path != null)
      m = s.path, process.env.NODE_ENV !== "production" && !m.startsWith("/") && R(`The Matcher cannot resolve relative paths but received "${m}". Unless you directly called \`matcher.resolve("${m}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), i = n.find((E) => E.re.test(m)), i && (p = i.parse(m), k = i.record.name);
    else {
      if (i = f.name ? o.get(f.name) : n.find((E) => E.re.test(f.path)), !i)
        throw re(1, {
          location: s,
          currentLocation: f
        });
      k = i.record.name, p = P({}, f.params, s.params), m = i.stringify(p);
    }
    const b = [];
    let y = i;
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
  return e.forEach((s) => c(s)), { addRoute: c, resolve: h, removeRoute: a, getRoutes: d, getRecordMatcher: r };
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
function Pt(e, t) {
  return t.children.some((n) => n === e || Pt(e, n));
}
function so(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const c = o[r].replace(bt, " "), a = c.indexOf("="), d = oe(a < 0 ? c : c.slice(0, a)), l = a < 0 ? null : oe(c.slice(a + 1));
    if (d in t) {
      let h = t[d];
      L(h) || (h = t[d] = [h]), h.push(l);
    } else
      t[d] = l;
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
    (L(o) ? o.map((c) => c && Oe(c)) : [o && Oe(o)]).forEach((c) => {
      c !== void 0 && (t += (t.length ? "&" : "") + n, c != null && (t += "=" + c));
    });
  }
  return t;
}
function ao(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = L(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const io = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), at = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Ue = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), $t = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), De = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
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
function z(e, t, n, o, r, c = (a) => a()) {
  const a = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((d, l) => {
    const h = (i) => {
      i === !1 ? l(re(4, {
        from: n,
        to: t
      })) : i instanceof Error ? l(i) : me(i) ? l(re(2, {
        from: t,
        to: i
      })) : (a && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === a && typeof i == "function" && a.push(i), d());
    }, s = c(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? co(h, t, n) : h));
    let f = Promise.resolve(s);
    if (e.length < 3 && (f = f.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const i = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        f = f.then((p) => h._called ? p : (R(i), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        R(i), l(new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((i) => l(i));
  });
}
function co(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && R(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Pe(e, t, n, o, r = (c) => c()) {
  const c = [];
  for (const a of e) {
    process.env.NODE_ENV !== "production" && !a.components && !a.children.length && R(`Record with path "${a.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in a.components) {
      let l = a.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!l || typeof l != "object" && typeof l != "function")
          throw R(`Component "${d}" in record with path "${a.path}" is not a valid component. Received "${String(l)}".`), new Error("Invalid route component");
        if ("then" in l) {
          R(`Component "${d}" in record with path "${a.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = l;
          l = () => h;
        } else
          l.__asyncLoader && // warn only once per component
          !l.__warnedDefineAsync && (l.__warnedDefineAsync = !0, R(`Component "${d}" in record with path "${a.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !a.instances[d]))
        if (lo(l)) {
          const s = (l.__vccOpts || l)[t];
          s && c.push(z(s, n, o, a, d, r));
        } else {
          let h = l();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (R(`Component "${d}" in record with path "${a.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), c.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${a.path}"`));
            const f = un(s) ? s.default : s;
            a.components[d] = f;
            const p = (f.__vccOpts || f)[t];
            return p && z(p, n, o, a, d, r)();
          }));
        }
    }
  }
  return c;
}
function lo(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function it(e) {
  const t = q(Ue), n = q($t);
  let o = !1, r = null;
  const c = U(() => {
    const s = ee(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (me(s) || (o ? R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : R(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), a = U(() => {
    const { matched: s } = c.value, { length: f } = s, i = s[f - 1], p = n.matched;
    if (!i || !p.length)
      return -1;
    const m = p.findIndex(W.bind(null, i));
    if (m > -1)
      return m;
    const k = ct(s[f - 2]);
    return (
      // we are dealing with nested routes
      f > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      ct(i) === k && // avoid comparing the child with its parent
      p[p.length - 1].path !== k ? p.findIndex(W.bind(null, s[f - 2])) : m
    );
  }), d = U(() => a.value > -1 && po(n.params, c.value.params)), l = U(() => a.value > -1 && a.value === n.matched.length - 1 && St(n.params, c.value.params));
  function h(s = {}) {
    return ho(s) ? t[ee(e.replace) ? "replace" : "push"](
      ee(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ce) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && G) {
    const s = pt();
    if (s) {
      const f = {
        route: c.value,
        isActive: d.value,
        isExactActive: l.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(f), Qt(() => {
        f.route = c.value, f.isActive = d.value, f.isExactActive = l.value, f.error = me(ee(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: c,
    href: U(() => c.value.href),
    isActive: d,
    isExactActive: l,
    navigate: h
  };
}
const uo = /* @__PURE__ */ Q({
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
    const n = Wt(it(e)), { options: o } = q(Ue), r = U(() => ({
      [lt(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [lt(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const c = t.default && t.default(n);
      return e.custom ? c : ht("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, c);
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
    } else if (!L(r) || r.length !== o.length || o.some((c, a) => c !== r[a]))
      return !1;
  }
  return !0;
}
function ct(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const lt = (e, t, n) => e ?? t ?? n, vo = /* @__PURE__ */ Q({
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
    const o = q(De), r = U(() => e.route || o.value), c = q(at, 0), a = U(() => {
      let h = ee(c);
      const { matched: s } = r.value;
      let f;
      for (; (f = s[h]) && !f.components; )
        h++;
      return h;
    }), d = U(() => r.value.matched[a.value]);
    Se(at, U(() => a.value + 1)), Se(io, d), Se(De, r);
    const l = j();
    return je(() => [l.value, d.value, e.name], ([h, s, f], [i, p, m]) => {
      s && (s.instances[f] = h, p && p !== s && h && h === i && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !W(s, p) || !i) && (s.enterCallbacks[f] || []).forEach((k) => k(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, f = d.value, i = f && f.components[s];
      if (!i)
        return ut(n.default, { Component: i, route: h });
      const p = f.props[s], m = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, b = ht(i, P({}, m, t, {
        onVnodeUnmounted: (y) => {
          y.component.isUnmounted && (f.instances[s] = null);
        },
        ref: l
      }));
      if (process.env.NODE_ENV !== "production" && G && b.ref) {
        const y = {
          depth: a.value,
          name: f.name,
          path: f.path,
          meta: f.meta
        };
        (L(b.ref) ? b.ref.map(($) => $.i) : [b.ref.i]).forEach(($) => {
          $.__vrv_devtools = y;
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
  const e = pt(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
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
function ve(e) {
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
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((s, f) => {
      s.instanceData && s.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: ie(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: f }) => {
      if (f.__vrv_devtools) {
        const i = f.__vrv_devtools;
        s.tags.push({
          label: (i.name ? `${i.name.toString()}: ` : "") + i.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: Ot
        });
      }
      L(f.__vrl_devtools) && (f.__devtoolsApi = r, f.__vrl_devtools.forEach((i) => {
        let p = i.route.path, m = xt, k = "", b = 0;
        i.error ? (p = i.error, m = ko, b = So) : i.isExactActive ? (m = Tt, k = "This is exactly active") : i.isActive && (m = At, k = "This link is active"), s.tags.push({
          label: p,
          textColor: b,
          tooltip: k,
          backgroundColor: m
        });
      }));
    }), je(t.currentRoute, () => {
      l(), r.notifyComponentUpdate(), r.sendInspectorTree(d), r.sendInspectorState(d);
    });
    const c = "router:navigations:" + o;
    r.addTimelineLayer({
      id: c,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((s, f) => {
      r.addTimelineEvent({
        layerId: c,
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
    let a = 0;
    t.beforeEach((s, f) => {
      const i = {
        guard: ve("beforeEach"),
        from: ie(f, "Current Location during this navigation"),
        to: ie(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: a++
      }), r.addTimelineEvent({
        layerId: c,
        event: {
          time: r.now(),
          title: "Start of navigation",
          subtitle: s.fullPath,
          data: i,
          groupId: s.meta.__navigationId
        }
      });
    }), t.afterEach((s, f, i) => {
      const p = {
        guard: ve("afterEach")
      };
      i ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: i ? i.message : "",
          tooltip: "Navigation Failure",
          value: i
        }
      }, p.status = ve("❌")) : p.status = ve("✅"), p.from = ie(f, "Current Location during this navigation"), p.to = ie(s, "Target location"), r.addTimelineEvent({
        layerId: c,
        event: {
          title: "End of navigation",
          subtitle: s.fullPath,
          time: r.now(),
          data: p,
          logType: i ? "warning" : "default",
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
      let f = n.getRoutes().filter((i) => !i.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !i.parent.record.components);
      f.forEach(Vt), s.filter && (f = f.filter((i) => (
        // save matches state based on the payload
        Ie(i, s.filter.toLowerCase())
      ))), f.forEach((i) => It(i, t.currentRoute.value)), s.rootNodes = f.map(Dt);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && l();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === d) {
        const i = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        i && (s.state = {
          options: bo(i)
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
const Ot = 15485081, At = 2450411, Tt = 8702998, wo = 2282478, xt = 16486972, Ro = 6710886, ko = 16704226, So = 12131356;
function Dt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: wo
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: xt
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Ot
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
    backgroundColor: Ro
  });
  let o = n.__vd_id;
  return o == null && (o = String(Co++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Dt)
  };
}
let Co = 0;
const No = /^\/(.*)\/([a-z]*)$/;
function It(e, t) {
  const n = t.matched.length && W(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => W(o, e.record))), e.children.forEach((o) => It(o, t));
}
function Vt(e) {
  e.__vd_match = !1, e.children.forEach(Vt);
}
function Ie(e, t) {
  const n = String(e.re).match(No);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((a) => Ie(a, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), c = oe(r);
  return !t.startsWith("/") && (c.includes(t) || r.includes(t)) || c.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((a) => Ie(a, t));
}
function Po(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function $o(e) {
  const t = Xn(e.routes, e), n = e.parseQuery || so, o = e.stringifyQuery || st, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const c = ae(), a = ae(), d = ae(), l = Gt(K);
  let h = K;
  G && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = Ce.bind(null, (u) => "" + u), f = Ce.bind(null, Rn), i = (
    // @ts-expect-error: intentionally avoid the type check
    Ce.bind(null, oe)
  );
  function p(u, g) {
    let v, _;
    return Nt(u) ? (v = t.getRecordMatcher(u), process.env.NODE_ENV !== "production" && !v && R(`Parent route "${String(u)}" not found when adding child route`, g), _ = g) : _ = u, t.addRoute(_, v);
  }
  function m(u) {
    const g = t.getRecordMatcher(u);
    g ? t.removeRoute(g) : process.env.NODE_ENV !== "production" && R(`Cannot remove non-existent route "${String(u)}"`);
  }
  function k() {
    return t.getRoutes().map((u) => u.record);
  }
  function b(u) {
    return !!t.getRecordMatcher(u);
  }
  function y(u, g) {
    if (g = P({}, g || l.value), typeof u == "string") {
      const w = Ne(n, u, g.path), x = t.resolve({ path: w.path }, g), Y = r.createHref(w.fullPath);
      return process.env.NODE_ENV !== "production" && (Y.startsWith("//") ? R(`Location "${u}" resolved to "${Y}". A resolved location cannot start with multiple slashes.`) : x.matched.length || R(`No match found for location with path "${u}"`)), P(w, x, {
        params: i(x.params),
        hash: oe(w.hash),
        redirectedFrom: void 0,
        href: Y
      });
    }
    process.env.NODE_ENV !== "production" && !me(u) && (R(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, u), u = {});
    let v;
    if (u.path != null)
      process.env.NODE_ENV !== "production" && "params" in u && !("name" in u) && // @ts-expect-error: the type is never
      Object.keys(u.params).length && R(`Path "${u.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), v = P({}, u, {
        path: Ne(n, u.path, g.path).path
      });
    else {
      const w = P({}, u.params);
      for (const x in w)
        w[x] == null && delete w[x];
      v = P({}, u, {
        params: f(w)
      }), g.params = f(g.params);
    }
    const _ = t.resolve(v, g), N = u.hash || "";
    process.env.NODE_ENV !== "production" && N && !N.startsWith("#") && R(`A \`hash\` should always start with the character "#". Replace "${N}" with "#${N}".`), _.params = s(i(_.params));
    const D = Cn(o, P({}, u, {
      hash: En(N),
      path: _.path
    })), S = r.createHref(D);
    return process.env.NODE_ENV !== "production" && (S.startsWith("//") ? R(`Location "${u}" resolved to "${S}". A resolved location cannot start with multiple slashes.`) : _.matched.length || R(`No match found for location with path "${u.path != null ? u.path : u}"`)), P({
      fullPath: D,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: N,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === st ? ao(u.query) : u.query || {}
      )
    }, _, {
      redirectedFrom: void 0,
      href: S
    });
  }
  function E(u) {
    return typeof u == "string" ? Ne(n, u, l.value.path) : P({}, u);
  }
  function $(u, g) {
    if (h !== u)
      return re(8, {
        from: g,
        to: u
      });
  }
  function C(u) {
    return B(u);
  }
  function M(u) {
    return C(P(E(u), { replace: !0 }));
  }
  function I(u) {
    const g = u.matched[u.matched.length - 1];
    if (g && g.redirect) {
      const { redirect: v } = g;
      let _ = typeof v == "function" ? v(u) : v;
      if (typeof _ == "string" && (_ = _.includes("?") || _.includes("#") ? _ = E(_) : (
        // force empty params
        { path: _ }
      ), _.params = {}), process.env.NODE_ENV !== "production" && _.path == null && !("name" in _))
        throw R(`Invalid redirect found:
${JSON.stringify(_, null, 2)}
 when navigating to "${u.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return P({
        query: u.query,
        hash: u.hash,
        // avoid transferring params if the redirect has a path
        params: _.path != null ? {} : u.params
      }, _);
    }
  }
  function B(u, g) {
    const v = h = y(u), _ = l.value, N = u.state, D = u.force, S = u.replace === !0, w = I(v);
    if (w)
      return B(
        P(E(w), {
          state: typeof w == "object" ? P({}, N, w.state) : N,
          force: D,
          replace: S
        }),
        // keep original redirectedFrom if it exists
        g || v
      );
    const x = v;
    x.redirectedFrom = g;
    let Y;
    return !D && Qe(o, _, v) && (Y = re(16, { to: x, from: _ }), Ge(
      _,
      _,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (Y ? Promise.resolve(Y) : Be(x, _)).catch((V) => H(V) ? (
      // navigation redirects still mark the router as ready
      H(
        V,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? V : we(V)
    ) : (
      // reject any unknown error
      be(V, x, _)
    )).then((V) => {
      if (V) {
        if (H(
          V,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          Qe(o, y(V.to), x) && // and we have done it a couple of times
          g && // @ts-expect-error: added only in dev
          (g._count = g._count ? (
            // @ts-expect-error
            g._count + 1
          ) : 1) > 30 ? (R(`Detected a possibly infinite redirection in a navigation guard when going from "${_.fullPath}" to "${x.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : B(
            // keep options
            P({
              // preserve an existing replacement but allow the redirect to override it
              replace: S
            }, E(V.to), {
              state: typeof V.to == "object" ? P({}, N, V.to.state) : N,
              force: D
            }),
            // preserve the original redirectedFrom if any
            g || x
          );
      } else
        V = qe(x, _, !0, S, N);
      return Fe(x, _, V), V;
    });
  }
  function de(u, g) {
    const v = $(u, g);
    return v ? Promise.reject(v) : Promise.resolve();
  }
  function _e(u) {
    const g = pe.values().next().value;
    return g && typeof g.runWithContext == "function" ? g.runWithContext(u) : u();
  }
  function Be(u, g) {
    let v;
    const [_, N, D] = Oo(u, g);
    v = Pe(_.reverse(), "beforeRouteLeave", u, g);
    for (const w of _)
      w.leaveGuards.forEach((x) => {
        v.push(z(x, u, g));
      });
    const S = de.bind(null, u, g);
    return v.push(S), X(v).then(() => {
      v = [];
      for (const w of c.list())
        v.push(z(w, u, g));
      return v.push(S), X(v);
    }).then(() => {
      v = Pe(N, "beforeRouteUpdate", u, g);
      for (const w of N)
        w.updateGuards.forEach((x) => {
          v.push(z(x, u, g));
        });
      return v.push(S), X(v);
    }).then(() => {
      v = [];
      for (const w of D)
        if (w.beforeEnter)
          if (L(w.beforeEnter))
            for (const x of w.beforeEnter)
              v.push(z(x, u, g));
          else
            v.push(z(w.beforeEnter, u, g));
      return v.push(S), X(v);
    }).then(() => (u.matched.forEach((w) => w.enterCallbacks = {}), v = Pe(D, "beforeRouteEnter", u, g, _e), v.push(S), X(v))).then(() => {
      v = [];
      for (const w of a.list())
        v.push(z(w, u, g));
      return v.push(S), X(v);
    }).catch((w) => H(
      w,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? w : Promise.reject(w));
  }
  function Fe(u, g, v) {
    d.list().forEach((_) => _e(() => _(u, g, v)));
  }
  function qe(u, g, v, _, N) {
    const D = $(u, g);
    if (D)
      return D;
    const S = g === K, w = G ? history.state : {};
    v && (_ || S ? r.replace(u.fullPath, P({
      scroll: S && w && w.scroll
    }, N)) : r.push(u.fullPath, N)), l.value = u, Ge(u, g, v, S), we();
  }
  let se;
  function qt() {
    se || (se = r.listen((u, g, v) => {
      if (!Ke.listening)
        return;
      const _ = y(u), N = I(_);
      if (N) {
        B(P(N, { replace: !0 }), _).catch(ce);
        return;
      }
      h = _;
      const D = l.value;
      G && Dn(Je(D.fullPath, v.delta), ye()), Be(_, D).catch((S) => H(
        S,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? S : H(
        S,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (B(
        S.to,
        _
        // avoid an uncaught rejection, let push call triggerError
      ).then((w) => {
        H(
          w,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !v.delta && v.type === ue.pop && r.go(-1, !1);
      }).catch(ce), Promise.reject()) : (v.delta && r.go(-v.delta, !1), be(S, _, D))).then((S) => {
        S = S || qe(
          // after navigation, all matched components are resolved
          _,
          D,
          !1
        ), S && (v.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !H(
          S,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-v.delta, !1) : v.type === ue.pop && H(
          S,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Fe(_, D, S);
      }).catch(ce);
    }));
  }
  let Ee = ae(), He = ae(), he;
  function be(u, g, v) {
    we(u);
    const _ = He.list();
    return _.length ? _.forEach((N) => N(u, g, v)) : (process.env.NODE_ENV !== "production" && R("uncaught error during route navigation:"), console.error(u)), Promise.reject(u);
  }
  function Ht() {
    return he && l.value !== K ? Promise.resolve() : new Promise((u, g) => {
      Ee.add([u, g]);
    });
  }
  function we(u) {
    return he || (he = !u, qt(), Ee.list().forEach(([g, v]) => u ? v(u) : g()), Ee.reset()), u;
  }
  function Ge(u, g, v, _) {
    const { scrollBehavior: N } = e;
    if (!G || !N)
      return Promise.resolve();
    const D = !v && In(Je(u.fullPath, 0)) || (_ || !v) && history.state && history.state.scroll || null;
    return zt().then(() => N(u, g, D)).then((S) => S && xn(S)).catch((S) => be(S, u, g));
  }
  const Re = (u) => r.go(u);
  let ke;
  const pe = /* @__PURE__ */ new Set(), Ke = {
    currentRoute: l,
    listening: !0,
    addRoute: p,
    removeRoute: m,
    hasRoute: b,
    getRoutes: k,
    resolve: y,
    options: e,
    push: C,
    replace: M,
    go: Re,
    back: () => Re(-1),
    forward: () => Re(1),
    beforeEach: c.add,
    beforeResolve: a.add,
    afterEach: d.add,
    onError: He.add,
    isReady: Ht,
    install(u) {
      const g = this;
      u.component("RouterLink", fo), u.component("RouterView", go), u.config.globalProperties.$router = g, Object.defineProperty(u.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => ee(l)
      }), G && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !ke && l.value === K && (ke = !0, C(r.location).catch((N) => {
        process.env.NODE_ENV !== "production" && R("Unexpected error when starting the router:", N);
      }));
      const v = {};
      for (const N in K)
        Object.defineProperty(v, N, {
          get: () => l.value[N],
          enumerable: !0
        });
      u.provide(Ue, g), u.provide($t, Kt(v)), u.provide(De, l);
      const _ = u.unmount;
      pe.add(u), u.unmount = function() {
        pe.delete(u), pe.size < 1 && (h = K, se && se(), se = null, l.value = K, ke = !1, he = !1), _();
      }, process.env.NODE_ENV !== "production" && G && _o(u, g, t);
    }
  };
  function X(u) {
    return u.reduce((g, v) => g.then(() => _e(v)), Promise.resolve());
  }
  return Ke;
}
function Oo(e, t) {
  const n = [], o = [], r = [], c = Math.max(t.matched.length, e.matched.length);
  for (let a = 0; a < c; a++) {
    const d = t.matched[a];
    d && (e.matched.find((h) => W(h, d)) ? o.push(d) : n.push(d));
    const l = e.matched[a];
    l && (t.matched.find((h) => W(h, l)) || r.push(l));
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
    }), r = await (await fetch(`${t}?${n}`)).json() ?? To, c = new Set(r);
    return Array.from(c);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, jo = async (e, t) => {
  try {
    const n = new URLSearchParams({
      searchTerm: e
    });
    return await (await fetch(`${t}?${n}`)).json();
  } catch (n) {
    console.error("An error occurred while getting filtered resources", n);
  }
}, Lo = async (e) => {
  try {
    return await (await fetch(e)).json();
  } catch (t) {
    return alert(
      "An error occurred while fetching tags" + t + "fallback to static tags"
    ), {};
  }
}, Mo = async (e) => {
  const t = await Lo(e), n = Object.keys(t).map((o) => ({
    [o]: t[o]
  }));
  return jt(n);
}, jt = (e) => e ? e.reduce(
  (t, n) => {
    const [o, r] = Object.keys(n)[0].split(":"), c = Object.values(n)[0];
    return t[o] || (t[o] = []), t[o].push({ [r.replace("_", " ")]: c }), t;
  },
  {}
) : {}, Uo = jt(xo), Bo = { class: "search-results-container" }, Fo = { class: "container-description" }, qo = { class: "label-badges" }, Ho = {
  key: 0,
  class: "results"
}, Go = ["href"], Ko = {
  key: 1,
  class: "no-results"
}, zo = /* @__PURE__ */ Q({
  __name: "DisplayResult",
  setup(e) {
    const t = q("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag", n = j([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = Ft(), r = j(""), c = j(5);
    Le(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, c.value = Number(o.currentRoute.value.query.level), await a(r.value, c.value)) : r.value = "undefined";
    });
    const a = async (d, l) => {
      const h = await Io(
        d,
        l,
        t
      );
      h && (n.value = h);
    };
    return je(o.currentRoute, async (d, l) => {
      const h = d.query.tag || "", s = l.query.tag || "";
      h !== s && await a(h, c.value);
    }), (d, l) => (A(), T("div", Bo, [
      O("div", Fo, [
        O("button", {
          onClick: l[0] || (l[0] = () => d.$router.back())
        }, "↵"),
        O("div", qo, " (" + F(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? (A(), T("div", Ho, [
        O("ul", null, [
          (A(!0), T(J, null, te(n.value, (h, s) => (A(), T("li", { key: s }, [
            O("a", {
              href: h.url,
              target: "_blank",
              class: "linkToResource"
            }, F(h.label), 9, Go)
          ]))), 128))
        ])
      ])) : (A(), T("p", Ko, "No results found"))
    ]));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Ve = /* @__PURE__ */ fe(zo, [["__scopeId", "data-v-33547b95"]]), Lt = (e) => (vt("data-v-b97c2a53"), e = e(), gt(), e), Wo = /* @__PURE__ */ Lt(() => /* @__PURE__ */ O("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }, null, -1)), Qo = /* @__PURE__ */ Lt(() => /* @__PURE__ */ O("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}, null, -1)), Yo = [
  Wo,
  Qo
], Jo = /* @__PURE__ */ Q({
  __name: "CollapseBtn",
  props: { showDropdown: Boolean },
  setup(e) {
    return (t, n) => (A(), T("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      class: ge(
        e.showDropdown ? "collapse-btn collapse-btn-rotation" : "collapse-btn"
      )
    }, Yo, 2));
  }
}), Mt = /* @__PURE__ */ fe(Jo, [["__scopeId", "data-v-b97c2a53"]]), ft = /* @__PURE__ */ Q({
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
    }, c = U(() => r[o] || "Default");
    return (a, d) => (A(), T("button", {
      class: "filter-btn",
      onClick: d[0] || (d[0] = (l) => n("click", a.actionType))
    }, F(c.value), 1));
  }
}), Ut = (e) => (vt("data-v-99d5bb92"), e = e(), gt(), e), Xo = { class: "crucible-filter-container" }, Zo = {
  key: 0,
  class: "crucible-filter-panel"
}, er = { class: "crucible-filter-action" }, tr = /* @__PURE__ */ Ut(() => /* @__PURE__ */ O("hr", null, null, -1)), nr = /* @__PURE__ */ Ut(() => /* @__PURE__ */ O("h5", null, "Selected:", -1)), or = { class: "crucible-filter-collection" }, rr = ["onClick"], sr = { class: "capital-first" }, ar = { class: "crucible-filters" }, ir = ["onClick"], cr = { class: "crucible-filter-dropdown-menu" }, lr = ["id", "value", "checked", "onClick"], ur = ["for"], fr = /* @__PURE__ */ Q({
  __name: "CrucibleFilter",
  emits: ["updateFilterTagArray", "checkTaxonomyExists"],
  setup(e, { emit: t }) {
    const n = t, o = q("$filterSetApi") || "http://localhost:8080/api/resource/getFilterSet", r = j(!1), c = j({}), a = j([]), d = j({}), l = j(!1), h = (m) => {
      c.value[m] = !c.value[m], console.log(l.value);
    }, s = (m, k) => {
      const b = `${m}:${k.replace(" ", "_")}`;
      a.value.includes(b) ? a.value = a.value.filter(
        (y) => y !== b
      ) : a.value.push(b);
    }, f = U(() => a.value.map(
      (m) => m.split(":")[1].replace("_", " ")
    )), i = () => {
      c.value = {}, a.value = [];
    }, p = () => {
      n("updateFilterTagArray", a);
    };
    return Le(async () => {
      const m = await Mo(o), k = Object.keys(m).length > 0;
      d.value = k ? m : Uo, l.value = k, n("checkTaxonomyExists", l);
    }), (m, k) => (A(), T("div", Xo, [
      r.value ? (A(), T("div", Zo, [
        O("div", er, [
          ne(ft, {
            "action-type": "apply",
            onClick: p
          }),
          ne(ft, {
            "action-type": "clear",
            onClick: i
          })
        ]),
        tr,
        nr,
        O("div", or, [
          (A(!0), T(J, null, te(a.value, (b, y) => (A(), T("span", {
            key: y,
            onClick: (E) => a.value.splice(y, 1)
          }, [
            Yt(" ☒ "),
            O("strong", null, F(b.split(":")[0]), 1),
            O("span", sr, F(b.split(":")[1].replace("_", " ")), 1)
          ], 8, rr))), 128))
        ]),
        O("div", ar, [
          (A(!0), T(J, null, te(d.value, (b, y) => (A(), T("div", {
            key: y,
            class: "crucible-filter-dropdown"
          }, [
            O("h4", {
              class: ge(c.value[y] ? "selected-background" : ""),
              onClick: (E) => h(y)
            }, [
              O("span", null, F(y), 1),
              ne(Mt, {
                "show-dropdown": c.value[y]
              }, null, 8, ["show-dropdown"])
            ], 10, ir),
            mt(O("div", cr, [
              (A(!0), T(J, null, te(b, (E, $) => (A(), T("div", {
                key: $,
                class: ge(
                  f.value.includes(Object.keys(E)[0]) ? "selected-filter-tag column" : "column"
                )
              }, [
                O("input", {
                  id: `tag-${y}-${$.toString()}`,
                  type: "checkbox",
                  value: Object.keys(E)[0],
                  checked: f.value.includes(Object.keys(E)[0]),
                  onClick: (C) => s(y, Object.keys(E)[0])
                }, null, 8, lr),
                O("label", {
                  for: `tag-${y}-${$.toString()}`
                }, [
                  O("span", null, F(Object.keys(E)[0]), 1),
                  O("span", null, " (" + F(Object.values(E)[0]) + ") ", 1)
                ], 8, ur)
              ], 2))), 128))
            ], 512), [
              [Jt, c.value[y]]
            ])
          ]))), 128))
        ])
      ])) : yt("", !0),
      O("button", {
        class: ge(
          r.value ? "crucible-filter-control svg-background-light" : "crucible-filter-control crucible-filter-control-light svg-background-dark"
        ),
        onClick: k[0] || (k[0] = (b) => r.value = !r.value)
      }, null, 2)
    ]));
  }
}), Bt = /* @__PURE__ */ fe(fr, [["__scopeId", "data-v-99d5bb92"]]), dr = { id: "app" }, hr = { class: "main" }, pr = /* @__PURE__ */ Q({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = ze("CrucibleSearch"), r = ze("RouterView");
      return A(), T("div", dr, [
        O("div", hr, [
          ne(o),
          ne(r),
          O("div", null, [
            ne(Bt)
          ])
        ])
      ]);
    };
  }
}), vr = /* @__PURE__ */ fe(pr, [["__scopeId", "data-v-aabb2d26"]]), gr = [
  { path: "/", component: vr },
  { path: "/search", component: Ve }
], mr = $o({
  history: Mn("/"),
  routes: gr
});
function Ft() {
  const e = q("$router");
  return e || mr;
}
const yr = { class: "search-container" }, _r = { key: 0 }, Er = ["onClick"], dt = 10, br = /* @__PURE__ */ Q({
  __name: "CrucibleSearch",
  props: {
    level: {
      type: Number,
      default: 5
    }
  },
  setup(e) {
    const t = Ft(), n = j(""), o = j([]), r = j([]), c = j([]), a = j(!1), d = j(null), l = q("$tagsApi") || "http://localhost:8080/api/resource/alltags", h = q("$filterResourcesApi") || "http://localhost:8080/api/resource/filterResources", s = e, { level: f } = Xt(s), i = (C) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(C.toLowerCase())
    ), p = (C) => C.replace(/_/g, " "), m = (C) => C.replace(/ /g, "_"), k = async () => {
      if (n.value) {
        o.value = (await Vo(n.value, l)).slice(0, dt);
        const C = await jo(
          n.value,
          h
        );
        o.value = o.value.map(p), r.value = C.map(
          (M) => M.item.label
        ), c.value = Array.from(
          /* @__PURE__ */ new Set([...o.value, ...r.value])
        ).slice(0, dt), a.value = !0;
      } else
        o.value = [], r.value = [], a.value = !1;
    }, b = (C) => {
      n.value = o.value.includes(C) ? C : o.value[0], a.value = !1, t.push({
        path: "/search",
        query: { tag: m(n.value), level: Number(f.value) }
      });
    }, y = () => {
      o.value.length && n.value && (a.value = !0);
    }, E = (C) => {
      C.key === "Enter" ? (b(n.value), n.value = "") : C.key === "Tab" && (C.preventDefault(), n.value = o.value[0] ?? n.value);
    }, $ = (C) => {
      d.value && !d.value.contains(C.target) && (a.value = !1);
    };
    return Le(() => {
      document.addEventListener("click", $);
    }), Zt(() => {
      document.removeEventListener("click", $);
    }), (C, M) => (A(), T("div", yr, [
      O("div", {
        ref_key: "searchBoxRef",
        ref: d,
        class: "search-container"
      }, [
        mt(O("input", {
          "onUpdate:modelValue": M[0] || (M[0] = (I) => n.value = I),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: k,
          onFocus: y,
          onKeydown: E
        }, null, 544), [
          [en, n.value]
        ]),
        c.value.length && n.value && a.value ? (A(), T("ul", _r, [
          (A(!0), T(J, null, te(c.value, (I) => (A(), T("li", {
            key: I,
            onClick: (B) => b(I)
          }, [
            (A(!0), T(J, null, te(I.split(""), (B, de) => (A(), T(J, null, [
              i(B) ? (A(), T("strong", {
                key: `strong-${de}`
              }, F(B), 1)) : (A(), T("span", { key: de }, F(B), 1))
            ], 64))), 256))
          ], 8, Er))), 128))
        ])) : yt("", !0)
      ], 512)
    ]));
  }
}), wr = /* @__PURE__ */ fe(br, [["__scopeId", "data-v-6e8e4762"]]);
function kr(e, t) {
  const { router: n, getApi: o, tagsApi: r, filterSetApi: c } = t;
  e.component("CrucibleSearch", wr), e.component("DisplayResult", Ve), e.component("CrucibleFilter", Bt), e.component("CollapseBtn", Mt), e.provide("$router", n || null), e.provide("$getApi", o || null), e.provide("$tagsApi", r || null), e.provide("$filterSetApi", c || null), n.addRoute({ path: "/search", component: Ve });
}
export {
  Mt as CollapseBtn,
  Bt as CrucibleFilter,
  wr as CrucibleSearch,
  Ve as DisplayResult,
  kr as createSearchFilterPlugin
};
