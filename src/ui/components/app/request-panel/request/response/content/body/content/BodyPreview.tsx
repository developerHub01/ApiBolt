import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import type { TContentType } from "@/types";
import { getResponseType } from "@/utils";
import BodyHTMLPreview from "@/components/app/request-panel/request/response/content/body/content/BodyHTMLPreview";
import BodyJSONPreview from "@/components/app/request-panel/request/response/content/body/content/body-json-preview/BodyJSONPreview";

const BodyPreview = () => {
  const { response } = useRequestResponse();

  if (!response) return null;

  const responseType = getResponseType(
    String(response?.headers?.["content-type"] ?? "")
  ).toLowerCase() as TContentType;

  const responseData = response?.data;

  return (
    <>
      {["html", "text"].includes(responseType) && (
        <BodyHTMLPreview data={responseData as string} />
      )}
      {responseType === "json" && (
        <BodyJSONPreview data={responseData as Record<string, unknown>} />
      )}
    </>
  );
};

export default BodyPreview;