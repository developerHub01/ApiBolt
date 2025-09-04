import { cn } from "@/lib/utils";

const AuthContentInoutLabel = ({
  children,
  className = "",
  ...props
}: React.ComponentProps<"label">) => {
  return (
    <label className={cn("text-sm select-none", className)} {...props}>
      {children}
    </label>
  );
};

export default AuthContentInoutLabel;
