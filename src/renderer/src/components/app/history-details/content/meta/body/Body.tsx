import { memo } from "react";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";
import BodyRaw from "@/components/app/history-details/content/meta/body/BodyRaw";
import BodyBinary from "@/components/app/history-details/content/meta/body/BodyBinary";
import MetaTable from "@/components/app/history-details/content/meta/meta-table/MetaTable";
import Empty from "@/components/ui/empty";

const Body = memo(() => {
  const { body } = useAppSelector(selectHistoryDetails);
  if (!body) return null;

  const { type, formData, xWWWFormUrlencoded, binaryData, raw, rawType } = body;

  return (
    <div className="w-full min-h-0 flex-1">
      {type === "none" && (
        <Empty
          label="This request doesn't have a body"
          className="min-h-auto"
        />
      )}
      {type === "raw" && raw !== undefined && (
        <BodyRaw code={raw} contentType={rawType} />
      )}
      {type === "binary" &&
        binaryData !== undefined &&
        (binaryData?.file || binaryData?.path) && (
          <BodyBinary {...binaryData} />
        )}
      {type === "form-data" && Boolean(formData?.length) && (
        <MetaTable type="form-data" data={formData!} />
      )}
      {type === "x-www-form-urlencoded" &&
        Boolean(xWWWFormUrlencoded?.length) && (
          <MetaTable type="x-www-form-urlencoded" data={xWWWFormUrlencoded!} />
        )}
    </div>
  );
});

export default Body;
