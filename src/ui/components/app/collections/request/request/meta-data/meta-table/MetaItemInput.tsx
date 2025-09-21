import {
  type ChangeEvent,
  type FocusEvent,
  memo,
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Eye as ShowIcon, EyeOff as HideIcon } from "lucide-react";

const hiddenDummyText = "•••••••••••••••••••••••••";

interface MetaItemInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "id" | "value" | "onBlur" | "className" | "ref"
  > {
  id: string;
  ref: RefObject<HTMLInputElement | null>;
  cellType: string;
  value?: string;
  type: "text" | "password";
  onBlur: (id: string, key: string, value: string) => void;
  className?: string;
}

const MetaItemInput = memo(
  ({
    id,
    ref,
    cellType,
    value = "",
    onBlur,
    type = "text",
    className = "",
    ...props
  }: MetaItemInputProps) => {
    const [valueState, setValueState] = useState<string>(value);
    const [hidePassword, setHidePassword] = useState<boolean>(
      type !== "text" || (id === "authorization" && cellType === "value")
    );

    useEffect(() => {
      setValueState(value);
    }, [value]);

    useEffect(() => {
      setHidePassword(
        type !== "text" || (id === "authorization" && cellType === "value")
      );
    }, [type, id, cellType]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setValueState(e.target.value);
    }, []);

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (!e.target.dataset.metaItemType) return;
        onBlur(id, e.target.dataset.metaItemType, e.target.value);
      },
      [onBlur, id]
    );

    const handleTogglePasswordView = () => setHidePassword((prev) => !prev);

    const showPasswordButton =
      type === "password" || (id === "authorization" && cellType === "value");

    return (
      <div className="w-full flex gap-1 justify-between items-center group">
        <input
          ref={ref}
          type={"text"}
          data-meta-item-type={cellType}
          value={hidePassword ? hiddenDummyText : valueState}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            "w-full p-0.5 outline-none",
            "border-b border-transparent focus:border-primary",
            "placeholder:capitalize placeholder:opacity-50",
            "disabled:opacity-50 md:text-sm",
            "selection:bg-primary selection:text-primary-foreground",
            className
          )}
          placeholder={cellType}
          {...props}
        />
        {showPasswordButton && (
          <button
            onClick={handleTogglePasswordView}
            className={cn(
              "cursor-pointer size-5 [&>svg]:size-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto rounded-full transition duration-100",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            )}
          >
            {hidePassword ? <ShowIcon /> : <HideIcon />}
          </button>
        )}
      </div>
    );
  }
);
MetaItemInput.displayName = "Meta item input";

export default MetaItemInput;
