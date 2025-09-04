import FolderDescription from "@/components/app/collections/folder/description/FolderDescription";
import FolderTitle from "@/components/app/collections/folder/FolderTitle";
import { useAppSelector } from "@/context/redux/hooks";
import { selectIsFolderLoading } from "@/context/redux/request-response/request-response-selector";

const FolderPage = () => {
  const isLoading = useAppSelector(selectIsFolderLoading);

  if (isLoading) return <p>loading....</p>;

  return (
    <section className="w-full h-full p-3">
      <div className="flex flex-col gap-4 w-full h-full max-w-5xl mx-auto">
        <FolderTitle />
        <FolderDescription />
      </div>
    </section>
  );
};

export default FolderPage;
