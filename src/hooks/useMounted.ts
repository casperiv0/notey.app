import * as React from "react";

const useMounted = () => {
  const [isMounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return isMounted;
};

export default useMounted;
