import BodyDetails from "@/components/app/collections/request/request/meta-data/body/BodyDetails";
import BodyTypeSelector from "@/components/app/collections/request/request/meta-data/body/BodyTypeSelector";
import BodyRight from "@/components/app/collections/request/request/meta-data/body/BodyRight";
import { useAppSelector } from "@/context/redux/hooks";
import { selectMetaBodyIsLoading } from "@/context/redux/status/selectors/meta-body";
import BodySkeleton from "@/components/app/collections/request/request/meta-data/body/skeleton/BodySkeleton";

const Body = () => {
  const isLoading = useAppSelector(selectMetaBodyIsLoading);

  if (isLoading) return <BodySkeleton />;

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex gap-3 items-center flex-wrap">
        <BodyTypeSelector />
        <BodyRight />
      </div>
      <BodyDetails />
    </div>
  );
};

export default Body;
