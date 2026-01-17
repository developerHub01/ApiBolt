import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { X as ClearIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input-transparent";
import ThemeFilter from "@/components/app/themes/marketplace/theme-list/theme-list-top/ThemeFilter";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectThemeMarketplaceSearchFilter,
  selectThemeMarketplaceSearchTerm,
} from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { handleChangeSearchTerm } from "@/context/redux/theme-marketplace/theme-marketplace-slice";
import { debounce } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { THEME_MARKETPLACE_FILTER_LOCAL } from "@/constant/theme.constant";

const ThemeListTop = memo(() => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectThemeMarketplaceSearchTerm);
  const [searchTermState, setSearchTermState] = useState<string>(searchTerm);
  const searchTermRef = useRef<HTMLInputElement>(null);
  const searchFilter = useAppSelector(selectThemeMarketplaceSearchFilter);
  const isDisabled = useMemo(
    () => THEME_MARKETPLACE_FILTER_LOCAL.has(searchFilter),
    [searchFilter],
  );

  useEffect(() => {
    searchTermRef.current?.focus();

    const handleWindowKeyboard = (e: globalThis.KeyboardEvent) => {
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "l" &&
        searchTermRef.current &&
        searchTermRef.current !== document.activeElement
      )
        searchTermRef.current.focus();
    };

    window.addEventListener("keypress", handleWindowKeyboard);

    return () => window.removeEventListener("keypress", handleWindowKeyboard);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") e.currentTarget.blur();
  };

  const debouncedDispatch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(handleChangeSearchTerm(value));
      }, 500),
    [dispatch],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTermState(value);
    debouncedDispatch(value);
  };

  const handleClear = () => {
    setSearchTermState("");
    dispatch(handleChangeSearchTerm(""));
  };

  return (
    <div className="w-full border-b-2 bg-accent/50 p-2 rounded-t-lg">
      <div className="w-full flex gap-1">
        <Input
          ref={searchTermRef}
          onKeyDown={handleKeyDown}
          className="w-full bg-secondary flex-1 placeholder:capitalize h-auto border-0 text-sm! placeholder:text-sm px-2"
          placeholder="Search for themes"
          value={searchTermState}
          onChange={handleChange}
          disabled={isDisabled}
        />
        <AnimatePresence>
          {Boolean(searchTermState) && (
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                ease: "linear",
              }}
            >
              <Button variant={"secondary"} size={"icon"} onClick={handleClear}>
                <ClearIcon />
              </Button>
            </motion.span>
          )}
        </AnimatePresence>
        <ThemeFilter />
      </div>
    </div>
  );
});

export default ThemeListTop;
