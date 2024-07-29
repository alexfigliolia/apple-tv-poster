import type { MouseEvent } from "react";
import type { PosterAnimationFrame, RotationCallback } from "../types";
import { BaseController } from "./BaseController";

export class PosterController<T extends Element> extends BaseController {
  node?: T;
  private active = false;
  animate: PosterAnimationFrame;
  onRotation?: RotationCallback;
  constructor(animate: PosterAnimationFrame, onRotation?: RotationCallback) {
    super();
    this.animate = animate;
    this.onRotation = onRotation;
    this.cacheNode = this.cacheNode.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  public get listeners() {
    return {
      ref: this.cacheNode,
      onMouseMove: this.onMouseMove,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
    };
  }

  public cacheNode(node: T) {
    this.node = node;
  }

  public onMouseEnter(e: MouseEvent<HTMLDivElement>) {
    this.active = true;
    this.clear();
    this.animate(state => ({ ...state, scale: 1.05, transition: "0.2s" }));
    this.timer = setTimeout(() => {
      this.animate(state => ({ ...state, transition: "0s" }));
    }, 200);
    this.onMouseMove(e);
  }

  public onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!this.active || !this.node) {
      return;
    }
    const { clientX, clientY } = e;
    const { top, left, width, height } = this.node.getBoundingClientRect();
    const X = clientX - left;
    const Y = clientY - top;
    const midX = width / 2;
    const midY = height / 2;
    const offset = height / 2;
    const rotateX = (Y - midY) * 0.05;
    const rotateY = (X - midX) * -0.05;
    this.animate(state => ({
      ...state,
      rotateX,
      rotateY,
      shineX: X - offset,
      shineY: Y - offset,
      shadowX: (X - midX) * 0.15,
      shadowY: (Y - midY) * 0.15,
    }));
    this.onRotation?.(rotateX, rotateY);
  }

  public onMouseLeave() {
    this.clear();
    this.active = false;
    if (!this.node) {
      this.animate(state => ({ ...state, scale: 1, transition: "0.5s" }));
      return;
    }
    const { width, height } = this.node.getBoundingClientRect();
    const midX = width / 2;
    const midY = height / 2;
    this.animate({
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      shadowX: 0,
      shadowY: 5,
      shineX: midX,
      shineY: midY,
      transition: "0.5s",
    });
    this.onRotation?.(0, 0);
  }
}
