import { CookiesInterface } from "@shared/types/cookies.types";

export interface ElectronAPICookiesInterface {
  getCookiesByProject(projectId?: string | null): Promise<string | null>;
  getParsedCookiesByProject(
    projectId?: string | null
  ): Promise<CookiesInterface>;
  createCookiesByProject(payload: { name: string }): Promise<boolean>;
  updateCookiesByProject(payload: {
    projectId?: string | null;
    cookies: CookiesInterface;
  }): Promise<boolean>;
  deleteCookiesByProject(projectId?: string | null): Promise<boolean>;
  deleteCookieKeyByProject(payload: {
    projectId?: string | null;
    key: string;
  }): Promise<boolean>;
  clearCookiesByProject(projectId?: string | null): Promise<boolean>;
}
