import { memo, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface SettingSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  defaultValue: number;
  onChange: (value?: number) => void;
  suffixLable?: string;
  longSuffixLable?: string;
}

const SettingSlider = memo(
  ({
    value,
    min,
    max,
    step = 1,
    defaultValue,
    onChange,
    suffixLable = "",
    longSuffixLable = "",
  }: SettingSliderProps) => {
    const [stateValue, setStateValue] = useState<number>(defaultValue);

    const handleOnChange = (value: Array<number>) => setStateValue(value[0]);

    useEffect(() => setStateValue(value), [value]);

    return (
      <div className="w-full max-w-96 flex flex-col justify-center items-center p-4 gap-3">
        <p className="text-center">
          {stateValue}
          {longSuffixLable || suffixLable}
        </p>
        <div className="w-full flex justify-center items-center gap-3">
          <p>
            {min}
            {suffixLable}
          </p>
          <Slider
            defaultValue={[defaultValue]}
            value={[stateValue]}
            min={min}
            max={max}
            step={step}
            className={cn("w-full")}
            onValueChange={handleOnChange}
            onValueCommit={(value) => onChange(value[0])}
          />
          <p>
            {max}
            {suffixLable}
          </p>
        </div>
      </div>
    );
  }
);

export default SettingSlider;
