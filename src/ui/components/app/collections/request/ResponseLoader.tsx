import LoaderV1 from "@/components/LoaderV1";
import { useAppSelector } from "@/context/redux/hooks";
import { selectIsResponseLoading } from "@/context/redux/request-response/request-response-selector";

const ResponseLoader = () => {
  const isLoading = useAppSelector(selectIsResponseLoading);

  return <LoaderV1 isLoading={isLoading} key="response-loader" />;
};

export default ResponseLoader;
