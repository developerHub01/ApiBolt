import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { Trash2 as DeleteIcon } from "lucide-react";
import {
  deleteProject,
  updateProject,
} from "@/context/redux/request-response/request-response-thunk";

const ActiveProject = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const projectList = useAppSelector(
    (state) => state.requestResponse.projectList
  );

  // Find active project
  const activeProject = useMemo(() => {
    if (!activeProjectId) return null;
    return (
      projectList.find((project) => project.id === activeProjectId) || null
    );
  }, [activeProjectId, projectList]);

  /* to intitialize local name with redux state */
  useEffect(() => {
    if (!activeProject) return;

    setName(activeProject.name);
  }, [activeProject]);

  const handleDispatchName = useCallback(
    (name: string) => {
      if (!activeProject) return;

      dispatch(
        updateProject({
          id: activeProject?.id,
          name,
        })
      );
    },
    [dispatch, activeProject]
  );

  const handleKeydownName = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!activeProject) return;
      if (e.key === "Enter") {
        e.preventDefault();
        nameRef.current?.blur();
      }
    },
    [activeProject]
  );

  const handleBlurName = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (!activeProject) return;

      const value = e.target.value.trim() || activeProject.name;
      setName(value);
      handleDispatchName(value);
    },
    [activeProject, handleDispatchName]
  );

  const handleDelete = useCallback(() => {
    if (!activeProject) return;
    dispatch(deleteProject(activeProject.id));
  }, [activeProject, dispatch]);

  if (!activeProject) return null;

  return (
    <div className="w-full border-2 border-dotted rounded-md p-4 flex gap-2 bg-accent/50 hover:bg-accent transition-all duration-200 group">
      <div className="w-full flex flex-col flex-1">
        <p className="text-sm font-semibold pb-0.5">Active Project</p>
        <h3 className="w-full text-xl font-bold flex items-center gap-3 pb-3">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 shadow-md shadow-green-400"></span>
          <input
            className="w-full flex-1 outline-none border-b border-transparent focus:border-b-primary"
            onKeyDown={handleKeydownName}
            onBlur={handleBlurName}
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            size={"iconSm"}
            variant={"destructive"}
            className="ml-2.5"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </Button>
        </h3>
        <p className="text-muted-foreground text-sm">
          This is the project you are currently working on.
        </p>
      </div>
    </div>
  );
};

export default ActiveProject;
