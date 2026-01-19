import { useMemo } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectThemeMarketplaceThemeDetailsError } from "@/context/redux/status/selectors/theme-marketplace";
import { OctagonX as ErrorIcon } from "lucide-react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";

const ThemeDetailsError = () => {
  const detailsError = useAppSelector(selectThemeMarketplaceThemeDetailsError);
  const isNotFoundError = useMemo(
    () => detailsError === "NOT_FOUND",
    [detailsError],
  );

  if (!detailsError) return null;

  return (
    <section className="w-full h-full flex flex-col gap-2 p-2 border-2 border-dashed rounded-md bg-background">
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
    </section>
  );
};

export default ThemeDetailsError;
