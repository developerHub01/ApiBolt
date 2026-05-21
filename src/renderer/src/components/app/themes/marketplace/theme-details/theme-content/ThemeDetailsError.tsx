import { useMemo } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectThemeMarketplaceThemeDetailsError } from "@/context/redux/status/selectors/theme-marketplace";
import { OctagonX as ErrorIcon } from "lucide-react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ThemeDetailsError = () => {
  const detailsError = useAppSelector(selectThemeMarketplaceThemeDetailsError);
  const isNotFoundError = useMemo(
    () => detailsError === "NOT_FOUND",
    [detailsError],
  );
  if (!detailsError) return null;

  return (
    <AspectRatio
      ratio={16 / 9}
      className="w-full h-full flex p-5 border-2 border-dashed rounded-md bg-background justify-center items-center"
    >
      <div className="flex flex-col gap-2 max-w-md">
        <div className="flex items-center gap-3">
          <ButtonLikeDiv
            variant={"warningSecondary"}
            size={"icon"}
            className="rounded-full [&_svg:not([class*='size-'])]:size-5.5"
          >
            <ErrorIcon size={25} />
          </ButtonLikeDiv>
          <h3 className="text-base font-medium">
            {isNotFoundError ? "Not found" : "Network Issue"}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {isNotFoundError
            ? "Theme not found in server, maybe theme doesn't exist or deleted by the author"
            : "Couldn't load theme details, check your internet connection or maybe some problem in server"}
        </p>
      </div>
    </AspectRatio>
  );
};

export default ThemeDetailsError;
