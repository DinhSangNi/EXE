import MainLayout from "@/components/MainLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
];
