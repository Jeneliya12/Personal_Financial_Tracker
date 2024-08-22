import React, { Suspense, lazy } from "react";

const DelayedSuspense = ({ delay = 1000, fallback, children }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return <Suspense fallback={fallback}>{isLoaded ? children : null}</Suspense>;
};

export default DelayedSuspense;
