import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { isElectron } from "@/utils/electron";
import RootLayout from "@/temppages/layout";
import AppLayout from "@/temppages/app/layout";
import FolderLayout from "@/temppages/app/collections/folder/[id]/layout";
import FolderPage from "@/temppages/app/collections/folder/[id]/page";
import RequestLayout from "@/temppages/app/collections/request/[id]/layout";
import RequestPage from "@/temppages/app/collections/request/[id]/page";
import EnvironmentLayout from "@/temppages/app/environment/layout";
import EnvironmentPage from "@/temppages/app/environment/page";
import ProjectsLayout from "@/temppages/app/projects/layout";
import ProjectsPage from "@/temppages/app/projects/page";
import AuthorizationLayout from "@/temppages/app/authorization/layout";
import AuthorizationPage from "@/temppages/app/authorization/page";
import CollectionsLayout from "@/temppages/app/collections/layout";
import CollectionPage from "@/temppages/app/collections/page";

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
