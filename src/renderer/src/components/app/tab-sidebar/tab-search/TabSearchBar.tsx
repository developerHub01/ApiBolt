import {
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

const DEBOUNCE_DELAY = 300;

const TabSearchBar = memo(() => {
  const { handleSearch, isTabListHovering } = useTabSidebar();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [skipEffect, setSkipEffect] = useState<boolean>(false);

  useEffect(() => {
    if (skipEffect) {
      setSkipEffect(false);
      return;
    }

    const timeout = setTimeout(() => {
      handleSearch(searchTerm);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [searchTerm, handleSearch, skipEffect]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    [],
  );

  const handleClear = useCallback(() => {
    setSkipEffect(true);
    setSearchTerm("");
    handleSearch("");
  }, [handleSearch]);

  return (
    <Button
      asChild
      variant={"background"}
      size={"sm"}
      className="overflow-hidden gap-0"
    >
      <div className="w-full flex items-center">
        <div>
          <SearchIcon size={16} />
        </div>
        {/* show input of expended mode else hide */}
        <motion.div
          style={{ transformOrigin: "left" }}
          animate={{
            opacity: isTabListHovering ? 1 : 0,
            width: isTabListHovering ? "100%" : "0px",
            paddingLeft: isTabListHovering ? "8px" : "0px",
            scaleX: isTabListHovering ? 1 : 0,
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
