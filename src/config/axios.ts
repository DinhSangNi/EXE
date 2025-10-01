/* eslint-disable */

import axios, {
    AxiosError,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from "axios";
import { AuthServices } from "@/services/auth";
import { privateRoutes } from "@/routes/routesConfig";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// === Refresh token queue state ===
let isRefreshing = false;
let requestToRefreshQueue: {
    resolve: (token: string | null) => void;
    reject: (err: any) => void;
}[] = [];

/** Giải quyết các request chờ refresh */
const processRequestToRefreshQueue = (err: any, token: string | null) => {
    requestToRefreshQueue.forEach((promise) => {
        if (err) {
            promise.reject(err);
        } else {
            promise.resolve(token);
        }
    });
    requestToRefreshQueue = [];
};

// === Request interceptor: tự động gắn accessToken ===
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// === Response interceptor: refresh token khi 401 ===
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as
            | InternalAxiosRequestConfig
            | undefined;
        if (!originalRequest) return Promise.reject(error);

        const isAuthEndpoint =
            originalRequest.url === "/auth/refresh" ||
            originalRequest.url === "/auth/verify-otp";

        if (error.response?.status === 401 && !isAuthEndpoint) {
            // Nếu đang refresh => chờ token mới
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    requestToRefreshQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return api(originalRequest);
                        }
                    })
                    .catch((err) => Promise.reject(err));
            }

            // Lần đầu refresh
            isRefreshing = true;
            try {
                const res = await AuthServices.refreshToken();
                if (res.status === 200) {
                    const newAccessToken = res.data.metadata.accessToken;
                    localStorage.setItem("accessToken", newAccessToken);
                    api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                    processRequestToRefreshQueue(null, newAccessToken);
                    return api(originalRequest);
                }
            } catch (err) {
                // Refresh thất bại
                processRequestToRefreshQueue(err, null);
                await AuthServices.logout();

                const currentPath = window.location.pathname;
                if (
                    privateRoutes.some((route) =>
                        currentPath.startsWith(route)
                    ) ||
                    currentPath.startsWith("/posts")
                ) {
                    window.location.href = "/login";
                }
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
