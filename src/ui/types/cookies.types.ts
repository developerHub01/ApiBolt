export interface CookieInterface {
  key: string;
  value: string;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  hostOnly?: boolean;
  maxAge?: number | null;
  expires?: string | null;
  sameSite?: "lax" | "strict" | "none";
  creation?: string;
  lastAccessed?: string;
}

export type CookiesInterface = Array<CookieInterface>;
