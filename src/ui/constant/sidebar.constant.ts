import type { TSidebarTab } from "@/types/sidebar.types";
import {
  Boxes as CollectionsIcon,
  Container as EnvironmentsIcon,
  type LucideIcon,
  Layers as ProjectsIcon,
  KeyRound as AuthorizationIcon,
} from "lucide-react";

export const sidebarMenuList: Array<{
  id: TSidebarTab;
  Icon: LucideIcon;
  label: string;
  path: string;
}> = [
  {
    id: "projects",
    Icon: ProjectsIcon,
    label: "Projects",
    path: "/projects",
  },
  {
    id: "collections",
    Icon: CollectionsIcon,
    label: "Collections",
    path: "/",
  },
  {
    id: "environments",
    Icon: EnvironmentsIcon,
    label: "Environments",
    path: "/environments",
  },
  {
    id: "authorization",
    Icon: AuthorizationIcon,
    label: "Authorization",
    path: "/authorization",
  },
];

export const hiddenTabsWhenNotProjectSelected: Array<TSidebarTab> = [
  "collections",
  "environments",
  "authorization",
];

export const localStorageSidebarActiveTabKey = "sidebar-active-tab";
export const localStorageSidebarLastActiveTabKey = "sidebar-last-active-tab";
