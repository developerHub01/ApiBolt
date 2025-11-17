import ThemeDescription from "@/components/app/themes/marketplace/[id]/theme-details/ThemeDescription";
import ThemeMetaDetails from "@/components/app/themes/marketplace/[id]/theme-details/ThemeMetaDetails";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";

const ThemeMarketPlacePage = () => {
  const { id } = useParams<{ id?: string }>();
  console.log({ id });

  return (
    <section className="w-full h-full max-w-3xl flex flex-col p-5 mx-auto gap-4">
      <ThemeMetaDetails />
      <Separator
        className="bg-border data-[orientation=horizontal]:h-1"
        orientation="horizontal"
      />
      <ThemeDescription />
    </section>
  );
};

export default ThemeMarketPlacePage;
