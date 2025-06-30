import SignUpForm from "@/components/SignUpForm";
import { Spin } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import type { OTPProps } from "antd/es/input/OTP";
import { toast } from "react-toastify";
import { AuthServices } from "@/services/auth";
import OtpForm from "@/components/OtpForm";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores/store";
import { login } from "@/stores/userSlice";
import { useNavigate } from "react-router-dom";

export type SignUpFormData = {
    fullname: string;
    email: string;
    password: string;
    phone: string;
};

const Register = () => {
    const [showOtp, setShowOtp] = useState<boolean>(false);
    const [sentEmailLoading, setSentEmailLoading] = useState<boolean>(false);
    const [verifyEmailLoading, setVerifyEmailLoading] =
        useState<boolean>(false);
    const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
        fullname: "",
        email: "",
        password: "",
        phone: "",
    });
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleVerifyEmail = async (email: string, otp: string) => {
        try {
            setVerifyEmailLoading(true);
            const verifyRes = await AuthServices.verifyEmail(email, otp);
            if (verifyRes.status === 200) {
                const signUpRes = await AuthServices.register(signUpFormData);
                if (signUpRes.status === 201) {
                    const metadata = signUpRes.data.metadata;
                    localStorage.setItem("accessToken", metadata.accessToken);
                    dispatch(
                        login({
                            name: metadata.user.name,
                            email: metadata.user.email,
                            avatar: metadata.user.avatar,
                            role: metadata.user.role,
                            id: metadata.user.id,
                            accessToken: metadata.accessToken,
                        })
                    );
                    toast.success("Sign up succesfully!", {
                        position: "top-center",
                    });
                }
            }
        } catch (error: any) {
            switch (error.response.data.message) {
                case "Invalid OTP":
                    setError("Mã OTP không khớp hoặc đã hết hạn !");
                    break;
                case "User already exists":
                    setError("Người dùng đã tồn tại !");
                    break;
            }
        } finally {
            setVerifyEmailLoading(false);
        }
    };

    const handleChange: OTPProps["onChange"] = async (text) => {
        await handleVerifyEmail(signUpFormData.email, text);
    };

    return (
        <>
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <div className="flex min-h-[500px] w-[550px] flex-col bg-white px-6 pb-6 shadow-lg">
                    <div>
                        <h1 className="py-6 text-center text-[1.3rem] font-bold">
                            {showOtp ? "Xác thực email" : "Đăng ký"}
                        </h1>
                        {error && (
                            <p className="text-center text-red-500">{error}</p>
                        )}
                    </div>
                    {showOtp ? (
                        <div className="flex flex-1 flex-col">
                            {sentEmailLoading ? (
                                <div className="flex flex-1 flex-col justify-center">
                                    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
                                        <div className="flex items-center justify-center">
                                            <Spin
                                                indicator={
                                                    <LoadingOutlined
                                                        style={{
                                                            fontSize: 48,
                                                        }}
                                                        spin
                                                    />
                                                }
                                            />
                                        </div>
                                        <p>Đang gửi email xác thực...</p>
                                    </div>
                                </div>
                            ) : (
                                <OtpForm
                                    loading={verifyEmailLoading}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-1 flex-col justify-between">
                            <SignUpForm
                                isLoading={sentEmailLoading}
                                setShowOtp={setShowOtp}
                                setLoading={setSentEmailLoading}
                                setSignUpFormData={setSignUpFormData}
                                setError={setError}
                            />
                            <div className="mt-6 text-center text-[0.9rem]">
                                <p>
                                    Bạn đã có tại khoản?{" "}
                                    <button
                                        className="font-bold hover:underline"
                                        onClick={() => navigate("/login")}
                                    >
                                        {" "}
                                        Đăng nhập ngay!
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Register;
