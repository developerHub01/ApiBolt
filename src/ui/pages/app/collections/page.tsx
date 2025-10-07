import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/context/redux/hooks";
import { addNewTabsData } from "@/context/redux/request-response/thunks/tab-list";

const CollectionPage = () => {
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
      <Button variant={"secondary"} onClick={handleAdd}>
        Create a new request
      </Button>
    </section>
  );
};

export default CollectionPage;
