import Code from "@/components/ui/code";
import { formatCode } from "@/utils/prettierUtils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const codeFormatter = async (
  code: string,
  callback: (code: string) => void
) => {
  const { success, data, message } = await formatCode(code, "json");
  if (!code) return;
  if (!success || !data) return message && toast(message);
  callback(data);
};

interface PayloadCodeProps {
  code: string;
  onBlur: (code: string) => void;
}

const PayloadCode = ({ code = "", onBlur }: PayloadCodeProps) => {
  const [codeState, setCodeState] = useState<string>(code);

  useEffect(() => {
    setCodeState(code);
  }, [code]);

  const handleChange = (code: string) => setCodeState(code);
  const handleBlur = () => onBlur(codeState);

  const handleFormat = () => codeFormatter(codeState, setCodeState);

  return (
    <Code
      className="max-w-80 h-52 rounded-lg overflow-hidden border"
      contentType="json"
      code={code}
      onChange={handleChange}
      onBlur={handleBlur}
      editable={true}
      copy={true}
      lineWrap={true}
      zoomable={true}
      handleFormat={handleFormat}
    />
  );
};

export default PayloadCode;
