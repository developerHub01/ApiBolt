import {
  ButtonHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import { X as ClearIcon, Search as SearchIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import useCheckApplyingTabListLayoutDirection from "@/hooks/setting/use-check-applying-tab-list-layout-direction";

const DEBOUNCE_DELAY = 300;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
}

const TabSearchBar = memo(({ isOpen, className, ...props }: Props) => {
  const tabListLayoutType = useCheckApplyingTabListLayoutDirection();
  const { handleSearch, isTabListOpen } = useTabSidebar();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch(searchTerm);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [searchTerm, handleSearch]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    [],
  );

  const handleClear = useCallback(() => {
    setSearchTerm("");
    handleSearch("");
  }, [handleSearch]);

  useEffect(() => {
    return () => handleClear();
  }, [handleClear]);

  const isExpended = isOpen ?? isTabListOpen;

  return (
    <Button
      asChild
      variant={"background"}
      size={"sm"}
      className={cn(
        "overflow-hidden gap-0 shadow-2xl border-2 border-border/20",
        {
          "pr-0.5!": tabListLayoutType === "top",
        },
        className,
      )}
      {...props}
    >
      <div className="w-full flex items-center">
        <SearchIcon size={16} />
        {/* show input of expended mode else hide */}
        <motion.div
          style={{ transformOrigin: "left" }}
          animate={{
            opacity: isExpended ? 1 : 0,
            width: isExpended ? "100%" : "0px",
            paddingLeft: isExpended ? "8px" : "0px",
            scaleX: isExpended ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center gap-1 pl-1"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            className="w-full border-none outline-none text-sm font-normal tracking-wide"
            placeholder="Search terms..."
          />
          <Button
            size={"iconXs"}
            className={cn(
              "pointer-events-none opacity-0 duration-75 ease-in-out transition-all",
              {
                "pointer-events-auto opacity-100": searchTerm,
              },
            )}
            variant={"ghost"}
            onClick={handleClear}
          >
            <ClearIcon />
          </Button>
        </motion.div>
      </div>
    </Button>
  );
});

export default TabSearchBar;
