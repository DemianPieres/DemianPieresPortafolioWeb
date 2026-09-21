import type { CSSProperties } from "react";

export interface ParticleTextProps {
  text?: string;
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: "mount" | "hover" | "click";
  fontSize?: string | number;
  fontWeight?: number;
  fontFamily?: string;
  glow?: boolean;
  overflowPadding?: number;
  className?: string;
  style?: CSSProperties;
}

export default function ParticleText(props: ParticleTextProps): React.JSX.Element;
