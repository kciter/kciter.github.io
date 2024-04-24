import React, { createRef, useEffect, useLayoutEffect } from 'react';

const src = 'https://giscus.app/client.js';

export interface IUtterancesProps {
  repo: string;
  theme: string;
}

const Giscus: React.FC<IUtterancesProps> = React.memo(({ repo, theme }) => {
  const containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const utterances = document.createElement('script');

    const attributes = {
      src,
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
      utterances.setAttribute(key, value);
    });

    containerRef.current!.appendChild(utterances);
  }, [repo]);

  return <div ref={containerRef} />;
});

Giscus.displayName = 'Giscus';

export default Giscus;

// <script src="https://giscus.app/client.js"

//         crossorigin="anonymous"
//         async>
// </script>
