import {
  AnimatedDialog,
  AnimatedDialogBottom,
  AnimatedDialogContentWrapper,
  AnimatedDialogTop,
} from "@/components/ui/animated-dialog";
import ThemeListContent from "@/components/app/themes/editor/editor-panel/theme-palette-top/theme-list/ThemeListContent";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeList = ({ isOpen, onClose }: Props) => {
  return (
    <AnimatedDialog isOpen={isOpen} onClose={onClose}>
      <AnimatedDialogContentWrapper className="max-w-2xl">
        <AnimatedDialogTop>
          <div className="p-2 text-lg font-medium capitalize">
            Installed themes
          </div>
        </AnimatedDialogTop>
        <ThemeListContent onClose={onClose} />
        <AnimatedDialogBottom>
          <p className="line-clamp-1 text-center max-w-lg text-sm">
            Click on the theme to inherit palette to editor palette.
          </p>
        </AnimatedDialogBottom>
      </AnimatedDialogContentWrapper>
    </AnimatedDialog>
  );
};

export default ThemeList;
