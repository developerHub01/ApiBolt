import AddUrlPart from "@/components/app/collections/request/request/meta-data/url/AddUrlPart";
import ProtocolToken from "@/components/app/collections/request/request/meta-data/url/tokens/ProtocolToken";
import HostPortToken from "@/components/app/collections/request/request/meta-data/url/tokens/HostPortToken";
import UrlWrapper from "@/components/app/collections/request/request/meta-data/url/UrlWrapper";
import ReorderableToken from "@/components/app/collections/request/request/meta-data/url/ReorderableToken";
import { useAppSelector } from "@/context/redux/hooks";
import { selectRequestUrlTokens } from "@/context/redux/request-url/request-url-selector";

const Url = () => {
  const urlToken = useAppSelector(selectRequestUrlTokens);

  return (
    <UrlWrapper>
      <div className="w-full flex flex-wrap gap-2 pt-1 pb-5">
        <ProtocolToken />
        <HostPortToken />
        <AddUrlPart id="port" />
        {urlToken.slice(3).map((token) => (
          <ReorderableToken key={token.id} token={token} />
        ))}
      </div>
    </UrlWrapper>
  );
};

export default Url;
