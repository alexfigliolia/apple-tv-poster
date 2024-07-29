import type { ReactNode } from "react";

export interface PosterAnimation {
  scale: number;
  shineX: number;
  shineY: number;
  rotateX: number;
  rotateY: number;
  shadowX: number;
  shadowY: number;
  transition: string;
}

export interface ParallaxAnimation {
  x: number;
  y: number;
  transition: string;
}

export type AnimationFrame<T> = (animation: T | ((animation: T) => T)) => void;

export type PosterAnimationFrame = AnimationFrame<PosterAnimation>;

export type ParallaxAnimationFrame = AnimationFrame<ParallaxAnimation>;

export type RotationCallback = (x: number, y: number) => void;

export interface OptionalChildren {
  children?: ReactNode;
}
