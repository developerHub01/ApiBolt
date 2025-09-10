import AddUrlPart from "@/components/app/collections/request/request/meta-data/url/AddUrlPart";
import ProtocolToken from "@/components/app/collections/request/request/meta-data/url/tokens/ProtocolToken";
import HostPortToken from "@/components/app/collections/request/request/meta-data/url/tokens/HostPortToken";
import UrlWrapper from "@/components/app/collections/request/request/meta-data/url/UrlWrapper";
import ReorderableToken from "@/components/app/collections/request/request/meta-data/url/ReorderableToken";
import { useAppSelector } from "@/context/redux/hooks";
import { selectRequestUrlTokens } from "@/context/redux/request-url/request-url-selector";
import QueryParamToken from "@/components/app/collections/request/request/meta-data/url/tokens/QueryParamToken";

const Url = () => {
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
};

export default Url;
