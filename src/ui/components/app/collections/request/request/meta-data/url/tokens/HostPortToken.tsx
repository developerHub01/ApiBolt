import { memo, useCallback, useState } from "react";
import PortToken from "@/components/app/collections/request/request/meta-data/url/tokens/PortToken";
import HostToken from "@/components/app/collections/request/request/meta-data/url/tokens/HostToken";
import type { THostType } from "@/types/request.url.types";

const HostPortToken = memo(() => {
  const [hostType, setHostType] = useState<THostType>("localhost");

  const handleChangeHostType = useCallback(
    (type: THostType) => setHostType(type),
    []
  );

  return (
    <>
      <HostToken hostType={hostType} onChangeHostType={handleChangeHostType} />
      {hostType !== "custom" && <PortToken />}
    </>
  );
});

export default HostPortToken;
