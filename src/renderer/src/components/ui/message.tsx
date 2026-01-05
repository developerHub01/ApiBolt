import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type MessageStatus = "success" | "info" | "warning" | "error";

interface MessageProps {
  status: MessageStatus;
  title: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}

const statusConfig = {
  success: {
    icon: CheckCircle2,
    bgClass: "bg-green-50 dark:bg-green-950",
    borderClass: "border-green-200 dark:border-green-800",
    titleClass: "text-green-900 dark:text-green-50",
    descClass: "text-green-700 dark:text-green-200",
  },
  info: {
    icon: Info,
    bgClass: "bg-blue-50 dark:bg-blue-950",
    borderClass: "border-blue-200 dark:border-blue-800",
    titleClass: "text-blue-900 dark:text-blue-50",
    descClass: "text-blue-700 dark:text-blue-200",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-amber-50 dark:bg-amber-950",
    borderClass: "border-amber-200 dark:border-amber-800",
    titleClass: "text-amber-900 dark:text-amber-50",
    descClass: "text-amber-700 dark:text-amber-200",
  },
  error: {
    icon: XCircle,
    bgClass: "bg-red-50 dark:bg-red-950",
    borderClass: "border-red-200 dark:border-red-800",
    titleClass: "text-red-900 dark:text-red-50",
    descClass: "text-red-700 dark:text-red-200",
  },
};

export function Message({
  status,
  title,
  description,
  onClose,
  className,
}: MessageProps) {
  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <Alert
      className={cn(
        config.bgClass,
        config.borderClass,
        "[&>svg]:text-current",
        className,
      )}
    >
      <IconComponent className={cn(config.titleClass, "h-4 w-4")} />
      <AlertTitle className={config.titleClass}>{title}</AlertTitle>
      {description && (
        <AlertDescription className={config.descClass}>
          {description}
        </AlertDescription>
      )}
      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            "absolute right-3 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
            config.titleClass,
          )}
          aria-label="Close"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </Alert>
  );
}
