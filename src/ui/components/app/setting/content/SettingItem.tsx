import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
}

const SettingItem = ({ children, id, title }: Props) => {
  return (
    <AccordionItem value={id}>
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
