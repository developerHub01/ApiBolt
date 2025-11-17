import ThemeEditorPanel from "@/components/app/themes/editor/ThemeEditorPanel";
import ThemeEditorTop from "@/components/app/themes/editor/ThemeEditorTop";
import ThemeEditorBottom from "@/components/app/themes/editor/ThemeEditorBottom";

const ThemeEditor = () => {
  return (
    <section className="w-full h-full p-5 flex-1 flex flex-col gap-5">
      <ThemeEditorTop />
      <ThemeEditorPanel />
      <ThemeEditorBottom />
    </section>
  );
};

export default ThemeEditor;
