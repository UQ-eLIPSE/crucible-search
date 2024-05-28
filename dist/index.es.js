import { inject as p, defineComponent as _, openBlock as a, createElementBlock as o, createElementVNode as f, withKeys as v, pushScopeId as M, popScopeId as T, ref as b, onMounted as V, watch as q, toDisplayString as i, Fragment as y, renderList as h } from "vue";
function S() {
  const e = p("$router");
  if (!e)
    throw new Error("Router instance is not provided");
  return e;
}
const C = (e) => (M("data-v-adc0d429"), e = e(), T(), e), R = { class: "search-container" }, Q = { class: "search-box" }, k = /* @__PURE__ */ C(() => /* @__PURE__ */ f("label", { for: "" }, null, -1)), A = /* @__PURE__ */ _({
  __name: "CrucibleSearch",
  setup(e) {
    const c = S(), t = (d) => {
      c.push({ path: `/search-in-tag/${d || "2011"}` });
    };
    return (d, s) => (a(), o("div", R, [
      f("div", Q, [
        k,
        f("input", {
          type: "text",
          placeholder: "Enter a valid Tag (or try enter VETS)",
          onKeyup: s[0] || (s[0] = v((n) => t(n.target.value), ["enter"]))
        }, null, 32)
      ])
    ]));
  }
}), E = (e, c) => {
  const t = e.__vccOpts || e;
  for (const [d, s] of c)
    t[d] = s;
  return t;
}, $ = /* @__PURE__ */ E(A, [["__scopeId", "data-v-adc0d429"]]), w = [
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
], B = p("$getApi"), O = (e) => {
  console.log("findData...called with ..", e, B);
  try {
    return w.filter(
      (t) => t.tags.join(",").includes(e)
    ) || { label: "", tags: [] };
  } catch (c) {
    return console.log(c), [];
  }
}, x = { class: "search-results-container" }, D = { class: "container-description" }, N = { class: "label-badges" }, I = {
  key: 0,
  class: "results"
}, j = ["href"], z = {
  key: 1,
  class: "no-results"
}, G = /* @__PURE__ */ _({
  __name: "DisplayResult",
  setup(e) {
    const c = b([
      { _id: "", label: "", tags: [""], url: "" }
    ]), t = S(), d = b("");
    V(() => {
      t ? (d.value = t.currentRoute.value.params.tag, s(d.value)) : d.value = "undefined";
    });
    const s = async (n) => {
      const r = await O(n);
      r && (c.value = r);
    };
    return q(t.currentRoute, (n, r) => {
      const l = n.params.tag || "", u = r.params.tag || "";
      l !== u && s(l);
    }), (n, r) => (a(), o("div", x, [
      f("div", D, [
        f("button", {
          onClick: r[0] || (r[0] = () => n.$router.back())
        }, "↵"),
        f("div", N, " (" + i(c.value.length) + " records in total) ", 1)
      ]),
      c.value.length ? (a(), o("div", I, [
        f("ul", null, [
          (a(!0), o(y, null, h(c.value, (l, u) => (a(), o("li", { key: u }, [
            f("a", {
              href: l.url,
              target: "_blank",
              class: "linkToResource"
            }, i(l.label), 9, j),
            (a(!0), o(y, null, h(l.tags, (m, P) => (a(), o("span", {
              key: P,
              class: "tag-badges"
            }, i(m), 1))), 128))
          ]))), 128))
        ])
      ])) : (a(), o("p", z, "No results found"))
    ]));
  }
}), g = /* @__PURE__ */ E(G, [["__scopeId", "data-v-f3e76be0"]]);
function H(e, c) {
  const { router: t, getApi: d } = c;
  e.component("CrucibleSearch", $), e.component("DisplayResult", g), e.provide("$router", t), e.provide("$getApi", d), t.addRoute({ path: "/search-in-tag/:tag", component: g });
}
export {
  $ as CrucibleSearch,
  g as DisplayResult,
  H as createSearchPlugin
};
