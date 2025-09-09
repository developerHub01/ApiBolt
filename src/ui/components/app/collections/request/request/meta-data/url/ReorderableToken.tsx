import { Fragment, memo } from "react";
import type { UrlTokenInterface } from "@/types/request-url.types";
import VariableToken from "@/components/app/collections/request/request/meta-data/url/tokens/VariableToken";
import AddUrlPart from "@/components/app/collections/request/request/meta-data/url/AddUrlPart";
import TextToken from "@/components/app/collections/request/request/meta-data/url/tokens/TextToken";

interface Props {
  token: UrlTokenInterface;
}

const ReorderableToken = memo(({ token }: Props) => {
  return (
    <Fragment key={token.id}>
      {token.type === "text" && <TextToken id={token.id} value={token.value} />}
      {token.type === "env" && (
        <VariableToken id={token.id} value={token.value} />
      )}
      <AddUrlPart id={token.id} />
    </Fragment>
  );
});

export default ReorderableToken;
