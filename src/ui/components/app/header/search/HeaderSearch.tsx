import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isElectron } from "@/utils/electron";
import { useAppSelector } from "@/context/redux/hooks";

const HeaderSearch = () => {
  const activeTab = useAppSelector((state) => state.sidebar.activeTab);
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const activeProjectName = useAppSelector(
    (state) =>
      state.requestResponse.projectList.find(
        (project) => project.id === activeProjectId
      )?.name ?? ""
  );
  
  if (activeTab !== "collections" && !activeProjectId) return null;

  return (
    <div
      className="w-full md:max-w-xl max-w-72"
      style={{
        ...(isElectron()
          ? ({
              appRegion: "no-drag",
            } as CSSProperties)
          : {}),
      }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button asChild className="w-full" variant={"outline"} size={"sm"}>
            <div className="w-full">
              <input
                type="text"
                className="w-full placeholder:capitalize placeholder:text-center focus:placeholder:opacity-0"
                placeholder={activeProjectName}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full md:max-w-xl max-w-72">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi,
            placeat! Ullam amet maxime corporis, dignissimos rerum totam, eius
            aliquid rem itaque voluptatem cum assumenda, expedita adipisci
            perspiciatis harum praesentium dolor!
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HeaderSearch;
