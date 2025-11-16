import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { isElectron } from "@/utils/electron";
import RootLayout from "@/pages/layout";
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
import ThemesLayout from "@/pages/app/themes/layout";
import ThemesPage from "@/pages/app/themes/page";
import ThemeEditorLayout from "@/pages/app/themes/editor/layout";
import ThemeEditorPage from "@/pages/app/themes/editor/page";
import ThemeMarketPlaceLayout from "@/pages/app/themes/marketplace/[id]/layout";
import ThemeMarketPlacePage from "@/pages/app/themes/marketplace/[id]/page";

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
          {
            path: "themes",
            element: <ThemesLayout />,
            children: [
              {
                index: true,
                element: <ThemesPage />,
              },
              {
                path: "marketplace/:id?",
                element: <ThemeMarketPlaceLayout />,
                children: [
                  {
                    index: true,
                    element: <ThemeMarketPlacePage />,
                  },
                ],
              },
              {
                path: "editor",
                element: <ThemeEditorLayout />,
                children: [
                  {
                    index: true,
                    element: <ThemeEditorPage />,
                  },
                ],
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
