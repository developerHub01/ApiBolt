import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const kbdBaseClasses = cn(
  "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-md px-1 font-sans text-xs font-medium select-none",
  "[&_svg:not([class*='size-'])]:size-3",
  "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10"
);

const kbdVariants = cva(kbdBaseClasses, {
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground shadow-xs hover:bg-muted/90",
      primary:
        "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive:
        "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline:
        "border bg-background text-muted-foreground shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary:
        "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      warningSecondary:
        "bg-amber-500/30 border border-amber-500/50 text-secondary-foreground shadow-xs hover:bg-amber-500/50 hover:border-amber-500/80",
      destructiveSecondary:
        "bg-destructive/30 border border-destructive/50 text-secondary-foreground shadow-xs hover:bg-destructive/50 hover:border-destructive/80",
      ghost:
        "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      transparent:
        "hover:bg-transparent hover:text-accent-foreground dark:hover:bg-transparent",
      link: "text-primary underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Kbd({
  className,
  variant,
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ variant, className }))}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
