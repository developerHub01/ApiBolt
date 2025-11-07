import { langMap } from "@/constant/code.constant";
import type { LangFactory } from "@/types/code";
import type { TContentType } from "@/types/request-response.types";
import { formatCode, getParser } from "@/utils/prettier.utils";
import { langs } from "@uiw/codemirror-extensions-langs";
import { toast } from "sonner";

export const codeFormatter = async ({
  rawRequestBodyType,
  code,
  callback,
  showErrorToast = false,
}: {
  rawRequestBodyType: TContentType;
  code: string;
  callback?: (code: string) => unknown;
  showErrorToast?: boolean;
}) => {
  const parser = getParser(rawRequestBodyType);
  const { success, data, message } = await formatCode(code, parser);
  if (!code) return;
  if (!success || !data) return message && showErrorToast && toast(message);
  if (callback) callback(data);
  return data;
};

/**
 * Returns the language factory for a given content type
 */
export const getLangExtension = (contentType: string): LangFactory => {
  const key = (langMap?.[contentType] ??
    contentType ??
    "text") as keyof typeof langs;
  return langs[key];
};
