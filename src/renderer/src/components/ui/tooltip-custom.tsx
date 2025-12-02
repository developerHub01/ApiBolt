import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tooltipBaseClass = cn(
  "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
  "select-none p-2 border"
);

const tooltipVariants = cva(tooltipBaseClass, {
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive:
        "bg-destructive text-white shadow-xs dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline:
        "border bg-background shadow-xs dark:bg-input/30 dark:border-input",
      secondary: "bg-secondary text-secondary-foreground shadow-xs",
      background: "bg-background text-background-foreground shadow-xs",
      accent: "bg-accent text-accent-foreground shadow-xs",
      warningSecondary:
        "bg-amber-500/30 border border-amber-500/50 text-secondary-foreground shadow-xs",
      destructiveSecondary:
        "bg-destructive/30 border border-destructive/50 text-secondary-foreground shadow-xs"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

const tooltipArrowBaseClass = cn(
  "bg-background fill-background text-accent-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
);

const tooltipArrowVariants = cva(tooltipArrowBaseClass, {
  variants: {
    variant: {
      default: "bg-primary fill-primary text-primary-foreground",
      destructive: "bg-destructive fill-destructive text-whit",
      outline: "bg-background fill-background",
      secondary:
        "bg-secondary fill-secondary text-secondary-foreground shadow-xs",
      background:
        "bg-background fill-background text-background-foreground shadow-xs",
      accent: "bg-accent fill-accent text-accent-foreground shadow-xs",
      warningSecondary: "bg-amber-500/30 fill-bg-amber-500/30",
      destructiveSecondary: "bg-destructive/30 fill-destructive/30"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  variant,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> &
  VariantProps<typeof tooltipVariants>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(tooltipVariants({ variant, className }))}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          className={cn(tooltipArrowVariants({ variant }))}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
