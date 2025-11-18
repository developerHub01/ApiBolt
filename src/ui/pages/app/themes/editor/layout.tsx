import { useAppDispatch } from "@/context/redux/hooks";
import { loadCurrentTheme } from "@/context/redux/theme/thunks/theme";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ThemeEditorLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      loadCurrentTheme({
        once: true,
      })
    );
  }, [dispatch]);

  return (
    <section className="w-full h-full overflow-hidden flex flex-col p-4 justify-center items-center relative">
      <Outlet />
    </section>
  );
};

export default ThemeEditorLayout;
