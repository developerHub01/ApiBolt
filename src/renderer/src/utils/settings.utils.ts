export const senitizeValue = <T = number | string>(
  value: unknown,
  defaultValue: unknown,
): T =>
  (([-1, "default"] as Array<unknown>).includes(value)
    ? defaultValue
    : value) as T;

export const checkApplyingZoomable = ({
  activeProjectId,
  isZoomableLocal,
  isZoomableGlobal,
  defaultZoomable,
}: {
  activeProjectId: string | null;
  isZoomableLocal: number | null | undefined;
  isZoomableGlobal: number | null | undefined;
  defaultZoomable: number;
}): boolean => {
  const resolvedZoomable = activeProjectId
    ? [0, 1].includes(isZoomableLocal ?? -1)
      ? isZoomableLocal
      : [0, 1].includes(isZoomableGlobal ?? -1)
        ? isZoomableGlobal
        : defaultZoomable
    : [0, 1].includes(isZoomableGlobal ?? -1)
      ? isZoomableGlobal
      : defaultZoomable;

  return Boolean(resolvedZoomable);
};

export const checkApplyingCodeFont = ({
  activeProjectId,
  localCodeFont,
  globalCodeFont,
  defaultCodeFont,
}: {
  activeProjectId: string | null;
  localCodeFont: number | null | undefined;
  globalCodeFont: number | null | undefined;
  defaultCodeFont: number;
}): number => {
  const globalFontSizeFinder = ({
    global,
    default: defaultSize,
  }: {
    global: number | null | undefined;
    default: number;
  }): number => (global && global !== -1 ? global : defaultSize);

  return activeProjectId
    ? localCodeFont && localCodeFont !== -1
      ? localCodeFont
      : localCodeFont === -1
        ? defaultCodeFont
        : globalFontSizeFinder({
            global: globalCodeFont,
            default: defaultCodeFont,
          })
    : /**
       *  if global and not -1 then render global else default
       */
      globalFontSizeFinder({
        global: globalCodeFont,
        default: defaultCodeFont,
      });
};
