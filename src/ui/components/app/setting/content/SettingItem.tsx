import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SettingItem = ({ children, id, title, className = "" }: Props) => {
  return (
    <AccordionItem value={id} className={className}>
      <AccordionTrigger className="hover:no-underline cursor-pointer text-lg">
        {title}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};

export default SettingItem;
