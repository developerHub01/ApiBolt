import FolderDescription from "@/components/app/collections/folder/description/FolderDescription";
import FolderTitle from "@/components/app/collections/folder/FolderTitle";

const FolderPage = () => {
  return (
    <section className="w-full h-full p-3">
      <div className="flex flex-col gap-4 w-full h-full max-w-3xl mx-auto">
        <FolderTitle />
        <FolderDescription />
      </div>
    </section>
  );
};

export default FolderPage;
