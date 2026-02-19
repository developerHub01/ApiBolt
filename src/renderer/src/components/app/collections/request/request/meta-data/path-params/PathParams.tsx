import { memo } from "react";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import LabelPrefixHidden from "@/components/app/collections/request/request/meta-data/meta-table/LabelPrefixHidden";
import { useAppSelector } from "@/context/redux/hooks";
import { selectShowHiddenParams } from "@/context/redux/request-response/selectors/params";

const PathParams = memo(() => {
  const showHiddenParams = useAppSelector(selectShowHiddenParams);

  return (
    <MetaDataWrapper
      label="Path Params"
      labelPrefix={<LabelPrefixHidden type="param" />}
    >
      <MetaTable showHiddenData={showHiddenParams} />
    </MetaDataWrapper>
  );
});
PathParams.displayName = "PathParams";

export default PathParams;
