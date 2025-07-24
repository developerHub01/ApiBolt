import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { isElectron } from "@/utils/electron";
import RootLayout from "@/pages/Layout";
import AppLayout from "@/pages/app/layout";
import FolderLayout from "@/pages/app/collections/folder/[id]/layout";
import FolderPage from "@/pages/app/collections/folder/[id]/page";
import RequestLayout from "@/pages/app/collections/request/[id]/layout";
import RequestPage from "@/pages/app/collections/request/[id]/page";
import EnvironmentLayout from "@/pages/app/environment/layout";
import EnvironmentPage from "@/pages/app/environment/page";
import ProjectsLayout from "@/pages/app/projects/layout";
import ProjectsPage from "@/pages/app/projects/page";
import AuthorizationLayout from "@/pages/app/authorization/layout";
import AuthorizationPage from "@/pages/app/authorization/page";
import CollectionsLayout from "@/pages/app/collections/layout";
import CollectionPage from "@/pages/app/collections/page";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        /* app layout */
        element: <AppLayout />,
        children: [
          /* collection ==>> root page, request, folder */
          {
            element: <CollectionsLayout />,
            children: [
              {
                index: true,
                element: <CollectionPage />,
              },
              {
                path: "folder/:id",
                element: <FolderLayout />,
                children: [
                  {
                    index: true,
                    element: <FolderPage />,
                  },
                ],
              },
              {
                path: "request/:id",
                element: <RequestLayout />,
                children: [
                  {
                    index: true,
                    element: <RequestPage />,
                  },
                ],
              },
            ],
          },
          {
            path: "environments",
            element: <EnvironmentLayout />,
            children: [
              {
                index: true,
                element: <EnvironmentPage />,
              },
            ],
          },
          {
            path: "projects",
            element: <ProjectsLayout />,
            children: [
              {
                index: true,
                element: <ProjectsPage />,
              },
            ],
          },
          {
            path: "authorization",
            element: <AuthorizationLayout />,
            children: [
              {
                index: true,
                element: <AuthorizationPage />,
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
