import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const PageHeader = ({ className = "", children }: Props) => {
  return (
    <h1 className={cn("text-2xl font-bold pb-3.5", className)}>{children}</h1>
  );
};

export default PageHeader;
