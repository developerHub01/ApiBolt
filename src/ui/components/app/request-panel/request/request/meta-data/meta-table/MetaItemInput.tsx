import {
  type ChangeEvent,
  type FocusEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface MetaItemInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "id" | "value" | "onBlur" | "className"
  > {
  id: string;
  keyType: string;
  value?: string;
  onBlur: (id: string, key: string, value: string) => void;
  className?: string;
}

const MetaItemInput = memo(
  ({
    id,
    keyType,
    value = "",
    onBlur,
    className = "",
    ...props
  }: MetaItemInputProps) => {
    const [valueState, setValueState] = useState<string>(value);

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

    return (
      <input
        type="text"
        data-meta-item-type={keyType}
        value={valueState}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn("w-full p-0.5", "focus:bg-background", className)}
        {...props}
      />
    );
  }
);
MetaItemInput.displayName = "Meta item input";

export default MetaItemInput;
