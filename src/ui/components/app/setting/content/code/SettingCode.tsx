import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingCodeFontSize from "@/components/app/setting/content/code/SettingCodeFontSize";
import SettingCodeIndentationSize from "@/components/app/setting/content/code/SettingCodeIndentationSize";

const SettingCode = () => {
  return (
    <SettingItem id="code" title="Code Settings">
      <div className="w-full flex flex-col gap-4">
        <SettingCodeFontSize />
        <SettingCodeIndentationSize />
      </div>
    </SettingItem>
  );
};

export default SettingCode;
