import { memo } from "react";
import type { UrlTokenInterface } from "@/types/request-url.types";
import VariableToken from "@/components/app/collections/request/request/meta-data/url/tokens/VariableToken";
import AddUrlPart from "@/components/app/collections/request/request/meta-data/url/AddUrlPart";
import TextToken from "@/components/app/collections/request/request/meta-data/url/tokens/TextToken";

interface Props {
  token: UrlTokenInterface;
}

const ReorderableToken = memo(({ token }: Props) => {
  return (
    <div id={token.id} className="flex gap-2">
      {token.type === "text" && <TextToken id={token.id} />}
      {token.type === "env" && <VariableToken id={token.id} />}
      <AddUrlPart id={token.id} />
    </div>
  );
});

export default ReorderableToken;
