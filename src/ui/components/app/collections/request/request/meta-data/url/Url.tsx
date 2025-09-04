import { Fragment, useCallback, useState } from "react";
import AddUrlPart from "@/components/app/collections/request/request/meta-data/url/AddUrlPart";
import ProtocolToken from "@/components/app/collections/request/request/meta-data/url/tokens/ProtocolToken";
import HostPortToken from "@/components/app/collections/request/request/meta-data/url/tokens/HostPortToken";
import UrlWrapper from "@/components/app/collections/request/request/meta-data/url/UrlWrapper";
import TextToken from "@/components/app/collections/request/request/meta-data/url/tokens/TextToken";
import VariableToken from "@/components/app/collections/request/request/meta-data/url/tokens/VariableToken";
import type { TAPIUrlTokenType } from "@/types/request.url.types";
import { v4 as uuidv4 } from "uuid";

interface UrlTokenInterface {
  id: string;
  type: TAPIUrlTokenType;
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
  const [urlToken, setUrlToken] =
    useState<Array<UrlTokenInterface>>(initialValue);

  const handleAddToken = useCallback(
    (type: TAPIUrlTokenType, preTokenId: string = "port") => {
      const newValue = type === "text" ? "text" : "";

      const newToken = {
        id: uuidv4(),
        type,
        value: newValue,
      };

      setUrlToken((prev) => {
        const index =
          (prev.findIndex((token) => token.id === preTokenId) ?? 0) + 1;
        return [...prev.slice(0, index), newToken, ...prev.slice(index)];
      });
    },
    []
  );

  const handleDeleteToken = useCallback(
    (id: string) =>
      setUrlToken((prev) => prev.filter((token) => token.id !== id)),
    []
  );

  return (
    <UrlWrapper>
      <ProtocolToken />
      <HostPortToken />
      <AddUrlPart id="port" onAdd={handleAddToken} />
      {urlToken.slice(3).map(({ id, type }) => (
        <Fragment key={id}>
          {type === "text" && (
            <TextToken id={id} onDelete={handleDeleteToken} />
          )}
          {type === "env" && (
            <VariableToken id={id} onDelete={handleDeleteToken} />
          )}
          <AddUrlPart id={id} onAdd={handleAddToken} />
        </Fragment>
      ))}
    </UrlWrapper>
  );
};

export default Url;
