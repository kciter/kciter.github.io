(self.webpackChunkkciter_so=self.webpackChunkkciter_so||[]).push([[691],{3474:function(e,t,n){"use strict";var a=n(7294);t.Z=function(e){var t=e.posts,n=e.current,r=e.style;return a.createElement("div",{className:"related",style:r},a.createElement("div",{className:"related-posts"},t.map((function(e){return e.node.fields.slug!==n&&a.createElement("div",{className:"related-post",key:e.node.fields.slug},a.createElement("a",{href:e.node.fields.slug},a.createElement("img",{src:e.node.frontmatter.image}),a.createElement("div",{className:"title"},e.node.frontmatter.title),a.createElement("small",null,e.node.fields.date)))}))))}},4216:function(e,t,n){"use strict";var a=n(7294),r=n(5414),i=n(5444),c=function(e){var t,n,c=e.title,o=e.description,s=e.meta,l=(0,i.useStaticQuery)("63159454").site,m=o||l.siteMetadata.description,u=c||(null===(t=l.siteMetadata)||void 0===t?void 0:t.title);return a.createElement(r.q,{htmlAttributes:{ko:"ko"},title:u,titleTemplate:c?"%s | kciter.so":void 0,meta:[{name:"description",content:m},{property:"author",content:"Lee Sun-Hyoup"},{property:"og:title",content:u},{property:"og:description",content:m},{property:"og:type",content:"website"},{property:"og:site_name",content:"kciter.so"},{property:"og:locale",content:"ko_KR"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:"Lee Sun-Hyoup"},{name:"twitter:title",content:u},{name:"twitter:description",content:m},null!==(n=s.find((function(e){return"og:image"===e.name})))&&void 0!==n?n:{name:"og:image",content:"https://kciter.so/images/og.png"}].concat(s)})};c.defaultProps={lang:"en",meta:[],description:""},t.Z=c},4904:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s}});var a=n(7294),r=n(7752),i=n(4216),c=n(3474),o=function(){return a.createElement("div",{className:"member-container"},a.createElement("div",{className:"avatar"},a.createElement("img",{src:"/images/about/avatar.jpg"})),a.createElement("div",{className:"summary"},a.createElement("div",{className:"name"},"이선협"),a.createElement("div",{className:"description"},"그냥 개발자")))},s=function(e){var t=e.data,n=(0,a.useState)(),s=n[0],l=n[1];return(0,a.useEffect)((function(){l(t.allMdx.edges.sort((function(){return Math.random()-.5})).splice(0,6))}),[]),a.createElement(r.Z,null,a.createElement(i.Z,{title:""}),a.createElement(o,null),a.createElement("h2",null,"Posts"),s&&a.createElement(c.Z,{posts:s,style:{padding:0}}))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-376f7a0cf1228786d325.js.map