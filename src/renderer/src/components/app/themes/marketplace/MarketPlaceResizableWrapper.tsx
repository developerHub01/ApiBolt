import type React from "react";
import { ApiBoltResizableWrapper } from "@/components/ui/api-bolt-resizable";
import ThemeListPanelWrapper from "@renderer/components/app/themes/marketplace/theme-list/v1/ThemeListPanelWrapper";

interface Props {
  children: React.ReactNode;
}

const MarketPlaceResizable = ({ children }: Props) => {
  return (
    <ApiBoltResizableWrapper leftPanel={<ThemeListPanelWrapper />}>
      {children}
    </ApiBoltResizableWrapper>
  );
};

export default MarketPlaceResizable;
