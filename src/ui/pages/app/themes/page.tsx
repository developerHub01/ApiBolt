import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Link } from "react-router-dom";

const ThemesPage = () => {
  return (
    <section className="w-full h-full max-w-7xl flex justify-center items-center">
      <div className="w-4/5 h-4/5 max-w-2xl max-h-[500px] shadow-2xl">
        <div className="w-full h-full grid grid-cols-2 rounded-xl divide-x divide-border/50 overflow-hidden">
          <ActionButton variant={"secondary"} link="marketplace">
            Theme marketplace
          </ActionButton>
          <ActionButton variant={"accent"} link="editor">
            Theme Editor
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

interface ActionButtonProps extends ComponentProps<"button"> {
  children: React.ReactNode;
  variant: "secondary" | "accent";
  link: string;
}

const ActionButton = ({
  children,
  className = "",
  variant,
  link,
}: ActionButtonProps) => {
  return (
    <Link to={`/themes/${link}`}>
      <Button
        className={cn(
          "w-full h-full flex-1 capitalize text-xl rounded-none",
          className
        )}
        variant={variant}
      >
        {children}
      </Button>
    </Link>
  );
};

export default ThemesPage;
