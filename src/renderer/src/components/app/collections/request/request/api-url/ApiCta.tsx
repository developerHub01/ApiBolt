import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/context/redux/hooks";
import { selectIsFetchApiLoading } from "@/context/redux/status/selectors/fetch-api";
import { Spinner } from "@renderer/components/ui/spinner";

const ApiCta = memo(() => {
  const isLoading = useAppSelector(selectIsFetchApiLoading);

  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="rounded-l-none uppercase min-w-30"
    >
      {isLoading && <Spinner />}
      {isLoading ? "Sending" : "Send"}
    </Button>
  );
});

ApiCta.displayName = "Api call to action aka send button";

export default ApiCta;
