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
  showBorder?: boolean;
}

const SettingItem = memo(
  ({
    children,
    id,
    title,
    className = "",
    triggerClassName = "",
    contentClassName = "",
    showBorder = true,
  }: Props) => {
    return (
      <AccordionItem value={id} className={className}>
        <AccordionTrigger
          className={cn(
            "hover:no-underline cursor-pointer text-base",
            triggerClassName,
          )}
        >
          {title}
        </AccordionTrigger>
        <AccordionContent
          className={cn(
            "flex flex-col gap-4 text-balance px-3 py-3 rounded-lg mb-4",
            {
              "border-2 border-dashed": showBorder,
            },
            contentClassName,
          )}
        >
          {children}
        </AccordionContent>
      </AccordionItem>
    );
  },
);

export default SettingItem;
