export type TDoFirstStartUpWork = (payload: {
  dbVersion: string;
}) => Promise<void>;
