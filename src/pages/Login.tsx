/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox, ConfigProvider, Divider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SocialLogin from "@/components/SocialLogin";
import { AuthServices } from "@/services/auth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores/store";
import { login } from "@/stores/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { User } from "@/stores/type";

const loginSchema = z.object({
    email: z
        .string()
        .email({ message: "Email không hợp lệ!" })
        .min(1, { message: "Vui lòng điền email!" }),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 kí tự!"),
});

type FormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(loginSchema),
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogin = async (value: FormData) => {
        try {
            setLoading(true);
            console.log("values: ", value);
            const res = await AuthServices.login(value);
            if (res.status === 200) {
                const metadata = res.data.metadata;
                dispatch(
                    login({
                        id: metadata.user.id,
                        name: metadata.user.name,
                        email: metadata.user.email,
                        avatar: metadata.user.avatar,
                        role: metadata.user.role,
                        accessToken: metadata.accessToken,
                    })
                );
                toast.success("Đăng nhập thành công", {
                    position: "top-center",
                    delay: 1500,
                });
                navigate("/");
            }
        } catch (error: any) {
            console.log("error: ", error);
            switch (error.response.data.message) {
                case "Password not match":
                    setError("Mật khẩu không khớp!");
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const listener = (event: MessageEvent) => {
            if (event.origin !== import.meta.env.VITE_BASE_URL) return;

            const data: {
                accessToken: string;
                refreshToken: string;
                user: User;
            } = event.data;
            console.log("data: ", data);
            localStorage.setItem("accessToken", data.accessToken);
            dispatch(
                login({
                    name: data.user.name,
                    email: data.user.email,
                    avatar: data.user.medias ? data.user.medias[0].url : "",
                    role: data.user.role,
                    id: data.user.id,
                    accessToken: data.accessToken,
                })
            );
            toast.success("Đăng nhập thành công", {
                position: "top-center",
                delay: 1500,
            });
            navigate("/");
        };

        window.addEventListener("message", listener);
        return () => window.removeEventListener("message", listener);
    }, []);

    return (
        <>
            <div className="flex h-[100vh] w-full items-center justify-center bg-gray-100">
                <div className="flex h-[500px] w-[550px] flex-col justify-between bg-white px-8 shadow-lg">
                    <div>
                        <h1 className="py-6 text-center text-[1.3rem] font-bold">
                            Chào mừng bạn đến với UHome
                        </h1>
                        {error && (
                            <p className="text-center text-[0.9rem] text-red-500">
                                {error}
                            </p>
                        )}
                        <form onSubmit={handleSubmit(handleLogin)} className="">
                            <div className="mb-5 flex flex-col">
                                <label>Email:</label>
                                <input
                                    className="rounded-lg border border-gray-400 p-2 shadow-md focus-within:outline focus-within:outline-black"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-[0.9rem] text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="mb-5 flex flex-col">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    className="rounded-lg border border-gray-400 p-2 shadow-md focus-within:outline focus-within:outline-black"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-[0.9rem] text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div className="my-4 flex w-full justify-between text-[14px]">
                                <div className="flex items-center gap-1">
                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                colorBorder: "#9ca3af",
                                            },
                                        }}
                                    >
                                        <Checkbox className="border-gray-400">
                                            Nhớ mật khẩu
                                        </Checkbox>
                                    </ConfigProvider>
                                </div>
                                <button className="transition-colors duration-150 hover:text-primary">
                                    Quên mật khẩu?
                                </button>
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                                className={`${loading ? "cursor-not-allowed bg-opacity-50" : "hover:bg-opacity-70"} mt-2 flex w-full justify-center gap-4 rounded-full bg-primary py-2 text-center font-bold shadow-md`}
                            >
                                <p className="text-white">Đăng nhập</p>
                                {loading && (
                                    <span>
                                        <Spin
                                            className="text-white"
                                            indicator={
                                                <LoadingOutlined
                                                    style={{
                                                        fontSize: 20,
                                                    }}
                                                    spin
                                                />
                                            }
                                        />
                                    </span>
                                )}
                            </button>
                        </form>
                        <Divider size="large" className="bg-gray-400" />
                        <div>
                            <SocialLogin />
                        </div>
                    </div>
                    <div className="mb-4 text-center text-[0.9rem]">
                        <p>
                            Bạn chưa có tại khoản?{" "}
                            <button
                                className="font-bold transition-colors duration-150 hover:text-primary"
                                onClick={() => navigate("/register")}
                            >
                                Tạo tài khoản ngay!{" "}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
