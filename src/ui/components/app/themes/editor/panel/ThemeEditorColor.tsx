import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SketchPicker, type ColorResult } from "react-color";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeThemePalette } from "@/context/redux/theme/theme-slice";
import type { ThemeColorId } from "@/types/theme.types";
import { getRgbToHex } from "@/utils/color.utils";

interface Props {
  id: ThemeColorId;
  color: string;
}

const ThemeEditorColor = ({ id, color }: Props) => {
  const dispatch = useAppDispatch();
  const [colorState, setColorState] = useState<string>(color);

  useEffect(() => {
    setColorState(color);
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

  return (
    <div key={id} className="w-full flex items-center gap-2 pr-4">
      <p className="flex-1 capitalize text-sm">{id.replaceAll("-", " ")}</p>
      <div className="flex items-center gap-2 p-0.5 rounded-md bg-input w-29 grow-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size={"iconXs"}
              className="border shadow-2xl border-white/50 bg-red-500"
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
          readOnly
          type="text"
          className="flex-1 text-sm w-full"
          value={colorState}
        />
      </div>
    </div>
  );
};

export default ThemeEditorColor;
