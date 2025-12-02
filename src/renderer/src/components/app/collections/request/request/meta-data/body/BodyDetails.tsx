import { memo } from "react";
import Empty from "@/components/ui/empty";
import FormData from "@/components/app/collections/request/request/meta-data/body/form-data/FormData";
import XWWWFormUrlencoded from "@/components/app/collections/request/request/meta-data/body/x-www-form-urlencoded/XWWWFormUrlencoded";
import BodyCode from "@/components/app/collections/request/request/meta-data/body/raw/BodyCode";
import BodyBinary from "@/components/app/collections/request/request/meta-data/body/binary/BodyBinary";
import { useAppSelector } from "@/context/redux/hooks";
import { selectRequestBodyType } from "@/context/redux/request-response/selectors/body-raw";

const BodyDetails = memo(() => {
  const requestBodyType = useAppSelector(selectRequestBodyType);
  return (
    <>
      {requestBodyType === "none" && (
        <Empty
          label="This request doesn't have a body"
          className="min-h-auto"
        />
      )}
      {requestBodyType === "form-data" && <FormData />}
      {requestBodyType === "x-www-form-urlencoded" && <XWWWFormUrlencoded />}
      {requestBodyType === "raw" && <BodyCode />}
      {requestBodyType === "binary" && <BodyBinary />}
    </>
  );
});

BodyDetails.displayName = "Request body details";

export default BodyDetails;
