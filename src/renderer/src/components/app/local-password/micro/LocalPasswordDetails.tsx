import { cn } from "@/lib/utils";
import { HTMLAttributes, useMemo } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string | Array<string>;
}

const LocalPasswordDetails = ({
  title,
  description,
  className,
  ...props
}: Props) => {
  const descriptionContent = useMemo<Array<string>>(
    () =>
      Array.isArray(description)
        ? description
        : description
          ? [description]
          : [],
    [description],
  );

  if (!title && !descriptionContent.length) return null;

  return (
    <div className={cn("pb-4", className)} {...props}>
      {Boolean(title) && <h3 className="text-base font-bold pb-4">{title}</h3>}
      {descriptionContent.map((content, index) => (
        <p
          key={index}
          className="text-sm text-muted-foreground leading-relaxed pb-2"
        >
          {content}
        </p>
      ))}
    </div>
  );
};

export default LocalPasswordDetails;
