import { Outlet, useParams } from "react-router-dom";
import MarketPlaceResizable from "@/components/app/themes/marketplace/[id]/MarketPlaceResizableWrapper";
import MarketPlaceNoThemeOpen from "@/components/app/themes/marketplace/[id]/MarketPlaceNoThemeOpen";

const ThemeMarketPlaceLayout = () => {
  const { id } = useParams<{ id?: string }>();
  console.log({ id });

  return (
    <MarketPlaceResizable>
      {id ? <Outlet /> : <MarketPlaceNoThemeOpen />}
    </MarketPlaceResizable>
  );
};

export default ThemeMarketPlaceLayout;
