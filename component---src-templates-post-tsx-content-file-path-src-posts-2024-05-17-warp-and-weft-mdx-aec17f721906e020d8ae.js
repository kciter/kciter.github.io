"use strict";(self.webpackChunkkciter_so=self.webpackChunkkciter_so||[]).push([[6756],{9113:function(e,t,n){n.r(t);var a=n(9128),o=n(9474),l=n(5799);function r(e){const t=Object.assign({blockquote:"blockquote",p:"p",h1:"h1",a:"a",span:"span",sup:"sup",strong:"strong",section:"section",h2:"h2",ol:"ol",li:"li"},(0,a.R)(),e.components);return o.createElement(o.Fragment,null,o.createElement(t.blockquote,null,"\n",o.createElement(t.p,null,"아무것도 몰라도 타입 검사를 그냥 '사용'할 수는 있다. 하지만 타입 검사를 제대로 '활용'하는 것은 전혀 다른 문제다."),"\n"),"\n",o.createElement(t.h1,{id:"왜-타입이-중요한가"},o.createElement(t.a,{href:"#왜-타입이-중요한가"},"왜 타입이 중요한가?")),"\n",o.createElement(t.p,null,"아무래도 타입은 프로그래밍을 할 때 가장 많이 고려하는 요소라고 할 수 있다. 우리는 프로그래밍 언어가 제공하는 문법을 통해 입력 데이터를 원하는 결과로 만들어 나간다. 이를 극도로 추상화하면 ",o.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">입력 -> 출력</code>'}}),"이라고 볼 수 있다. 세세하게 바라보면 결국 최종 목적지를 위한 입출력의 연속이라 볼 수 있다. 이 과정에서 데이터의 타입은 계속 바뀐다. 이는 로직마다 관심사",o.createElement(t.sup,null,o.createElement(t.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label"},"1")),"가 달라지기 때문이다. 즉, 입력에서 출력까지의 데이터 흐름에 타입 변화는 항상 따라다니는 짝궁 같은 것이다."),"\n",o.createElement(l.A,{src:"/images/2024-05-17-warp-and-weft/logic.png",caption:"로직은 입출력의 연속",width:"100%"}),"\n",o.createElement(t.p,null,"이 책에서 언급한 것처럼 파이썬이나 자바스크립트와 같은 언어를 사용한다면 타입 검사가 매우 귀찮게 느껴질 수 있지만 개발자에게 ",o.createElement(t.strong,null,"막강한 무기"),"가 될 수도 있다. ",o.createElement(t.strong,null,"타입은 함수와 데이터가 준수해야 하는 엄격한 계약"),"이며 타입 시스템은 이를 어길 수 없게 만든다. 까놓고 이야기하면 개발자는 생각보다 실수를 많이 한다. 처음엔 타입 검사가 귀찮고 오히려 생산성만 떨어뜨린다고 느낄 수 있지만, 되돌아가는게 더 빠를 수 있다고 실수를 바로잡는 시간일 생각하면 타입 검사를 하는게 오히려 생산성을 높다고 볼 수 있다.",o.createElement(t.sup,null,o.createElement(t.a,{href:"#user-content-fn-2",id:"user-content-fnref-2","data-footnote-ref":!0,"aria-describedby":"footnote-label"},"2"))),"\n",o.createElement(t.h1,{id:"일단-개발을-해봤다면-누구나-읽을-수-있는-책"},o.createElement(t.a,{href:"#일단-개발을-해봤다면-누구나-읽을-수-있는-책"},"일단 개발을 해봤다면 누구나 읽을 수 있는 책")),"\n",o.createElement(t.p,null,"필자도 사실 타입에 대한 이야기를 ",o.createElement(t.a,{href:"/posts/type-driven-development"},"Type-Driven Development")," 포스팅을 통해 한 번 다룬적이 있다. 이 글을 쓰던 당시에는 이 책을 읽지 않은 상태였지만, 만약 읽었다면 더 잘 쓸 수 있지 않았을까 싶다. 그만큼 이 책은 타입에 대한 이야기를 쉽게 설명하면서 깊이 있는 내용을 다루고 있다. 그리고 특히 일러스트가 이해하기에 아주 찰떡이다. 이것만 봐도 신경을 많이 쓴 좋은 책이라 생각한다."),"\n",o.createElement(t.h1,{id:"씨줄과-날줄"},o.createElement(t.a,{href:"#씨줄과-날줄"},"씨줄과 날줄")),"\n",o.createElement(t.p,null,"타입 시스템이 왜 필요한가를 생각하면 씨줄과 날줄이라는 표현은 아주 적절하다. ",o.createElement(t.strong,null,"타입 시스템의 본분은 개발자가 만드는 프로그램을 안전하게 만드는 것이다.")," 마치 직조하여 씨줄과 날줄을 꼼꼼하게 짜서 튼튼한 천을 만드는 것 처럼, 촘촘한 타입 시스템을 통해 안전한 프로그램을 만들 수 있다. 물론 서두에 쓴 것처럼 그냥 '사용'하는 것과 '활용'하는 것은 다르다. 그래서 타입 시스템이 어떻게 동작하는지, 무엇을 제공하는지 잘알고 사용하는 것이 중요하다."),"\n",o.createElement(t.h1,{id:"마치며"},o.createElement(t.a,{href:"#마치며"},"마치며")),"\n",o.createElement(t.p,null,"이 책은 개발을 업으로 삼고있다면 한 번쯤은 읽어보면 좋은 책이라고 생각한다. 너무 어렵지도 않으며 읽기 좋게 구성되어 있어 술술 읽을 수 있다. 어떻게보면 기존 타입과 관련된 서적은 함수형과 연관되어 있거나 너무 깊은 내용을 다루는 경우가 많은데, 이 책은 그런 측면에서 좀 더 가볍게 읽을 수 있는 책이라고 생각한다."),"\n",o.createElement(t.section,{"data-footnotes":!0,className:"footnotes"},o.createElement(t.h2,{className:"sr-only",id:"footnote-label"},o.createElement(t.a,{href:"#footnote-label"},"Footnotes")),"\n",o.createElement(t.ol,null,"\n",o.createElement(t.li,{id:"user-content-fn-1"},"\n",o.createElement(t.p,null,"여기선 함수나 클래스가 맡은 역할을 말한다 ",o.createElement(t.a,{href:"#user-content-fnref-1","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content"},"↩")),"\n"),"\n",o.createElement(t.li,{id:"user-content-fn-2"},"\n",o.createElement(t.p,null,"빌드 타임 이야기는 반칙이니까 생략하자 ",o.createElement(t.a,{href:"#user-content-fnref-2","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content"},"↩")),"\n"),"\n"),"\n"))}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.R)(),e.components);return t?o.createElement(t,e,o.createElement(r,e)):r(e)}},2617:function(e,t,n){n.r(t),n.d(t,{default:function(){return k}});var a=n(9113),o=n(5530),l=n(9474),r=n(8844),c=n(1047),i=n(8928),s=n.n(i),m=n(6979),d=n(2887),u=n(5909),f=n(589),p=n(5181),h=n.n(p),g=n(2195),E=n(6810);s().extend(n(1997));const b=e=>{let{data:t,location:n,pageContext:a,children:o}=e;const{tableOfContents:i,fields:p,frontmatter:b,excerpt:k}=t.mdx,{series:Y}=a,v=s()(p.date).locale("ko").format(),x={headline:b.title,dateModified:v,datePublished:v,image:""+n.href+b.image,mainEntityOfPage:{"@type":"WebPage","@id":n.href},author:{"@type":"Person",name:"Lee Sun-Hyoup"},url:n.href,description:k,"@type":"BlogPosting","@context":"https://schema.org"};(0,l.useEffect)((()=>{void 0!==typeof document&&h()((function(){h()(".post-container a[data-footnote-ref]").each(((e,t)=>{var n;const a=null===(n=h()(t).attr("href"))||void 0===n?void 0:n.slice(1),o=h()("#"+a).text().replace("↩","");h()(t).attr("data-tooltip",o)}))}))}),[]);const{0:w,1:A}=(0,l.useState)();(0,l.useEffect)((()=>{A(t.allMdx.edges.filter((e=>e.node.fields.slug!==p.slug)).sort((()=>Math.random()-.5)).slice(0,6))}),[]);const N=b.draft&&!0;return(0,E.Y)(r.A,null,(0,E.Y)(c.A,{title:b.title,description:k,meta:[{name:"article:published_time",content:s()(p.date).locale("ko").format()},{name:"image",content:"https://kciter.so"+b.image},{property:"og:image",content:"https://kciter.so"+b.image},{property:"og:image:secure_url",content:"https://kciter.so"+b.image}]}),(0,E.Y)(f.m,null,(0,E.Y)("script",{type:"application/ld+json"},JSON.stringify(x))),(0,E.Y)("h1",{className:"post-title"},b.title),(0,E.Y)("span",{className:"post-date"},"Written on ",s()(p.date).locale("en").format("LL")),b.image&&(0,E.Y)("img",{src:b.image,style:{width:"100%"}}),N||i.items&&(0,E.Y)(u.A,{items:i.items}),N||(null==Y?void 0:Y.items)&&(0,E.Y)(g.A,{title:Y.title,items:Y.items,currentItem:b.title}),(0,E.Y)("div",{className:"post-content"},N?(0,E.Y)(y,null,"Not yet published"):o),(0,E.Y)(m.A,{tags:b.tags,comment:b.comments}),w&&(0,E.Y)(d.A,{posts:w,current:p.slug}))};function k(e){return l.createElement(b,e,l.createElement(a.default,e))}const y=(0,o.A)("div",{target:"e1jwq6fl0"})({name:"xl5zip",styles:"margin:16px 0;font-weight:bold;font-size:20px;text-align:center"})},5799:function(e,t,n){var a=n(9474),o=n(1615),l=n(6810);t.A=e=>{let{src:t,caption:n,width:r,maxWidth:c,expandable:i}=e;const{0:s,1:m}=(0,a.useState)(!1);return(0,l.Y)("figure",null,(0,l.Y)("img",{src:t,width:r||"100%",style:{cursor:i?"zoom-in":"default",maxWidth:c},onClick:i?()=>m(!0):void 0}),n&&(0,l.Y)("figcaption",{dangerouslySetInnerHTML:{__html:n}}),s&&o.createPortal((0,l.Y)("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",cursor:"zoom-out",backgroundColor:"rgba(0, 0, 0, 0.7)"},onClick:()=>m(!1)},(0,l.Y)("div",{style:{borderRadius:8,maxWidth:1200,width:"80%",position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",backgroundColor:"white"}},(0,l.Y)("img",{src:t,width:"100%"}))),document.body))}}}]);
//# sourceMappingURL=component---src-templates-post-tsx-content-file-path-src-posts-2024-05-17-warp-and-weft-mdx-aec17f721906e020d8ae.js.map