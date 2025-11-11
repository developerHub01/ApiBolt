import ThemeEditorPanel from "@/components/app/themes/editor/panel/ThemeEditorPanel";
import ThemeEditorPreview from "@/components/app/themes/editor/preview/ThemeEditorPreview";
// import { ScrollArea } from "@/components/ui/scroll-area";

const ThemeEditor = () => {
  return (
    <section className="w-full h-full p-5 flex-1 flex items-center gap-5">
      {/* <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full">
        <div className="w-full h-full flex flex-col gap-2.5">
          {Array.from({ length: 20 }, (_, index) => (
            <p key={index}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse a
              facilis adipisci animi fuga consequuntur at, vitae architecto
              ducimus. Mollitia iure, minus voluptates minima reiciendis
              veritatis cum facere suscipit quod!
            </p>
          ))}
        </div>
      </ScrollArea> */}
      <ThemeEditorPanel />
      <ThemeEditorPreview />
    </section>
  );
};

export default ThemeEditor;
