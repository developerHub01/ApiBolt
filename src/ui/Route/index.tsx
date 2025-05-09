import RootLayout from "@/Pages/Layout";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "@/Pages/app/Layout";
import AppPage from "@/Pages/app/Page";
import FolderLayout from "@/Pages/app/(request-panel)/folder/[id]/Layout";
import FolderPage from "@/Pages/app/(request-panel)/folder/[id]/Page";
import RequestLayout from "@/Pages/app/(request-panel)/request/[id]/Layout";
import RequestPage from "@/Pages/app/(request-panel)/request/[id]/Page";
import { isElectron } from "@/utils/electron";

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
