import { useState } from "react";
import AddUrlPart from "@/components/app/collections/request/request/meta-data/url/AddUrlPart";
import ProtocolToken from "@/components/app/collections/request/request/meta-data/url/tokens/ProtocolToken";
import HostPortToken from "@/components/app/collections/request/request/meta-data/url/tokens/HostPortToken";
import UrlWrapper from "@/components/app/collections/request/request/meta-data/url/UrlWrapper";
import TextToken from "@/components/app/collections/request/request/meta-data/url/tokens/TextToken";
import VariableToken from "@/components/app/collections/request/request/meta-data/url/tokens/VariableToken";

interface UrlTokenInterface {
  id: string;
  type: "protocol" | "host" | "port" | "text" | "env";
  value: string;
}

const initialValue: Array<UrlTokenInterface> = [
  {
    id: "protocol",
    type: "protocol",
    value: "http",
  },
  {
    id: "host",
    type: "host",
    value: "localhost",
  },
  {
    id: "port",
    type: "port",
    value: "3000",
  },
];

const Url = () => {
  const [
    urlToken,
    // setUrlToken
  ] = useState<Array<UrlTokenInterface>>(initialValue);

  console.log(urlToken);

  return (
    <UrlWrapper>
      <ProtocolToken />
      <HostPortToken />
      <AddUrlPart />
      <TextToken />
      <TextToken />
      <VariableToken />
    </UrlWrapper>
  );
};

export default Url;
