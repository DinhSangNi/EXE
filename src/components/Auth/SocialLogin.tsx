import React from "react";
import { MailOutlined } from "@ant-design/icons";
import "../../index.css";
const SocialLogin: React.FC = () => {
    const handleGoogleLogin = () => {
        console.log("Google login");
    };

    const handleAppleLogin = () => {
        console.log("Apple login");
    };

    const handleFacebookLogin = () => {
        console.log("Facebook login");
    };

    const handleEmailLogin = () => {
        console.log("Email login");
    };

    return (
        <div className="flex flex-col gap-4">
            <button
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-black bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
                onClick={handleGoogleLogin}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                    alt="Google logo"
                    className="h-5 w-5"
                />
                Tiếp tục với Google
            </button>

            <button
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-black bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
                onClick={handleAppleLogin}
            >
                <img
                    src="https://pnghunter.com/get-logo.php?id=3806"
                    alt="Apple logo"
                    className="h-5 w-5"
                />
                Tiếp tục với Apple
            </button>

            <button
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-black bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
                onClick={handleEmailLogin}
            >
                <MailOutlined className="text-lg" />
                Tiếp tục bằng email
            </button>

            <button
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-black bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
                onClick={handleFacebookLogin}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                    alt="Facebook logo"
                    className="h-5 w-5"
                />
                Tiếp tục với Facebook
            </button>
        </div>
    );
};

export default SocialLogin;
