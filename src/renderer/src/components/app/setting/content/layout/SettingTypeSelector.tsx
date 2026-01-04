import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface SettingItem {
  id: string;
  label: string;
  subLabel?: string;
  Icon: LucideIcon;
}

interface Props {
  list: Array<SettingItem>;
  value: string;
  onChange: (value?: string) => void;
}

const SettingTypeSelector = ({ list, value, onChange }: Props) => {
  return (
    <div className="w-full flex justify-center items-stretch gap-6 mb-1">
      {list.map(({ id, label, subLabel, Icon }) => (
        <motion.div
          key={id}
          className={cn(
            "w-fit min-w-40 p-4 rounded-lg border border-accent ring-2 ring-primary/20 flex flex-col gap-2.5 justify-center items-center text-center cursor-pointer hover:bg-accent/50 transition-all duration-100",
            {
              "bg-accent/80 ring-primary": value === id,
            },
          )}
          onClick={() => onChange(id)}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <Icon size={30} />
          <div className="flex flex-col items-center justify-center gap-1">
            <p>{label}</p>
            {subLabel && (
              <p className="text-xs text-muted-foreground">{subLabel}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SettingTypeSelector;
