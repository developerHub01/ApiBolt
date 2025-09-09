import { urlVariableRegex } from "@/constant/request-url.constant";
import type { UrlTokenInterface } from "@/types/request-url.types";
import { v4 as uuidv4 } from "uuid";

export const isValidApiUrl = (apiUrl: string) => {
  try {
    const url = new URL(apiUrl);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
};

export const filterUrl = (apiUrl: string): string => {
  const url = new URL(apiUrl);
  const protocol = url.protocol ?? "http:";
  const host = url.hostname ?? "localhost";
  const port = url.port ? `:${url.port}` : "";
  const pathname = url.pathname && url.pathname !== "/" ? url.pathname : "";
  return decodeURIComponent(`${protocol}//${host}${port}${pathname}`);
};

export const encodeApiUrl = (apiUrl: string): Array<UrlTokenInterface> => {
  const url = new URL(apiUrl);
  const protocol = url.protocol ?? "http:";
  const host = url.hostname ?? "localhost";
  const port = url.port ?? "";
  const search = url.search ?? "";
  const pathname = url.pathname && url.pathname !== "/" ? url.pathname : "";
  const requestUri = decodeURIComponent(pathname + search);

  const tokens: Array<UrlTokenInterface> = [
    { id: "protocol", type: "protocol", value: protocol },
    { id: "host", type: "host", value: host },
    { id: "port", type: "port", value: port },
  ];

  let lastIndex = 0;
  let match;

  while ((match = urlVariableRegex.exec(requestUri)) !== null) {
    // text before variable
    if (match.index > lastIndex) {
      tokens.push({
        id: uuidv4(),
        value: requestUri.slice(lastIndex, match.index),
        type: "text",
      });
    }

    // variable itself
    tokens.push({
      id: uuidv4(),
      value: match[1],
      type: "env",
    });

    lastIndex = match.index + match[0].length;
  }

  // remaining text after last variable
  if (lastIndex < requestUri.length) {
    tokens.push({
      id: uuidv4(),
      value: requestUri.slice(lastIndex),
      type: "text",
    });
  }

  return tokens;
};

export const decodeApiUrl = (tokens: Array<UrlTokenInterface> = []): string => {
  const protocol = tokens[0]?.value ?? "http:";
  const host = tokens[1]?.value ?? "localhost";
  let port = tokens[2]?.value ? `:${tokens[2]?.value}` : "";

  if (["localhost", "127.0.0.1"].includes(host) && typeof port === "undefined")
    port = ":3000";
  if (!["localhost", "127.0.0.1"].includes(host)) port = "";

  let pathname = tokens
    .slice(3)
    .map((token) =>
      token.type === "text" ? token.value : `{{${token.value}}}`
    )
    .join("");
  if (pathname && !pathname.startsWith("/")) pathname = `/${pathname}`;

  return `${protocol}//${host}${port}${pathname}`;
};

export const isValidPort = (port: string | number): boolean => {
  if (typeof port === "string") {
    if (!/^\d+$/.test(port)) return false;
    port = Number(port);
  }
  return Number.isInteger(port) && port > 0 && port <= 65535;
};

/**
 * Validate a host (no port included)
 * Supports:
 * - localhost
 * - domain names (example.com, sub.domain.co.uk)
 * - IPv4 (192.168.0.1)
 * - IPv6 ([2001:db8::1])
 * - IDNs (bücher.ch, বাংলা.com)
 */
export const isValidHost = (host: string): boolean => {
  if (!host || typeof host !== "string") return false;
  host = host.trim();

  // Localhost
  if (host === "localhost") return true;

  // IPv4
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(host)) {
    const octets = host.split(".").map(Number);
    return octets.every((n) => n >= 0 && n <= 255);
  }

  // IPv6 (inside square brackets or bare form)
  const ipv6Regex = /^\[?[0-9a-fA-F:]+\]?$/;
  if (ipv6Regex.test(host)) return true;

  // Domain / IDN (unicode + punycode)
  // Each label must start/end with alphanumeric, allow `-` inside
  const domainRegex =
    /^([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,}$/u;
  if (domainRegex.test(host)) return true;

  return false;
};

export const getUrlSearchParams = (apiUrl: string) => {
  try {
    const url = new URL(apiUrl);
    return url.search;
  } catch {
    // fallback: manually extract query string
    const queryIndex = apiUrl.indexOf("?");
    if (queryIndex !== -1) return apiUrl.slice(queryIndex);

    return "";
  }
};
