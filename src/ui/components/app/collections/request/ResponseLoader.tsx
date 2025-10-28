import LoaderV1 from "@/components/loader-v1";
import { useAppSelector } from "@/context/redux/hooks";
import { selectIsResponseLoading } from "@/context/redux/request-response/selectors/response";

const ResponseLoader = () => {
  const isLoading = useAppSelector(selectIsResponseLoading);

  return <LoaderV1 isLoading={isLoading} key="response-loader" />;
};

export default ResponseLoader;
