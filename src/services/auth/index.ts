import api from "@/config/axios";

export const AuthServices = {
    login: async (loginFormData: { email: string; password: string }) => {
        const res = await api.post(`/auth/login`, loginFormData);
        return res;
    },
    register: async (signUpFormData: {
        fullname: string;
        email: string;
        password: string;
        phone: string;
    }) => {
        const { fullname, ...rest } = signUpFormData;
        const res = await api.post(`/auth/register`, {
            ...rest,
            name: signUpFormData.fullname,
        });
        return res;
    },
    logout: async () => {
        const res = await api.post(`/auth/logout`);
        return res;
    },
    refreshToken: async () => {
        const res = await api.post(`/auth/refresh`);
        return res;
    },
    sendOTP: async (email: string) => {
        const res = await api.post(`/auth/send-otp`, {
            email,
        });
        return res;
    },
    verifyEmail: async (email: string, otp: string) => {
        const res = await api.post(`/auth/verify-otp`, {
            email,
            otp,
        });
        return res;
    },
    loginWithGoogle: async () => {
        await api.get(`/auth/google`);
    },
};
