import React, { useEffect, useLayoutEffect, useState } from "react";

interface NoSsrProps {
  children: React.ReactNode;
  defer?: boolean;
  fallback?: React.ReactNode;
}

const NoSsr = ({ children, defer = false, fallback }: NoSsrProps) => {
  const [mountedState, setMountedState] = useState(false);

  useLayoutEffect(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);

  useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);

  return <>{mountedState ? children : fallback}</>;
};

export default NoSsr;
