import {
  memo,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown as DownArrowIcon } from "lucide-react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { cn } from "@/lib/utils";
import type { THostType } from "@/types/request-url.types";
import { apiHostTypeList } from "@/constant/request-url.constant";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectRequestUrlTokenHost } from "@/context/redux/request-url/request-url-selector";
import { requestUrlUpdateOriginToken } from "@/context/redux/request-url/request-url-thunk";

interface HostTokenProps {
  hostType: THostType;
}

const HostToken = memo(({ hostType }: HostTokenProps) => {
  const dispatch = useAppDispatch();
  const host = useAppSelector(selectRequestUrlTokenHost);
  const [hostState, setHostState] = useState<string>(host);

  useEffect(() => {
    if (host === hostState) return;
    setHostState(host);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  const handleChangeHost = (e: ChangeEvent<HTMLInputElement>) =>
    setHostState(e.target.value);

  const handleBlurHost = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === host) return;

    dispatch(
      requestUrlUpdateOriginToken({
        id: "host",
        value,
      })
    );
  };

  const handleChangeHostType = useCallback(
    (type: THostType) => {
      const value = (["127.0.0.1", "localhost"] as Array<THostType>).includes(
        type
      )
        ? type
        : "custom.com";

      dispatch(
        requestUrlUpdateOriginToken({
          id: "host",
          value,
        })
      );
    },
    [dispatch]
  );

  return (
    <ButtonLikeDiv
      variant={"secondary"}
      className={cn("w-[150px] flex items-center p-0 gap-0", {
        "w-[200px]": hostType === "custom",
      })}
    >
      <ButtonLikeDiv
        variant={"outline"}
        className="flex-1 rounded-r-none border-0 justify-start"
      >
        {hostType !== "custom" ? (
          hostType
        ) : (
          <input
            placeholder="Host name"
            className="w-full border-0 border-b font-normal"
            value={hostState}
            onChange={handleChangeHost}
            onBlur={handleBlurHost}
          />
        )}
      </ButtonLikeDiv>
      <Menu value={hostType} onChange={handleChangeHostType} />
    </ButtonLikeDiv>
  );
});

interface MenuProps {
  value: THostType;
  onChange: (type: THostType) => void;
}

const Menu = ({ value, onChange }: MenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-l-none border-0">
          <DownArrowIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-[150px]", {
          "w-[200px]": value === "custom",
        })}
        align="end"
        side="bottom"
      >
        <DropdownMenuRadioGroup
          defaultValue={"localhost"}
          value={value}
          onValueChange={(newValue) => onChange(newValue as THostType)}
        >
          {apiHostTypeList.map((type) => (
            <DropdownMenuRadioItem value={type} className="capitalize">
              {type}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HostToken;
