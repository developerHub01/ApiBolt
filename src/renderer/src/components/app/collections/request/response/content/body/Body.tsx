import BodyTop from "@/components/app/collections/request/response/content/body/BodyTop";
import BodyContent from "@/components/app/collections/request/response/content/body/content/BodyContent";

const Body = () => {
  return (
    <div className="h-full w-full flex flex-col gap-2">
      <BodyTop />
      <BodyContent />
    </div>
  );
};

export default Body;
