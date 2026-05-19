import { memo, useMemo } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import {
  getFolderChildren,
  getRequestType,
} from "@/utils/request-response.utils";
import TreeView from "@/components/ui/tree-view/TreeView";
import ItemCTA from "@/components/app/mock/request-list/content/request-list/item-cta/ItemCTA";
import RequestMethodTag from "@/components/app/RequestMethodTag";

interface Props {
  id: string;
  level: number;
  isLastChild?: boolean;
  isRootLastChild?: boolean;
}

const RequestListItem = memo(
  ({ id, level = 0, isLastChild, isRootLastChild = true }: Props) => {
    const requestDetails = useAppSelector(state => state.mock.requestList[id]);

    const childrenElements = useMemo(
      () =>
        requestDetails
          ? (getFolderChildren(requestDetails) ?? undefined)
          : undefined,
      [requestDetails],
    );
    const parentId = useMemo(
      () => requestDetails?.parentId ?? undefined,
      [requestDetails?.parentId],
    );
    const type = useMemo(
      () => (requestDetails ? getRequestType(requestDetails) : undefined),
      [requestDetails],
    );
    const isExpended = useMemo(
      () => requestDetails?.isExpended ?? false,
      [requestDetails?.isExpended],
    );
    const method = useMemo(
      () =>
        getRequestType(requestDetails) === "request"
          ? requestDetails?.method
          : null,
      [requestDetails],
    );

    if (!requestDetails) return null;

    return (
      <TreeView.ListItem
        id={id}
        level={level}
        isLastChild={isLastChild}
        isRootLastChild={isRootLastChild}
        parentId={parentId}
        childrenElements={childrenElements}
        type={type!}
        isExpended={isExpended}
        itemCTA={<ItemCTA />}
        tagEle={
          method && (
            <RequestMethodTag
              method={method ?? "get"}
              shortCut={true}
              shortCutSizeForAll={3}
              className="w-full px-0.5"
            />
          )
        }
      />
    );
  },
);

export default RequestListItem;
