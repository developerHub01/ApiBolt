import { memo } from "react";
import RequestListProvider from "@/context/collections/request-list/RequestListItemProvider";
import RequestListItemContent from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemContent";

interface Props {
  id: string;
  lavel: number;
  isLastChild?: boolean;
  isRootLastChild?: boolean;
}

const RequestListItem = memo(
  ({ id, lavel = 0, isLastChild, isRootLastChild = false }: Props) => {
    return (
      <RequestListProvider
        id={id}
        lavel={lavel}
        isLastChild={isLastChild}
        isRootLastChild={isRootLastChild}
      >
        <RequestListItemContent
        />
      </RequestListProvider>
    );
  }
);

export default RequestListItem;
