import { Outlet } from "react-router-dom";

const ThemeMarketPlaceLayout = () => {
  return (
    <section className="w-full h-full overflow-hidden flex flex-col justify-center items-center relative">
      <Outlet />
    </section>
  );
};

export default ThemeMarketPlaceLayout;
