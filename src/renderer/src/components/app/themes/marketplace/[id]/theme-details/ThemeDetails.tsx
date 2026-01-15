import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectIsThemeMarketplaceSelectedThemeId } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { handleChangeSelectedThemeId } from "@/context/redux/theme-marketplace/theme-marketplace-slice";
import {
  AnimatedDialog,
  AnimatedDialogBottom,
  AnimatedDialogContent,
  AnimatedDialogContentScroll,
  AnimatedDialogContentWrapper,
  AnimatedDialogTop,
} from "@renderer/components/ui/animated-dialog";
import { AspectRatio } from "@renderer/components/ui/aspect-ratio";
import { Badge } from "@renderer/components/ui/badge";
import { Button } from "@renderer/components/ui/button";
import ImageWithFallback from "@renderer/components/ui/image-with-fallback";
import ExternalLink from "@renderer/components/ux/ExternalLink";
import {
  User as AuthorIcon,
  Download as InstallIcon,
  CloudDownload as TotalInstallIcon,
  Palette as ThemeCategoryIcon,
} from "lucide-react";

const ThemeDetails = () => {
  const dispatch = useAppDispatch();
  const selectedThemeId = useAppSelector(
    selectIsThemeMarketplaceSelectedThemeId,
  );

  const handleClose = () => dispatch(handleChangeSelectedThemeId());

  return (
    <AnimatedDialog isOpen={Boolean(selectedThemeId)} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="max-w-3xl">
        <AnimatedDialogTop>
          <div className="p-2 text-lg font-medium overflow-hidden">
            <p className="line-clamp-1 text-ellipsis">Theme Title</p>
          </div>
        </AnimatedDialogTop>
        <AnimatedDialogContent>
          <AnimatedDialogContentScroll>
            <section className="w-full flex flex-col gap-4 p-2">
              <ThemePreview />
              <ThemeMeta />
              <p className="text-sm leading-relaxed text-accent-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab,
                vero? Ab aspernatur ducimus, nesciunt officiis quos earum
                numquam eius animi harum provident fugiat vero tenetur neque
                nemo deleniti magni voluptate!
              </p>
            </section>
          </AnimatedDialogContentScroll>
        </AnimatedDialogContent>
        <AnimatedDialogBottom>
          <p className="line-clamp-1 text-center max-w-lg text-sm">
            Click install button to install theme in local
          </p>
        </AnimatedDialogBottom>
      </AnimatedDialogContentWrapper>
    </AnimatedDialog>
  );
};

const ThemePreview = () => {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="rounded-lg overflow-hidden shrink-0 border-3"
    >
      <ImageWithFallback
        fallback="./theme-thumbnail/theme_thumbnail_placeholder.png"
        src="./theme-thumbnail/black_ocean.png"
        alt=""
        className="size-full object-cover"
      />
    </AspectRatio>
  );
};

const ThemeMeta = () => {
  return (
    <>
      <div className="w-full flex items-center gap-1">
        <div className="flex items-center gap-2">
          <AuthorIcon size={18} />
          <ExternalLink to={"https://jsonplaceholder.typicode.com/"}>
            <Button variant={"link"} className="px-0 underline">
              Username
            </Button>
          </ExternalLink>
        </div>
        <Badge variant={"secondary"} className="capitalize ml-auto">
          <ThemeCategoryIcon /> Dark
        </Badge>
        <Badge variant={"secondary"} className="capitalize">
          <TotalInstallIcon /> 10K
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <Button size={"sm"}>
          <InstallIcon /> Install
        </Button>
        <p className="text-sm">version: 1</p>
      </div>
    </>
  );
};

export default ThemeDetails;
