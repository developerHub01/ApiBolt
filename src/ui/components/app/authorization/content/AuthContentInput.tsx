import { useEffect, useState, type ChangeEvent, type FocusEvent } from "react";
import { cn } from "@/lib/utils";
import { Eye as ShowIcon, EyeOff as HideIcon } from "lucide-react";

const AuthContentInput = ({
  value,
  type = "text",
  className = "",
  onBlur,
  ...props
}: Omit<React.ComponentProps<"input">, "onBlur"> & {
  value: string;
  onBlur: (value: string) => void;
}) => {
  const [valueState, setValueState] = useState<string>(value ?? "");
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  useEffect(() => {
    setValueState(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueState(e.target.value);
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur(e.target.value);
  };

  const handleHidePassword = (value?: boolean) =>
    setHidePassword((prev) => (value === undefined ? !prev : value));

  return (
    <div className="border-2 border-accent rounded-lg text-sm w-full max-w-80 flex items-center gap-1">
      <input
        value={valueState}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type === "password" ? (hidePassword ? "password" : "text") : type}
        className={cn("px-1.5 py-1 outline-none w-full", className)}
        {...props}
      />
      {type === "password" && (
        <button
          onClick={() => handleHidePassword()}
          className={cn(
            "select-none shrink-0 size-6 grid place-items-center items-center gap-1 [&>svg]:size-4 text-xs rounded-full cursor-pointer aspect-square",
            "hover:bg-accent duration-100 transition-all"
          )}
        >
          {hidePassword ? <ShowIcon /> : <HideIcon />}
        </button>
      )}
    </div>
  );
};

export default AuthContentInput;
