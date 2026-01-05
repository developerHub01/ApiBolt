import {
  AnimatedDialogBottom,
  AnimatedDialogContent,
  AnimatedDialogContentScroll,
  AnimatedDialogTop,
} from "@/components/ui/animated-dialog";
import LocalPassowrdContent from "@renderer/components/app/local-password/LocalPassowrdContent";
import LocalPasswordSkeleton from "@renderer/components/app/local-password/micro/LocalPasswordSkeleton";
import LoadLocalPassword from "@renderer/components/app/local-password/micro/LoadLocalPassword";
import LocalPasswordDisableAlert from "@renderer/components/app/local-password/micro/LocalPasswordDisableAlert";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";
import { useAppSelector } from "@/context/redux/hooks";
import { selectLocalPasswordIsLoading } from "@/context/redux/status/selectors/local-password";

const LocalPasswordRoot = () => {
  const isLoading = useAppSelector(selectLocalPasswordIsLoading);
  const showSkeleton = useShowSkeleton(isLoading);

  return (
    <>
      <AnimatedDialogTop>
        <div className="p-2 text-lg font-medium">Local Password</div>
      </AnimatedDialogTop>
      <AnimatedDialogContent>
        <AnimatedDialogContentScroll>
          {showSkeleton ? <LocalPasswordSkeleton /> : <LocalPassowrdContent />}
        </AnimatedDialogContentScroll>
      </AnimatedDialogContent>
      <AnimatedDialogBottom>
        <p className="line-clamp-1 text-center max-w-lg text-sm">
          Protect app using local password
        </p>
      </AnimatedDialogBottom>
      <LoadLocalPassword />
      <LocalPasswordDisableAlert />
    </>
  );
};

export default LocalPasswordRoot;
