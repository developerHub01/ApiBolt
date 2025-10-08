import type { TContentType } from "@/types/request-response.types";
import { formatCode, getParser } from "@/utils/prettier.utils";
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
