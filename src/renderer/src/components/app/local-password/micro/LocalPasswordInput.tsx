import { InputHTMLAttributes, Ref } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

const LocalPasswordInput = ({ className, ref, ...props }: Props) => {
  return (
    <Input
      className={cn("border-none bg-secondary focus-visible:ring-2", className)}
      type="password"
      {...props}
      ref={ref}
    />
  );
};

export default LocalPasswordInput;
