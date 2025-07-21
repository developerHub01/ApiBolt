import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/context/redux/hooks";
import { addNewTab } from "@/context/redux/request-response/request-response-thunk";

const CollectionPage = () => {
  const dispatch = useAppDispatch();

  const handleAdd = useCallback(() => {
    dispatch(addNewTab());
  }, [dispatch]);

  return (
    <section className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <h1 className="text-6xl md:text-8xl font-black uppercase text-center text-muted-foreground leading-tight rounded-full p-8 md:p-11 aspect-square bg-muted select-none">
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
