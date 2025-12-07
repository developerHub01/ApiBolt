import { Skeleton } from "@/components/ui/skeleton";

const StatuCodeFallback = () => {
  return (
    <section className="flex flex-col gap-3">
      {Array.from({ length: 5 }, (_, key) => (
        <Skeleton key={key} className="w-full h-15" />
      ))}
    </section>
  );
};

export default StatuCodeFallback;
