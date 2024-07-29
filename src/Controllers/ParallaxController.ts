import type { ParallaxAnimationFrame } from "../types";
import { BaseController } from "./BaseController";

export class ParallaxController extends BaseController {
  x = 0;
  y = 0;
  animate: ParallaxAnimationFrame;
  constructor(animate: ParallaxAnimationFrame) {
    super();
    this.animate = animate;
  }

  public onRotation = (nextX: number, nextY: number) => {
    const atStart = this.x === 0 && this.y === 0;
    const inMotion = nextX !== 0 || nextY !== 0;
    if (atStart || !inMotion) {
      this.clear();
      this.animate(state => ({ ...state, transition: "0.2s" }));
      if (atStart) {
        this.timer = setTimeout(() => {
          this.animate(state => ({ ...state, transition: "0s" }));
        }, 200);
      }
    }
    this.x = nextX / -2.5;
    this.y = nextY / -2.5;
    this.animate(state => ({ ...state, x: this.x, y: this.y }));
  };
}
