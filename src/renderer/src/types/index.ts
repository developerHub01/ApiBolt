import { WindowElectronAPIInterface } from "@shared/types";

declare global {
  interface Window extends WindowElectronAPIInterface {}
}

export type TWindowControl =
  | "minimize"
  | "maximize"
  | "unmaximize"
  | "close"
  | "settings";
