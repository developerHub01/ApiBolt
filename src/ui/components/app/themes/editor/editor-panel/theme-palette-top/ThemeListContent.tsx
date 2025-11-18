import { useEffect, useState, type MouseEvent } from "react";
import {
  AnimatedDialogContent,
  AnimatedDialogContentScroll,
} from "@/components/ui/animated-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectThemeMetaList,
  selectThemeMetaLoaded,
} from "@/context/redux/theme/selectors/theme";
import useActiveThemeId from "@/hooks/theme/use-active-theme-id";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { DEFAULT_THUMBNAIL_FALLBACK } from "@/constant/theme.constant";
import { ImageOff as ImageBroken, Loader as LoaderIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { loadThemePalette } from "@/context/redux/theme/thunks/theme";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

const ThemeListContent = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const activeTheme = useActiveThemeId();
  const [selectedId, setSelectedId] = useState<string | null>(
    activeTheme ?? null
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const metaList = useAppSelector(selectThemeMetaList);
  const isLoaded = useAppSelector(selectThemeMetaLoaded);

  useEffect(() => {
    setSelectedId(activeTheme);
  }, [activeTheme]);

  if (!isLoaded) return <h1>loading....</h1>;

  const handleClick = (e: MouseEvent<HTMLDivElement>) =>
    setSelectedId(e.currentTarget.id);

  const handleInherit = async () => {
    if (!selectedId) return;
    setIsProcessing(true);
    const response = await dispatch(
      loadThemePalette({
        themeId: selectedId,
      })
    ).unwrap();
    setIsProcessing(false);
    if (!response) return;

    toast.success("Selected theme palette replaced in theme edior palette.");
    onClose();
  };

  return (
    <AnimatedDialogContent className="gap-4 py-2">
      <p className="px-5">Select theme to inherit</p>
      <AnimatedDialogContentScroll className="px-5 py-0">
        <section className="grid grid-cols-2 gap-5">
          {metaList.map(({ id, name, thumbnail, type }) => {
            const isActive = id === selectedId;

            return (
              <motion.div
                whileHover={{
                  padding: 15,
                }}
                animate={{
                  padding: isActive ? 15 : 0,
                  scale: isActive ? 0.98 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className={cn(
                  "w-full flex flex-col gap-2 rounded-xl bg-transparent cursor-pointer",
                  "hover:bg-secondary/40 transition-all duration-100",
                  {
                    "bg-secondary/80 shadow-2xl ring ring-primary ring-offset-1":
                      isActive,
                  }
                )}
                id={id}
                onClick={handleClick}
              >
                <div className="w-full aspect-square bg-accent rounded-xl overflow-hidden border">
                  {thumbnail ? (
                    <ImageWithFallback
                      src={thumbnail}
                      alt={`${name}_thumbnail`}
                      fallback={DEFAULT_THUMBNAIL_FALLBACK}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      <ImageBroken size={40} />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-1.5 capitalize">
                  <h4 className="text-base font-medium line-clamp-1">{name}</h4>
                  <Badge
                    variant={"outline"}
                    className="text-muted-foreground text-sm"
                  >
                    {type}
                  </Badge>
                </div>
              </motion.div>
            );
          })}
        </section>
      </AnimatedDialogContentScroll>
      <div className="flex justify-end items-center gap-2 px-5">
        {Boolean(selectedId) && (
          <Button
            disabled={isProcessing}
            variant={"secondary"}
            size={"sm"}
            onClick={() => setSelectedId(null)}
          >
            Cancel
          </Button>
        )}
        <Button
          variant={"default"}
          size={"sm"}
          disabled={!selectedId || isProcessing}
          onClick={handleInherit}
        >
          {isProcessing && <LoaderIcon className="animate-spin" size={16} />}
          Inherit
        </Button>
      </div>
    </AnimatedDialogContent>
  );
};

export default ThemeListContent;
