import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  X as CloseIcon,
  type LucideIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  AlertCircle as ErrorIcon,
  AlertTriangle as WarningIcon,
  Loader as LoaderIcon,
  Layers as SecondaryIcon,
} from "lucide-react";
import { toast } from "sonner";

export type ToastVariant =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "secondary";

interface ToastProps {
  type?: ToastVariant; // defaults to "primary"
  title?: string;
  description?: string;
  Icon?: LucideIcon;
}

const defaultIconMap: Record<ToastVariant, LucideIcon> = {
  primary: InfoIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
  loading: LoaderIcon,
  secondary: SecondaryIcon,
};

const useCustomToast = () =>
  useCallback(
    ({ type = "primary", title, description, Icon }: ToastProps) =>
      toast.custom((t) => {
        const SelectedIcon = Icon ?? defaultIconMap[type];

        const Bar = () => (
          <div
            className={cn("w-2 grow-0", {
              "bg-primary": type === "primary",
              "bg-green-500": type === "success",
              "bg-destructive": type === "error",
              "bg-amber-500": type === "warning",
              "bg-blue-500": type === "info",
              "bg-sky-500": type === "loading",
              "bg-gray-500": type === "secondary",
            })}
          />
        );

        const IconCircle = () => (
          <div
            className={cn(
              "size-8 rounded-full shrink-0 text-white grid place-items-center border",
              {
                "bg-primary/50 border-primary/80 text-primary-foreground":
                  type === "primary",
                "bg-green-500/50 border-green-500/80": type === "success",
                "bg-destructive/50 border-destructive/80": type === "error",
                "bg-amber-500/50 border-amber-500/80": type === "warning",
                "bg-blue-500/50 border-blue-500/80": type === "info",
                "bg-sky-500/50 border-sky-500/80": type === "loading",
                "bg-gray-500/50 border-gray-500/80": type === "secondary",
              }
            )}
          >
            <SelectedIcon
              size={20}
              className={type === "loading" ? "animate-spin" : ""}
            />
          </div>
        );

        return (
          <div className="bg-background text-foreground min-w-90 min-h-16 rounded-lg shadow-lg flex overflow-hidden border border-border/50">
            {/* Side bar */}
            <Bar />
            <div className="flex-1 flex items-center gap-2.5 px-3 py-4">
              {/* Icon circle */}
              <IconCircle />
              {/* Text */}
              <div className="flex-1 flex flex-col gap-0.5">
                {title && (
                  <div className="font-semibold line-clamp-1">{title}</div>
                )}
                {description && (
                  <div className="text-sm opacity-90 line-clamp-2">
                    {description}
                  </div>
                )}
              </div>
              {/* Close button */}
              <Button
                type="button"
                variant="transparent"
                size="iconXs"
                onClick={() => toast.dismiss(t)}
                className="rounded-full"
              >
                <CloseIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      }),
    []
  );

export default useCustomToast;
