import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FocusEvent,
  type KeyboardEvent,
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
import { cn } from "@/lib/utils";
import type { THostType } from "@/types/request-url.types";
import { apiHostTypeList } from "@/constant/request-url.constant";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectRequestUrlTokenHost } from "@/context/redux/request-url/request-url-selector";
import { requestUrlUpdateOriginToken } from "@/context/redux/request-url/request-url-thunk";
import FlexibleHightButtonLikeDiv from "@/components/ui/flexible-hight-button-like-div";

interface HostTokenProps {
  hostType: THostType;
}

const HostToken = memo(({ hostType }: HostTokenProps) => {
  const dispatch = useAppDispatch();
  const host = useAppSelector(selectRequestUrlTokenHost);
  const [hostState, setHostState] = useState<string>(host);
  const hostnameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (host === hostState) return;
    setHostState(host);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  const handleBlurHost = (e: FocusEvent<HTMLInputElement>) => {
    const newValue = e.target.innerText.trim();
    setHostState(newValue);
    if (newValue === hostState) return;

    dispatch(
      requestUrlUpdateOriginToken({
        id: "host",
        value: newValue,
      })
    );
  };

  const handleKeydown = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.code === "Enter") return e.preventDefault();
  };

  const handlePaste = (e: ClipboardEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
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

  const handleOutterClick = () => {
    hostnameRef.current?.focus();
  };

  return (
    <div className="min-w-[150px] w-fit flex items-center p-0 gap-0">
      <FlexibleHightButtonLikeDiv
        className="flex-1 rounded-none"
        onClick={handleOutterClick}
      >
        {hostType !== "custom" ? (
          hostType
        ) : (
          <p
            ref={hostnameRef}
            contentEditable
            suppressContentEditableWarning
            className="outline-none cursor-text border-b w-full min-w-12 text-center break-words break-all whitespace-normal font-normal"
            onKeyDown={handleKeydown}
            onBlur={handleBlurHost}
            onPaste={handlePaste}
          >
            {hostState}
          </p>
        )}
      </FlexibleHightButtonLikeDiv>
      <Menu value={hostType} onChange={handleChangeHostType} />
    </div>
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
        <Button variant="secondary" className="rounded-l-none border-0 h-full">
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
