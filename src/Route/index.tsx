import SingleFolderLayout from "@/Pages/folder/[id]/Layout";
import SingleFoldePage from "@/Pages/folder/[id]/Page";
import FolderLayout from "@/Pages/folder/Layout";
import SingleRequestLayout from "@/Pages/request/[id]/Layout";
import SingleRequestPage from "@/Pages/request/[id]/Page";
import RequestLayout from "@/Pages/request/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        children: [
          {
            path: "folder",
            element: <FolderLayout />,
            children: [
              {
                path: ":id",
                element: <SingleFolderLayout />,
                children: [
                  {
                    path: "",
                    element: <SingleFoldePage />,
                  },
                ],
              },
            ],
          },
          {
            path: "request",
            element: <RequestLayout />,
            children: [
              {
                path: ":id",
                element: <SingleRequestLayout />,
                children: [
                  {
                    path: "",
                    element: <SingleRequestPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
