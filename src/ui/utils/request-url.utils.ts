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

export const decodeApiUrl = (apiUrl: string): Array<UrlTokenInterface> => {
  const url = new URL(apiUrl);

  const protocol = url.protocol ?? "http:";
  const host = url.hostname ?? "localhost";
  const port = url.port ?? "";
  const pathname = decodeURIComponent(
    (url.pathname ?? "") + (url.search ?? "")
  );

  const tokens: Array<UrlTokenInterface> = [
    { id: "protocol", type: "protocol", value: protocol },
    { id: "host", type: "host", value: host },
    { id: "port", type: "port", value: port },
  ];

  let lastIndex = 0;
  let match;

  while ((match = urlVariableRegex.exec(pathname)) !== null) {
    // text before variable
    if (match.index > lastIndex) {
      tokens.push({
        id: uuidv4(),
        value: pathname.slice(lastIndex, match.index),
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
  if (lastIndex < pathname.length) {
    tokens.push({
      id: uuidv4(),
      value: pathname.slice(lastIndex),
      type: "text",
    });
  }

  return tokens;
};

export const encodeApiUrl = (tokens: Array<UrlTokenInterface>): string => {
  const protocol = tokens[0]?.value ?? "http:";
  const host = tokens[1]?.value ?? "localhost";
  let port = tokens[2]?.value ? `:${tokens[2]?.value}` : "";

  if (["localhost", "127.0.0.1"].includes(host) && !port) port = ":3000";

  let pathname = tokens
    .slice(3)
    .map((token) =>
      token.type === "text" ? token.value : `{{${token.value}}}`
    )
    .join("");
  if (pathname && !pathname.startsWith("/")) pathname = `/${pathname}`;

  return `${protocol}//${host}${port}${pathname}`;
};
