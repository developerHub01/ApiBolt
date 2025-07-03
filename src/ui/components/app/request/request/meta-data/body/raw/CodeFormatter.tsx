import BeautifyCode from "@/components/app/request/request/meta-data/body/raw/BeautifyCode";
import ToggleCodeLineWrap from "@/components/app/request/request/meta-data/body/raw/ToggleCodeLineWrap";

const CodeFormatter = () => {
  return (
    <div className="flex items-center gap-3 ml-auto">
      <ToggleCodeLineWrap />
      <BeautifyCode />
    </div>
  );
};

export default CodeFormatter;
