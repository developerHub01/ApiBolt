import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const AuthorizationFallback = () => {
  return (
    <section className="p-4 w-full flex justify-center items-center">
      <div className="flex flex-col gap-4 w-full h-full max-w-3xl mx-auto p-5">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="w-72 h-12 mb-3.5" />
          <div className="flex justify-between">
            <Skeleton className="w-19 h-6" />
            <ButtonLikeDiv variant={"transparent"}>
              <Skeleton className="w-full h-full" />
            </ButtonLikeDiv>
          </div>
        </div>
        <Separator className="w-full" />
        <Skeleton className="flex-1 w-full" />
      </div>
    </section>
  );
};

export default AuthorizationFallback;
