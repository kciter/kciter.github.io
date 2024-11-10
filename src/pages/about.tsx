import React from 'react';
import DefaultTemplate from '@templates/default';
import SEO from '@components/SEO';

interface LinkProps {
  children: React.ReactNode;
  href: string;
}

const Link = ({ children, href }: LinkProps) => {
  return (
    <a href={href} style={{ textDecoration: 'none', color: '#5c6ac4' }} target="_blank">
      {children}
    </a>
  );
};

const About = () => {
  const writings = [
    {
      href: 'https://product.kyobobook.co.kr/detail/S000213641007',
      text: '코딩 테스트 합격자 되기: 자바스크립트 편'
    },
    {
      href: 'https://product.kyobobook.co.kr/detail/S000212233308',
      text: '리액트 훅을 활용한 마이크로 상태 관리'
    },
    {
      href: 'http://www.yes24.com/24/goods/56894866',
      text: 'Vue.js 이 정도는 알아야지'
    }
  ];

  const presentations = [
    {
      href: 'https://kciter.so/pt-destroying-software',
      text: '소프트웨어 파괴의 미학 | Devcon 2024'
    },
    {
      href: 'https://kciter.so/pt-kotlin-script',
      text: 'Kotlin Script 활용하기'
    },
    {
      href: 'https://www.youtube.com/watch?v=EgLxbFmPRoU',
      text: '소프트웨어 설계를 위한 추상적, 구조적 사고 │ 인프콘2023'
    },
    {
      href: 'https://www.slideshare.net/sunhyouplee/mongodb-243592318',
      text: 'MongoDB 이해하기'
    },
    {
      href: 'https://www.slideshare.net/sunhyouplee/deep-dive-into-vuejs',
      text: 'Deep dive into Vue.js'
    },
    {
      href: 'https://www.slideshare.net/sunhyouplee/ss-122400504',
      text: '오픈소스를 여행하는 히치하이커를 위한 안내서'
    },
    {
      href: 'https://www.youtube.com/watch?v=EOo844GSSDY',
      text: 'Vue.js 길라잡이'
    },
    {
      href: 'https://www.slideshare.net/sunhyouplee/metal-uiux-letswift-2017',
      text: "Metal 기반 특별한 UI/UX 제공하기 | Let'Swift 2017"
    },
    {
      href: 'https://www.slideshare.net/sunhyouplee/vuejs-reactive-programming-vuetiful-korea-2nd',
      text: 'Vue.js와 Reactive Programming'
    },
    {
      href: 'https://www.slideshare.net/sunhyouplee/tour-of-vuejs-70654520',
      text: 'Tour of Vue.js'
    },
    {
      href: 'https://www.slideshare.net/sunhyouplee/functional-reactive-programming-with-rxswift-62123571',
      text: 'Functional Reactive Programming With Swift'
    },
    {
      href: 'https://www.slideshare.net/sunhyouplee/realm-60539221',
      text: '파크히어 Realm 사용 사례'
    },
    {
      href: 'https://www.slideshare.net/sunhyouplee/c-33426459',
      text: 'C++ 코드 품질 관리 비법'
    }
  ];

  const opensources = [
    {
      href: 'https://github.com/kciter/qart.js',
      text: 'qart.js'
    },
    {
      href: 'https://github.com/kciter/Floaty',
      text: 'Floaty'
    },
    {
      href: 'https://github.com/kciter/GlitchLabel',
      text: 'GlitchLabel'
    },
    {
      href: 'https://github.com/cobaltinc/caple-design-system',
      text: 'caple-design-system'
    }
  ];

  return (
    <DefaultTemplate>
      <SEO title="About" />

      <h2>💼 Currently working on</h2>
      <ul>
        <li>
          <strong>CoBalt</strong> CTO, 2018. 07 ~ <br />
          Create proposals that impresses wow, streamline workflows, and gain actionable insights to
          close deals faster.{' '}
          <a href="https://realizer.ai" target="_blank">
            REALIZER
          </a>
        </li>
      </ul>

      <h2>⌨️ My Keyboard</h2>
      <div style={{ maxWidth: 400 }}>
        <img src="/images/about/keyboard.jpg" />
      </div>

      <h2>📘 Writing</h2>
      <ul>
        {writings.map(item => (
          <li key={item.href}>
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>

      <h2>📺 Presentation</h2>
      <ul>
        {presentations.map(item => (
          <li key={item.href}>
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>

      <h2>❤️ Open Source</h2>
      <div>
        You can find open sources on my{' '}
        <a href="https://github.com/kciter" target="_blank">
          GitHub profile
        </a>
        !
      </div>
    </DefaultTemplate>
  );
};

export default About;
