import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isElectron } from "@/utils/electron";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { normalizeText } from "@/utils";
import type { RequestListItemInterface } from "@/types/request-response.types";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import SearchBar from "@/components/app/header/search/SearchBar";
import SearchResult from "@/components/app/header/search/SearchResult";
import { Search as SearchIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import {
  selectActiveProjectId,
  selectActiveProjectName,
} from "@/context/redux/project/selectors/project";
import { selectRequestOrFolderList } from "@/context/redux/request-response/selectors/request-list";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { selectApplyingKeyboardShortcutsById } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";
import {
  selectHeaderIsOpen,
  selectHeaderSearchTerm,
} from "@/context/redux/header/selectors/header";
import { changeHeaderIsOpen } from "@/context/redux/header/thunks/header";
import { handleChangeSearchTerm } from "@/context/redux/header/header-slice";

const DELAY_TIME = 300;

const HeaderSearch = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectSidebarActiveTab);
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const requestList = useAppSelector(selectRequestOrFolderList);
  const activeProjectName = useAppSelector(selectActiveProjectName);
  const selectedTab = useAppSelector(selectSelectedTab);
  const [requestOrFolderList, setRequestOrFolderList] = useState<
    Array<RequestListItemInterface>
  >([]);
  const isOpen = useAppSelector(selectHeaderIsOpen);
  const searchTerm = useAppSelector(selectHeaderSearchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = useCallback(
    (value: string) => dispatch(handleChangeSearchTerm(value)),
    [dispatch]
  );

  const handleClose = useCallback(() => {
    dispatch(changeHeaderIsOpen(false));
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRequestOrFolderList(() => {
        let filtered = !searchTerm
          ? []
          : Object.values(requestList)?.filter((request) =>
              normalizeText(request.name).includes(normalizeText(searchTerm))
            );

        const selectedTabData = filtered.find(
          (request) => request.id === selectedTab
        );

        if (selectedTabData) {
          filtered = [
            selectedTabData,
            ...filtered.filter((request) => request.id !== selectedTab),
          ];
        }
        return filtered;
      });
    }, DELAY_TIME);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, [isOpen]);

  const handleButtonClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOpen) dispatch(changeHeaderIsOpen(true));
  };

  if (activeTab !== "navigate_collections" || !activeProjectId) return null;

  return (
    <div
      className="lg:w-xl md:w-96 w-72"
      style={
        isElectron() ? ({ appRegion: "no-drag" } as CSSProperties) : undefined
      }
    >
      <Popover
        open={isOpen}
        onOpenChange={(newOpen) => {
          if (!newOpen) handleClose(); /* Close only on outside click or Esc */
        }}
      >
        <PopoverTrigger asChild>
          <ButtonLikeDiv
            asChild
            className="w-full"
            variant={"outline"}
            size={"sm"}
            onClick={handleButtonClick}
          >
            <div>
              <AnimatePresence>
                {isOpen && (
                  <SearchBar
                    inputRef={inputRef}
                    projectName={activeProjectName}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                )}
                {!isOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scaleX: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scaleX: 0.4,
                    }}
                    animate={{
                      opacity: 1,
                      scaleX: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "anticipate",
                      type: "decay",
                    }}
                    className="text-center capitalize text-accent-foreground flex items-center justify-center gap-2 font-medium overflow-hidden"
                  >
                    <SearchIcon size={16} />
                    <p className="truncate w-full">{activeProjectName}</p>
                    <ShortcutText />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ButtonLikeDiv>
        </PopoverTrigger>
        <PopoverContent
          onPointerDown={(e) => e.stopPropagation()}
          className="lg:w-xl md:w-96 w-72 bg-background/30 backdrop-blur-sm px-0 py-2 border rounded-lg"
          sideOffset={12}
        >
          <SearchResult
            searchTerm={searchTerm}
            list={requestOrFolderList}
            selectedTab={selectedTab}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

const ShortcutText = () => {
  const shortcuts = useAppSelector((state) =>
    selectApplyingKeyboardShortcutsById(state, "search_collection")
  );

  const shortcutString =
    Array.isArray(shortcuts) && shortcuts.length
      ? `(${keyListStringify(shortcuts)})`
      : "";

  if (!shortcutString) return null;

  return <p className="text-muted-foreground text-xs">{shortcutString}</p>;
};

export default HeaderSearch;
