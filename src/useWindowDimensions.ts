import { useEffect, useState } from "react";

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimension] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}
