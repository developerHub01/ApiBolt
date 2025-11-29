import FolderDescription from "@/components/app/collections/folder/description/FolderDescription";
import FolderTitle from "@/components/app/collections/folder/FolderTitle";
import FolderSkeletonWrapper from "@/components/app/collections/folder/skeleton/FolderSkeletonWrapper";

const FolderRoot = () => {
  return (
    <FolderSkeletonWrapper>
      <div className="flex flex-col gap-4 w-full h-full max-w-5xl mx-auto">
        <FolderTitle />
        <FolderDescription />
      </div>
    </FolderSkeletonWrapper>
  );
};

export default FolderRoot;
