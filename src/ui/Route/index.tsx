import RootLayout from "@/pages/layout";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "@/pages/app/layout";
import AppPage from "@/pages/app/page";
import FolderLayout from "@/pages/app/(request-panel)/folder/[id]/layout";
import FolderPage from "@/pages/app/(request-panel)/folder/[id]/page";
import RequestLayout from "@/pages/app/(request-panel)/request/[id]/layout";
import RequestPage from "@/pages/app/(request-panel)/request/[id]/page";
import { isElectron } from "@/utils/electron";
import EnvironmentLayout from "@/pages/app/(request-panel)/environment/[id]/layout";
import EnvironmentPage from "@/pages/app/(request-panel)/environment/[id]/page";

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
            path: "environment/:id",
            element: <EnvironmentLayout />,
            children: [
              {
                path: "",
                element: <EnvironmentPage />,
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
