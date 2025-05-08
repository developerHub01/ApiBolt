import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ArrayBodyPreview from "@/components/app/request-panel/request/response/content/body/content/body-json-preview/ArrayBodyPreview";
import ObjectPreview from "@/components/app/request-panel/request/response/content/body/content/body-json-preview/ObjectPreview";

interface BodyJSONPreviewProps {
  data: Record<string, unknown>;
}

const BodyJSONPreview = ({ data }: BodyJSONPreviewProps) => {
  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden">
      <div className="w-full h-full pb-3">
        {typeof data === "object" && Array.isArray(data) && (
          <ArrayBodyPreview data={data} lavel={0} />
        )}
        {typeof data === "object" && !Array.isArray(data) && (
          <ObjectPreview data={data} lavel={0} />
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default BodyJSONPreview;