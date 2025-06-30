import CreatePost from "@/pages/CreatePost";
import DashboardLayout from "@/components/DashboardLayout";
import MainLayout from "@/components/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import PostDetail from "@/pages/PostDetail";
import Register from "@/pages/Register";
import { Outlet } from "react-router-dom";
import Posts from "@/pages/Posts";
import EditPost from "@/pages/EditPost";

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
                path: "/posts/:id",
                element: <PostDetail />,
            },
        ],
    },
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "host",
                element: <Outlet />,
                children: [
                    {
                        path: "posts",
                        element: <Outlet />,
                        children: [
                            {
                                path: "edit/:id",
                                element: <EditPost />,
                            },
                            {
                                path: "create",
                                element: <CreatePost />,
                            },
                            {
                                path: "",
                                element: <Posts />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
];
