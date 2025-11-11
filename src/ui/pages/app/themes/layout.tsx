import { Outlet } from "react-router-dom";

const ThemesLayout = () => {
  return (
    <section className="w-full h-full overflow-hidden flex flex-col p-4 justify-center items-center relative">
      <Outlet />
    </section>
  );
};

export default ThemesLayout;
