import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { X as CloseIcon } from "lucide-react";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeSelectedCookieKey } from "@/context/redux/cookies/cookies-slice";
import { cn } from "@/lib/utils";
import { deleteCookieByKey } from "@/context/redux/cookies/thunks/cookies";
import useCustomToast from "@/hooks/ui/use-custom-toast";

interface Props {
  id: string;
  selected?: boolean;
}

const Cookie = memo(({ id, selected = false }: Props) => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const handleClickCookie = () => dispatch(handleChangeSelectedCookieKey(id));
  const handleDeleteCookie = async () => {
    const response = await dispatch(deleteCookieByKey(id)).unwrap();
    return toast({
      type: response ? "success" : "error",
      title: response ? "Delete success" : "Delete error",
      description: response
        ? "Cookie deleted successfully"
        : "Couldn't delete cookie, something went wrong.",
    });
  };

  return (
    <ButtonLikeDiv
      variant="outline"
      className={cn(
        "flex items-center gap-0 px-0 py-0 overflow-hidden ring-1 ring-transparent",
        {
          "ring-primary": selected,
        },
      )}
    >
      <Button
        variant="ghost"
        className="flex-1 min-w-0 px-3 py-2"
        title={id}
        onClick={handleClickCookie}
      >
        <span className="block overflow-hidden text-ellipsis whitespace-nowrap truncate">
          {id}
        </span>
      </Button>
      <Button
        variant="ghost"
        className="shrink-0 px-2 py-2 border-l"
        onClick={handleDeleteCookie}
      >
        <CloseIcon />
      </Button>
    </ButtonLikeDiv>
  );
});
export default Cookie;
