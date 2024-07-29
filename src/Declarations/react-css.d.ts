// eslint-disable-next-line
import react from "react";

declare module "react" {
  interface CSSProperties {
    "--size"?: string;
    "--scale"?: number;
    "--stroke"?: string;
    "--shineX"?: string;
    "--shineY"?: string;
    "--rotateX"?: string;
    "--rotateY"?: string;
    "--shadowX"?: string;
    "--shadowY"?: string;
  }
}
