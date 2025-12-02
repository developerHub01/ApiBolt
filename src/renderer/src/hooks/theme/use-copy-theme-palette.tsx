import { useAppSelector } from "@/context/redux/hooks";
import { selectThemePalette } from "@/context/redux/theme/selectors/theme";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const useCopyThemePalette = () => {
  const toast = useCustomToast();
  const palette = useAppSelector(selectThemePalette);

  return async () => {
    await navigator.clipboard.writeText(JSON.stringify(palette, null, 2));
    toast({
      type: "success",
      title: "Copied success",
      description: "Palette copied to clipboard",
    });
  };
};

export default useCopyThemePalette;
