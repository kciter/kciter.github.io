import{j as e}from"./jsx-runtime.s5l94Kta.js";import"./index.Dkaqzkgy.js";const W="'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",A="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",_=`
.bca-loop-card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0;
  background: #fff;
}
.bca-loop-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 560px) {
  .bca-loop-grid { grid-template-columns: 1fr; }
}
.bca-loop-panel-title {
  font-family: ${W};
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4px;
}
.bca-loop-panel-desc {
  font-family: ${W};
  font-size: 11px;
  line-height: 1.5;
  color: #868e96;
  text-align: center;
  margin-top: 8px;
}
.bca-loop-caption {
  text-align: center;
  font-size: 12px;
  color: #637381;
  margin-top: 14px;
  font-family: ${W};
}
`,O=()=>e.jsx("svg",{viewBox:"0 0 200 150",style:{width:"100%",height:"auto",display:"block"},role:"img","aria-label":"고정된 파이프라인",children:["입력","분류","템플릿","응답"].map((t,n)=>{const x=8+n*34;return e.jsxs("g",{children:[e.jsx("rect",{x:54,y:x,width:92,height:24,rx:5,fill:"#f1f3f5",stroke:"#adb5bd",strokeWidth:1.2}),e.jsx("text",{x:100,y:x+16,textAnchor:"middle",fontFamily:W,fontSize:11,fill:"#495057",children:t}),n<3&&e.jsxs("g",{stroke:"#868e96",strokeWidth:1.2,fill:"#868e96",children:[e.jsx("line",{x1:100,y1:x+24,x2:100,y2:x+32}),e.jsx("path",{d:`M100 ${x+34} l-3.5 -5 h7 z`,stroke:"none"})]})]},t)})}),T=()=>{const x=[{x:100,y:18,label:"read"},{x:168,y:62,label:"edit"},{x:150,y:132,label:"bash"},{x:50,y:132,label:"write"},{x:32,y:62,label:"list"}];return e.jsxs("svg",{viewBox:"0 0 200 150",style:{width:"100%",height:"auto",display:"block"},role:"img","aria-label":"모델 중심 루프",children:[e.jsx("defs",{children:e.jsx("marker",{id:"bca-loop-arrow",markerWidth:"7",markerHeight:"7",refX:"5",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0 0 L6 3 L0 6 z",fill:"#228be6"})})}),x.map(i=>{const z=i.x-100,p=i.y-75,b=Math.hypot(z,p),g=z/b,m=p/b,y=-m,h=g,o=4,s=24,a=16,c=100+g*s,f=75+m*s,l=i.x-g*a,d=i.y-m*a;return e.jsxs("g",{children:[e.jsx("line",{x1:c+y*o,y1:f+h*o,x2:l+y*o,y2:d+h*o,stroke:"#228be6",strokeWidth:1.2,markerEnd:"url(#bca-loop-arrow)",opacity:.85}),e.jsx("line",{x1:l-y*o,y1:d-h*o,x2:c-y*o,y2:f-h*o,stroke:"#adb5bd",strokeWidth:1.2,strokeDasharray:"2.5 2.5",markerEnd:"url(#bca-loop-arrow)",opacity:.7}),e.jsx("rect",{x:i.x-18,y:i.y-9,width:36,height:18,rx:4,fill:"#e7f5ff",stroke:"#228be6",strokeWidth:1}),e.jsx("text",{x:i.x,y:i.y+3.5,textAnchor:"middle",fontFamily:A,fontSize:8,fill:"#1971c2",children:i.label})]},i.label)}),e.jsx("circle",{cx:100,cy:75,r:24,fill:"#fff5f5",stroke:"#fa5252",strokeWidth:1.4}),e.jsx("text",{x:100,y:79,textAnchor:"middle",fontFamily:W,fontSize:12,fontWeight:700,fill:"#e03131",children:"LLM"})]})},q=({caption:t})=>e.jsxs("div",{className:"bca-loop-card",style:{fontFamily:W},children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:_}}),e.jsxs("div",{className:"bca-loop-grid",children:[e.jsxs("div",{children:[e.jsx("div",{className:"bca-loop-panel-title",style:{color:"#868e96"},children:"워크플로"}),e.jsx(O,{}),e.jsxs("div",{className:"bca-loop-panel-desc",children:["흐름이 코드에 박혀 있다.",e.jsx("br",{}),"순서는 사람이 미리 정한다."]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"bca-loop-panel-title",style:{color:"#228be6"},children:"에이전트"}),e.jsx(T,{}),e.jsxs("div",{className:"bca-loop-panel-desc",children:["흐름을 매 턴 모델이 결정한다.",e.jsx("br",{}),"도구를 쓰고 결과를 다시 받는다."]})]})]}),t&&e.jsx("div",{className:"bca-loop-caption",children:t})]}),k="'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",j="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",L="#845ef7",X=`
.bca-call-card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0;
  background: #fff;
}
.bca-call-caption {
  text-align: center;
  font-size: 12px;
  color: #637381;
  margin-top: 14px;
  font-family: ${k};
}
`,J=({caption:t})=>e.jsxs("div",{className:"bca-call-card",style:{fontFamily:k},children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:X}}),e.jsxs("svg",{viewBox:"0 0 520 280",style:{width:"100%",height:"auto",display:"block"},role:"img","aria-label":"tool_use와 tool_result 한 왕복",children:[e.jsx("defs",{children:e.jsx("marker",{id:"bca-call-arrow",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3.5",orient:"auto",children:e.jsx("path",{d:"M0 0 L7 3.5 L0 7 z",fill:"#495057"})})}),e.jsxs("g",{children:[e.jsx("rect",{x:50,y:10,width:120,height:26,rx:5,fill:"#fff5f5",stroke:"#fa5252",strokeWidth:1.2}),e.jsx("text",{x:110,y:27,textAnchor:"middle",fontFamily:k,fontSize:12,fontWeight:700,fill:"#e03131",children:"모델"}),e.jsx("rect",{x:344,y:10,width:132,height:26,rx:5,fill:"#ebfbee",stroke:"#40c057",strokeWidth:1.2}),e.jsx("text",{x:410,y:27,textAnchor:"middle",fontFamily:k,fontSize:12,fontWeight:700,fill:"#2f9e44",children:"우리 코드 · 실행기"})]}),e.jsx("line",{x1:110,y1:44,x2:110,y2:250,stroke:"#dee2e6",strokeWidth:1.2,strokeDasharray:"3 4"}),e.jsx("line",{x1:410,y1:44,x2:410,y2:250,stroke:"#dee2e6",strokeWidth:1.2,strokeDasharray:"3 4"}),e.jsxs("g",{children:[e.jsx("line",{x1:110,y1:90,x2:406,y2:90,stroke:"#495057",strokeWidth:1.4,markerEnd:"url(#bca-call-arrow)"}),e.jsx("text",{x:520/2,y:82,textAnchor:"middle",fontFamily:j,fontSize:11,fontWeight:700,fill:"#343a40",children:"tool_use"}),e.jsx("text",{x:520/2,y:105,textAnchor:"middle",fontFamily:j,fontSize:10,fill:"#868e96",children:"name: read_file"})]}),e.jsxs("g",{children:[e.jsx("rect",{x:520/2-62,y:112,width:124,height:18,rx:9,fill:"#f3f0ff",stroke:L,strokeWidth:1}),e.jsx("text",{x:520/2,y:124.5,textAnchor:"middle",fontFamily:j,fontSize:9.5,fill:"#7048e8",children:"id = toolu_01ab"})]}),e.jsxs("g",{children:[e.jsx("rect",{x:366,y:140,width:88,height:22,rx:4,fill:"#f8f9fa",stroke:"#ced4da",strokeWidth:1}),e.jsx("text",{x:410,y:155,textAnchor:"middle",fontFamily:k,fontSize:10,fill:"#868e96",children:"파일을 읽음"})]}),e.jsxs("g",{children:[e.jsx("line",{x1:410,y1:195,x2:114,y2:195,stroke:"#495057",strokeWidth:1.4,markerEnd:"url(#bca-call-arrow)"}),e.jsx("text",{x:520/2,y:187,textAnchor:"middle",fontFamily:j,fontSize:11,fontWeight:700,fill:"#343a40",children:"tool_result"}),e.jsx("text",{x:520/2,y:210,textAnchor:"middle",fontFamily:j,fontSize:10,fill:"#868e96",children:"content: 파일 내용…"})]}),e.jsxs("g",{children:[e.jsx("rect",{x:520/2-62,y:217,width:124,height:18,rx:9,fill:"#f3f0ff",stroke:L,strokeWidth:1}),e.jsx("text",{x:520/2,y:229.5,textAnchor:"middle",fontFamily:j,fontSize:9.5,fill:"#7048e8",children:"tool_use_id = toolu_01ab"})]}),e.jsx("path",{d:`M ${520/2+62} 121 C 496 121, 496 226, ${520/2+62} 226`,fill:"none",stroke:L,strokeWidth:1.2,strokeDasharray:"3 3",opacity:.7}),e.jsx("text",{x:490,y:176,textAnchor:"middle",fontFamily:k,fontSize:9.5,fill:L,transform:"rotate(90 490 173)",children:"같은 id로 짝지음"})]}),t&&e.jsx("div",{className:"bca-call-caption",children:t})]}),F="'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",C="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",R={system:{key:"system",label:"시스템 프롬프트",color:"#adb5bd"},user:{key:"user",label:"사용자 요청",color:"#228be6"},tool:{key:"tool",label:"도구 결과 (파일 내용 등)",color:"#f76707"}},M=[{turn:1,segments:[{layer:"system",size:8},{layer:"user",size:6}]},{turn:2,segments:[{layer:"system",size:8},{layer:"user",size:6},{layer:"tool",size:20}]},{turn:3,segments:[{layer:"system",size:8},{layer:"user",size:6},{layer:"tool",size:44}]},{turn:4,segments:[{layer:"system",size:8},{layer:"user",size:6},{layer:"tool",size:76}]},{turn:5,segments:[{layer:"system",size:8},{layer:"user",size:6},{layer:"tool",size:118}]}],E=`
.bca-ctx-card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0;
  background: #fff;
}
.bca-ctx-caption {
  text-align: center;
  font-size: 12px;
  color: #637381;
  margin-top: 14px;
  font-family: ${F};
}
`,K=({caption:t})=>{const p=Math.max(...M.map(o=>o.segments.reduce((s,a)=>s+a.size,0))),b=400,g=b/p,m=60+b+40,y=M.length*42+16,h=y+26;return e.jsxs("div",{className:"bca-ctx-card",style:{fontFamily:F},children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:E}}),e.jsxs("svg",{viewBox:`0 0 ${m} ${h}`,style:{width:"100%",height:"auto",display:"block"},role:"img","aria-label":"턴이 쌓일수록 커지는 컨텍스트",children:[M.map((o,s)=>{const a=s*42;let c=60;const f=o.segments.reduce((l,d)=>l+d.size,0);return e.jsxs("g",{children:[e.jsxs("text",{x:52,y:a+30/2+4,textAnchor:"end",fontFamily:F,fontSize:12,fill:"#495057",children:["턴 ",o.turn]}),o.segments.map(l=>{const d=l.size*g,w=c;return c+=d,e.jsx("rect",{x:w,y:a,width:Math.max(d,1),height:30,fill:R[l.layer].color,rx:2,opacity:l.layer==="tool"?.9:.85},l.layer)}),e.jsxs("text",{x:c+6,y:a+30/2+4,fontFamily:C,fontSize:10,fill:"#868e96",children:["×",(f/M[0].segments.reduce((l,d)=>l+d.size,0)).toFixed(1)]})]},o.turn)}),Object.values(R).map((o,s)=>{const c=(m-60)/3,f=60+s%3*c,l=y+Math.floor(s/3)*16;return e.jsxs("g",{children:[e.jsx("rect",{x:f,y:l,width:11,height:11,rx:2,fill:o.color,opacity:.9}),e.jsx("text",{x:f+16,y:l+9.5,fontFamily:F,fontSize:10.5,fill:"#868e96",children:o.label})]},o.key)})]}),t&&e.jsx("div",{className:"bca-ctx-caption",children:t})]})},S="'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",P="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",r="#228be6",D={read:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M6 3 h8 l4 4 v14 h-12 z",fill:"#e7f5ff",stroke:r,strokeWidth:1.4,strokeLinejoin:"round"}),e.jsx("path",{d:"M14 3 v4 h4",fill:"none",stroke:r,strokeWidth:1.4,strokeLinejoin:"round"}),e.jsx("line",{x1:8,y1:12,x2:15,y2:12,stroke:r,strokeWidth:1.2}),e.jsx("line",{x1:8,y1:15,x2:15,y2:15,stroke:r,strokeWidth:1.2}),e.jsx("line",{x1:8,y1:18,x2:12,y2:18,stroke:r,strokeWidth:1.2})]}),list:e.jsx(e.Fragment,{children:[6,12,18].map(t=>e.jsxs("g",{children:[e.jsx("circle",{cx:6,cy:t,r:1.6,fill:r}),e.jsx("line",{x1:10,y1:t,x2:19,y2:t,stroke:r,strokeWidth:1.4,strokeLinecap:"round"})]},t))}),edit:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M4 20 l1 -4 l10 -10 l3 3 l-10 10 z",fill:"#e7f5ff",stroke:r,strokeWidth:1.4,strokeLinejoin:"round"}),e.jsx("line",{x1:13,y1:7,x2:16,y2:10,stroke:r,strokeWidth:1.4}),e.jsx("line",{x1:4,y1:20,x2:5,y2:16,stroke:r,strokeWidth:1.4})]}),write:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M6 3 h9 l3 3 v15 h-12 z",fill:r,stroke:r,strokeWidth:1.4,strokeLinejoin:"round",opacity:.15}),e.jsx("path",{d:"M6 3 h9 l3 3 v15 h-12 z",fill:"none",stroke:r,strokeWidth:1.4,strokeLinejoin:"round"}),e.jsx("line",{x1:9,y1:10,x2:15,y2:10,stroke:r,strokeWidth:1.2}),e.jsx("line",{x1:9,y1:13,x2:15,y2:13,stroke:r,strokeWidth:1.2}),e.jsx("line",{x1:9,y1:16,x2:15,y2:16,stroke:r,strokeWidth:1.2})]}),bash:e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:3,y:5,width:18,height:14,rx:2,fill:"#e7f5ff",stroke:r,strokeWidth:1.4}),e.jsx("path",{d:"M6 9 l3 2.5 l-3 2.5",fill:"none",stroke:r,strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("line",{x1:11,y1:15,x2:16,y2:15,stroke:r,strokeWidth:1.4,strokeLinecap:"round"})]})},B=[{key:"read",name:"read_file",ko:"읽기",desc:"파일 내용을 읽어 모델에게 준다"},{key:"list",name:"list_files",ko:"목록",desc:"디렉터리의 파일 목록을 나열한다"},{key:"edit",name:"edit_file",ko:"편집",desc:"문자열을 찾아 바꿔 부분 수정한다"},{key:"write",name:"write_file",ko:"쓰기",desc:"파일을 통째로 새로 쓴다"},{key:"bash",name:"bash",ko:"셸",desc:"셸 명령을 실행해 테스트를 돌린다"}],Y=`
.bca-tools-card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0;
  background: #fff;
}
.bca-tools-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
@media (max-width: 720px) {
  .bca-tools-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 440px) {
  .bca-tools-grid { grid-template-columns: repeat(2, 1fr); }
}
.bca-tool {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px 10px;
  background: #f8f9fa;
  text-align: center;
}
.bca-tool-name {
  font-family: ${P};
  font-size: 11px;
  font-weight: 700;
  color: #1971c2;
  margin-top: 8px;
  word-break: break-all;
}
.bca-tool-ko {
  font-family: ${S};
  font-size: 10px;
  color: #adb5bd;
  margin-top: 1px;
}
.bca-tool-desc {
  font-family: ${S};
  font-size: 10.5px;
  line-height: 1.45;
  color: #868e96;
  margin-top: 6px;
}
.bca-tools-caption {
  text-align: center;
  font-size: 12px;
  color: #637381;
  margin-top: 14px;
  font-family: ${S};
}
`,Q=({caption:t})=>e.jsxs("div",{className:"bca-tools-card",style:{fontFamily:S},children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:Y}}),e.jsx("div",{className:"bca-tools-grid",children:B.map(n=>e.jsxs("div",{className:"bca-tool",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:30,height:30,role:"img","aria-label":n.ko,children:D[n.key]}),e.jsx("div",{className:"bca-tool-name",children:n.name}),e.jsx("div",{className:"bca-tool-ko",children:n.ko}),e.jsx("div",{className:"bca-tool-desc",children:n.desc})]},n.key))}),t&&e.jsx("div",{className:"bca-tools-caption",children:t})]}),u="'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",V="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",$=[{arm:"전체",sub:"도구 전부 + 검증 규칙",easy:93,hard:89,base:!0},{arm:"bash 없음",sub:"테스트 실행 불가",easy:93,hard:78,base:!1},{arm:"검증 규칙 없음",sub:"검증 지시 제거",easy:100,hard:100,base:!1}],N="#adb5bd",H="#228be6",G=`
.bca-abl-card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0;
  background: #fff;
}
.bca-abl-caption {
  text-align: center;
  font-size: 12px;
  color: #637381;
  margin-top: 14px;
  font-family: ${u};
}
`,Z=({caption:t})=>{const h=26+$.length*61+4,o=[{c:N,t:"쉬운 과제 (n=15)"},{c:H,t:"어려운 과제 (n=9)"}];return e.jsxs("div",{className:"bca-abl-card",style:{fontFamily:u},children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:G}}),e.jsxs("svg",{viewBox:`0 0 442 ${h}`,style:{width:"100%",height:"auto",display:"block"},role:"img","aria-label":"쉬운 과제와 어려운 과제에서의 하네스 ablation 통과율 비교",children:[o.map((s,a)=>e.jsxs("g",{children:[e.jsx("rect",{x:130+a*150,y:4,width:11,height:11,rx:2,fill:s.c}),e.jsx("text",{x:130+a*150+16,y:13,fontFamily:u,fontSize:11,fill:"#868e96",children:s.t})]},s.t)),e.jsx("line",{x1:130,y1:26,x2:130,y2:h-4,stroke:"#e9ecef",strokeWidth:1}),e.jsx("line",{x1:390,y1:26,x2:390,y2:h-4,stroke:"#e9ecef",strokeWidth:1,strokeDasharray:"2 3"}),e.jsx("text",{x:390,y:22,fontFamily:u,fontSize:9,fill:"#ced4da",children:"100%"}),$.map((s,a)=>{const c=26+a*61,f=[{v:s.easy,color:N},{v:s.hard,color:H}];return e.jsxs("g",{children:[e.jsx("text",{x:118,y:c+15+2,textAnchor:"end",fontFamily:u,fontSize:12,fontWeight:s.base?700:500,fill:s.base?"#1971c2":"#495057",children:s.arm}),e.jsx("text",{x:118,y:c+15+17,textAnchor:"end",fontFamily:u,fontSize:9,fill:"#adb5bd",children:s.sub}),f.map((l,d)=>{const w=c+d*20,v=l.v/100*260;return e.jsxs("g",{children:[e.jsx("rect",{x:130,y:w,width:260,height:15,rx:3,fill:"#f1f3f5"}),e.jsx("rect",{x:130,y:w,width:Math.max(v,2),height:15,rx:3,fill:l.color}),e.jsxs("text",{x:130+v+7,y:w+15-3,fontFamily:V,fontSize:11,fontWeight:700,fill:l.color,children:[l.v,"%"]})]},d)})]},s.arm)})]}),t&&e.jsx("div",{className:"bca-abl-caption",children:t})]})};export{Z as AblationChart,q as AgentLoopDiagram,K as ContextGrowthDiagram,Q as ToolAnatomyDiagram,J as ToolCallDiagram};
