import { CookiesInterface } from "@/shared/types/cookies.types";

export interface ElectronAPICookiesInterface {
  getCookiesByProject(projectId?: string): Promise<string>;
  getParsedCookiesByProject(projectId?: string): Promise<CookiesInterface>;
  createCookiesByProject(payload: { name: string }): Promise<boolean>;
  updateCookiesByProject(payload: {
    projectId?: string;
    cookies: CookiesInterface;
  }): Promise<boolean>;
  deleteCookiesByProject(projectId?: string): Promise<boolean>;
  deleteCookieKeyByProject(payload: {
    key: string;
    projectId?: string;
  }): Promise<boolean>;
  clearCookiesByProject(projectId?: string): Promise<boolean>;
}
