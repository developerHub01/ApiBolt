import { memo } from "react";
import RequestListItem from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItem";
import RequestListItemFolderEmpty from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemFolderEmpty";
import { useRequestListItem } from "@/context/collections/request-list/RequestListItemProvider";

const RequestListItemExpendedContent = memo(() => {
  const { children, lavel, isRootLastChild } = useRequestListItem();

  return (
    <div className="w-full select-text cursor-text">
      {!Array.isArray(children) || !children.length ? (
        <RequestListItemFolderEmpty />
      ) : (
        <>
          {children.map((id, index) => (
            <RequestListItem
              key={id}
              id={id}
              lavel={lavel + 1}
              isLastChild={index === children.length - 1}
              isRootLastChild={isRootLastChild && index === children.length - 1}
            />
          ))}
        </>
      )}
    </div>
  );
});

export default RequestListItemExpendedContent;
