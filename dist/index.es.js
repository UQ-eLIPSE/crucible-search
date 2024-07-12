import { shallowRef as Gt, unref as Z, shallowReactive as Ft, nextTick as Kt, defineComponent as z, reactive as zt, inject as B, computed as j, h as dt, provide as Re, ref as L, watch as Ve, getCurrentInstance as ht, watchEffect as Wt, onMounted as je, openBlock as O, createElementBlock as $, createElementVNode as T, toDisplayString as M, Fragment as Y, renderList as ee, normalizeClass as Ce, pushScopeId as pt, popScopeId as gt, createVNode as te, createTextVNode as Ke, withDirectives as vt, vShow as Qt, createCommentVNode as mt, resolveComponent as ze, onUnmounted as Yt, vModelText as Jt } from "vue";
function Xt() {
  return yt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function yt() {
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
      for (const u in t.settings) {
        const d = t.settings[u];
        o[u] = d.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let i = Object.assign({}, o);
    try {
      const u = localStorage.getItem(r), d = JSON.parse(u);
      Object.assign(i, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return i;
      },
      setSettings(u) {
        try {
          localStorage.setItem(r, JSON.stringify(u));
        } catch {
        }
        i = u;
      },
      now() {
        return on();
      }
    }, n && n.on(tn, (u, d) => {
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
function sn(e, t) {
  const n = e, o = yt(), r = Xt(), i = Zt && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    r.emit(en, e, t);
  else {
    const u = i ? new rn(n, r) : null;
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
const q = typeof document < "u";
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
function k(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const _t = /#/g, cn = /&/g, ln = /\//g, un = /=/g, fn = /\?/g, Et = /\+/g, dn = /%5B/g, hn = /%5D/g, bt = /%5E/g, pn = /%60/g, wt = /%7B/g, gn = /%7C/g, Rt = /%7D/g, vn = /%20/g;
function Le(e) {
  return encodeURI("" + e).replace(gn, "|").replace(dn, "[").replace(hn, "]");
}
function mn(e) {
  return Le(e).replace(wt, "{").replace(Rt, "}").replace(bt, "^");
}
function Oe(e) {
  return Le(e).replace(Et, "%2B").replace(vn, "+").replace(_t, "%23").replace(cn, "%26").replace(pn, "`").replace(wt, "{").replace(Rt, "}").replace(bt, "^");
}
function yn(e) {
  return Oe(e).replace(un, "%3D");
}
function _n(e) {
  return Le(e).replace(_t, "%23").replace(fn, "%3F");
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
  let o, r = {}, i = "", u = "";
  const d = t.indexOf("#");
  let l = t.indexOf("?");
  return d < l && d >= 0 && (l = -1), l > -1 && (o = t.slice(0, l), i = t.slice(l + 1, d > -1 ? d : t.length), r = e(i)), d > -1 && (o = o || t.slice(0, d), u = t.slice(d, t.length)), o = Sn(o ?? t, n), {
    fullPath: o + (i && "?") + i + u,
    path: o,
    query: r,
    hash: ne(u)
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
  return o > -1 && o === r && K(t.matched[o], n.matched[r]) && kt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function K(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function kt(e, t) {
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
  let i = n.length - 1, u, d;
  for (u = 0; u < o.length; u++)
    if (d = o[u], d !== ".")
      if (d === "..")
        i > 1 && i--;
      else
        break;
  return n.slice(0, i).join("/") + "/" + o.slice(u).join("/");
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
    if (q) {
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
const ve = () => ({
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
function St(e, t) {
  const { pathname: n, search: o, hash: r } = t, i = e.indexOf("#");
  if (i > -1) {
    let d = r.includes(e.slice(i)) ? e.slice(i).length : 1, l = r.slice(d);
    return l[0] !== "/" && (l = "/" + l), We(l, "");
  }
  return We(n, e) + o + r;
}
function Dn(e, t, n, o) {
  let r = [], i = [], u = null;
  const d = ({ state: a }) => {
    const p = St(e, location), m = n.value, _ = t.value;
    let w = 0;
    if (a) {
      if (n.value = p, t.value = a, u && u === m) {
        u = null;
        return;
      }
      w = _ ? a.position - _.position : 0;
    } else
      o(p);
    r.forEach((E) => {
      E(n.value, m, {
        delta: w,
        type: ue.pop,
        direction: w ? w > 0 ? le.forward : le.back : le.unknown
      });
    });
  };
  function l() {
    u = n.value;
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
    a.state && a.replaceState(C({}, a.state, { scroll: ve() }), "");
  }
  function f() {
    for (const a of i)
      a();
    i = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
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
    scroll: r ? ve() : null
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
  function i(l, h, s) {
    const f = e.indexOf("#"), a = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + l : xn() + e + l;
    try {
      t[s ? "replaceState" : "pushState"](h, "", a), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? k("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](a);
    }
  }
  function u(l, h) {
    const s = C({}, t.state, Xe(
      r.value.back,
      // keep back and forward entries but override current position
      l,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    i(l, s, !0), o.value = l;
  }
  function d(l, h) {
    const s = C(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: l,
        scroll: ve()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && k(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), i(s.current, s, !0);
    const f = C({}, Xe(o.value, l, null), { position: s.position + 1 }, h);
    i(l, f, !1), o.value = l;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: u
  };
}
function Vn(e) {
  e = Pn(e);
  const t = In(e), n = Dn(e, t.state, t.location, t.replace);
  function o(i, u = !0) {
    u || n.pauseListeners(), history.go(i);
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
function ge(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Pt(e) {
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
  return process.env.NODE_ENV !== "production" ? C(new Error(jn[e](t)), {
    type: e,
    [Ae]: !0
  }, t) : C(new Error(), {
    type: e,
    [Ae]: !0
  }, t);
}
function H(e, t) {
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
        const { value: m, repeatable: _, optional: w, regexp: E } = a;
        i.push({
          name: m,
          repeatable: _,
          optional: w
        });
        const b = E || et;
        if (b !== et) {
          p += 10;
          try {
            new RegExp(`(${b})`);
          } catch (I) {
            throw new Error(`Invalid custom RegExp for param "${m}" (${b}): ` + I.message);
          }
        }
        let N = _ ? `((?:${b})(?:/(?:${b}))*)` : `(${b})`;
        f || (N = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        w && h.length < 2 ? `(?:/${N})` : "/" + N), w && (N += "?"), r += N, p += 20, w && (p += -8), _ && (p += -20), b === ".*" && (p += -50);
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
    const s = h.match(u), f = {};
    if (!s)
      return null;
    for (let a = 1; a < s.length; a++) {
      const p = s[a] || "", m = i[a - 1];
      f[m.name] = p && m.repeatable ? p.split("/") : p;
    }
    return f;
  }
  function l(h) {
    let s = "", f = !1;
    for (const a of e) {
      (!f || !s.endsWith("/")) && (s += "/"), f = !1;
      for (const p of a)
        if (p.type === 0)
          s += p.value;
        else if (p.type === 1) {
          const { value: m, repeatable: _, optional: w } = p, E = m in h ? h[m] : "";
          if (V(E) && !_)
            throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);
          const b = V(E) ? E.join("/") : E;
          if (!b)
            if (w)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : f = !0);
            else
              throw new Error(`Missing required param "${m}"`);
          s += b;
        }
    }
    return s || "/";
  }
  return {
    re: u,
    score: o,
    keys: i,
    parse: d,
    stringify: l
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
    const i = qn(o[n], r[n]);
    if (i)
      return i;
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
const Fn = {
  type: 0,
  value: ""
}, Kn = /[a-zA-Z0-9_]/;
function zn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Fn]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${h}": ${p}`);
  }
  let n = 0, o = n;
  const r = [];
  let i;
  function u() {
    i && r.push(i), i = [];
  }
  let d = 0, l, h = "", s = "";
  function f() {
    h && (n === 0 ? i.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (i.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), i.push({
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
        l === "/" ? (h && f(), u()) : l === ":" ? (f(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        l === "(" ? n = 2 : Kn.test(l) ? a() : (f(), n = 0, l !== "*" && l !== "?" && l !== "+" && d--);
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
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), f(), u(), r;
}
function Wn(e, t, n) {
  const o = Hn(zn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const i = /* @__PURE__ */ new Set();
    for (const u of o.keys)
      i.has(u.name) && k(`Found duplicated params with name "${u.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), i.add(u.name);
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
  t = rt({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function i(s, f, a) {
    const p = !a, m = Yn(s);
    process.env.NODE_ENV !== "production" && eo(m, f), m.aliasOf = a && a.record;
    const _ = rt(t, s), w = [
      m
    ];
    if ("alias" in s) {
      const N = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const I of N)
        w.push(C({}, m, {
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
    let E, b;
    for (const N of w) {
      const { path: I } = N;
      if (f && I[0] !== "/") {
        const W = f.record.path, U = W[W.length - 1] === "/" ? "" : "/";
        N.path = f.record.path + (I && U + I);
      }
      if (process.env.NODE_ENV !== "production" && N.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (E = Wn(N, f, _), process.env.NODE_ENV !== "production" && f && I[0] === "/" && to(E, f), a ? (a.alias.push(E), process.env.NODE_ENV !== "production" && Zn(a, E)) : (b = b || E, b !== E && b.alias.push(E), p && s.name && !ot(E) && u(s.name)), m.children) {
        const W = m.children;
        for (let U = 0; U < W.length; U++)
          i(W[U], E, a && a.children[U]);
      }
      a = a || E, (E.record.components && Object.keys(E.record.components).length || E.record.name || E.record.redirect) && l(E);
    }
    return b ? () => {
      u(b);
    } : ce;
  }
  function u(s) {
    if (Pt(s)) {
      const f = o.get(s);
      f && (o.delete(s), n.splice(n.indexOf(f), 1), f.children.forEach(u), f.alias.forEach(u));
    } else {
      const f = n.indexOf(s);
      f > -1 && (n.splice(f, 1), s.record.name && o.delete(s.record.name), s.children.forEach(u), s.alias.forEach(u));
    }
  }
  function d() {
    return n;
  }
  function l(s) {
    let f = 0;
    for (; f < n.length && Gn(s, n[f]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[f].record.path || !Ct(s, n[f])); )
      f++;
    n.splice(f, 0, s), s.record.name && !ot(s) && o.set(s.record.name, s);
  }
  function h(s, f) {
    let a, p = {}, m, _;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw oe(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const b = Object.keys(s.params || {}).filter((N) => !a.keys.find((I) => I.name === N));
        b.length && k(`Discarded invalid param(s) "${b.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      _ = a.record.name, p = C(
        // paramsFromLocation is a new object
        nt(
          f.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          a.keys.filter((b) => !b.optional).concat(a.parent ? a.parent.keys.filter((b) => b.optional) : []).map((b) => b.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && nt(s.params, a.keys.map((b) => b.name))
      ), m = a.stringify(p);
    } else if (s.path != null)
      m = s.path, process.env.NODE_ENV !== "production" && !m.startsWith("/") && k(`The Matcher cannot resolve relative paths but received "${m}". Unless you directly called \`matcher.resolve("${m}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), a = n.find((b) => b.re.test(m)), a && (p = a.parse(m), _ = a.record.name);
    else {
      if (a = f.name ? o.get(f.name) : n.find((b) => b.re.test(f.path)), !a)
        throw oe(1, {
          location: s,
          currentLocation: f
        });
      _ = a.record.name, p = C({}, f.params, s.params), m = a.stringify(p);
    }
    const w = [];
    let E = a;
    for (; E; )
      w.unshift(E.record), E = E.parent;
    return {
      name: _,
      path: m,
      params: p,
      matched: w,
      meta: Xn(w)
    };
  }
  return e.forEach((s) => i(s)), { addRoute: i, resolve: h, removeRoute: u, getRoutes: d, getRecordMatcher: r };
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
  return e.reduce((t, n) => C(t, n.meta), {});
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
    const i = o[r].replace(Et, " "), u = i.indexOf("="), d = ne(u < 0 ? i : i.slice(0, u)), l = u < 0 ? null : ne(i.slice(u + 1));
    if (d in t) {
      let h = t[d];
      V(h) || (h = t[d] = [h]), h.push(l);
    } else
      t[d] = l;
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
const ro = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), at = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Me = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Nt = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), xe = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
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
function F(e, t, n, o, r, i = (u) => u()) {
  const u = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((d, l) => {
    const h = (a) => {
      a === !1 ? l(oe(4, {
        from: n,
        to: t
      })) : a instanceof Error ? l(a) : ge(a) ? l(oe(2, {
        from: t,
        to: a
      })) : (u && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === u && typeof a == "function" && u.push(a), d());
    }, s = i(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? so(h, t, n) : h));
    let f = Promise.resolve(s);
    if (e.length < 3 && (f = f.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        f = f.then((p) => h._called ? p : (k(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        k(a), l(new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((a) => l(a));
  });
}
function so(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && k(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Pe(e, t, n, o, r = (i) => i()) {
  const i = [];
  for (const u of e) {
    process.env.NODE_ENV !== "production" && !u.components && !u.children.length && k(`Record with path "${u.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in u.components) {
      let l = u.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!l || typeof l != "object" && typeof l != "function")
          throw k(`Component "${d}" in record with path "${u.path}" is not a valid component. Received "${String(l)}".`), new Error("Invalid route component");
        if ("then" in l) {
          k(`Component "${d}" in record with path "${u.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = l;
          l = () => h;
        } else
          l.__asyncLoader && // warn only once per component
          !l.__warnedDefineAsync && (l.__warnedDefineAsync = !0, k(`Component "${d}" in record with path "${u.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !u.instances[d]))
        if (ao(l)) {
          const s = (l.__vccOpts || l)[t];
          s && i.push(F(s, n, o, u, d, r));
        } else {
          let h = l();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (k(`Component "${d}" in record with path "${u.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), i.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${u.path}"`));
            const f = an(s) ? s.default : s;
            u.components[d] = f;
            const p = (f.__vccOpts || f)[t];
            return p && F(p, n, o, u, d, r)();
          }));
        }
    }
  }
  return i;
}
function ao(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function it(e) {
  const t = B(Me), n = B(Nt);
  let o = !1, r = null;
  const i = j(() => {
    const s = Z(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (ge(s) || (o ? k(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : k(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), u = j(() => {
    const { matched: s } = i.value, { length: f } = s, a = s[f - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const m = p.findIndex(K.bind(null, a));
    if (m > -1)
      return m;
    const _ = ct(s[f - 2]);
    return (
      // we are dealing with nested routes
      f > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      ct(a) === _ && // avoid comparing the child with its parent
      p[p.length - 1].path !== _ ? p.findIndex(K.bind(null, s[f - 2])) : m
    );
  }), d = j(() => u.value > -1 && uo(n.params, i.value.params)), l = j(() => u.value > -1 && u.value === n.matched.length - 1 && kt(n.params, i.value.params));
  function h(s = {}) {
    return lo(s) ? t[Z(e.replace) ? "replace" : "push"](
      Z(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ce) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && q) {
    const s = ht();
    if (s) {
      const f = {
        route: i.value,
        isActive: d.value,
        isExactActive: l.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(f), Wt(() => {
        f.route = i.value, f.isActive = d.value, f.isExactActive = l.value, f.error = ge(Z(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: i,
    href: j(() => i.value.href),
    isActive: d,
    isExactActive: l,
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
  useLink: it,
  setup(e, { slots: t }) {
    const n = zt(it(e)), { options: o } = B(Me), r = j(() => ({
      [lt(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [lt(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const i = t.default && t.default(n);
      return e.custom ? i : dt("a", {
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
    } else if (!V(r) || r.length !== o.length || o.some((i, u) => i !== r[u]))
      return !1;
  }
  return !0;
}
function ct(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const lt = (e, t, n) => e ?? t ?? n, fo = /* @__PURE__ */ z({
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
    const o = B(xe), r = j(() => e.route || o.value), i = B(at, 0), u = j(() => {
      let h = Z(i);
      const { matched: s } = r.value;
      let f;
      for (; (f = s[h]) && !f.components; )
        h++;
      return h;
    }), d = j(() => r.value.matched[u.value]);
    Re(at, j(() => u.value + 1)), Re(ro, d), Re(xe, r);
    const l = L();
    return Ve(() => [l.value, d.value, e.name], ([h, s, f], [a, p, m]) => {
      s && (s.instances[f] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !K(s, p) || !a) && (s.enterCallbacks[f] || []).forEach((_) => _(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, f = d.value, a = f && f.components[s];
      if (!a)
        return ut(n.default, { Component: a, route: h });
      const p = f.props[s], m = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, w = dt(a, C({}, m, t, {
        onVnodeUnmounted: (E) => {
          E.component.isUnmounted && (f.instances[s] = null);
        },
        ref: l
      }));
      if (process.env.NODE_ENV !== "production" && q && w.ref) {
        const E = {
          depth: u.value,
          name: f.name,
          path: f.path,
          meta: f.meta
        };
        (V(w.ref) ? w.ref.map((N) => N.i) : [w.ref.i]).forEach((N) => {
          N.__vrv_devtools = E;
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
  const e = ht(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
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
  const n = C({}, e, {
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
          backgroundColor: Ot
        });
      }
      V(f.__vrl_devtools) && (f.__devtoolsApi = r, f.__vrl_devtools.forEach((a) => {
        let p = a.route.path, m = Tt, _ = "", w = 0;
        a.error ? (p = a.error, m = bo, w = wo) : a.isExactActive ? (m = At, _ = "This is exactly active") : a.isActive && (m = $t, _ = "This link is active"), s.tags.push({
          label: p,
          textColor: w,
          tooltip: _,
          backgroundColor: m
        });
      }));
    }), Ve(t.currentRoute, () => {
      l(), r.notifyComponentUpdate(), r.sendInspectorTree(d), r.sendInspectorState(d);
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
    let u = 0;
    t.beforeEach((s, f) => {
      const a = {
        guard: pe("beforeEach"),
        from: ie(f, "Current Location during this navigation"),
        to: ie(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: u++
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
    function l() {
      if (!h)
        return;
      const s = h;
      let f = n.getRoutes().filter((a) => !a.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !a.parent.record.components);
      f.forEach(It), s.filter && (f = f.filter((a) => (
        // save matches state based on the payload
        De(a, s.filter.toLowerCase())
      ))), f.forEach((a) => Dt(a, t.currentRoute.value)), s.rootNodes = f.map(xt);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && l();
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
const Ot = 15485081, $t = 2450411, At = 8702998, _o = 2282478, Tt = 16486972, Eo = 6710886, bo = 16704226, wo = 12131356;
function xt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: _o
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Tt
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Ot
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: At
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: $t
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
    children: e.children.map(xt)
  };
}
let Ro = 0;
const ko = /^\/(.*)\/([a-z]*)$/;
function Dt(e, t) {
  const n = t.matched.length && K(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => K(o, e.record))), e.children.forEach((o) => Dt(o, t));
}
function It(e) {
  e.__vd_match = !1, e.children.forEach(It);
}
function De(e, t) {
  const n = String(e.re).match(ko);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((u) => De(u, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), i = ne(r);
  return !t.startsWith("/") && (i.includes(t) || r.includes(t)) || i.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((u) => De(u, t));
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
  const i = ae(), u = ae(), d = ae(), l = Gt(G);
  let h = G;
  q && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = ke.bind(null, (c) => "" + c), f = ke.bind(null, En), a = (
    // @ts-expect-error: intentionally avoid the type check
    ke.bind(null, ne)
  );
  function p(c, v) {
    let g, y;
    return Pt(c) ? (g = t.getRecordMatcher(c), process.env.NODE_ENV !== "production" && !g && k(`Parent route "${String(c)}" not found when adding child route`, v), y = v) : y = c, t.addRoute(y, g);
  }
  function m(c) {
    const v = t.getRecordMatcher(c);
    v ? t.removeRoute(v) : process.env.NODE_ENV !== "production" && k(`Cannot remove non-existent route "${String(c)}"`);
  }
  function _() {
    return t.getRoutes().map((c) => c.record);
  }
  function w(c) {
    return !!t.getRecordMatcher(c);
  }
  function E(c, v) {
    if (v = C({}, v || l.value), typeof c == "string") {
      const R = Se(n, c, v.path), A = t.resolve({ path: R.path }, v), Q = r.createHref(R.fullPath);
      return process.env.NODE_ENV !== "production" && (Q.startsWith("//") ? k(`Location "${c}" resolved to "${Q}". A resolved location cannot start with multiple slashes.`) : A.matched.length || k(`No match found for location with path "${c}"`)), C(R, A, {
        params: a(A.params),
        hash: ne(R.hash),
        redirectedFrom: void 0,
        href: Q
      });
    }
    process.env.NODE_ENV !== "production" && !ge(c) && (k(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, c), c = {});
    let g;
    if (c.path != null)
      process.env.NODE_ENV !== "production" && "params" in c && !("name" in c) && // @ts-expect-error: the type is never
      Object.keys(c.params).length && k(`Path "${c.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), g = C({}, c, {
        path: Se(n, c.path, v.path).path
      });
    else {
      const R = C({}, c.params);
      for (const A in R)
        R[A] == null && delete R[A];
      g = C({}, c, {
        params: f(R)
      }), v.params = f(v.params);
    }
    const y = t.resolve(g, v), P = c.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && k(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), y.params = s(a(y.params));
    const x = Rn(o, C({}, c, {
      hash: mn(P),
      path: y.path
    })), S = r.createHref(x);
    return process.env.NODE_ENV !== "production" && (S.startsWith("//") ? k(`Location "${c}" resolved to "${S}". A resolved location cannot start with multiple slashes.`) : y.matched.length || k(`No match found for location with path "${c.path != null ? c.path : c}"`)), C({
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
        o === st ? oo(c.query) : c.query || {}
      )
    }, y, {
      redirectedFrom: void 0,
      href: S
    });
  }
  function b(c) {
    return typeof c == "string" ? Se(n, c, l.value.path) : C({}, c);
  }
  function N(c, v) {
    if (h !== c)
      return oe(8, {
        from: v,
        to: c
      });
  }
  function I(c) {
    return re(c);
  }
  function W(c) {
    return I(C(b(c), { replace: !0 }));
  }
  function U(c) {
    const v = c.matched[c.matched.length - 1];
    if (v && v.redirect) {
      const { redirect: g } = v;
      let y = typeof g == "function" ? g(c) : g;
      if (typeof y == "string" && (y = y.includes("?") || y.includes("#") ? y = b(y) : (
        // force empty params
        { path: y }
      ), y.params = {}), process.env.NODE_ENV !== "production" && y.path == null && !("name" in y))
        throw k(`Invalid redirect found:
${JSON.stringify(y, null, 2)}
 when navigating to "${c.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return C({
        query: c.query,
        hash: c.hash,
        // avoid transferring params if the redirect has a path
        params: y.path != null ? {} : c.params
      }, y);
    }
  }
  function re(c, v) {
    const g = h = E(c), y = l.value, P = c.state, x = c.force, S = c.replace === !0, R = U(g);
    if (R)
      return re(
        C(b(R), {
          state: typeof R == "object" ? C({}, P, R.state) : P,
          force: x,
          replace: S
        }),
        // keep original redirectedFrom if it exists
        v || g
      );
    const A = g;
    A.redirectedFrom = v;
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
    )), (Q ? Promise.resolve(Q) : Be(A, y)).catch((D) => H(D) ? (
      // navigation redirects still mark the router as ready
      H(
        D,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? D : Ee(D)
    ) : (
      // reject any unknown error
      _e(D, A, y)
    )).then((D) => {
      if (D) {
        if (H(
          D,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          Qe(o, E(D.to), A) && // and we have done it a couple of times
          v && // @ts-expect-error: added only in dev
          (v._count = v._count ? (
            // @ts-expect-error
            v._count + 1
          ) : 1) > 30 ? (k(`Detected a possibly infinite redirection in a navigation guard when going from "${y.fullPath}" to "${A.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : re(
            // keep options
            C({
              // preserve an existing replacement but allow the redirect to override it
              replace: S
            }, b(D.to), {
              state: typeof D.to == "object" ? C({}, P, D.to.state) : P,
              force: x
            }),
            // preserve the original redirectedFrom if any
            v || A
          );
      } else
        D = He(A, y, !0, S, P);
      return Ue(A, y, D), D;
    });
  }
  function Ut(c, v) {
    const g = N(c, v);
    return g ? Promise.reject(g) : Promise.resolve();
  }
  function me(c) {
    const v = he.values().next().value;
    return v && typeof v.runWithContext == "function" ? v.runWithContext(c) : c();
  }
  function Be(c, v) {
    let g;
    const [y, P, x] = Co(c, v);
    g = Pe(y.reverse(), "beforeRouteLeave", c, v);
    for (const R of y)
      R.leaveGuards.forEach((A) => {
        g.push(F(A, c, v));
      });
    const S = Ut.bind(null, c, v);
    return g.push(S), J(g).then(() => {
      g = [];
      for (const R of i.list())
        g.push(F(R, c, v));
      return g.push(S), J(g);
    }).then(() => {
      g = Pe(P, "beforeRouteUpdate", c, v);
      for (const R of P)
        R.updateGuards.forEach((A) => {
          g.push(F(A, c, v));
        });
      return g.push(S), J(g);
    }).then(() => {
      g = [];
      for (const R of x)
        if (R.beforeEnter)
          if (V(R.beforeEnter))
            for (const A of R.beforeEnter)
              g.push(F(A, c, v));
          else
            g.push(F(R.beforeEnter, c, v));
      return g.push(S), J(g);
    }).then(() => (c.matched.forEach((R) => R.enterCallbacks = {}), g = Pe(x, "beforeRouteEnter", c, v, me), g.push(S), J(g))).then(() => {
      g = [];
      for (const R of u.list())
        g.push(F(R, c, v));
      return g.push(S), J(g);
    }).catch((R) => H(
      R,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? R : Promise.reject(R));
  }
  function Ue(c, v, g) {
    d.list().forEach((y) => me(() => y(c, v, g)));
  }
  function He(c, v, g, y, P) {
    const x = N(c, v);
    if (x)
      return x;
    const S = v === G, R = q ? history.state : {};
    g && (y || S ? r.replace(c.fullPath, C({
      scroll: S && R && R.scroll
    }, P)) : r.push(c.fullPath, P)), l.value = c, Ge(c, v, g, S), Ee();
  }
  let se;
  function Ht() {
    se || (se = r.listen((c, v, g) => {
      if (!Fe.listening)
        return;
      const y = E(c), P = U(y);
      if (P) {
        re(C(P, { replace: !0 }), y).catch(ce);
        return;
      }
      h = y;
      const x = l.value;
      q && An(Je(x.fullPath, g.delta), ve()), Be(y, x).catch((S) => H(
        S,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? S : H(
        S,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (re(
        S.to,
        y
        // avoid an uncaught rejection, let push call triggerError
      ).then((R) => {
        H(
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
        !H(
          S,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-g.delta, !1) : g.type === ue.pop && H(
          S,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Ue(y, x, S);
      }).catch(ce);
    }));
  }
  let ye = ae(), qe = ae(), de;
  function _e(c, v, g) {
    Ee(c);
    const y = qe.list();
    return y.length ? y.forEach((P) => P(c, v, g)) : (process.env.NODE_ENV !== "production" && k("uncaught error during route navigation:"), console.error(c)), Promise.reject(c);
  }
  function qt() {
    return de && l.value !== G ? Promise.resolve() : new Promise((c, v) => {
      ye.add([c, v]);
    });
  }
  function Ee(c) {
    return de || (de = !c, Ht(), ye.list().forEach(([v, g]) => c ? g(c) : v()), ye.reset()), c;
  }
  function Ge(c, v, g, y) {
    const { scrollBehavior: P } = e;
    if (!q || !P)
      return Promise.resolve();
    const x = !g && Tn(Je(c.fullPath, 0)) || (y || !g) && history.state && history.state.scroll || null;
    return Kt().then(() => P(c, v, x)).then((S) => S && $n(S)).catch((S) => _e(S, c, v));
  }
  const be = (c) => r.go(c);
  let we;
  const he = /* @__PURE__ */ new Set(), Fe = {
    currentRoute: l,
    listening: !0,
    addRoute: p,
    removeRoute: m,
    hasRoute: w,
    getRoutes: _,
    resolve: E,
    options: e,
    push: I,
    replace: W,
    go: be,
    back: () => be(-1),
    forward: () => be(1),
    beforeEach: i.add,
    beforeResolve: u.add,
    afterEach: d.add,
    onError: qe.add,
    isReady: qt,
    install(c) {
      const v = this;
      c.component("RouterLink", co), c.component("RouterView", ho), c.config.globalProperties.$router = v, Object.defineProperty(c.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Z(l)
      }), q && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !we && l.value === G && (we = !0, I(r.location).catch((P) => {
        process.env.NODE_ENV !== "production" && k("Unexpected error when starting the router:", P);
      }));
      const g = {};
      for (const P in G)
        Object.defineProperty(g, P, {
          get: () => l.value[P],
          enumerable: !0
        });
      c.provide(Me, v), c.provide(Nt, Ft(g)), c.provide(xe, l);
      const y = c.unmount;
      he.add(c), c.unmount = function() {
        he.delete(c), he.size < 1 && (h = G, se && se(), se = null, l.value = G, we = !1, de = !1), y();
      }, process.env.NODE_ENV !== "production" && q && vo(c, v, t);
    }
  };
  function J(c) {
    return c.reduce((v, g) => v.then(() => me(g)), Promise.resolve());
  }
  return Fe;
}
function Co(e, t) {
  const n = [], o = [], r = [], i = Math.max(t.matched.length, e.matched.length);
  for (let u = 0; u < i; u++) {
    const d = t.matched[u];
    d && (e.matched.find((h) => K(h, d)) ? o.push(d) : n.push(d));
    const l = e.matched[u];
    l && (t.matched.find((h) => K(h, l)) || r.push(l));
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
    ), [];
  }
}, Io = async (e) => {
  const t = await Do(e);
  return Vt(t);
}, Vt = (e) => e ? e.reduce(
  (t, n) => {
    const [o, r] = Object.keys(n)[0].split(":"), i = Object.values(n)[0];
    return t[o] || (t[o] = []), t[o].push({ [r.replace("_", " ")]: i }), t;
  },
  {}
) : {}, Vo = Vt($o), jo = { class: "search-results-container" }, Lo = { class: "container-description" }, Mo = { class: "label-badges" }, Bo = {
  key: 0,
  class: "results"
}, Uo = ["href"], Ho = {
  key: 1,
  class: "no-results"
}, qo = /* @__PURE__ */ z({
  __name: "DisplayResult",
  setup(e) {
    const t = B("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("Retrieving data from:", t);
    const n = L([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = Bt(), r = L("");
    je(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, await i(r.value)) : r.value = "undefined";
    });
    const i = async (u) => {
      const d = await To(u, t);
      d && (n.value = d);
    };
    return Ve(o.currentRoute, async (u, d) => {
      const l = u.query.tag || "", h = d.query.tag || "";
      l !== h && await i(l);
    }), (u, d) => (O(), $("div", jo, [
      T("div", Lo, [
        T("button", {
          onClick: d[0] || (d[0] = () => u.$router.back())
        }, "↵"),
        T("div", Mo, " (" + M(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? (O(), $("div", Bo, [
        T("ul", null, [
          (O(!0), $(Y, null, ee(n.value, (l, h) => (O(), $("li", { key: h }, [
            T("a", {
              href: l.url,
              target: "_blank",
              class: "linkToResource"
            }, M(l.label), 9, Uo)
          ]))), 128))
        ])
      ])) : (O(), $("p", Ho, "No results found"))
    ]));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Ie = /* @__PURE__ */ fe(qo, [["__scopeId", "data-v-ae262433"]]), jt = (e) => (pt("data-v-b97c2a53"), e = e(), gt(), e), Go = /* @__PURE__ */ jt(() => /* @__PURE__ */ T("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }, null, -1)), Fo = /* @__PURE__ */ jt(() => /* @__PURE__ */ T("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}, null, -1)), Ko = [
  Go,
  Fo
], zo = /* @__PURE__ */ z({
  __name: "CollapseBtn",
  props: { showDropdown: Boolean },
  setup(e) {
    return (t, n) => (O(), $("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      class: Ce(
        e.showDropdown ? "collapse-btn collapse-btn-rotation" : "collapse-btn"
      )
    }, Ko, 2));
  }
}), Lt = /* @__PURE__ */ fe(zo, [["__scopeId", "data-v-b97c2a53"]]), ft = /* @__PURE__ */ z({
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
    return (u, d) => (O(), $("button", {
      class: "filter-btn",
      onClick: d[0] || (d[0] = (l) => n("click", u.actionType))
    }, M(i.value), 1));
  }
}), Wo = (e) => (pt("data-v-8ce161ff"), e = e(), gt(), e), Qo = { class: "crucible-filter-container" }, Yo = {
  key: 0,
  class: "crucible-filter-panel"
}, Jo = { class: "crucible-filter-action" }, Xo = /* @__PURE__ */ Wo(() => /* @__PURE__ */ T("hr", null, null, -1)), Zo = { class: "crucible-filter-collection" }, er = ["onClick"], tr = { class: "capital-first" }, nr = { class: "crucible-filters" }, or = ["onClick"], rr = { class: "row crucible-filter-dropdown-menu" }, sr = ["onClick"], ar = /* @__PURE__ */ z({
  __name: "CrucibleFilter",
  setup(e) {
    const t = B("$filterSetApi") || "http://localhost:8080/api/resource/getFilterSet", n = B("$filterDataApi") || "http://localhost:8080/api/resource/getFilterData", o = L(!1), r = L({}), i = L([]), u = L({}), d = (a) => {
      r.value[a] = !r.value[a];
    }, l = (a, p) => {
      const m = `${a}:${p.replace(" ", "_")}`;
      i.value.includes(m) ? i.value = i.value.filter(
        (_) => _ !== m
      ) : i.value.push(m);
    }, h = j(() => i.value.map(
      (a) => a.split(":")[1].replace("_", " ")
    )), s = () => {
      r.value = {}, i.value = [];
    }, f = () => {
      console.log(n), console.log("Applying the filter", i);
    };
    return je(async () => {
      const a = await Io(t);
      u.value = Object.keys(a).length > 0 ? a : Vo;
    }), (a, p) => (O(), $("div", Qo, [
      o.value ? (O(), $("div", Yo, [
        T("div", Jo, [
          te(ft, {
            "action-type": "apply",
            onClick: f
          }),
          te(ft, {
            "action-type": "clear",
            onClick: s
          })
        ]),
        Xo,
        T("div", Zo, [
          (O(!0), $(Y, null, ee(i.value, (m, _) => (O(), $("span", {
            key: _,
            onClick: (w) => i.value.splice(_, 1)
          }, [
            Ke(" ☒ "),
            T("strong", null, M(m.split(":")[0]), 1),
            T("span", tr, M(m.split(":")[1].replace("_", " ")), 1)
          ], 8, er))), 128))
        ]),
        T("div", nr, [
          (O(!0), $(Y, null, ee(u.value, (m, _) => (O(), $("div", {
            key: _,
            class: "crucible-filter-dropdown"
          }, [
            T("h4", {
              onClick: (w) => d(_)
            }, [
              T("span", null, M(_), 1),
              te(Lt, {
                "show-dropdown": r.value[_]
              }, null, 8, ["show-dropdown"])
            ], 8, or),
            vt(T("div", rr, [
              (O(!0), $(Y, null, ee(m, (w, E) => (O(), $("div", {
                key: E,
                class: Ce(
                  h.value.includes(Object.keys(w)[0]) ? "selected-filter-tag column" : "column"
                ),
                onClick: (b) => l(_, Object.keys(w)[0])
              }, [
                Ke(M(Object.keys(w)[0]) + " ", 1),
                T("span", null, "(" + M(Object.values(w)[0]) + ")", 1)
              ], 10, sr))), 128))
            ], 512), [
              [Qt, r.value[_]]
            ])
          ]))), 128))
        ])
      ])) : mt("", !0),
      T("button", {
        class: Ce(
          o.value ? "crucible-filter-control svg-background-light" : "crucible-filter-control crucible-filter-control-light svg-background-dark"
        ),
        onClick: p[0] || (p[0] = (m) => o.value = !o.value)
      }, null, 2)
    ]));
  }
}), Mt = /* @__PURE__ */ fe(ar, [["__scopeId", "data-v-8ce161ff"]]), ir = { id: "app" }, cr = { class: "main" }, lr = /* @__PURE__ */ z({
  __name: "App",
  setup(e) {
    return (t, n) => {
      const o = ze("CrucibleSearch"), r = ze("RouterView");
      return O(), $("div", ir, [
        T("div", cr, [
          te(o),
          te(r),
          T("div", null, [
            te(Mt)
          ])
        ])
      ]);
    };
  }
}), ur = /* @__PURE__ */ fe(lr, [["__scopeId", "data-v-aabb2d26"]]), fr = [
  { path: "/", component: ur },
  { path: "/search", component: Ie }
], dr = Po({
  history: Vn("/"),
  routes: fr
});
function Bt() {
  const e = B("$router");
  return e || dr;
}
const hr = { class: "search-container" }, pr = { key: 0 }, gr = ["onClick"], vr = 10, mr = /* @__PURE__ */ z({
  __name: "CrucibleSearch",
  setup(e) {
    const t = Bt(), n = L(""), o = L([]), r = L(!1), i = L(null), u = B("$tagsApi") || "http://localhost:8080/api/resource/alltags", d = (_) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(_.toLowerCase())
    ), l = (_) => _.replace(/_/g, " "), h = (_) => _.replace(/ /g, "_"), s = async () => {
      n.value ? (o.value = (await xo(n.value, u)).slice(0, vr), o.value = o.value.map(l), r.value = !0) : (o.value = [], r.value = !1);
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
    }), (_, w) => (O(), $("div", hr, [
      T("div", {
        ref_key: "searchBoxRef",
        ref: i,
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
        o.value.length && n.value && r.value ? (O(), $("ul", pr, [
          (O(!0), $(Y, null, ee(o.value, (E) => (O(), $("li", {
            key: E,
            onClick: (b) => f(E)
          }, [
            (O(!0), $(Y, null, ee(E.split(""), (b, N) => (O(), $(Y, null, [
              d(b) ? (O(), $("strong", {
                key: `strong-${N}`
              }, M(b), 1)) : (O(), $("span", { key: N }, M(b), 1))
            ], 64))), 256))
          ], 8, gr))), 128))
        ])) : mt("", !0)
      ], 512)
    ]));
  }
}), yr = /* @__PURE__ */ fe(mr, [["__scopeId", "data-v-5cb7fe60"]]);
function Er(e, t) {
  const { router: n, getApi: o, tagsApi: r, filterSetApi: i, filterDataApi: u } = t;
  e.component("CrucibleSearch", yr), e.component("DisplayResult", Ie), e.component("CrucibleFilter", Mt), e.component("CollapseBtn", Lt), e.provide("$router", n), e.provide("$getApi", o), e.provide("$tagsApi", r), e.provide("$tagsApi", i), e.provide("$filterDataApi", u), n.addRoute({ path: "/search", component: Ie });
}
export {
  Lt as CollapseBtn,
  Mt as CrucibleFilter,
  yr as CrucibleSearch,
  Ie as DisplayResult,
  Er as createSearchPlugin
};
