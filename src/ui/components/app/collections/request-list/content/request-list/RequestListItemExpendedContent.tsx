import { useCallback } from "react";
import RequestListItem from "@/components/app/collections/request-list/content/request-list/RequestListItem";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/context/redux/hooks";
import { createSingleRequest } from "@/context/redux/request-response/thunks/request-list";
import type { RequestListItemInterface } from "@/types/request-response.types";

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

  return (
    <div className="w-full select-text cursor-text">
      {!Array.isArray(children) || !children.length ? (
        <div
          className="text-xs text-muted-foreground p-1"
          style={{
            paddingLeft: (lavel + 1) * 10 + 20,
          }}
        >
          This folder is empty. <br />
          <Button
            variant={"link"}
            size={"sm"}
            className="px-0 text-xs!"
            onClick={handleAddRequest}
          >
            Add a request
          </Button>{" "}
          to start working.
        </div>
      ) : (
        <div>
          {children.map((id) => (
            <RequestListItem key={id} id={id} lavel={lavel + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestListItemExpendedContent;
