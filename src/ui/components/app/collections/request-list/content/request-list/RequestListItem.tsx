import { memo } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import RequestListProvider from "@/context/collections/request-list/RequestListProvider";
import RequestListItemContent from "@/components/app/collections/request-list/content/request-list/RequestListItemContent";

interface Props {
  id: string;
  lavel: number;
}

const RequestListItem = memo(({ id, lavel = 0 }: Props) => {
  const requestDetails = useAppSelector(
    (state) => state.requestResponse.requestList[id]
  );

  if (!requestDetails) return null;

  /* if have children then as usual but if not and not have method means folder so add and empty children else children will be undefined means acutally it is a request*/
  const children =
    requestDetails.children ??
    (!requestDetails["method"] && !requestDetails["children"] ? [] : undefined);

  return (
    <RequestListProvider>
      <RequestListItemContent
        {...requestDetails}
        children={children}
        type={children ? "folder" : "request"}
        lavel={lavel}
      />
    </RequestListProvider>
  );
});

export default RequestListItem;
