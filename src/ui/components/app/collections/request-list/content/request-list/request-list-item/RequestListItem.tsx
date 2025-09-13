import { memo } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import RequestListProvider from "@/context/collections/request-list/RequestListProvider";
import RequestListItemContent from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemContent";
import {
  getFolderChildren,
  getRequestType,
} from "@/utils/request-response.utils";

interface Props {
  id: string;
  lavel: number;
  isLastChild?: boolean;
  isRootLastChild?: boolean;
}

const RequestListItem = memo(
  ({ id, lavel = 0, isLastChild, isRootLastChild = false }: Props) => {
    const requestDetails = useAppSelector(
      (state) => state.requestResponse.requestList[id]
    );

    if (!requestDetails) return null;

    /* if have children then as usual but if not and not have method means folder so add and empty children else children will be undefined means acutally it is a request*/
    const children = getFolderChildren(requestDetails);
    const type = getRequestType(requestDetails);

    return (
      <RequestListProvider>
        <RequestListItemContent
          {...requestDetails}
          children={children ?? undefined}
          type={type}
          lavel={lavel}
          isLastChild={isLastChild}
          isRootLastChild={isRootLastChild}
        />
      </RequestListProvider>
    );
  }
);

export default RequestListItem;
