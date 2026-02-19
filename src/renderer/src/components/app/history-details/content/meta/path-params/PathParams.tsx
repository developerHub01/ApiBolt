import { useMemo } from "react";
import MetaTable from "@/components/app/history-details/content/meta/meta-table/MetaTable";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";
import { ParamInterface } from "@shared/types/request-response.types";

const PathParams = () => {
  const { pathParams } = useAppSelector(selectHistoryDetails);
  const params = useMemo(
    () =>
      Object.entries(pathParams ?? {}).reduce(
        (acc, [id, param]) => {
          acc.push({
            id,
            key: id,
            ...param,
            isCheck: true,
          });

          return acc;
        },
        [] as Array<ParamInterface<string>>,
      ),
    [pathParams],
  );

  if (!params?.length) return null;

  return <MetaTable type="path-params" data={params} />;
};

export default PathParams;
