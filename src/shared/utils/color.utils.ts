import Color from "color";

export const getRgbToHex = (color: {
  r: number;
  g: number;
  b: number;
  a?: number;
}) => {
  const c = Color({
    r: color.r,
    g: color.g,
    b: color.b,
    alpha: color.a,
  });
  return c.alpha() === 1 ? c.hex() : c.hexa();
};

export const isValidColor = (color: string) => {
  try {
    Color(color);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
