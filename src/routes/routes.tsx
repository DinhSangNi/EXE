import DashboardLayout from "@/components/DashboardLayout";
import MainLayout from "@/components/MainLayout";
import LeanLayout from "@/components/LeanLayout";
import ProtectedRoute from "./ProtectedRoute";
import { Outlet } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import PostDetail from "@/pages/PostDetail";
import Posts from "@/pages/Posts";
import PostsManagement from "@/pages/PostsManagement";
import CreateAccommodationPost from "@/pages/CreateAccommodationPost";
import EditAccomodationPost from "@/pages/EditAccomodationPost";
import AppointmentManagement from "@/pages/AppointmentManagement";
import AppointmentDetail from "@/pages/AppointmentDetail";
import NotificationManagement from "@/pages/NotificationManagement";
import AdminOverview from "@/pages/AdminOverview";
import UserManagement from "@/pages/UserManagement";

export const routes = [
    // Public routes
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
            {
                path: "/posts/:id",
                element: <PostDetail />,
            },
        ],
    },

    // Private routes
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <DashboardLayout />,
                children: [
                    // User routes
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
                                path: "appointment/:id",
                                element: <AppointmentDetail />,
                            },
                            {
                                path: "notification",
                                element: <NotificationManagement />,
                            },
                        ],
                    },

                    // Admin routes
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
                                path: "users",
                                element: <UserManagement />,
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

    // 404 route
    {
        path: "*",
        element: <NotFound />,
    },
];
