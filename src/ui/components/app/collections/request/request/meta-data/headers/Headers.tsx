import { memo } from "react";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import AddNewMetaData from "@/components/app/collections/request/request/meta-data/AddNewMetaData";
import { useAppSelector } from "@/context/redux/hooks";
import { selectShowHiddenHeader } from "@/context/redux/request-response/selectors/headers";
import LabelPrefixHidden from "@/components/app/collections/request/request/meta-data/meta-table/LabelPrefixHidden";
import { selectHeadersIsLoading } from "@/context/redux/status/selectors/headers";
import HeadersSkeleton from "@/components/app/collections/request/request/meta-data/headers/skeleton/HeadersSkeleton";

const Headers = memo(() => {
  const showHiddenHeader = useAppSelector(selectShowHiddenHeader);
  const isLoading = useAppSelector(selectHeadersIsLoading);

  if (isLoading) return <HeadersSkeleton />;

  return (
    <MetaDataWrapper
      label="Headers"
      labelPrefix={<LabelPrefixHidden type="header" />}
    >
      <MetaTable showHiddenData={showHiddenHeader} />
      <AddNewMetaData label="Add New Headers" />
    </MetaDataWrapper>
  );
});

Headers.displayName = "Headers";

export default Headers;
