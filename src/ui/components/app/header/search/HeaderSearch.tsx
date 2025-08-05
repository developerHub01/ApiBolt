import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isElectron } from "@/utils/electron";
import { useAppSelector } from "@/context/redux/hooks";
import { normalizeText } from "@/utils";
import type { RequestListItemInterface } from "@/types/request-response.types";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import SearchBar from "@/components/app/header/search/SearchBar";
import SearchResult from "@/components/app/header/search/SearchResult";
import { Search as SearchIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const DELAY_TIME = 300;

const HeaderSearch = () => {
  const activeTab = useAppSelector((state) => state.sidebar.activeTab);
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const requestList =
    useAppSelector((state) => state.requestResponse.requestList) ?? {};

  const activeProjectName = useAppSelector(
    (state) =>
      state.requestResponse.projectList.find(
        (project) => project.id === activeProjectId
      )?.name ?? ""
  );
  const selectedTab = useAppSelector(
    (state) => state.requestResponse.selectedTab
  );
  const [requestOrFolderList, setRequestOrFolderList] = useState<
    Array<RequestListItemInterface>
  >([]);
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = useCallback(
    (value: string) => setSearchTerm(value),
    []
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setSearchTerm("");
  }, []);

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
  }, [searchTerm, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDownhandler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k" && !open) setOpen(true);
    };

    document.addEventListener("keydown", handleKeyDownhandler);
    return () => document.removeEventListener("keydown", handleKeyDownhandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (activeTab !== "collections" || !activeProjectId) return null;

  return (
    <div
      className="lg:w-xl md:w-96 w-72"
      style={
        isElectron() ? ({ appRegion: "no-drag" } as CSSProperties) : undefined
      }
    >
      <Popover
        open={open}
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!open) setOpen(true);
            }}
          >
            <div>
              <AnimatePresence>
                {open && (
                  <SearchBar
                    inputRef={inputRef}
                    projectName={activeProjectName}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                )}
                {!open && (
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
                    <p className="text-muted-foreground text-xs">(Ctrl + k)</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ButtonLikeDiv>
        </PopoverTrigger>
        <PopoverContent
          onPointerDown={(e) => e.stopPropagation()}
          className="lg:w-xl md:w-96 w-72 bg-transparent backdrop-blur-sm px-0 py-2 border rounded-lg"
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

export default HeaderSearch;
