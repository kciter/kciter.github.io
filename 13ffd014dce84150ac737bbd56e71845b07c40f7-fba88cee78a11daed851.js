"use strict";(self.webpackChunkkciter_so=self.webpackChunkkciter_so||[]).push([[4459],{5655:function(n,i,e){e.r(i);var r=e(6494),l=e(9128),h=e(5799);function c(n){const i=Object.assign({p:"p",h1:"h1",a:"a",strong:"strong",ul:"ul",li:"li",h2:"h2",span:"span"},(0,l.R)(),n.components);return(0,r.FD)(r.FK,{children:[(0,r.Y)(i.p,{children:"필자를 포함하여 대부분의 개발자가 만드는 것은 생명과 직결된 항공이나 핵발사 프로그램 같은 것이 아닐 것이다. 따라서 우리가 만드는 제품은 생산성과 안정성 사이에서 생산성을 택하는 경우가 많으며 이로 인해 발생하는 품질 확인 공백은 결함으로 이어지는 경우가 많다. 즉, 생산성을 포기하면서까지 꼼꼼하게 확인하지는 않기 때문에 결함을 막기 위한 다양한 방법론과 도구를 사용하더라도 완전히 제거하는 것은 불가능에 가깝다. 당연하게도 이는 규모가 클 수록 더 힘들어진다."}),"\n",(0,r.Y)(i.p,{children:"다행히 프로그램이란 것은 물리적인 제약이 없기 때문에 문제가 발견되더라도 제품이 릴리즈되기 전에 문제를 해결하는 것이 가능하다. 그래서 대부분 개발자는 가능한 꼼꼼하게 작성하되 문제가 발생할 경우 디버깅을 통해 문제를 신속하게 해결하는 전략을 사용한다. 이러한 환경과 문화를 고려했을 때 디버깅이란 것은 사실상 개발자의 필수 역량이라고 할 수 있다."}),"\n",(0,r.Y)(i.p,{children:"어느정도 경력이 쌓인 개발자라면 누구나 자신만의 디버깅 원칙을 가지고 있을 것이다. 말 그대로 자신만의 원칙이기 때문에 사람마다 접근하는 방식이 다를 수 있다. 이 글에 대해 동의하지 못하는 개발자가 있을 수 있지만 필자는 그래도 어느 정도 디버깅을 잘하는 편이라 자부하며 이 글에서는 나만의 디버깅 원칙을 정리해보고자 한다. 만약 전부 읽기 귀찮거나 시간이 없다면 글 가장 하단만을 봐도 괜찮다."}),"\n",(0,r.Y)(i.h1,{id:"마인드셋",children:(0,r.Y)(i.a,{href:"#마인드셋",children:"마인드셋"})}),"\n",(0,r.FD)(i.p,{children:["어떻게보면 디버깅은 잡기술이라 볼 수도 있지만 그렇기 때문에 ",(0,r.Y)(i.strong,{children:"어떻게 접근할 것인가라는 마인드셋이 중요"}),"하다. 우선 디버깅을 한 문장으로 표현하자면 ",(0,r.Y)(i.strong,{children:"예상하지 못한 동작을 올바르게 만드는 과정"}),'이다. 그러다보니 디버깅을 하다보면 "분명 이곳이 잘못된 부분일 것 같은데"같은 생각으로 인해 엉뚱한 부분에 매몰되는 경우가 많다. 이는 예상하지 못한 동작이라는 부분에 대한 나의 생각이 의심을 넘어 확신으로 변하기 때문이다. 많은 개발자들이 디버깅을 할 때 이러한 상황에 빠지게 되는데 이는 엄청난 시간을 소비하게 되며 개발자의 멘탈적인 부분에서도 타격을 주게 된다.']}),"\n",(0,r.Y)(h.A,{src:"/images/2024-03-16-principles-of-debugging/sunk-cost-fallacy.png",caption:"혹시 매몰비용의 오류를 범하고 있지 않은가?"}),"\n",(0,r.FD)(i.p,{children:["따라서 디버깅을 할 때는 ",(0,r.Y)(i.strong,{children:"모든 것을 의심하는 것"}),"이 중요하다. 물론 나 자신을 가장 믿지 않아야 한다."]}),"\n",(0,r.Y)(i.h1,{id:"체크리스트-작성",children:(0,r.Y)(i.a,{href:"#체크리스트-작성",children:"체크리스트 작성"})}),"\n",(0,r.FD)(i.p,{children:["디버깅은 예상하지 못한 동작의 원인을 찾기 위하여 ",(0,r.Y)(i.strong,{children:"가능성을 좁혀나가는 행위"}),"를 하게된다. 따라서 내가 확인한 부분과 앞으로 확인해야 하는 부분을 체크리스트로 작성하는 것은 큰 도움이 된다. 번거롭게 느껴질 수도 있지만 체크리스트를 작성하는 것이 오히려 시간을 절약하는 경우가 많다."]}),"\n",(0,r.Y)(i.p,{children:"체크리스트는 큰 범주에서 작게는 세세한 부분까지 작성하는 것이 좋다. 이 말이 확인할 모든 부분에 대해 체크리스트를 작성하라는 말은 아니다. 디버깅은 설계를 하는 것이 아니기 때문에 문제가 있는 부분을 좁혀나가는 것이 중요하다. 그래서 큰 범주에 대한 체크리스트만 먼저 작성하고 의심되는 범주에 대해 조금씩 파고들면서 검증하고 떠오르는 생각을 체크리스트로 작성하며 확인하는 것이다. 이런 방식으로 작업하면 특정 부분만을 확인하는 과몰입 방지에 도움이 된다. 그리고 당연하게도 체크리스트를 작성하면 무엇을 확인했는지 알 수 있기 때문에 중복 확인을 방지할 수 있으며 다음으로 확인해야 하는 부분을 빠르게 떠올릴 수 있다."}),"\n",(0,r.Y)(i.p,{children:"요약하자면 체크리스트를 작성하는 것은 다음과 같은 이유로 유용하다."}),"\n",(0,r.FD)(i.ul,{children:["\n",(0,r.Y)(i.li,{children:"체크리스트를 작성하면 무엇을 확인해야 하는지, 무엇을 확인했는지 알 수 있다."}),"\n",(0,r.Y)(i.li,{children:"한 영역에 대해 과몰입하는 것을 어느정도 방지할 수 있다."}),"\n"]}),"\n",(0,r.Y)(i.h1,{id:"디버깅을-하기-전에",children:(0,r.Y)(i.a,{href:"#디버깅을-하기-전에",children:"디버깅을 하기 전에"})}),"\n",(0,r.Y)(i.p,{children:"문제를 발견하고 본격적으로 디버깅을 하기 전에 다음과 같은 것을 미리 확인하는 것이 좋다."}),"\n",(0,r.Y)(i.h2,{id:"웬만하면-디버거를-사용하라",children:(0,r.Y)(i.a,{href:"#웬만하면-디버거를-사용하라",children:"웬만하면 디버거를 사용하라"})}),"\n",(0,r.Y)(i.p,{children:"의외로 디버거를 사용하지 않는 개발자가 많다. 웬만한 언어는 디버거를 지원하고 있으며 디버거를 사용하면 디버깅을 훨씬 효율적으로 할 수 있다. 그리고 IDE를 사용한다면 디버거를 사용하는 것이 더욱 편리하다. 특별한 이유가 없다면 항상 디버깅 모드로 애플리케이션을 실행하도록 하자."}),"\n",(0,r.Y)(i.h2,{id:"로그를-남기자",children:(0,r.Y)(i.a,{href:"#로그를-남기자",children:"로그를 남기자"})}),"\n",(0,r.Y)(i.p,{children:"필수로 남겨야할 에러 로그, 예외 처리 로그 등이 아니더라도 개발을 하면서 중요한 정보를 로그로 남기는 것이 좋다. 이는 디버깅을 할 때 중요한 정보를 얻을 수 있기 때문이다. 물론 로그를 남기는 것이 무조건 좋은 것은 아니며 로그를 남기는 것도 과하게 남기면 오히려 디버깅을 어렵게 할 수 있다. 그럼에도 불구하고 로그를 남기는 것이 웬만하면 도움이 된다. 로그를 남기면 다음과 같은 이점이 있다."}),"\n",(0,r.FD)(i.ul,{children:["\n",(0,r.Y)(i.li,{children:"로직의 순서 파악"}),"\n",(0,r.Y)(i.li,{children:"데이터의 상태 파악"}),"\n",(0,r.Y)(i.li,{children:"예외 발생 시 원인 파악"}),"\n"]}),"\n",(0,r.Y)(i.h2,{id:"어이없는-실수를-의심하라",children:(0,r.Y)(i.a,{href:"#어이없는-실수를-의심하라",children:"어이없는 실수를 의심하라"})}),"\n",(0,r.Y)(i.p,{children:"간혹 어이없는 실수로 인해 프로그램 동작에 문제가 생기는 경우가 있다. 대표적인 사례로는 다음과 같은 것들이 있다."}),"\n",(0,r.FD)(i.ul,{children:["\n",(0,r.Y)(i.li,{children:"오타"}),"\n",(0,r.Y)(i.li,{children:"잘못된 변수 사용"}),"\n",(0,r.Y)(i.li,{children:"잘못된 조건문 사용"}),"\n",(0,r.Y)(i.li,{children:"계산 실수"}),"\n"]}),"\n",(0,r.Y)(i.p,{children:"의외로 위와 같은 실수가 문제의 원인이 되는 경우가 많다. 다음과 같은 사례가 있다."}),"\n",(0,r.FD)(i.ul,{children:["\n",(0,r.Y)(i.li,{children:"문자열로 상태를 기록하는데 오타를 낸 경우"}),"\n",(0,r.FD)(i.li,{children:["조건문에서 ",(0,r.Y)(i.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">if (a == 1)</code>'}}),"을 사용해야 하는데 ",(0,r.Y)(i.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">if (a = 1)</code>'}}),"을 사용한 경우"]}),"\n",(0,r.Y)(i.li,{children:"계산식을 잘못 작성한 경우. 예를 들면 연산자 우선순위를 잘못 작성하는 경우"}),"\n",(0,r.Y)(i.li,{children:"멤버 변수를 사용해야 하는데 동일한 이름의 지역 변수를 사용한 경우"}),"\n"]}),"\n",(0,r.FD)(i.p,{children:["이러한 실수는 디버거를 사용하더라도 찾기 어려울 수 있기 때문에 ",(0,r.Y)(i.strong,{children:"어이없는 실수를 의심하는 것"}),"이 중요하다. 참고로 위 내용은 IDE에서 잡아주는 경우도 많다. 그러니 IDE의 경고를 무시하지 말자."]}),"\n",(0,r.Y)(i.h1,{id:"디버깅-드릴링",children:(0,r.Y)(i.a,{href:"#디버깅-드릴링",children:"디버깅 드릴링"})}),"\n",(0,r.FD)(i.p,{children:["어이없는 실수로 인한 문제를 제외한다면 ",(0,r.Y)(i.strong,{children:"디버깅은 큰 범위에서 좁은 범위로 좁혀나가는 탑다운적인 사고 방식이 유용"}),"하다. 필자는 이를 디버깅 드릴링이라고 부르고 다음과 같은 순서로 진행된다."]}),"\n",(0,r.FD)(i.ul,{children:["\n",(0,r.Y)(i.li,{children:"논리적 결함 확인"}),"\n",(0,r.Y)(i.li,{children:"의존 기술 결함 확인"}),"\n",(0,r.Y)(i.li,{children:"과학적 결함 확인"}),"\n",(0,r.Y)(i.li,{children:"물리적 결함 확인"}),"\n"]}),"\n",(0,r.Y)(i.p,{children:"상황에 따라 위 순서는 변경될 수 있다. 유연하게 대처하는 것이 디버깅의 핵심이다."}),"\n",(0,r.Y)(i.h2,{id:"논리적-결함",children:(0,r.Y)(i.a,{href:"#논리적-결함",children:"논리적 결함"})}),"\n",(0,r.Y)(i.p,{children:"논리적 결함은 셋으로 나눌 수 있다. 각각 로직에 대한 결함, 데이터에 대한 결함, 그리고 기획에 대한 결함이다."}),"\n",(0,r.Y)(i.p,{children:"로직에 대한 결함은 당연히 내가 작성한 코드에 대한 결함이다. 이는 대부분 디버거를 사용하여 로직의 흐름을 파악하면 쉽게 문제가 있는지 확인할 수 있다. 물론 디버거를 사용하지 않고도 확인할 수 있지만 디버거를 사용하면 훨씬 효율적으로 확인할 수 있다."}),"\n",(0,r.Y)(i.p,{children:"데이터에 대한 결함은 데이터의 상태를 확인하는 것이 중요하다. 이는 로그를 확인하거나 디버거를 사용하여 데이터의 상태를 확인하는 것이 중요하다. 데이터의 상태를 확인하는 것은 로직에 대한 결함을 확인하는 것과 병행하여 진행되어야 한다."}),"\n",(0,r.Y)(i.p,{children:"기획에 대한 결함은 요구사항을 잘못 이해했거나 기획 자체에 문제가 있는 경우에 해당한다. 이런 경우는 요구사항을 다시 검토하여 기획한 사람 혹은 고객과 상의하여 해결해야 한다."}),"\n",(0,r.Y)(i.h2,{id:"의존-기술-결함-확인",children:(0,r.Y)(i.a,{href:"#의존-기술-결함-확인",children:"의존 기술 결함 확인"})}),"\n",(0,r.Y)(i.p,{children:"이 글에서 말하는 의존 기술이란 프레임워크나 라이브러리, 언어 등을 말한다. 발생 할 수 있는 문제는 크게 다음과 같다."}),"\n",(0,r.FD)(i.ul,{children:["\n",(0,r.Y)(i.li,{children:"설정 문제"}),"\n",(0,r.Y)(i.li,{children:"버전 문제"}),"\n",(0,r.Y)(i.li,{children:"잘못된 사용 방법"}),"\n",(0,r.Y)(i.li,{children:"버그"}),"\n"]}),"\n",(0,r.FD)(i.p,{children:[(0,r.Y)(i.strong,{children:"설정 문제"}),"는 대부분 해당 기술의 문서를 참고하는 것으로 해결할 수 있다. 의심 되는 부분이 있다면 문서를 잘 확인해보자."]}),"\n",(0,r.FD)(i.p,{children:[(0,r.Y)(i.strong,{children:"버전 문제"}),"는 대부분 버전을 올리거나 내리는 것으로 해결할 수 있다. 특히 라이브러리의 경우 의존성 설정 중 자동으로 업데이트 되어 버전이 올라가는 경우가 많다. 이런 경우에 간혹 버전이 올라가며 라이브러리 자체에 버그가 생겼거나 기능이 변경되는 등 문제가 발생할 수 있다. 이런 경우에는 버전을 내리는 것이 해결책이 될 수 있다. 혹은 문서는 최신 버전을 보고있지만 낮은 버전을 사용하여 문제가 되는 경우도 있다. 그러니 버전을 확인하는 것은 중요하다."]}),"\n",(0,r.FD)(i.p,{children:[(0,r.Y)(i.strong,{children:"잘못된 사용 방법"}),"은 대부분 스택오버플로우나 블로그 문서 등을 보며 작업했을 때 발생한다. 이런 경우엔 해당 기술의 문서를 참고하는 것으로 해결할 수 있다. 이는 설정 문제와 비슷하다."]}),"\n",(0,r.FD)(i.p,{children:["간혹 의존하는 기술에 ",(0,r.Y)(i.strong,{children:"버그"}),"가 있는 경우가 있다. 이에 대한 것은 정말 찾기 힘들고 커뮤니티가 활발하지 않은 경우엔 해결하기 어려울 수 있다. 의존 기술 자체에 버그가 있는 것이 의심된다면 커뮤니티에 문의하거나 해당 기술의 이슈 트래커를 확인해보는 것이 가장 좋다."]}),"\n",(0,r.Y)(i.h2,{id:"과학적-결함",children:(0,r.Y)(i.a,{href:"#과학적-결함",children:"과학적 결함"})}),"\n",(0,r.Y)(i.p,{children:"과학적 결함은 컴퓨터 과학적인 문제로 인해 발생하는 결함이다. 이는 주로 메모리나 성능, 통신 등과 관련된 문제이다. 이에 대한 문제를 해결하기 위해선 컴퓨터 과학 지식이 필요하며 관련 툴을 잘 사용하는 것이 중요하다."}),"\n",(0,r.FD)(i.p,{children:[(0,r.Y)(i.strong,{children:"메모리 문제"}),"는 대부분 메모리 누수로 인해 발생한다. 이는 관련 점검 툴을 이용하여 확인할 수 있다. 간혹 메모리 덤프와 같은 방법을 사용하여 확인할 수도 있다."]}),"\n",(0,r.FD)(i.p,{children:["간혹 ",(0,r.Y)(i.strong,{children:"성능 문제"}),"로 인해 타임 아웃이 발생하거나 프로그램 자체가 멈출 수 있다. 이는 프로파일링 툴을 사용하여 확인할 수 있다."]}),"\n",(0,r.FD)(i.p,{children:[(0,r.Y)(i.strong,{children:"통신 문제"}),"는 대부분 네트워크 문제로 인해 발생한다. 타임 아웃 혹은 커넥션 문제가 발생하는 경우가 대부분이다. 이는 네트워크 툴을 사용하여 확인할 수 있다."]}),"\n",(0,r.Y)(i.h2,{id:"물리적-결함",children:(0,r.Y)(i.a,{href:"#물리적-결함",children:"물리적 결함"})}),"\n",(0,r.Y)(i.p,{children:"물리적 결함은 하드웨어적인 문제인 가능성이다. 디버깅 중 여기까지 오는 경우는 드물지만 전혀 없는 사례는 아니다. 임시로 다른 장비에서 테스트해보거나 하드웨어에 고장이 있는지 확인하는 것이 좋다."}),"\n",(0,r.Y)(i.h1,{id:"마치며",children:(0,r.Y)(i.a,{href:"#마치며",children:"마치며"})}),"\n",(0,r.Y)(i.p,{children:"마지막으로 앞서 작성한 글을 정리해보자."}),"\n",(0,r.FD)(i.ul,{children:["\n",(0,r.Y)(i.li,{children:"디버깅을 할 때는 모든 것을 의심하라"}),"\n",(0,r.Y)(i.li,{children:"가능성을 좁혀나가기 위해 체크리스트를 작성하라"}),"\n",(0,r.Y)(i.li,{children:"디버거를 사용하라"}),"\n",(0,r.Y)(i.li,{children:"로그를 잘 남기자"}),"\n",(0,r.Y)(i.li,{children:"어이없는 실수를 의심하자"}),"\n",(0,r.Y)(i.li,{children:"큰 범위에서 좁은 범위로 좁혀나가는 탑다운적인 사고 방식을 이용하라"}),"\n"]}),"\n",(0,r.Y)(i.p,{children:"AI가 코드를 생산해주는 시대기에 역설적으로 디버깅은 더 중요해질 것이다. 그만큼 디버깅을 잘하는 것은 개발자로서 중요한 역량이 될 것이다. 그러니 만약 나만의 유용한 디버깅 원칙이 존재한다면 필자처럼 정리해보는 것을 추천한다. 더 나아가 좋은 팁을 공유한다면 더할나위 없을 것이다."})]})}i.default=function(n){void 0===n&&(n={});const{wrapper:i}=Object.assign({},(0,l.R)(),n.components);return i?(0,r.Y)(i,Object.assign({},n,{children:(0,r.Y)(c,n)})):c(n)}},5799:function(n,i,e){var r=e(9474),l=e(1615),h=e(6494);i.A=n=>{let{src:i,caption:e,width:c,expandable:d}=n;const{0:Y,1:t}=(0,r.useState)(!1);return(0,h.FD)("figure",{children:[(0,h.Y)("img",{src:i,width:c,style:{cursor:d?"zoom-in":"default"},onClick:d?()=>t(!0):void 0}),e&&(0,h.Y)("figcaption",{dangerouslySetInnerHTML:{__html:e}}),Y&&l.createPortal((0,h.Y)("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",cursor:"zoom-out",backgroundColor:"rgba(0, 0, 0, 0.7)"},onClick:()=>t(!1),children:(0,h.Y)("div",{style:{borderRadius:8,maxWidth:1200,width:"80%",position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",backgroundColor:"white"},children:(0,h.Y)("img",{src:i,width:"100%"})})}),document.body)]})}}}]);
//# sourceMappingURL=13ffd014dce84150ac737bbd56e71845b07c40f7-fba88cee78a11daed851.js.map