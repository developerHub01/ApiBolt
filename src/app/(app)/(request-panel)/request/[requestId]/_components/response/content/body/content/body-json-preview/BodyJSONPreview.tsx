import React from "react";
import ArrayBodyPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/ArrayBodyPreview";
import ObjectPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/ObjectPreview";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface BodyJSONPreviewProps {
  data: Record<string, any>;
}

const BodyJSONPreview = ({ data }: BodyJSONPreviewProps) => {
  return (
    <ScrollArea className="w-full h-full">
      <div className="w-full h-full">
        {typeof data === "object" && Array.isArray(data) && (
          <ArrayBodyPreview data={data} lavel={0} />
        )}
        {typeof data === "object" && !Array.isArray(data) && (
          <ObjectPreview data={data} />
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default BodyJSONPreview;
