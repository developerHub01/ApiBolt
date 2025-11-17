import { useAppSelector } from "@/context/redux/hooks";
import { selectThemePalette } from "@/context/redux/theme/selectors/theme";
import { toast } from "sonner";

const useCopyThemePalette = () => {
  const palette = useAppSelector(selectThemePalette);

  return async () => {
    const response = await navigator.clipboard.writeText(
      JSON.stringify(palette, null, 2)
    );
    console.log(response);
    toast.success("Palette copied to clipboard");
  };
};

export default useCopyThemePalette;
