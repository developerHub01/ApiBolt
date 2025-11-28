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
import { AnimatePresence, motion } from "motion/react";
import { Loader as LoaderIcon } from "lucide-react";
import { loadThemePalette } from "@/context/redux/theme/thunks/theme";
import ThemeListSkeleton from "@/components/app/themes/editor/editor-panel/theme-palette-top/theme-list/ThemeListSkeleton";
import ThemeCard from "@/components/app/themes/editor/editor-panel/theme-palette-top/theme-list/ThemeCard";
import useCustomToast from "@/hooks/ui/use-custom-toast";

interface Props {
  onClose: () => void;
}

const ThemeListContent = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
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

    toast({
      type: "success",
      title: "Inherited",
      description: "Selected theme palette replaced in theme edior palette.",
    });
    onClose();
  };

  return (
    <AnimatedDialogContent className="gap-4 py-2">
      <p className="px-5">Select theme to inherit</p>
      <AnimatedDialogContentScroll className="px-5 py-0">
        <AnimatePresence>
          {isLoaded ? (
            <motion.section
              initial={{
                opacity: 0,
                filter: "blur(5px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                filter: "blur(5px)",
              }}
              className="grid grid-cols-2 gap-5"
            >
              {metaList.map((props) => {
                const { id } = props;
                const isActive = id === selectedId;

                return (
                  <ThemeCard
                    {...props}
                    isActive={isActive}
                    onClick={handleClick}
                  />
                );
              })}
            </motion.section>
          ) : (
            <ThemeListSkeleton />
          )}
        </AnimatePresence>
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
