import { Button } from "@/components/ui/button";
import { Play as PreviewIcon } from "lucide-react";
import { getResponseType } from "@/utils";
import { useResponse } from "@/context/collections/request/ResponseProvider";
import { useAppSelector } from "@/context/redux/hooks";

const BodyTopLeft = () => {
  const { responseTab, handleChangeActiveResponseTab } = useResponse();
  const response = useAppSelector(
    (state) => state.requestResponse.response[state.requestResponse.selectedTab!]
  );

  if (!response) return null;

  const responseType = getResponseType(
    String(response?.headers?.["content-type"] ?? "")
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
