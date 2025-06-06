import { useState } from "react";
import LoginPage from "./pages/Auth/LoginPage";
import "./index.css";
function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <main className="p-12 md:p-8 flex justify-center items-center min-h-[60vh]">
                <div className="flex gap-8 flex-wrap justify-center">
                    <LoginPage />
                </div>
            </main>
        </div>
    );
}
export default App;
