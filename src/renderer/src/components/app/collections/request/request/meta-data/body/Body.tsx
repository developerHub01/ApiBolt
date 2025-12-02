import BodyDetails from "@/components/app/collections/request/request/meta-data/body/BodyDetails";
import BodyTypeSelector from "@/components/app/collections/request/request/meta-data/body/BodyTypeSelector";
import BodyRight from "@/components/app/collections/request/request/meta-data/body/BodyRight";

const Body = () => {
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
