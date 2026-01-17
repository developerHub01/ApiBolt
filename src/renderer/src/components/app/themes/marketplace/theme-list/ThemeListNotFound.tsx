import Empty from "@/components/ui/empty";
import notFoundAnimationData from "@/assets/lottie/no-data-found.json";

const ThemeListNotFound = () => {
  return (
    <Empty
      label="Not found"
      description="No themes found for following search params. Try to adjust theme for better result."
      animationData={notFoundAnimationData}
      showFallback
      innerClassName="w-80"
      fallbackClassName="w-65"
      className="h-full"
      key="themes-not-found"
    />
  );
};

export default ThemeListNotFound;
