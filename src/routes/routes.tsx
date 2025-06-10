import MainLayout from "@/components/MainLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import PostDetail from "@/pages/PostDetail";

export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/:id",
                element: <PostDetail />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
];
