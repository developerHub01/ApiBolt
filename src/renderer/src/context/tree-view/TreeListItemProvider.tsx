import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
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
  const dispatch = useAppDispatch();
  const { handleMoveItem, handleAddSingleItem } = useTreeView();
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const requestDetails = useAppSelector(
    state => state.requestResponse.requestList[id],
  );

  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [isRenameActive, setIsRenameActive] = useState<boolean>(false);

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
      dispatch(
        updateRequestOrFolder({
          id,
          name,
        }),
      );
    },
    [dispatch],
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
      dispatch(
        updateRequestOrFolder({
          id: itemId ?? id,
          isExpended: !isExpended,
        }),
      ),
    [dispatch, id, isExpended],
  );

  const handleAddSingle = useCallback(
    () => handleAddSingleItem(id),
    [handleAddSingleItem, id],
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
