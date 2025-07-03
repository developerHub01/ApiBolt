import BodyTop from "@/components/app/request/response/content/body/BodyTop";
import BodyContent from "@/components/app/request/response/content/body/content/BodyContent";

const Body = () => {
  return (
    <div className="h-full flex flex-col gap-3">
      <BodyTop />
      <BodyContent />
    </div>
  );
};

export default Body;