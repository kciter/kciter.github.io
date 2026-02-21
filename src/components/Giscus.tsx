import { useEffect, useRef } from 'react';

interface GiscusProps {
  repo: string;
  theme: string;
}

const Giscus = ({ repo, theme }: GiscusProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    const attributes: Record<string, string> = {
      src: 'https://giscus.app/client.js',
      'data-repo': repo,
      'data-repo-id': 'MDEwOlJlcG9zaXRvcnkzMjMyMzUxMDY=',
      'data-category': 'Announcements',
      'data-category-id': 'DIC_kwDOE0QtIs4Cb5YK',
      'data-mapping': 'title',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': theme,
      'data-lang': 'ko',
      crossOrigin: 'anonymous',
      async: 'true'
    };

    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    containerRef.current.appendChild(script);
  }, [repo]);

  return <div ref={containerRef} />;
};

export default Giscus;
