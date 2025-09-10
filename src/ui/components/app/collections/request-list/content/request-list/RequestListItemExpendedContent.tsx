import RequestListItem from "@/components/app/collections/request-list/content/request-list/RequestListItem";
import type { RequestListItemInterface } from "@/types/request-response.types";
import RequestListItemFolderEmpty from "@/components/app/collections/request-list/content/request-list/RequestListItemFolderEmpty";

interface Props extends Pick<RequestListItemInterface, "children"> {
  id: string;
  lavel: number;
}

const RequestListItemExpendedContent = ({ id, children, lavel }: Props) => {
  return (
    <div className="w-full select-text cursor-text">
      {!Array.isArray(children) || !children.length ? (
        <RequestListItemFolderEmpty id={id} lavel={lavel + 1} />
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
