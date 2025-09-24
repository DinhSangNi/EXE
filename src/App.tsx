import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRouter from "./routes/AppRouter";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./stores/store";
import SocketProvider from "./components/SocketProvider";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ReduxProvider store={store}>
                    <SocketProvider>
                        <AppRouter />
                        <ToastContainer />
                    </SocketProvider>
                </ReduxProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
