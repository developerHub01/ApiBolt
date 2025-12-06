import { memo, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { X as ClearIcon } from "lucide-react";

interface SearchBarProps {
  projectName: string;
  value: string;
  onChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const SearchBar = memo(
  ({ projectName, value, onChange, inputRef }: SearchBarProps) => {
    return (
      <div className="w-full flex items-center gap-1">
        <input
          ref={inputRef}
          type="text"
          className="w-full placeholder:capitalize bg-transparent text-sm py-1"
          placeholder={projectName}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
        />
        <AnimatePresence>
          {value && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <Button
                size={"iconXs"}
                variant={"ghost"}
                onClick={() => onChange("")}
              >
                <ClearIcon />
              </Button>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

export default SearchBar;
