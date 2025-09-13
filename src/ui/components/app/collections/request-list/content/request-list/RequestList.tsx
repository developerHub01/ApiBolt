import { memo, useMemo } from "react";
import RequestListItem from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItem";
import { useAppSelector } from "@/context/redux/hooks";
import AutoScrollActiveWrapper from "@/components/ui/auto-scroll-active-wrapper";
import { selectRequestOrFolderList } from "@/context/redux/request-response/request-response-selector";
import EmptyBox from "@/components/app/collections/request-list/content/request-list/EmptyBox";
import RestArea from "@/components/app/collections/request-list/content/request-list/RestArea";

const RequestList = memo(() => {
  const requestList = useAppSelector(selectRequestOrFolderList);

  const rootList = useMemo(() => {
    return Object.values(requestList)
      .filter((item) => !item.parentId)
      .sort((a, b) => b.createdAt! - a.createdAt!);
  }, [requestList]);

  return (
    <div className="h-full flex flex-col w-full gap-0.5">
      <AutoScrollActiveWrapper>
        {rootList.map(({ id }) => (
          <RequestListItem key={id} id={id} lavel={0} isRootLastChild={true} />
        ))}
      </AutoScrollActiveWrapper>
      {rootList?.length ? <RestArea /> : <EmptyBox />}
    </div>
  );
});

export default RequestList;
