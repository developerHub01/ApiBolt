import { Button } from "@/components/ui/button";
import { Play as PreviewIcon } from "lucide-react";
import { getResponseType } from "@/utils";
import { useResponse } from "@/context/request/ResponseProvider";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

const BodyTopLeft = () => {
  const { responseTab, handleChangeActiveResponseTab } = useResponse();
  const { response, selectedTab } = useRequestResponse();

  if (!response || !response[selectedTab]) return null;

  const responseType = getResponseType(
    String(response[selectedTab]?.headers?.["content-type"] ?? "")
  );

  return (
    <div className="flex items-center gap-2">
      <Button
        size={"sm"}
        variant={responseTab === "raw" ? "secondary" : "ghost"}
        onClick={() => handleChangeActiveResponseTab("raw")}
      >
        {responseType}
      </Button>
      <Button
        size={"sm"}
        variant={responseTab === "preview" ? "secondary" : "ghost"}
        onClick={() => handleChangeActiveResponseTab("preview")}
      >
        <PreviewIcon /> Preview
      </Button>
    </div>
  );
};

BodyTopLeft.displayName = "Body top left";

export default BodyTopLeft;
