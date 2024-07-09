import { shallowRef as xt, unref as Y, shallowReactive as Dt, nextTick as It, defineComponent as de, reactive as Vt, inject as q, computed as V, h as ct, provide as Ee, ref as z, watch as xe, getCurrentInstance as lt, watchEffect as jt, onMounted as ut, openBlock as x, createElementBlock as D, createElementVNode as W, toDisplayString as ue, Fragment as le, renderList as ke, resolveComponent as He, createVNode as Ge, onUnmounted as Lt, withDirectives as Mt, vModelText as Ut, createCommentVNode as Bt } from "vue";
function qt() {
  return ft().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function ft() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Ht = typeof Proxy == "function", Gt = "devtools-plugin:setup", Kt = "plugin:settings:set";
let F, Se;
function Wt() {
  var e;
  return F !== void 0 || (typeof window < "u" && window.performance ? (F = !0, Se = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (F = !0, Se = globalThis.perf_hooks.performance) : F = !1), F;
}
function zt() {
  return Wt() ? Se.now() : Date.now();
}
class Qt {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const u in t.settings) {
        const d = t.settings[u];
        o[u] = d.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let f = Object.assign({}, o);
    try {
      const u = localStorage.getItem(r), d = JSON.parse(u);
      Object.assign(f, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return f;
      },
      setSettings(u) {
        try {
          localStorage.setItem(r, JSON.stringify(u));
        } catch {
        }
        f = u;
      },
      now() {
        return zt();
      }
    }, n && n.on(Kt, (u, d) => {
      u === this.plugin.id && this.fallbacks.setSettings(d);
    }), this.proxiedOn = new Proxy({}, {
      get: (u, d) => this.target ? this.target.on[d] : (...c) => {
        this.onQueue.push({
          method: d,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (u, d) => this.target ? this.target[d] : d === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(d) ? (...c) => (this.targetQueue.push({
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
function Ft(e, t) {
  const n = e, o = ft(), r = qt(), f = Ht && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !f))
    r.emit(Gt, e, t);
  else {
    const u = f ? new Qt(n, r) : null;
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
const M = typeof document < "u";
function Yt(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const N = Object.assign;
function be(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = I(r) ? r.map(e) : e(r);
  }
  return n;
}
const oe = () => {
}, I = Array.isArray;
function w(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const dt = /#/g, Jt = /&/g, Xt = /\//g, Zt = /=/g, en = /\?/g, ht = /\+/g, tn = /%5B/g, nn = /%5D/g, pt = /%5E/g, on = /%60/g, mt = /%7B/g, rn = /%7C/g, gt = /%7D/g, sn = /%20/g;
function De(e) {
  return encodeURI("" + e).replace(rn, "|").replace(tn, "[").replace(nn, "]");
}
function an(e) {
  return De(e).replace(mt, "{").replace(gt, "}").replace(pt, "^");
}
function Pe(e) {
  return De(e).replace(ht, "%2B").replace(sn, "+").replace(dt, "%23").replace(Jt, "%26").replace(on, "`").replace(mt, "{").replace(gt, "}").replace(pt, "^");
}
function cn(e) {
  return Pe(e).replace(Zt, "%3D");
}
function ln(e) {
  return De(e).replace(dt, "%23").replace(en, "%3F");
}
function un(e) {
  return e == null ? "" : ln(e).replace(Xt, "%2F");
}
function J(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && w(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const fn = /\/$/, dn = (e) => e.replace(fn, "");
function we(e, t, n = "/") {
  let o, r = {}, f = "", u = "";
  const d = t.indexOf("#");
  let c = t.indexOf("?");
  return d < c && d >= 0 && (c = -1), c > -1 && (o = t.slice(0, c), f = t.slice(c + 1, d > -1 ? d : t.length), r = e(f)), d > -1 && (o = o || t.slice(0, d), u = t.slice(d, t.length)), o = mn(o ?? t, n), {
    fullPath: o + (f && "?") + f + u,
    path: o,
    query: r,
    hash: J(u)
  };
}
function hn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Ke(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function We(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && H(t.matched[o], n.matched[r]) && vt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function H(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function vt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!pn(e[n], t[n]))
      return !1;
  return !0;
}
function pn(e, t) {
  return I(e) ? ze(e, t) : I(t) ? ze(t, e) : e === t;
}
function ze(e, t) {
  return I(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function mn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return w(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let f = n.length - 1, u, d;
  for (u = 0; u < o.length; u++)
    if (d = o[u], d !== ".")
      if (d === "..")
        f > 1 && f--;
      else
        break;
  return n.slice(0, f).join("/") + "/" + o.slice(u).join("/");
}
var se;
(function(e) {
  e.pop = "pop", e.push = "push";
})(se || (se = {}));
var re;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(re || (re = {}));
function gn(e) {
  if (!e)
    if (M) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), dn(e);
}
const vn = /^[^#]+#/;
function yn(e, t) {
  return e.replace(vn, "#") + t;
}
function _n(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const he = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function En(e) {
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
    t = _n(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Qe(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ne = /* @__PURE__ */ new Map();
function bn(e, t) {
  Ne.set(e, t);
}
function wn(e) {
  const t = Ne.get(e);
  return Ne.delete(e), t;
}
let Rn = () => location.protocol + "//" + location.host;
function yt(e, t) {
  const { pathname: n, search: o, hash: r } = t, f = e.indexOf("#");
  if (f > -1) {
    let d = r.includes(e.slice(f)) ? e.slice(f).length : 1, c = r.slice(d);
    return c[0] !== "/" && (c = "/" + c), Ke(c, "");
  }
  return Ke(n, e) + o + r;
}
function kn(e, t, n, o) {
  let r = [], f = [], u = null;
  const d = ({ state: a }) => {
    const p = yt(e, location), y = n.value, S = t.value;
    let k = 0;
    if (a) {
      if (n.value = p, t.value = a, u && u === y) {
        u = null;
        return;
      }
      k = S ? a.position - S.position : 0;
    } else
      o(p);
    r.forEach((_) => {
      _(n.value, y, {
        delta: k,
        type: se.pop,
        direction: k ? k > 0 ? re.forward : re.back : re.unknown
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
    return f.push(p), p;
  }
  function s() {
    const { history: a } = window;
    a.state && a.replaceState(N({}, a.state, { scroll: he() }), "");
  }
  function l() {
    for (const a of f)
      a();
    f = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: c,
    listen: h,
    destroy: l
  };
}
function Fe(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? he() : null
  };
}
function Sn(e) {
  const { history: t, location: n } = window, o = {
    value: yt(e, n)
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
    const l = e.indexOf("#"), a = l > -1 ? (n.host && document.querySelector("base") ? e : e.slice(l)) + c : Rn() + e + c;
    try {
      t[s ? "replaceState" : "pushState"](h, "", a), r.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? w("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](a);
    }
  }
  function u(c, h) {
    const s = N({}, t.state, Fe(
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
        scroll: he()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && w(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), f(s.current, s, !0);
    const l = N({}, Fe(o.value, c, null), { position: s.position + 1 }, h);
    f(c, l, !1), o.value = c;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: u
  };
}
function Pn(e) {
  e = gn(e);
  const t = Sn(e), n = kn(e, t.state, t.location, t.replace);
  function o(f, u = !0) {
    u || n.pauseListeners(), history.go(f);
  }
  const r = N({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: yn.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function fe(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function _t(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const U = {
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
const Nn = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Cn(t)}" via a navigation guard.`;
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
  return process.env.NODE_ENV !== "production" ? N(new Error(Nn[e](t)), {
    type: e,
    [Oe]: !0
  }, t) : N(new Error(), {
    type: e,
    [Oe]: !0
  }, t);
}
function L(e, t) {
  return e instanceof Error && Oe in e && (t == null || !!(e.type & t));
}
const On = ["params", "query", "hash"];
function Cn(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of On)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Je = "[^/]+?", $n = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, An = /[.+*?^${}()[\]/\\]/g;
function Tn(e, t) {
  const n = N({}, $n, t), o = [];
  let r = n.start ? "^" : "";
  const f = [];
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
        l || (r += "/"), r += a.value.replace(An, "\\$&"), p += 40;
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
          } catch (T) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${E}): ` + T.message);
          }
        }
        let C = S ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        l || (C = // avoid an optional / if there are more segments e.g. /:p?-static
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
  const u = new RegExp(r, n.sensitive ? "" : "i");
  function d(h) {
    const s = h.match(u), l = {};
    if (!s)
      return null;
    for (let a = 1; a < s.length; a++) {
      const p = s[a] || "", y = f[a - 1];
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
          const { value: y, repeatable: S, optional: k } = p, _ = y in h ? h[y] : "";
          if (I(_) && !S)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const E = I(_) ? _.join("/") : _;
          if (!E)
            if (k)
              a.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : l = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          s += E;
        }
    }
    return s || "/";
  }
  return {
    re: u,
    score: o,
    keys: f,
    parse: d,
    stringify: c
  };
}
function xn(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function Dn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const f = xn(o[n], r[n]);
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
}, Vn = /[a-zA-Z0-9_]/;
function jn(e) {
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
  function u() {
    f && r.push(f), f = [];
  }
  let d = 0, c, h = "", s = "";
  function l() {
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
        c === "/" ? (h && l(), u()) : c === ":" ? (l(), n = 1) : a();
        break;
      case 4:
        a(), n = o;
        break;
      case 1:
        c === "(" ? n = 2 : Vn.test(c) ? a() : (l(), n = 0, c !== "*" && c !== "?" && c !== "+" && d--);
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
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), l(), u(), r;
}
function Ln(e, t, n) {
  const o = Tn(jn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const f = /* @__PURE__ */ new Set();
    for (const u of o.keys)
      f.has(u.name) && w(`Found duplicated params with name "${u.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), f.add(u.name);
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
function Mn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = tt({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function f(s, l, a) {
    const p = !a, y = Un(s);
    process.env.NODE_ENV !== "production" && Gn(y, l), y.aliasOf = a && a.record;
    const S = tt(t, s), k = [
      y
    ];
    if ("alias" in s) {
      const C = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const T of C)
        k.push(N({}, y, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: a ? a.record.components : y.components,
          path: T,
          // we might be the child of an alias
          aliasOf: a ? a.record : y
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let _, E;
    for (const C of k) {
      const { path: T } = C;
      if (l && T[0] !== "/") {
        const G = l.record.path, j = G[G.length - 1] === "/" ? "" : "/";
        C.path = l.record.path + (T && j + T);
      }
      if (process.env.NODE_ENV !== "production" && C.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (_ = Ln(C, l, S), process.env.NODE_ENV !== "production" && l && T[0] === "/" && Kn(_, l), a ? (a.alias.push(_), process.env.NODE_ENV !== "production" && Hn(a, _)) : (E = E || _, E !== _ && E.alias.push(_), p && s.name && !et(_) && u(s.name)), y.children) {
        const G = y.children;
        for (let j = 0; j < G.length; j++)
          f(G[j], _, a && a.children[j]);
      }
      a = a || _, (_.record.components && Object.keys(_.record.components).length || _.record.name || _.record.redirect) && c(_);
    }
    return E ? () => {
      u(E);
    } : oe;
  }
  function u(s) {
    if (_t(s)) {
      const l = o.get(s);
      l && (o.delete(s), n.splice(n.indexOf(l), 1), l.children.forEach(u), l.alias.forEach(u));
    } else {
      const l = n.indexOf(s);
      l > -1 && (n.splice(l, 1), s.record.name && o.delete(s.record.name), s.children.forEach(u), s.alias.forEach(u));
    }
  }
  function d() {
    return n;
  }
  function c(s) {
    let l = 0;
    for (; l < n.length && Dn(s, n[l]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[l].record.path || !Et(s, n[l])); )
      l++;
    n.splice(l, 0, s), s.record.name && !et(s) && o.set(s.record.name, s);
  }
  function h(s, l) {
    let a, p = {}, y, S;
    if ("name" in s && s.name) {
      if (a = o.get(s.name), !a)
        throw X(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const E = Object.keys(s.params || {}).filter((C) => !a.keys.find((T) => T.name === C));
        E.length && w(`Discarded invalid param(s) "${E.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      S = a.record.name, p = N(
        // paramsFromLocation is a new object
        Ze(
          l.params,
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
      if (a = l.name ? o.get(l.name) : n.find((E) => E.re.test(l.path)), !a)
        throw X(1, {
          location: s,
          currentLocation: l
        });
      S = a.record.name, p = N({}, l.params, s.params), y = a.stringify(p);
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
      meta: qn(k)
    };
  }
  return e.forEach((s) => f(s)), { addRoute: f, resolve: h, removeRoute: u, getRoutes: d, getRecordMatcher: r };
}
function Ze(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Un(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Bn(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Bn(e) {
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
function qn(e) {
  return e.reduce((t, n) => N(t, n.meta), {});
}
function tt(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function Ce(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function Hn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Ce.bind(null, n)))
      return w(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Ce.bind(null, n)))
      return w(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Gn(e, t) {
  t && t.record.name && !e.name && !e.path && w(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Kn(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Ce.bind(null, n)))
      return w(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Et(e, t) {
  return t.children.some((n) => n === e || Et(e, n));
}
function Wn(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const f = o[r].replace(ht, " "), u = f.indexOf("="), d = J(u < 0 ? f : f.slice(0, u)), c = u < 0 ? null : J(f.slice(u + 1));
    if (d in t) {
      let h = t[d];
      I(h) || (h = t[d] = [h]), h.push(c);
    } else
      t[d] = c;
  }
  return t;
}
function nt(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = cn(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (I(o) ? o.map((f) => f && Pe(f)) : [o && Pe(o)]).forEach((f) => {
      f !== void 0 && (t += (t.length ? "&" : "") + n, f != null && (t += "=" + f));
    });
  }
  return t;
}
function zn(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = I(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const Qn = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), ot = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Ie = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), bt = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), $e = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function te() {
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
function B(e, t, n, o, r, f = (u) => u()) {
  const u = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((d, c) => {
    const h = (a) => {
      a === !1 ? c(X(4, {
        from: n,
        to: t
      })) : a instanceof Error ? c(a) : fe(a) ? c(X(2, {
        from: t,
        to: a
      })) : (u && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === u && typeof a == "function" && u.push(a), d());
    }, s = f(() => e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? Fn(h, t, n) : h));
    let l = Promise.resolve(s);
    if (e.length < 3 && (l = l.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof s == "object" && "then" in s)
        l = l.then((p) => h._called ? p : (w(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (s !== void 0 && !h._called) {
        w(a), c(new Error("Invalid navigation guard"));
        return;
      }
    }
    l.catch((a) => c(a));
  });
}
function Fn(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && w(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Re(e, t, n, o, r = (f) => f()) {
  const f = [];
  for (const u of e) {
    process.env.NODE_ENV !== "production" && !u.components && !u.children.length && w(`Record with path "${u.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in u.components) {
      let c = u.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!c || typeof c != "object" && typeof c != "function")
          throw w(`Component "${d}" in record with path "${u.path}" is not a valid component. Received "${String(c)}".`), new Error("Invalid route component");
        if ("then" in c) {
          w(`Component "${d}" in record with path "${u.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = c;
          c = () => h;
        } else
          c.__asyncLoader && // warn only once per component
          !c.__warnedDefineAsync && (c.__warnedDefineAsync = !0, w(`Component "${d}" in record with path "${u.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !u.instances[d]))
        if (Yn(c)) {
          const s = (c.__vccOpts || c)[t];
          s && f.push(B(s, n, o, u, d, r));
        } else {
          let h = c();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (w(`Component "${d}" in record with path "${u.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), f.push(() => h.then((s) => {
            if (!s)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${u.path}"`));
            const l = Yt(s) ? s.default : s;
            u.components[d] = l;
            const p = (l.__vccOpts || l)[t];
            return p && B(p, n, o, u, d, r)();
          }));
        }
    }
  }
  return f;
}
function Yn(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function rt(e) {
  const t = q(Ie), n = q(bt);
  let o = !1, r = null;
  const f = V(() => {
    const s = Y(e.to);
    return process.env.NODE_ENV !== "production" && (!o || s !== r) && (fe(s) || (o ? w(`Invalid value for prop "to" in useLink()
- to:`, s, `
- previous to:`, r, `
- props:`, e) : w(`Invalid value for prop "to" in useLink()
- to:`, s, `
- props:`, e)), r = s, o = !0), t.resolve(s);
  }), u = V(() => {
    const { matched: s } = f.value, { length: l } = s, a = s[l - 1], p = n.matched;
    if (!a || !p.length)
      return -1;
    const y = p.findIndex(H.bind(null, a));
    if (y > -1)
      return y;
    const S = st(s[l - 2]);
    return (
      // we are dealing with nested routes
      l > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      st(a) === S && // avoid comparing the child with its parent
      p[p.length - 1].path !== S ? p.findIndex(H.bind(null, s[l - 2])) : y
    );
  }), d = V(() => u.value > -1 && eo(n.params, f.value.params)), c = V(() => u.value > -1 && u.value === n.matched.length - 1 && vt(n.params, f.value.params));
  function h(s = {}) {
    return Zn(s) ? t[Y(e.replace) ? "replace" : "push"](
      Y(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(oe) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && M) {
    const s = lt();
    if (s) {
      const l = {
        route: f.value,
        isActive: d.value,
        isExactActive: c.value,
        error: null
      };
      s.__vrl_devtools = s.__vrl_devtools || [], s.__vrl_devtools.push(l), jt(() => {
        l.route = f.value, l.isActive = d.value, l.isExactActive = c.value, l.error = fe(Y(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: f,
    href: V(() => f.value.href),
    isActive: d,
    isExactActive: c,
    navigate: h
  };
}
const Jn = /* @__PURE__ */ de({
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
    const n = Vt(rt(e)), { options: o } = q(Ie), r = V(() => ({
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
}), Xn = Jn;
function Zn(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function eo(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!I(r) || r.length !== o.length || o.some((f, u) => f !== r[u]))
      return !1;
  }
  return !0;
}
function st(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const at = (e, t, n) => e ?? t ?? n, to = /* @__PURE__ */ de({
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
    process.env.NODE_ENV !== "production" && oo();
    const o = q($e), r = V(() => e.route || o.value), f = q(ot, 0), u = V(() => {
      let h = Y(f);
      const { matched: s } = r.value;
      let l;
      for (; (l = s[h]) && !l.components; )
        h++;
      return h;
    }), d = V(() => r.value.matched[u.value]);
    Ee(ot, V(() => u.value + 1)), Ee(Qn, d), Ee($e, r);
    const c = z();
    return xe(() => [c.value, d.value, e.name], ([h, s, l], [a, p, y]) => {
      s && (s.instances[l] = h, p && p !== s && h && h === a && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !H(s, p) || !a) && (s.enterCallbacks[l] || []).forEach((S) => S(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, l = d.value, a = l && l.components[s];
      if (!a)
        return it(n.default, { Component: a, route: h });
      const p = l.props[s], y = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, k = ct(a, N({}, y, t, {
        onVnodeUnmounted: (_) => {
          _.component.isUnmounted && (l.instances[s] = null);
        },
        ref: c
      }));
      if (process.env.NODE_ENV !== "production" && M && k.ref) {
        const _ = {
          depth: u.value,
          name: l.name,
          path: l.path,
          meta: l.meta
        };
        (I(k.ref) ? k.ref.map((C) => C.i) : [k.ref.i]).forEach((C) => {
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
const no = to;
function oo() {
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
function ne(e, t) {
  const n = N({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => mo(o, ["instances", "children", "aliasOf"]))
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
function ce(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let ro = 0;
function so(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = ro++;
  Ft({
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
        value: ne(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: l }) => {
      if (l.__vrv_devtools) {
        const a = l.__vrv_devtools;
        s.tags.push({
          label: (a.name ? `${a.name.toString()}: ` : "") + a.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: wt
        });
      }
      I(l.__vrl_devtools) && (l.__devtoolsApi = r, l.__vrl_devtools.forEach((a) => {
        let p = a.route.path, y = St, S = "", k = 0;
        a.error ? (p = a.error, y = uo, k = fo) : a.isExactActive ? (y = kt, S = "This is exactly active") : a.isActive && (y = Rt, S = "This link is active"), s.tags.push({
          label: p,
          textColor: k,
          tooltip: S,
          backgroundColor: y
        });
      }));
    }), xe(t.currentRoute, () => {
      c(), r.notifyComponentUpdate(), r.sendInspectorTree(d), r.sendInspectorState(d);
    });
    const f = "router:navigations:" + o;
    r.addTimelineLayer({
      id: f,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((s, l) => {
      r.addTimelineEvent({
        layerId: f,
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
        guard: ce("beforeEach"),
        from: ne(l, "Current Location during this navigation"),
        to: ne(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: u++
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
    }), t.afterEach((s, l, a) => {
      const p = {
        guard: ce("afterEach")
      };
      a ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: a ? a.message : "",
          tooltip: "Navigation Failure",
          value: a
        }
      }, p.status = ce("❌")) : p.status = ce("✅"), p.from = ne(l, "Current Location during this navigation"), p.to = ne(s, "Target location"), r.addTimelineEvent({
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
      let l = n.getRoutes().filter((a) => !a.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !a.parent.record.components);
      l.forEach(Ot), s.filter && (l = l.filter((a) => (
        // save matches state based on the payload
        Ae(a, s.filter.toLowerCase())
      ))), l.forEach((a) => Nt(a, t.currentRoute.value)), s.rootNodes = l.map(Pt);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && c();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === d) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        a && (s.state = {
          options: io(a)
        });
      }
    }), r.sendInspectorTree(d), r.sendInspectorState(d);
  });
}
function ao(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function io(e) {
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
        display: e.keys.map((o) => `${o.name}${ao(o)}`).join(" "),
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
const wt = 15485081, Rt = 2450411, kt = 8702998, co = 2282478, St = 16486972, lo = 6710886, uo = 16704226, fo = 12131356;
function Pt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: co
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: St
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: wt
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: kt
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: Rt
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: lo
  });
  let o = n.__vd_id;
  return o == null && (o = String(ho++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Pt)
  };
}
let ho = 0;
const po = /^\/(.*)\/([a-z]*)$/;
function Nt(e, t) {
  const n = t.matched.length && H(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => H(o, e.record))), e.children.forEach((o) => Nt(o, t));
}
function Ot(e) {
  e.__vd_match = !1, e.children.forEach(Ot);
}
function Ae(e, t) {
  const n = String(e.re).match(po);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((u) => Ae(u, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), f = J(r);
  return !t.startsWith("/") && (f.includes(t) || r.includes(t)) || f.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((u) => Ae(u, t));
}
function mo(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function go(e) {
  const t = Mn(e.routes, e), n = e.parseQuery || Wn, o = e.stringifyQuery || nt, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const f = te(), u = te(), d = te(), c = xt(U);
  let h = U;
  M && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = be.bind(null, (i) => "" + i), l = be.bind(null, un), a = (
    // @ts-expect-error: intentionally avoid the type check
    be.bind(null, J)
  );
  function p(i, g) {
    let m, v;
    return _t(i) ? (m = t.getRecordMatcher(i), process.env.NODE_ENV !== "production" && !m && w(`Parent route "${String(i)}" not found when adding child route`, g), v = g) : v = i, t.addRoute(v, m);
  }
  function y(i) {
    const g = t.getRecordMatcher(i);
    g ? t.removeRoute(g) : process.env.NODE_ENV !== "production" && w(`Cannot remove non-existent route "${String(i)}"`);
  }
  function S() {
    return t.getRoutes().map((i) => i.record);
  }
  function k(i) {
    return !!t.getRecordMatcher(i);
  }
  function _(i, g) {
    if (g = N({}, g || c.value), typeof i == "string") {
      const b = we(n, i, g.path), O = t.resolve({ path: b.path }, g), K = r.createHref(b.fullPath);
      return process.env.NODE_ENV !== "production" && (K.startsWith("//") ? w(`Location "${i}" resolved to "${K}". A resolved location cannot start with multiple slashes.`) : O.matched.length || w(`No match found for location with path "${i}"`)), N(b, O, {
        params: a(O.params),
        hash: J(b.hash),
        redirectedFrom: void 0,
        href: K
      });
    }
    process.env.NODE_ENV !== "production" && !fe(i) && (w(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, i), i = {});
    let m;
    if (i.path != null)
      process.env.NODE_ENV !== "production" && "params" in i && !("name" in i) && // @ts-expect-error: the type is never
      Object.keys(i.params).length && w(`Path "${i.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), m = N({}, i, {
        path: we(n, i.path, g.path).path
      });
    else {
      const b = N({}, i.params);
      for (const O in b)
        b[O] == null && delete b[O];
      m = N({}, i, {
        params: l(b)
      }), g.params = l(g.params);
    }
    const v = t.resolve(m, g), P = i.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && w(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), v.params = s(a(v.params));
    const $ = hn(o, N({}, i, {
      hash: an(P),
      path: v.path
    })), R = r.createHref($);
    return process.env.NODE_ENV !== "production" && (R.startsWith("//") ? w(`Location "${i}" resolved to "${R}". A resolved location cannot start with multiple slashes.`) : v.matched.length || w(`No match found for location with path "${i.path != null ? i.path : i}"`)), N({
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
        o === nt ? zn(i.query) : i.query || {}
      )
    }, v, {
      redirectedFrom: void 0,
      href: R
    });
  }
  function E(i) {
    return typeof i == "string" ? we(n, i, c.value.path) : N({}, i);
  }
  function C(i, g) {
    if (h !== i)
      return X(8, {
        from: g,
        to: i
      });
  }
  function T(i) {
    return Z(i);
  }
  function G(i) {
    return T(N(E(i), { replace: !0 }));
  }
  function j(i) {
    const g = i.matched[i.matched.length - 1];
    if (g && g.redirect) {
      const { redirect: m } = g;
      let v = typeof m == "function" ? m(i) : m;
      if (typeof v == "string" && (v = v.includes("?") || v.includes("#") ? v = E(v) : (
        // force empty params
        { path: v }
      ), v.params = {}), process.env.NODE_ENV !== "production" && v.path == null && !("name" in v))
        throw w(`Invalid redirect found:
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
  function Z(i, g) {
    const m = h = _(i), v = c.value, P = i.state, $ = i.force, R = i.replace === !0, b = j(m);
    if (b)
      return Z(
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
    let K;
    return !$ && We(o, v, m) && (K = X(16, { to: O, from: v }), Be(
      v,
      v,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (K ? Promise.resolve(K) : je(O, v)).catch((A) => L(A) ? (
      // navigation redirects still mark the router as ready
      L(
        A,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? A : ve(A)
    ) : (
      // reject any unknown error
      ge(A, O, v)
    )).then((A) => {
      if (A) {
        if (L(
          A,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          We(o, _(A.to), O) && // and we have done it a couple of times
          g && // @ts-expect-error: added only in dev
          (g._count = g._count ? (
            // @ts-expect-error
            g._count + 1
          ) : 1) > 30 ? (w(`Detected a possibly infinite redirection in a navigation guard when going from "${v.fullPath}" to "${O.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : Z(
            // keep options
            N({
              // preserve an existing replacement but allow the redirect to override it
              replace: R
            }, E(A.to), {
              state: typeof A.to == "object" ? N({}, P, A.to.state) : P,
              force: $
            }),
            // preserve the original redirectedFrom if any
            g || O
          );
      } else
        A = Me(O, v, !0, R, P);
      return Le(O, v, A), A;
    });
  }
  function $t(i, g) {
    const m = C(i, g);
    return m ? Promise.reject(m) : Promise.resolve();
  }
  function pe(i) {
    const g = ie.values().next().value;
    return g && typeof g.runWithContext == "function" ? g.runWithContext(i) : i();
  }
  function je(i, g) {
    let m;
    const [v, P, $] = vo(i, g);
    m = Re(v.reverse(), "beforeRouteLeave", i, g);
    for (const b of v)
      b.leaveGuards.forEach((O) => {
        m.push(B(O, i, g));
      });
    const R = $t.bind(null, i, g);
    return m.push(R), Q(m).then(() => {
      m = [];
      for (const b of f.list())
        m.push(B(b, i, g));
      return m.push(R), Q(m);
    }).then(() => {
      m = Re(P, "beforeRouteUpdate", i, g);
      for (const b of P)
        b.updateGuards.forEach((O) => {
          m.push(B(O, i, g));
        });
      return m.push(R), Q(m);
    }).then(() => {
      m = [];
      for (const b of $)
        if (b.beforeEnter)
          if (I(b.beforeEnter))
            for (const O of b.beforeEnter)
              m.push(B(O, i, g));
          else
            m.push(B(b.beforeEnter, i, g));
      return m.push(R), Q(m);
    }).then(() => (i.matched.forEach((b) => b.enterCallbacks = {}), m = Re($, "beforeRouteEnter", i, g, pe), m.push(R), Q(m))).then(() => {
      m = [];
      for (const b of u.list())
        m.push(B(b, i, g));
      return m.push(R), Q(m);
    }).catch((b) => L(
      b,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? b : Promise.reject(b));
  }
  function Le(i, g, m) {
    d.list().forEach((v) => pe(() => v(i, g, m)));
  }
  function Me(i, g, m, v, P) {
    const $ = C(i, g);
    if ($)
      return $;
    const R = g === U, b = M ? history.state : {};
    m && (v || R ? r.replace(i.fullPath, N({
      scroll: R && b && b.scroll
    }, P)) : r.push(i.fullPath, P)), c.value = i, Be(i, g, m, R), ve();
  }
  let ee;
  function At() {
    ee || (ee = r.listen((i, g, m) => {
      if (!qe.listening)
        return;
      const v = _(i), P = j(v);
      if (P) {
        Z(N(P, { replace: !0 }), v).catch(oe);
        return;
      }
      h = v;
      const $ = c.value;
      M && bn(Qe($.fullPath, m.delta), he()), je(v, $).catch((R) => L(
        R,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? R : L(
        R,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (Z(
        R.to,
        v
        // avoid an uncaught rejection, let push call triggerError
      ).then((b) => {
        L(
          b,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !m.delta && m.type === se.pop && r.go(-1, !1);
      }).catch(oe), Promise.reject()) : (m.delta && r.go(-m.delta, !1), ge(R, v, $))).then((R) => {
        R = R || Me(
          // after navigation, all matched components are resolved
          v,
          $,
          !1
        ), R && (m.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !L(
          R,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-m.delta, !1) : m.type === se.pop && L(
          R,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Le(v, $, R);
      }).catch(oe);
    }));
  }
  let me = te(), Ue = te(), ae;
  function ge(i, g, m) {
    ve(i);
    const v = Ue.list();
    return v.length ? v.forEach((P) => P(i, g, m)) : (process.env.NODE_ENV !== "production" && w("uncaught error during route navigation:"), console.error(i)), Promise.reject(i);
  }
  function Tt() {
    return ae && c.value !== U ? Promise.resolve() : new Promise((i, g) => {
      me.add([i, g]);
    });
  }
  function ve(i) {
    return ae || (ae = !i, At(), me.list().forEach(([g, m]) => i ? m(i) : g()), me.reset()), i;
  }
  function Be(i, g, m, v) {
    const { scrollBehavior: P } = e;
    if (!M || !P)
      return Promise.resolve();
    const $ = !m && wn(Qe(i.fullPath, 0)) || (v || !m) && history.state && history.state.scroll || null;
    return It().then(() => P(i, g, $)).then((R) => R && En(R)).catch((R) => ge(R, i, g));
  }
  const ye = (i) => r.go(i);
  let _e;
  const ie = /* @__PURE__ */ new Set(), qe = {
    currentRoute: c,
    listening: !0,
    addRoute: p,
    removeRoute: y,
    hasRoute: k,
    getRoutes: S,
    resolve: _,
    options: e,
    push: T,
    replace: G,
    go: ye,
    back: () => ye(-1),
    forward: () => ye(1),
    beforeEach: f.add,
    beforeResolve: u.add,
    afterEach: d.add,
    onError: Ue.add,
    isReady: Tt,
    install(i) {
      const g = this;
      i.component("RouterLink", Xn), i.component("RouterView", no), i.config.globalProperties.$router = g, Object.defineProperty(i.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Y(c)
      }), M && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !_e && c.value === U && (_e = !0, T(r.location).catch((P) => {
        process.env.NODE_ENV !== "production" && w("Unexpected error when starting the router:", P);
      }));
      const m = {};
      for (const P in U)
        Object.defineProperty(m, P, {
          get: () => c.value[P],
          enumerable: !0
        });
      i.provide(Ie, g), i.provide(bt, Dt(m)), i.provide($e, c);
      const v = i.unmount;
      ie.add(i), i.unmount = function() {
        ie.delete(i), ie.size < 1 && (h = U, ee && ee(), ee = null, c.value = U, _e = !1, ae = !1), v();
      }, process.env.NODE_ENV !== "production" && M && so(i, g, t);
    }
  };
  function Q(i) {
    return i.reduce((g, m) => g.then(() => pe(m)), Promise.resolve());
  }
  return qe;
}
function vo(e, t) {
  const n = [], o = [], r = [], f = Math.max(t.matched.length, e.matched.length);
  for (let u = 0; u < f; u++) {
    const d = t.matched[u];
    d && (e.matched.find((h) => H(h, d)) ? o.push(d) : n.push(d));
    const c = e.matched[u];
    c && (t.matched.find((h) => H(h, c)) || r.push(c));
  }
  return [n, o, r];
}
const yo = [
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
], _o = ["VET2011"], Eo = async (e, t) => {
  try {
    return await (await fetch(
      t + "?" + new URLSearchParams({ tag: e })
    )).json();
  } catch (n) {
    console.error("Error fetching data from the server", n), alert("Error fetching data from the server, only display test data.");
  }
}, bo = async (e, t) => {
  try {
    return await Eo(e, t) || yo.filter(
      (o) => o.tags.join(",").includes(e)
    );
  } catch {
    return [];
  }
}, wo = async (e, t) => {
  try {
    const n = new URLSearchParams({
      tag: e
    }), r = await (await fetch(`${t}?${n}`)).json() ?? _o, f = new Set(r);
    return Array.from(f);
  } catch (n) {
    return console.error("An error occurred while fetching tags", n), [];
  }
}, Ro = { class: "search-results-container" }, ko = { class: "container-description" }, So = { class: "label-badges" }, Po = {
  key: 0,
  class: "results"
}, No = ["href"], Oo = {
  key: 1,
  class: "no-results"
}, Co = /* @__PURE__ */ de({
  __name: "DisplayResult",
  setup(e) {
    const t = q("$getApi") ?? "http://localhost:8080/api/resource/getResultByQueryTag";
    console.info("%cRetrieving data from:", "color: skyblue;", t);
    const n = z([
      { _id: "", label: "", tags: [""], url: "" }
    ]), o = Ct(), r = z("");
    ut(async () => {
      o ? (r.value = o.currentRoute.value.query.tag, await f(r.value)) : r.value = "undefined";
    });
    const f = async (u) => {
      const d = await bo(u, t);
      d && (n.value = d);
    };
    return xe(o.currentRoute, async (u, d) => {
      const c = u.query.tag || "", h = d.query.tag || "";
      c !== h && await f(c);
    }), (u, d) => (x(), D("div", Ro, [
      W("div", ko, [
        W("button", {
          onClick: d[0] || (d[0] = () => u.$router.back())
        }, "↵"),
        W("div", So, " (" + ue(n.value.length) + " records in total) ", 1)
      ]),
      n.value.length ? (x(), D("div", Po, [
        W("ul", null, [
          (x(!0), D(le, null, ke(n.value, (c, h) => (x(), D("li", { key: h }, [
            W("a", {
              href: c.url,
              target: "_blank",
              class: "linkToResource"
            }, ue(c.label), 9, No)
          ]))), 128))
        ])
      ])) : (x(), D("p", Oo, "No results found"))
    ]));
  }
}), Ve = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
<<<<<<< Updated upstream
}, Te = /* @__PURE__ */ Ve(Co, [["__scopeId", "data-v-8413d12c"]]), $o = {}, Ao = { id: "app" };
function To(e, t) {
  const n = He("CrucibleSearch"), o = He("RouterView");
  return x(), D("div", Ao, [
    Ge(n),
    Ge(o)
  ]);
}
const xo = /* @__PURE__ */ Ve($o, [["render", To]]), Do = [
  { path: "/", component: xo },
  { path: "/search", component: Te }
], Io = go({
  history: Pn("/"),
  routes: Do
=======
}, De = /* @__PURE__ */ Le(Do, [["__scopeId", "data-v-8413d12c"]]), ee = (e) => (qt("data-v-b782ead9"), e = e(), Ht(), e), Io = /* @__PURE__ */ ee(() => /* @__PURE__ */ O("h1", null, "This is a Filter", -1)), Vo = { class: "container" }, jo = /* @__PURE__ */ Bt('<input id="All" type="radio" name="categories" value="All" checked data-v-b782ead9><input id="CSS" type="radio" name="categories" value="CSS" data-v-b782ead9><input id="JavaScript" type="radio" name="categories" value="JavaScript" data-v-b782ead9><input id="jQuery" type="radio" name="categories" value="jQuery" data-v-b782ead9><input id="WordPress" type="radio" name="categories" value="WordPress" data-v-b782ead9><input id="Slider" type="radio" name="categories" value="Slider" data-v-b782ead9><input id="fullPage.js" type="radio" name="categories" value="fullPage.js" data-v-b782ead9>', 7), Lo = { class: "filters" }, Mo = /* @__PURE__ */ ee(() => /* @__PURE__ */ O("div", { class: "dropdown" }, [
  /* @__PURE__ */ O("label", { for: "All" }, "All")
], -1)), Uo = { class: "dropdown" }, Bo = {
  key: 0,
  class: "dropdown-menu"
}, qo = /* @__PURE__ */ ee(() => /* @__PURE__ */ O("li", null, "Vet2011", -1)), Ho = /* @__PURE__ */ ee(() => /* @__PURE__ */ O("li", null, "Vet2012", -1)), Go = [
  qo,
  Ho
], Ko = /* @__PURE__ */ ee(() => /* @__PURE__ */ O("div", null, [
  /* @__PURE__ */ O("label", { for: "JavaScript" }, "Topic"),
  /* @__PURE__ */ O("ol", null, [
    /* @__PURE__ */ O("li", null, "Physiology")
  ])
], -1)), Wo = /* @__PURE__ */ ee(() => /* @__PURE__ */ O("div", null, [
  /* @__PURE__ */ O("label", { for: "jQuery" }, "Animals"),
  /* @__PURE__ */ O("ol", null, [
    /* @__PURE__ */ O("li", null, "Horse")
  ])
], -1)), Qo = /* @__PURE__ */ Z({
  __name: "CrucibleFilter",
  setup(e) {
    const t = H(!1), n = () => {
      console.log("toggleDropdown"), t.value = !t.value, console.log(t.value);
    };
    return (o, r) => (T(), x(se, null, [
      Io,
      O("div", Vo, [
        jo,
        O("div", Lo, [
          Mo,
          O("div", Uo, [
            O("label", {
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
>>>>>>> Stashed changes
});
function Ct() {
  const e = q("$router");
  return e || Io;
}
const Vo = { class: "search-container" }, jo = { key: 0 }, Lo = ["onClick"], Mo = 10, Uo = /* @__PURE__ */ de({
  __name: "CrucibleSearch",
  setup(e) {
    const t = Ct(), n = z(""), o = z([]), r = z(!1), f = z(null), u = q("$tagsApi") || "http://localhost:8080/api/resource/alltags", d = (p) => (
      // for the highlighting of the <strong> elements for the dropdown menu
      n.value.toLowerCase().includes(p.toLowerCase())
    ), c = async () => {
      n.value ? (o.value = (await wo(n.value, u)).slice(0, Mo), r.value = !0) : (o.value = [], r.value = !1);
    }, h = (p) => {
      n.value = o.value.includes(p) ? p : o.value[0], r.value = !1, t.push({ path: "/search", query: { tag: n.value } });
    }, s = () => {
      o.value.length && n.value && (r.value = !0);
    }, l = (p) => {
      p.key === "Enter" ? (h(n.value), n.value = "") : p.key === "Tab" && (p.preventDefault(), n.value = o.value[0] ?? n.value);
    }, a = (p) => {
      f.value && !f.value.contains(p.target) && (r.value = !1);
    };
    return ut(() => {
      document.addEventListener("click", a);
    }), Lt(() => {
      document.removeEventListener("click", a);
    }), (p, y) => (x(), D("div", Vo, [
      W("div", {
        ref_key: "searchBoxRef",
        ref: f,
        class: "search-container"
      }, [
        Mt(W("input", {
          "onUpdate:modelValue": y[0] || (y[0] = (S) => n.value = S),
          type: "text",
          placeholder: "search for topic and courses",
          onInput: c,
          onFocus: s,
          onKeydown: l
        }, null, 544), [
          [Ut, n.value]
        ]),
        o.value.length && n.value && r.value ? (x(), D("ul", jo, [
          (x(!0), D(le, null, ke(o.value, (S) => (x(), D("li", {
            key: S,
            onClick: (k) => h(S)
          }, [
            (x(!0), D(le, null, ke(S.split(""), (k, _) => (x(), D(le, null, [
              d(k) ? (x(), D("strong", {
                key: `strong-${_}`
              }, ue(k), 1)) : (x(), D("span", { key: _ }, ue(k), 1))
            ], 64))), 256))
          ], 8, Lo))), 128))
        ])) : Bt("", !0)
      ], 512)
    ]));
  }
}), Bo = /* @__PURE__ */ Ve(Uo, [["__scopeId", "data-v-3a7ef61b"]]);
function Ho(e, t) {
  const { router: n, getApi: o, tagsApi: r } = t;
  e.component("CrucibleSearch", Bo), e.component("DisplayResult", Te), e.provide("$router", n), e.provide("$getApi", o), e.provide("$tagsApi", r), n.addRoute({ path: "/search", component: Te });
}
export {
  Bo as CrucibleSearch,
  Te as DisplayResult,
  Ho as createSearchPlugin
};
