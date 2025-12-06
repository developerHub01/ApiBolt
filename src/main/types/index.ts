import { RequestListItemInterface } from "@shared/types/request-response.types";

export interface RequestOrFolderMetaTableInterface extends Omit<
  RequestListItemInterface,
  "children"
> {}

export interface CookieInterface {
  key: string;
  value: string;
  expires: string;
  maxAge: number;
  domain: string;
  path: string;
  secure: boolean;
  httpOnly: boolean;
  hostOnly: boolean;
  creation: string;
  lastAccessed: string;
}

export interface ToughCookieMetaInterface {
  version: string;
  storeType: string;
  rejectPublicSuffixes: boolean;
  enableLooseMode: boolean;
  allowSpecialUseDomain: boolean;
  prefixSecurity: string;
}

export interface ToughCookieSerializedInterface extends ToughCookieMetaInterface {
  cookies: Array<CookieInterface>;
}

export interface ToughCookieStringInterface extends ToughCookieMetaInterface {
  cookies: string;
}
