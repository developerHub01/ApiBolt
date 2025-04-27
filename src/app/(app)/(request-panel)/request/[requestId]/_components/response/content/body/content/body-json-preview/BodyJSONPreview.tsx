import React from "react";
import ArrayBodyPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/ArrayBodyPreview";
import ObjectPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/ObjectPreview";

interface BodyJSONPreviewProps {
  data: Record<string, any>;
}

const BodyJSONPreview = ({ data }: BodyJSONPreviewProps) => {
  console.log({ data });

  if (typeof data === "object" && Array.isArray(data))
    return <ArrayBodyPreview data={data} />;
  if (typeof data === "object" && !Array.isArray(data))
    return <ObjectPreview data={data} />;
};

export default BodyJSONPreview;
