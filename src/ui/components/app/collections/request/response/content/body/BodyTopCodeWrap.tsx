import { Button } from "@/components/ui/button";
import { useResponse } from "@/context/collections/request/ResponseProvider";

const BodyTopCodeWrap = () => {
  const { responseCodeWrap, handleToggleResponseCodeWrap } = useResponse();

  return (
    <Button
      size={"sm"}
      variant={"ghost"}
      onClick={handleToggleResponseCodeWrap}
    >
      {responseCodeWrap ? "Unwrap" : "Wrap"}
    </Button>
  );
};
BodyTopCodeWrap.displayName = "Body top code wrap";

export default BodyTopCodeWrap;