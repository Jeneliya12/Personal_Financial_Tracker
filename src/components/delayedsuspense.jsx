import React, { Suspense, lazy } from "react";

// Create a higher-order component to delay the rendering of the actual component
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
