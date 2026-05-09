export type TDoFirstStartUpWork = (payload: {
  currentVersion: string;
}) => Promise<boolean>;
