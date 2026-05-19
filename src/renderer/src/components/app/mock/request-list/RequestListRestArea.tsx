import TreeView from "@/components/ui/tree-view/TreeView";
import { useAppSelector } from "@/context/redux/hooks";
import { selectRequestOrFolderListCount } from "@/context/redux/mock/selectors/request-list";

const RequestListRestArea = () => {
  const requestListCount = useAppSelector(selectRequestOrFolderListCount);
  return (
    <TreeView.RestArea>
      {!requestListCount && (
        <TreeView.EmptyBox
          title="No request available. Create one."
          description="Your currently mock request list is empty. You can start by clicking on the '+' add button or from right side tab list."
        />
      )}
    </TreeView.RestArea>
  );
};

export default RequestListRestArea;
