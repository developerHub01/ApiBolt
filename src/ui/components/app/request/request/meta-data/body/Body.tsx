import BodyDetails from "@/components/app/request/request/meta-data/body/BodyDetails";
import BodyRawDataTypeSelector from "@/components/app/request/request/meta-data/body/BodyRawDataTypeSelector";
import BodyTypeSelector from "@/components/app/request/request/meta-data/body/BodyTypeSelector";
import CodeFormatter from "@/components/app/request/request/meta-data/body/raw/CodeFormatter";

const Body = () => {
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex gap-3 items-center flex-wrap">
        <BodyTypeSelector />
        <BodyRawDataTypeSelector />

        {/* format code block */}
        <CodeFormatter />
      </div>
      <BodyDetails />
    </div>
  );
};

export default Body;
