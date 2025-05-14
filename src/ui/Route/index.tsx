import RootLayout from "@/pages/Layout";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "@/pages/app/Layout";
import AppPage from "@/pages/app/Page";
import FolderLayout from "@/pages/app/(request-panel)/folder/[id]/Layout";
import FolderPage from "@/pages/app/(request-panel)/folder/[id]/Page";
import RequestLayout from "@/pages/app/(request-panel)/request/[id]/Layout";
import RequestPage from "@/pages/app/(request-panel)/request/[id]/Page";
import { isElectron } from "@/utils/electron";
import EnvironmentLayout from "@/pages/app/(request-panel)/environment/[id]/Layout";
import EnvironmentPage from "@/pages/app/(request-panel)/environment/[id]/Page";

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
