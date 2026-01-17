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
import type { THostType } from "@shared/types/request-url.types";
import { API_HOST_TYPE_LIST } from "@/constant/request-url.constant";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { requestUrlUpdateOriginToken } from "@/context/redux/request-url/thunks/request-url";
import FlexibleHightButtonLikeDiv from "@/components/ui/flexible-hight-button-like-div";
import { isValidHost } from "@/utils/request-url.utils";
import { selectRequestUrlTokenHost } from "@/context/redux/request-url/selectors/host";

const isInvalidToken = (host: string) => !isValidHost(host);

interface HostTokenProps {
  hostType: THostType;
}

const HostToken = memo(({ hostType }: HostTokenProps) => {
  const dispatch = useAppDispatch();
  const host = useAppSelector(selectRequestUrlTokenHost);
  const [hostState, setHostState] = useState<string>(host);
  const [isError, setIsError] = useState<boolean>(false);
  const hostnameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (host === hostState) return;
    setHostState(host);
    setIsError(isInvalidToken(host));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  const handleUpdate = (value: string) => {
    const haveError = isInvalidToken(value);
    setHostState(value);
    setIsError(haveError);

    if (haveError || value === hostState) return;

    dispatch(
      requestUrlUpdateOriginToken({
        id: "host",
        value,
      }),
    );
  };

  const handleBlurHost = (e: FocusEvent<HTMLInputElement>) =>
    handleUpdate(e.target.innerText.trim());

  const handleKeydown = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (["Enter", "?", " ", "Tab"].includes(e.key)) e.preventDefault();
    if (e.key === "Enter") return handleUpdate(hostState);
    setIsError(isInvalidToken(hostState));
  };

  const handlePaste = (e: ClipboardEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const handleChangeHostType = useCallback(
    (type: THostType) => {
      const value = (["127.0.0.1", "localhost"] as Array<THostType>).includes(
        type,
      )
        ? type
        : "custom.com";

      dispatch(
        requestUrlUpdateOriginToken({
          id: "host",
          value,
        }),
      );
    },
    [dispatch],
  );

  const handleOutterClick = () => hostnameRef.current?.focus();

  return (
    <FlexibleHightButtonLikeDiv
      className={cn("min-w-37.5 w-fit p-0 gap-0 overflow-hidden ring", {
        "ring-transparent": !isError,
        "ring-destructive": isError,
      })}
    >
      <FlexibleHightButtonLikeDiv
        className="flex-1 rounded-none justify-start"
        onClick={handleOutterClick}
      >
        {hostType !== "custom" ? (
          hostType
        ) : (
          <p
            ref={hostnameRef}
            contentEditable
            suppressContentEditableWarning
            className="outline-none cursor-text border-b w-full min-w-12 text-center wrap-break-word break-all whitespace-normal font-normal"
            onKeyDown={handleKeydown}
            onBlur={handleBlurHost}
            onPaste={handlePaste}
          >
            {hostState}
          </p>
        )}
      </FlexibleHightButtonLikeDiv>
      <Menu value={hostType} onChange={handleChangeHostType} />
    </FlexibleHightButtonLikeDiv>
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
        className={cn("w-37.5", {
          "w-50": value === "custom",
        })}
        align="end"
        side="bottom"
      >
        <DropdownMenuRadioGroup
          defaultValue={"localhost"}
          value={value}
          onValueChange={newValue => onChange(newValue as THostType)}
        >
          {API_HOST_TYPE_LIST.map(type => (
            <DropdownMenuRadioItem
              key={type}
              value={type}
              className="capitalize"
            >
              {type}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HostToken;
