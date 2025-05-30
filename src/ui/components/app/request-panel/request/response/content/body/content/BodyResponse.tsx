import { memo, useEffect, useMemo, useState } from "react";
import { getResponseType } from "@/utils";
import { formatCode, getParser } from "@/utils/prettierUtils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import { useResponse } from "@/context/request/ResponseProvider";
import type { TContentType } from "@/types";
import Code from "@/components/ui/code";

const BodyResponse = memo(() => {
  const { response, selectedTab } = useRequestResponse();
  const { responseCodeWrap } = useResponse();
  const [formattedCode, setFormattedCode] = useState("");

  const responseType = getResponseType(
    String(response[selectedTab]?.headers?.["content-type"] ?? "")
  ).toLowerCase() as TContentType;

  const parser = useMemo(() => getParser(responseType), [responseType]);

  useEffect(() => {
    if (!response) return;

    const stringCode =
      parser === "json"
        ? JSON.stringify(response.data, null, 2)
        : String(response.data);

    const format = async () => {
      const { success, data } = await formatCode(stringCode, parser);
      if (!success || !data) setFormattedCode(stringCode);
      else setFormattedCode(data);
    };

    format();
  }, [response, parser]);

  if (!response) return;

  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full">
      <Code
        code={formattedCode}
        contentType={responseType}
        editable={false}
        zoomable={true}
        lineWrap={responseCodeWrap}
        copy={false}
        innerClassName="pb-3"
      />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});
BodyResponse.displayName = "Body response";

export default BodyResponse;
