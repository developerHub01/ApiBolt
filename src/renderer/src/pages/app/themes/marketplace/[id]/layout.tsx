import { Outlet, useParams } from "react-router-dom";
import MarketPlaceResizable from "@renderer/components/app/themes/marketplace/MarketPlaceResizableWrapper";
import MarketPlaceNoThemeOpen from "@renderer/components/app/themes/marketplace/MarketPlaceNoThemeOpen";

const ThemeMarketPlaceLayout = () => {
  const { id } = useParams<{ id?: string }>();
  return (
    <MarketPlaceResizable>
      {id ? <Outlet /> : <MarketPlaceNoThemeOpen />}
    </MarketPlaceResizable>
  );
};

export default ThemeMarketPlaceLayout;
