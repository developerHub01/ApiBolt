import { ChangeEvent, ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { ButtonGroup } from "@/components/ui/button-group";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";

interface Props extends Omit<ComponentProps<"input">, "onChange"> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const SettingRequestInput = ({
  value,
  label,
  id,
  className,
  onChange,
  ...props
}: Props) => {
  return (
    <ButtonGroup>
      <ButtonLikeDiv
        variant={"outline"}
        size={"sm"}
        className={cn("max-w-20", className)}
      >
        <input
          type="text"
          id={id}
          {...props}
          value={value}
          onChange={onChange}
          className={cn("w-full font-normal")}
        />
      </ButtonLikeDiv>
      {Boolean(label) && (
        <ButtonLikeDiv
          variant={"secondary"}
          size={"sm"}
          tabIndex={-1}
          className="font-normal"
        >
          <label htmlFor={id}>{label}</label>
        </ButtonLikeDiv>
      )}
    </ButtonGroup>
  );
};

export default SettingRequestInput;
