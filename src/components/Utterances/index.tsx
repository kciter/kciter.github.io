import React, { createRef, useEffect, useLayoutEffect } from "react";

const src = "https://utteranc.es/client.js";

export interface IUtterancesProps {
  repo: string;
  theme: string;
}

const Utterances: React.FC<IUtterancesProps> = React.memo(({ repo, theme }) => {
  const containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const utterances = document.createElement("script");

    const attributes = {
      src,
      repo,
      theme,
      "issue-term": "title",
      crossOrigin: "anonymous",
      async: "true",
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    containerRef.current!.appendChild(utterances);
  }, [repo]);

  return <div ref={containerRef} />;
});

Utterances.displayName = "Utterances";

export default Utterances;
