import { cn } from "@/lib/utils";
import { useEffect, useState, type ChangeEvent, type FocusEvent } from "react";

const AuthContentInput = ({
  value,
  className = "",
  onBlur,
  ...props
}: Omit<React.ComponentProps<"input">, "onBlur"> & {
  value: string;
  onBlur: (value: string) => void;
}) => {
  const [valueState, setValueState] = useState<string>(value ?? "");

  useEffect(() => {
    setValueState(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueState(e.target.value);
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur(e.target.value);
  };

  return (
    <input
      value={valueState}
      onChange={handleChange}
      onBlur={handleBlur}
      className={cn(
        "px-1.5 py-1 border-2 border-accent outline-none rounded-lg text-sm w-full max-w-80",
        className
      )}
      {...props}
    />
  );
};

export default AuthContentInput;
