import { memo } from "react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { useAppSelector } from "@/context/redux/hooks";
import { ChevronsRight as ArrowRightIcon } from "lucide-react";
import { selectCheckedParams } from "@/context/redux/request-response/selectors/params";

const QueryParamToken = memo(() => {
  const params = useAppSelector(selectCheckedParams);

  return (
    <>
      <ButtonLikeDiv variant={"secondary"}>?</ButtonLikeDiv>
      {params.map(({ id, key, value }) => (
        <div key={id} className="h-full flex">
          <ButtonLikeDiv variant={"secondary"} className="rounded-r-none">
            {key || " "}
          </ButtonLikeDiv>
          <ButtonLikeDiv
            variant={"secondary"}
            className="rounded-l-none rounded-r-none border-x"
          >
            <ArrowRightIcon size={16} />
          </ButtonLikeDiv>
          <ButtonLikeDiv variant={"secondary"} className="rounded-l-none">
            <span>{value || " "}</span>
          </ButtonLikeDiv>
        </div>
      ))}
    </>
  );
});

export default QueryParamToken;
