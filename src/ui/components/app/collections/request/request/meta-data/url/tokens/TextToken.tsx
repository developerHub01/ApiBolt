import { memo, useState, type FocusEvent, type KeyboardEvent } from "react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const TextToken = memo(() => {
  const [value, setValue] = useState<string>("text");

  const handleKeydown = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.code === "Enter") return e.preventDefault();
  };

  const handleBlur = (e: FocusEvent<HTMLHeadingElement>) => {
    setValue(e.target.innerText.trim());
  };

  return (
    <ButtonLikeDiv variant={"secondary"} className="p-0 gap-0">
      <ButtonLikeDiv variant={"secondary"} className="flex-1 rounded-r-none pr-0">
        <p
          contentEditable
          suppressContentEditableWarning
          className="outline-none cursor-text border-b w-full min-w-10"
          onKeyDown={handleKeydown}
          onBlur={handleBlur}
        >
          {value}
        </p>
      </ButtonLikeDiv>
      <Button variant={"secondary"} className="rounded-l-none">
        <DeleteIcon />
      </Button>
    </ButtonLikeDiv>
  );
});

export default TextToken;
