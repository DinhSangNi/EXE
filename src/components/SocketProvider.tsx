import { socket } from "@/config/socket";
import type { RootState } from "@/stores/store";
import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";

type Props = {
    children: ReactNode;
};

const SocketProvider = ({ children }: Props) => {
    const storedUser = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
            if (storedUser?.id) {
                socket.emit("join", storedUser.id);
            }
        }

        return () => {
            socket.off("connect");
            socket.disconnect();
        };
    }, [storedUser?.id]);

    return <>{children}</>;
};

export default SocketProvider;
