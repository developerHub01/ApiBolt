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
