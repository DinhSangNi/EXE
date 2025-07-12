import DashboardLayout from "@/components/DashboardLayout";
import MainLayout from "@/components/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import PostDetail from "@/pages/PostDetail";
import Register from "@/pages/Register";
import { Outlet } from "react-router-dom";
import PostsManagement from "@/pages/PostsManagement";
import AdminOverview from "@/pages/AdminOverview";
import Posts from "@/pages/Posts";
import CreateAccommodationPost from "@/pages/CreateAccommodationPost";
import EditAccomodationPost from "@/pages/EditAccomodationPost";

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
                path: "/posts",
                element: <Posts />,
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
                path: "user",
                element: <Outlet />,
                children: [
                    {
                        path: "posts",
                        element: <Outlet />,
                        children: [
                            {
                                path: "edit-accomodation/:id",
                                element: <EditAccomodationPost />,
                            },
                            {
                                path: "create-accomodation",
                                element: <CreateAccommodationPost />,
                            },
                            {
                                path: "",
                                element: <PostsManagement />,
                            },
                        ],
                    },
                ],
            },
            {
                path: "admin",
                element: <Outlet />,
                children: [
                    {
                        path: "posts",
                        element: <Outlet />,
                        children: [
                            {
                                path: "edit-accomodation/:id",
                                element: <EditAccomodationPost />,
                            },
                            {
                                path: "create-accomodation",
                                element: <CreateAccommodationPost />,
                            },
                            {
                                path: "",
                                element: <PostsManagement role="admin" />,
                            },
                        ],
                    },
                    {
                        path: "overview",
                        element: <AdminOverview />,
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
