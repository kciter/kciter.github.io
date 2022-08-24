import React from "react";
import DefaultTemplate from "@templates/default";
import SEO from "@components/SEO";

interface LinkProps {
  children: React.ReactNode;
  href: string;
}

const Link = ({ children, href }: LinkProps) => {
  return (
    <a
      href={href}
      style={{ textDecoration: "none", color: "#5c6ac4" }}
      target="_blank"
    >
      {children}
    </a>
  );
};

const About = () => {
  const writings = [
    {
      href: "http://www.yes24.com/24/goods/56894866",
      text: "Vue.js 이 정도는 알아야지",
    },
  ];

  const presentations = [
    {
      href: "https://www.slideshare.net/sunhyouplee/ss-243592335",
      text: "웹 개발을 위해 꼭 알아야하는 보안 공격",
    },
    {
      href: "https://www.slideshare.net/sunhyouplee/mongodb-243592318",
      text: "MongoDB 이해하기",
    },
    {
      href: "https://www.slideshare.net/sunhyouplee/deep-dive-into-vuejs",
      text: "Deep dive into Vue.js",
    },
    {
      href: "https://www.slideshare.net/sunhyouplee/ss-122400504",
      text: "오픈소스를 여행하는 히치하이커를 위한 안내서",
    },
    {
      href: "https://www.youtube.com/watch?v=EOo844GSSDY",
      text: "Vue.js 길라잡이",
    },
    {
      href: "https://www.slideshare.net/sunhyouplee/metal-uiux-letswift-2017",
      text: "Metal 기반 특별한 UI/UX 제공하기",
    },
    {
      href:
        "https://www.slideshare.net/sunhyouplee/vuejs-reactive-programming-vuetiful-korea-2nd",
      text: "Vue.js와 Reactive Programming",
    },
    {
      href: "https://www.slideshare.net/sunhyouplee/tour-of-vuejs-70654520",
      text: "Tour of Vue.js",
    },
    {
      href:
        "https://www.slideshare.net/sunhyouplee/functional-reactive-programming-with-rxswift-62123571",
      text: "Functional Reactive Programming With Swift",
    },
    {
      href: "https://stonzeteam.github.io/How-Goroutines-Work/",
      text: "고루틴은 어떻게 작동하는가?",
    },
    {
      href: "https://www.slideshare.net/sunhyouplee/realm-60539221",
      text: "파크히어 Realm 사용 사례",
    },
    {
      href: "https://www.slideshare.net/sunhyouplee/c-33426459",
      text: "C++ 코드 품질 관리 비법",
    },
  ];

  const opensources = [
    {
      href: "https://github.com/kciter/qart.js",
      text: "qart.js",
    },
    {
      href: "https://github.com/kciter/Floaty",
      text: "Floaty",
    },
    {
      href: "https://github.com/kciter/GlitchLabel",
      text: "GlitchLabel",
    },
    {
      href: "https://github.com/cobaltinc/caple-design-system",
      text: "caple-design-system",
    },
  ];

  return (
    <DefaultTemplate>
      <SEO title="About" />

      <h2>💼 Currently working on</h2>
      <ul>
        <li>
          <strong>Cobalt. Inc.</strong> CTO, 2018. 07 ~ <br />
          Developed document communicating platform,{" "}
          <a href="https://present.do">Present</a>
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
      <ul>
        {opensources.map(item => (
          <li key={item.href}>
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </DefaultTemplate>
  );
};

export default About;
