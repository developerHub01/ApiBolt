import { useCallback } from "react";
import RequestListItem from "@/components/app/collections/request-list/content/request-list/RequestListItem";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/context/redux/hooks";
import { createSingleRequest } from "@/context/redux/request-response/thunks/request-list";
import type { RequestListItemInterface } from "@/types/request-response.types";
import RequestListItemLine from "@/components/app/collections/request-list/content/request-list/RequestListItemLine";
import { REQUEST_ITEM_SPACE_SIZE } from "@/constant/request-response.constant";

interface Props extends Pick<RequestListItemInterface, "children"> {
  id: string;
  lavel: number;
}

const RequestListItemExpendedContent = ({ id, children, lavel }: Props) => {
  const dispatch = useAppDispatch();
  const handleAddRequest = useCallback(
    async () => await dispatch(createSingleRequest(id)),
    [dispatch, id]
  );

  const emptyLeftSpace =
    REQUEST_ITEM_SPACE_SIZE * (lavel + 1) +
    4; /* 4 for aligning with extra padding */

  return (
    <div className="w-full select-text cursor-text">
      {!Array.isArray(children) || !children.length ? (
        <div
          className="text-xs text-muted-foreground"
          style={{
            paddingLeft: emptyLeftSpace,
          }}
        >
          <RequestListItemLine lavel={lavel + 1} className="px-1 select-none">
            This folder is empty.
            <br />
            <Button
              variant={"link"}
              size={"sm"}
              className="px-0 text-xs!"
              onClick={handleAddRequest}
            >
              Add a request
            </Button>{" "}
            to start working.
          </RequestListItemLine>
        </div>
      ) : (
        <>
          {children.map((id, index) => (
            <RequestListItem
              key={id}
              id={id}
              lavel={lavel + 1}
              isLastChild={index === children.length - 1}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default RequestListItemExpendedContent;
