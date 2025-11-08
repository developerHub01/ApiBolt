import { useMemo } from "react";
import TabMotionWrapper from "@/components/app/collections/request/request/meta-data/TabMotionWrapper";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";
import Empty from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  id: string;
  children: React.ReactNode;
}

const MetaWrapper = ({ id, children }: Props) => {
  const { activeMetaTab } = useHistoryDetails();
  const data = useAppSelector(selectHistoryDetails);

  const { isEmpty, label, description } = useMemo(() => {
    let empty = false;
    let label = "";
    let description = "";

    switch (activeMetaTab) {
      case "params":
        empty = !data.params?.length;
        label = "No Parameters Found";
        description =
          "This request didn't include any query or URL parameters.";
        break;

      case "headers":
        empty = !data.headers?.length;
        label = "No Headers Found";
        description =
          "This request didn't include any custom or additional headers.";
        break;

      case "authorization":
        empty = !data.authorization;
        label = "No Authorization Data";
        description =
          "No authentication or authorization details were present in this request.";
        break;

      case "body": {
        if (!data.body) {
          empty = true;
          label = "No Body Data";
          description = "This request didn't include a body payload.";
          break;
        }

        switch (data.body.type) {
          case "form-data":
            empty = !data.body.formData?.length;
            label = "No Form Data";
            description =
              "This request body didn't include any form-data fields.";
            break;
          case "x-www-form-urlencoded":
            empty = !data.body.xWWWFormUrlencoded?.length;
            label = "No Form URL Encoded Data";
            description =
              "This request body didn't include any x-www-form-urlencoded fields.";
            break;
          case "binary":
            empty = !data.body.binaryData;
            label = "No Binary Data";
            description =
              "This request body didn't include any binary file uploads.";
            break;
          case "raw":
            empty = data.body.raw === undefined;
            label = "No Raw Body";
            description =
              "This request body didn't include any raw text or JSON data.";
            break;
          default:
            empty = false;
            break;
        }
        break;
      }

      default:
        empty = false;
        break;
    }

    return { isEmpty: empty, label, description };
  }, [activeMetaTab, data]);

  return (
    <>
      {isEmpty ? (
        <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full">
          <Empty
            key={id}
            label={label}
            description={description}
            animationSrc="./lottie/nodata.lottie"
            showFallback
            innerClassName="w-80"
            className="h-full"
          />
        </ScrollArea>
      ) : (
        <TabMotionWrapper id={id}>{children}</TabMotionWrapper>
      )}
    </>
  );
};

export default MetaWrapper;
