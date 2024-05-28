(function(a,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(a=typeof globalThis<"u"?globalThis:a||self,e(a.CrucibleSearchPlugin={},a.Vue))})(this,function(a,e){"use strict";function u(){const c=e.inject("$router");if(!c)throw new Error("Router instance is not provided");return c}const h=c=>(e.pushScopeId("data-v-adc0d429"),c=c(),e.popScopeId(),c),p={class:"search-container"},g={class:"search-box"},S=h(()=>e.createElementVNode("label",{for:""},null,-1)),_=e.defineComponent({__name:"CrucibleSearch",setup(c){const t=u(),o=d=>{t.push({path:`/search-in-tag/${d||"2011"}`})};return(d,f)=>(e.openBlock(),e.createElementBlock("div",p,[e.createElementVNode("div",g,[S,e.createElementVNode("input",{type:"text",placeholder:"Enter a valid Tag (or try enter VETS)",onKeyup:f[0]||(f[0]=e.withKeys(n=>o(n.target.value),["enter"]))},null,32)])]))}}),b=(c,t)=>{const o=c.__vccOpts||c;for(const[d,f]of t)o[d]=f;return o},y=b(_,[["__scopeId","data-v-adc0d429"]]),E=[{_id:"61a9ae14e04e3d5bffb26ef7",label:"VETS2011 Physiology",tags:["course:VETS2011"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7"},{_id:"6214304864c71f1df2110cff",label:"Quiz - Check your understanding: Neurons and the Resting Membrane Potential",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd/6214304864c71f1df2110cff"},{_id:"662f1d4d294a9702edc4e646",label:"Neurons and the Resting Membrane Potential Question 1",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd/6214304864c71f1df2110cff/662f1d4d294a9702edc4e646"},{_id:"662f1d4d294a9702edc4e648",label:"Neurons and the Resting Membrane Potential Question 2",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd/6214304864c71f1df2110cff/662f1d4d294a9702edc4e648"},{_id:"662f1d4d294a9702edc4e649",label:"Neurons and the Resting Membrane Potential Question 3",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd/6214304864c71f1df2110cff/662f1d4d294a9702edc4e649"},{_id:"662f1d4d294a9702edc4e647",label:"Neurons and the Resting Membrane Potential Question 4",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd/6214304864c71f1df2110cff/662f1d4d294a9702edc4e647"},{_id:"621440b064c71f1df2110d05",label:"Quiz - Check your understanding: Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05"},{_id:"662f1d4d294a9702edc4e64a",label:"Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 1",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64a"},{_id:"662f1d4d294a9702edc4e64c",label:"Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 2",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64c"},{_id:"662f1d4d294a9702edc4e64b",label:"Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 3",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64b"},{_id:"662f1d4d294a9702edc4e64e",label:"Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 4",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64e"},{_id:"662f1d4d294a9702edc4e64f",label:"Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 5",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64f"},{_id:"662f1d4d294a9702edc4e64d",label:"Post-synaptic Binding Outcomes, the Action Potential, and Saltatory Conduction Question 6",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03/621440b064c71f1df2110d05/662f1d4d294a9702edc4e64d"},{_id:"6214418264c71f1df2110d0a",label:"Quiz - Check your understanding: Glial Cells and the Myelin Sheath",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07/6214418264c71f1df2110d0a"},{_id:"662f1d4d294a9702edc4e650",label:"Glial Cells and the Myelin Sheath Question 1",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07/6214418264c71f1df2110d0a/662f1d4d294a9702edc4e650"},{_id:"662f1d4d294a9702edc4e651",label:"Glial Cells and the Myelin Sheath Question 2",tags:["VETS2011"," SEM1"," second year"," physiology"," neurophysiology"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07/6214418264c71f1df2110d0a/662f1d4d294a9702edc4e651"},{_id:"624380e164c71f1df2110dfd",label:"Respiratory Physiology",tags:["VETS2011","subject:Physiology","system:Respiratory_System"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd"},{_id:"6290636464c71f1df2110ec9",label:"Equine Exercise Physiology",tags:["VETS2011","subject:Physiology","system:Exercise","animal:Horse"],url:"https://crucible-uat.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9"}],m=e.inject("$getApi"),k=c=>{console.log("findData...called with ..",c,m);try{return E.filter(o=>o.tags.join(",").includes(c))||{label:"",tags:[]}}catch(t){return console.log(t),[]}},P={class:"search-results-container"},V={class:"container-description"},T={class:"label-badges"},M={key:0,class:"results"},B=["href"],C={key:1,class:"no-results"},r=b(e.defineComponent({__name:"DisplayResult",setup(c){const t=e.ref([{_id:"",label:"",tags:[""],url:""}]),o=u(),d=e.ref("");e.onMounted(()=>{o?(d.value=o.currentRoute.value.params.tag,f(d.value)):d.value="undefined"});const f=async n=>{const s=await k(n);s&&(t.value=s)};return e.watch(o.currentRoute,(n,s)=>{const l=n.params.tag||"",i=s.params.tag||"";l!==i&&f(l)}),(n,s)=>(e.openBlock(),e.createElementBlock("div",P,[e.createElementVNode("div",V,[e.createElementVNode("button",{onClick:s[0]||(s[0]=()=>n.$router.back())},"↵"),e.createElementVNode("div",T," ("+e.toDisplayString(t.value.length)+" records in total) ",1)]),t.value.length?(e.openBlock(),e.createElementBlock("div",M,[e.createElementVNode("ul",null,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(t.value,(l,i)=>(e.openBlock(),e.createElementBlock("li",{key:i},[e.createElementVNode("a",{href:l.url,target:"_blank",class:"linkToResource"},e.toDisplayString(l.label),9,B),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(l.tags,(R,Q)=>(e.openBlock(),e.createElementBlock("span",{key:Q,class:"tag-badges"},e.toDisplayString(R),1))),128))]))),128))])])):(e.openBlock(),e.createElementBlock("p",C,"No results found"))]))}}),[["__scopeId","data-v-f3e76be0"]]);function q(c,t){const{router:o,getApi:d}=t;c.component("CrucibleSearch",y),c.component("DisplayResult",r),c.provide("$router",o),c.provide("$getApi",d),o.addRoute({path:"/search-in-tag/:tag",component:r})}a.CrucibleSearch=y,a.DisplayResult=r,a.createSearchPlugin=q,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});
