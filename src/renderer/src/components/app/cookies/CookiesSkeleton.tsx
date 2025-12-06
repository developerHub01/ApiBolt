import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CookiesSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-2">
      <div className="w-full grid grid-cols-3 md:grid-cols-4 gap-2">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton key={index} className="rounded-md h-9" />
        ))}
      </div>
      <div className="w-full flex-1 grid grid-cols-12 gap-2">
        {Array.from({ length: 8 }, (_, index) => (
          <Fragment key={index}>
            <Skeleton className="col-span-4 rounded-md h-14" />
            <Skeleton className="col-span-8 rounded-md h-14" />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default CookiesSkeleton;
