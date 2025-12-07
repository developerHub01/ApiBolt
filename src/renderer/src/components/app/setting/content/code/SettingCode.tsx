import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingCodeFontSize from "@/components/app/setting/content/code/SettingCodeFontSize";
import SettingCodeIndentationSize from "@/components/app/setting/content/code/SettingCodeIndentationSize";
import SettingItemContentWrapper from "@/components/app/setting/content/SettingItemContentWrapper";
import { Separator } from "@/components/ui/separator";

const SettingCode = () => {
  return (
    <SettingItem id="code" title="Code Settings">
      <SettingItemContentWrapper>
        <SettingCodeFontSize />
        <Separator orientation="horizontal" />
        <SettingCodeIndentationSize />
      </SettingItemContentWrapper>
    </SettingItem>
  );
};

export default SettingCode;
