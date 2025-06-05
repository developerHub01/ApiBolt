import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Loader as LoaderIcon } from "lucide-react";
import { useAppSelector } from "@/context/redux/hooks";

const ApiCta = memo(() => {
  const isLoading = useAppSelector(
    (state) => state.requestResponse.isLoading[state.requestResponse.selectedTab!]
  );

  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="rounded-l-none uppercase"
    >
      {isLoading && <LoaderIcon className="animate-spin" size={16} />}
      Send
    </Button>
  );
});

ApiCta.displayName = "Api call to action aka send button";

export default ApiCta;
