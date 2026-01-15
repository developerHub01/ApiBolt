import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { isElectron } from "@/utils/electron";
import RootLayout from "@/pages/layout";
import AppLayout from "@/pages/app/layout";
import AppPage from "@/pages/app/page";
import FolderLayout from "@/pages/app/collections/folder/[id]/layout";
import FolderPage from "@/pages/app/collections/folder/[id]/page";
import RequestLayout from "@/pages/app/collections/request/[id]/layout";
import RequestPage from "@/pages/app/collections/request/[id]/page";
const EnvironmentLayout = lazy(() => import("@/pages/app/environment/layout"));
const EnvironmentPage = lazy(() => import("@/pages/app/environment/page"));
const ProjectsLayout = lazy(() => import("@/pages/app/projects/layout"));
const ProjectsPage = lazy(() => import("@/pages/app/projects/page"));
const AuthorizationLayout = lazy(
  () => import("@/pages/app/authorization/layout"),
);
const AuthorizationPage = lazy(() => import("@/pages/app/authorization/page"));
import CollectionsLayout from "@/pages/app/collections/layout";
import CollectionPage from "@/pages/app/collections/page";
import ThemesLayout from "@/pages/app/themes/layout";
const ThemeMarketPlaceLayout = lazy(
  () => import("@/pages/app/themes/marketplace/layout"),
);
const ThemeMarketPlacePage = lazy(
  () => import("@/pages/app/themes/marketplace/page"),
);
const ThemeEditorLayout = lazy(
  () => import("@/pages/app/themes/editor/layout"),
);
const ThemeEditorPage = lazy(() => import("@/pages/app/themes/editor/page"));

import ProjectFallback from "@/fallback/ProjectFallback";
import ThemeMarketplaceFallback from "@/fallback/theme/ThemeMarketplaceFallback";
import ThemeEditorFallback from "@/fallback/theme/ThemeEditorFallback";
import AuthorizationFallback from "@/fallback/AuthorizationFallback";
import EnvironmentFallback from "@/fallback/EnvironmentFallback";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        /* app layout */
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <AppPage />,
          },
          /* collection ==>> root page, request, folder */
          {
            path: "collections",
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
            element: (
              <Suspense fallback={<EnvironmentFallback />}>
                <EnvironmentLayout />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<EnvironmentFallback />}>
                    <EnvironmentPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "projects",
            element: (
              <Suspense fallback={<ProjectFallback />}>
                <ProjectsLayout />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<ProjectFallback />}>
                    <ProjectsPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "authorization",
            element: (
              <Suspense fallback={<AuthorizationFallback />}>
                <AuthorizationLayout />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<AuthorizationFallback />}>
                    <AuthorizationPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "themes",
            element: <ThemesLayout />,
            children: [
              // {
              //   path: "marketplace/:id?",
              //   element: (
              //     <Suspense fallback={<ThemeMarketplaceFallback />}>
              //       <ThemeMarketPlaceLayout />
              //     </Suspense>
              //   ),
              //   children: [
              //     {
              //       index: true,
              //       element: (
              //         <Suspense fallback={<ThemeMarketplaceFallback />}>
              //           <ThemeMarketPlacePage />
              //         </Suspense>
              //       ),
              //     },
              //   ],
              // },
              {
                path: "marketplace?",
                element: (
                  <Suspense fallback={<ThemeMarketplaceFallback />}>
                    <ThemeMarketPlaceLayout />
                  </Suspense>
                ),
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<ThemeMarketplaceFallback />}>
                        <ThemeMarketPlacePage />
                      </Suspense>
                    ),
                  },
                ],
              },
              {
                path: "editor",
                element: (
                  <>
                    <Suspense fallback={<ThemeEditorFallback />}>
                      <ThemeEditorLayout />
                    </Suspense>
                  </>
                ),
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<ThemeEditorFallback />}>
                        <ThemeEditorPage />
                      </Suspense>
                    ),
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
