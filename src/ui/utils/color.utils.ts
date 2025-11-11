import Color from "color";

export const getRgbToHex = (color: {
  r: number;
  g: number;
  b: number;
  a?: number;
}) =>
  Color({
    r: color.r,
    g: color.g,
    b: color.b,
    alpha: color.a,
  }).hexa();
