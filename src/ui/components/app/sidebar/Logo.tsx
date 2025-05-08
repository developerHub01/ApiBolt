import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  label?: string;
  className?: string;
}

const Logo = ({ label, className }: LogoProps) => {
  return (
    <Link
      to={"/"}
      className={cn(
        "min-w-9 min-h-9 bg-primary rounded-md text-primary-foreground   aspect-square flex justify-center items-center font-bold select-none",
        className
      )}
    >
      {label ?? "AB"}
    </Link>
  );
};

export default Logo;
