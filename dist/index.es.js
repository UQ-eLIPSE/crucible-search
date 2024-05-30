import { shallowRef as Tt, unref as F, shallowReactive as Vt, nextTick as xt, defineComponent as le, reactive as It, inject as K, computed as x, h as ct, provide as ve, ref as Se, watch as Ae, getCurrentInstance as lt, watchEffect as Dt, onMounted as Mt, openBlock as M, createElementBlock as j, createElementVNode as U, toDisplayString as ye, Fragment as Be, renderList as Ue, resolveComponent as Qe, createVNode as Ge, withKeys as jt, pushScopeId as qt, popScopeId as Lt } from "vue";
function Bt() {
  return ut().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function ut() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Ut = typeof Proxy == "function", Qt = "devtools-plugin:setup", Gt = "plugin:settings:set";
let W, we;
function Ht() {
  var e;
  return W !== void 0 || (typeof window < "u" && window.performance ? (W = !0, we = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (W = !0, we = globalThis.perf_hooks.performance) : W = !1), W;
}
function Kt() {
  return Ht() ? we.now() : Date.now();
}
class zt {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const u in t.settings) {
        const d = t.settings[u];
        o[u] = d.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${t.id}`;
    let f = Object.assign({}, o);
    try {
      const u = localStorage.getItem(s), d = JSON.parse(u);
      Object.assign(f, d);
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
        return Kt();
      }
    }, n && n.on(Gt, (u, d) => {
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
function Wt(e, t) {
  const n = e, o = ut(), s = Bt(), f = Ut && n.enableEarlyProxy;
  if (s && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !f))
    s.emit(Qt, e, t);
  else {
    const u = f ? new zt(n, s) : null;
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
function Ft(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const P = Object.assign;
function _e(e, t) {
  const n = {};
  for (const o in t) {
    const s = t[o];
    n[o] = V(s) ? s.map(e) : e(s);
  }
  return n;
}
const ne = () => {
}, V = Array.isArray;
function S(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const ft = /#/g, Yt = /&/g, Jt = /\//g, Xt = /=/g, Zt = /\?/g, dt = /\+/g, en = /%5B/g, tn = /%5D/g, ht = /%5E/g, nn = /%60/g, pt = /%7B/g, on = /%7C/g, gt = /%7D/g, rn = /%20/g;
function Te(e) {
  return encodeURI("" + e).replace(on, "|").replace(en, "[").replace(tn, "]");
}
function sn(e) {
  return Te(e).replace(pt, "{").replace(gt, "}").replace(ht, "^");
}
function Re(e) {
  return Te(e).replace(dt, "%2B").replace(rn, "+").replace(ft, "%23").replace(Yt, "%26").replace(nn, "`").replace(pt, "{").replace(gt, "}").replace(ht, "^");
}
function an(e) {
  return Re(e).replace(Xt, "%3D");
}
function cn(e) {
  return Te(e).replace(ft, "%23").replace(Zt, "%3F");
}
function ln(e) {
  return e == null ? "" : cn(e).replace(Jt, "%2F");
}
function Y(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && S(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const un = /\/$/, fn = (e) => e.replace(un, "");
function Ee(e, t, n = "/") {
  let o, s = {}, f = "", u = "";
  const d = t.indexOf("#");
  let l = t.indexOf("?");
  return d < l && d >= 0 && (l = -1), l > -1 && (o = t.slice(0, l), f = t.slice(l + 1, d > -1 ? d : t.length), s = e(f)), d > -1 && (o = o || t.slice(0, d), u = t.slice(d, t.length)), o = pn(o ?? t, n), {
    fullPath: o + (f && "?") + f + u,
    path: o,
    query: s,
    hash: Y(u)
  };
}
function dn(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function He(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Ke(e, t, n) {
  const o = t.matched.length - 1, s = n.matched.length - 1;
  return o > -1 && o === s && Q(t.matched[o], n.matched[s]) && mt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function Q(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function mt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!hn(e[n], t[n]))
      return !1;
  return !0;
}
function hn(e, t) {
  return V(e) ? ze(e, t) : V(t) ? ze(t, e) : e === t;
}
function ze(e, t) {
  return V(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function pn(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return S(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), s = o[o.length - 1];
  (s === ".." || s === ".") && o.push("");
  let f = n.length - 1, u, d;
  for (u = 0; u < o.length; u++)
    if (d = o[u], d !== ".")
      if (d === "..")
        f > 1 && f--;
      else
        break;
  return n.slice(0, f).join("/") + "/" + o.slice(u).join("/");
}
var re;
(function(e) {
  e.pop = "pop", e.push = "push";
})(re || (re = {}));
var oe;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(oe || (oe = {}));
function gn(e) {
  if (!e)
    if (q) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), fn(e);
}
const mn = /^[^#]+#/;
function vn(e, t) {
  return e.replace(mn, "#") + t;
}
function yn(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const ue = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function _n(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const f = document.querySelector(e.el);
        if (o && f) {
          S(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        S(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const s = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!s) {
      process.env.NODE_ENV !== "production" && S(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = yn(s, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function We(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Pe = /* @__PURE__ */ new Map();
function En(e, t) {
  Pe.set(e, t);
}
function bn(e) {
  const t = Pe.get(e);
  return Pe.delete(e), t;
}
let Sn = () => location.protocol + "//" + location.host;
function vt(e, t) {
  const { pathname: n, search: o, hash: s } = t, f = e.indexOf("#");
  if (f > -1) {
    let d = s.includes(e.slice(f)) ? e.slice(f).length : 1, l = s.slice(d);
    return l[0] !== "/" && (l = "/" + l), He(l, "");
  }
  return He(n, e) + o + s;
}
function wn(e, t, n, o) {
  let s = [], f = [], u = null;
  const d = ({ state: i }) => {
    const p = vt(e, location), y = n.value, k = t.value;
    let N = 0;
    if (i) {
      if (n.value = p, t.value = i, u && u === y) {
        u = null;
        return;
      }
      N = k ? i.position - k.position : 0;
    } else
      o(p);
    s.forEach((_) => {
      _(n.value, y, {
        delta: N,
        type: re.pop,
        direction: N ? N > 0 ? oe.forward : oe.back : oe.unknown
      });
    });
  };
  function l() {
    u = n.value;
  }
  function h(i) {
    s.push(i);
    const p = () => {
      const y = s.indexOf(i);
      y > -1 && s.splice(y, 1);
    };
    return f.push(p), p;
  }
  function r() {
    const { history: i } = window;
    i.state && i.replaceState(P({}, i.state, { scroll: ue() }), "");
  }
  function c() {
    for (const i of f)
      i();
    f = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", r);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", r, {
    passive: !0
  }), {
    pauseListeners: l,
    listen: h,
    destroy: c
  };
}
function Fe(e, t, n, o = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: s ? ue() : null
  };
}
function Rn(e) {
  const { history: t, location: n } = window, o = {
    value: vt(e, n)
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
  function f(l, h, r) {
    const c = e.indexOf("#"), i = c > -1 ? (n.host && document.querySelector("base") ? e : e.slice(c)) + l : Sn() + e + l;
    try {
      t[r ? "replaceState" : "pushState"](h, "", i), s.value = h;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? S("Error with push/replace State", p) : console.error(p), n[r ? "replace" : "assign"](i);
    }
  }
  function u(l, h) {
    const r = P({}, t.state, Fe(
      s.value.back,
      // keep back and forward entries but override current position
      l,
      s.value.forward,
      !0
    ), h, { position: s.value.position });
    f(l, r, !0), o.value = l;
  }
  function d(l, h) {
    const r = P(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      s.value,
      t.state,
      {
        forward: l,
        scroll: ue()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && S(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), f(r.current, r, !0);
    const c = P({}, Fe(o.value, l, null), { position: r.position + 1 }, h);
    f(l, c, !1), o.value = l;
  }
  return {
    location: o,
    state: s,
    push: d,
    replace: u
  };
}
function Pn(e) {
  e = gn(e);
  const t = Rn(e), n = wn(e, t.state, t.location, t.replace);
  function o(f, u = !0) {
    u || n.pauseListeners(), history.go(f);
  }
  const s = P({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: vn.bind(null, e)
  }, t, n);
  return Object.defineProperty(s, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(s, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), s;
}
function ce(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function yt(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const L = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, Ne = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
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
    return `Redirected from "${e.fullPath}" to "${On(t)}" via a navigation guard.`;
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
function J(e, t) {
  return process.env.NODE_ENV !== "production" ? P(new Error(Nn[e](t)), {
    type: e,
    [Ne]: !0
  }, t) : P(new Error(), {
    type: e,
    [Ne]: !0
  }, t);
}
function D(e, t) {
  return e instanceof Error && Ne in e && (t == null || !!(e.type & t));
}
const kn = ["params", "query", "hash"];
function On(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of kn)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Je = "[^/]+?", Cn = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, $n = /[.+*?^${}()[\]/\\]/g;
function An(e, t) {
  const n = P({}, Cn, t), o = [];
  let s = n.start ? "^" : "";
  const f = [];
  for (const h of e) {
    const r = h.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !h.length && (s += "/");
    for (let c = 0; c < h.length; c++) {
      const i = h[c];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (i.type === 0)
        c || (s += "/"), s += i.value.replace($n, "\\$&"), p += 40;
      else if (i.type === 1) {
        const { value: y, repeatable: k, optional: N, regexp: _ } = i;
        f.push({
          name: y,
          repeatable: k,
          optional: N
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
        let C = k ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        c || (C = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        N && h.length < 2 ? `(?:/${C})` : "/" + C), N && (C += "?"), s += C, p += 20, N && (p += -8), k && (p += -20), E === ".*" && (p += -50);
      }
      r.push(p);
    }
    o.push(r);
  }
  if (n.strict && n.end) {
    const h = o.length - 1;
    o[h][o[h].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? s += "$" : n.strict && (s += "(?:/|$)");
  const u = new RegExp(s, n.sensitive ? "" : "i");
  function d(h) {
    const r = h.match(u), c = {};
    if (!r)
      return null;
    for (let i = 1; i < r.length; i++) {
      const p = r[i] || "", y = f[i - 1];
      c[y.name] = p && y.repeatable ? p.split("/") : p;
    }
    return c;
  }
  function l(h) {
    let r = "", c = !1;
    for (const i of e) {
      (!c || !r.endsWith("/")) && (r += "/"), c = !1;
      for (const p of i)
        if (p.type === 0)
          r += p.value;
        else if (p.type === 1) {
          const { value: y, repeatable: k, optional: N } = p, _ = y in h ? h[y] : "";
          if (V(_) && !k)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const E = V(_) ? _.join("/") : _;
          if (!E)
            if (N)
              i.length < 2 && (r.endsWith("/") ? r = r.slice(0, -1) : c = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          r += E;
        }
    }
    return r || "/";
  }
  return {
    re: u,
    score: o,
    keys: f,
    parse: d,
    stringify: l
  };
}
function Tn(e, t) {
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
  const o = e.score, s = t.score;
  for (; n < o.length && n < s.length; ) {
    const f = Tn(o[n], s[n]);
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
const xn = {
  type: 0,
  value: ""
}, In = /[a-zA-Z0-9_]/;
function Dn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[xn]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${h}": ${p}`);
  }
  let n = 0, o = n;
  const s = [];
  let f;
  function u() {
    f && s.push(f), f = [];
  }
  let d = 0, l, h = "", r = "";
  function c() {
    h && (n === 0 ? f.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (f.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), f.push({
      type: 1,
      value: h,
      regexp: r,
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
        l === "/" ? (h && c(), u()) : l === ":" ? (c(), n = 1) : i();
        break;
      case 4:
        i(), n = o;
        break;
      case 1:
        l === "(" ? n = 2 : In.test(l) ? i() : (c(), n = 0, l !== "*" && l !== "?" && l !== "+" && d--);
        break;
      case 2:
        l === ")" ? r[r.length - 1] == "\\" ? r = r.slice(0, -1) + l : n = 3 : r += l;
        break;
      case 3:
        c(), n = 0, l !== "*" && l !== "?" && l !== "+" && d--, r = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), c(), u(), s;
}
function Mn(e, t, n) {
  const o = An(Dn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const f = /* @__PURE__ */ new Set();
    for (const u of o.keys)
      f.has(u.name) && S(`Found duplicated params with name "${u.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), f.add(u.name);
  }
  const s = P(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function jn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = tt({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(r) {
    return o.get(r);
  }
  function f(r, c, i) {
    const p = !i, y = qn(r);
    process.env.NODE_ENV !== "production" && Qn(y, c), y.aliasOf = i && i.record;
    const k = tt(t, r), N = [
      y
    ];
    if ("alias" in r) {
      const C = typeof r.alias == "string" ? [r.alias] : r.alias;
      for (const T of C)
        N.push(P({}, y, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: i ? i.record.components : y.components,
          path: T,
          // we might be the child of an alias
          aliasOf: i ? i.record : y
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let _, E;
    for (const C of N) {
      const { path: T } = C;
      if (c && T[0] !== "/") {
        const G = c.record.path, I = G[G.length - 1] === "/" ? "" : "/";
        C.path = c.record.path + (T && I + T);
      }
      if (process.env.NODE_ENV !== "production" && C.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (_ = Mn(C, c, k), process.env.NODE_ENV !== "production" && c && T[0] === "/" && Gn(_, c), i ? (i.alias.push(_), process.env.NODE_ENV !== "production" && Un(i, _)) : (E = E || _, E !== _ && E.alias.push(_), p && r.name && !et(_) && u(r.name)), y.children) {
        const G = y.children;
        for (let I = 0; I < G.length; I++)
          f(G[I], _, i && i.children[I]);
      }
      i = i || _, (_.record.components && Object.keys(_.record.components).length || _.record.name || _.record.redirect) && l(_);
    }
    return E ? () => {
      u(E);
    } : ne;
  }
  function u(r) {
    if (yt(r)) {
      const c = o.get(r);
      c && (o.delete(r), n.splice(n.indexOf(c), 1), c.children.forEach(u), c.alias.forEach(u));
    } else {
      const c = n.indexOf(r);
      c > -1 && (n.splice(c, 1), r.record.name && o.delete(r.record.name), r.children.forEach(u), r.alias.forEach(u));
    }
  }
  function d() {
    return n;
  }
  function l(r) {
    let c = 0;
    for (; c < n.length && Vn(r, n[c]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (r.record.path !== n[c].record.path || !_t(r, n[c])); )
      c++;
    n.splice(c, 0, r), r.record.name && !et(r) && o.set(r.record.name, r);
  }
  function h(r, c) {
    let i, p = {}, y, k;
    if ("name" in r && r.name) {
      if (i = o.get(r.name), !i)
        throw J(1, {
          location: r
        });
      if (process.env.NODE_ENV !== "production") {
        const E = Object.keys(r.params || {}).filter((C) => !i.keys.find((T) => T.name === C));
        E.length && S(`Discarded invalid param(s) "${E.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      k = i.record.name, p = P(
        // paramsFromLocation is a new object
        Ze(
          c.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          i.keys.filter((E) => !E.optional).concat(i.parent ? i.parent.keys.filter((E) => E.optional) : []).map((E) => E.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        r.params && Ze(r.params, i.keys.map((E) => E.name))
      ), y = i.stringify(p);
    } else if (r.path != null)
      y = r.path, process.env.NODE_ENV !== "production" && !y.startsWith("/") && S(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), i = n.find((E) => E.re.test(y)), i && (p = i.parse(y), k = i.record.name);
    else {
      if (i = c.name ? o.get(c.name) : n.find((E) => E.re.test(c.path)), !i)
        throw J(1, {
          location: r,
          currentLocation: c
        });
      k = i.record.name, p = P({}, c.params, r.params), y = i.stringify(p);
    }
    const N = [];
    let _ = i;
    for (; _; )
      N.unshift(_.record), _ = _.parent;
    return {
      name: k,
      path: y,
      params: p,
      matched: N,
      meta: Bn(N)
    };
  }
  return e.forEach((r) => f(r)), { addRoute: f, resolve: h, removeRoute: u, getRoutes: d, getRecordMatcher: s };
}
function Ze(e, t) {
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
    props: Ln(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Ln(e) {
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
function Bn(e) {
  return e.reduce((t, n) => P(t, n.meta), {});
}
function tt(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function ke(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function Un(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(ke.bind(null, n)))
      return S(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(ke.bind(null, n)))
      return S(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Qn(e, t) {
  t && t.record.name && !e.name && !e.path && S(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Gn(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(ke.bind(null, n)))
      return S(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function _t(e, t) {
  return t.children.some((n) => n === e || _t(e, n));
}
function Hn(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < o.length; ++s) {
    const f = o[s].replace(dt, " "), u = f.indexOf("="), d = Y(u < 0 ? f : f.slice(0, u)), l = u < 0 ? null : Y(f.slice(u + 1));
    if (d in t) {
      let h = t[d];
      V(h) || (h = t[d] = [h]), h.push(l);
    } else
      t[d] = l;
  }
  return t;
}
function nt(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = an(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (V(o) ? o.map((f) => f && Re(f)) : [o && Re(o)]).forEach((f) => {
      f !== void 0 && (t += (t.length ? "&" : "") + n, f != null && (t += "=" + f));
    });
  }
  return t;
}
function Kn(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = V(o) ? o.map((s) => s == null ? null : "" + s) : o == null ? o : "" + o);
  }
  return t;
}
const zn = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), ot = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Ve = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Et = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), Oe = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function ee() {
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
function B(e, t, n, o, s, f = (u) => u()) {
  const u = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[s] = o.enterCallbacks[s] || []);
  return () => new Promise((d, l) => {
    const h = (i) => {
      i === !1 ? l(J(4, {
        from: n,
        to: t
      })) : i instanceof Error ? l(i) : ce(i) ? l(J(2, {
        from: t,
        to: i
      })) : (u && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[s] === u && typeof i == "function" && u.push(i), d());
    }, r = f(() => e.call(o && o.instances[s], t, n, process.env.NODE_ENV !== "production" ? Wn(h, t, n) : h));
    let c = Promise.resolve(r);
    if (e.length < 3 && (c = c.then(h)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const i = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof r == "object" && "then" in r)
        c = c.then((p) => h._called ? p : (S(i), Promise.reject(new Error("Invalid navigation guard"))));
      else if (r !== void 0 && !h._called) {
        S(i), l(new Error("Invalid navigation guard"));
        return;
      }
    }
    c.catch((i) => l(i));
  });
}
function Wn(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && S(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function be(e, t, n, o, s = (f) => f()) {
  const f = [];
  for (const u of e) {
    process.env.NODE_ENV !== "production" && !u.components && !u.children.length && S(`Record with path "${u.path}" is either missing a "component(s)" or "children" property.`);
    for (const d in u.components) {
      let l = u.components[d];
      if (process.env.NODE_ENV !== "production") {
        if (!l || typeof l != "object" && typeof l != "function")
          throw S(`Component "${d}" in record with path "${u.path}" is not a valid component. Received "${String(l)}".`), new Error("Invalid route component");
        if ("then" in l) {
          S(`Component "${d}" in record with path "${u.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const h = l;
          l = () => h;
        } else
          l.__asyncLoader && // warn only once per component
          !l.__warnedDefineAsync && (l.__warnedDefineAsync = !0, S(`Component "${d}" in record with path "${u.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !u.instances[d]))
        if (Fn(l)) {
          const r = (l.__vccOpts || l)[t];
          r && f.push(B(r, n, o, u, d, s));
        } else {
          let h = l();
          process.env.NODE_ENV !== "production" && !("catch" in h) && (S(`Component "${d}" in record with path "${u.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), h = Promise.resolve(h)), f.push(() => h.then((r) => {
            if (!r)
              return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${u.path}"`));
            const c = Ft(r) ? r.default : r;
            u.components[d] = c;
            const p = (c.__vccOpts || c)[t];
            return p && B(p, n, o, u, d, s)();
          }));
        }
    }
  }
  return f;
}
function Fn(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function rt(e) {
  const t = K(Ve), n = K(Et);
  let o = !1, s = null;
  const f = x(() => {
    const r = F(e.to);
    return process.env.NODE_ENV !== "production" && (!o || r !== s) && (ce(r) || (o ? S(`Invalid value for prop "to" in useLink()
- to:`, r, `
- previous to:`, s, `
- props:`, e) : S(`Invalid value for prop "to" in useLink()
- to:`, r, `
- props:`, e)), s = r, o = !0), t.resolve(r);
  }), u = x(() => {
    const { matched: r } = f.value, { length: c } = r, i = r[c - 1], p = n.matched;
    if (!i || !p.length)
      return -1;
    const y = p.findIndex(Q.bind(null, i));
    if (y > -1)
      return y;
    const k = st(r[c - 2]);
    return (
      // we are dealing with nested routes
      c > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      st(i) === k && // avoid comparing the child with its parent
      p[p.length - 1].path !== k ? p.findIndex(Q.bind(null, r[c - 2])) : y
    );
  }), d = x(() => u.value > -1 && Zn(n.params, f.value.params)), l = x(() => u.value > -1 && u.value === n.matched.length - 1 && mt(n.params, f.value.params));
  function h(r = {}) {
    return Xn(r) ? t[F(e.replace) ? "replace" : "push"](
      F(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ne) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && q) {
    const r = lt();
    if (r) {
      const c = {
        route: f.value,
        isActive: d.value,
        isExactActive: l.value,
        error: null
      };
      r.__vrl_devtools = r.__vrl_devtools || [], r.__vrl_devtools.push(c), Dt(() => {
        c.route = f.value, c.isActive = d.value, c.isExactActive = l.value, c.error = ce(F(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: f,
    href: x(() => f.value.href),
    isActive: d,
    isExactActive: l,
    navigate: h
  };
}
const Yn = /* @__PURE__ */ le({
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
    const n = It(rt(e)), { options: o } = K(Ve), s = x(() => ({
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
}), Jn = Yn;
function Xn(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Zn(e, t) {
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
const at = (e, t, n) => e ?? t ?? n, eo = /* @__PURE__ */ le({
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
    process.env.NODE_ENV !== "production" && no();
    const o = K(Oe), s = x(() => e.route || o.value), f = K(ot, 0), u = x(() => {
      let h = F(f);
      const { matched: r } = s.value;
      let c;
      for (; (c = r[h]) && !c.components; )
        h++;
      return h;
    }), d = x(() => s.value.matched[u.value]);
    ve(ot, x(() => u.value + 1)), ve(zn, d), ve(Oe, s);
    const l = Se();
    return Ae(() => [l.value, d.value, e.name], ([h, r, c], [i, p, y]) => {
      r && (r.instances[c] = h, p && p !== r && h && h === i && (r.leaveGuards.size || (r.leaveGuards = p.leaveGuards), r.updateGuards.size || (r.updateGuards = p.updateGuards))), h && r && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !Q(r, p) || !i) && (r.enterCallbacks[c] || []).forEach((k) => k(h));
    }, { flush: "post" }), () => {
      const h = s.value, r = e.name, c = d.value, i = c && c.components[r];
      if (!i)
        return it(n.default, { Component: i, route: h });
      const p = c.props[r], y = p ? p === !0 ? h.params : typeof p == "function" ? p(h) : p : null, N = ct(i, P({}, y, t, {
        onVnodeUnmounted: (_) => {
          _.component.isUnmounted && (c.instances[r] = null);
        },
        ref: l
      }));
      if (process.env.NODE_ENV !== "production" && q && N.ref) {
        const _ = {
          depth: u.value,
          name: c.name,
          path: c.path,
          meta: c.meta
        };
        (V(N.ref) ? N.ref.map((C) => C.i) : [N.ref.i]).forEach((C) => {
          C.__vrv_devtools = _;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        it(n.default, { Component: N, route: h }) || N
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
const to = eo;
function no() {
  const e = lt(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    S(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
  }
}
function te(e, t) {
  const n = P({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => po(o, ["instances", "children", "aliasOf"]))
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
function ie(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let oo = 0;
function ro(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = oo++;
  Wt({
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
        value: te(t.currentRoute.value, "Current Route")
      });
    }), s.on.visitComponentTree(({ treeNode: r, componentInstance: c }) => {
      if (c.__vrv_devtools) {
        const i = c.__vrv_devtools;
        r.tags.push({
          label: (i.name ? `${i.name.toString()}: ` : "") + i.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: bt
        });
      }
      V(c.__vrl_devtools) && (c.__devtoolsApi = s, c.__vrl_devtools.forEach((i) => {
        let p = i.route.path, y = Rt, k = "", N = 0;
        i.error ? (p = i.error, y = lo, N = uo) : i.isExactActive ? (y = wt, k = "This is exactly active") : i.isActive && (y = St, k = "This link is active"), r.tags.push({
          label: p,
          textColor: N,
          tooltip: k,
          backgroundColor: y
        });
      }));
    }), Ae(t.currentRoute, () => {
      l(), s.notifyComponentUpdate(), s.sendInspectorTree(d), s.sendInspectorState(d);
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
        guard: ie("beforeEach"),
        from: te(c, "Current Location during this navigation"),
        to: te(r, "Target location")
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
        guard: ie("afterEach")
      };
      i ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: i ? i.message : "",
          tooltip: "Navigation Failure",
          value: i
        }
      }, p.status = ie("❌")) : p.status = ie("✅"), p.from = te(c, "Current Location during this navigation"), p.to = te(r, "Target location"), s.addTimelineEvent({
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
    const d = "router-inspector:" + o;
    s.addInspector({
      id: d,
      label: "Routes" + (o ? " " + o : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function l() {
      if (!h)
        return;
      const r = h;
      let c = n.getRoutes().filter((i) => !i.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !i.parent.record.components);
      c.forEach(kt), r.filter && (c = c.filter((i) => (
        // save matches state based on the payload
        Ce(i, r.filter.toLowerCase())
      ))), c.forEach((i) => Nt(i, t.currentRoute.value)), r.rootNodes = c.map(Pt);
    }
    let h;
    s.on.getInspectorTree((r) => {
      h = r, r.app === e && r.inspectorId === d && l();
    }), s.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === d) {
        const i = n.getRoutes().find((p) => p.record.__vd_id === r.nodeId);
        i && (r.state = {
          options: ao(i)
        });
      }
    }), s.sendInspectorTree(d), s.sendInspectorState(d);
  });
}
function so(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function ao(e) {
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
        display: e.keys.map((o) => `${o.name}${so(o)}`).join(" "),
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
const bt = 15485081, St = 2450411, wt = 8702998, io = 2282478, Rt = 16486972, co = 6710886, lo = 16704226, uo = 12131356;
function Pt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: io
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Rt
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: bt
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: wt
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: St
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: co
  });
  let o = n.__vd_id;
  return o == null && (o = String(fo++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Pt)
  };
}
let fo = 0;
const ho = /^\/(.*)\/([a-z]*)$/;
function Nt(e, t) {
  const n = t.matched.length && Q(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => Q(o, e.record))), e.children.forEach((o) => Nt(o, t));
}
function kt(e) {
  e.__vd_match = !1, e.children.forEach(kt);
}
function Ce(e, t) {
  const n = String(e.re).match(ho);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((u) => Ce(u, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const s = e.record.path.toLowerCase(), f = Y(s);
  return !t.startsWith("/") && (f.includes(t) || s.includes(t)) || f.startsWith(t) || s.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((u) => Ce(u, t));
}
function po(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function go(e) {
  const t = jn(e.routes, e), n = e.parseQuery || Hn, o = e.stringifyQuery || nt, s = e.history;
  if (process.env.NODE_ENV !== "production" && !s)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const f = ee(), u = ee(), d = ee(), l = Tt(L);
  let h = L;
  q && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const r = _e.bind(null, (a) => "" + a), c = _e.bind(null, ln), i = (
    // @ts-expect-error: intentionally avoid the type check
    _e.bind(null, Y)
  );
  function p(a, m) {
    let g, v;
    return yt(a) ? (g = t.getRecordMatcher(a), process.env.NODE_ENV !== "production" && !g && S(`Parent route "${String(a)}" not found when adding child route`, m), v = m) : v = a, t.addRoute(v, g);
  }
  function y(a) {
    const m = t.getRecordMatcher(a);
    m ? t.removeRoute(m) : process.env.NODE_ENV !== "production" && S(`Cannot remove non-existent route "${String(a)}"`);
  }
  function k() {
    return t.getRoutes().map((a) => a.record);
  }
  function N(a) {
    return !!t.getRecordMatcher(a);
  }
  function _(a, m) {
    if (m = P({}, m || l.value), typeof a == "string") {
      const b = Ee(n, a, m.path), O = t.resolve({ path: b.path }, m), H = s.createHref(b.fullPath);
      return process.env.NODE_ENV !== "production" && (H.startsWith("//") ? S(`Location "${a}" resolved to "${H}". A resolved location cannot start with multiple slashes.`) : O.matched.length || S(`No match found for location with path "${a}"`)), P(b, O, {
        params: i(O.params),
        hash: Y(b.hash),
        redirectedFrom: void 0,
        href: H
      });
    }
    process.env.NODE_ENV !== "production" && !ce(a) && (S(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, a), a = {});
    let g;
    if (a.path != null)
      process.env.NODE_ENV !== "production" && "params" in a && !("name" in a) && // @ts-expect-error: the type is never
      Object.keys(a.params).length && S(`Path "${a.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), g = P({}, a, {
        path: Ee(n, a.path, m.path).path
      });
    else {
      const b = P({}, a.params);
      for (const O in b)
        b[O] == null && delete b[O];
      g = P({}, a, {
        params: c(b)
      }), m.params = c(m.params);
    }
    const v = t.resolve(g, m), R = a.hash || "";
    process.env.NODE_ENV !== "production" && R && !R.startsWith("#") && S(`A \`hash\` should always start with the character "#". Replace "${R}" with "#${R}".`), v.params = r(i(v.params));
    const $ = dn(o, P({}, a, {
      hash: sn(R),
      path: v.path
    })), w = s.createHref($);
    return process.env.NODE_ENV !== "production" && (w.startsWith("//") ? S(`Location "${a}" resolved to "${w}". A resolved location cannot start with multiple slashes.`) : v.matched.length || S(`No match found for location with path "${a.path != null ? a.path : a}"`)), P({
      fullPath: $,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: R,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === nt ? Kn(a.query) : a.query || {}
      )
    }, v, {
      redirectedFrom: void 0,
      href: w
    });
  }
  function E(a) {
    return typeof a == "string" ? Ee(n, a, l.value.path) : P({}, a);
  }
  function C(a, m) {
    if (h !== a)
      return J(8, {
        from: m,
        to: a
      });
  }
  function T(a) {
    return X(a);
  }
  function G(a) {
    return T(P(E(a), { replace: !0 }));
  }
  function I(a) {
    const m = a.matched[a.matched.length - 1];
    if (m && m.redirect) {
      const { redirect: g } = m;
      let v = typeof g == "function" ? g(a) : g;
      if (typeof v == "string" && (v = v.includes("?") || v.includes("#") ? v = E(v) : (
        // force empty params
        { path: v }
      ), v.params = {}), process.env.NODE_ENV !== "production" && v.path == null && !("name" in v))
        throw S(`Invalid redirect found:
${JSON.stringify(v, null, 2)}
 when navigating to "${a.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return P({
        query: a.query,
        hash: a.hash,
        // avoid transferring params if the redirect has a path
        params: v.path != null ? {} : a.params
      }, v);
    }
  }
  function X(a, m) {
    const g = h = _(a), v = l.value, R = a.state, $ = a.force, w = a.replace === !0, b = I(g);
    if (b)
      return X(
        P(E(b), {
          state: typeof b == "object" ? P({}, R, b.state) : R,
          force: $,
          replace: w
        }),
        // keep original redirectedFrom if it exists
        m || g
      );
    const O = g;
    O.redirectedFrom = m;
    let H;
    return !$ && Ke(o, v, g) && (H = J(16, { to: O, from: v }), qe(
      v,
      v,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (H ? Promise.resolve(H) : Ie(O, v)).catch((A) => D(A) ? (
      // navigation redirects still mark the router as ready
      D(
        A,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? A : pe(A)
    ) : (
      // reject any unknown error
      he(A, O, v)
    )).then((A) => {
      if (A) {
        if (D(
          A,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          Ke(o, _(A.to), O) && // and we have done it a couple of times
          m && // @ts-expect-error: added only in dev
          (m._count = m._count ? (
            // @ts-expect-error
            m._count + 1
          ) : 1) > 30 ? (S(`Detected a possibly infinite redirection in a navigation guard when going from "${v.fullPath}" to "${O.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : X(
            // keep options
            P({
              // preserve an existing replacement but allow the redirect to override it
              replace: w
            }, E(A.to), {
              state: typeof A.to == "object" ? P({}, R, A.to.state) : R,
              force: $
            }),
            // preserve the original redirectedFrom if any
            m || O
          );
      } else
        A = Me(O, v, !0, w, R);
      return De(O, v, A), A;
    });
  }
  function Ct(a, m) {
    const g = C(a, m);
    return g ? Promise.reject(g) : Promise.resolve();
  }
  function fe(a) {
    const m = ae.values().next().value;
    return m && typeof m.runWithContext == "function" ? m.runWithContext(a) : a();
  }
  function Ie(a, m) {
    let g;
    const [v, R, $] = mo(a, m);
    g = be(v.reverse(), "beforeRouteLeave", a, m);
    for (const b of v)
      b.leaveGuards.forEach((O) => {
        g.push(B(O, a, m));
      });
    const w = Ct.bind(null, a, m);
    return g.push(w), z(g).then(() => {
      g = [];
      for (const b of f.list())
        g.push(B(b, a, m));
      return g.push(w), z(g);
    }).then(() => {
      g = be(R, "beforeRouteUpdate", a, m);
      for (const b of R)
        b.updateGuards.forEach((O) => {
          g.push(B(O, a, m));
        });
      return g.push(w), z(g);
    }).then(() => {
      g = [];
      for (const b of $)
        if (b.beforeEnter)
          if (V(b.beforeEnter))
            for (const O of b.beforeEnter)
              g.push(B(O, a, m));
          else
            g.push(B(b.beforeEnter, a, m));
      return g.push(w), z(g);
    }).then(() => (a.matched.forEach((b) => b.enterCallbacks = {}), g = be($, "beforeRouteEnter", a, m, fe), g.push(w), z(g))).then(() => {
      g = [];
      for (const b of u.list())
        g.push(B(b, a, m));
      return g.push(w), z(g);
    }).catch((b) => D(
      b,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? b : Promise.reject(b));
  }
  function De(a, m, g) {
    d.list().forEach((v) => fe(() => v(a, m, g)));
  }
  function Me(a, m, g, v, R) {
    const $ = C(a, m);
    if ($)
      return $;
    const w = m === L, b = q ? history.state : {};
    g && (v || w ? s.replace(a.fullPath, P({
      scroll: w && b && b.scroll
    }, R)) : s.push(a.fullPath, R)), l.value = a, qe(a, m, g, w), pe();
  }
  let Z;
  function $t() {
    Z || (Z = s.listen((a, m, g) => {
      if (!Le.listening)
        return;
      const v = _(a), R = I(v);
      if (R) {
        X(P(R, { replace: !0 }), v).catch(ne);
        return;
      }
      h = v;
      const $ = l.value;
      q && En(We($.fullPath, g.delta), ue()), Ie(v, $).catch((w) => D(
        w,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? w : D(
        w,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (X(
        w.to,
        v
        // avoid an uncaught rejection, let push call triggerError
      ).then((b) => {
        D(
          b,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !g.delta && g.type === re.pop && s.go(-1, !1);
      }).catch(ne), Promise.reject()) : (g.delta && s.go(-g.delta, !1), he(w, v, $))).then((w) => {
        w = w || Me(
          // after navigation, all matched components are resolved
          v,
          $,
          !1
        ), w && (g.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !D(
          w,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? s.go(-g.delta, !1) : g.type === re.pop && D(
          w,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && s.go(-1, !1)), De(v, $, w);
      }).catch(ne);
    }));
  }
  let de = ee(), je = ee(), se;
  function he(a, m, g) {
    pe(a);
    const v = je.list();
    return v.length ? v.forEach((R) => R(a, m, g)) : (process.env.NODE_ENV !== "production" && S("uncaught error during route navigation:"), console.error(a)), Promise.reject(a);
  }
  function At() {
    return se && l.value !== L ? Promise.resolve() : new Promise((a, m) => {
      de.add([a, m]);
    });
  }
  function pe(a) {
    return se || (se = !a, $t(), de.list().forEach(([m, g]) => a ? g(a) : m()), de.reset()), a;
  }
  function qe(a, m, g, v) {
    const { scrollBehavior: R } = e;
    if (!q || !R)
      return Promise.resolve();
    const $ = !g && bn(We(a.fullPath, 0)) || (v || !g) && history.state && history.state.scroll || null;
    return xt().then(() => R(a, m, $)).then((w) => w && _n(w)).catch((w) => he(w, a, m));
  }
  const ge = (a) => s.go(a);
  let me;
  const ae = /* @__PURE__ */ new Set(), Le = {
    currentRoute: l,
    listening: !0,
    addRoute: p,
    removeRoute: y,
    hasRoute: N,
    getRoutes: k,
    resolve: _,
    options: e,
    push: T,
    replace: G,
    go: ge,
    back: () => ge(-1),
    forward: () => ge(1),
    beforeEach: f.add,
    beforeResolve: u.add,
    afterEach: d.add,
    onError: je.add,
    isReady: At,
    install(a) {
      const m = this;
      a.component("RouterLink", Jn), a.component("RouterView", to), a.config.globalProperties.$router = m, Object.defineProperty(a.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => F(l)
      }), q && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !me && l.value === L && (me = !0, T(s.location).catch((R) => {
        process.env.NODE_ENV !== "production" && S("Unexpected error when starting the router:", R);
      }));
      const g = {};
      for (const R in L)
        Object.defineProperty(g, R, {
          get: () => l.value[R],
          enumerable: !0
        });
      a.provide(Ve, m), a.provide(Et, Vt(g)), a.provide(Oe, l);
      const v = a.unmount;
      ae.add(a), a.unmount = function() {
        ae.delete(a), ae.size < 1 && (h = L, Z && Z(), Z = null, l.value = L, me = !1, se = !1), v();
      }, process.env.NODE_ENV !== "production" && q && ro(a, m, t);
    }
  };
  function z(a) {
    return a.reduce((m, g) => m.then(() => fe(g)), Promise.resolve());
  }
  return Le;
}
function mo(e, t) {
  const n = [], o = [], s = [], f = Math.max(t.matched.length, e.matched.length);
  for (let u = 0; u < f; u++) {
    const d = t.matched[u];
    d && (e.matched.find((h) => Q(h, d)) ? o.push(d) : n.push(d));
    const l = e.matched[u];
    l && (t.matched.find((h) => Q(h, l)) || s.push(l));
  }
  return [n, o, s];
}
const vo = [
  {
    _id: "61a9ae14e04e3d5bffb26ef7",
    label: "VETS2011 Physiology",
    tags: ["course:VETS2011"],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7"
  },
  {
    _id: "6214304864c71f1df2110cff",
    label: "Quiz - Check your understanding: Neurons and the Resting Membrane Potential",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd/6214304864c71f1df2110cff"
  },
  {
    _id: "662f1d4d294a9702edc4e646",
    label: "Neurons and the Resting Membrane Potential Question 1",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd/6214304864c71f1df2110cff/662f1d4d294a9702edc4e646"
  },
  {
    _id: "662f1d4d294a9702edc4e648",
    label: "Neurons and the Resting Membrane Potential Question 2",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd/6214304864c71f1df2110cff/662f1d4d294a9702edc4e648"
  },
  {
    _id: "662f1d4d294a9702edc4e649",
    label: "Neurons and the Resting Membrane Potential Question 3",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd/6214304864c71f1df2110cff/662f1d4d294a9702edc4e649"
  },
  {
    _id: "662f1d4d294a9702edc4e647",
    label: "Neurons and the Resting Membrane Potential Question 4",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd/6214304864c71f1df2110cff/662f1d4d294a9702edc4e647"
  },
  {
    _id: "621440b064c71f1df2110d05",
    label: "Quiz - Check your understanding: Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05"
  },
  {
    _id: "662f1d4d294a9702edc4e64a",
    label: "Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 1",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64a"
  },
  {
    _id: "662f1d4d294a9702edc4e64c",
    label: "Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 2",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64c"
  },
  {
    _id: "662f1d4d294a9702edc4e64b",
    label: "Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 3",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64b"
  },
  {
    _id: "662f1d4d294a9702edc4e64e",
    label: "Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 4",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64e"
  },
  {
    _id: "662f1d4d294a9702edc4e64f",
    label: "Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 5",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64f"
  },
  {
    _id: "662f1d4d294a9702edc4e64d",
    label: "Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 6",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64d"
  },
  {
    _id: "6214418264c71f1df2110d0a",
    label: "Quiz - Check your understanding: Glial Cells and the Myelin Sheath",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07/6214418264c71f1df2110d0a"
  },
  {
    _id: "662f1d4d294a9702edc4e650",
    label: "Glial Cells and the Myelin Sheath Question 1",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07/6214418264c71f1df2110d0a/662f1d4d294a9702edc4e650"
  },
  {
    _id: "662f1d4d294a9702edc4e651",
    label: "Glial Cells and the Myelin Sheath Question 2",
    tags: [
      "VETS2011",
      " SEM1",
      " second year",
      " physiology",
      " neurophysiology"
    ],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07/6214418264c71f1df2110d0a/662f1d4d294a9702edc4e651"
  },
  {
    _id: "624380e164c71f1df2110dfd",
    label: "Respiratory Physiology",
    tags: ["VETS2011", "subject:Physiology", "system:Respiratory_System"],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd"
  },
  {
    _id: "6290636464c71f1df2110ec9",
    label: "Equine Exercise Physiology",
    tags: ["VETS2011", "subject:Physiology", "system:Exercise", "animal:Horse"],
    url: "https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9"
  }
], yo = K("getApi"), _o = (e) => {
  console.log("findData...called with ..", e, yo), console.log("hi");
  try {
    return vo.filter(
      (n) => n.tags.join(",").includes(e)
    ) || { label: "", tags: [] };
  } catch (t) {
    return console.log(t), [];
  }
}, Eo = { class: "search-results-container" }, bo = { class: "container-description" }, So = { class: "label-badges" }, wo = {
  key: 0,
  class: "results"
}, Ro = ["href"], Po = {
  key: 1,
  class: "no-results"
}, No = /* @__PURE__ */ le({
  __name: "DisplayResult",
  setup(e) {
    const t = Se([
      { _id: "", label: "", tags: [""], url: "" }
    ]), n = Ot(), o = Se("");
    Mt(() => {
      n ? (o.value = n.currentRoute.value.query.tag, s(o.value)) : o.value = "undefined";
    });
    const s = async (f) => {
      const u = await _o(f);
      u && (t.value = u);
    };
    return Ae(n.currentRoute, (f, u) => {
      const d = f.query.tag || "", l = u.query.tag || "";
      d !== l && s(d);
    }), (f, u) => (M(), j("div", Eo, [
      U("div", bo, [
        U("button", {
          onClick: u[0] || (u[0] = () => f.$router.back())
        }, "↵"),
        U("div", So, " (" + ye(t.value.length) + " records in total) ", 1)
      ]),
      t.value.length ? (M(), j("div", wo, [
        U("ul", null, [
          (M(!0), j(Be, null, Ue(t.value, (d, l) => (M(), j("li", { key: l }, [
            U("a", {
              href: d.url,
              target: "_blank",
              class: "linkToResource"
            }, ye(d.label), 9, Ro),
            (M(!0), j(Be, null, Ue(d.tags, (h, r) => (M(), j("span", {
              key: r,
              class: "tag-badges"
            }, ye(h), 1))), 128))
          ]))), 128))
        ])
      ])) : (M(), j("p", Po, "No results found"))
    ]));
  }
}), xe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, $e = /* @__PURE__ */ xe(No, [["__scopeId", "data-v-0b0c57c6"]]), ko = {}, Oo = { id: "app" };
function Co(e, t) {
  const n = Qe("CrucibleSearch"), o = Qe("RouterView");
  return M(), j("div", Oo, [
    Ge(n),
    Ge(o)
  ]);
}
const $o = /* @__PURE__ */ xe(ko, [["render", Co]]), Ao = [
  { path: "/", component: $o },
  { path: "/search-in-tag", component: $e }
], To = go({
  history: Pn("/"),
  routes: Ao
});
function Ot() {
  const e = K("$router");
  return e || To;
}
const Vo = (e) => (qt("data-v-9e83969e"), e = e(), Lt(), e), xo = { class: "search-container" }, Io = { class: "search-box" }, Do = /* @__PURE__ */ Vo(() => /* @__PURE__ */ U("label", { for: "" }, null, -1)), Mo = /* @__PURE__ */ le({
  __name: "CrucibleSearch",
  setup(e) {
    const t = Ot(), n = (o) => {
      t.push({ path: "/search-in-tag", query: { tag: o } });
    };
    return (o, s) => (M(), j("div", xo, [
      U("div", Io, [
        Do,
        U("input", {
          type: "text",
          placeholder: "Enter a valid Tag (or try enter VETS)",
          onKeyup: s[0] || (s[0] = jt((f) => n(f.target.value), ["enter"]))
        }, null, 32)
      ])
    ]));
  }
}), jo = /* @__PURE__ */ xe(Mo, [["__scopeId", "data-v-9e83969e"]]);
function Lo(e, t) {
  const { router: n, getApi: o } = t;
  e.component("CrucibleSearch", jo), e.component("DisplayResult", $e), e.provide("$router", n), e.provide("$getApi", o), n.addRoute({ path: "/search-in-tag", component: $e });
}
export {
  jo as CrucibleSearch,
  $e as DisplayResult,
  Lo as createSearchPlugin
};
