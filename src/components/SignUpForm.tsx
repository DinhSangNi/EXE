import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthServices } from "@/services/auth";
import type { SignUpFormData } from "@/pages/Register";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const signUpSchema = z.object({
    fullname: z.string().min(1, "Fullname is required"),
    // dateOfBirth: z.date({
    //     required_error: "Vui lòng chọn ngày sinh",
    //     invalid_type_error: "Ngày sinh không hợp lệ",
    // }),
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(8, "Password must have at least 8 characters"),
    phone: z.string().length(10, {
        message: "Phone must have 10 digits",
    }),
});

export type FormData = z.infer<typeof signUpSchema>;

type Props = {
    isLoading: boolean;
    setShowOtp: (value: boolean) => void;
    setLoading: (value: boolean) => void;
    setSignUpFormData: (value: SignUpFormData) => void;
    setError: (value: string) => void;
};

const SignUpForm = ({
    isLoading,
    setShowOtp,
    setLoading,
    setSignUpFormData,
    setError,
}: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            setShowOtp(true);
            setError("");
            setSignUpFormData(data);
            const res = await AuthServices.sendOTP(data.email);
            if (res.status === 200) {
                console.log("res: ", res);
            }
        } catch (error: any) {
            setError(error.response.data.message);
            setShowOtp(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="mb-5 flex flex-col">
                        <label>Họ và tên:</label>
                        <input
                            className="rounded-lg border border-gray-400 p-2 shadow-md"
                            {...register("fullname")}
                        />
                        {errors.fullname && (
                            <p className="text-[0.9rem] text-red-500">
                                {errors.fullname.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-5 flex flex-col">
                        <label>Email:</label>
                        <input
                            className="rounded-lg border border-gray-400 p-2 shadow-md"
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
                            className="rounded-lg border border-gray-400 p-2 shadow-md"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-[0.9rem] text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-5 flex flex-col">
                        <label>Phone:</label>
                        <input
                            className="rounded-lg border border-gray-400 p-2 shadow-md"
                            {...register("phone")}
                        />
                        {errors.phone && (
                            <p className="text-[0.9rem] text-red-500">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <button
                        disabled={isLoading}
                        type="submit"
                        className={`${isLoading ? "cursor-not-allowed bg-opacity-50" : "hover:bg-opacity-70"} mt-2 flex w-full justify-center gap-4 rounded-full bg-primary py-2 text-center font-bold shadow-md`}
                    >
                        <p className="text-white">Đăng ký</p>
                        {isLoading && (
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
            </div>
        </>
    );
};

export default SignUpForm;
