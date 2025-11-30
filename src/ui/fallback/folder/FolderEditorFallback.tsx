import { Skeleton } from "@/components/ui/skeleton";

const FolderEditorFallback = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      <Skeleton className="w-full h-9" />
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={index} className="w-full h-6" />
      ))}
      <Skeleton className="w-4/5 h-6 mb-3" />
      <Skeleton className="w-full h-96" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-60" />
    </div>
  );
};

export default FolderEditorFallback;
