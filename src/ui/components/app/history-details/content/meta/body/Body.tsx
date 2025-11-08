import { memo } from "react";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";
import BodyRaw from "@/components/app/history-details/content/meta/body/BodyRaw";
import BodyBinary from "@/components/app/history-details/content/meta/body/BodyBinary";
import FormData from "@/components/app/history-details/content/meta/form-data/FormData";
import XWWWUrlencoded from "@/components/app/history-details/content/meta/x-www-urlencoded/XWWWUrlencoded";

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
      {type === "form-data" && Boolean(formData?.length) && <FormData />}
      {type === "x-www-form-urlencoded" &&
        Boolean(xWWWFormUrlencoded?.length) && (
          <XWWWUrlencoded data={xWWWFormUrlencoded!} />
        )}
    </div>
  );
});

export default Body;
