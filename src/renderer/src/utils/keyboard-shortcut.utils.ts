const KEY_LIST_SEPARATOR = "___________";

export const areKeyListMatched = (
  keyList: Array<string>,
  target: Array<string>,
) => {
  /* added spearator in between and start and end so that in can search perfectly for any key instead of partial. so as every key are spearated by separator even starting or ending too, so less chance to have partial so will match exact keys only */
  const targetString =
    KEY_LIST_SEPARATOR + target.join(KEY_LIST_SEPARATOR) + KEY_LIST_SEPARATOR;

  for (const index in keyList) {
    const keyString =
      KEY_LIST_SEPARATOR +
      keyList.slice(Number(index)).join(KEY_LIST_SEPARATOR) +
      KEY_LIST_SEPARATOR;

    if (keyString.includes(targetString)) return true;
  }

  return false;
};

export const keyListStringify = (keyList: Array<string>) =>
  keyList.map(key => key[0].toUpperCase() + key.slice(1)).join("+");

export const keyboardNormalizedKey = (code: string, key: string) => {
  /* Letters: KeyA → A */
  if (code.startsWith("Key")) return code.slice(3).toLowerCase();

  /* Digits: Digit0 → 0 */
  if (code.startsWith("Digit")) return code.slice(5);

  /* Numpad: Numpad1 → 1, NumpadAdd → + */
  if (code.startsWith("Numpad")) {
    const num = code.slice(6);
    const numMap: Record<string, string> = {
      Add: "+",
      Subtract: "-",
      Multiply: "*",
      Divide: "/",
      Decimal: ".",
    };
    return numMap[num] ?? num;
  }

  /* function keys */
  const specialKeys: Record<string, string> = {
    Backquote: "`",
    Minus: "-",
    Equal: "+",
    BracketLeft: "[",
    BracketRight: "]",
    Backslash: "\\",
    Semicolon: ";",
    Quote: "'",
    Comma: ",",
    Period: ".",
    Slash: "/",
    Space: "Space",
  };

  if (specialKeys[code]) return specialKeys[code];
  return key;
};
