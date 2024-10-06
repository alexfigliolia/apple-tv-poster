import type { HTMLAttributes } from "react";
import { memo, useLayoutEffect, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { PosterController } from "Controllers";
import { useController } from "Hooks";
import type { OptionalChildren, RotationCallback } from "./types";
import "./styles.scss";

export const Poster = memo(function Poster({
  style,
  children,
  className,
  onRotation,
  ...rest
}: Props) {
  const [animations, setAnimations] = useState({
    scale: 1,
    shineX: 0,
    shineY: 0,
    rotateX: 0,
    rotateY: 0,
    shadowX: 0,
    shadowY: 0,
    transition: "0s",
  });
  const classNames = useClassNames("three-d-poster", className);
  const controller = useController(
    new PosterController<HTMLDivElement>(setAnimations, onRotation),
  );

  useLayoutEffect(() => {
    return () => {
      controller.clear();
    };
  }, [controller]);

  return (
    <div
      className={classNames}
      {...controller.listeners}
      {...rest}
      style={{
        ...style,
        "--scale": animations.scale,
        "--shineX": `${animations.shineX}px`,
        "--shineY": `${animations.shineY}px`,
        "--shadowX": `${animations.shadowX}px`,
        "--shadowY": `${animations.shadowY}px`,
        "--rotateX": `${animations.rotateX}deg`,
        "--rotateY": `${animations.rotateY}deg`,
        transition: `scale 0.5s 0s, transform ${animations.transition}, box-shadow ${animations.transition}`,
      }}>
      {children}
      <div className="shine" />
    </div>
  );
});

interface Props extends OptionalChildren, HTMLAttributes<HTMLDivElement> {
  onRotation?: RotationCallback;
}
