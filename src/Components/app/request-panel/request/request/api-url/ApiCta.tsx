import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Loader as LoaderIcon } from "lucide-react";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

const ApiCta = memo(() => {
  const { isLoading } = useRequestResponse();

  return (
    <Button disabled={isLoading} className="rounded-l-none uppercase">
      {isLoading && <LoaderIcon className="animate-spin" size={16} />}
      Send
    </Button>
  );
});

ApiCta.displayName = "Api call to action aka send button";

export default ApiCta;
