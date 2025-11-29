import { memo } from "react";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import AddNewMetaData from "@/components/app/collections/request/request/meta-data/AddNewMetaData";
import LabelPrefixHidden from "@/components/app/collections/request/request/meta-data/meta-table/LabelPrefixHidden";
import { useAppSelector } from "@/context/redux/hooks";
import { selectShowHiddenParams } from "@/context/redux/request-response/selectors/params";
import ParamsSkeleton from "@/components/app/collections/request/request/meta-data/params/skeleton/ParamsSkeleton";
import { selectParamsIsLoading } from "@/context/redux/status/selectors/params";

const Params = memo(() => {
  const showHiddenParams = useAppSelector(selectShowHiddenParams);
  const isLoading = useAppSelector(selectParamsIsLoading);

  if (isLoading) return <ParamsSkeleton />;

  return (
    <MetaDataWrapper
      label="Query Params"
      labelPrefix={<LabelPrefixHidden type="param" />}
    >
      <MetaTable showHiddenData={showHiddenParams} />
      <AddNewMetaData label="Add New Param" />
    </MetaDataWrapper>
  );
});
Params.displayName = "Params";

export default Params;
