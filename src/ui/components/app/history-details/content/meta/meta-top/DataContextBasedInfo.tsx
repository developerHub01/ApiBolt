import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";

const DataContextBasedInfo = () => {
  const { activeMetaTab } = useHistoryDetails();
  const { body } = useAppSelector(selectHistoryDetails);
  if (!body || activeMetaTab !== "body") return null;

  const { type, formData, xWWWFormUrlencoded, binaryData, raw, rawType } = body;

  console.log({ formData, xWWWFormUrlencoded });

  return (
    <div className="flex items-center gap-2">
      {type === "binary" && (binaryData?.file || binaryData?.path) && (
        <ButtonLikeDiv variant={"secondary"} size={"sm"}>
          Binary
        </ButtonLikeDiv>
      )}
      {type === "raw" && raw !== "undefined" && (
        <>
          <ButtonLikeDiv variant={"secondary"} size={"sm"}>
            Raw
          </ButtonLikeDiv>
          <ButtonLikeDiv variant={"outline"} size={"sm"} className="uppercase">
            {rawType ?? "text"}
          </ButtonLikeDiv>
        </>
      )}
    </div>
  );
};

export default DataContextBasedInfo;
