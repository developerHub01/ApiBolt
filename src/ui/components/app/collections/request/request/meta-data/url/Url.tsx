import { Fragment, useCallback, useState } from "react";
import AddUrlPart from "@/components/app/collections/request/request/meta-data/url/AddUrlPart";
import ProtocolToken from "@/components/app/collections/request/request/meta-data/url/tokens/ProtocolToken";
import HostPortToken from "@/components/app/collections/request/request/meta-data/url/tokens/HostPortToken";
import UrlWrapper from "@/components/app/collections/request/request/meta-data/url/UrlWrapper";
import type {
  TAPIUrlTokenType,
  UrlTokenInterface,
} from "@/types/request.url.types";
import { v4 as uuidv4 } from "uuid";
import { Reorder } from "framer-motion";
import ReorderableToken from "./ReorderableToken";

const initialValue: Array<UrlTokenInterface> = [
  { id: "protocol", type: "protocol", value: "http" },
  { id: "host", type: "host", value: "localhost" },
  { id: "port", type: "port", value: "3000" },
];

const Url = () => {
  const [urlToken, setUrlToken] =
    useState<Array<UrlTokenInterface>>(initialValue);

  const handleAddToken = useCallback(
    (type: TAPIUrlTokenType, preTokenId: string = "port") => {
      const newValue = type === "text" ? "text" : "";
      const newToken = { id: uuidv4(), type, value: newValue };

      setUrlToken((prev) => {
        const index = (prev.findIndex((t) => t.id === preTokenId) ?? 0) + 1;
        return [...prev.slice(0, index), newToken, ...prev.slice(index)];
      });
    },
    []
  );

  const handleDeleteToken = useCallback(
    (id: string) => setUrlToken((prev) => prev.filter((t) => t.id !== id)),
    []
  );

  const handleReorder = (newOrder: Array<UrlTokenInterface>) => {
    setUrlToken((prev) => [...prev.slice(0, 3), ...newOrder]);
  };

  return (
    <UrlWrapper>
      <Reorder.Group
        values={urlToken.slice(3)}
        onReorder={handleReorder}
        className="w-full"
      >
        <div className="w-full flex flex-wrap gap-2 pt-1 pb-5">
          <ProtocolToken />
          <HostPortToken />
          <AddUrlPart id="port" onAdd={handleAddToken} />
          {urlToken.slice(3).map((token) => (
            <Fragment key={token.id}>
              <ReorderableToken
                token={token}
                onDelete={handleDeleteToken}
                onAdd={handleAddToken}
              />
            </Fragment>
          ))}
        </div>
      </Reorder.Group>
    </UrlWrapper>
  );
};

export default Url;
