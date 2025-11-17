import PageHeader from "@/components/ui/page-header";

const ThemeEditorTop = () => {
  return (
    <section className="flex flex-col">
      <PageHeader>Theme Builder</PageHeader>
      <p className="text-muted-foreground text-sm leading-relaxed">
        This tool lets you configure the theme palette. You can copy the palette
        and upload it to the theme marketplace. Changes are not saved
        permanently — they will reset when you close the app.
      </p>
    </section>
  );
};

export default ThemeEditorTop;
