import { Skeleton } from "@/components/ui/skeleton";

const ThemeEditorFallback = () => {
  return (
    <section className="w-full h-full overflow-hidden flex flex-col p-4 justify-center items-center relative">
      <section className="w-full h-full max-w-6xl p-5 flex-1 flex flex-col gap-5">
        <Skeleton className="w-full h-23" />
        <Skeleton className="w-full flex-1" />
        <div className="w-full h-9 flex">
          <Skeleton className="w-52 mr-auto" />
          {Array.from({ length: 2 }, (_, index) => (
            <Skeleton key={index} className="w-32 h-9" />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ThemeEditorFallback;
