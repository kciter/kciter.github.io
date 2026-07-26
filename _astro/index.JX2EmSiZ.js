import{j as s}from"./jsx-runtime.s5l94Kta.js";import{r as y}from"./index.Dkaqzkgy.js";const w="'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",m={helpdesk:"#228be6",helpdeskBg:"#e7f5ff",relay:"#f59f00",relayBg:"#f1f3f5",mailbox:"#40c057",mailboxBg:"#ebfbee",textLight:"#868e96",border:"#dee2e6"};function ye(e,i,t,p,l,r,o,n,a=1.5){e.beginPath(),e.roundRect(i,t,p,l,r),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=a,e.stroke()}function B(e,i,t,p,l,r,o,n=!1){e.strokeStyle=r,e.lineWidth=1.8,e.setLineDash(n?[4*o,3*o]:[]),e.beginPath(),e.moveTo(i,t),e.lineTo(p,l),e.stroke(),e.setLineDash([]);const a=Math.atan2(l-t,p-i),c=6*o;e.fillStyle=r,e.beginPath(),e.moveTo(p,l),e.lineTo(p-c*Math.cos(a-.4),l-c*Math.sin(a-.4)),e.lineTo(p-c*Math.cos(a+.4),l-c*Math.sin(a+.4)),e.closePath(),e.fill()}function L(e,i,t,p,l,r){const o=9*l;e.beginPath(),e.arc(i,t,o,0,Math.PI*2),e.fillStyle=r,e.fill(),e.fillStyle="#fff",e.font=`700 ${Math.max(9*l,8)}px ${w}`,e.textAlign="center",e.textBaseline="middle",e.fillText(String(p),i,t+.5)}function Y(e,i,t,p,l,r,o,n,a,c){ye(e,i-p/2,t,p,l,6*r,c,a),e.textAlign="center",e.textBaseline="middle";const x=p-10*r;let g=Math.max(13*r,11);e.font=`700 ${g}px ${w}`;const f=e.measureText(o).width;f>x&&(g=Math.max(g*(x/f),8),e.font=`700 ${g}px ${w}`),e.fillStyle=a,e.fillText(o,i,t+l/2-7*r),e.fillStyle=m.textLight,e.font=`${Math.max(8.5*r,8)}px ${w}`,e.fillText(n,i,t+l/2+9*r)}function ee(e,i){const t=i/700,p=Math.max(9.5*t,9),l=Math.max(8.5*t,8),r=118*t,o=46*t,n=85*t,a=i/2,c=i-85*t,x=10*t,g=52*t,f=x+o+4*t,u=f+26*t,k=u+g*(5-1)+30*t,S=k+12*t;e.strokeStyle=m.border,e.setLineDash([3,3]),e.lineWidth=1,[n,a,c].forEach(T=>{e.beginPath(),e.moveTo(T,f),e.lineTo(T,k),e.stroke()}),e.setLineDash([]),Y(e,n,x,r,o,t,"헬프데스크","티켓 DB",m.helpdesk,m.helpdeskBg),Y(e,a,x,r,o,t,"릴레이 수신 서버","SMTP",m.relay,m.relayBg),Y(e,c,x,r,o,t,"고객 메일함","Gmail",m.mailbox,m.mailboxBg),e.textBaseline="middle";let d=u;L(e,n-14*t,d,1,t,m.helpdesk),B(e,n,d,c,d,m.helpdesk,t),e.fillStyle=m.helpdesk,e.font=`${p}px ${w}`,e.textAlign="center",e.fillText("알림 메일 발송",(n+c)/2,d-10*t),e.fillStyle=m.textLight,e.font=`${l}px ${w}`,e.fillText("Reply-To: reply+토큰@relay…",(n+c)/2,d+12*t),d=u+g;const b=30*t;return L(e,c+14*t,d+8*t,2,t,m.mailbox),e.strokeStyle=m.mailbox,e.lineWidth=1.8,e.beginPath(),e.moveTo(c,d),e.lineTo(c-b,d),e.lineTo(c-b,d+16*t),e.lineTo(c-6*t,d+16*t),e.stroke(),e.fillStyle=m.mailbox,e.beginPath(),e.moveTo(c-6*t,d+16*t),e.lineTo(c-12*t,d+12*t),e.lineTo(c-12*t,d+20*t),e.closePath(),e.fill(),e.fillStyle=m.mailbox,e.font=`${p}px ${w}`,e.textAlign="right",e.fillText("고객이 답장 작성",c-b-8*t,d+5*t),d=u+g*2,L(e,c+14*t,d,3,t,m.mailbox),B(e,c,d,a,d,m.mailbox,t),e.fillStyle=m.mailbox,e.font=`${p}px ${w}`,e.textAlign="center",e.fillText("SMTP 배달",(c+a)/2,d-10*t),e.fillStyle=m.textLight,e.font=`${l}px ${w}`,e.fillText("MX 조회로 서버를 찾는다",(c+a)/2,d+12*t),d=u+g*3,L(e,a-14*t,d+8*t,4,t,m.relay),e.strokeStyle=m.relay,e.lineWidth=1.8,e.beginPath(),e.moveTo(a,d),e.lineTo(a+b,d),e.lineTo(a+b,d+16*t),e.lineTo(a+6*t,d+16*t),e.stroke(),e.fillStyle=m.relay,e.beginPath(),e.moveTo(a+6*t,d+16*t),e.lineTo(a+12*t,d+12*t),e.lineTo(a+12*t,d+20*t),e.closePath(),e.fill(),e.fillStyle=m.relay,e.font=`${p}px ${w}`,e.textAlign="left",e.fillText("토큰 검증 · MIME 파싱 · 인용 제거",a+b+8*t,d+5*t),d=u+g*4,L(e,a+14*t,d,5,t,m.relay),B(e,a,d,n,d,m.relay,t,!0),e.fillStyle=m.relay,e.font=`${p}px ${w}`,e.textAlign="center",e.fillText("코멘트 저장",(a+n)/2,d-10*t),e.fillStyle=m.textLight,e.font=`${l}px ${w}`,e.fillText("티켓 #42에 새 코멘트",(a+n)/2,d+12*t),S}const at=({caption:e})=>{const i=y.useRef(null),t=y.useRef(null);return y.useEffect(()=>{const p=i.current,l=t.current;if(!p||!l)return;const r=()=>{const n=p.clientWidth,a=window.devicePixelRatio||1,c=l.getContext("2d");l.width=1,l.height=1;const x=ee(c,n);l.width=n*a,l.height=x*a,l.style.width=`${n}px`,l.style.height=`${x}px`,c.clearRect(0,0,l.width,l.height),c.scale(a,a),ee(c,n)};r();const o=new ResizeObserver(r);return o.observe(p),()=>o.disconnect()},[]),s.jsxs("figure",{children:[s.jsx("div",{ref:i,children:s.jsx("canvas",{ref:t,style:{display:"block",width:"100%"}})}),e&&s.jsx("figcaption",{dangerouslySetInnerHTML:{__html:e}})]})},Se="'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",te="ui-monospace, SFMono-Regular, Menlo, monospace",D={mode:"command",mailFrom:"",rcptTo:""},P=[{lines:[["S","220 relay.example.com ESMTP ready"]],desc:"TCP 접속이 열리면 서버가 먼저 인사한다. 220은 준비 완료라는 뜻이다.",state:D},{lines:[["C","EHLO mail-yb1-f171.google.com"],["S","250 relay.example.com"]],desc:"클라이언트(보내는 서버)가 자신을 밝힌다.",state:D},{lines:[["C","MAIL FROM:<hanna.kim@gmail.com>"],["S","250 OK"]],desc:"봉투에 발신자를 적는다. 검증 없는 자기 신고 값이다.",state:{mode:"command",mailFrom:"hanna.kim@gmail.com",rcptTo:""}},{lines:[["C","RCPT TO:<reply+42.7.1784209600.a58f8f3c9a6a265e@relay.example.com>"],["S","250 OK"]],desc:"봉투에 수신자를 적는다. reply+로 시작하지 않으면 550으로 거절된다.",state:{mode:"command",mailFrom:"hanna.kim@gmail.com",rcptTo:"reply+42.7.1784209600.a58f8f3c9a6a265e@relay.example.com"}},{lines:[["C","DATA"],["S","354 End data with <CR><LF>.<CR><LF>"]],desc:"이제부터는 명령이 아니라 메일 원문이다. 서버가 수신 모드로 전환된다.",state:{mode:"data",mailFrom:"hanna.kim@gmail.com",rcptTo:"reply+42.7.1784209600.a58f8f3c9a6a265e@relay.example.com"}},{lines:[["C","From: =?UTF-8?B?6rmA7ZWc64KY?= <hanna.kim@gmail.com>"],["C","Subject: =?UTF-8?B?UmU6IFvti7DsvJMgIzQyXSAuLi4=?="],["C",""],["C","(quoted-printable로 포장된 본문…)"]],desc:"헤더와 본문이 그대로 흘러 들어온다. 한글은 encoded-word로 포장되어 있다.",state:{mode:"data",mailFrom:"hanna.kim@gmail.com",rcptTo:"reply+42.7.1784209600.a58f8f3c9a6a265e@relay.example.com"}},{lines:[["C","."],["S","250 OK: queued"]],desc:"마침표 하나만 있는 줄이 끝 신호다. 본문에 있는 마침표 줄은 dot-stuffing으로 이스케이프된다.",state:D},{lines:[["C","QUIT"],["S","221 Bye"]],desc:"대화 종료. 메일 한 통이 배달되는 데 필요한 전부다.",state:D}],se=450,Te=1900,we=1500,ke=3e3,oe=[],ie=[],G=[];let z=0;P.forEach((e,i)=>{G.push(z),e.lines.forEach(([l,r],o)=>{ie.push(z+o*se),oe.push({speaker:l,text:r,stepIndex:i})});const t=(e.lines.length-1)*se,p=i===P.length-1;z+=p?t+ke:Math.max(Te,t+we)});const Ee=z,Ne=`
.smtpd-progress {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.smtpd-progress-label {
  flex: none;
  font-size: 11.5px;
  color: #868e96;
  font-variant-numeric: tabular-nums;
}
.smtpd-progress-track {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: #e9ecef;
  overflow: hidden;
}
.smtpd-progress-fill {
  height: 100%;
  background: #adb5bd;
  border-radius: 2px;
  transition: width 0.4s ease;
}
.smtpd-term {
  background: #212529;
  border-radius: 6px;
  padding: 14px 16px;
  max-height: 260px;
  overflow-y: auto;
  overflow-x: auto;
  font-family: ${te};
  font-size: 12.5px;
  line-height: 1.9;
}
.smtpd-line { white-space: pre; border-radius: 3px; padding: 0 4px; margin: 0 -4px; width: max-content; min-width: 100%; box-sizing: border-box; }
.smtpd-line-s { color: #74c0fc; }
.smtpd-line-c { color: #8ce99a; }
.smtpd-line-new { background: rgba(255, 255, 255, 0.09); }
.smtpd-bottom { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 14px; align-items: stretch; }
.smtpd-desc {
  flex: 2 1 220px;
  min-width: 0;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px 14px;
  font-size: 13px;
  color: #495057;
  line-height: 1.6;
}
.smtpd-status { flex: 1 1 180px; min-width: 0; display: flex; flex-direction: column; gap: 6px; justify-content: center; }
.smtpd-chip {
  display: flex;
  align-items: baseline;
  gap: 6px;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 11.5px;
  border: 1px solid #dee2e6;
  background: #f8f9fa;
  color: #868e96;
  min-width: 0;
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
.smtpd-chip-label { flex: none; font-weight: 600; }
.smtpd-chip-value {
  font-family: ${te};
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
.smtpd-chip-filled { background: #ebfbee; border-color: #8ce99a; color: #2b8a3e; }
.smtpd-chip-data { background: #fff3bf; border-color: #ffd43b; color: #e8590c; }
`,q=({label:e,value:i,filled:t,dataMode:p})=>s.jsxs("div",{className:"smtpd-chip"+(p?" smtpd-chip-data":t?" smtpd-chip-filled":""),children:[s.jsx("span",{className:"smtpd-chip-label",children:e}),s.jsx("span",{className:"smtpd-chip-value",children:i})]}),lt=()=>{const[e,i]=y.useState({step:0,lineCount:1}),t=y.useRef(null);y.useEffect(()=>{let n=0;const a=performance.now(),c=x=>{const g=Math.max(0,x-a)%Ee;let f=0;for(const h of ie)if(h<=g)f++;else break;let u=0;for(let h=0;h<G.length;h++)g>=G[h]&&(u=h);i(h=>h.step===u&&h.lineCount===f?h:{step:u,lineCount:f}),n=requestAnimationFrame(c)};return n=requestAnimationFrame(c),()=>cancelAnimationFrame(n)},[]),y.useEffect(()=>{const n=t.current;n&&(n.scrollTop=n.scrollHeight)},[e.lineCount]);const p=P[e.step],{mode:l,mailFrom:r,rcptTo:o}=p.state;return s.jsxs("div",{style:{border:"1px solid #dee2e6",borderRadius:8,padding:20,margin:"24px 0",background:"#fff",fontFamily:Se},children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:Ne}}),s.jsxs("div",{className:"smtpd-progress",children:[s.jsxs("span",{className:"smtpd-progress-label",children:["단계 ",e.step+1,"/",P.length]}),s.jsx("div",{className:"smtpd-progress-track",children:s.jsx("div",{className:"smtpd-progress-fill",style:{width:`${(e.step+1)/P.length*100}%`}})})]}),s.jsx("div",{className:"smtpd-term",ref:t,children:oe.slice(0,e.lineCount).map((n,a)=>s.jsxs("div",{className:"smtpd-line "+(n.speaker==="S"?"smtpd-line-s":"smtpd-line-c")+(n.stepIndex===e.step?" smtpd-line-new":""),children:[n.speaker,": ",n.text]},a))}),s.jsxs("div",{className:"smtpd-bottom",children:[s.jsx("div",{className:"smtpd-desc",children:p.desc}),s.jsxs("div",{className:"smtpd-status",children:[s.jsx(q,{label:"모드",value:l==="data"?"DATA 수신":"명령",filled:!1,dataMode:l==="data"}),s.jsx(q,{label:"봉투 발신자",value:r||"—",filled:!!r}),s.jsx(q,{label:"봉투 수신자",value:o||"—",filled:!!o})]})]})]})},je="'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",ne="ui-monospace, SFMono-Regular, Menlo, monospace",Me="relay-secret-please-change",ae=1783e6,_=42,re=43,v=7,C=1784209600,de=1782e6,$e=`${_}.${v}.${C}`,Ae=`${re}.${v}.${C}`,ve=`${_}.${v}.${de}`,Re=1100,Le=1900,Pe=2600,_e=3300,Ce=4e3,Fe=4700,K=5800,Ie=K*3,Oe=[{name:"정상 주소",ticketId:_,exp:C,expLabel:"2026-07-16 무렵",explain:"정상 상태 — 서버가 SECRET으로 재계산한 서명이 주소에 실려온 서명과 일치하고, 만료 시각도 아직 지나지 않았다."},{name:"바꿔치기",ticketId:re,exp:C,expLabel:"2026-07-16 무렵",explain:"바꿔치기 상태 — 페이로드가 한 글자라도 달라지면 서버가 재계산한 서명이 통째로 달라진다. 공격자는 SECRET이 없으니 43번 티켓에 맞는 서명을 만들 수 없다."},{name:"만료된 주소",ticketId:_,exp:de,expLabel:"2026-06-21 무렵",explain:"만료 상태 — 서명은 유효하지만 기한이 지났다. 만료 시각이 페이로드에 박혀 서명으로 봉인되어 있으므로, 공격자가 기한만 늘려 적을 수도 없다."}];async function U(e){const i=new TextEncoder,t=await crypto.subtle.importKey("raw",i.encode(Me),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),p=await crypto.subtle.sign("HMAC",t,i.encode(e));return Array.from(new Uint8Array(p)).map(l=>l.toString(16).padStart(2,"0")).join("").slice(0,16)}const De={scen:0,mutated:!1,rows:0},ze=`
.tad-addr { font-family: ${ne}; font-size: 14px; line-height: 1.7; word-break: break-all; background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 14px 16px; }
.tad-legend { display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: 10px; font-size: 11px; color: #868e96; }
.tad-legend span::before { content: ''; display: inline-block; width: 8px; height: 8px; border-radius: 2px; margin-right: 5px; background: var(--c); }
.tad-panel { border: 1px solid #e9ecef; border-radius: 8px; padding: 14px 16px; font-size: 13px; margin-top: 16px; }
.tad-row { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; padding: 3px 0; color: #495057; opacity: 0; transition: opacity 0.35s ease; }
.tad-row[data-shown='true'] { opacity: 1; }
.tad-row .tad-k { min-width: 168px; color: #868e96; font-size: 12px; }
.tad-mono { font-family: ${ne}; font-size: 12px; word-break: break-all; }
.tad-final { margin-top: 10px; padding: 10px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; transition: background 0.35s ease, color 0.35s ease; }
.tad-flash { border-radius: 3px; animation: tad-flash 1.1s ease; }
@keyframes tad-flash {
  0% { background: #fa5252; color: #fff; }
  30% { background: transparent; }
  55% { background: #fa5252; color: #fff; }
  100% { background: transparent; }
}
.tad-foot { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px; margin-top: 12px; }
.tad-progress { flex-shrink: 0; font-size: 11px; color: #adb5bd; font-variant-numeric: tabular-nums; }
.tad-explain { flex: 1 1 240px; font-size: 12px; color: #868e96; line-height: 1.6; }
@media (max-width: 420px) {
  .tad-addr { font-size: 12px; }
  .tad-row .tad-k { min-width: 100%; }
}
`,ot=()=>{const[e,i]=y.useState(null),[t,p]=y.useState(De);y.useEffect(()=>{let R=!1,M=0;return Promise.all([U($e),U(Ae),U(ve)]).then(([H,ge,ue])=>{if(R)return;i({valid:H,forged:ge,expired:ue});const xe=performance.now(),Q=be=>{if(R)return;const J=Math.max(0,be-xe)%Ie,I=Math.min(2,Math.floor(J/K)),$=J-I*K,Z=I>0&&$>=Re;let N=0;$>=Fe?N=5:$>=Ce?N=4:$>=_e?N=3:$>=Pe?N=2:$>=Le&&(N=1),p(O=>O.scen===I&&O.mutated===Z&&O.rows===N?O:{scen:I,mutated:Z,rows:N}),M=requestAnimationFrame(Q)};M=requestAnimationFrame(Q)}),()=>{R=!0,cancelAnimationFrame(M)}},[]);const{scen:l,mutated:r,rows:o}=t,n=Oe[l],a=r?n.ticketId:_,c=r||l===0?n.exp:C,x=r&&l===1,g=r&&l===2,f=e===null?null:l===2&&r?e.expired:e.valid,u=`${a}.${v}.${c}`,h=e===null?null:l===1&&r?e.forged:l===2&&r?e.expired:e.valid,k=h===null||f===null,S=!k&&h===f,d=c>ae;let b="#f1f3f5",T="#868e96",F=k?"계산 중…":"검증 중…";!k&&o>=5&&(S&&d?(b="#d3f9d8",T="#2b8a3e",F=`✅ 티켓 #${a}에 사용자 ${v}의 코멘트로 저장`):S?(b="#ffe3e3",T="#c92a2a",F="❌ 거절: 만료된 주소"):(b="#ffe3e3",T="#c92a2a",F="❌ 거절: 서명 불일치"));const j=(R,M,H=!1)=>s.jsx("span",{className:H?"tad-flash":void 0,style:{color:M,fontWeight:M==="#868e96"?400:700},children:R}),W=s.jsx("span",{style:{color:"#adb5bd"},children:"."});return s.jsxs("div",{style:{border:"1px solid #dee2e6",borderRadius:8,padding:20,margin:"24px 0",background:"#fff",fontFamily:je},children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:ze}}),s.jsxs("div",{className:"tad-addr",children:[j("reply+","#868e96"),j(String(a),x?"#fa5252":"#228be6",x),W,j(String(v),"#40c057"),W,j(String(c),g?"#fa5252":"#f59f00",g),W,j(f??"계산 중…","#7048e8"),j("@relay.example.com","#868e96")]}),s.jsxs("div",{className:"tad-legend",children:[s.jsx("span",{style:{"--c":"#228be6"},children:"티켓"}),s.jsx("span",{style:{"--c":"#40c057"},children:"사용자"}),s.jsx("span",{style:{"--c":"#f59f00"},children:"만료"}),s.jsx("span",{style:{"--c":"#7048e8"},children:"서명"})]}),s.jsxs("div",{className:"tad-panel",children:[s.jsxs("div",{className:"tad-row","data-shown":o>=1,children:[s.jsx("span",{className:"tad-k",children:"서버가 다시 계산한 서명"}),s.jsx("span",{className:"tad-mono",style:{color:"#7048e8"},children:h??"계산 중…"}),s.jsxs("span",{className:"tad-mono",style:{color:"#adb5bd",fontSize:11},children:['= HMAC("',u,'", SECRET)']})]}),s.jsxs("div",{className:"tad-row","data-shown":o>=2,children:[s.jsx("span",{className:"tad-k",children:"주소에 실려온 서명"}),s.jsx("span",{className:"tad-mono",style:{color:"#7048e8"},children:f??"계산 중…"})]}),s.jsxs("div",{className:"tad-row","data-shown":o>=3,children:[s.jsx("span",{className:"tad-k",children:"서명 일치 여부"}),k?s.jsx("span",{style:{color:"#868e96"},children:"계산 중…"}):S?s.jsx("span",{style:{color:"#2f9e44",fontWeight:700},children:"✓ 일치"}):s.jsx("span",{style:{color:"#fa5252",fontWeight:700},children:"✗ 불일치"})]}),s.jsxs("div",{className:"tad-row","data-shown":o>=4,children:[s.jsxs("span",{className:"tad-k",children:["만료 검사 (지금: ",ae,")"]}),d?s.jsxs("span",{style:{color:"#2f9e44",fontWeight:700},children:["✓ 통과 ",s.jsxs("span",{style:{fontWeight:400,fontSize:11},children:["— ",n.expLabel,"까지 유효"]})]}):s.jsxs("span",{style:{color:"#fa5252",fontWeight:700},children:["✗ 만료 ",s.jsxs("span",{style:{fontWeight:400,fontSize:11},children:["— ",n.expLabel,"에 지남"]})]})]}),s.jsx("div",{className:"tad-final",style:{background:b,color:T},children:F})]}),s.jsxs("div",{className:"tad-foot",children:[s.jsxs("span",{className:"tad-progress",children:["시나리오 ",l+1,"/3 — ",n.name]}),s.jsx("span",{className:"tad-explain",children:n.explain})]})]})},We=[/^On .+ wrote:$/,/^20\d{2}년 .+님이 작성:$/,/^\d{4}\. \d{1,2}\. \d{1,2}\..* 작성:$/],He=[/^-{2,}\s*Original Message\s*-{2,}$/i,/^-{2,}\s*원본 (메일|메시지)\s*-{2,}$/,/^_{10,}$/,/^보낸 ?사람\s*:.+/,/^From\s*:\s*.+@.+/],Be=[/^-- $/,/^--$/,/^(Sent from my|Get Outlook for) /,/^i(Phone|Pad)에서 보냄$/,/^Android에서 .*보냄$/];function pe(e){const i=e.replace(/\r\n/g,`
`).split(`
`),t=[];let p=!1,l=!1;for(let o=0;o<i.length;o++){const n=i[o].trimEnd();if(p)t.push("quote");else if(He.some(a=>a.test(n)))p=!0,t.push("quote-header");else if(n.startsWith(">"))l=!1,t.push("quote");else if(We.some(a=>a.test(n))){const a=i.slice(o+1).find(c=>c.trim()!=="");t.push(a===void 0||a.startsWith(">")?"quote-header":"content")}else l?t.push("signature"):Be.some(a=>a.test(n))?(l=!0,t.push("signature")):t.push("content")}const r=new Array(i.length).fill(!1);for(let o=i.length-1;o>=0&&!(t[o]==="content"&&i[o].trim()!=="");o--)r[o]=!0;return i.map((o,n)=>({text:o,kind:t[n],hidden:r[n]}))}function Ye(e){return pe(e).filter(i=>!i.hidden).map(i=>i.text).join(`
`).trim()}const A="'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",le="ui-monospace, SFMono-Regular, Menlo, monospace",qe=[{name:"Gmail 답장",body:`안녕하세요, 빠른 답변 감사합니다!

서울시 강남구 테헤란로 123, 45층 (주)어썸커머스 앞으로 부탁드립니다.
수령인은 그대로 두시면 됩니다.

-- 
김한나 드림

2026년 7월 10일 (금) 오후 2:07, 박상담 (도움말센터) <notify@relay.example.com>님이 작성:

> 안녕하세요 김한나 님, 도움말센터 박상담입니다.
>
> 아직 출고 전이라 배송지 변경이 가능합니다. 변경하실 주소를 이 메일에 답장으로
> 보내주세요.
>
> 감사합니다.`},{name:"Outlook 답장",body:`네 확인했습니다. 회사 주소로 변경해주세요.

보낸 사람: 박상담 (도움말센터) <notify@relay.example.com>
보낸 날짜: 2026년 7월 10일 금요일 오후 2:07
받는 사람: 김한나 <hanna.kim@gmail.com>
제목: Re: [티켓 #42] 주문한 상품 배송지를 바꾸고 싶어요

안녕하세요 김한나 님, 도움말센터 박상담입니다.

아직 출고 전이라 배송지 변경이 가능합니다.`},{name:"인라인 답장",body:`> 변경하실 주소를 알려주세요.

테헤란로 123입니다.

> 수령인도 바뀌나요?

아니요, 그대로입니다.

2026년 7월 10일 (금) 오후 2:07, 박상담 (도움말센터) <notify@relay.example.com>님이 작성:
> 안녕하세요 김한나 님, 도움말센터 박상담입니다.`},{name:"모바일 답장",body:`회사 주소로 부탁드려요

iPhone에서 보냄`}],Ue={content:"#212529",quote:"#adb5bd","quote-header":"#e8590c",signature:"#7048e8"},Ve=[{color:"#212529",label:"본문"},{color:"#adb5bd",label:"인용"},{color:"#e8590c",label:"인용 헤더"},{color:"#7048e8",label:"시그니처"}],ce=500,me=120,fe=200,V=300,Ge=7e3,E=qe.map(e=>{const i=pe(e.body),t=i.length,p=i.filter(c=>c.hidden).length,l=p<t?p+1:t,r=ce+V,o=r+t*me+V,n=o+l*fe+V,a=n+Math.max(2e3,Ge-n);return{name:e.name,lines:i,reply:Ye(e.body),sweepCount:l,classifyStart:r,sweepStart:o,resultStart:n,total:a}}),X=E.reduce((e,i,t)=>[...e,(e[t-1]??0)+(t===0?0:E[t-1].total)],[]),Ke=X[E.length-1]+E[E.length-1].total,he=19.2,Xe=Math.max(...E.map(e=>e.lines.length)),Qe=Math.max(...E.map(e=>e.reply===""?1:e.reply.split(`
`).length)),Je=Math.ceil(Xe*he+20),Ze=Math.ceil(Qe*he+49),et=["① 답장 원문이 줄 단위로 들어온다","② 줄마다 종류를 분류한다","③ 아래에서 위로 걷어내다 본문을 만나면 멈춘다","④ 남은 본문만 코멘트로 저장한다"],tt=`
.rpd-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
.rpd-preset { font-family: ${A}; font-size: 12px; font-weight: 700; color: #868e96; }
.rpd-legend { display: flex; flex-wrap: wrap; gap: 4px 12px; font-family: ${A}; font-size: 11px; color: #868e96; margin-bottom: 6px; }
.rpd-legend-item { display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
.rpd-legend-swatch { width: 9px; height: 9px; border-radius: 2px; display: inline-block; }
.rpd-lines { border: 1px solid #dee2e6; border-radius: 6px; background: #f8f9fa; padding: 10px 10px 10px 6px; font-family: ${le}; font-size: 12px; line-height: 1.6; overflow-x: auto; min-height: ${Je}px; }
.rpd-line { padding-left: 8px; border-left: 3px solid transparent; white-space: pre; min-height: 1.6em; opacity: 0; transition: color 0.18s ease, opacity 0.25s ease, background 0.15s ease; }
.rpd-line[data-visible='true'] { opacity: 1; }
.rpd-line[data-kind='content'][data-struck='false'] { border-left-color: #40c057; }
.rpd-line[data-struck='true'] { text-decoration: line-through; opacity: 0.4; }
.rpd-line[data-scan='true'] { background: #fff3bf; }
.rpd-result-slot { min-height: ${Ze}px; margin-top: 14px; }
.rpd-result { border-radius: 6px; padding: 12px 14px; font-family: ${A}; animation: rpd-fade-in 0.35s ease; }
.rpd-result-label { font-size: 11px; font-weight: 700; margin-bottom: 6px; }
.rpd-result-body { font-family: ${le}; font-size: 12px; line-height: 1.6; white-space: pre-wrap; word-break: break-all; color: #212529; }
.rpd-caption { font-family: ${A}; font-size: 12px; color: #868e96; text-align: center; margin-top: 12px; min-height: 1.5em; }
@keyframes rpd-fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
`,it=()=>{const[e,i]=y.useState({preset:0,phase:0,prog:0}),t=y.useRef("0-0-0");y.useEffect(()=>{let n=0;const a=performance.now(),c=x=>{const g=(x-a)%Ke;let f=0;for(let T=E.length-1;T>=0;T--)if(g>=X[T]){f=T;break}const u=E[f],h=Math.max(0,g-X[f]),k=u.lines.length;let S,d;h<u.classifyStart?(S=0,d=Math.min(k,Math.floor(Math.max(0,h)/(ce/k))+1)):h<u.sweepStart?(S=1,d=Math.min(k,Math.floor(Math.max(0,h-u.classifyStart)/me)+1)):h<u.resultStart?(S=2,d=Math.min(u.sweepCount,Math.floor(Math.max(0,h-u.sweepStart)/fe)+1)):(S=3,d=u.sweepCount);const b=`${f}-${S}-${d}`;b!==t.current&&(t.current=b,i({preset:f,phase:S,prog:d})),n=requestAnimationFrame(c)};return n=requestAnimationFrame(c),()=>cancelAnimationFrame(n)},[]);const p=E[e.preset],l=p.lines.length,{phase:r,prog:o}=e;return s.jsxs("div",{style:{border:"1px solid #dee2e6",borderRadius:8,padding:20,margin:"24px 0",background:"#fff",fontFamily:A},children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:tt}}),s.jsx("div",{className:"rpd-head",children:s.jsxs("span",{className:"rpd-preset",children:[p.name," (",e.preset+1,"/",E.length,")"]})}),s.jsxs("div",{className:"rpd-legend",children:[Ve.map(n=>s.jsxs("span",{className:"rpd-legend-item",children:[s.jsx("span",{className:"rpd-legend-swatch",style:{background:n.color}}),n.label]},n.label)),s.jsx("span",{className:"rpd-legend-item",style:{textDecoration:"line-through"},children:"취소선 = 걷어냄"})]}),s.jsx("div",{className:"rpd-lines",children:p.lines.map((n,a)=>{const c=r>0||o>a,x=r>=2||r===1&&o>a,g=n.hidden&&(r===3||r===2&&a>=l-o),f=r===2&&a===l-o;return s.jsx("div",{className:"rpd-line","data-visible":c,"data-kind":x?n.kind:"none","data-struck":g,"data-scan":f,style:{color:x?Ue[n.kind]:"#495057"},children:n.text===""?" ":n.text},a)})}),s.jsx("div",{className:"rpd-result-slot",children:r===3&&(p.reply===""?s.jsxs("div",{className:"rpd-result",style:{background:"#fff5f5",border:"1px solid #fa5252"},children:[s.jsx("div",{className:"rpd-result-label",style:{color:"#c92a2a"},children:"코멘트로 저장될 내용"}),s.jsx("div",{className:"rpd-result-body",style:{color:"#c92a2a",fontFamily:A,fontSize:12},children:"본문이 비어 있어 코멘트를 만들지 않는다"})]}):s.jsxs("div",{className:"rpd-result",style:{background:"#ebfbee",border:"1px solid #40c057"},children:[s.jsx("div",{className:"rpd-result-label",style:{color:"#2b8a3e"},children:"코멘트로 저장될 내용"}),s.jsx("div",{className:"rpd-result-body",children:p.reply})]}))}),s.jsx("div",{className:"rpd-caption",children:et[r]})]})};export{at as RelayFlowDiagram,it as ReplyParserDemo,lt as SmtpSessionDemo,ot as TokenAnatomyDemo};
