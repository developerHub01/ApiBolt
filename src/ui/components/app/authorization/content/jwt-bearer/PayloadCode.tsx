import { memo, useEffect, useState } from "react";
import Code from "@/components/ui/code";
import { formatCode } from "@/utils/prettierUtils";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
  disabled?: boolean;
  onBlur: (code: string) => void;
  [key: string]: unknown;
}

const PayloadCode = memo(
  ({ code = "", 
    disabled = false, 
    onBlur, ...props }: PayloadCodeProps) => {
    const [codeState, setCodeState] = useState<string>(code);

    useEffect(() => {
      setCodeState(code);
    }, [code]);

    const handleChange = (code: string) => setCodeState(code);
    const handleBlur = () => onBlur(codeState);

    const handleFormat = () => codeFormatter(codeState, setCodeState);

    return (
      <>
        <ScrollArea
          className={cn(
            "w-full max-w-80 h-52 rounded-lg overflow-hidden border [&>div>div]:h-full relative",
            "backdrop-blur-xs"
          )}
        >
          <Code
            className="h-full w-full"
            contentType="json"
            placeholder="Payload...."
            code={code}
            onChange={handleChange}
            onBlur={handleBlur}
            editable={!disabled}
            copy={true}
            lineWrap={true}
            zoomable={true}
            handleFormat={handleFormat}
            {...props}
          />
        </ScrollArea>
      </>
    );
  }
);

export default PayloadCode;
