import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

const AppRouter = () => {
    const appRoutes = useRoutes(routes);

    return <>{appRoutes}</>;
};

export default AppRouter;
