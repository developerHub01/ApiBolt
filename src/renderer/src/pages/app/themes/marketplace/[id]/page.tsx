import ThemeDescription from "@renderer/components/app/themes/marketplace/[id]/theme-details/v1/ThemeDescription";
import ThemeMetaDetails from "@renderer/components/app/themes/marketplace/[id]/theme-details/v1/ThemeMetaDetails";
import { Separator } from "@/components/ui/separator";

const ThemeMarketPlacePage = () => {
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
