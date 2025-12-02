import PageHeader from "@/components/ui/page-header";

const ThemeEditorTop = () => {
  return (
    <section>
      <div className="w-full max-w-3xl flex flex-col">
        <PageHeader>Theme Builder</PageHeader>
        <p className="text-muted-foreground text-sm leading-relaxed">
          This tool lets you configure the theme palette. You can copy the
          palette and upload it to the theme marketplace. Changes are not saved
          permanently — they will reset when you close the app.
        </p>
      </div>
    </section>
  );
};

export default ThemeEditorTop;
