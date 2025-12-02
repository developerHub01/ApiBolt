import { getResponseType } from "@/utils";
import BodyHTMLPreview from "@/components/app/collections/request/response/content/body/content/BodyHTMLPreview";
import BodyJSONPreview from "@/components/app/collections/request/response/content/body/content/body-json-preview/BodyJSONPreview";
import { useAppSelector } from "@/context/redux/hooks";
import type { TContentType } from "@shared/types/request-response.types";
import { selectResponse } from "@/context/redux/request-response/selectors/response";

const BodyPreview = () => {
  const response = useAppSelector(selectResponse);

  if (!response || !response) return null;

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
