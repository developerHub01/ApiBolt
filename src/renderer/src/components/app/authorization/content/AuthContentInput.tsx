import {
  memo,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import { cn } from "@/lib/utils";
import { Eye as ShowIcon, EyeOff as HideIcon } from "lucide-react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";

const AuthContentInput = memo(
  ({
    value,
    type = "text",
    className = "",
    disabled = false,
    onBlur,
    ...props
  }: Omit<React.ComponentProps<"input">, "onBlur"> & {
    value: string;
    disabled?: boolean;
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
      setHidePassword(prev => (value === undefined ? !prev : value));

    return (
      <ButtonLikeDiv
        variant={"secondary"}
        className="border-2 border-accent rounded-lg text-sm w-full flex items-center gap-1 flex-1"
        tabIndex={-1}
        disabled={disabled}
      >
        <input
          value={valueState}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          type={
            type === "password" ? (hidePassword ? "password" : "text") : type
          }
          className={cn(
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 outline-none w-full",
            className,
          )}
          {...props}
        />
        {type === "password" && (
          <button
            onClick={() => handleHidePassword()}
            className={cn(
              "select-none shrink-0 size-6 grid place-items-center items-center gap-1 [&>svg]:size-4 text-xs rounded-full cursor-pointer aspect-square disabled:pointer-events-none disabled:opacity-50",
              "hover:bg-accent duration-100 transition-all",
            )}
            disabled={disabled}
          >
            {hidePassword ? <ShowIcon /> : <HideIcon />}
          </button>
        )}
      </ButtonLikeDiv>
    );
  },
);

export default AuthContentInput;
