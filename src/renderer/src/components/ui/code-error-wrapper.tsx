import React, { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import ErrorAlert1 from "@/components/ui/error-alert1";

interface Props extends ComponentProps<"div"> {
  isError?: boolean;
  children: React.ReactNode;
  errorLabel?: string;
}

const CodeErrorWrapper = ({
  isError = false,
  children,
  errorLabel = "Code have some errors",
  className = "",
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        "relative border flex-1 min-h-0 h-full overflow-hidden",
        {
          "border-destructive/50 ring-1 ring-destructive/50": isError,
        },
        className,
      )}
      {...props}
    >
      {children}
      <ErrorAlert1 isError={isError} message={errorLabel} />
    </div>
  );
};

export default CodeErrorWrapper;
