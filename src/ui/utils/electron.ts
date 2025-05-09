export const isElectron = () => {
  if (typeof navigator === "undefined") return false;
  return navigator.userAgent?.toLowerCase()?.includes(" electron/");
};