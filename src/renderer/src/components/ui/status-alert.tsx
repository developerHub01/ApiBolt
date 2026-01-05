"use client";

import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

const statusAlertVariants = cva(
  "relative rounded-lg border flex items-start gap-3 transition-all duration-200",
  {
    variants: {
      size: {
        xs: "px-2.5 py-2 text-xs",
        sm: "px-3 py-2.5 text-sm",
        md: "px-4 py-3 text-sm",
        lg: "px-5 py-4 text-base",
      },
      variant: {
        solid: {},
        soft: {},
      },
      status: {
        success: {
          solid:
            "border-green-200 bg-green-50 text-green-900 dark:border-green-900/30 dark:bg-green-950/20 dark:text-green-200",
          soft: "border-green-500 bg-green-500/15 text-green-700 dark:border-green-400 dark:bg-green-400/15 dark:text-green-300",
        },
        info: {
          solid:
            "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/30 dark:bg-blue-950/20 dark:text-blue-200",
          soft: "border-blue-500 bg-blue-500/15 text-blue-700 dark:border-blue-400 dark:bg-blue-400/15 dark:text-blue-300",
        },
        warning: {
          solid:
            "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/30 dark:bg-amber-950/20 dark:text-amber-200",
          soft: "border-amber-500 bg-amber-500/15 text-amber-700 dark:border-amber-400 dark:bg-amber-400/15 dark:text-amber-300",
        },
        error: {
          solid:
            "border-red-200 bg-red-50 text-red-900 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-200",
          soft: "border-red-500 bg-red-500/15 text-red-700 dark:border-red-400 dark:bg-red-400/15 dark:text-red-300",
        },
      },
    },
    compoundVariants: [
      // Solid variants
      {
        variant: "solid",
        status: "success",
        className:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-900/30 dark:bg-green-950/20 dark:text-green-200",
      },
      {
        variant: "solid",
        status: "info",
        className:
          "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/30 dark:bg-blue-950/20 dark:text-blue-200",
      },
      {
        variant: "solid",
        status: "warning",
        className:
          "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/30 dark:bg-amber-950/20 dark:text-amber-200",
      },
      {
        variant: "solid",
        status: "error",
        className:
          "border-red-200 bg-red-50 text-red-900 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-200",
      },
      // Soft variants
      {
        variant: "soft",
        status: "success",
        className:
          "border-green-500 bg-green-500/15 text-green-700 dark:border-green-400 dark:bg-green-400/15 dark:text-green-300",
      },
      {
        variant: "soft",
        status: "info",
        className:
          "border-blue-500 bg-blue-500/15 text-blue-700 dark:border-blue-400 dark:bg-blue-400/15 dark:text-blue-300",
      },
      {
        variant: "soft",
        status: "warning",
        className:
          "border-amber-500 bg-amber-500/15 text-amber-700 dark:border-amber-400 dark:bg-amber-400/15 dark:text-amber-300",
      },
      {
        variant: "soft",
        status: "error",
        className:
          "border-red-500 bg-red-500/15 text-red-700 dark:border-red-400 dark:bg-red-400/15 dark:text-red-300",
      },
    ],
    defaultVariants: {
      size: "md",
      status: "info",
      variant: "solid",
    },
  },
);

const iconVariants = cva("flex-shrink-0", {
  variants: {
    size: {
      xs: "size-4",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
});

interface StatusAlertProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof statusAlertVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
  showIcon?: boolean;
}

function StatusAlert({
  className,
  size,
  status,
  variant,
  title,
  description,
  onClose,
  showIcon = true,
  children,
  ...props
}: StatusAlertProps) {
  const icons = {
    success: <CheckCircle2 className={cn(iconVariants({ size }))} />,
    info: <Info className={cn(iconVariants({ size }))} />,
    warning: <AlertTriangle className={cn(iconVariants({ size }))} />,
    error: <AlertCircle className={cn(iconVariants({ size }))} />,
  };

  return (
    <div
      className={cn(statusAlertVariants({ size, status, variant }), className)}
      role="alert"
      {...props}
    >
      {showIcon && icons[status || "info"]}
      <div className="flex-1 min-w-0">
        {title && <h3 className="font-semibold leading-tight">{title}</h3>}
        {description && (
          <p className={cn("leading-relaxed", title && "mt-1")}>
            {description}
          </p>
        )}
        {children && (
          <div className={cn("mt-2", (title || description) && "mt-2")}>
            {children}
          </div>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded hover:opacity-75 transition-opacity p-1 -m-1"
          aria-label="Close alert"
        >
          <X className={cn(iconVariants({ size }))} />
        </button>
      )}
    </div>
  );
}

function StatusAlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("font-semibold leading-tight", className)} {...props} />
  );
}

function StatusAlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm leading-relaxed opacity-90", className)}
      {...props}
    />
  );
}

export { StatusAlert, StatusAlertTitle, StatusAlertDescription };
