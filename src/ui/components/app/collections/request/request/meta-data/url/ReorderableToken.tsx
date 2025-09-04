import type {
  TAPIUrlTokenType,
  UrlTokenInterface,
} from "@/types/request.url.types";
import { Reorder, useDragControls } from "motion/react";
import VariableToken from "@/components/app/collections/request/request/meta-data/url/tokens/VariableToken";
import AddUrlPart from "@/components/app/collections/request/request/meta-data/url/AddUrlPart";
import TextToken from "@/components/app/collections/request/request/meta-data/url/tokens/TextToken";

interface Props {
  token: UrlTokenInterface;
  onDelete: (id: string) => void;
  onAdd: (type: TAPIUrlTokenType, preTokenId?: string) => void;
}

const ReorderableToken = ({ token, onDelete, onAdd }: Props) => {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={token}
      id={token.id}
      dragControls={controls}
      dragListener={false}
      className="flex gap-2"
    >
      {token.type === "text" && (
        <TextToken
          controls={controls}
          id={token.id}
          onDelete={() => onDelete(token.id)}
        />
      )}
      {token.type === "env" && (
        <VariableToken
          controls={controls}
          id={token.id}
          onDelete={() => onDelete(token.id)}
        />
      )}
      <AddUrlPart id={token.id} onAdd={onAdd} />
    </Reorder.Item>
  );
};

export default ReorderableToken;
