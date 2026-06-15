import { TAuthAddTo, TAuthType } from "@shared/types/authorization.types";
import {
  TActiveTabType,
  TContentType,
  THTTPMethods,
  TParamContentType,
  TRequestBodyType,
} from "@shared/types/request-response.types";

export const methodList: Array<THTTPMethods> = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
] as const;

export const paramContentType: Array<TParamContentType> = [
  "text",
  "env",
] as const;

export const activeTabType: Array<TActiveTabType> = [
  "url",
  "params",
  "path-params",
  "authorization",
  "headers",
  "body",
  "code",
  "script",
] as const;

export const requestBodyType: Array<TRequestBodyType> = [
  "none",
  "form-data",
  "x-www-form-urlencoded",
  "raw",
  "binary",
] as const;

export const contentType: Array<TContentType> = [
  "text",
  "html",
  "xml",
  "json",
  "javascript",
] as const;

export const authType: Array<TAuthType> = [
  "inherit-parent",
  "no-auth",
  "basic-auth",
  "bearer-token",
  "jwt-bearer",
  "api-key",
] as const;

export const authAddTo: Array<TAuthAddTo> = ["header", "query"] as const;
