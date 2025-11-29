import { Skeleton } from "@/components/ui/skeleton";

const EnvironmentFallback = () => {
  return (
    <section className="w-full flex flex-col items-center p-4">
      <div className="flex flex-col w-full max-w-5xl flex-1 p-5 gap-3">
        <div className="w-full flex justify-between mb-3.5">
          <Skeleton className="w-72 h-10" />
          <Skeleton className="w-12 h-10" />
        </div>
        <Skeleton className="w-64 h-10" />
        <Skeleton className="w-full flex-1" />
        <Skeleton className="w-60 h-8.5 mx-auto" />
      </div>
    </section>
  );
};

export default EnvironmentFallback;
