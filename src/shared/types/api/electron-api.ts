import { JWTBearerAuthInterface } from "@shared/types/authorization.types";
import {
  APIPayloadBody,
  ResponseInterface
} from "@shared/types/request-response.types";
import { ThemeInterface } from "@shared/types/theme.types";

export interface ElectronAPIInterface {
  getCookiesFromUrl(url: string): Promise<string>;
  fetchApi(payload: APIPayloadBody): Promise<ResponseInterface>;

  getAllCookies(): Promise<unknown>;
  getCookieByDomain(url: string): Promise<unknown>;
  getCookieStringByDomain(url: string): Promise<unknown>;

  // window controls
  windowMinimize(): Promise<void>;
  windowMaximize(): Promise<void>;
  windowUnmaximize(): Promise<void>;
  windowClose(): Promise<void>;
  isWindowMaximized(): Promise<boolean>;

  /* basic zoom handler */
  setZoom: (factor: number) => void;
  getZoom: () => number;

  onWindowMaximizeChange(cb: (isMaximized: boolean) => void): void;
  removeWindowMaximizeChange(): void;

  generateJWTToken(
    data: Omit<JWTBearerAuthInterface, "headerPrefix" | "algo" | "addTo"> & {
      algorithm: string;
    }
  ): Promise<string>;

  /***
   * trigger when theme changed
   */
  applyTheme(): Promise<void>;
  applyTestTheme(palette: ThemeInterface["palette"]): void;
}
