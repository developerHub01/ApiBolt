import { memo, useMemo } from "react";
import RequestListItem from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItem";
import { useAppSelector } from "@/context/redux/hooks";
import AutoScrollActiveWrapper from "@/components/ui/auto-scroll-active-wrapper";
import EmptyBox from "@/components/app/collections/request-list/content/request-list/EmptyBox";
import RestArea from "@/components/app/collections/request-list/content/request-list/RestArea";
import { selectRequestOrFolderList } from "@/context/redux/request-response/selectors/request-list";

const RequestList = memo(() => {
  const requestList = useAppSelector(selectRequestOrFolderList);
  const rootList = useMemo(
    () =>
      Object.values(requestList)
        .filter((item) => !item.parentId)
        .sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        ),
    [requestList]
  );

  return (
    <div className="h-full flex flex-col w-full gap-0.5">
      <AutoScrollActiveWrapper>
        {rootList.map(({ id }) => (
          <RequestListItem key={id} id={id} lavel={0} isRootLastChild={true} />
        ))}
      </AutoScrollActiveWrapper>
      <RestArea>{!rootList?.length && <EmptyBox />}</RestArea>
    </div>
  );
});

export default RequestList;
