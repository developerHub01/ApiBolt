import LoaderV1 from "@/components/loader-v1";
import { useAppSelector } from "@/context/redux/hooks";
import { selectIsFetchApiLoading } from "@/context/redux/status/selectors/fetch-api";

const ResponseLoader = () => {
  const isLoading = useAppSelector(selectIsFetchApiLoading);

  return <LoaderV1 isLoading={isLoading} key="response-loader" />;
};

export default ResponseLoader;
