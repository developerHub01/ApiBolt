import {
  useEffect,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type FocusEvent,
} from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SketchPicker, type ColorResult } from "react-color";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeThemePalette } from "@/context/redux/theme/theme-slice";
import type { ThemeColorId } from "@shared/types/theme.types";
import { getRgbToHex, isValidColor } from "@/utils/color.utils";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  id: ThemeColorId;
  color: string;
}

const ThemeEditorColor = ({ id, color, className = "", ...props }: Props) => {
  const dispatch = useAppDispatch();
  const [colorState, setColorState] = useState<string>(color);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setColorState(color);
    setIsError(!isValidColor(color));
  }, [color]);

  const handlePickerChange = (color: ColorResult) => {
    const value = getRgbToHex(color.rgb);
    setColorState(value);
  };

  const handlePickerComplete = (color: ColorResult) => {
    const value = getRgbToHex(color.rgb);
    setColorState(value);

    dispatch(
      handleChangeThemePalette({
        key: id,
        value,
      })
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setIsError(!isValidColor(value));
    setColorState(value);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setColorState(value);

    dispatch(
      handleChangeThemePalette({
        key: id,
        value,
      })
    );
  };

  return (
    <div
      key={id}
      className={cn("w-full flex items-center gap-2 p-3", className)}
      {...props}
    >
      <p className="flex-1 capitalize text-sm">{id.replaceAll("-", " ")}</p>
      <div
        className={cn(
          "flex gap-2 p-1 rounded-md bg-input w-30 grow-0 pr-2.5",
          {
            "border-destructive/50 ring-1 ring-destructive/50": isError,
          }
        )}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size={"iconXs"}
              className={cn("border shadow-2xl border-white/50 bg-red-500", {
                "ring ring-destructive": isError,
              })}
              style={{
                background: colorState,
              }}
            />
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="start"
            className="w-fit p-0 border-0"
          >
            <SketchPicker
              color={colorState}
              onChangeComplete={handlePickerChange}
              onChange={handlePickerComplete}
            />
          </PopoverContent>
        </Popover>
        <input
          type="text"
          className="flex-1 text-sm w-full border-b"
          value={colorState}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </div>
    </div>
  );
};

export default ThemeEditorColor;
