import {
  type ChangeEvent,
  type FocusEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Eye as ShowIcon, EyeOff as HideIcon } from "lucide-react";

interface MetaItemInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "id" | "value" | "onBlur" | "className"
  > {
  id: string;
  keyType: string;
  value?: string;
  type: "text" | "password";
  onBlur: (id: string, key: string, value: string) => void;
  className?: string;
}

const MetaItemInput = memo(
  ({
    id,
    keyType,
    value = "",
    onBlur,
    type = "text",
    className = "",
    ...props
  }: MetaItemInputProps) => {
    const [valueState, setValueState] = useState<string>(value);
    const [hidePassword, setHidePassword] = useState<boolean>(true);

    useEffect(() => {
      setValueState(value);
    }, [value]);

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

    return (
      <div className="w-full flex gap-1 justify-between items-center group">
        <input
          type={"text"}
          data-meta-item-type={keyType}
          value={
            type === "text" || !hidePassword
              ? valueState
              : "••••••••••••••••••••"
          }
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            "w-full p-0.5 outline-none",
            "focus:bg-background",
            className
          )}
          {...props}
        />
        {type === "password" && (
          <button
            onClick={handleTogglePasswordView}
            className="cursor-pointer size-5 [&>svg]:size-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto rounded-full transition duration-100"
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
