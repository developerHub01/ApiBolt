import { memo } from "react";
import PortToken from "@/components/app/collections/request/request/meta-data/url/tokens/PortToken";
import HostToken from "@/components/app/collections/request/request/meta-data/url/tokens/HostToken";
import { useAppSelector } from "@/context/redux/hooks";
import { selectRequestUrlTokenHostType } from "@/context/redux/request-url/request-url-selector";

const HostPortToken = memo(() => {
  const hostType = useAppSelector(selectRequestUrlTokenHostType);

  return (
    <>
      <HostToken hostType={hostType} />
      {hostType !== "custom" && <PortToken />}
    </>
  );
});

export default HostPortToken;
