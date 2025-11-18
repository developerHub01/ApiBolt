import ThemeEditor from "@/components/app/themes/editor/ThemeEditor";
import ThemeEditorProvider from "@/context/theme/theme-editor/ThemeEditorProvider";

const ThemeEditorPage = () => {
  return (
    <ThemeEditorProvider>
      <section className="w-full h-full max-w-6xl flex justify-center items-center">
        <ThemeEditor />
      </section>
    </ThemeEditorProvider>
  );
};

export default ThemeEditorPage;
