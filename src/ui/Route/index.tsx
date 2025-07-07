import RootLayout from "@/pages/layout";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "@/pages/app/layout";
import AppPage from "@/pages/app/page";
import FolderLayout from "@/pages/app/folder/[id]/layout";
import FolderPage from "@/pages/app/folder/[id]/page";
import RequestLayout from "@/pages/app/request/[id]/layout";
import RequestPage from "@/pages/app/request/[id]/page";
import { isElectron } from "@/utils/electron";
import EnvironmentLayout from "@/pages/app/environment/[id]/layout";
import EnvironmentPage from "@/pages/app/environment/[id]/page";
import ProjectsLayout from "@/pages/app/projects/layout";
import ProjectsPage from "@/pages/app/projects/page";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        /* app layout */
        path: "",
        element: <AppLayout />,
        children: [
          {
            path: "",
            element: <AppPage />,
          },
          {
            path: "folder/:id",
            element: <FolderLayout />,
            children: [
              {
                path: "",
                element: <FolderPage />,
              },
            ],
          },
          {
            path: "request/:id",
            element: <RequestLayout />,
            children: [
              {
                path: "",
                element: <RequestPage />,
              },
            ],
          },
          {
            path: "environments",
            element: <EnvironmentLayout />,
            children: [
              {
                path: "",
                element: <EnvironmentPage />,
              },
            ],
          },
          {
            path: "projects",
            element: <ProjectsLayout />,
            children: [
              {
                path: "",
                element: <ProjectsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = isElectron()
  ? createHashRouter(routes)
  : createBrowserRouter(routes);

const Router = () => <RouterProvider router={router} />;

export default Router;
