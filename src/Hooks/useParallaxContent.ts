import type { CSSProperties } from "react";
import { useLayoutEffect, useMemo, useState } from "react";
import { ParallaxController } from "Controllers";
import { useController } from "./useController";

export const useParallaxContent = (): [
  onRotation: (x: number, y: number) => void,
  parallaxStyles: CSSProperties,
] => {
  const [animation, setAnimation] = useState({
    x: 0,
    y: 0,
    transition: "0.2s",
  });
  const controller = useController(new ParallaxController(setAnimation));

  useLayoutEffect(() => {
    return () => {
      controller.clear();
    };
  }, [controller]);

  return useMemo(
    () => [
      controller.onRotation,
      {
        transition: `transform ${animation.transition}`,
        transform: `translateX(${animation.y}px) translateY(${animation.x}px)`,
      },
    ],
    [animation, controller],
  );
};
