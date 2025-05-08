import { memo, useCallback, useEffect, useState } from "react";
import { formatCode, getParser } from "@/utils/prettierUtils";
import { toast } from "sonner";
import type { TContentType } from "@/types";
import { useRequestBody } from "@/context/request/RequestBodyProvider";
import Code from "@/components/ui/code";

const codeFormatter = async (
  rawRequestBodyType: TContentType,
  code: string,
  callback: (code: string) => void
) => {
  const parser = getParser(rawRequestBodyType);
  const { success, data, message } = await formatCode(code, parser);
  if (!code) return;
  if (!success || !data) return message && toast(message);
  callback(data);
};

const BodyCode = memo(() => {
  const {
    rawData = "",
    rawRequestBodyType,
    handleChangeRawData,
    codeLineWrap,
  } = useRequestBody();
  const [code, setCode] = useState<string>(rawData);

  const handleFormat = useCallback(
    () => codeFormatter(rawRequestBodyType, code, setCode),
    [rawRequestBodyType, code]
  );

  useEffect(() => {
    setCode(rawData);
  }, [rawData]);

  const handleChange = useCallback((value: string) => setCode(value), []);
  const handleBlur = useCallback(
    () => handleChangeRawData(code),
    [code, handleChangeRawData]
  );

  return (
    <div className="w-full h-full border rounded-md overflow-hidden">
      <Code
        code={code}
        contentType={rawRequestBodyType}
        onChange={handleChange}
        onBlur={handleBlur}
        zoomable={true}
        lineWrap={codeLineWrap}
        handleFormat={handleFormat}
      />
    </div>
  );
});

BodyCode.displayName = "Request data code area";

export default BodyCode;
