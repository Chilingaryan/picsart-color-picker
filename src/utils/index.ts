export const rgbaToHex = (rgba: [number, number, number, number]) => {
  const [r, g, b, a] = rgba;

  const toHex = (num: number) => {
    const hex = num.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hexR = toHex(r);
  const hexG = toHex(g);
  const hexB = toHex(b);
  const hexA = toHex(Math.round(a * 255));

  const hex = `#${hexR}${hexG}${hexB}${a < 1 ? hexA : ""}`;

  return hex.toUpperCase();
};
