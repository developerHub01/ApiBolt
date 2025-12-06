import BodyTopLeft from "@/components/app/collections/request/response/content/body/BodyTopLeft";
import BodyTopRight from "@/components/app/collections/request/response/content/body/BodyTopRight";

const BodyTop = () => {
  return (
    <div className="flex justify-between items-center gap-2">
      <BodyTopLeft />
      <BodyTopRight />
    </div>
  );
};

export default BodyTop;
