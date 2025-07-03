import { useResponse } from "@/context/request/ResponseProvider";
import BodyResponse from "@/components/app/request/response/content/body/content/BodyResponse";
import BodyPreview from "@/components/app/request/response/content/body/content/BodyPreview";

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