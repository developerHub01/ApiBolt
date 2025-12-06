import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  status: number;
  statusText: string;
  className?: string;
  variant?: "primary" | "secondary";
}

const HttpStatus = ({
  status,
  statusText,
  variant = "primary",
  className = "",
}: Props) => {
  return (
    <Badge
      className={cn(
        "select-none text-foreground bg-secondary",
        {
          "bg-green-500":
            status < 300 && status >= 200 && variant === "primary",
          "bg-amber-500":
            status < 500 && status >= 400 && variant === "primary",
          "bg-destructive": status >= 500 && variant === "primary",
          "bg-green-500/50 border border-green-500":
            status < 300 && status >= 200 && variant === "secondary",
          "bg-amber-500/50 border border-amber-500":
            status < 500 && status >= 400 && variant === "secondary",
          "bg-destructive/50 border border-destructive":
            status >= 500 && variant === "secondary",
        },
        className,
      )}
    >
      {Boolean(status) && <span>{status}</span>}
      {Boolean(statusText) && <span>{statusText}</span>}
    </Badge>
  );
};

export default HttpStatus;
