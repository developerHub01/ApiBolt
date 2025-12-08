import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/context/redux/hooks";
import { addNewTabsData } from "@/context/redux/request-response/thunks/tab-list";
import { Link } from "react-router-dom";
import { SIDEBAR_MENU_ID_PATH_MAP } from "@/constant/sidebar.constant";

const AppPage = () => {
  const dispatch = useAppDispatch();

  const handleAdd = useCallback(() => {
    dispatch(addNewTabsData());
  }, [dispatch]);

  return (
    <section className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <h1 className="text-8xl font-black uppercase text-center text-muted-foreground leading-tight rounded-full p-11 aspect-square bg-muted/75 select-none">
        Api
        <br />
        Bolt
      </h1>
      <Link to={SIDEBAR_MENU_ID_PATH_MAP["navigate_projects"]!}>
        <Button variant={"secondary"} onClick={handleAdd}>
          Go to project area
        </Button>
      </Link>
    </section>
  );
};

export default AppPage;
