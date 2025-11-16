import { Outlet } from "react-router-dom";
import MarketPlaceResizable from "@/components/app/themes/marketplace/[id]/MarketPlaceResizableWrapper";

const ThemeMarketPlaceLayout = () => {
  return (
    <MarketPlaceResizable>
      <Outlet />
    </MarketPlaceResizable>
  );
};

export default ThemeMarketPlaceLayout;
