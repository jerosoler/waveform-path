export interface LinearPathOptions {
  channel?: number;
  samples?: number;
  height?: number;
  width?: number;
  top?: number;
  left?: number;
  type?: "steps" | "mirror" | "bars";
  paths: LinearPath[];
  animation?: boolean;
  animationframes?: number;
  normalize?: boolean;
  start?: number;
  end?: number;
}

export interface PolarPathOptions {
  channel?: number;
  samples?: number;
  distance?: number;
  length?: number;
  top?: number;
  left?: number;
  type?: "steps" | "mirror" | "bars";
  startdeg?: number;
  enddeg?: number;
  invertdeg?: boolean;
  invertpath?: boolean;
  paths: PolarPath[];
  animation?: boolean;
  animationframes?: number;
  normalize?: boolean;
}

export interface Path {
  /**
   * Values 0 to 1
   * @default 0
   */
  minshow?: number;
  /**
   * Values 0 to 1
   * @default 1
   */
  maxshow?: number;
  /**
   * @default false
   */
  normalize?: boolean;
}

export interface LinearLineToPath extends Path {
  d: "L";
  sx: number;
  sy: number;
  ex: number;
  ey: number;
}

export interface PolarLineToPath extends Path {
  d: "L";
  sdeg: number;
  sr: number;
  edeg: number;
  er: number;
}

export interface HoritzontalPath extends Path {
  d: "H";
  sx: number;
  y: number;
  ex: number;
}

export interface VerticalPath extends Path {
  d: "V";
  sy: number;
  x: number;
  ey: number;
}

export interface LinearCubicBezierCurvePath extends Path {
  d: "C";
  sx: number;
  sy: number;
  x: number;
  y: number;
  ex: number;
  ey: number;
}

export interface PolarCubicBezierCurvePath extends Path {
  d: "C";
  sdeg: number;
  sr: number;
  deg: number;
  r: number;
  edeg: number;
  er: number;
}

export interface LinearQuadraticBezierCurvePath extends Path {
  d: "Q";
  sx: number;
  sy: number;
  x: number;
  y: number;
  ex: number;
  ey: number;
}

export interface PolarQuadraticBezierCurvePath extends Path {
  d: "Q";
  sdeg: number;
  sr: number;
  deg: number;
  r: number;
  edeg: number;
  er: number;
}

export interface LinearArcPath extends Path {
  d: "A";
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  rx: number;
  ry: number;
  angle: number;
  arc: number;
  sweep: number;
}

export interface PolarArcPath extends Path {
  d: "A";
  sdeg: number;
  sr: number;
  edeg: number;
  er: number;
  rx: number;
  ry: number;
  angle: number;
  arc: number;
  sweep: number;
}

export interface ClosePath extends Path {
  d: "Z";
}

export type LinearPath =
  | LinearLineToPath
  | HoritzontalPath
  | VerticalPath
  | LinearCubicBezierCurvePath
  | LinearQuadraticBezierCurvePath
  | LinearArcPath
  | ClosePath;

export type PolarPath =
  | PolarLineToPath
  | PolarCubicBezierCurvePath
  | PolarQuadraticBezierCurvePath
  | PolarArcPath
  | ClosePath;
