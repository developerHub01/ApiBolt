import { useResponse } from "@/context/collections/request/ResponseProvider";
import BodyResponse from "@/components/app/collections/request/response/content/body/content/BodyResponse";
import BodyPreview from "@/components/app/collections/request/response/content/body/content/BodyPreview";

const BodyContent = () => {
  const { responseTab } = useResponse();

  return (
    <>
      {responseTab === "raw" && <BodyResponse />}
      {responseTab === "preview" && <BodyPreview />}
    </>
  );
};
BodyContent.displayName = "Body content";

export default BodyContent;