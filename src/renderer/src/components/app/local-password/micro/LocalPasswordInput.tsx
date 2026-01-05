import { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const LocalPasswordInput = ({ className, ...props }: Props) => {
  return (
    <Input
      className={cn("border-none bg-secondary focus-visible:ring-0", className)}
      type="password"
      {...props}
    />
  );
};

export default LocalPasswordInput;
