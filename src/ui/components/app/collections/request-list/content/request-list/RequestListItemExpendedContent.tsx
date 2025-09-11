import { memo } from "react";
import RequestListItem from "@/components/app/collections/request-list/content/request-list/RequestListItem";
import type { RequestListItemInterface } from "@/types/request-response.types";
import RequestListItemFolderEmpty from "@/components/app/collections/request-list/content/request-list/RequestListItemFolderEmpty";

interface Props extends Pick<RequestListItemInterface, "children"> {
  id: string;
  lavel: number;
  isRootLastChild?: boolean;
}

const RequestListItemExpendedContent = memo(
  ({ id, children, lavel, isRootLastChild = false }: Props) => {
    return (
      <div className="w-full select-text cursor-text">
        {!Array.isArray(children) || !children.length ? (
          <RequestListItemFolderEmpty
            id={id}
            lavel={lavel + 1}
            isRootLastChild={isRootLastChild}
          />
        ) : (
          <>
            {children.map((id, index) => (
              <RequestListItem
                key={id}
                id={id}
                lavel={lavel + 1}
                isLastChild={index === children.length - 1}
                isRootLastChild={
                  isRootLastChild && index === children.length - 1
                }
              />
            ))}
          </>
        )}
      </div>
    );
  }
);

export default RequestListItemExpendedContent;
