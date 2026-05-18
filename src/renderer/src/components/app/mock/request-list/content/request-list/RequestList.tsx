import { memo, useMemo } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectRequestOrFolderList } from "@/context/redux/mock/selectors/request-list";
import { useTreeView } from "@/context/tree-view/TreeViewProvider";

const RequestList = memo(() => {
  const requestList = useAppSelector(selectRequestOrFolderList);
  const { itemComponent: ItemComponent } = useTreeView();

  const rootList = useMemo(
    () =>
      Object.values(requestList)
        .filter(item => !item.parentId)
        .sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime(),
        ),
    [requestList],
  );

  return (
    <>
      {rootList.map(({ id }, index) => (
        <ItemComponent
          key={id}
          id={id}
          level={0}
          isLastChild={index === rootList.length - 1}
          isRootLastChild={
            true
          } /* this is very important to have true because this are root routes and recursion will call from them. */
        />
      ))}
    </>
  );
});

export default RequestList;
