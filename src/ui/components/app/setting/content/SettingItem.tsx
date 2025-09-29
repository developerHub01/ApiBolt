import { memo } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

const SettingItem = memo(
  ({
    children,
    id,
    title,
    className = "",
    triggerClassName = "",
    contentClassName = "",
  }: Props) => {
    return (
      <AccordionItem value={id} className={className}>
        <AccordionTrigger
          className={cn(
            "hover:no-underline cursor-pointer text-base",
            triggerClassName
          )}
        >
          {title}
        </AccordionTrigger>
        <AccordionContent
          className={cn("flex flex-col gap-4 text-balance", contentClassName)}
        >
          {children}
        </AccordionContent>
      </AccordionItem>
    );
  }
);

export default SettingItem;
