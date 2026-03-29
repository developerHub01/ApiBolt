import { useEffect, useState } from "react";
import { TContentType } from "@shared/types/request-response.types";
import { formatCode, getParser } from "@/utils/prettier.utils";

interface Props {
  code: string;
  contentType: TContentType;
  indentationSize?: number;
}

const useCodeError = ({ code, contentType, indentationSize }: Props) => {
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      const parser = getParser(contentType);
      const codeString = code.trim();
      if (!codeString) {
        /* if empty then no need to show error */
        setIsError(false);
        return;
      }
      const { success = false } = await formatCode(
        codeString,
        parser,
        indentationSize,
      );
      // Only update if different
      setIsError(prev => (prev !== !success ? !success : prev));
    }, 500); // debounce for 500ms

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [code, indentationSize, contentType]);

  return {
    isError,
  };
};

export default useCodeError;
