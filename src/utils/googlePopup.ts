// utils/googlePopup.ts
export const openGooglePopup = () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popup = window.open(
        import.meta.env.VITE_BASE_URL
            ? `${import.meta.env.VITE_BASE_URL}/auth/google`
            : "http://localhost:3000/auth/google",
        "GoogleLogin",
        `width=${width},height=${height},top=${top},left=${left}`
    );

    return popup;
};
