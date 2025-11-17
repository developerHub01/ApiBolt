import PageHeader from "@/components/ui/page-header";

const ThemeEditorTop = () => {
  return (
    <section className="flex flex-col">
      <PageHeader>Theme Builder</PageHeader>
      <p className="text-muted-foreground text-sm leading-relaxed">
        This is just for configuring theme palette and you can copy the pallete
        and upload in theme market. Once app quite it wont save. Session only.
      </p>
    </section>
  );
};

export default ThemeEditorTop;
