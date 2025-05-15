import { useMemo } from "react";
import { useRequestList } from "@/context/request-list/RequestListProvider";
import RequestListItem from "@/components/app/request-list/content/request-list/RequestListItem";

const RequestList = () => {
  const { listData } = useRequestList();

  const rootList = useMemo(() => {
    return Object.values(listData).filter((item) => !item.parent);
  }, [listData]);

  return (
    <div>
      {rootList.map(({ id }) => (
        <RequestListItem key={id} id={id} />
      ))}
    </div>
  );
};

export default RequestList;
