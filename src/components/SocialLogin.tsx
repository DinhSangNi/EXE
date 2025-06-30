import React from "react";
import { openGooglePopup } from "@/utils/googlePopup";
const SocialLogin: React.FC = () => {
    const handleGoogleLogin = () => {
        console.log("Google login");
        openGooglePopup();
    };

    // const handleFacebookLogin = () => {
    //     console.log("Facebook login");
    // };

    return (
        <div className="flex justify-center gap-4">
            <button
                className="rounded-full font-semibold text-black shadow-lg transition-transform duration-200 hover:scale-110"
                onClick={handleGoogleLogin}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                    alt="Google logo"
                    className="h-8 w-8"
                />
            </button>

            <button className="rounded-full font-semibold text-black shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-gray-100">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                    alt="Facebook logo"
                    className="h-8 w-8"
                />
            </button>
        </div>
    );
};

export default SocialLogin;
