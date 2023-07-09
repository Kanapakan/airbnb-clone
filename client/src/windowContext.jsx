import React, { createContext, useCallback, useEffect, useState } from "react";

export const WindowContext = createContext({});

export default function WindowContextProvider({children}) {
  const getVh = useCallback(() => {
    return Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
  }, []);
  const getVw = useCallback(() => {
    return Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
  }, []);

  const [clientWidth, setClientWidth] = useState(getVw());
  const [clientHeight, setClientHeight] = useState(getVh());

  useEffect(() => {
    const handleWindowResize = () => {
      setClientWidth(getVw());
      setClientHeight(getVh());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [getVh, getVw]);

  return (
    <WindowContext.Provider value={{ clientHeight, clientWidth }}>
      {children}
    </WindowContext.Provider>
  );
}
