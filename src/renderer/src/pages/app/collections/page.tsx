import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/context/redux/hooks";
import { addNewTabsData } from "@/context/redux/request-response/thunks/tab-list";
import Logo from "@/components/ui/logo";

const CollectionPage = () => {
  const dispatch = useAppDispatch();

  const handleAdd = useCallback(() => {
    dispatch(addNewTabsData());
  }, [dispatch]);

  return (
    <section className="w-full h-full flex flex-col gap-8 justify-center items-center">
      <div className="max-w-xs md:max-w-sm">
        <Logo className="w-full h-full" color="accent" />
      </div>
      <Button variant={"secondary"} onClick={handleAdd}>
        Create a new request
      </Button>
    </section>
  );
};

export default CollectionPage;
