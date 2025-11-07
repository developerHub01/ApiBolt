import { memo } from "react";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";
import BodyRaw from "@/components/app/history-details/content/meta/body/BodyRaw";
import BodyBinary from "@/components/app/history-details/content/meta/body/BodyBinary";

const Body = memo(() => {
  const { body } = useAppSelector(selectHistoryDetails);
  if (!body) return null;

  const { type, formData, xWWWFormUrlencoded, binaryData, raw, rawType } = body;

  console.log({ formData, xWWWFormUrlencoded });

  return (
    <div className="w-full min-h-0 flex-1">
      {type === "raw" && raw !== undefined && (
        <BodyRaw code={raw} contentType={rawType} />
      )}
      {type === "binary" &&
        binaryData !== undefined &&
        (binaryData?.file || binaryData?.path) && (
          <BodyBinary {...binaryData} />
        )}
    </div>
  );
});

export default Body;
