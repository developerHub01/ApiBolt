const KEY_LIST_SEPARATOR = "___________";

export const areKeyListMatched = (
  keyList: Array<string>,
  target: Array<string>
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
