import BodyRawDataTypeSelector from "@/components/app/collections/request/request/meta-data/body/BodyRawDataTypeSelector";
import CodeFormatter from "@/components/app/collections/request/request/meta-data/body/raw/CodeFormatter";

const BodyRight = () => {
  return (
    <>
      <BodyRawDataTypeSelector />
      {/* format code block */}
      <CodeFormatter />
    </>
  );
};

export default BodyRight;
