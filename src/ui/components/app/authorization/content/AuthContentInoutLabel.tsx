import { cn } from "@/lib/utils";

const AuthContentInoutLabel = ({
  children,
  className = "",
  ...props
}: React.ComponentProps<"label">) => {
  return (
    <label
      className={cn("text-sm select-none w-fit md:w-60", className)}
      {...props}
    >
      {children}
    </label>
  );
};

export default AuthContentInoutLabel;
