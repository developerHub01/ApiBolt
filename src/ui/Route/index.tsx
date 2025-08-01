import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { isElectron } from "@/utils/electron";
import RootLayout from "@/pages/templayout";
import AppLayout from "@/pages/app/templayout";
import FolderLayout from "@/pages/app/collections/folder/[id]/templayout";
import FolderPage from "@/pages/app/collections/folder/[id]/temppage";
import RequestLayout from "@/pages/app/collections/request/[id]/templayout";
import RequestPage from "@/pages/app/collections/request/[id]/temppage";
import EnvironmentLayout from "@/pages/app/environment/templayout";
import EnvironmentPage from "@/pages/app/environment/temppage";
import ProjectsLayout from "@/pages/app/projects/templayout";
import ProjectsPage from "@/pages/app/projects/temppage";
import AuthorizationLayout from "@/pages/app/authorization/templayout";
import AuthorizationPage from "@/pages/app/authorization/temppage";
import CollectionsLayout from "@/pages/app/collections/temp";
import CollectionPage from "@/pages/app/collections/Temppage";

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
