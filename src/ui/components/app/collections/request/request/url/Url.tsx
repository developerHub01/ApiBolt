import { memo } from "react";
import AddUrlPart from "@/components/app/collections/request/request/url/AddUrlPart";
import ProtocolToken from "@/components/app/collections/request/request/url/tokens/ProtocolToken";
import HostPortToken from "@/components/app/collections/request/request/url/tokens/HostPortToken";
import UrlWrapper from "@/components/app/collections/request/request/url/UrlWrapper";
import ReorderableToken from "@/components/app/collections/request/request/url/ReorderableToken";
import { useAppSelector } from "@/context/redux/hooks";
import QueryParamToken from "@/components/app/collections/request/request/url/tokens/QueryParamToken";
import { selectRequestUrlTokens } from "@/context/redux/request-url/selectors/tokens";

const Url = memo(() => {
  const urlTokens = useAppSelector(selectRequestUrlTokens);

  return (
    <UrlWrapper>
      <ProtocolToken />
      <HostPortToken />
      <AddUrlPart id="port" />
      {urlTokens.slice(3).map((token) => (
        <ReorderableToken key={token.id} token={token} />
      ))}
      <QueryParamToken />
    </UrlWrapper>
  );
});

export default Url;
