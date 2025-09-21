import { memo } from "react";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import AddNewMetaData from "@/components/app/collections/request/request/meta-data/AddNewMetaData";
import LabelPrefix from "@/components/app/collections/request/request/meta-data/headers/LabelPrefix";
import { useAppSelector } from "@/context/redux/hooks";
import { selectShowHiddenHeader } from "@/context/redux/request-response/selectors/headers";

const Headers = memo(() => {
  const showHiddenHeader = useAppSelector(selectShowHiddenHeader);

  return (
    <MetaDataWrapper label="Headers" labelPrefix={<LabelPrefix />}>
      <MetaTable showHiddenData={showHiddenHeader} />
      <AddNewMetaData label="Add New Headers" />
    </MetaDataWrapper>
  );
});

Headers.displayName = "Headers";

export default Headers;
