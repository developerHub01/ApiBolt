import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingCodeFontSize from "@/components/app/setting/content/code/SettingCodeFontSize";
import SettingCodeIndentationSize from "@/components/app/setting/content/code/SettingCodeIndentationSize";
import SettingItemContentWrapper from "@/components/app/setting/content/SettingItemContentWrapper";

const SettingCode = () => {
  return (
    <SettingItem id="code" title="Code Settings">
      <SettingItemContentWrapper>
        <SettingCodeFontSize />
        <SettingCodeIndentationSize />
      </SettingItemContentWrapper>
    </SettingItem>
  );
};

export default SettingCode;
