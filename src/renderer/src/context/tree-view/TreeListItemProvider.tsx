import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { TRequestListItemType } from "@shared/types/request-list";
import type { RequestListItemInterface } from "@shared/types/request-response.types";
import { useTreeView } from "@/context/tree-view/TreeViewProvider";

interface TreeListItemContext extends Pick<
  RequestListItemInterface,
  "id" | "name" | "method" | "parentId" | "isExpended" | "children"
> {
  type: TRequestListItemType;
  isContextMenuOpen: boolean;
  isRenameActive: boolean;
  isRootLastChild?: boolean;
  isLastChild?: boolean;
  level: number;
  isHovering: boolean;
  handleChangeHovering: (value?: boolean) => void;
  handleToggleContextMenu: (value?: boolean) => void;
  handleRenameAction: () => void;
  handleChangeName: (id: string, name: string) => void;
  handleMove: (draggedId: string) => void;
  handleToggleExpended: () => void;
  handleAddSingle: () => void;
  handleSelectTab: () => Promise<void>;
}

const TreeListItemContext = createContext<TreeListItemContext | null>(null);

export const useTreeListItem = () => {
  const context = useContext(TreeListItemContext);

  if (!context) {
    throw new Error(
      "useTreeListItem must be used within a TreeListItemProvider.",
    );
  }

  return context;
};

interface TreeListItemProviderProps {
  id: string;
  children: React.ReactNode;
  isRootLastChild?: boolean;
  isLastChild?: boolean;
  level?: number;
  parentId?: string;
  childrenElements?: Array<string>;
  type: "folder" | "request";
  isExpended: boolean;
}

const TreeListItemProvider = ({
  id,
  children,
  isRootLastChild = false,
  isLastChild = false,
  level = 0,
  parentId,
  childrenElements,
  type,
  isExpended,
}: TreeListItemProviderProps) => {
  const {
    handleMoveItem,
    handleAddSingleItem,
    requestList,
    handleToggleExpended: toggleExpended,
    handleChangeName: changeName,
    handleChangeSelectedTab,
  } = useTreeView();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [isRenameActive, setIsRenameActive] = useState<boolean>(false);

  const requestDetails = useMemo(() => requestList[id], [id, requestList]);

  const handleChangeHovering = useCallback(
    (value?: boolean) =>
      setIsHovering(prev => (value === undefined ? !prev : value)),
    [],
  );

  const handleToggleContextMenu = useCallback(
    (value?: boolean) =>
      setIsContextMenuOpen(prev => (value === undefined ? !prev : value)),
    [],
  );

  const handleRenameAction = useCallback(() => {
    setIsRenameActive(true);
  }, []);

  const handleChangeName = useCallback(
    (id: string, name: string) => {
      setIsRenameActive(false);
      changeName({
        id,
        name,
      });
    },
    [changeName],
  );

  const handleMove = useCallback(
    (draggedId: string) => {
      handleMoveItem({
        requestId: draggedId,
        parentId: childrenElements ? id : parentId,
      });
    },
    [childrenElements, handleMoveItem, id, parentId],
  );

  const handleToggleExpended = useCallback(
    (itemId?: string) =>
      toggleExpended({
        id: itemId ?? id,
        isExpended: !isExpended,
      }),
    [id, isExpended, toggleExpended],
  );

  const handleAddSingle = useCallback(
    () => handleAddSingleItem(id),
    [handleAddSingleItem, id],
  );

  const handleSelectTab = useCallback(
    () => handleChangeSelectedTab(id),
    [id, handleChangeSelectedTab],
  );

  const value = useMemo(
    () => ({
      type,
      isContextMenuOpen,
      isRenameActive,
      isRootLastChild,
      isLastChild,
      level,
      isHovering,
      handleChangeHovering,
      children: childrenElements,
      ...requestDetails,
      ...(!requestDetails.name
        ? {
            name: requestDetails.method ? "Request" : "Folder",
          }
        : {}),
      handleToggleContextMenu,
      handleRenameAction,
      handleChangeName,
      handleMove,
      handleToggleExpended,
      handleAddSingle,
      handleSelectTab,
    }),
    [
      childrenElements,
      handleChangeHovering,
      handleChangeName,
      handleRenameAction,
      handleToggleContextMenu,
      isContextMenuOpen,
      isHovering,
      isLastChild,
      isRenameActive,
      isRootLastChild,
      level,
      requestDetails,
      type,
      handleMove,
      handleToggleExpended,
      handleAddSingle,
      handleSelectTab,
    ],
  );

  if (!requestDetails) return null;

  return (
    <TreeListItemContext.Provider value={value}>
      {children}
    </TreeListItemContext.Provider>
  );
};

export default TreeListItemProvider;
