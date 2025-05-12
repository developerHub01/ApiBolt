import { cn } from "@/lib/utils";

const AuthContentInput = ({
  className = "",
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      className={cn(
        "px-1.5 py-1 border-2 border-accent outline-none rounded-lg text-sm w-full max-w-80",
        className
      )}
      {...props}
    />
  );
};

export default AuthContentInput;
