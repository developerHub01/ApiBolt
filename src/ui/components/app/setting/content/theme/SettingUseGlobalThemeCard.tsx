import { memo } from "react";
import { Palette as GlobalThemeIcon } from "lucide-react";
import { useSettingTheme } from "@/context/setting/theme/SettingThemeProvider";
import SettingThemeCardWrapper from "@/components/app/setting/content/theme/SettingThemeCardWrapper";

const SettingUseGlobalThemeCard = memo(() => {
  const { localThemeId, handleChangeActiveTheme } = useSettingTheme();
  const isActive = !localThemeId;

  const handleClick = () => {
    if (isActive) return;
    handleChangeActiveTheme(null);
  };

  return (
    <SettingThemeCardWrapper isActive={isActive} onClick={handleClick}>
      <div className="w-full aspect-square bg-accent rounded-xl overflow-hidden border">
        <div className="w-full h-full flex justify-center items-center">
          <GlobalThemeIcon size={40} />
        </div>
      </div>
      <h4 className="capitalize text-base font-medium">Global Theme</h4>
      <p className="text-muted-foreground text-sm">
        It will inherit global theme.
      </p>
    </SettingThemeCardWrapper>
  );
});

export default SettingUseGlobalThemeCard;
