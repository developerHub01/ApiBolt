export const senitizeValue = (
  value: unknown,
  defaultValue: unknown
): number | string =>
  ([-1, "default"].includes(value as string | number)
    ? defaultValue
    : value) as string | number;

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

export const checkApplyingCodeFontSize = ({
  activeProjectId,
  localCodeFontSize,
  globalCodeFontSize,
  defaultCodeFontSize,
}: {
  activeProjectId: string | null;
  localCodeFontSize: number | null | undefined;
  globalCodeFontSize: number | null | undefined;
  defaultCodeFontSize: number;
}): number => {
  const globalFontSizeFinder = ({
    global,
    default: defaultSize,
  }: {
    global: number | null | undefined;
    default: number;
  }): number => (global && global !== -1 ? global : defaultSize);

  return activeProjectId
    ? localCodeFontSize && localCodeFontSize !== -1
      ? localCodeFontSize
      : localCodeFontSize === -1
        ? defaultCodeFontSize
        : globalFontSizeFinder({
            global: globalCodeFontSize,
            default: defaultCodeFontSize,
          })
    : /**
       *  if global and not -1 then render global else default
       */
      globalFontSizeFinder({
        global: globalCodeFontSize,
        default: defaultCodeFontSize,
      });
};
