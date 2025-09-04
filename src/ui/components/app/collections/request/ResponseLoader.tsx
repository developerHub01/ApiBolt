import LoaderV1 from "@/components/LoaderV1";
import { useAppSelector } from "@/context/redux/hooks";

const ResponseLoader = () => {
  const isLoading = useAppSelector(
    (state) =>
      state.requestResponse.isLoading[state.requestResponse.selectedTab!]
  );

  return <LoaderV1 isLoading={isLoading} key="response-loader" />;
};

export default ResponseLoader;
