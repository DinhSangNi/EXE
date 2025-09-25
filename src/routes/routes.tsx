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
import AppointmentManagement from "@/pages/AppointmentManagement";
import NotificationManagement from "@/pages/NotificationManagement";
import LeanLayout from "@/components/LeanLayout";
import ProtectedRoute from "./ProtectedRoute";

const isAuthenticated = !!localStorage.getItem("accessToken");
console.log("isAuthenticated: ", isAuthenticated);

export const routes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
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
        element: <LeanLayout />,
        children: [
            {
                path: "/posts",
                element: <Posts />,
            },
        ],
    },
    {
        element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
        children: [
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
                            {
                                path: "appointment",
                                element: <AppointmentManagement />,
                            },
                            {
                                path: "notification",
                                element: <NotificationManagement />,
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
                                        element: (
                                            <PostsManagement role="admin" />
                                        ),
                                    },
                                ],
                            },
                            {
                                path: "overview",
                                element: <AdminOverview />,
                            },
                            {
                                path: "appointment",
                                element: <AppointmentManagement />,
                            },
                            {
                                path: "notification",
                                element: <NotificationManagement />,
                            },
                        ],
                    },
                ],
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
];
