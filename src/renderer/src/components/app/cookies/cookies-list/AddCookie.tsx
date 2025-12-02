import { Button } from "@/components/ui/button";
import { handleChangeIsAddCookieOption } from "@/context/redux/cookies/cookies-slice";
import { useAppDispatch } from "@/context/redux/hooks";
import { Plus as AddIcon } from "lucide-react";

const AddCookie = () => {
  const dispatch = useAppDispatch();
  const handleAdd = () => dispatch(handleChangeIsAddCookieOption(true));

  return (
    <Button variant={"secondary"} onClick={handleAdd} className="w-full">
      <AddIcon /> Add Cookie
    </Button>
  );
};

export default AddCookie;
