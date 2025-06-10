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
                className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-black rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-100 transition"
                onClick={handleGoogleLogin}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                    alt="Google logo"
                    className="w-5 h-5"
                />
                Tiếp tục với Google
            </button>

            <button
                className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-black rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-100 transition"
                onClick={handleAppleLogin}
            >
                <img
                    src="https://pnghunter.com/get-logo.php?id=3806"
                    alt="Apple logo"
                    className="w-5 h-5"
                />
                Tiếp tục với Apple
            </button>

            <button
                className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-black rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-100 transition"
                onClick={handleEmailLogin}
            >
                <MailOutlined className="text-lg" />
                Tiếp tục bằng email
            </button>

            <button
                className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-black rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-100 transition"
                onClick={handleFacebookLogin}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                    alt="Facebook logo"
                    className="w-5 h-5"
                />
                Tiếp tục với Facebook
            </button>
        </div>
    );
};

export default SocialLogin;
